// ==UserScript==
// @name         Fix MWeb Youtube Fullscreen Captions
// @author       Sukinyu
// @version      0.3.33
// @last         4/15/2026 (mm/dd/yyyy)
// @description  Fix captions on youtube videos in fullscreen mode on iOS (https://m.youtube.com/watch?). Injects a captions track with user-preferred language.
// @match        https://m.youtube.com/watch?*
// ==/UserScript==

const injectedUrls = new Set();
const video = document.querySelector("video");
const defaultFont =
	'"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';

function calculateBaseFontSize(videoWidth, videoHeight) {
	let baseSize = (videoHeight / 360) * 16;

	if (videoHeight >= videoWidth) {
		// Landscape check
		const threshold = videoHeight > videoWidth * 1.3 ? 480 : 640;
		baseSize = (videoWidth / threshold) * 16;
	}

	// Return a percentage relative to a standard 16px baseline.
	return baseSize;
}

function ts(ms) {
	const s = ms / 1000;
	const h = Math.floor(s / 3600);
	const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
	const sec = (s % 60).toFixed(3).padStart(6, "0");
	return h > 0 ? `${String(h).padStart(2, "0")}:${m}:${sec}` : `${m}:${sec}`;
}
function rgb(num) {
	return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
}
function rd(num, decimals = 3) {
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

	// Get video dimensions for font size calculation
	const videoRect = video.getBoundingClientRect();
	const videoWidth = videoRect.width;
	const videoHeight = videoRect.height;

	// Calculate base font percent (YouTube's N3e function returns a size relative to 16px)
	let basefs = calculateBaseFontSize(videoWidth, videoHeight);

	// Font size multiplier (YouTube's SzJ function)
	// szPenSize is converted to fontSizeIncrement: (szPenSize / 100) - 1
	const fontSizeIncrement = pen.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	let fontSizeMultiplier = 1 + 0.25 * fontSizeIncrement;
	const fontSizeCss =
		fontSizeMultiplier !== 1 ?
			`font-size: calc(var(--caption-fs) * ${fontSizeMultiplier});`
		:	"";

	// Colors
	const c = rgb(pen.fcForeColor ?? 0xffffff);
	const foreAlpha = rd(pen.foForeAlpha != null ? pen.foForeAlpha / 255 : 1, 4);
	const cB = rgb(pen.bcBackColor ?? 0);
	const backAlpha = rd(
		pen.boBackAlpha != null ? pen.boBackAlpha / 255 : 0.5,
		4,
	);

	// Edge effects
	const edgeType = pen.etEdgeType ?? 0;
	let textShadow = "";
	if (edgeType) {
		textShadow = "text-shadow: ";
		//const K = "calc(max(var(--caption-scale), 1) * 1px)";
		//const v = "calc(max(var(--caption-scale), 1) * 2px)";
		//const w = "calc(max(var(--caption-scale), 1) * 3px)";

		let eC = pen.ecEdgeColor != null ? `rgb(${rgb(pen.ecEdgeColor)})` : null;
		let darkShadow = eC ?? `rgba(34, 34, 34, ${foreAlpha})`;
		let lightShadow = eC ?? `rgba(204, 204, 204, ${foreAlpha})`;
		switch (edgeType) {
			case 1: // Uniform raised
				textShadow += `var(--K) var(--K) ${darkShadow}, calc(var(--K) + 1px) calc(var(--K) + 1px) ${darkShadow}, calc(var(--K) + 2px) calc(var(--K) + 2px) ${darkShadow}`;
				break;
			case 2: // 3D raised
				textShadow += `var(--K) var(--K) ${lightShadow}, -var(--K) -var(--K) ${darkShadow}`;
				break;
			case 3: // Glow (most common)
				textShadow += Array(5).fill(`0 0 var(--v) ${darkShadow}`).join(", ");
				break;
			case 4: // Blur effect
				textShadow += `var(--v) var(--v) var(--w) ${darkShadow}`;
		}
		textShadow += ";";
	}

	// Text decorations
	const bold = pen.bAttr == 1 ? "font-weight: bold;" : "";
	const italic = pen.iAttr == 1 ? "font-style: italic;" : "";
	const underline = pen.uAttr == 1 ? "text-decoration: underline;" : "";
	const fontFamily = penFontFamily(pen);
	const fontVariant =
		Number(pen.fsFontStyle ?? 0) === 7 ? "font-variant: small-caps;" : "";
	const fontFamilyCss = !fontFamily ? "" : `font-family: ${fontFamily};`;

	return `
				${bold} ${italic} ${underline} ${fontVariant}
				color: rgba(${c},${foreAlpha});
				background: rgba(${cB},${backAlpha});
				${fontFamilyCss}
				${fontSizeCss}
				${textShadow}
			`
		.replace(/\s+/g, " ")
		.trim();
}
function json3ToVtt(json) {
	const events = json.events || [];
	const pens = json.pens || [];
	const wpWinPositions = json.wpWinPositions || [];

	const videoRect = video.getBoundingClientRect();
	const videoWidth = videoRect.width;
	const videoHeight = videoRect.height;
	const basefs = calculateBaseFontSize(videoWidth, videoHeight);
	const scale = basefs / 16 / 2;
	video.style.setProperty("--caption-fs", `${basefs}px`);
	video.style.setProperty("--K", `"calc($max(var(${scale}), 1px))"`);
	video.style.setProperty("--v", `"calc($max(var(${scale}) * 2, 1px))"`);
	video.style.setProperty("--w", `"calc($max(var(${scale}) * 3, 1px))"`);

	// ---------- build CSS from pens + positions ----------
	let style = `WEBVTT

STYLE
::cue(v) { font-family: ${defaultFont}; font-size: var(--caption-fs); }
::cue(c) { font-family: ${defaultFont}; font-size: var(--caption-fs); }
`;

	// Add pen styles
	for (let i = 0; i < pens.length; i++) {
		const pen = pens[i];
		if (!pen || Object.keys(pen).length === 0) continue;

		style += `::cue(.pen${i}) { ${penToCss(pen)} }\n`;
	}

	// ---------- build cues with karaoke timing ----------
	let vtt = style;

	for (const ev of events) {
		if (!ev.segs?.length) continue;

		// Get position data for this event
		const posId = ev.wpWinPosId;
		let positionAttrs = "";

		if (posId > 0 && wpWinPositions[posId]) {
			const pos = wpWinPositions[posId];
			let horPos = rd(15.5 + (pos.ahHorPos / 100) * 69, 2);
			let verPos = Math.max(0, pos.avVerPos != null ? pos.avVerPos - 2.1 : 2.1);
			let anchorPoint = pos.apPoint;

			// SRV3 AnchorPoint values:
			// 0 = top-left, 1 = top-center, 2 = top-right,
			// 3 = middle-left, 4 = center, 5 = middle-right,
			// 6 = bottom-left, 7 = bottom-center, 8 = bottom-right.

			// Apply YouTube's positioning scaling (from A(Y) function)

			const leftAnchors = new Set([0, 3, 6]);
			const rightAnchors = new Set([2, 5, 8]);

			let align = "";
			if (horPos !== 50 && anchorPoint) {
				align = " align:";
				if (anchorPoint) {
					if (leftAnchors.has(anchorPoint)) {
						align += "start";
					} else if (rightAnchors.has(anchorPoint)) {
						align += "end";
					} else align += "center";
				} else {
					horPos && (align += "center");
				}
			}

			let position =
				horPos != 50 && !align.length == 0 ? ` position:${rd(horPos, 2)}%` : "";

			let lineValue = verPos;

			// WebVTT expects line (vertical) then position (horizontal) then align.
			positionAttrs = ` line:${rd(lineValue, 2)}%${position}${align}`;
		}

		// Build cues - combine karaoke and non-karaoke into one payload-based cue
		const start = ts(ev.tStartMs);
		const end = ts(ev.tStartMs + (ev.dDurationMs || 0));
		const hasKaraokeTiming = ev.segs.some((seg) => seg.tStartMs != null);

		const parts = [];
		ev.segs.forEach((seg) => {
			if (!seg.utf8.length) return;

			if (
				hasKaraokeTiming &&
				seg.tStartMs != null &&
				seg.tStartMs !== ev.tStartMs
			) {
				parts.push(`<${ts(seg.tStartMs)}>`);
			}

			let text = seg.utf8;
			if (seg.pPenId != null) {
				text = `<c.pen${seg.pPenId}>${text}</c>`;
			}
			parts.push(text);
		});

		if (!parts.length) return;

		let cueText = parts.join("");
		if (ev.pPenId) {
			cueText = `<v.pen${ev.pPenId}>${cueText}</v>`;
		}

		vtt += `\n${start} --> ${end}${positionAttrs}\n${cueText}\n`;
	}
	console.log("Generated VTT:\n", vtt);
	return vtt;
}

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
			(key) => removeParams.includes(key) && newURL.searchParams.delete(key),
		);
		const userLang = navigator.language.split("-")[0] || "en"; // Use browser language or default to English
		if (
			!newURL.searchParams.has("lang", userLang) &&
			!newURL.searchParams.has("tlang")
		) {
			newURL.searchParams.set("tlang", userLang);
		}
		const translated = newURL.searchParams.has("tlang");

		function createTrack(vttUrl) {
			let track = document.querySelector("track[data-injected]");
			if (track) {
				if (track.src.startsWith("blob:")) {
					URL.revokeObjectURL(track.src);
					console.log("Revoked old blob URL:", track.src);
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
				track.setAttribute("data-injected", "");
				video.appendChild(track);
				console.log("Injected captions track:", vttUrl);
			}
			if (translated) {
				track.label += " (TS)"; // short form of "Translated"
			}
		}

		const tryFetch = (returnFormat) => {
			newURL.searchParams.set("fmt", returnFormat);
			injectedUrls.add(newURL.toString());
			return fetch(newURL).then((r) => {
				if (!r.ok) throw new Error(`HTTP ${r.status}`);
				return r.text();
			});
		};

		// Try JSON3 first, fallback to VTT
		tryFetch("json3")
			.then((json) => {
				let json3;
				try {
					json3 = JSON.parse(json);
				} catch {
					json = json.replace(/"utf8":\s*"([\s\S]*?)"/g, (match, content) => {
						const fixed = content.replace(/\n/g, "\\n"); // Fix newlines
						return `"utf8": "${fixed}"`;
					});
					json3 = JSON.parse(json);
				}
				const blobUrl = URL.createObjectURL(
					new Blob([json3ToVtt(json3)], { type: "text/vtt" }),
				);
				createTrack(blobUrl);
			})
			.catch((err) => {
				alert(err.message);
			});
	}
});

po.observe({ type: "resource", buffered: true });
