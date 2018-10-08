(function() {
  "use strict";

  // look for all instances of `.progressbar` and initialise each
  let progressbar = Array.from(document.getElementsByClassName("progressbar"));
  progressbar.forEach(bar => new Progressbar(bar));

  /**
   * Progressbar() is the main constructor method
   *
   * @param object bar
   * @return void
   */
  function Progressbar(bar) {
    // define `p` object and all parameters associated to it
    var p = [
      "bar", "points", "pointCount", "activePoint", "maxIndex",
      "activePointIndex", "nextPointIndex", "prevPointIndex"
    ].reduce((p, param) => { p[ param ] = null; return p; }, {});

    // assign progress bar element to the object
    p.bar = bar;
    // initialise all the points on the progress bar
    initPoints();
    // bind and expose methods to the progress bar
    //   usage: `document.getElementById('progressbar').next();`
    p.bar.next = onNext.bind(p.bar);
    p.bar.prev = onPrev.bind(p.bar);
    p.bar.pick = onPick.bind(p.bar);

    /**
     * onNext() contains logic to move the progress bar on to the next point
     *
     * @return void
     */
    function onNext() {
      if (p.activePointIndex !== p.nextPointIndex) {
        pick(p.nextPointIndex);
      }
    }

    /**
     * onPrev() contains logic to move the progress bar back to the last point
     *
     * @return void
     */
    function onPrev() {
      if (p.activePointIndex !== p.prevPointIndex) {
        pick(p.prevPointIndex);
      }
    }

    /**
     * onPick() contains logic to move the progress bar to the requested point
     *
     * @return void
     */
    function onPick(point) {
      let pointIndex = Math.min(Math.max((point - 1), 0), p.maxIndex);
      if (p.activePointIndex !== pointIndex) {
        pick(pointIndex);
      }
    }

    /**
     * pick() iterates all points and activates the requested index then
     * deactivates all other points. Always use this method to activate a point.
     *
     * @return void
     */
    function pick(index) {
      p.points.forEach((point, i) => {
      if (i === index)
        __setActivePoint(point);
      else
        delete point.dataset.active;
      });
    }

    /**
     * __setActivePoint() sets the requested point as the active point and sets
     * indexes for active, next and previous points. It should only be called
     * via the `pick()` method to ensure other points are deactivated.
     *
     * @return void
     */
    function __setActivePoint(point) {
      p.activePoint = point;
      p.activePointIndex = p.points.indexOf(point);
      p.nextPointIndex = Math.min((p.activePointIndex + 1), p.maxIndex);
      p.prevPointIndex = Math.max((p.activePointIndex - 1), 0);
      point.dataset.active = 1;
    }

    /**
     * initPoints() loops through and initialises all points within the
     * initialised `bar` element
     *
     * @return void
     */
    function initPoints() {
      p.points = Array.from(p.bar.getElementsByTagName("li"));
      p.points.forEach((point, i) => {
        // define active index
        if (point.dataset.active && p.activePointIndex === null) {
          p.activePointIndex = i;
        }
        // prep each point
        point.className = point.className.concat(" progressbar__item").trim();
        let c = point.innerHTML;
        point.innerHTML = "";
        // construct step title
        let s = document.createElement("DIV");
        s.className  = "progressbar__title";
        s.innerHTML  = (p.bar.dataset.stepPrefix || "Step").trim();
        s.innerHTML += " "+(i + 1);
        point.append(s);
        // construct wrapper for content
        let w = document.createElement("DIV");
        w.className = "progressbar__content";
        w.innerHTML = c;
        point.append(w);
      });
      p.pointCount = p.points.length;
      p.maxIndex = p.pointCount - 1;
      pick(p.activePointIndex || 0);
    }
  }
})();
