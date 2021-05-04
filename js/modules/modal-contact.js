export const modalDisplay = () => {
	// Get the modal
	const modal = document.getElementById("myModal");

	// Get the button that opens the modal
	const contactBtn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	const closeBtn = document.getElementsByClassName("modal-contact__close")[0];

	// When the user clicks on the button, open the modal
	contactBtn.onclick = function () {
		modal.style.display = "block";
		modal.classList.add("modal-visible");
		const firstTabModal = document.querySelector("#headingModal");
		firstTabModal.focus();
	};

	// When the user clicks on <span> (x), close the modal
	closeBtn.onclick = function () {
		modal.style.display = "none";
		document.querySelector(".photographInfos__name").focus();
	};

	// Listen enter too
	closeBtn.addEventListener("keydown", function (e) {
		if (e.code == "Enter") {
			closeBtn.click();
		}
	});

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	const form = document.getElementById("form");
	const inputs = document.querySelectorAll(".modal-contact__inputs");

	// Consolelog inputs
	function validate(event) {
		event.preventDefault();
		modal.style.display = "none";
		inputs.forEach((input) => {
			console.log(input.value);
		});
		document.querySelector(".photographInfos__name").focus();
	}

	form.addEventListener("submit", validate);
};
