// ==UserScript==
// @name         Fix MWeb Youtube Fullscreen Captions [DEBUG]
// @author       Sukinyu
// @version      0.3.40-debug
// @description  Debug version with alerts at every key step
// @match        https://m.youtube.com/watch?*
// ==/UserScript==

// ─── STEP 1: Did the script even load? ───────────────────────────────────────
alert("[1] Script loaded.\nURL: " + location.href);

const injectedUrls = new Set();
let video = document.querySelector("video");

// ─── STEP 2: Is the video element available at load time? ────────────────────
alert(
	"[2] video element at load time: " +
		(video ? "FOUND ✅" : "NULL ❌ (will retry)"),
);

// If null, keep retrying until it appears
if (!video) {
	const waitForVideo = setInterval(() => {
		video = document.querySelector("video");
		if (video) {
			clearInterval(waitForVideo);
			alert("[2b] video element found after delay ✅");
		}
	}, 500);
}

const defaultFont =
	'"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';
let currentPens = [];

function calculateBaseFontSize(videoWidth, videoHeight) {
	let baseSize = (videoHeight / 360) * 16;
	if (videoHeight >= videoWidth) {
		const threshold = videoHeight > videoWidth * 1.3 ? 480 : 640;
		baseSize = (videoWidth / threshold) * 16;
	}
	return rd(baseSize);
}

function ts(ms, format = false) {
	if (format) {
		const s = ms / 1000;
		const h = Math.floor(s / 3600);
		const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
		const sec = (s % 60).toFixed(3).padStart(6, "0");
		return h > 0 ? `${String(h).padStart(2, "0")}:${m}:${sec}` : `${m}:${sec}`;
	}
	return ms / 1000;
}
function rgb(num) {
	return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
}
function rd(num, decimals = 4) {
	return Number(num.toFixed(decimals));
}

function penFontFamily(pen) {
	const fontFamily = pen.fsFontStyle;
	switch (fontFamily) {
		case 1:
			return '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
		case 2:
			return '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
		case 3:
			return '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
		case 4:
			return defaultFont;
		case 5:
			return '"Comic Sans MS", Impact, Handlee, fantasy';
		case 6:
			return '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
		case 7:
			return 'Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
	}
}

function penToCss(pen) {
	if (!pen) return "color: rgba(255,255,255,1);";
	const videoRect = video.getBoundingClientRect();
	let fs = calculateBaseFontSize(videoRect.width, videoRect.height);
	const fontSizeIncrement = pen.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	let fontSizeMultiplier = 1 + 0.25 * fontSizeIncrement;
	const fontSizeCss =
		fontSizeMultiplier !== 1 ? `font-size: ${fs * fontSizeMultiplier}px;` : "";
	const c = rgb(pen.fcForeColor ?? 0xffffff);
	const foreAlpha = rd(pen.foForeAlpha != null ? pen.foForeAlpha / 255 : 1);
	const cB = rgb(pen.bcBackColor ?? 0);
	const backAlpha = rd(
		pen.boBackAlpha != null ? pen.boBackAlpha / 255 : 0.5,
		4,
	);
	const edgeType = pen.etEdgeType ?? 0;
	let textShadow = "";
	if (edgeType) {
		textShadow = "text-shadow: ";
		const scale = fs / 16 / 2;
		const K = rd(Math.max(scale, 1));
		const v = rd(Math.max(scale * 2, 1));
		const w = rd(Math.max(scale * 3, 1));
		let eC = pen.ecEdgeColor != null ? `rgb(${rgb(pen.ecEdgeColor)})` : null;
		let darkShadow = eC ?? `rgba(34, 34, 34, ${foreAlpha})`;
		let lightShadow = eC ?? `rgba(204, 204, 204, ${foreAlpha})`;
		switch (edgeType) {
			case 1:
				textShadow += `${K}px ${K}px ${darkShadow}, ${K + 1}px ${K + 1}px ${darkShadow}, ${K + 2}px ${K + 2}px ${darkShadow}`;
				break;
			case 2:
				textShadow += `${K}px ${K}px ${lightShadow}, -${K}px -${K}px ${darkShadow}`;
				break;
			case 3:
				textShadow += Array(5).fill(`0 0 ${v}px ${darkShadow}`).join(", ");
				break;
			case 4:
				const shadows = [];
				for (let blur = w; blur <= Math.max(5 * scale, 1); blur += scale) {
					shadows.push(`${v}px ${v}px ${rd(blur, 4)}px ${darkShadow}`);
				}
				textShadow += shadows.join(", ");
				break;
		}
		textShadow += ";";
	}
	const bold = pen.bAttr == 1 ? "font-weight: bold;" : "";
	const italic = pen.iAttr == 1 ? "font-style: italic;" : "";
	const underline = pen.uAttr == 1 ? "text-decoration: underline;" : "";
	const fontFamily = penFontFamily(pen);
	const fontVariant =
		Number(pen.fsFontStyle ?? 0) === 7 ? "font-variant: small-caps;" : "";
	const fontFamilyCss = !fontFamily ? "" : `font-family: ${fontFamily};`;
	return `${bold} ${italic} ${underline} ${fontVariant} color: rgba(${c},${foreAlpha}); background: rgba(${cB},${backAlpha}); ${fontFamilyCss} ${fontSizeCss} ${textShadow}`
		.replace(/\s+/g, " ")
		.trim();
}

