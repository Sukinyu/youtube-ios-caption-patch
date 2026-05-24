// ==UserScript==
// @name         MWeb Youtube Captions Patch (dev)
// @author       Sukinyu
// @version      48
// @match        https://m.youtube.com/*
// @updateURL    https://github.com/Sukinyu/youtube-ios-caption-patch/raw/refs/heads/main/test.user.js
// @downloadURL  https://github.com/Sukinyu/youtube-ios-caption-patch/raw/refs/heads/main/test.user.js
// ==/UserScript==
/**
 * @typedef {Object} Json3Seg
 * @prop {string} utf8
 * @prop {number} [tOffsetMs]
 * @prop {number} [pPenId]
 */
/**
 * @typedef {Object} Json3Event
 * @prop {number} tStartMs
 * @prop {number} dDurationMs
 * @prop {Json3Seg[]} segs
 * @prop {number} [wpWinPosId]
 * @prop {number} [wsWinStyleId]
 * @prop {number} [pPenId]
 * @prop {number} [id]
 * @prop {number} [wWinId]
 * @prop {0 | 1} [aAppend]
 */
/**
 * @typedef {Object} Json3Pen
 * @prop {0 | 1 | 2} [ofOffset]
 * @prop {number} [fcForeColor]
 * @prop {number} [foForeAlpha]
 * @prop {number} [bcBackColor]
 * @prop {number} [boBackAlpha]
 * @prop {number} [etEdgeType]
 * @prop {number} [ecEdgeColor]
 * @prop {number} [szPenSize]
 * @prop {number} [fsFontStyle]
 * @prop {0 | 1} [bAttr]
 * @prop {0 | 1} [iAttr]
 * @prop {0 | 1} [uAttr]
 * @prop {number} [hgHorizGroup]
 */
/**
 * @typedef {Object} Json3WinPos
 * @prop {0|1|2|3|4|5|6|7|8} apPoint
 * @prop {number} [ahHorPos]
 * @prop {number} [avVerPos]
 * @prop {number} [ccCols]
 * @prop {number} [rcRows]
 */
/**
 * @typedef {Object} Json3WinStyle
 * @prop {number} [mhModeHint]
 * @prop {0 | 1 | 2} [juJustifCode]
 * @prop {number} [pdPrintDir]
 * @prop {number} [sdScrollDir]
 */
/**
 * @typedef {Object} Json3
 * @prop {Json3Event[]} events
 * @prop {Json3Pen[]} [pens]
 * @prop {Json3WinPos[]} wpWinPositions
 * @prop {Json3WinStyle[]} wsWinStyles
 */

// Start of debug code

