/*!
 * hoverintent v0.0.1 (2013-01-15)
 * http://tristen.ca/hoverintent
 * Copyright (c) 2013 ; Licensed MIT
*/

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

    // Cross browser events
    var addEvent = function(object, event, method) {
        if (object.attachEvent) {
            object['e'+event+method] = method;
            object[event+method] = function(){object['e'+event+method](window.event);};
            object.attachEvent('on'+event, object[event+method]);
        } else {
            object.addEventListener(event, method, false);
        }
    };

    var removeEvent = function(object, event, method) {
        if (object.detachEvent) {
            object.detachEvent('on'+event, object[event+method]);
            object[event+method] = null;
        } else {
            object.removeEventListener(event, method, false);
        }
    };

    var track = function(e) { x = e.pageX; y = e.pageY; };

    var delay = function(el, outEvent, e) {
        if (timer) timer = clearTimeout(timer);
        state = 0;
        return outEvent.call(el, e);
    };

    var dispatch = function(e, event, over) {
        var el = e.currentTarget;

        if (timer) timer = clearTimeout(timer);
        if (over) {
            pX = e.pageX;
            pY = e.pageY;

            addEvent(el, 'mousemove', track(e));

            if (state !== 1) {
                timer = setTimeout(function() {
                    compare(el, event, e);
                }, options.interval);
            }
        } else {
            removeEvent(el, 'mousemove', track(e));
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
            removeEvent(el, 'mousemove', track);
            state = 1;
            return overEvent.call(el, e);
        } else {
            pX = x; pY = y;
            timer = setTimeout(function () {
                compare(el, overEvent, e);
            }, options.interval);
        }
    };

    // Public methods
    h.options = function(opt) {
        defaults(opt);
    };

    if (el) {
        addEvent(el, 'mouseover', function(e) { dispatch(e, over, true); });
        addEvent(el, 'mouseout', function(e) { dispatch(e, out); });
    }

    defaults();
    return h;
};
