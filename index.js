;(function(global) {

var hoverintent = function(el, over, out) {
  var x, y, pX, pY;
  var h = {},
    state = 0,
    timer = 0;

  var options = {
    sensitivity: 7,
    interval: 100,
    timeout: 0
  };

  var defaults = function(opt) {
    options = merge(opt || {}, options);
  };

  var merge = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  };

  var track = function(e) {
    x = e.clientX;
    y = e.clientY;
  };

  var delay = function(el, outEvent, e) {
    if (timer) timer = clearTimeout(timer);
    state = 0;
    return outEvent.call(el, e);
  };

  var dispatch = function(e, event, over) {
    var tracker = function(e) {
      track(e);
    };

    if (timer) timer = clearTimeout(timer);
    if (over) {
      pX = e.clientX;
      pY = e.clientY;
      el.addEventListener('mousemove', tracker, false);

      if (state !== 1) {
        timer = setTimeout(function() {
          compare(el, event, e);
        }, options.interval);
      }
    } else {
      el.removeEventListener('mousemove', tracker, false);

      if (state === 1) {
        timer = setTimeout(function() {
          delay(el, event, e);
        }, options.timeout);
      }
    }
    return this;
  };

  var compare = function(el, overEvent, e) {
    if (timer) timer = clearTimeout(timer);
    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
      state = 1;
      return overEvent.call(el, e);
    } else {
      pX = x;
      pY = y;
      timer = setTimeout(function() {
        compare(el, overEvent, e);
      }, options.interval);
    }
  };

  // Public methods
  h.options = function(opt) {
    defaults(opt);
  };

  var dispatchOver = function(e) {
    dispatch(e, over, true);
  };
  var dispatchOut = function(e) {
    dispatch(e, out);
  };

  h.remove = function() {
    if (!el) return;
    el.removeEventListener('mouseover', dispatchOver, false);
    el.removeEventListener('mouseout', dispatchOut, false);
  };

  if (el) {
    el.addEventListener('mouseover', dispatchOver, false);
    el.addEventListener('mouseout', dispatchOut, false);
  }

  defaults();
  return h;
};

global.hoverintent = hoverintent;
if (typeof module !== 'undefined' && module.exports) module.exports = hoverintent;

})(this);