function setCaptionStyle(cssText) {
	let styleEl = document.getElementById("vtt-style");
	if (!styleEl) {
		styleEl = document.createElement("style");
		styleEl.id = "vtt-style";
		document.head.appendChild(styleEl);
	}
	styleEl.textContent = cssText;
}

function generatePenStyles() {
	if (currentPens.length === 0) return null;
	const vRect = video.getBoundingClientRect();
	const fs = calculateBaseFontSize(vRect.width, vRect.height);
	let style = `::cue(v) { font-family: ${defaultFont}; font-size: ${fs}px; line-height: normal; }\n`;
	style += `::cue(v.bg) { background: rgba(0,0,0,0.5);}\n`;
	style += `::cue(c) { font-family: ${defaultFont}; font-size: ${fs}px; line-height: normal; }\n`;
	for (let i = 0; i < currentPens.length; i++) {
		const pen = currentPens[i];
		if (!pen || Object.keys(pen).length === 0) continue;
		style += `::cue(.pen${i}) { ${penToCss(pen)} }\n`;
	}
	return style;
}

function mapPosToCue(pos, pen, fs) {
	if (!pos) return { line: 90, position: 21.5, size: 70, align: "left" };
	const rawHor = pos.ahHorPos != null ? pos.ahHorPos : 50;
	let rawVer = pos.avVerPos != null ? pos.avVerPos : 100;
	const anchorPoint = pos.apPoint;
	const hasAnchor = anchorPoint != null;
	let hor = rawHor * 0.96 + 2;
	let ver = rawVer * 0.96 + 2;
	const fontSizeIncrement = pen?.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	if (hasAnchor && [0, 3, 6].includes(anchorPoint)) {
		hor = Math.max(hor / (1 + fontSizeIncrement * 2), 2);
	}
	let position = hor;
	let align = null;
	if (hasAnchor) {
		switch (anchorPoint) {
			case 0:
			case 3:
			case 6:
				align = "left";
				break;
			case 2:
			case 5:
			case 8:
				align = "right";
				break;
			case 1:
			case 4:
			case 7:
				align = "center";
				break;
		}
	}
	return { line: ver, position, align, positionAlign: null };
}

function addCuesToTrack(track, json) {
	const events = json.events || [];
	const pens = json.pens || [];
	const wpWinPositions = json.wpWinPositions || [];
	currentPens = pens;

	// ─── STEP 6: What's in the JSON? ─────────────────────────────────────────
	alert(
		"[6] JSON parsed ✅\nevents: " +
			events.length +
			"\npens: " +
			pens.length +
			"\nwpWinPositions: " +
			wpWinPositions.length,
	);

	const videoRect = video.getBoundingClientRect();
	const fs = calculateBaseFontSize(videoRect.width, videoRect.height);
	updateCaptionStyles();
	const style = generatePenStyles();
	if (style) setCaptionStyle(style);

	for (const ev of events) {
		if (!ev.segs || !ev.segs.length) continue;
		const start = ts(ev.tStartMs);
		const end = ts(ev.tStartMs + (ev.dDurationMs || 0));
		const parts = [];
		ev.segs.forEach((seg) => {
			if (!seg.utf8.length) return;
			if (seg.tOffsetMs)
				parts.push(`<${ts(ev.tStartMs + seg.tOffsetMs, true)}>`);
			let text = seg.utf8;
			if (seg.pPenId != null) text = `<c.pen${seg.pPenId}>${text}</c>`;
			parts.push(text);
		});
		if (parts.length === 1 && parts[0] == "\n") continue;
		parts.unshift(
			`<c${parts.includes("</c>") ? ".bg" : ""}${ev.pPenId ? `.pen${ev.pPenId}` : ""}>`,
		);
		parts.push("</c>");
		let cueText = parts.join("");
		let cue = new VTTCue(start, end, cueText);
		if (!ev.segs?.length) continue;
		if (ev.segs[0].utf8 === "\n") continue;
		cue.snapToLines = wpWinPositions ? false : true;
		const posId = ev.wpWinPosId;
		const pos = wpWinPositions[posId];
		const eventPen = ev.pPenId != null ? pens[ev.pPenId] : null;
		const placement = mapPosToCue(pos, eventPen, fs);
		placement.line && (cue.line = rd(placement.line, 2));
		cue.lineAlign = placement.lineAlign;
		if (placement.position != null) cue.position = rd(placement.position, 2);
		placement.align && (cue.align = placement.align);
		placement.positionAlign && (cue.positionAlign = placement.positionAlign);
		track.addCue(cue);
	}

	for (let i = 0; i < track.cues.length; i++) {
		for (let j = i + 1; j < Math.min(i + 2, track.cues.length); j++) {
			const cue1 = track.cues[i];
			const cue2 = track.cues[j];
			if (cue1.endTime > cue2.startTime && cue1.startTime <= cue2.endTime) {
				if (cue1.align === "left" && cue2.align === "left") {
					const timestamp = `<${ts(cue2.startTime * 1000, true)}>`;
					cue1.text += `\n${timestamp}${cue2.text}`;
					cue2.startTime = cue1.endTime;
					if (cue2.endtime == cue1.endTime) track.removeCue(cue2);
				}
			}
		}
	}

	// ─── STEP 7: How many cues were added? ───────────────────────────────────
	alert(
		"[7] Cues added to track: " +
			(track.cues ? track.cues.length : "track.cues is NULL ❌"),
	);
}

