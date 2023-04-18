// ==UserScript==
// @name         PSO command addon
// @namespace    PSO-simple
// @version      0.1
// @description  Loader simple PSO command addon
// @author       Sara
// @include      /^https:\/\/(www\.)?bondageprojects\.elementfx\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @include      /^https:\/\/(www\.)?bondage-europe\.com\/R\d+\/(BondageClub|\d+)(\/((index|\d+)\.html)?)?$/
// @source       https://github.com/longarcher/PSO-simple.git
// @downloadURL  https://github.com/longarcher/PSO-simple/raw/main/src/loader.user.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

// eslint-disable-next-line no-restricted-globals
setTimeout(
    () => {
        const n = document.createElement("script");
        n.language = "JavaScript";
        n.crossorigin = "anonymous";
        n.src = "https://github.com/longarcher/PSO-simple/main/loader.user.js";
        document.head.appendChild(n);
    },
    2000,
);
