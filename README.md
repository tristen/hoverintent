# hoverintent.js

hoverintent is a port of Brian Cherne's [hoverintent jQuery plugin](http://cherne.net/brian/resources/jquery.hoverIntent.html)
in plain old javascript. It has no dependencies.

It's goal is to determine a users intention when hovering over an element by triggering a mouseover event when the cursor position
has slowed down enough.

[Check out the demo](http://tristen.ca/hoverintent.js) to see how it works in action.

## Basic usage

``` html
<script src='hoverintent.min.js'></script>
<script>
  var element = document.getElementById('element-id');
  var hover = new HoverIntent().hover(element,
  function() {
    // Handler in
  }, function() {
    // Handler out
  });
</script>
```

## Additional options
Like the original plugin you can adjust mouse sensitivity or the length of time a mouse over/out event is fired:

#### Sensitivity
- Setting: __sensitivity__
- Default: `sensitvity: 7`
- Description: The value (in pixels) the mouse cursor should not travel beyond while hoverintent waits to trigger the mouseover event.

#### Interval
- Setting: __interval__
- Default: `interval: 100`
- Description:  The length of time hoverintent waits to re-read mouse coordinates.

#### Timeout
- Setting: __timeout__
- Default: `timeout: 0`
- Description:  The length of time the mouseout event is fired.

## Building

Developers can rebuild the minified library by running:

``` bash
  npm install --dev
  make
```

## Licence

MIT

## Bugs?

[Create an issue](https://github.com/tristen/hoverintent.js/issues)
