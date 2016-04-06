hoverintent
---

hoverintent is a reworking of Brian Cherne's [jQuery plugin](http://cherne.net/brian/resources/jquery.hoverIntent.html)
in plain javascript. It has no dependencies.

It's goal is to determine a user's intention when hovering over an element by triggering a mouseover event when the cursor position
has slowed down enough.

[Check out the demo](http://tristen.ca/hoverintent) to see how it works in action.

### Browser Support

| <img src="http://i.imgur.com/dJC1GUv.png" width="48px" height="48px" alt="Chrome logo"> | <img src="http://i.imgur.com/o1m5RcQ.png" width="48px" height="48px" alt="Firefox logo"> | <img src="http://i.imgur.com/8h3iz5H.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="http://i.imgur.com/iQV4nmJ.png" width="48px" height="48px" alt="Opera logo"> | <img src="http://i.imgur.com/j3tgNKJ.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| All ✔ | All ✔ | 9+ ✔ | 7+ ✔ | All ✔ |

### Basic usage

#### Adding hoverintent to an element

``` html
<script src='hoverintent.min.js'></script>
<script>
  var el = document.getElementById('element-id');
  hoverintent(el,
  function() {
    // Handler in
  }, function() {
    // Handler out
  });
</script>
```

#### Removing hoverintent from an element

``` html
<script src='hoverintent.min.js'></script>
<script>
  var el = document.getElementById('element-id');

  // Save a reference to the method
  var hoverListener = hoverintent(el,
  function() {
    // Handler in
  }, function() {
    // Handler out
  });

  // Remove hoverintent listeners
  hoverListener.remove();
</script>
```

### Custom options
You can adjust mouse sensitivity or the length of time a mouse over/out event is fired:

``` html
<script src='hoverintent.min.js'></script>
<script>
  var opts = {
    timeout: 500,
    interval: 50
  };

  var el = document.getElementById('element-id');
  hoverintent(el,
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
| interval | <pre>interval: 100</pre> | The length of time (in milliseconds) hoverintent waits to re-read mouse coordinates. |
| timeout | <pre>timeout: 0</pre> | The length of time (in milliseconds) before the `mouseout` event is fired. |

### Ender support
Add `hoverintent` as an internal chain method to your [Ender](https://github.com/ender-js/Ender) compilation.

``` js
// ender add hoverintent

$('.element').hoverintent(function() {
    // Handler in
}, function() {
    // Handler out
});
```

### Building

to manage dependencies and build. Development requires you
have [node.js](http://nodejs.org) installed.

1. [Install node.js](http://nodejs.org/). 'Install' will download a package for
your OS.
3. Run `npm install`
4. Run `npm run build`

### Licence

     _____
    < MIT >
     -----
            \   ^__^
             \  (oo)\_______
                (__)\       )\/\
                    ||----w |
                    ||     ||

### Bugs?

[Create an issue](https://github.com/tristen/hoverintent/issues)
