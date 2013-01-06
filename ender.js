!function ($) {
    $.ender({
        hoverintent: function (over, out, options) {
            return this.forEach(function(el) {
                hoverintent(options).hover(el, over, out);
            });
        }
    }, true);
}(ender);
