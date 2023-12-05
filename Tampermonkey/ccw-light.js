// ==UserScript==
// @name         CCW Light Theme
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Change the theme of ccw.site to a light theme
// @author       DilemmaGX
// @match        https://www.ccw.site/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var rootElement = document.getElementById('root');
    var top = rootElement.children[1].children[0].children[0];
    if (top.children[0] && top.children[0].hasAttribute('style')) {
        var container = top.children[0];
        container.setAttribute('style', 'background-image: url(""); background-color: rgb(255, 255, 255); padding: 0.364583rem 0px;');
        top.childNodes.forEach(function(child) {
            if (child.hasAttribute('style')) {
                child.setAttribute('style', 'background-image: url(""); background-color: rgb(255, 255, 255); padding: 0.364583rem 0px;');
            }
        });
    }

    var bkg01 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                var top = rootElement.children[1].children[0].children[0];
                if (top.children[0] && top.children[0].hasAttribute('style')) {
                    var container = top.children[0];
                    container.setAttribute('style', 'background-image: url(""); background-color: rgb(255, 255, 255); padding: 0.364583rem 0px;');
                    top.childNodes.forEach(function(child) {
                        if (child.hasAttribute('style')) {
                            child.setAttribute('style', 'background-image: url(""); background-color: rgb(255, 255, 255); padding: 0.364583rem 0px;');
                        }
                    });
                }
            }
        });
    });

    var text01 = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            for(var i = 0; i < mutation.addedNodes.length; i++){
                var child = mutation.addedNodes[i];
                for(var j = 0; j < child.children.length; j++){
                    if (child.children[j].tagName.toLowerCase() === 'ul') {
                        console.log('awa');
                        //将child.children[j]的子集(li)的子集(div)的子集的每一项（你应当使用for循环）的子集的第二项的子集的第三项的子集的子集的第二项的子集中<span>的内容setAttribute将style设为color: #999
                    } else {
                        child.children[j].children[0].setAttribute('style', 'color: rgb(0, 205, 0);');
                        child.children[j].children[1].setAttribute('style', 'color: rgba(0, 0, 0, 0.6);');
                    }
                }
            }
        });
    });

    bkg01.observe(document, { childList: true, subtree: true });
    text01.observe(document, { childList: true, subtree: true });
})();
