import { getData } from "/js/dataFetched.js";

const displayPhotographers = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		// console.log(photographers);
		const mainHome = document.getElementById("mainHome");
		console.log(photographers);
		localStorage.setItem("photograph", photographers[0].id); //localstorage
		const photographerCard = photographers
			.map(
				(photograph) => `
				<figure class="card ${photograph.tags.map((tag) => `${tag}`).join(" ")}">
					<a class="card__link" href="">
						<img class="card__image" src="img/Photographers_ID_Photos/${photograph.portrait}" alt="${photograph.name}" />
					</a>
					<figcaption class="card__caption">
						<h2 class="card__name">${photograph.name}</h2>
						<p class="card__city">${photograph.city}, ${photograph.country}</p>
						<p class="card__tagline">${photograph.tagline}</p>
						<p class="card__price">${photograph.price}&euro;/jour</p>
						<p class="card__tags">${photograph.tags.map((tag) => `<button class="card__tags tag">#${tag}</button>`).join("")}</p>
					</figcaption>
				</figure>
						`
			)
			.join("");
		mainHome.innerHTML = photographerCard;
	});
};

displayPhotographers();

//Portrait filter
// const filterPortrait = () => {
// 	const htmlCollectionPhotographs = document.getElementsByClassName("card");
// 	const arrayDomPhotographers = Array.from(htmlCollectionPhotographs);
// 	const tagPortrait = document.getElementsByClassName("card__tags portrait")[0];
// 	// console.log(tagPortrait);

// 	for (let i in arrayDomPhotographers) {
// 		// console.log(arrayDomPhotographers[i]);
// 		if (!arrayDomPhotographers[i].contains(tagPortrait)) {
// 			console.log(arrayDomPhotographers[i]);
// 			arrayDomPhotographers[i].style.display = "none";
// 		}
// 	}
// };

// const portraitTag = document.getElementById("portrait");
// portraitTag.addEventListener("click", filterPortrait);

////

const scrollHelp = document.getElementById("scrollHelp");

var myScrollFunc = function () {
	var y = window.scrollY;
	// console.log(y);
	if (y >= 600) {
		scrollHelp.classList.add("--show");
		scrollHelp.classList.remove("--hide");
	} else {
		scrollHelp.classList.remove("--show");
		scrollHelp.classList.add("--hide");
	}
};

window.addEventListener("scroll", myScrollFunc);
