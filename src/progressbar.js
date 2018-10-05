(function() {
	"use strict";
	var lists;

	function init() {
		lists = Array.from(document.getElementsByClassName('progressbar'));
		lists.forEach(ul => initList(ul));
	}

	function initList(list) {
		let items = Array.from(list.getElementsByTagName("li"));
		items.forEach((li, i) => {
			li.className = li.className.concat(" progressbar__item").trim();
			let content = li.innerHTML;
			li.innerHTML = "";
			// construct step title
			let s = document.createElement("DIV");
			s.className = "progressbar__title";
			s.innerHTML = (list.dataset.stepPrefix ? list.dataset.stepPrefix : "Step").trim();
			s.innerHTML += " "+(i + 1);
			li.append(s);
			// construct wrapper for content
			let w = document.createElement("DIV");
			w.className = "progressbar__content";
			w.append(content);
			li.append(w);
		});
	}

	init();
})();
