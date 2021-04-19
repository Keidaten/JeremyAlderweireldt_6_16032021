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

//Style sort box
const styleSortBox = () => {
	const SPACEBAR_KEY_CODE = [0, 32];
	const ENTER_KEY_CODE = 13;
	const DOWN_ARROW_KEY_CODE = 40;
	const UP_ARROW_KEY_CODE = 38;
	const ESCAPE_KEY_CODE = 27;

	// const button = document.querySelector(".dropdown");
	const list = document.querySelector(".dropdown__list");
	const listContainer = document.querySelector(".dropdown__list-container");
	const dropdownArrow = document.querySelector(".dropdown__arrow");
	const listItems = document.querySelectorAll(".dropdown__list-item");
	const dropdownSelectedNode = document.querySelector("#dropdown__selected");
	const listItemIds = [];

	dropdownSelectedNode.addEventListener("click", (e) => toggleListVisibility(e));
	dropdownArrow.addEventListener("click", (e) => toggleListVisibility(e));
	dropdownSelectedNode.addEventListener("keydown", (e) => toggleListVisibility(e));

	listItems.forEach((item) => listItemIds.push(item.id));

	listItems.forEach((item) => {
		item.addEventListener("click", (e) => {
			setSelectedListItem(e);
			closeList();
		});

		item.addEventListener("keydown", (e) => {
			switch (e.keyCode) {
				case ENTER_KEY_CODE:
					setSelectedListItem(e);
					closeList();
					return;

				case DOWN_ARROW_KEY_CODE:
					focusNextListItem(DOWN_ARROW_KEY_CODE);
					return;

				case UP_ARROW_KEY_CODE:
					focusNextListItem(UP_ARROW_KEY_CODE);
					return;

				case ESCAPE_KEY_CODE:
					closeList();
					return;

				default:
					return;
			}
		});
	});

	function setSelectedListItem(e) {
		let selectedTextToAppend = document.createTextNode(e.target.innerText);
		dropdownSelectedNode.innerHTML = null;
		dropdownSelectedNode.appendChild(selectedTextToAppend);
	}

	function closeList() {
		list.classList.remove("open");
		dropdownArrow.classList.remove("expanded");
		listContainer.setAttribute("aria-expanded", false);
	}

	function toggleListVisibility(e) {
		let openDropDown = SPACEBAR_KEY_CODE.includes(e.keyCode) || e.keyCode === ENTER_KEY_CODE;

		if (e.keyCode === ESCAPE_KEY_CODE) {
			closeList();
		}

		if (e.type === "click" || openDropDown) {
			list.classList.toggle("open");
			dropdownArrow.classList.toggle("expanded");
			listContainer.setAttribute("aria-expanded", list.classList.contains("open"));
		}

		if (e.keyCode === DOWN_ARROW_KEY_CODE) {
			focusNextListItem(DOWN_ARROW_KEY_CODE);
		}

		if (e.keyCode === UP_ARROW_KEY_CODE) {
			focusNextListItem(UP_ARROW_KEY_CODE);
		}
	}

	function focusNextListItem(direction) {
		const activeElementId = document.activeElement.id;
		if (activeElementId === "dropdown__selected") {
			document.querySelector(`#${listItemIds[0]}`).focus();
		} else {
			const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
			if (direction === DOWN_ARROW_KEY_CODE) {
				const currentActiveElementIsNotLastItem = currentActiveElementIndex < listItemIds.length - 1;
				if (currentActiveElementIsNotLastItem) {
					const nextListItemId = listItemIds[currentActiveElementIndex + 1];
					document.querySelector(`#${nextListItemId}`).focus();
				}
			} else if (direction === UP_ARROW_KEY_CODE) {
				const currentActiveElementIsNotFirstItem = currentActiveElementIndex > 0;
				if (currentActiveElementIsNotFirstItem) {
					const nextListItemId = listItemIds[currentActiveElementIndex - 1];
					document.querySelector(`#${nextListItemId}`).focus();
				}
			}
		}
	}
};

// CALL FILTERS BY SELECTED OPTION
export function callFilters() {
	styleSortBox();

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
	});
}

// Style box
