fetch("/FishEyeDataFR.json")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		console.log(data.media);
		console.log(data.photographers);
	})
	.catch((error) => {
		console.error("Une erreur est survenue pendant l'accès aux données.");
		console.error(error);
	});
