import { incrementLikes } from "./likesCount.js";

// FILTER BY TITLE

//localcompare retourne -1 ou 1 selon l'ordre lexicographique des elements comparés
// Exemple : -1 si a est avant b
// 			  1 si b est avant a
// Sort va utiliser le résultat : si localcompare = -1, il classe le a avant le b
// 								  si localcompare = 1, il classe le b avant le a
//Pour chaque titre du tableau, on récupère la section la plus proche, et on lui envoie l'article qui contient le titre

//FILTER BY TITLE
const titleFilter = () => {
	let articleTitle = document.querySelectorAll(".media__title");
	Array.from(articleTitle)
		.sort((a, b) => a.innerText.toLowerCase().localeCompare(b.innerText.toLowerCase()))
		.forEach((el) => el.closest("section").appendChild(el.closest("article")));
};

//FILTER BY LIKES
export const popularityFilter = () => {
	let articleLikes = document.querySelectorAll("[data-likes]");
	Array.from(articleLikes)
		.sort((a, b) => b.dataset.likes - a.dataset.likes) //on classe par ordre ascendant en soustrayant b à a
		.forEach((el) => el.parentNode.appendChild(el)); //on vise "section" avec parentNode
};

//FILTER BY DATE
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
	sortMediasBox();
	document.querySelector(".dropdown").addEventListener("click", function () {
		const filterValue = document.getElementById("dropdown__selected").innerText;
		console.log(filterValue);
		const filterValueData = document.querySelector("#dropdown__selected");
		console.log(filterValueData);
		if (filterValue == "Titre") {
			titleFilter();
		} else if (filterValue == "Popularité") {
			popularityFilter();
		} else if (filterValue == "Date") {
			dateFilter();
		}
		incrementLikes();
	});
	document.querySelector(".dropdown").addEventListener("keydown", function (e) {
		if (e.keyCode == 13) {
			document.querySelector(".dropdown").click(); //Trigger search button click event
		}
	});
}

//Sort box dropdown
const sortMediasBox = () => {
	const ENTER_KEY_CODE = 13;
	const ESCAPE_KEY_CODE = 27;

	const list = document.querySelector(".dropdown__list");
	const listContainer = document.querySelector(".dropdown__list-container");
	const dropdownArrow = document.querySelector(".dropdown__arrow");
	const listItems = document.querySelectorAll(".dropdown__list-item");
	const select = document.querySelector("#dropdown__selected");

	//Récupère l'élément cliqué et l'actualise en tant qu'item selectionné
	function setSelectedOption(e) {
		let selectedTextToAppend = document.createTextNode(e.target.innerText);
		select.innerHTML = null;
		select.appendChild(selectedTextToAppend);
	}

	//Ferme la liste : retire les classes open, expanded et aria expanded
	function closeList() {
		list.classList.remove("open");
		dropdownArrow.classList.remove("expanded");
		listContainer.setAttribute("aria-expanded", false);
	}

	//Agit selon la touche utilisée
	function toggleListVisibility(e) {
		let openDropDown = e.keyCode === ENTER_KEY_CODE;

		//Ferme les options si echap
		if (e.keyCode === ESCAPE_KEY_CODE) {
			closeList();
		}

		//Ouvre les options si click ou enter
		if (e.type === "click" || openDropDown) {
			list.classList.toggle("open");
			dropdownArrow.classList.toggle("expanded");
			listContainer.setAttribute("aria-expanded", list.classList.contains("open"));
		}
	}

	// Affiche les options au click/enter sur le select
	select.addEventListener("click", (e) => toggleListVisibility(e));
	dropdownArrow.addEventListener("click", (e) => toggleListVisibility(e));
	select.addEventListener("keydown", (e) => toggleListVisibility(e));

	// Fermer la liste au click/enter sur une option
	// Ferme la liste si echap
	listItems.forEach((item) => {
		item.addEventListener("click", (e) => {
			setSelectedOption(e);
			closeList();
		});

		item.addEventListener("keydown", (e) => {
			switch (e.keyCode) {
				case ENTER_KEY_CODE:
					setSelectedOption(e);
					closeList();
					return;

				case ESCAPE_KEY_CODE:
					closeList();
					return;

				default:
					return;
			}
		});
	});
};