function getActiveCues(track) {
	return [...(track.cues || [])];
}
function openEditor(cue) {
	const editor = document.createElement("div");
	editor.id = "cue-editor";

	Object.assign(editor.style, {
		position: "fixed",
		left: "0",
		bottom: "0",
		width: "340px",
		maxHeight: "60vh",
		overflow: "auto",
		background: "#111",
		color: "white",
		zIndex: 1000000,
		padding: "10px",
		fontSize: "12px",
		fontFamily: "monospace",
	});
	function dualControl(label, min, max, step, getter, setter) {
		const wrap = document.createElement("div");
		wrap.style.marginBottom = "8px";

		const title = document.createElement("div");
		title.textContent = label;
		title.style.fontSize = "11px";

		const row = document.createElement("div");
		row.style.display = "flex";
		row.style.gap = "6px";
		row.style.alignItems = "center";

		const slider = document.createElement("input");
		slider.type = "range";
		slider.min = String(min);
		slider.max = String(max);
		slider.step = String(step);
		slider.value = getter();

		const input = document.createElement("input");
		input.type = "number";
		input.step = String(step);
		input.value = getter();
		input.style.width = "70px";

		function update(val) {
			val = parseFloat(val);
			if (isNaN(val)) return;

			setter(val);

			slider.value = val;
			input.value = val;

			console.log(label, val);
		}

		slider.oninput = () => update(slider.value);
		input.oninput = () => update(input.value);

		row.appendChild(slider);
		row.appendChild(input);

		wrap.appendChild(title);
		wrap.appendChild(row);

		return wrap;
	}

	function dropdown(label, options, getter, setter) {
		const wrap = document.createElement("div");

		const text = document.createElement("span");
		text.textContent = label + ": ";

		const select = document.createElement("select");

		options.forEach((opt) => {
			const o = document.createElement("option");
			o.value = opt;
			o.textContent = opt;
			select.appendChild(o);
		});

		select.value = getter() ?? options[0];

		select.onchange = () => {
			setter(select.value);
			console.log("cue updated:", cue);
		};

		wrap.appendChild(text);
		wrap.appendChild(select);
		return wrap;
	}

	function checkbox(label, getter, setter) {
		const wrap = document.createElement("div");

		const input = document.createElement("input");
		input.type = "checkbox";
		input.checked = !!getter();

		const text = document.createElement("span");
		text.textContent = " " + label;

		input.onchange = () => {
			setter(input.checked);
			console.log("cue updated:", cue);
		};

		wrap.appendChild(input);
		wrap.appendChild(text);
		return wrap;
	}

	function textEditor() {
		const wrap = document.createElement("div");

		const ta = document.createElement("textarea");
		ta.value = cue.text || "";
		ta.style.width = "100%";
		ta.style.height = "80px";

		ta.oninput = () => {
			cue.text = ta.value;
		};

		wrap.appendChild(document.createTextNode("text:"));
		wrap.appendChild(ta);

		return wrap;
	}

	// --- Positioning ---
	editor.appendChild(
		dualControl(
			"line",
			0,
			100,
			1,
			() => cue.line ?? 100,
			(v) => (cue.line = v),
		),
	);

	editor.appendChild(
		dualControl(
			"position",
			0,
			100,
			1,
			() => cue.position ?? 100,
			(v) => (cue.position = v),
		),
	);

	editor.appendChild(
		dualControl(
			"size",
			0,
			100,
			1,
			() => cue.size ?? 100,
			(v) => (cue.size = v),
		),
	);

	editor.appendChild(
		dropdown(
			"align",
			["start", "center", "end", "left", "right"],
			() => cue.align,
			(v) => (cue.align = v),
		),
	);

	editor.appendChild(
		dropdown(
			"positionAlign",
			["auto", "line-left", "center", "line-right"],
			() => cue.positionAlign,
			(v) => (cue.positionAlign = v),
		),
	);

	editor.appendChild(
		dropdown(
			"lineAlign",
			["auto", "start", "center", "end"],
			() => cue.lineAlign,
			(v) => (cue.lineAlign = v),
		),
	);

	// --- Behavior flags ---
	editor.appendChild(
		checkbox(
			"snapToLines",
			() => cue.snapToLines,
			(v) => (cue.snapToLines = v),
		),
	);

	// --- Text editing ---
	editor.appendChild(textEditor());

	document.body.appendChild(editor);
}
function buildCueList(track) {
	const panel = document.createElement("div");
	panel.id = "cue-list-panel";
	panel.style.cssText = `
        position:fixed;
        right:0;
        top:0;
        width:300px;
        max-height:100vh;
        overflow:auto;
        background:rgba(0,0,0,0.8);
        color:white;
        font-size:12px;
        z-index:999999;
    `;

	const cues = getActiveCues(track);

	cues.forEach((cue, i) => {
		const btn = document.createElement("button");
		btn.textContent = `Cue ${i} [${cue.startTime.toFixed(1)}s]`;

		btn.style.cssText = `
            display:block;
            width:100%;
            text-align:left;
            margin:2px 0;
        `;

		btn.onclick = () => openEditor(cue);

		panel.appendChild(btn);
	});

	document.body.appendChild(panel);
}

// #End of debug code

const injectedUrls = new Set();
/** @type {HTMLVideoElement | null} */
const video = document.querySelector("video");
const defaultFont =
	'"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';
const isMWEB = window.location.host.startsWith("m.");

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

