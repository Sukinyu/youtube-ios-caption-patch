function log(...data) {
	alert(data);
}

const injectedUrls = new Set();
const video = document.querySelector("video");

function calculateBaseFontSize(videoWidth, videoHeight) {
	let baseSize = (videoHeight / 360) * 16;

	if (videoHeight >= videoWidth) {
		// Landscape check
		const threshold = videoHeight > videoWidth * 1.3 ? 480 : 640;
		baseSize = (videoWidth / threshold) * 16;
	}
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

function penToCss(pen) {
	if (!pen) return "color: white;";

	// Get video dimensions for font size calculation
	const videoRect = video.getBoundingClientRect();
	const videoWidth = videoRect.width;
	const videoHeight = videoRect.height;

	// Calculate base font size (YouTube's N3e function)
	// N3e takes (width, height, height, width) and returns base size
	let baseFontSize = calculateBaseFontSize(videoWidth, videoHeight);

	// Font size multiplier (YouTube's SzJ function)
	// szPenSize is converted to fontSizeIncrement: (szPenSize / 100) - 1
	const fontSizeIncrement = pen.szPenSize ? pen.szPenSize / 100 - 1 : 0;
	let fontSizeMultiplier = 1 + 0.25 * fontSizeIncrement;
	const finalFontSize = rd(baseFontSize * fontSizeMultiplier, 4);

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
		const scale = baseFontSize / 16 / 2; // Base scale factor
		const K = rd(Math.max(scale, 1), 4);
		const v = rd(Math.max(2 * scale, 1), 4);
		const w = rd(Math.max(3 * scale, 1), 4);

		let eC = pen.ecEdgeColor != null ? `rgb(${rgb(pen.ecEdgeColor)})` : null;
		let darkShadow = eC ?? `rgba(34, 34, 34, ${foreAlpha})`;
		let lightShadow = eC ?? `rgba(204, 204, 204, ${foreAlpha})`;
		switch (edgeType) {
			case 1: // Uniform raised
				const step = window.devicePixelRatio >= 2 ? 0.5 : 1;
				textShadow += Array.from(
					{ length: Math.ceil((w - K) / step) + 1 },
					(_, i) => `${K + i * step}px ${K + i * step}px ${darkShadow}`,
				).join(", ");
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
				textShadow += shadows.join(",");
		}
		textShadow += ";";
	}

	// Text decorations
	const bold = pen.bAttr == 1 ? "font-weight: bold;" : "";
	const italic = pen.iAttr == 1 ? "font-style: italic;" : "";
	const underline = pen.uAttr == 1 ? "text-decoration: underline;" : "";

	return `
				${bold} ${italic} ${underline}
				color: rgba(${c},${foreAlpha});
				background: rgba(${cB},${backAlpha});
				${textShadow}
				font-size: ${finalFontSize}px;
			`
		.replace(/\s+/g, " ")
		.trim();
}
function json3ToVtt(json) {
	const events = json.events || [];
	const pens = json.pens || [];

	// Log video dimensions and pen count for debugging
	const videoRect = video?.getBoundingClientRect();
	log("Video dimensions", videoRect?.width, videoRect?.height);
	log("Total pens", pens.length);
	log("Pen data (first 3)", pens.slice(0, 3));

	// ---------- build CSS from pens ----------
	let style = `WEBVTT

STYLE
::cue(v), ::cue(c) { font-family: "YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif; }
`;

	for (let i = 0; i < pens.length; i++) {
		const pen = pens[i];
		if (!pen || Object.keys(pen).length === 0) continue;

		const css = penToCss(pen);
		style += `::cue(.pen${i}) { ${css} }\n`;
	}

	log("STYLE block generated", style.split("\n").length);
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
			const penId = seg.pPenId;

			if (!text) continue;
			if (!penId) {
				parts.push(text);
				continue;
			}
			parts.push(`<c.pen${penId}>${text}</c>`);
		}
		if (ev.pPenId) {
			parts.unshift(`<v.pen${ev.pPenId}>`);
			parts.push(`</v>`);
		}

		if (!parts.length) continue;

		const line = parts.join("");

		vtt += `${start} --> ${end}\n`;
		vtt += `${line}\n\n`;
	}
	log("VTT output (first 500 chars)", vtt.substring(0, 500));
	return vtt;
}

const po = new PerformanceObserver((list) => {
	for (const entry of list.getEntries()) {
		const url = entry.name;
		if (!url.includes("/api/timedtext") || injectedUrls.has(url)) continue;
		injectedUrls.add(url);

		log("Caption request detected", url);
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
					log("Revoked old blob URL");
				}
				track.src = vttUrl;
				log("Updated captions track");
			} else {
				track = document.createElement("track");
				track.kind = "captions";
				track.label = "Injected CC";
				track.srclang = "en";
				track.src = vttUrl;
				track.default = true;
				track.setAttribute("data-injected", "");
				video.appendChild(track);
				log("Injected captions track");
			}
			try {
				setTimeout(() => {
					track = document.querySelector("track[data-injected]");
					log("Track cues loaded", track.cues?.length || 0);
					if (track.cues?.length > 0) {
						log({ "First cue text": track.cues[0].text?.substring(0, 100) });
					}
				}, 1000);
				log("track:", track);
			} catch (e) {
				log("Error checking cues", e.message);
			}
			if (translated) {
				track.label += " (TS)";
			}
		}

		if (!video) return;

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
	}
});

po.observe({ type: "resource", buffered: true });
