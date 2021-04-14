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

export const incrementLikes = () => {
	const likeButtonsList = document.querySelectorAll(".likeButton"); //récupère tout les buttons likes

	let arrayOfAllLikes = []; //initialise un tableau pour contenir le nombre de likes de chaque media

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			const isLiked = likeButtonsList[i].classList.toggle("liked"); //On ajoute/retire la classe liked au clic
			const oldValue = document.querySelectorAll(".likeNumber"); //on récupère le nombre de likes de base

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
		let totalLikes = parseInt(document.querySelectorAll(".likeNumber")[i].innerText); // on récupère le nombre de likes de chaques media
		arrayOfAllLikes.push(totalLikes); //on met les likes dans le tableau
	});

	//On fait la somme de tout les likes de base
	let sumLikes = arrayOfAllLikes.reduce(function (acc, val) {
		return acc + val;
	}, 0);

	const spanLikes = document.querySelector(".photographer_totalLikes");
	spanLikes.innerHTML = sumLikes;

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			const likedMedias = document.getElementsByClassName("liked");
			let newLikes = likedMedias.length;
			const updatedSumOfLike = sumLikes + newLikes;
			spanLikes.innerHTML = updatedSumOfLike;
		});
	});
};
