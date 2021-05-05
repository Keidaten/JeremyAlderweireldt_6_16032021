import { getData } from "./dataFetched.js";
import { callFilters } from "./filterPhotographerPage.js";
import { popularityFilter } from "./filterPhotographerPage.js";
import { incrementLikes } from "./likesCount.js";
import { modalDisplay } from "./modal-contact.js";
import { fancyboxOptions } from "./fancyboxOptions.js";
import { homeToProfilePage } from "./photographersPageReform.js";

export const displayPhotographerPage = () => {
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
					//récupère les images = les medias ayant l'id entrée en paramètre, si le media est une image
					let getImages = mediaData.filter((medias) => medias["photographerId"] == IDphotograph && "image" in medias);
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
										<figure><a href="img/${namePhotograph}/${pic.image}"  aria-label="${pic.alttext} : Cliquez pour zoomer" data-fancybox="gallery" data-caption="${picsTitle}"><img class="media__thumbnail" src="img/${namePhotograph}/${pic.image}" alt="${pic.alttext}"></a>
											<figcaption tabindex="0" class="media__infos">
												<p class="media__title">${picsTitle}</p>
												<p class="media__price" >${pic.price}€</p>
												<button class="media__likeButton">
													<span class="likes media__likeNumber">${pic.likes}</span>
													<span>
														<span class="fas fa-heart media__heart" aria-label=”likes”></span>
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
					//récupère les vidéos
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
									<a href="img/${namePhotograph}/${vid.video}" data-fancybox="gallery" data-caption="${vidsTitle}" aria-label="${vid.alttext} : Cliquez pour zoomer"><video title="${vid.alttext}" class="media__thumbnail"><source src="img/${namePhotograph}/${vid.video}" type="video/mp4"></video></a>
									<div tabindex="0" class="media__infos">
										<p class="media__title">${vidsTitle}</p>
										<p class="media__price">${vid.price}€</p>
										<button class="media__likeButton">
											<span class="likes media__likeNumber">${vid.likes}</span>
											<span>
												<span class="fas fa-heart media__heart" aria-label=”likes”></span>
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

		//	 						   //
		// Boucle sur les photographes //
		//	 						  //

		for (let i = 0; i < photographers.length; i++) {
			//On récupère les ancres de chaques photographes de la home page
			const photographAchor = document.getElementsByClassName("photographInfos__link");

			//On écoute le clique sur ces ancres
			photographAchor[i].addEventListener("click", function () {
				homeToProfilePage();

				//Medias creation
				const photo = mediatypeFactory.createMediatype("image");
				const imagesArticles = photo.createPhoto(photographers[i].id, photographers[i].name.split(" ")[0]);

				const video = mediatypeFactory.createMediatype("video");
				const videoArticles = video.createVideo(photographers[i].id, photographers[i].name.split(" ")[0]);

				//Page creation
				const photographerPage = `				
				<section class="photographInfos">
					<div class="photographInfos__textualInfos">
						<h1 class="photographInfos__name" tabindex="0">${photographers[i].name}</h1>
						<p class="photographInfos__city" tabindex="0">${photographers[i].city}</p>
						<p class="photographInfos__tagline photographInfos__tagline--greyed" tabindex="0">${photographers[i].tagline}</p>
						<p class="photographInfos__tags">${photographers[i].tags.map((tag) => `<button class="photographInfos__tag photographInfos__tag--lockhover"><span class="sr-only">Tag</span>#${tag}</button>`).join("")}</p>
					</div>
					<button class="contactButton" id="myBtn" aria-label="Me contacter">Contactez-moi</button>			
					<img class="photographInfos__img" src="img/Photographers_ID_Photos/${photographers[i].portrait}" alt=""/>
				</section>
				<div class="sortingBox">
					<span id="sortMedias">Trier par</span>
					<ul class="dropdown">
						<li role="button" aria-labelledby="sortMedias" id="dropdown__selected" tabindex="0">Popularité</li>
						<li><span class="fas fa-angle-up arrowSort dropdown__arrow"></span></li>
						<li aria-expanded="false" role="list" class="dropdown__list-container">
							<ul class="dropdown__list">
								<li role="option" class="dropdown__list-item" tabindex="0" id="option-1">Popularité</li>
								<hr>
								<li role="option" class="dropdown__list-item" tabindex="0" id="option-2">Date</li>
								<hr>
								<li role="option" class="dropdown__list-item" tabindex="0" id="option-3">Titre</li>
							</ul>
						</li>
					</ul>	
				</div>			
				<section class="articles-section">${imagesArticles}${videoArticles}</section>	
				<div class="bottom-info"><span class="photographer_totalLikes"></span><span class="fas fa-heart"></span><span class="photographer_price">${photographers[i].price}€/jour</span></div>	
				<dialog class="modal-contact" id="myModal" aria-labelledby="headingModal">
					<div class="modal-contact__content">
						<header>
							<h2 tabindex="0" class="modal-contact__title" id="headingModal">
								Contactez-moi <br />
								${photographers[i].name}
							</h2>
						</header>
						<div class="modal-contact__body">
							<form id="form" name="reserve" action="index.html" method="get">
								<div class="modal-contact__formData">
									<label for="first" id="firstname">Prénom</label><br />
									<input class="modal-contact__inputs" aria-labelledby="firstname" type="text" id="first" name="first" minlength="2" /><br />
								</div>
								<div class="modal-contact__formData">
									<label for="last" id="lastname">Nom</label><br />
									<input class="modal-contact__inputs" aria-labelledby="lastname" type="text" id="last" name="last" /><br />
								</div>
								<div class="modal-contact__formData">
									<label for="email" id="emailAria">E-mail</label><br />
									<input class="modal-contact__inputs" aria-labelledby="emailAria" type="email" id="email" name="email" /><br />
									<span id="errorMsgMail"></span>
								</div>
								<div class="modal-contact__formData">
									<label for="message" id="messageAria">Votre message</label><br />
									<textarea class="modal-contact__inputs modal-contact__inputs--higher" id="message" aria-labelledby="messageAria"/></textarea>
								</div>
								<input class="btn-submit modal-contact__submitButton" type="submit" value="Envoyer" aria-label="Envoyer" />
							</form>
						</div>
						<span class="modal-contact__close" tabindex="0" aria-label="Fermer">&times;</span>
					</div>
				</dialog>							
				`;

				main.innerHTML = photographerPage;

				popularityFilter(); // Trie par défaut par popularité
				callFilters(); // Appelle les filtres
				incrementLikes();
				modalDisplay();
				fancyboxOptions();
			});

			//ACT ON ENTER KEY
			photographAchor[i].addEventListener("keydown", function (e) {
				if (e.code == "Enter") {
					photographAchor[i].click();
				}
			});
		}
	});
};

displayPhotographerPage();