const rgb = (num) => `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;

const rd = (num, decimals = 4) => +num.toFixed(decimals);

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

/** @type {function(string): Json3} */
const parseJson3 = (json) => {
	try {
		return JSON.parse(json);
	} catch {
		return JSON.parse(
			json.replace(
				/"utf8":\s*"([\s\S]*?)"/g,
				(_, content) => `"utf8": "${content.replace(/\n/g, "\\n")}"`,
			),
		);
	}
};

/** @type {function(HTMLVideoElement | null): {width: number, height: number}} */
function getVideoSize(video) {
	if (!video) return { width: 0, height: 0 };
	if (!video?.webkitDisplayingFullscreen) {
		return { width: video.clientWidth, height: video.clientHeight };
	}
	const vw = video.videoWidth;
	const vh = video.videoHeight;

	const cw = window.innerWidth;
	const ch = window.innerHeight;

	const videoAspect = vw / vh;
	const containerAspect = cw / ch;

	if (videoAspect > containerAspect) {
		return {
			width: cw,
			height: cw / videoAspect,
		};
	}

	return {
		width: ch * videoAspect,
		height: ch,
	};
}

/** @type {function(Json3Pen, number): string} */
function penToCss(pen, fs) {
	if (!pen) return "";

	// Font size multiplier (YouTube's SzJ function)
	const fsIncrement = pen.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	const fsMult = 0.75 + (pen?.szPenSize ?? 100) / 400;
	const fontSizeCss = fsMult !== 1 ? `font-size: ${89 * fsMult}%;` : "";

	// Colors
	const c = rgb(pen.fcForeColor ?? 0xffffff);
	const foreAlpha = rd(pen.foForeAlpha != null ? pen.foForeAlpha / 255 : 1);
	const cB = rgb(pen.bcBackColor ?? 0);
	const backAlpha = rd(pen.boBackAlpha != null ? pen.boBackAlpha / 255 : 0.5);

	const colorCss =
		c != "255,255,255" || foreAlpha != 1
			? `color: rgba(${c},${foreAlpha});`
			: "";

	const backgroundCss =
		cB != "0,0,0" || backAlpha != 0.5
			? `background: rgba(${cB},${backAlpha});`
			: "";

	// Edge effects
	let textShadow = "";
	if (pen.etEdgeType) {
		const scale = fs / 32;
		// Convert px -> em relative to 16px base
		const toEm = (px) => `${rd(px / fs)}em`;

		// Keep the original YouTube math
		const K = Math.max(scale, 1);
		//const v = Math.max(scale * 2, 1); No longer used
		const w = Math.max(scale * 3, 1);
		const eC = pen.ecEdgeColor != null ? `rgb(${rgb(pen.ecEdgeColor)})` : null;
		const darkShadow = eC ?? `rgba(34, 34, 34, ${foreAlpha})`;
		const lightShadow = eC ?? `rgba(204, 204, 204, ${foreAlpha})`;

		const shadows = [];
		switch (pen.etEdgeType) {
			case 1: {
				// Uniform raised
				// Keep stepping in px logic internally
				const step = window.devicePixelRatio >= 2 ? 0.5 : 1;
				for (let i = 0; i < Math.ceil((w - K) / step); i++) {
					const ofs = i * step;
					// shadows.push(`${toEm(val)} ${toEm(val)} ${darkShadow}`);
					shadows.push(
						`max(calc(0.03125em + ${ofs}px),${1 + ofs}px) max(calc(0.03125em + ${ofs}px),${1 + ofs}px) ${darkShadow}`,
					);
				}
				break;
			}
			case 2: // 3D raised
				shadows.push(`max(0.03125em,1px) max(0.03125em,1px) ${lightShadow}`);
				shadows.push(`min(-0.03125em,-1px) min(-0.03125em,-1px) ${darkShadow}`);
				break;
			case 3: // Glow
				for (let i = 0; i < 5; i++) {
					shadows.push(`0 0 max(0.0625em,1px) ${darkShadow}`);
				}
				break;
			case 4: {
				// Blur/drop shadow
				for (let blur = w; blur <= Math.max(5 * scale, 1); blur += scale) {
					shadows.push(
						`max(0.09375em,1px) max(0.09375em,1px) ${toEm(blur)} ${darkShadow}`,
					);
				}
				break;
			}
		}
		textShadow =
			shadows.length > 0 ? `text-shadow: ${shadows.join(", ")};` : "";
	}

	// Text decorations
	const b = pen.bAttr == 1 ? `font-weight: bold;` : "";
	const i = pen.iAttr == 1 ? "font-style: italic;" : "";
	const u = pen.uAttr == 1 ? "text-decoration: underline;" : "";
	const fontFamily = penFontFamily(pen);
	const fontVariant = [];
	const fontFamilyCss = !fontFamily ? "" : `font-family: ${fontFamily};`;

	if (pen.fsFontStyle == 7 || (pen.ofOffset ?? 1) != 1) {
		fontVariant.push("font-variant:");
		if (pen.fsFontStyle == 7) fontVariant.push(" small-caps");
		if (pen.ofOffset == 0) fontVariant.push(" sub");
		if (pen.ofOffset == 2) fontVariant.push(" super");
		fontVariant.push(";");
	}

	const packed = pen.hgHorizGroup ? "text-combine-upright: all;" : "";

	return `
				${i} ${b} ${u}
				${fontVariant.join()}
				${colorCss}
				${backgroundCss}
				${fontFamilyCss}
				${fontSizeCss}
				${textShadow}
				${packed}
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

