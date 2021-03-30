import { getData } from "/js/dataFetched.js";

const displayPhotographerPage = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const mediaData = data.media;
		const mainHome = document.getElementById("mainHome");
		const photographAchor = document.getElementsByClassName("card__name");

		for (let i = 0; i < photographers.length; i++) {
			photographAchor[i].addEventListener("click", function () {
				const unWantedElements = document.querySelectorAll(".header__title, .header__nav"); //get element to hide
				unWantedElements.forEach((element) => (element.style.display = "none"));

				let filteredImages = mediaData.filter((article) => article["photographerId"] == photographers[i].id && "image" in article); //get images relative to the right photographer
				const photographerPics = filteredImages.map((pic) => `<img src="img/${photographers[i].name.split(" ")[0]}/${pic.image}" alt="" width="100px">`);

				let filteredVideos = mediaData.filter((article) => article["photographerId"] == photographers[i].id && "video" in article); //get videos relative to the right photographer
				const photographerVids = filteredVideos.map((vid) => `<video width="100px"><source src="img/${photographers[i].name.split(" ")[0]}/${vid.video}"" type="video/mp4"></video>`);
				// `<img src="img/${photographers[i].name.split(" ")[0]}/${pics.image}" alt="" width="100px">`
				// console.log(photographerPics);

				// const photographerVids = filteredArticles.map(
				// 	(vid) => console.log(vid.likes)
				// 	// `<source src="img/${photographers[i].name.split(" ")[0]}/${vid.video}"" type="video/mp4">`
				// );

				// console.log(photographerVids);

				const photographerPage = `
				<button class="contactButton">Contactez-moi</button>
				<div class="photographInfos">
				<h1 class="photographInfos__name">${photographers[i].name}</h1>
				<p class="photographInfos__city">${photographers[i].city}</p>
				<br />
				<p class="photographInfos__tagline">${photographers[i].tagline}</p>
				<p class="photographInfos__tags">${photographers[i].tags.map((tag) => `<button class=" tag">#${tag}</button>`).join("")}</p>
				
				<img classe="" src="img/Photographers_ID_Photos/${photographers[i].portrait}" width="250px" alt=""></img>
				</div>
				<section>${photographerPics}${photographerVids}</section>
				`;
				mainHome.innerHTML = photographerPage;
			});
		}
	});
};

displayPhotographerPage();
