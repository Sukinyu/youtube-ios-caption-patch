// ==UserScript==
// @name         YT Navigate Test
// @match        https://m.youtube.com/*
// ==/UserScript==

document.addEventListener("yt-navigate-finish", () => {
  alert("yt-navigate-finish fired!\n\n" + location.href);
});

alert("Script loaded. Navigate to a video to test.");