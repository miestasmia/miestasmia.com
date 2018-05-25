/*
    This file is part of miestasmia.com.

    miestasmia.com is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    miestasmia.com is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with miestasmia.com.  If not, see <http://www.gnu.org/licenses/>.
*/

var $ = function() {
    return document.querySelectorAll.apply(document, arguments);
};

if (!twemoji)
    var twemoji = { parse: () => {} }

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

var texts = $('[data-text],[data-href],[data-title]');
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
    if (el.dataset.href) {
        var val = localeData[el.dataset.href]
        var replacements = translationReplacements[el.dataset.href];
        for (var j in replacements)
            val = val.replace("{" + j + "}", replacements[j]);
        el.href = val;
    }
    if (el.dataset.title) {
        var val = localeData[el.dataset.title]
        var replacements = translationReplacements[el.dataset.title];
        for (var j in replacements)
            val = val.replace("{" + j + "}", replacements[j]);
        el.title = val;
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
