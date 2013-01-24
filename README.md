# hoverintent

hoverintent is a reworking of Brian Cherne's [jQuery plugin](http://cherne.net/brian/resources/jquery.hoverIntent.html)
in plain javascript. It has no dependencies.

It's goal is to determine a users intention when hovering over an element by triggering a mouseover event when the cursor position
has slowed down enough.

[Check out the demo](http://tristen.ca/hoverintent.js) to see how it works in action.

## Basic usage

``` html
<script src='hoverintent.min.js'></script>
<script>
  var element = document.getElementById('element-id');
  var h = hoverintent(element,
  function() {
    // Handler in
  }, function() {
    // Handler out
  });
</script>
```

## Custom options
You can adjust mouse sensitivity or the length of time a mouse over/out event is fired:

``` html
<script src='hoverintent.min.js'></script>
<script>
  var opts = {
    timeout: 500,
    interval: 50
  };

  var element = document.getElementById('element-id');
  var h = hoverintent(element,
  function() {
    // Handler in
  }, function() {
    // Handler out
  }).options(opts);
</script>
```

| Setting | Default Value | Description |
| ---- | ---- | ---- |
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
$('.element').hoverintent(function() {
    // Handler in
}, function() {
    // Handler out
});
```

## Building

hoverintent relies on [Grunt](http://gruntjs.com) as its build tool. Run `grunt` to package code
from any adjustments you make to `src/hoverintent.js`.

``` bash
npm install --dev
make
```

## Licence

     _____
    < MIT >
     -----
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||

## Bugs?

[Create an issue](https://github.com/tristen/hoverintent/issues)
