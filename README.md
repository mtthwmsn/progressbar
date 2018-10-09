# Usage

Create an unordered list `<ul>` with the class `progressbar`

```html
<ul class="progressbar" id="progressbar">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>
</ul>
```

## Events

### `change`

`change` is an exposed event. It is triggered every time the active point on the
progress bar is updated.

```js
document.getElementById('progressbar').addEventListener("change", function() {
	console.log("Progress Bar has changed");
});
```

## Methods

### `next(fn callback())`

Use `next()` to move the progress bar on to the next point.

```js
document.getElementById('progressbar').next();
document.getElementById('progressbar').next(function(p) {
	alert('next point selected');
});
```
*This method will have no effect (and any callback will not be executed) if the
progress bar has reached the end.*

### `prev(fn callback())`

Use `prev()` to move the progress bar back to the previous point.

```js
document.getElementById('progressbar').prev();
document.getElementById('progressbar').prev(function(p) {
	alert('previous point selected');
});

```
*This method will have no effect (and callback will not be executed) if the
progress bar is still at the start.*

### `pick(int stepNumber, fn callback())`

Use `pick()` to move the progress bar to the requested `stepNumber`. Provide
zero-based index for `stepNumber`.

```js
document.getElementById('progressbar').pick(1);
document.getElementById('progressbar').pick(1, function(p) {
	alert('point '+p.activePointIndex+' selected');
});
```
*If the requested number exceeds to the number of steps, the final step will be
picked. If the requested number is below 0, the first step will be picked.*