/** @type {function(Json3Pen[]): string} */
function generatePenStyles(pens) {
	const fs = 89 * (0.75 + (pen?.szPenSize ?? 100) / 400);
	let style = `::cue(*) {\nfont-family: ${defaultFont};\nfont-size: ${fs}%;\nbackground: rgba(0,0,0,0.5);${isMWEB ? "\nfont-weight: 500;" : ""}\n}\n`;
	style += `.ytp-caption-window-container { width : 100%; !important}\n`;
	//style += `::cue(:future) { opacity : 0; }\n`; Disabled due to people preferring the default behavior

	const vRect = getVideoSize(video);
	const fontSize = calculateBaseFontSize(vRect.width, vRect.height);
	for (let id = 1; id < pens.length; id++) {
		if (!pens[id]) continue;
		const css = penToCss(pens[id], fontSize);
		if (!css) continue;
		style += `::cue(.pen${id}) { ${css} }\n`;
	}
	return style;
}

const LEFT_ANCHORS = new Set([0, 3, 6]);
const RIGHT_ANCHORS = new Set([2, 5, 8]);

/** @param {Json3WinPos} pos @param {Json3Pen} pen @param {Json3WinStyle} style */
function mapPosToCue(pos, pen, style) {
	pos || (pos = { avVerPos: 100, ahHorPos: 50, apPoint: 7 });

	const anchorPoint = pos.apPoint;
	const hasAnchor = anchorPoint != null;
	const verPos = pos.avVerPos ?? (isMWEB ? 93 : 98);

	let ver = isMWEB ? verPos * 0.92 + 2 : verPos * 0.96 + 2;
	let hor = (pos.ahHorPos ?? 50) * 0.96 + 2;

	const fontSizeIncrement = pen?.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	if (hasAnchor && LEFT_ANCHORS.has(anchorPoint)) {
		hor = Math.max(hor / (1 + fontSizeIncrement * 2), 2);
	}

	let align = LEFT_ANCHORS.has(anchorPoint)
		? "left"
		: RIGHT_ANCHORS.has(anchorPoint)
			? "right"
			: "";
	let positionAlign = LEFT_ANCHORS.has(anchorPoint)
		? "line-left"
		: RIGHT_ANCHORS.has(anchorPoint)
			? "line-right"
			: "";
	let lineAlign =
		anchorPoint >= 3 && anchorPoint <= 5
			? "center"
			: anchorPoint >= 6
				? "end"
				: undefined;
	let vertical = "";

	switch (style?.juJustifCode) {
		case 0:
			align = "left";
			positionAlign = "line-left";
			break;
		case 1:
			align = "right";
			positionAlign = "line-right";
			break;
		case 2:
			align = "";
			positionAlign = "";
	}

	if (style?.pdPrintDir === 1 || style?.pdPrintDir === 2) {
		lineAlign = "center";
		positionAlign = "line-right";
		vertical = style.pdPrintDir === 1 ? "rl" : "lr";

		// swap ver <-> pos
		[ver, hor] = [hor, ver];
	}

	return {
		line: Math.max(rd(ver, 2), 0),
		position: rd(hor, 2), // defaults to 'auto'
		align: align, // defaults to 'center'
		positionAlign: positionAlign, // Defaults to 'auto'
		lineAlign: lineAlign, // Defaults to 'start'
		vertical: vertical, // defaults to none
	};
}

/**
 * @param {TextTrack} track
 * @param {Json3} json
 * @param {boolean} isAutoGen
 */
