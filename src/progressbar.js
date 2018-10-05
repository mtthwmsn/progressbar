(function() {
	"use strict";

	function init() {
		let progressbar = Array.from(document.getElementsByClassName('progressbar'));
		progressbar.forEach(bar => new Progressbar(bar));
	}

	function Progressbar(bar) {
		var p = {};
		p.activeIndex = 0;
		p.bar = bar;
		p.points = Array.from(p.bar.getElementsByTagName("li"));
		p.points.forEach((point, i) => initPoint(point, i));
		bindEvents();

		function bindEvents() {
			console.log()
		}

		function initPoint(point, index) {
			// get first `active` point if provided
			if (!!point.dataset.active && p.activeIndex === 0)
				p.activeIndex = index;
			else
				delete point.dataset.active;
			// prep each point
			point.className = point.className.concat(" progressbar__item").trim();
			let c = point.innerHTML;
			point.innerHTML = "";
			// construct step title
			let s = document.createElement("DIV");
			s.className = "progressbar__title";
			s.innerHTML = (p.bar.dataset.stepPrefix||"Step").trim().concat(" "+(index + 1));
			point.append(s);
			// construct wrapper for content
			let w = document.createElement("DIV");
			w.className = "progressbar__content";
			w.innerHTML = c;
			point.append(w);
		}
	}

	init();
})();
