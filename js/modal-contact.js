export const modalGestion = () => {
	// // Get the modal
	const modal = document.getElementById("myModal");

	// // Get the button that opens the modal
	const btn = document.getElementById("myBtn");

	// // Get the <span> element that closes the modal
	const span = document.getElementsByClassName("modal-contact__close")[0];

	// // When the user clicks on the button, open the modal
	btn.onclick = function () {
		modal.style.display = "block";
	};

	// // When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	};

	// // When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	const form = document.getElementById("form");
	const inputs = document.querySelectorAll(".modal-contact__inputs");

	function validate(event) {
		event.preventDefault();
		modal.style.display = "none";
		inputs.forEach((input) => {
			console.log(input.value);
		});
	}

	form.addEventListener("submit", validate);
};
