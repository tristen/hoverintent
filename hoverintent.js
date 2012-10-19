//  hoverintent.js
//  tristen @fallsemo
!function(window, document, undefined) {
    var x, y, pX, pY;
    var state = 0,
        timer = 0;

    function merge(obj) {
        for (var i = 1; i < arguments.length; i++) {
            var def = arguments[i];
            for (var n in def) {
                if (obj[n] === undefined) obj[n] = def[n];
            }
        }
        return obj;
    }

    // cross-browser events
    function addEvent(object, event, method) {
        if (object.attachEvent) {
            object['e'+event+method] = method;
            object[event+method] = function(){object['e'+event+method](window.event);};
            object.attachEvent('on'+event, object[event+method]);
        } else {
            object.addEventListener(event, method, false);
        }
    }

    function removeEvent(object, event, method) {
        if (object.detachEvent) {
            object.detachEvent('on'+event, object[event+method]);
            object[event+method] = null;
        } else {
            object.removeEventListener(event, method, false);
        }
    }

    var options = {
        sensitivity: 7,
        interval: 100,
        timeout: 0
    }

    // Constructor
    var HoverIntent = function HoverIntent(o) {
      if (!this.hover) return new HoverIntent(o);
      this.options = merge(o || {}, HoverIntent.options, options);
    }

    HoverIntent.options = {};

    merge(HoverIntent.prototype, {
        hover: function(el, over, out) {
            var self = this;

            if (el) {
                addEvent(el, 'mouseover', function(e) { self.dispatch(e, over, true); });
                addEvent(el, 'mouseout', function(e) { self.dispatch(e, out); });
            }

            return self;
        },
        track: function(e) {
            x = e.pageX; y = e.pageY;
            return this;
        },
        compare: function(el, overEvent, e) {
            var self = this;
            if (timer) timer = clearTimeout(timer);
            if ((Math.abs(pX - x) + Math.abs(pY - y)) < self.options.sensitivity) {
                removeEvent(el, 'mousemove', self.track);
                state = 1;
                return overEvent(e);
            } else {
                pX = x; pY = y;
                timer = setTimeout(function () {
                    self.compare(el, overEvent, e);
                }, self.options.interval);
            }
        },
        delay: function(outEvent, e) {
            if (timer) timer = clearTimeout(timer);
            state = 0;
            return outEvent(e);
        },
        dispatch: function(e, event, o) {
            var self = this,
                el = e.currentTarget;

            if (timer) timer = clearTimeout(timer);
            if (o) {
                pX = e.pageX;
                pY = e.pageY;
                addEvent(el, 'mousemove', self.track(e));

                if(state !== 1) {
                    timer = setTimeout(function() {
                        self.compare(el, event, e);
                    }, self.options.interval);
                }
            } else {
                removeEvent(el, 'mousemove', self.track(e));
                if (state === 1) {
                    timer = setTimeout(function() {
                        self.delay(event, e);
                    }, self.options.timeout);
                }
            }
            return self;
        }
    });

    window.HoverIntent = HoverIntent;
}(window, document);
