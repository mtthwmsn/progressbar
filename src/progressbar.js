(function() {
	'use strict';

	function init() {
		let progressbar = Array.from(document.getElementsByClassName('progressbar'));
		progressbar.forEach(bar => new Progressbar(bar));
	}

	function Progressbar(bar) {
		var p = {};
		p.bar = bar;
		p.points = null;
		p.activePoint = null;

		initPoints();
		bindEvents();

		function bindEvents() {
			// define methods
			p.onNext = function() {
				console.log('next...');
			};
			p.onPrev = function() {
				console.log('prev...');
			};
			// bind methods to element
			p.bar.next = p.onNext.bind(p.bar);
			p.bar.prev = p.onPrev.bind(p.bar);
		}

		function initPoints() {
			let points = Array.from(p.bar.getElementsByTagName('li'));
			points.forEach((point, i) => {
				// define active index
				if (point.dataset.active && p.activePoint === null)
					p.activePoint = point;
				else
					delete point.dataset.active;

				// prep each point
				point.className = point.className.concat(' progressbar__item').trim();
				let c = point.innerHTML;
				point.innerHTML = '';
				// construct step title
				let s = document.createElement('DIV');
				s.className = 'progressbar__title';
				s.innerHTML = (p.bar.dataset.stepPrefix||'Step').trim().concat(' '+(i + 1));
				point.append(s);
				// construct wrapper for content
				let w = document.createElement('DIV');
				w.className = 'progressbar__content';
				w.innerHTML = c;
				point.append(w);
			});

			p.points = points;
			p.activePoint = p.activePoint||p.points[0];
			p.activePoint.dataset.active = 1;
		}
	}

	init();
})();
