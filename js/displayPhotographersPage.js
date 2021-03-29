import { getData } from "/js/dataFetched.js";

const displayPhotographerPage = () => {
	getData().then((data) => {
		const photographers = data.photographers;
		const mainHome = document.getElementById("mainHome");
		const photographAchor = document.getElementsByClassName("card__name");
		// console.log(photographAchor);
		for (let i = 0; i < photographAchor.length; i++) {
			photographAchor[i].addEventListener("click", function () {
				// localStorage.setItem("photograph", photographers[i].id); //localstorage
				const unWantedElements = document.querySelectorAll(".header__title, .header__nav");
				unWantedElements.forEach((element) => (element.style.display = "none"));
				const photographerPage = `
				<button class="contactButton">Contactez-moi</button>
                <div class="photographInfos">
                    <h1 class="photographInfos__name">${photographers[i].name}</h1>
                    <p class="photographInfos__city">${photographers[i].city}</p>
                    <br />
                    <p class="photographInfos__tagline">${photographers[i].tagline}</p>
                    <p class="photographInfos__tags">${photographers[i].tags.map((tag) => `<button class=" tag">#${tag}</button>`).join("")}</p>
                    
			        <img classe="" src="img/Photographers_ID_Photos/${photographers[i].portrait}" width="250px" alt=""></img>
                </div>
                `;
				mainHome.innerHTML = photographerPage;
			});
		}

		// localStorage.setItem("photograph", photographers[0].id); //localstorage
	});
};

displayPhotographerPage();
