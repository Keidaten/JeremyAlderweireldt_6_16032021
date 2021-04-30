export const homeToProfilePage = () => {
	const unWantedElements = document.querySelectorAll(".header__title, .header__nav");
	unWantedElements.forEach((unWantedElement) => unWantedElement.parentNode.removeChild(unWantedElement));
	const header = document.querySelector(".header");
	header.style.paddingBottom = "0px";
	const body = document.querySelector("body");
	body.classList.replace("homePage", "profilPages");
};
