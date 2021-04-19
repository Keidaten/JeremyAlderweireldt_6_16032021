const filters = document.querySelectorAll(".header__tag");

filters.forEach((filter) => {
	filter.addEventListener("click", function () {
		let selectedFilter = filter.getAttribute("data-filter");
		let itemsToHide = document.querySelectorAll(`main .photographInfos:not(.${selectedFilter})`);
		let itemsToShow = document.querySelectorAll(`main .${selectedFilter}`);

		itemsToHide.forEach((itemToHide) => {
			itemToHide.classList.add("--hide");
			itemToHide.classList.remove("--show");
		});

		itemsToShow.forEach((itemToShow) => {
			itemToShow.classList.remove("--hide");
			itemToShow.classList.add("--show");
		});
	});
});
