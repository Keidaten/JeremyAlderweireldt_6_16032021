const modalDisplay = () => {
	// // Get the modal
	const modal = document.getElementById("myModal");

	const open = document.getElementById("myBtn");
	// // Get the button that opens the modal

	// // Get the <span> element that closes the modal
	const close = document.getElementsByClassName("modal-contact__close")[0];

	// // When the user clicks on the button, open the modal
	open.onclick = function () {
		modal.style.display = "block";
		modal.classList.add("modal-visible");
		const firstTabModal = document.querySelector("#headingModal");
		console.log(firstTabModal);
		firstTabModal.focus();
	};

	// // When the user clicks on <span> (x), close the modal
	close.onclick = function () {
		modal.style.display = "none";
	};

	// Listen enter too
	close.addEventListener("keydown", function (e) {
		if (e.code == "Enter") {
			close.click(); //Trigger search button click event
		}
	});

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
		document.querySelector(".photographInfos__name").focus();
	}

	form.addEventListener("submit", validate);
};

export const modalGestion = () => {
	modalDisplay();
};

//Trap focus to modal
