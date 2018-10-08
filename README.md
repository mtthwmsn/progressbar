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

## Methods

### `next()`

Use `next()` to move the progress bar on the next point. 

```js
document.getElementById('progressbar').next();
```
:information_source: *If the progress bar has reached the end and there is no next point this method will have no effect.*

### `prev()`

Use `prev()` to move the progress bar back to the previous point. 

```js
document.getElementById('progressbar').prev();
```

:information_source: *If the progress bar is still at the start this method will have no effect.*

### `pick(stepNumber)`

Use `pick()` to move the progress bar to the requested `stepNumber`. The following example moves the progress bar to step 2.

```js
document.getElementById('progressbar').pick(2);
```

:information_source: *If the requested number exceeds to the number of steps, the final step will be picked. If the requested number is below 0, the first step will be picked.*
