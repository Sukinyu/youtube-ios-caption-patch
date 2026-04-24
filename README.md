# YouTube iOS Caption Patch

Restores captions when watching YouTube in fullscreen on iOS Safari (or any iOS browser using the WebKit engine), where YouTube's native caption system stops working.

## How it works

1. Intercepts the `/api/timedtext` request YouTube makes to fetch captions
2. Strips tracking parameters from the URL
3. Re-fetches captions in JSON3 format using the browser's language preference
4. Converts the JSON3 response into native `VTTCue` objects injected directly into the video element's text track

Supports the full JSON3 caption format including:

- Per-segment pen styles (color, background, font, bold, italic, underline, edge effects)
- Karaoke/word-by-word timing
- Custom positioning via window position data
- Multi-line and overlapping cue merging
- Style updates on video resize

Test videos:

- Music video with animated captions: https://www.youtube.com/watch?v=6LtrI3MOfQg
- Most caption features: https://www.youtube.com/watch?v=L-BgxLtMxh0

## Files

| File                 | Description                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `beta.user.js`       | Active development. Uses `VTTCue` objects directly. Most up to date.                              |
| `stable.user.js`     | A somewhat more stable version. Will fallback to requesting VTT. Won't convert auto-gen captions. |
| `ytt-srv3-to-vtt.js` | Standalone JSON3 → VTT string converter. Originally was within stable.js; No longer maintained.   |
 
`stable.user.js` is recommended. `beta.user.js` is used for more new features/support however may break often.  

## Usage

### As a userscript (recommended)

1. Install a userscript manager on iOS — [UserScripts](https://apps.apple.com/app/userscripts/id1463298887) (free, open source) or [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
2. Download the `stable`/`beta`, or install directly via the raw URL
3. The userscript manager will detect the `==UserScript==` metadata block and install it automatically

### As raw JavaScript

Use Hyperweb, an app that is no longer maintained, and create an advanced local enhancement.  
This or some-other app that is likely better.


## Known Issues

- Caption positioning is approximate — VTT's coordinate system does not map 1:1 to YouTube's internal layout engine
- `PerformanceObserver` (used to detect the caption request) may miss the request if the script is injected after the network call has already completed
- May drain battery faster
- When not in fullscreen, both YouTube's native captions and the injected track may show simultaneously
- May break if YouTube swaps video players mid-session (causes unknown)
- Sends an additional fetch request for captions on top of YouTube's own request
