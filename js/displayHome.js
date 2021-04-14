import { getData } from "/js/dataFetched.js";

const displayPhotographers = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const mainHome = document.getElementById("mainHome");
		const photographerCard = photographers
			.map(
				(photograph) => `
				<figure class="cards ${photograph.tags.map((tag) => `${tag}`).join(" ")}">
					<a class="cards__link">
						<img class="cards__image" src="img/Photographers_ID_Photos/${photograph.portrait}" alt="${photograph.name}" />
					</a>
					<figcaption class="cards__caption">
						<h2 class="cards__name">${photograph.name}</h2>
						<p class="cards__city">${photograph.city}, ${photograph.country}</p>
						<p class="cards__tagline">${photograph.tagline}</p>
						<p class="cards__price">${photograph.price}&euro;/jour</p>
						<p class="cards__tags">${photograph.tags.map((tag) => `<button class="cardsHome__tags tag">#${tag}</button>`).join("")}</p>
					</figcaption>
				</figure>
						`
			)
			.join("");
		mainHome.innerHTML = photographerCard;
	});
};

displayPhotographers();
