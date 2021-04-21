import { getData } from "/js/dataFetched.js";
import { callFilters } from "/js/filterPhotographerPage.js";
import { popularityFilter } from "/js/filterPhotographerPage.js";
import { incrementLikes } from "/js/likesCount.js";
import { modalGestion } from "/js/modal-contact.js";
import { fancyboxOptions } from "/js/fancyboxOptions.js";

const displayPhotographerPage = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const mediaData = data.media;
		const main = document.getElementById("main");

		// Factory media
		class MediatypeFactory {
			constructor() {
				this.createMediatype = function (type) {
					let media;
					if (type === "video") media = new Video();
					else if (type === "image") media = new Photo();
					return media;
				};
			}
		}

		class Photo {
			constructor() {
				this._type = "photo";
				this.createPhoto = function (IDphotograph, namePhotograph) {
					let getImages = mediaData.filter((medias) => medias["photographerId"] == IDphotograph && "image" in medias); //get images relative to the right photographer
					const photographerPics = getImages
						.map((pic) => {
							const picsTitle = pic.image
								.slice(0, -4)
								.replace(/([_])/g, " ")
								.split(" ")
								.slice(1)
								.join(" ")
								.replace(/([A-Z])/g, " $1")
								.trim();
							return `
								<article data-likes="${pic.likes}" data-date="${pic.date}" class="media" data-title="${picsTitle}">
									<div class="media__content">
										<figure><a href="img/${namePhotograph}/${pic.image}" data-fancybox="gallery" data-caption="${picsTitle}"><img class="media__thumbnail" src="img/${namePhotograph}/${pic.image}" alt=""></a>
											<figcaption class="media__infos">
												<h3 class="media__title">${picsTitle}</h3>
												<p class="media__price" >${pic.price}€</p>
												<button class="media__likeButton">
													<span class="likes media__likeNumber">${pic.likes}</span>
													<span>
														<i class="fas fa-heart media__heart"></i>
													</span>
												</button>
											</figcaption>
										</figure>
									</div>
								</article>
								`;
						})
						.join("");
					return photographerPics;
				};
			}
		}

		class Video {
			constructor() {
				this._type = "video";
				this.createVideo = function (IDphotograph, namePhotograph) {
					let getVideos = mediaData.filter((medias) => medias["photographerId"] == IDphotograph && "video" in medias);
					const photographerVids = getVideos
						.map((vid) => {
							const vidsTitle = vid.video
								.slice(0, -4)
								.replace(/([_])/g, " ")
								.split(" ")
								.slice(1)
								.join(" ")
								.replace(/([A-Z])/g, " $1")
								.trim();
							return `
								<article class="media" data-date="${vid.date}" data-likes="${vid.likes}" data-title="${vidsTitle}">
								<div class="media__content">
									<a href="img/${namePhotograph}/${vid.video}" data-fancybox="gallery" data-caption="${vidsTitle}"><video class="media__thumbnail"><source src="img/${namePhotograph}/${vid.video}" type="video/mp4"></video></a>
									<div class="media__infos">
										<h3 class="media__title">${vidsTitle}</h3>
										<p class="media__price">${vid.price}€</p>
										<button class="media__likeButton">
											<span class="likes media__likeNumber">${vid.likes}</span>
											<span>
												<i class="fas fa-heart media__heart"></i>
											</span>
										</button>
									</div>
								</div>
								</article>
								`;
						})
						.join("");
					return photographerVids;
				};
			}
		}

		const mediatypeFactory = new MediatypeFactory();

		//Boucle sur les photographes
		for (let i = 0; i < photographers.length; i++) {
			const photographAchor = document.getElementsByClassName("photographInfos__img");

			photographAchor[i].addEventListener("click", function () {
				const unWantedElements = document.querySelectorAll(".header__title, .header__nav, .scrollHelp"); //get element to hide
				unWantedElements.forEach((element) => (element.style.display = "none"));

				const header = document.querySelector(".header");
				header.style.paddingBottom = "0px";

				// main.classList.replace("main", "mainProfilePages");

				const body = document.querySelector("body");

				// body.classList.add("profilPages");
				body.classList.replace("homePage", "profilPages");

				const photo = mediatypeFactory.createMediatype("image");
				const imagesArticles = photo.createPhoto(photographers[i].id, photographers[i].name.split(" ")[0]);

				const video = mediatypeFactory.createMediatype("video");
				const videoArticles = video.createVideo(photographers[i].id, photographers[i].name.split(" ")[0]);

				const photographerPage = `				
				<section class="photographInfos">
					<div class="photographInfos__textualInfos">
						<h1 class="photographInfos__name">${photographers[i].name}</h1>
						<p class="photographInfos__city">${photographers[i].city}</p>
						<p class="photographInfos__tagline photographInfos__tagline--greyed">${photographers[i].tagline}</p>
						<p class="photographInfos__tags">${photographers[i].tags.map((tag) => `<button class="photographInfos__tag">#${tag}</button>`).join("")}</p>
					</div>
					<button class="contactButton" id="myBtn">Contactez-moi</button>			
					<img class="photographInfos__img" src="img/Photographers_ID_Photos/${photographers[i].portrait}" alt="" />
				</section>
			
				<div class="sortingBox">
					<span>Trier par</span>
					<ul tabindex="-1" class="dropdown">
						<li role="button" aria-labelledby="dropdown-label" id="dropdown__selected" tabindex="0">Popularité</li>
						<i class="fas fa-angle-up arrowSort dropdown__arrow"></i>
						<li aria-expanded="false" role="list" class="dropdown__list-container">
							<ul class="dropdown__list">
								<li class="dropdown__list-item" tabindex="0" id="option-1">Popularité</li>
								<hr>
								<li class="dropdown__list-item" tabindex="0" id="option-2">Date</li>
								<hr>
								<li class="dropdown__list-item" tabindex="0" id="option-3">Titre</li>
							</ul>
						</li>
					</ul>	
				</div>			
	
				<section class="articles-section">${imagesArticles}${videoArticles}</section>
	
				<div class="bottom-info"><span class="photographer_totalLikes"></span><i class="fas fa-heart"></i><span class="photographer_price">${photographers[i].price}€/jour</span></div>
	
				<div class="modal-contact" id="myModal">
					<div class="modal-contact__content">
						<header>
							<h2 class="modal-contact__title">
								Contactez-moi <br />
								${photographers[i].name}
							</h2>
						</header>
						<span class="modal-contact__close">&times;</span>
						<div class="modal-contact__body">
							<form id="form" name="reserve" action="index.html" method="get">
								<div class="modal-contact__formData">
									<label for="first">Prénom</label><br />
									<input class="modal-contact__inputs" type="text" id="first" name="first" minlength="2" /><br />
								</div>
								<div class="modal-contact__formData">
									<label for="last">Nom</label><br />
									<input class="modal-contact__inputs" type="text" id="last" name="last" /><br />
								</div>
								<div class="modal-contact__formData">
									<label for="email">E-mail</label><br />
									<input class="modal-contact__inputs" type="email" id="email" name="email" /><br />
									<span id="errorMsgMail"></span>
								</div>
								<div class="modal-contact__formData">
									<label for="last">Votre message</label><br />
									<textarea class="modal-contact__inputs modal-contact__inputs--higher"/></textarea>
								</div>
								<input class="btn-submit modal-contact__submitButton" type="submit" value="Envoyer" />
							</form>
						</div>
					</div>
				</div>							
				`;
				main.innerHTML = photographerPage;

				popularityFilter(); // Trie par défaut par popularité
				callFilters(); // Appelle les filtres
				incrementLikes();
				modalGestion();
				fancyboxOptions();
			});
		}
	});
};

displayPhotographerPage();

$(document).on("click", "[data-toggle='lightbox']", function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});
