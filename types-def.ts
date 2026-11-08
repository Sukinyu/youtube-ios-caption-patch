type Json3Seg = {
	utf8: string;
	tOffsetMs?: number;
	pPenId?: number;
};
type Json3Event = {
	tStartMs: number;
	dDurationMs: number;
	segs: Json3Seg[];
	wpWinPosId?: number;
	wsWinStyleId?: number;
	pPenId?: number;
	id?: number;
	wWinId?: number;
	aAppend?: 0 | 1;
};
type Json3Pen = {
	ofOffset?: 0 | 1 | 2;
	fcForeColor?: number;
	foForeAlpha?: number;
	bcBackColor?: number;
	boBackAlpha?: number;
	etEdgeType?: number;
	ecEdgeColor?: number;
	szPenSize?: number;
	fsFontStyle?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	bAttr?: 0 | 1;
	iAttr?: 0 | 1;
	uAttr?: 0 | 1;
	hgHorizGroup?: number;
};
type Json3WinPos = {
	apPoint: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	ahHorPos?: number;
	avVerPos?: number;
	ccCols?: number;
	rcRows?: number;
};
type Json3WinStyle = {
	mhModeHint?: number;
	juJustifCode?: 0 | 1 | 2;
	pdPrintDir?: number;
	sdScrollDir?: number;
};
type Json3 = {
	events: Json3Event[];
	pens?: Json3Pen[];
	wpWinPositions: Json3WinPos[];
	wsWinStyles: Json3WinStyle[];
};

interface HTMLVideoElement {
	webkitPresentationMode:
		| "inline"
		| "fullscreen"
		| "picture-in-picture"
		| "undefined";
	webkitIsInExternalPlayback: boolean;
}
