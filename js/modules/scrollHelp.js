const scrollHelp = document.getElementById("scrollHelp");

var myScrollFunc = function () {
	var y = window.scrollY;
	// console.log(y);
	if (y >= 600) {
		scrollHelp.classList.add("--show");
		scrollHelp.classList.remove("--hide");
	} else {
		scrollHelp.classList.remove("--show");
		scrollHelp.classList.add("--hide");
	}
};

window.addEventListener("scroll", myScrollFunc);
