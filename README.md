# hoverintent.js

hoverintent is a port of Brian Cherne's [hoverintent jQuery plugin](http://cherne.net/brian/resources/jquery.hoverIntent.html)
in plain old javascript. It has no dependencies with optional [Ender](http://ender.no.de/) support.

It's goal is to determine a users intention when hovering over an element by triggering a mouseover event when the cursor position
has slowed down enough.

[Check out the demo](http://tristen.ca/hoverintent.js) to see how it works in action.

## Basic usage

``` html
<script src='hoverintent.min.js'></script>
<script>
  var element = document.getElementById('element-id');
  hoverintent(element,
  function() {
    // Handler in
  }, function() {
    // Handler out
  });
</script>
```

## Additional options
Like the original plugin you can adjust mouse sensitivity or the length of time a mouse over/out event is fired:

| *Setting* | *Default* | *Description* |
| sensitivity | <pre>sensitivity: 7</pre> | The value (in pixels) the mouse cursor should not travel beyond while hoverintent waits to trigger the mouseover event. |
| interval | <pre>interval: 100</pre> | The length of time hoverintent waits to re-read mouse coordinates. |
| timeout | <pre>timeout: 0</pre> | The length of time the mouseout event is fired. |

## Ender support
Add `hoverintent` as an internal chain method to your [Ender](http://ender.no.de) compilation.

``` shell
$ ender add hoverintent
```

Use it:

``` js
$('.element').hoverintent(
    // events
);
```

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
