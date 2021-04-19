export const fancyboxOptions = () => {
	$("[data-fancybox='gallery']").fancybox({
		thumbs: {
			autoStart: false,
		},
		buttons: [
			// "zoom",
			// "share",
			// "slideShow",
			//"fullScreen",
			//"download",
			// "thumbs",
			"close",
		],
	});
};
