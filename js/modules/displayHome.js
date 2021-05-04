import { getData } from "./dataFetched.js";

const displayPhotographers = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const main = document.getElementById("main");
		const photographerCard = photographers
			.map(
				(photograph) => `
					<figure class="photographInfos ${photograph.tags.map((tag) => `${tag}`).join(" ")}">
						<a tabindex="0" class="photographInfos__link" aria-label="Profil de ${photograph.name}">
							<img class="photographInfos__img" src="img/Photographers_ID_Photos/${photograph.portrait}" alt="Image de ${photograph.name}"/>
							<h2 class="photographInfos__name">${photograph.name}</h2>
						</a>
						<figcaption tabindex="0" class="photographInfos__caption">
							<p class="photographInfos__city">${photograph.city}, ${photograph.country}</p>
							<p class="photographInfos__tagline">${photograph.tagline}</p>
							<p class="photographInfos__price">${photograph.price}&euro;/jour</p>
							<p class="photographInfos__tags">${photograph.tags.map((tag) => `<button class="filterTags photographInfos__tag tag" data-filter="${tag}"><span class="sr-only">Tag ${tag}</span>#${tag}</button>`).join("")}</p>
						</figcaption>
					</figure>
						`
			)
			.join("");
		main.innerHTML = photographerCard;
	});
};

displayPhotographers();
