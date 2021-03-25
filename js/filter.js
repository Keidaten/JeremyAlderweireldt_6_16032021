const filters = document.querySelectorAll(".header__tag");

filters.forEach((filter) => {
	filter.addEventListener("click", function () {
		let selectedFilter = filter.getAttribute("data-filter");
		let itemsToHide = document.querySelectorAll(`main .card:not(.${selectedFilter})`);
		let itemsToShow = document.querySelectorAll(`main .${selectedFilter}`);

		itemsToHide.forEach((el) => {
			el.classList.add("--hide");
			el.classList.remove("--show");
		});

		itemsToShow.forEach((el) => {
			el.classList.remove("--hide");
			el.classList.add("--show");
		});
	});
});
