// stw-embed.js
// Copyright © 2026 ePi Rational, Inc.  All rights reserved.
// SPDX-License-Identifier: MIT

// Load this on a page that embeds the map in an <iframe>: the full screen button inside the iframe cannot use the Fullscreen API
// without `allowfullscreen`, so it asks this page to make the iframe fill the window. Escape here gives the window back.
(function () {
    "use strict";
    const CLASS = "stw-fullscreen-frame";
    const style = document.createElement("style");
    style.textContent = "iframe." + CLASS + " { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; " +
        "max-width: none !important; margin: 0 !important; z-index: 2147483647 !important; background: #fff; }";
    document.head.appendChild(style);

    function frameOf(source) {
        return Array.prototype.find.call(document.querySelectorAll("iframe"), function (frame) { return frame.contentWindow === source; });
    }

    // Log each map's absolute URL, so it can be opened on its own: it works on localhost, a .local host or the live site.
    function logFrames() {
        Array.prototype.forEach.call(document.querySelectorAll("iframe.stw-map"), function (frame) {
            console.log("[stw] " + new URL(frame.getAttribute("src"), document.baseURI).href);
        });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", logFrames);
    else logFrames();

    window.addEventListener("message", function (event) {
        if (!event.data || event.data.type !== "stw-fullscreen") return;
        const frame = frameOf(event.source);
        if (frame) frame.classList.toggle(CLASS, !!event.data.on);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        Array.prototype.forEach.call(document.querySelectorAll("iframe." + CLASS), function (frame) {
            frame.classList.remove(CLASS);
            frame.contentWindow.postMessage({ type: "stw-fullscreen-exit" }, "*");
        });
    });
})();
