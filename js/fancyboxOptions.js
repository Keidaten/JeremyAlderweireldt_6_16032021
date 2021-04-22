export const fancyboxOptions = () => {
	$("[data-fancybox='gallery']").fancybox({
		infobar: false,
		thumbs: {
			// autoStart: false,
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
		idleTime: 9999,
		smallBtn: "auto",
		baseTpl:
			"<div class='fancybox-container' role='dialog' tabindex='-1'>" +
			"<div class='fancybox-bg'></div>" +
			"<div class='fancybox-inner' aria-label=”image closeup view”>" +
			"<div class='fancybox-toolbar'>{{buttons}}</div>" +
			"<div class='fancybox-navigation'>{{arrows}}</div>" +
			"<div class='fancybox-stage'></div>" +
			"<div class='fancybox-caption' tabindex='0'><div class='fancybox-caption__body'></div></div>" +
			"</div>" +
			"</div>",
		btnTpl: {
			close:
				"<button aria-label='Fermer' data-fancybox-close class='fancybox-button fancybox-button--close' title='{{CLOSE}}'>" +
				"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z'/></svg>" +
				"</button>",

			// Arrows
			arrowLeft:
				"<button aria-label='Précédent' data-fancybox-prev class='fancybox-button fancybox-button--arrow_left' title='{{PREV}}'>" +
				"<div><svg class='arrowFancy' width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><g data-name='Layer 2'><g data-name='chevron-left'><rect width='24' height='24' transform='rotate(90 12 12)' opacity='0'/><path d='M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z'/></g></g></svg></div>" +
				"</button>",

			arrowRight:
				"<button aria-label='Suivant' data-fancybox-next class='fancybox-button fancybox-button--arrow_right' title='{NEXT}}'>" +
				"<div><svg class='arrowFancy' width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><g data-name='Layer 2'><g data-name='chevron-right'><rect width='24' height='24' transform='rotate(-90 12 12)' opacity='0'/><path d='M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z'/></g></g></svg></div>" +
				"</button>",
		},
	});
	$("[data-fancybox='images']").fancybox({
		afterLoad: function (instance, current) {
			current.$image.attr("alt", current.opts.$orig.find("img").attr("alt"));
		},
	});
};
