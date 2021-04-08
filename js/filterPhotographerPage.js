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

///Likes total counter
export function likeCount() {
	let allLikes = document.querySelectorAll("[data-likes]");
	// console.log(allLikes);

	let arraylikes = Array.from(allLikes);
	let finalArraylike = [];
	// console.log(finalArraylike);

	arraylikes.forEach((el) => {
		let likesToNumber = parseInt(el.dataset.likes);
		finalArraylike.push(likesToNumber);
	});

	let totalLikes = finalArraylike.reduce(function (acc, val) {
		return acc + val;
	}, 0);
	// console.log(totalLikes);

	const spanLikes = document.querySelector(".photographer_totalLikes");

	spanLikes.innerHTML = totalLikes;
}

//Like increment
// function likeIncrementOld() {
// 	let likes = document.querySelectorAll(".likes");
// 	console.log(likes);
// 	let hearts = document.querySelectorAll(".media__heart");
// 	console.log(hearts);
// 	hearts.forEach((heart) => {
// 		heart.addEventListener("click", function () {
// 			let actualLikes = parseInt(heart.closest("p").innerText, 10);
// 			console.log(actualLikes);
// 			heart.closest("p").innerText = actualLikes + 1;
// 		});
// 	});
// }

export const incrementLikes = () => {
	const likeButtonsList = document.querySelectorAll(".likeButton"); //récupère tout les buttons likes

	let arrayOfAllLikes = []; //initialise un tableau pour contenir le nombre de likes de chaque media
	console.log(arrayOfAllLikes);

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			const isLiked = likeButtonsList[i].classList.toggle("liked"); //On ajoute/retire la classe liked au clic
			const oldValue = document.querySelectorAll("#likeNumber"); //on récupère le nombre de likes de base

			if (isLiked) {
				//Si isLiked = true, on ajoute 1 à la valeur de base
				const newValue = parseInt(oldValue[i].innerText) + 1;
				oldValue[i].innerText = newValue;
				// spanLikes.innerHTML = sumLikes + 1;
			} else {
				//Si isLiked = false, on retire 1 à la valeur de base
				const newValue = parseInt(oldValue[i].innerText) - 1;
				oldValue[i].innerText = newValue;
				// spanLikes.innerHTML = sumLikes - 1;
			}
		});
		let totalLikes = parseInt(document.querySelectorAll("#likeNumber")[i].innerText); // on récupère le nombre de likes de chaques media
		arrayOfAllLikes.push(totalLikes); //on met les likes dans le tableau
	});

	//On fait la somme de tout les likes de base
	let sumLikes = arrayOfAllLikes.reduce(function (acc, val) {
		return acc + val;
	}, 0);
	// console.log(sumLikes);

	const spanLikes = document.querySelector(".photographer_totalLikes");
	spanLikes.innerHTML = sumLikes;

	// likeButtonsList.forEach((button, i) => {
	// 	likeButtonsList[i].addEventListener("click", () => {
	// 		const likedMedias = document.getElementsByClassName("liked");
	// 		// console.log(likedMedias);

	// 		let newLikes = likedMedias.length;
	// 		// console.log(newLikes);
	// 		sumLikes = sumLikes + newLikes;
	// 		// console.log(sumLikes);
	// 		spanLikes.innerHTML = sumLikes;
	// 	});
	// });

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			const likedMedias = document.getElementsByClassName("liked");
			let newLikes = likedMedias.length;
			const updatedSumOfLike = sumLikes + newLikes;
			spanLikes.innerHTML = updatedSumOfLike;
		});
	});
};
