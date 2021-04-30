import { getData } from "./dataFetched.js";

getData().then(() => {
	const filters = document.querySelectorAll(".filterTags");
	filters.forEach((filter) => {
		// On écoute le click sur chaque tag
		filter.addEventListener("click", function () {
			// On récupère l'attribute data-filter du tag cliqué
			let selectedFilter = filter.getAttribute("data-filter");
			// On récupère tout les photographes qui ne possèdent pas l'attribute donné
			let itemsToHide = document.querySelectorAll(`main .photographInfos:not(.${selectedFilter})`);
			// On récupère tout les photographes possèdent l'attribute donné
			let itemsToShow = document.querySelectorAll(`main .${selectedFilter}`);

			itemsToHide.forEach((itemToHide) => {
				itemToHide.classList.add("--hide");
				itemToHide.classList.remove("--show");
			});

			itemsToShow.forEach((itemToShow) => {
				itemToShow.classList.remove("--hide");
				itemToShow.classList.add("--show");
			});
		});
	});
});
