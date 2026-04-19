// ==UserScript==
// @name         Fix MWeb Youtube Fullscreen Captions
// @author       Sukinyu
// @version      0.3.40
// @last         4/17/2026 (mm/dd/yyyy)
// @description  Fix captions on youtube videos in fullscreen mode on iOS (https://m.youtube.com/watch?). Injects a captions track with user-preferred language.
// @match        https://m.youtube.com/watch?*
// ==/UserScript==

const injectedUrls = new Set();
const video = document.querySelector("video");
const defaultFont =
	'"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';
let currentPens = [];

function calculateBaseFontSize(videoWidth, videoHeight) {
	let baseSize = (videoHeight / 360) * 16;
	if (videoHeight >= videoWidth) {
		// Landscape check
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

	// Get video dimensions for font size calculation
	const videoRect = video.getBoundingClientRect();
	const videoWidth = videoRect.width;
	const videoHeight = videoRect.height;

	// Calculate base font percent (YouTube's N3e function)
	let fs = calculateBaseFontSize(videoWidth, videoHeight);

	// Font size multiplier (YouTube's SzJ function)
	const fontSizeIncrement = pen.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	let fontSizeMultiplier = 1 + 0.25 * fontSizeIncrement;
	const fontSizeCss =
		fontSizeMultiplier !== 1 ? `font-size: ${fs * fontSizeMultiplier}px;` : "";

	// Colors
	const c = rgb(pen.fcForeColor ?? 0xffffff);
	const foreAlpha = rd(pen.foForeAlpha != null ? pen.foForeAlpha / 255 : 1);
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
		const scale = fs / 16 / 2;
		const K = rd(Math.max(scale, 1));
		const v = rd(Math.max(scale * 2, 1));
		const w = rd(Math.max(scale * 3, 1));

		let eC = pen.ecEdgeColor != null ? `rgb(${rgb(pen.ecEdgeColor)})` : null;
		let darkShadow = eC ?? `rgba(34, 34, 34, ${foreAlpha})`;
		let lightShadow = eC ?? `rgba(204, 204, 204, ${foreAlpha})`;
		switch (edgeType) {
			case 1: // Uniform raised
				textShadow += `${K}px ${K}px ${darkShadow}, ${K + 1}px ${K + 1}px ${darkShadow}, ${K + 2}px ${K + 2}px ${darkShadow}`;
				break;
			case 2: // 3D raised
				textShadow += `${K}px ${K}px ${lightShadow}, -${K}px -${K}px ${darkShadow}`;
				break;
			case 3: // Glow (most common)
				textShadow += Array(5).fill(`0 0 ${v}px ${darkShadow}`).join(", ");
				break;
			case 4: // Blur effect
				const shadows = [];
				for (let blur = w; blur <= Math.max(5 * scale, 1); blur += scale) {
					shadows.push(`${v}px ${v}px ${rd(blur, 4)}px ${darkShadow}`);
				}
				textShadow += shadows.join(", ");
				break;
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
	style += `::cue(c) { font-family: ${defaultFont}; font-size: ${fs}px; line-height: normal; background: rgba(0,0,0,0.5);}\n`;

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
		console.log("Adjusted hor for left anchor:", hor);
	}
	let position = hor;
	let align = null;
	let positionAlign = null;

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

	return {
		line: ver,
		position,
		align,
		positionAlign,
	};
}

function addCuesToTrack(track, json) {
	const events = json.events || [];
	const pens = json.pens || [];
	const wpWinPositions = json.wpWinPositions || [];

	// Store pens globally for resize updates
	currentPens = pens;

	const videoRect = video.getBoundingClientRect();
	const videoWidth = videoRect.width;
	const videoHeight = videoRect.height;
	const fs = calculateBaseFontSize(videoWidth, videoHeight);
	updateCaptionStyles();

	// ---------- build CSS from pens + positions ----------
	const style = generatePenStyles();
	if (style) setCaptionStyle(style);

	// ---------- build cues array first ----------
	for (const ev of events) {
		if (!ev.segs || !ev.segs.length) continue; // Skip events without segments
		const start = ts(ev.tStartMs);
		const end = ts(ev.tStartMs + (ev.dDurationMs || 0));
		const parts = [];
		ev.segs.forEach((seg) => {
			if (!seg.utf8.length) return;

			if (seg.tOffsetMs) {
				parts.push(`<${ts(ev.tStartMs + seg.tOffsetMs, true)}>`); // Karaoke timing
			}

			let text = seg.utf8;
			if (seg.pPenId != null) {
				text = `<c.pen${seg.pPenId}>${text}</c>`;
			}
			parts.push(text);
		});

		if (parts.length === 1 && parts[0] == "\n") continue; // Skip empty cues from auto-gen

		parts.unshift(`<v${parts.includes('</c>') ? '.bg' : ''}${ev.pPenId ? `.pen${ev.pPenId}` : ""}>`);
		parts.push("</v>");
		let cueText = parts.join("");
		let cue = new VTTCue(start, end, cueText);
		if (!ev.segs?.length) continue;
		if (ev.segs[0].utf8 === "\n") continue; // Skip auto-generated empty cues

		cue.snapToLines = true; // Gets set later if needed, but defaults to true and want false

		// Get position data for this event
		const posId = ev.wpWinPosId;

		const pos = wpWinPositions[posId];
		const eventPen = ev.pPenId != null ? pens[ev.pPenId] : null;
		const placement = mapPosToCue(pos, eventPen, fs);

		placement.line && (cue.line = rd(placement.line, 2));
		cue.lineAlign = placement.lineAlign;
		if (placement.position != null) {
			cue.position = rd(placement.position, 2);
		}
		placement.align && (cue.align = placement.align);
		placement.positionAlign && (cue.positionAlign = placement.positionAlign);

		track.addCue(cue);
	}

	// ---------- detect overlapping cues, merge left-align lines, and set snapToLines ----------
	for (let i = 0; i < track.cues.length; i++) {
		for (let j = i + 1; j < track.cues.length; j++) {
			const cue1 = track.cues[i];
			const cue2 = track.cues[j];
			// Check if time ranges overlap
			if (cue1.endTime > cue2.startTime && cue1.startTime <= cue2.endTime) {
				// If both cues are left-aligned, append the next cue text into the first cue
				// using an in-cue timestamp tag, then delay the second cue start to the end of the first.
				if (cue1.align === "left" && cue2.align === "left") {
					const timestamp = `<${ts(cue2.startTime * 1000, true)}>`;
					cue1.text += `\n${timestamp}${cue2.text}`;
					cue2.startTime = cue1.endTime;
					if (cue2.endtime == cue1.endTime) track.removeCue(cue2);
				}
			}
		}
	}
	console.log(`Added cues to track: ${track.cues ? track.cues.length : 0}`);
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

		function createTrack() {
			let track =
				video.textTracks &&
				[...video.textTracks].find((t) => t.label.includes("Injected CC"));
			if (!track) {
				track = video.addTextTrack("captions", "Injected CC", userLang);
				track.mode = "showing";
				console.log("Injected captions track");
			} else {
				if (track.cues) {
					[...track.cues].forEach((cue) => track.removeCue(cue)); // Clear existing cues
				}
			}
			if (translated) {
				track.label += " (TS)"; // short form of "Translated"
			}
			return track;
		}

		const tryFetch = (returnFormat) => {
			newURL.searchParams.set("fmt", returnFormat);
			injectedUrls.add(newURL.toString());
			return fetch(newURL).then((r) => {
				if (!r.ok) throw new Error(`HTTP ${r.status}`);
				return r.text();
			});
		};
		/*
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
				alert(err.message + "\nFalling back to VTT format.");
				tryFetch("vtt").then((vttText) => {
					// Modify VTT content
					const modified = vttText
						.replace(/Style:/g, "STYLE")
						.replace(/##/g, "");

					const blobUrl = URL.createObjectURL(
						new Blob([modified], { type: "text/vtt" }),
					);
					createTrack(blobUrl);
				});
			});
*/

		tryFetch("json3").then((json) => {
			let json3;
			track = createTrack();
			try {
				json3 = JSON.parse(json);
			} catch {
				json = json.replace(/"utf8":\s*"([\s\S]*?)"/g, (match, content) => {
					const fixed = content.replace(/\n/g, "\\n"); // Fix newlines
					return `"utf8": "${fixed}"`;
				});
				json3 = JSON.parse(json);
			}
			addCuesToTrack(track, json3);
		});
	}
});

po.observe({ type: "resource", buffered: true });

function updateCaptionStyles() {
	// Regenerate pen styles on resize to reflect new video dimensions
	const style = generatePenStyles();
	if (style) setCaptionStyle(style);
}

window.addEventListener("resize", updateCaptionStyles);
