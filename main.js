(function() {
    "use strict";

    function toHex(text) {
        var s = unescape(encodeURIComponent(text)); // convert utf8 to latin1
        var h = [],
            c = '';

        for (var i = 0; i < s.length; i++) {
            c = s.charCodeAt(i).toString(16);

            if (c.length < 2) c = '0' + c;

            h.push(c);
        }

        return h;
    }

    function fillGrid(colors) {
        var grid = document.getElementById('color-grid'),
            div = null;

        grid.innerHTML = '<h2>Color Grid</h2>';

        for (var i = 0; i < colors.length; i++) {
            div = document.createElement('div');

            div.className = 'color-grid__item';
            div.style.backgroundColor = colors[i];

            grid.appendChild(div);
        }
    }

    function generate() {
        var elem = document.getElementById('original-text');
        var original = elem.value.trim();

        elem.value = original;

        if (0 === original.length) {
            alert('Please enter some text.');

            return;
        }

        var hex = toHex(original);
        var colors = [];
        var cur = '';

        for (var i = 0; i < hex.length; i++) {
            cur += hex[i];

            if (0 === (i + 1) % 3) {
                colors.push('#' + cur);

                cur = '';
            }
        }

        if (cur.length < 6) {
            while (cur.length < 6) cur += '00';

            colors.push('#' + cur);
        }

        fillGrid(colors);
    }

    function domReady(evt) {
        document.getElementById('generate').onclick = function(e) {
            e.preventDefault();

            generate();

            return false;
        }
    }

    window.addEventListener('DOMContentLoaded', domReady);
})();
