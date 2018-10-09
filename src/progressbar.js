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
      "activePointIndex", "nextPointIndex", "prevPointIndex", "onChange"
    ].reduce((p, param) => { p[ param ] = null; return p; }, {});

    // assign progress bar element to the object
    p.bar = bar;
    // create a new event for `change` of progress bar
    p.onChange = new Event("change");
    // initialise all the points on the progress bar
    initPoints();
    // bind and expose methods to the progress bar
    //   usage: `document.getElementById('progressbar').next();`
    p.bar.next = __next.bind(p.bar);
    p.bar.prev = __prev.bind(p.bar);
    p.bar.pick = __pick.bind(p.bar);

    /**
     * pick() iterates all points and activates the requested index then
     * deactivates all other points. Always use this method to activate a point.
     *
     * @param int index
     * @return void
     */
    function pick(index) {
      p.points.forEach((point, i) => __setActivePoint(point, (i === index)));
      p.bar.dispatchEvent(p.onChange);
    }

    /**
     * __next() contains logic to move the progress bar on to the next point
     *
     * @param fn callback
     * @return void
     */
    function __next(callback) {
      if (p.activePointIndex !== p.nextPointIndex) {
        pick(p.nextPointIndex);
        if (typeof callback === "function") callback(p);
      }
    }

    /**
     * __prev() contains logic to move the progress bar back to the last point
     *
     * @param fn callback
     * @return void
     */
    function __prev(callback) {
      if (p.activePointIndex !== p.prevPointIndex) {
        pick(p.prevPointIndex);
        if (typeof callback === "function") callback(p);
      }
    }

    /**
     * __pick() contains logic to move the progress bar to the requested point
     *
     * @param int point
     * @param fn callback
     * @return void
     */
    function __pick(point, callback) {
      if (p.activePointIndex !== point) {
        pick(point);
        if (typeof callback === "function") callback(p);
      }
    }

    /**
     * __setActivePoint() if `active` is true, sets the requested point as the
     * active point and sets indexes for active, next and previous points. If
     * `active` is false then removes active status from this point
     *
     * This method  should only be called via the `pick()` method to ensure
     * other points are deactivated.
     *
     * @param object point
     * @param active bool
     * @return void
     */
    function __setActivePoint(point, active) {
      if (active === true) {
        p.activePoint = point;
        p.activePointIndex = p.points.indexOf(point);
        p.nextPointIndex = Math.min((p.activePointIndex + 1), p.maxIndex);
        p.prevPointIndex = Math.max((p.activePointIndex - 1), 0);
        point.dataset.active = 1;
      }
      else {
        delete point.dataset.active;
      }
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
        point.className = point.className.concat(" progressbar__item").trim();
        // define active index
        if (point.dataset.active && p.activePointIndex === null)
          p.activePointIndex = i;
      });
      p.pointCount = p.points.length;
      p.maxIndex = p.pointCount - 1;
      pick(p.activePointIndex || 0);
    }
  }
})();
