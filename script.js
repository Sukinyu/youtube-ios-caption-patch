// ==UserScript==
// @name         Fix MWeb Youtube Fullscreen Captions
// @author       Sukinyu
// @version      0.3.4
// @last         4/11/2026 (mm/dd/yyyy)
// @description  Fix captions on youtube videos in fullscreen mode on iOS (https://m.youtube.com/watch?). Injects a captions track with user-preferred language.
// @match        https://m.youtube.com/watch?*
// ==/UserScript==

const injectedUrls = new Set();

const po = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    const url = entry.name;
    if (!url.includes("/api/timedtext") || injectedUrls.has(url)) continue;
    injectedUrls.add(url);

    console.log("Caption request detected:", url);
    let newURL = new URL(url);
    const removeParams = [
      "potc",
      "xorb",
      "xobt",
      "xovt",
      "cbr",
      "cbrver",
      "cver",
      "cplayer",
      "cos",
      "cosver",
      "cplatform",
    ];
    [...newURL.searchParams.keys()].forEach(
      (key) => removeParams.includes(key) && newURL.searchParams.delete(key)
    );
    const userLang = navigator.language.split("-")[0] || "en"; // Use browser language or default to English
    if (
      !newURL.searchParams.has("lang", userLang) &&
      !newURL.searchParams.has("tlang")
    ) {
      newURL.searchParams.set("tlang", userLang);
    }
    const translated = newURL.searchParams.has("tlang");

    const video = document.querySelector("video");
    if (!video) return;

    const tryFetch = (returnFormat) => {
      newURL.searchParams.set("fmt", returnFormat);
      injectedUrls.add(newURL.toString());
      return fetch(newURL).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      });
    };

    const createTrack = (vttUrl) => {
      let track = video.querySelector("track[data-injected]");
      if (track) {
        if (track.src.startsWith("blob:")) {
          URL.revokeObjectURL(track.src);
        }
        track.src = vttUrl;
        console.log("Updated captions track:", vttUrl);
      } else {
        track = document.createElement("track");
        track.kind = "captions";
        track.label = "Injected CC";
        track.srclang = "en";
        track.src = vttUrl;
        track.default = true;
        track.setAttribute("data-injected", true);
        video.appendChild(track);
        console.log("Injected captions track:", vttUrl);
      }
      if (translated) {
        track.label += " (TS)"; // short form of "Translated"
      }
    };

    function json3ToVtt(json) {
    const events = json.events || [];
    const pens = json.pens || [];

    // ---------- helpers ----------
    function ts(ms) {
        const s = ms / 1000;
        const h = String(Math.floor(s / 3600)).padStart(2, "0");
        const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
        const sec = (s % 60).toFixed(3).padStart(6, "0");
        return `${h}:${m}:${sec}`;
    }

    function rgb(num) {
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }

    function penToCss(pen) {
        const italic = pen.iAttr ? (pen.iAttr == 1) ? 'font-style: italic;' : '' : '';
        const edgeType = pen.etEdgeType ?? 0;
        if (!pen) return "color: rgba(255,255,255,1);";
        const c = rgb(pen.fcForeColor ?? 0xffffff);
        const alpha = pen.foForeAlpha != null ? (pen.foForeAlpha / 255) : 1;
        const cB = rgb(pen.bcBackColor ?? 0);
        const bgAlpha = pen.boBackAlpha != null ? (pen.boBackAlpha / 255) : 0.5;
        const fs = 0.0445 * parseFloat(video.style.height);
        const eC = edgeType != 0 ? `0 0 ${0.0625 * fs}px rgb(${rgb(pen.ecEdgeColor ?? 0)})` : null;
        const edge = edgeType == 3 ? `text-shadow: ${eC},${eC},${eC},${eC},${eC};` : '';
        const ps = pen.szPenSize ? `font-size: ${fs * pen.szPenSize / 100}px` : '';

        return `
            ${italic}
            color: rgba(${c},${alpha});
            background: rgba(${cB},${bgAlpha});
            ${edge}
            ${ps}
        `.replace(/\s+/g, " ").trim();
    }

    // ---------- build CSS from pens ----------
    let style = `WEBVTT

STYLE
`;

    for (let i = 0; i < pens.length; i++) {
        const pen = pens[i];
        if (!pen || Object.keys(pen).length === 0) continue;

        style += `::cue(.pen${i}) { ${penToCss(pen)} }\n`;
    }

    style += "\n";

    // ---------- build cues ----------
    let vtt = style;

    for (const ev of events) {
        if (!ev.segs?.length) continue;

        const start = ts(ev.tStartMs);
        const end = ts(ev.tStartMs + (ev.dDurationMs || 0));

        let parts = [];

        for (const seg of ev.segs) {
            const text = seg.utf8;
            const penId = seg.pPenId ?? 0;

            if (!text) continue;

            parts.push(`<c.pen${penId}>${text}</c.pen${penId}>`);
        }

        if (!parts.length) continue;

        const line = parts.join("");

        vtt += `${start} --> ${end}\n`;
        vtt += `${line}\n\n`;
    }

    return vtt;
}

    function srv3ToVttBlob(srv3Text) {
      const lines = ["WEBVTT\n\n"];

      const pMatches = srv3Text.matchAll(
        /<p\s+[^>]*t="(\d+)"\s+d="(\d+)"[^>]*>([\s\S]*?)<\/p>/gi
      );

      for (const [, tStr, dStr, content] of pMatches) {
        const start = +tStr / 1000;
        const dur = +dStr / 1000;
        const end = start + dur;

        const sMatches = [
          ...content.matchAll(/<s(?:\s+t="(\d+)")?[^>]*>(.*?)<\/s>/gi),
        ];

        if (!sMatches.length) {
          lines.push(`${fmtTime(start)} --> ${fmtTime(end)}`, "", "");
          continue;
        }

        const cueText = sMatches
          .map(([, offsetStr, text], i) => {
            if (!text) return "";
            const abs = start + (+offsetStr || 0) / 1000;
            return text + `<${fmtTime(abs)}>`;
          })
          .join("");

        lines.push(`${fmtTime(start)} --> ${fmtTime(end)}`, cueText, "");
      }

      return URL.createObjectURL(
        new Blob([lines.join("\n")], { type: "text/vtt" })
      );

      function fmtTime(t) {
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = Math.floor(t % 60);
        const ms = Math.floor((t % 1) * 1000);

        const pad = (n, len = 2) => String(n).padStart(len, "0");
        return h
          ? `${pad(h)}:${pad(m)}:${pad(s)}.${String(ms).padStart(3, "0")}`
          : `${pad(m)}:${pad(s)}.${String(ms).padStart(3, "0")}`;
      }
    }
    // Try JSON3 first, fallback to VTT/SRV3
    tryFetch("json3")
  .then((json) => {
    const json3 = JSON.parse(json.replace(/\\/g, "\\\\"));
    const blobUrl = URL.createObjectURL(
      new Blob([json3ToVtt(json3)],{ type: "text/vtt" })
    );
    createTrack(blobUrl);
  })
  .catch(() => 
      tryFetch("vtt")
    .then((vttText) => {
      // Modify VTT content
      const modified = vttText
        .replace(/Style:/g, "STYLE")
        .replace(/##/g, "");

      const blobUrl = URL.createObjectURL(
        new Blob([modified], { type: "text/vtt" })
      );
      createTrack(blobUrl);
    })
    .catch(() =>
      tryFetch("srv3").then((txt) => {
        console.log("SRV3 fallback");
        createTrack(srv3ToVttBlob(txt));
      })
    )
  );
  }
});

po.observe({ type: "resource", buffered: true });