function addCuesToTrack(track, json, isAutoGen) {
	const events = json.events || [];
	const pens = json.pens || [{}];
	const wpWinPositions = json.wpWinPositions || [];
	const wsWinStyles = json.wsWinStyles || [];

	// Best solution I can think of rn
	// TODO: Find a better solution
	isAutoGen && isMWEB && (pens[0].szPenSize ??= 200);

	// ---------- build CSS from pens + positions ----------
	setCaptionStyle(generatePenStyles(pens));

	const windowMap = new Map();

	// ---------- build cues ----------
	for (const ev of events) {
		const start = Number(ts(ev.tStartMs));
		const end = Number(ts(ev.tStartMs + (ev.dDurationMs || 0)));

		if (!ev.segs && ev?.id) {
			// Handle events with no segments but have an ID (possible metadata or positioning cues)
			windowMap.set(ev.id, {
				start: start,
				end: end,
				penId: ev.pPenId,
				posId: ev.wpWinPosId,
				styleId: ev.wsWinStyleId,
			});
			continue;
		}

		/** @type {String[]} */
		const parts = [];

		if (ev.wWinId != null) {
			const winData = windowMap.get(ev.wWinId);
			if (winData && winData.start <= start && winData.end >= end) {
				ev.wpWinPosId ??= winData.posId;
				ev.pPenId ??= winData.penId;
				ev.wsWinStyleId ??= winData.styleId;
			}
		}

		if (ev.segs?.length === 0) continue;
		if (ev.segs?.length === 1 && ev.segs[0].utf8 === "\n") continue; // Skip auto-generated empty cues

		ev.segs.forEach((seg) => {
			if (!seg?.utf8.length) return;
			if (seg.utf8 == "​") return; // 0 width space

			if (seg.tOffsetMs) {
				parts.push(`<${ts(ev.tStartMs + seg.tOffsetMs, true)}>`); // Karaoke timing
			}

			const penId = seg.pPenId ?? ev.pPenId ?? 0;

			let p = pens[penId];
			if (!(p.foForeAlpha || 1) && !(p.boBackAlpha || 1) /*&& !p.etEdgeType*/)
				return; // Skip invisible pens // TODO: Handle invisible pens with edge effects instead of removing

			parts.push(penId ? `<c.pen${penId}>` : "<c>"); // Apply pen style or default class
			parts.push(seg.utf8);
			parts.push("</c>");
		});

		let cueText = parts.join("");
		let cue = new VTTCue(start, end, cueText);

		cue.snapToLines = false;

		// Get position data for this event
		const pos = wpWinPositions[ev.wpWinPosId ?? -1],
			eventPen = pens[ev.pPenId ?? 0],
			eventStyle = wsWinStyles[ev.wsWinStyleId ?? -1];
		const placement = mapPosToCue(pos, eventPen, eventStyle);

		cue.line = placement.line;
		if (placement.position != null) cue.position = rd(placement.position, 2);
		if (placement.align) cue.align = placement.align;
		if (placement.positionAlign) cue.positionAlign = placement.positionAlign;
		if (placement.lineAlign) cue.lineAlign = placement.lineAlign;
		if (placement.vertical) cue.vertical = placement.vertical;

		track.addCue(cue);
	}
	if (!isAutoGen) return;
	// ---------- detect overlapping cues, merge left-align lines ----------
	// Use event-based algorithm instead of nested loops for better performance
	const cues = [...track.cues];
	if (cues.length < 2) return;

	// Sort by start time for efficient interval merging
	const sorted = cues
		.map((c, i) => ({ cue: c, idx: i }))
		.sort((a, b) => a.cue.startTime - b.cue.startTime);
	const toRemove = new Set();

	for (let i = 0; i < sorted.length; i++) {
		const c1 = sorted[i].cue;
		if (toRemove.has(c1)) continue;

		// Only check forward from current position
		for (let j = i + 1; j < sorted.length; j++) {
			const c2 = sorted[j].cue;
			if (toRemove.has(c2)) continue;

			// No more overlaps possible if c2 starts after c1 ends
			if (c2.startTime >= c1.endTime) break;

			const overlapStart = Math.max(c1.startTime, c2.startTime);
			const overlapEnd = Math.min(c1.endTime, c2.endTime);
			if (overlapStart >= overlapEnd) continue; // no overlap

			// Merge for overlapping period
			const merged = new VTTCue(
				overlapStart,
				overlapEnd,
				c1.text + "\n" + c2.text,
			);
			merged.snapToLines = c1.snapToLines;
			merged.line = c1.line;
			merged.position = c1.position;
			merged.align = c1.align;
			merged.positionAlign = c1.positionAlign;
			merged.lineAlign = c1.lineAlign;
			track.addCue(merged);

			// Trim cues
			if (c1.startTime < overlapStart) {
				c1.endTime = overlapStart;
			} else {
				toRemove.add(c1);
			}

			if (c2.endTime > overlapEnd) {
				c2.startTime = overlapEnd;
			} else {
				toRemove.add(c2);
			}
		}
	}

	// Batch remove marked cues
	toRemove.forEach((cue) => track.removeCue(cue));
}

