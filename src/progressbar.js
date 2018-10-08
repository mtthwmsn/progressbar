(function() {
	'use strict';

	let progressbar = Array.from(document.getElementsByClassName('progressbar'));
	progressbar.forEach(bar => new Progressbar(bar));

	function Progressbar(bar) {
		// define `p` object and all parameters associated to it
		var p = [
			'bar', 'points', 'pointCount', 'activePoint',
			'nextPointIndex', 'prevPointIndex'
		].reduce((p, param) => { p[ param ] = null; return p; }, {});

		p.bar = bar;
		initPoints();
		bindEvents();

		function bindEvents() {
			p.bar.next = onNext.bind(p.bar);
			p.bar.prev = onPrev.bind(p.bar);
			p.bar.pick = onPick.bind(p.bar);
		}

		function onNext() {
			if (p.activePointIndex !== p.nextPointIndex) {
				pick(p.nextPointIndex);
			}
		}

		function onPrev() {
			if (p.activePointIndex !== p.prevPointIndex) {
				pick(p.prevPointIndex);
			}
		}

		function onPick(point) {
			let pointIndex = Math.min(Math.max((point - 1), 0), p.maxIndex);
			if (p.activePointIndex !== pointIndex) {
				pick(pointIndex);
			}
		}

		function pick(index) {
			p.points.forEach((point, i) => {
				if (i === index)
					setActivePoint(point);
				else
					delete point.dataset.active;
			});
		}

		function setActivePoint(point) {
			p.activePoint = point;
			p.activePointIndex = p.points.indexOf(point);
			p.nextPointIndex = Math.min((p.activePointIndex + 1), p.maxIndex);
			p.prevPointIndex = Math.max((p.activePointIndex - 1), 0);
			point.dataset.active = 1;
		}

		function initPoints() {
			let activePointIndex = null;
			let points = Array.from(p.bar.getElementsByTagName('li'));
			points.forEach((point, i) => {
				// define active index
				if (point.dataset.active && activePointIndex === null) activePointIndex = i;
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
			p.pointCount = p.points.length;
			p.maxIndex = p.pointCount - 1;
			pick(activePointIndex||0);
		}
	}
})();