// ─── STEP 3: Is PerformanceObserver supported? ───────────────────────────────
alert(
	"[3] PerformanceObserver supported: " +
		(typeof PerformanceObserver !== "undefined" ? "YES ✅" : "NO ❌"),
);

const po = new PerformanceObserver((list) => {
	for (const entry of list.getEntries()) {
		const url = entry.name;

		// ─── STEP 4: Did the observer fire for ANY resource? ─────────────────
		// (Only alerts once for timedtext to avoid spam)
		if (url.includes("/api/timedtext")) {
			if (injectedUrls.has(url)) {
				alert(
					"[4] timedtext URL seen but already injected (duplicate), skipping.",
				);
				continue;
			}

			alert("[4] timedtext URL detected ✅\n" + url.substring(0, 120) + "...");
			injectedUrls.add(url);

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
				(key) => removeParams.includes(key) && newURL.searchParams.delete(key),
			);
			const userLang = navigator.language.split("-")[0] || "en";
			if (
				!newURL.searchParams.has("lang", userLang) &&
				!newURL.searchParams.has("tlang")
			) {
				newURL.searchParams.set("tlang", userLang);
			}
			const translated = newURL.searchParams.has("tlang");

			// ─── STEP 5: Can we add a text track? ────────────────────────────
			let track;
			try {
				track =
					video.textTracks &&
					[...video.textTracks].find((t) => t.label.includes("Injected CC"));
				if (!track) {
					track = video.addTextTrack("captions", "Injected CC", userLang);
					track.mode = "showing";
					alert(
						"[5] addTextTrack() called ✅\ntrack.mode after set: " +
							track.mode +
							"\n(if mode is not 'showing', iOS is blocking it)",
					);
				} else {
					if (track.cues)
						[...track.cues].forEach((cue) => track.removeCue(cue));
					alert("[5] Existing track found, cues cleared ✅");
				}
				if (translated) track.label += " (TS)";
			} catch (e) {
				alert("[5] ❌ Error creating track:\n" + e.message);
				return;
			}

			newURL.searchParams.set("fmt", "json3");
			injectedUrls.add(newURL.toString());

			fetch(newURL)
				.then((r) => {
					alert(
						"[5b] fetch response: HTTP " + r.status + (r.ok ? " ✅" : " ❌"),
					);
					if (!r.ok) throw new Error(`HTTP ${r.status}`);
					return r.text();
				})
				.then((json) => {
					let json3;
					try {
						json3 = JSON.parse(json);
					} catch {
						json = json.replace(/"utf8":\s*"([\s\S]*?)"/g, (match, content) => {
							const fixed = content.replace(/\n/g, "\\n");
							return `"utf8": "${fixed}"`;
						});
						json3 = JSON.parse(json);
					}
					try {
						addCuesToTrack(track, json3);
					} catch (err) {
						alert(
							"[6] ❌ Error in addCuesToTrack:\n" +
								err.message +
								"\n" +
								err.stack?.substring(0, 200),
						);
					}
				})
				.catch((err) => {
					alert("[5b] ❌ fetch failed:\n" + err.message);
				});
		}
	}
});

try {
	po.observe({ type: "resource", buffered: true });
	alert(
		"[3b] PerformanceObserver.observe() succeeded ✅\n(buffered:true means past requests will also fire)",
	);
} catch (e) {
	alert("[3b] ❌ PerformanceObserver.observe() failed:\n" + e.message);
}

function updateCaptionStyles() {
	const style = generatePenStyles();
	if (style) setCaptionStyle(style);
}

window.addEventListener("resize", updateCaptionStyles);