const po = new PerformanceObserver((list) => {
	if (!window.location.pathname.startsWith("/watch")) return;
	const entries = list.getEntries();
	const url = entries[entries.length - 1].name;
	if (!url.includes("/api/timedtext") || injectedUrls.has(url)) return;
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
	const isAutoGen = newURL.searchParams.get("kind") === "asr";

	function createTrack() {
		let track =
			video?.textTracks &&
			[...(video?.textTracks || [])].find((t) =>
				t.label.includes("Injected CC"),
			);
		if (!track) {
			track = video.addTextTrack(
				"captions",
				`Injected CC${translated ? " (TS)" : ""}`,
				userLang,
			);
			track.mode = "showing"; // debug so not hidden
			console.log("Injected captions track");
		} else {
			if (track.cues) {
				[...track.cues].forEach((cue) => track?.removeCue(cue)); // Clear existing cues
			}
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

	let track = createTrack();
	tryFetch("json3")
		.then((json) => addCuesToTrack(track, parseJson3(json), isAutoGen))
		.catch((err) => alert(`Error adding captions: ${err}\n${err.stack}`));
});

po.observe({ type: "resource", buffered: true });

if (video?.src) {
	new MutationObserver(() => {
		const track = video?.textTracks[0];
		[...track.cues].forEach((cue) => track?.removeCue(cue));
		if (track?.mode === "showing") {
			track.mode = "hidden";
			track.mode = "showing";
		} // Refresh
	}).observe(video, { attributeFilter: ["src"] });
}

/*
video?.addEventListener("webkitbeginfullscreen", () => {
	video?.textTracks[0] && (video.textTracks[0].mode = "showing");
});
video?.addEventListener("webkitendfullscreen", () => {
	video?.textTracks[0] && (video.textTracks[0].mode = "hidden");
});
*/

function createCaptionEditorButton(openEditor) {
	const existing = document.getElementById("caption-editor-btn");
	if (existing) return existing;

	const btn = document.createElement("button");
	btn.id = "caption-editor-btn";
	btn.textContent = "CC Editor";

	btn.style.position = "fixed";
	btn.style.left = "12px";
	btn.style.bottom = "12px";
	btn.style.zIndex = "999999";
	btn.style.padding = "10px 14px";
	btn.style.border = "none";
	btn.style.borderRadius = "10px";
	50;
	btn.style.background = "rgba(20,20,20,0.85)";
	btn.style.color = "white";
	btn.style.fontSize = "14px";
	btn.style.fontFamily = "Arial, sans-serif";
	btn.style.backdropFilter = "blur(5px)";
	btn.style.boxShadow = "0 2px 10px rgba(0,0,0,0.35)";
	btn.style.cursor = "pointer";
	btn.style.userSelect = "none";

	btn.onmouseenter = () => {
		btn.style.background = "rgba(40,40,40,0.95)";
	};

	btn.onmouseleave = () => {
		btn.style.background = "rgba(20,20,20,0.85)";
	};

	btn.onclick = () => {
		try {
			openEditor?.();
		} catch (err) {
			alert(err + "\n\n" + err.stack);
		}
	};

	document.body.appendChild(btn);

	return btn;
}

createCaptionEditorButton(() => {
	const list = document.querySelector("#cue-list-panel");
	const editor = document.querySelector("#cue-editor");
	if (list || editor) {
		editor.style.display = editor?.style.display === "none" ? "block" : "none";
	} else {
		const track = video?.textTracks[0];
		buildCueList(track);
	}
});
