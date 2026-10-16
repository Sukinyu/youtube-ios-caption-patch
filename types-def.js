/**
 * @global
 * @typedef {Object} Json3Seg
 * @prop {String} utf8
 * @prop {Number} [tOffsetMs]
 * @prop {Number} [pPenId]
 *
 * @global
 * @typedef {Object} Json3Event
 * @prop {Number} tStartMs
 * @prop {Number} dDurationMs
 * @prop {Json3Seg[]} segs
 * @prop {Number} [wpWinPosId]
 * @prop {Number} [wsWinStyleId]
 * @prop {Number} [pPenId]
 * @prop {Number} [id]
 * @prop {Number} [wWinId]
 * @prop {0 | 1} [aAppend]
 *
 * @global
 * @typedef {Object} Json3Pen
 * @prop {0 | 1 | 2} [ofOffset]
 * @prop {Number} [fcForeColor]
 * @prop {Number} [foForeAlpha]
 * @prop {Number} [bcBackColor]
 * @prop {Number} [boBackAlpha]
 * @prop {Number} [etEdgeType]
 * @prop {Number} [ecEdgeColor]
 * @prop {Number} [szPenSize]
 * @prop {1|2|3|4|5|6|7} [fsFontStyle]
 * @prop {0 | 1} [bAttr]
 * @prop {0 | 1} [iAttr]
 * @prop {0 | 1} [uAttr]
 * @prop {Number} [hgHorizGroup]
 *
 * @global
 * @typedef {Object} Json3WinPos
 * @prop {0|1|2|3|4|5|6|7|8} apPoint
 * @prop {Number} [ahHorPos]
 * @prop {Number} [avVerPos]
 * @prop {Number} [ccCols]
 * @prop {Number} [rcRows]
 *
 * @global
 * @typedef {Object} Json3WinStyle
 * @prop {Number} [mhModeHint]
 * @prop {0 | 1 | 2} [juJustifCode]
 * @prop {Number} [pdPrintDir]
 * @prop {Number} [sdScrollDir]
 *
 * @global
 * @typedef {Object} Json3
 * @prop {Json3Event[]} events
 * @prop {Json3Pen[]} [pens]
 * @prop {Json3WinPos[]} wpWinPositions
 * @prop {Json3WinStyle[]} wsWinStyles
 * 
 */
