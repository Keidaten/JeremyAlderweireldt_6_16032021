import { getData } from "/js/dataFetched.js";

const displayPhotographers = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const main = document.getElementById("main");
		const photographerCard = photographers
			.map(
				(photograph) => `
					<figure class="photographInfos ${photograph.tags.map((tag) => `${tag}`).join(" ")}">
						<a class="photographInfos__link">
							<img class="photographInfos__img" src="img/Photographers_ID_Photos/${photograph.portrait}" alt="${photograph.name}" />
						</a>
						<figcaption class="photographInfos__caption">
							<h2 class="photographInfos__name">${photograph.name}</h2>
							<p class="photographInfos__city">${photograph.city}, ${photograph.country}</p>
							<p class="photographInfos__tagline">${photograph.tagline}</p>
							<p class="photographInfos__price">${photograph.price}&euro;/jour</p>
							<p class="photographInfos__tags">${photograph.tags.map((tag) => `<button class="photographInfos__tag tag">#${tag}</button>`).join("")}</p>
						</figcaption>
					</figure>
						`
			)
			.join("");
		main.innerHTML = photographerCard;
	});
};

displayPhotographers();
