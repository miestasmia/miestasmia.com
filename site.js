/*
    This file is part of jonn.me.

    jonn.me is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    jonn.me is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with jonn.me.  If not, see <http://www.gnu.org/licenses/>.
*/

var $ = function() {
    return document.querySelectorAll.apply(document, arguments);
};

var locale = 'en';

// Set locale
if (path[2] in translations)
    locale = path[2];
else {
    for (var i in navigator.languages) {
        var l = navigator.languages[i].split('-')[0];
        if (l in translations) {
            locale = l;
            break;
        }
    }
}
var localeData = translations[locale];

var texts = $('[data-text]');
for (var i = 0; i < texts.length; i++) {
    var el = texts[i];

    if (el.dataset.text) {
        el.textContent = localeData[el.dataset.text];
        var val = el.innerHTML;
        var replacements = translationReplacements[el.dataset.text];
        for (var j in replacements)
            val = val.replace("{" + j + "}", replacements[j]);
        el.innerHTML = val;
        twemoji.parse(el);
    }
}

var menuItems = $('#header > ul > li');
for (var i = 0; i < menuItems.length; i++) {
    var el = menuItems[i];
    (function(el) {
        el.addEventListener('click', function() {
            el.childNodes[0].click();
        });
    })(el); // my god js is dumb sometimes
}
