const scrollHelp = document.getElementById("scrollHelp");

const myScrollFunc = function () {
	let y = window.scrollY;
	if (y >= 600) {
		scrollHelp.classList.add("--show");
		scrollHelp.classList.remove("--hide");
	} else {
		scrollHelp.classList.remove("--show");
		scrollHelp.classList.add("--hide");
	}
};

window.addEventListener("scroll", myScrollFunc);
