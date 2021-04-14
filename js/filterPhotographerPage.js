// FILTER BY TITLE

//localcompare retourne -1 ou 1 selon l'ordre lexicographique des elements comparés
// Exemple : -1 si a est avant b
// 			  1 si b est avant a
// Sort va utiliser le résultat : si localcompare = -1, il classe le a avant le b
// 								  si localcompare = 1, il classe le b avant le a
//Pour chaque titre du tableau, on récupère la section la plus proche, et on lui envoie l'article qui contient le titre

const titleFilter = () => {
	let articleTitle = document.querySelectorAll(".media__title");
	Array.from(articleTitle)
		.sort((a, b) => a.innerText.toLowerCase().localeCompare(b.innerText.toLowerCase()))
		.forEach((el) => el.closest("section").appendChild(el.closest("article")));
};

//arr.sort(fonctionComparaison)

//FILTER BY LIKES
export const popularityFilter = () => {
	let articleLikes = document.querySelectorAll("[data-likes]");
	Array.from(articleLikes)
		.sort((a, b) => b.dataset.likes - a.dataset.likes) //on classe par ordre ascendant en soustrayant b à a
		.forEach((el) => el.parentNode.appendChild(el)); //on vise "section" avec parentNode
};

export const dateFilter = () => {
	let articleDate = document.querySelectorAll("[data-date]");
	Array.from(articleDate)
		.sort((a, b) => {
			let dateA = new Date(a.dataset.date);
			let dateB = new Date(b.dataset.date);
			return dateB - dateA; //on classe par ordre ascendant en soustrayant b à a
		})
		.forEach((el) => el.parentNode.appendChild(el)); //on vise "section" avec parentNode
};

// CALL FILTERS BY SELECTED OPTION
export function callFilters() {
	document.getElementById("selector").addEventListener("change", function () {
		if (this.value == "Titre") {
			titleFilter();
		} else if (this.value == "Popularité") {
			popularityFilter();
		} else if (this.value == "Date") {
			dateFilter();
		}
	});
}
