export const incrementLikes = () => {
	//récupère tout les buttons likes
	const likeButtonsList = document.querySelectorAll(".media__likeButton");
	//initialise un tableau pour contenir le nombre de likes de chaque media
	let arrayOfAllLikes = [];

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			//On ajoute/retire la classe liked au clic
			const isLiked = likeButtonsList[i].classList.toggle("liked");
			//on récupère le nombre de likes de base
			const oldValue = document.querySelectorAll(".media__likeNumber");

			if (isLiked) {
				//Si isLiked = true, on ajoute 1 à la valeur de base
				const newValue = parseInt(oldValue[i].innerText) + 1;
				oldValue[i].innerText = newValue;
			} else {
				//Si isLiked = false, on retire 1 à la valeur de base
				const newValue = parseInt(oldValue[i].innerText) - 1;
				oldValue[i].innerText = newValue;
			}
		});
		// on récupère le nombre de likes de chaques media
		let totalLikes = parseInt(document.querySelectorAll(".media__likeNumber")[i].innerText);
		//on met les likes dans le tableau
		arrayOfAllLikes.push(totalLikes);
	});

	//On fait la somme de tout les likes de base
	let sumLikes = arrayOfAllLikes.reduce(function (acc, val) {
		return acc + val;
	}, 0);

	//Total de tout les likes de toutes les photos
	const spanLikes = document.querySelector(".photographer_totalLikes");
	spanLikes.innerHTML = sumLikes;

	likeButtonsList.forEach((button, i) => {
		likeButtonsList[i].addEventListener("click", () => {
			const likedMedias = document.getElementsByClassName("liked");
			let nbOfLikedMedia = likedMedias.length;
			const updatedSumOfLike = sumLikes + nbOfLikedMedia;
			spanLikes.innerHTML = updatedSumOfLike;
		});
	});
};
