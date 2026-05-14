(function(g) {
  var window = this;
  'use strict';
  var A0 = function(Z) {
    var N = {
      languageCode: Z.languageCode,
      languageName: Z.languageName,
      displayName: g.RX(Z),
      kind: Z.kind,
      name: Z.name,
      id: Z.id,
      is_servable: Z.G,
      is_default: Z.isDefault,
      is_translateable: Z.isTranslateable,
      vss_id: Z.vssId
    };
    Z.xtags && (N.xtags = Z.xtags);
    Z.captionId && (N.captionId = Z.captionId);
    Z.translationLanguage && (N.translationLanguage = Z.translationLanguage);
    return N
  }
    , Qi$ = function(Z, N) {
    var r = new g.io;
    r.languageCode = Z.languageCode;
    r.languageName = Z.languageName;
    r.name = Z.name;
    r.displayName = Z.displayName;
    r.kind = Z.kind;
    r.isDefault = !1;
    r.G = Z.G;
    r.isTranslateable = Z.isTranslateable;
    r.vssId = Z.vssId;
    r.url = Z.url;
    r.translationLanguage = N;
    Z.xtags && (r.xtags = Z.xtags);
    Z.captionId && (r.captionId = Z.captionId);
    return r
  }
    , Ij = function(Z, N) {
    return N ? Z.captionsInitialState : "CAPTIONS_INITIAL_STATE_UNKNOWN"
  }
    , Bs3 = function(Z) {
    return g.df(Z) || Z.K("web_enable_caption_language_preference_stickiness")
  }
    , xH3 = async function(Z, N) {
    Z = Z + "|" + N;
    N = await g.p_();
    if (!N)
      throw g.QR("gct");
    return (await g.Nr(N)).get("captions", Z)
  }
    , t3O = function(Z, N, r) {
    xH3(Z, N).then(X => {
      X && r(X.trackData, new g.io(X.metadata))
    }
    )
  }
    , J2a = function(Z) {
    var N = N || 0;
    return function() {
      return Z.apply(this, Array.prototype.slice.call(arguments, 0, N))
    }
  }
    , co = function(Z, N, r) {
    g.D.call(this);
    this.G = null;
    this.B = !1;
    this.Y = Z;
    this.N = r;
    this.W = N || window;
    this.L = (0,
    g.DO)(this.SP, this)
  }
    , Vl = function(Z) {
    Z.isActive() || Z.start()
  }
    , jiQ = function(Z) {
    Z = Z.W;
    return Z.requestAnimationFrame || Z.webkitRequestAnimationFrame || Z.mozRequestAnimationFrame || Z.oRequestAnimationFrame || Z.msRequestAnimationFrame || null
  }
    , WtR = function(Z) {
    Z = Z.W;
    return Z.cancelAnimationFrame || Z.cancelRequestAnimationFrame || Z.webkitCancelRequestAnimationFrame || Z.mozCancelRequestAnimationFrame || Z.oCancelRequestAnimationFrame || Z.msCancelRequestAnimationFrame || null
  }
    , dM = function(Z) {
    if (!HLa.test(Z))
      throw Error("'" + Z + "' is not a valid hex color");
    Z.length == 4 && (Z = Z.replace(vga, "#$1$1$2$2$3$3"));
    Z = Z.toLowerCase();
    Z = parseInt(Z.slice(1), 16);
    return [Z >> 16, Z >> 8 & 255, Z & 255]
  }
    , GrO = function() {
    var Z = {}
      , N = "suggest_correction"in g.TY ? g.TY.suggest_correction : "Edit caption";
    N = N || "";
    for (let r in Z) {
      let X = () => String(Z[r]);
      N = N.replace(new RegExp("\\$\\{" + r + "\\}","gi"), X);
      N = N.replace(new RegExp("\\$" + r,"gi"), X)
    }
    return N
  }
    , ZY = function() {
    return g.kT("yt-player-caption-display-settings")
  }
    , $H3 = function(Z, N) {
    g.Yh(N, r => Z.equals(r)) || N.push(Z)
  }
    , NI = function(Z, N) {
    switch (N.kind) {
    case "asr":
      $H3(N, Z.L);
      break;
    default:
      $H3(N, Z.W)
    }
  }
    , siR = async function(Z, N, r) {
    Z.W = g.rz(N, r)
  }
    , w4R = function(Z, N) {
    var r = g.ZC(Z.segments, N);
    r >= 0 || r < 0 && (-r - 1) % 2 === 1 || (r = -r - 1,
    r > 0 && N - Z.segments[r - 1] === 1 && r < Z.segments.length && Z.segments[r] - N === 1 ? (g.eF(Z.segments, r),
    g.eF(Z.segments, r - 1)) : r > 0 && N - Z.segments[r - 1] === 1 ? Z.segments[r - 1] = N : r < Z.segments.length && Z.segments[r] - N === 1 ? Z.segments[r] = N : (g.cg(Z.segments, r, 0, N),
    g.cg(Z.segments, r + 1, 0, N)))
  }
    , FtQ = function(Z) {
    return Z.G && Z.G.B ? Z.G.B + Z.player.gW() < Z.player.getCurrentTime() : !1
  }
    , Cua = function(Z, N) {
    if (Z.policy.J9 && Z.player.R7()) {
      var r = g.Ek(N, Z.policy, {});
      r.set("pot", Z.player.R7());
      r = r.Nf()
    } else
      r = g.Ek(N, Z.policy, {}).Nf();
    var X = {
      format: "RAW",
      withCredentials: !0
    };
    if (Z.policy.KN) {
      X.method = "POST";
      let B = N.B;
      B && Object.keys(B).length > 0 ? X.postBody = g.yv(B, g.eI) : X.postBody = (0,
      g.Yr)([120, 0])
    }
    Z.N && (X.responseType = "arraybuffer");
    var z = ++Z.LN
      , Q = (0,
    g.f)();
    Z.W = g.jz(r, X, 3, 100, -1, B => {
      B.errorCode === "net.timeout" && Z.player.C("capnt", {
        rn: z++
      })
    }
    ).then(B => {
      if (Z.policy.Hq && z % 100 === 1) {
        var x = (0,
        g.f)();
        Z.player.C("caprsp", {
          rn: z,
          ms: x - Q,
          kb: (B.xhr.responseText.length / 1024).toFixed()
        })
      }
      a: {
        B = B.xhr;
        Z.xR();
        if (Z.L) {
          var t = !(Z.N ? B.response : B.responseText) || B.status >= 400;
          if (x = g.zM(B)) {
            B = g.Ek(Z.L, Z.policy, {});
            Z.L.Op(B, x);
            Cua(Z, Z.L);
            break a
          }
          t ? Z.player.C("capfail", {
            status: B.status
          }) : (g.MX("fcb_r", (0,
          g.f)(), Z.player.getVideoData()?.D || ""),
          x = Z.L.fN[0],
          t = x.NA,
          Z.j != null && Z.Y !== t && (Z.N ? Z.j(B.response, (x.startTime + Z.player.gW()) * 1E3) : Z.j(B.responseText, (x.startTime + Z.player.gW()) * 1E3),
          Z.Y = t))
        }
        Z.L = null;
        Z.W = null
      }
    }
    ).cX(B => {
      Z.L = null;
      Z.W = null;
      Z.player.C("capfail", {
        rn: z,
        status: B.xhr?.status
      })
    }
    );
    Z.L = N;
    w4R(Z.B, Z.L.fN[0].NA)
  }
    , kru = function(Z, N) {
    return N != null && N in Z.W.G ? Z.W.G[N] : null
  }
    , UH3 = function(Z, N, r) {
    var X = [];
    for (let z in Z.W.G) {
      if (!Z.W.G.hasOwnProperty(z))
        continue;
      let Q = Z.W.G[z];
      if (g.gj(Q, r || null)) {
        let B = Q.info.captionTrack;
        B && B.languageCode === N && X.push(Q)
      }
    }
    return X.length ? X[0] : null
  }
    , y2T = function(Z, N) {
    var r = [];
    for (let z in Z.W.G) {
      if (!Z.W.G.hasOwnProperty(z))
        continue;
      var X = Z.W.G[z];
      if (g.gj(X, N || null)) {
        let Q = X.info.id
          , B = Q
          , x = `.${Q}`
          , t = ""
          , J = "";
        if (X = X.info.captionTrack)
          Q = X.languageCode,
          B = X.displayName,
          x = X.vssId,
          t = X.kind,
          J = X.id;
        else {
          {
            X = Q;
            let W = g.$bu.get(X);
            W == null && (W = bLu[X] || bLu[X.replace(/-/g, "_")],
            g.$bu.set(X, W));
            X = W
          }
          B = X || B
        }
        r.push(new g.io({
          id: z,
          languageCode: Q,
          languageName: B,
          is_servable: !0,
          is_default: !0,
          is_translateable: !1,
          vss_id: x,
          kind: t,
          captionId: J
        }))
      }
    }
    return r
  }
    , rP = function(Z) {
    if (typeof DOMParser != "undefined")
      return g.J8(new DOMParser, g.wT(Z), "application/xml");
    throw Error("Your browser does not support loading xml documents");
  }
    , Ts3 = function(Z, N, r, X) {
    var z = N / 360 * 16;
    N >= Z && (Z = 640,
    X > r * 1.3 && (Z = 480),
    z = r / Z * 16);
    return z
  }
    , SwQ = function(Z) {
    var N = 1 + .25 * (Z.fontSizeIncrement || 0);
    if (Z.offset === 0 || Z.offset === 2)
      N *= .8;
    return N
  }
    , uO$ = function(Z, N) {
    var r = "vertical-rl";
    Z.G.Wh === 1 && (r = "vertical-lr");
    g.VY && (r = r === "vertical-lr" ? "tb-lr" : "tb-rl");
    g.Hv(N, "-o-writing-mode", r);
    g.Hv(N, "-webkit-writing-mode", r);
    g.Hv(N, "writing-mode", r);
    g.Hv(N, "text-orientation", "upright");
    g.mr(N, "ytp-vertical-caption");
    Z.W.params.P9 === 3 && (g.Hv(N, "text-orientation", ""),
    g.Hv(N, "transform", "rotate(180deg)"))
  }
    , M3T = function(Z, N) {
    var r = {}
      , X = N.background ? N.background : Z.G.fF.background;
    if (N.backgroundOpacity != null || N.background) {
      var z = N.backgroundOpacity != null ? N.backgroundOpacity : Z.G.fF.backgroundOpacity;
      X = dM(X);
      r.background = "rgba(" + X[0] + "," + X[1] + "," + X[2] + "," + z + ")";
      Z.rz && (r["box-decoration-break"] = "clone",
      r["border-radius"] = `${Z.It * .375}px`)
    }
    if (N.fontSizeIncrement != null || N.offset != null)
      r["font-size"] = `${Z.u3 * SwQ(N)}px`;
    X = 1;
    z = N.color || Z.G.fF.color;
    if (N.color || N.textOpacity != null)
      z = dM(z),
      X = N.textOpacity == null ? Z.G.fF.textOpacity : N.textOpacity,
      z = "rgba(" + z[0] + "," + z[1] + "," + z[2] + "," + X + ")",
      r.color = z,
      r.fill = z;
    var Q = N.charEdgeStyle;
    Q === 0 && (Q = void 0);
    if (Q) {
      z = `rgba(34, 34, 34, ${X})`;
      let t = `rgba(204, 204, 204, ${X})`;
      N.oI && (t = z = N.oI);
      let J = Z.u3 / 16 / 2
        , W = Math.max(J, 1);
      var B = Math.max(2 * J, 1)
        , x = Math.max(3 * J, 1);
      let H = Math.max(5 * J, 1);
      X = [];
      switch (Q) {
      case 4:
        for (; x <= H; x += J)
          X.push(`${B}px ${B}px ${x}px ${z}`);
        break;
      case 1:
        B = window.devicePixelRatio >= 2 ? .5 : 1;
        for (Q = W; Q <= x; Q += B)
          X.push(`${Q}px ${Q}px ${z}`);
        break;
      case 2:
        X.push(`${W}px ${W}px ${t}`);
        X.push(`-${W}px -${W}px ${z}`);
        break;
      case 3:
        for (x = 0; x < 5; x++)
          X.push(`0 0 ${B}px ${z}`)
      }
      r["text-shadow"] = X.join(", ")
    }
    z = "";
    switch (N.fontFamily) {
    case 1:
      z = '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
      break;
    case 2:
      z = '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
      break;
    case 3:
      z = '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
      break;
    case 5:
      z = '"Comic Sans MS", Impact, Handlee, fantasy';
      break;
    case 6:
      z = '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
      break;
    case 7:
      z = g.u8() ? '"Carrois Gothic SC", sans-serif-smallcaps' : 'Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
      break;
    case 0:
    case 4:
      z = '"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'
    }
    z && (r["font-family"] = z);
    z = N.offset;
    z == null && (z = Z.G.fF.offset);
    switch (z) {
    case 0:
      r["vertical-align"] = "sub";
      break;
    case 2:
      r["vertical-align"] = "super"
    }
    N.fontFamily === 7 && (r["font-variant"] = "small-caps");
    N.bold && (r["font-weight"] = "bold");
    N.italic && (r["font-style"] = "italic");
    N.underline && (r["text-decoration"] = "underline");
    N.Ih && (r.visibility = "hidden");
    N.F5 === 1 && Z.N && (r["text-combine-upright"] = "all",
    r["text-orientation"] = "mixed",
    z = g.Ly || g.rl,
    Z.W.params.P9 === 3 ? r.transform = z ? "rotate(90deg)" : "rotate(180deg)" : z && (r.transform = "rotate(-90deg)"));
    if (N.textEmphasis === 1 || N.textEmphasis === 2 || N.textEmphasis === 3 || N.textEmphasis === 4 || N.textEmphasis === 5)
      if (g.Ly)
        r["font-weight"] = "bold";
      else
        switch (r["text-emphasis-style"] = "filled circle",
        r["text-emphasis-color"] = "currentcolor",
        r["webkit-text-emphasis"] = "filled circle",
        N.textEmphasis) {
        case 4:
        case 3:
          r["text-emphasis-position"] = "under left";
          r["webkit-text-emphasis-position"] = "under left";
          break;
        case 5:
        case 2:
          r["text-emphasis-position"] = "over right",
          r["webkit-text-emphasis-position"] = "over right"
        }
    return r
  }
    , DH3 = function(Z, N) {
    if (Z.JE && N.length === 0)
      return 0;
    Z = 1;
    for (let r = 0; r < N.length; r++) {
      let X = N[r];
      typeof X.text === "string" && (Z += X.text.split("\n").length - 1,
      X.append || r === 0 || Z++)
    }
    return Z
  }
    , Xo = function(Z) {
    Z = Z.split("px");
    return Z.length > 0 ? (Z = Number(Z[0])) ? Z : 0 : 0
  }
    , hLu = function(Z, N, r) {
    Z.cG = Z.cG || !!r;
    var X = {};
    Object.assign(X, Z.G.fF);
    Object.assign(X, r || N.G);
    Object.assign(X, Z.jJ.fF);
    (r = !Z.Y) && OL3(Z);
    var z = Z.gz && Z.pN && g.El(X, Z.pN) ? Z.gz : RL3(Z, X)
      , Q = typeof N.text === "string"
      , B = Q ? N.text.split("\n") : [N.text];
    for (let t = 0; t < B.length; t++) {
      var x = t > 0 || !N.append;
      let J = B[t];
      x && !r ? (OL3(Z),
      z = RL3(Z, X)) : x && r && (r = !1);
      J && (z.appendChild(Q ? g.lC(J) : J),
      Q || J.tagName !== "RUBY" || J.childElementCount !== 4 || g.Ly || !g.FE(J.children[2], "text-emphasis") || (x = Z.N ? "padding-right" : "padding-top",
      g.FE(J.children[2], "text-emphasis-position") && (x = Z.N ? "padding-left" : "padding-bottom"),
      g.$D ? g.Hv(z, x, "1em") : g.Hv(z, x, "0.5em")))
    }
    Z.pN = X;
    Z.gz = z;
    Z.D.push(N)
  }
    , OL3 = function(Z) {
    if (Z.Y) {
      var N = Z.Y;
      if (Z.rz) {
        var r = Z.G.textAlign;
        r === 0 ? (N = N.firstElementChild) && g.Hv(N, {
          "border-bottom-left-radius": "0"
        }) : r === 1 && (N = N.lastElementChild) && g.Hv(N, {
          "border-bottom-right-radius": "0"
        })
      }
    }
    Z.Y = g.fZ("SPAN");
    g.Hv(Z.Y, {
      display: "block"
    });
    g.mr(Z.Y, "caption-visual-line");
    Z.B.appendChild(Z.Y)
  }
    , RL3 = function(Z, N) {
    var r = g.fZ("SPAN");
    g.Hv(r, {
      display: "inline-block",
      "white-space": "pre-wrap"
    });
    g.Hv(r, M3T(Z, N));
    r.classList.add("ytp-caption-segment");
    Z.Y.appendChild(r);
    Z.rz && Z.B.children.length > 1 && (Z = Z.G.textAlign,
    Z === 0 ? r.previousElementSibling || g.Hv(r, {
      "border-top-left-radius": "0"
    }) : Z === 1 && g.Hv(r, {
      "border-top-right-radius": "0"
    }));
    r.previousElementSibling && (g.Hv(r.previousElementSibling, {
      "border-top-right-radius": "0",
      "border-bottom-right-radius": "0"
    }),
    g.Hv(r, {
      "border-top-left-radius": "0",
      "border-bottom-left-radius": "0"
    }));
    return r
  }
    , ngQ = function(Z, N, r) {
    if (Z === 255 && N === 255 || !Z && !N)
      return {
        lH: Z,
        Wd: N,
        result: 0
      };
    Z = ggO[Z];
    N = ggO[N];
    if (Z & 128) {
      var X;
      if (X = !(N & 128))
        X = N,
        X = r.kE() && r.Wd === X;
      if (X)
        return {
          lH: Z,
          Wd: N,
          result: 1
        }
    } else if (N & 128 && 1 <= Z && Z <= 31)
      return {
        lH: Z,
        Wd: N,
        result: 2
      };
    return {
      lH: Z,
      Wd: N,
      result: 3
    }
  }
    , EgT = function(Z, N, r, X) {
    N === 255 && r === 255 || !N && !r ? (++Z.L === 45 && Z.reset(),
    Z.B.W.clear(),
    Z.N.W.clear()) : (Z.L = 0,
    Lta(Z.B, N, r, X))
  }
    , og$ = function(Z, N) {
    Z.G.sort( (r, X) => {
      var z = r.time - X.time;
      return z === 0 ? r.order - X.order : z
    }
    );
    for (let r of Z.G)
      Z.time = r.time,
      r.type === 0 ? EgT(Z, r.Z5, r.Aq, N) : r.type === 1 && Z.W & 496 && Lta(Z.N, r.Z5, r.Aq, N);
    Z.G.length = 0
  }
    , qw3 = function(Z, N) {
    switch (Z) {
    case 0:
      return mHO[(N & 127) - 32];
    case 1:
      return PuO[N & 15];
    case 2:
      return iLT[N & 31];
    case 3:
      return Yw_[N & 31]
    }
    return 0
  }
    , zC = function(Z, N) {
    if (Z.style.type === 3) {
      var r = 0
        , X = 0
        , z = Z.N.time + 0
        , Q = ""
        , B = ""
        , x = z;
      for (var t = 1; t <= 15; ++t) {
        var J = !1;
        for (var W = X ? X : 1; W <= 32; ++W) {
          var H = Z.L[t][W];
          if (H.G !== 0) {
            r === 0 && (r = t,
            X = W);
            J = String.fromCharCode(H.G);
            var v = H.timestamp;
            v < z && (z = v);
            H.timestamp = x;
            B && (Q += B,
            B = "");
            Q += J;
            J = !0
          }
          if ((H.G === 0 || W === 32) && J) {
            B = "\n";
            break
          } else if (X && !J)
            break
        }
        if (r && !J)
          break
      }
      Q && N.B(r, X, z, x, Q)
    } else
      for (X = r = 0,
      Q = z = Z.N.time + 0,
      B = 1; B <= 15; ++B)
        for (x = "",
        t = 1; t <= 32; ++t)
          if (W = Z.L[B][t],
          H = W.G,
          H !== 0 && (r === 0 && (r = B,
          X = t),
          J = String.fromCharCode(H),
          v = W.timestamp,
          v <= z && (z = v),
          x += J,
          W.reset()),
          t === 32 || H === 0)
            x && N.B(r, X, z, Q, x),
            z = Q,
            x = "",
            X = r = 0
  }
    , Qi = function(Z) {
    return Z.L[Z.row][Z.W]
  }
    , B3 = function(Z, N, r) {
    N >= 2 && Z.W > 1 && (--Z.W,
    Qi(Z).G = 0);
    var X = Qi(Z);
    X.timestamp = Z.N.time + 0;
    X.G = qw3(N, r);
    Z.W < 32 && Z.W++
  }
    , p4y = function(Z, N, r, X) {
    for (let B = 0; B < X; B++)
      for (let x = 0; x <= 32; x++) {
        var z = Z.L[N + B][x]
          , Q = Z.L[r + B][x];
        z.G = Q.G;
        z.timestamp = Q.timestamp
      }
  }
    , xs = function(Z, N, r) {
    for (let X = 0; X < r; X++)
      for (let z = 0; z <= 32; z++)
        Z.L[N + X][z].reset()
  }
    , tY = function(Z) {
    Z.row = Z.G > 0 ? Z.G : 1;
    Z.W = 1;
    xs(Z, 0, 15)
  }
    , KtT = function(Z) {
    Z.style.set(1);
    Z.G = Z.B;
    Z.G.G = 0;
    Z.G.style = Z.style;
    Z.L.mode = 1 << Z.G.B
  }
    , JY = function(Z, N, r) {
    var X = Z.W
      , z = !1;
    switch (Z.style.get()) {
    case 4:
    case 1:
    case 2:
      Z.style.get() === 4 && X.G > 0 || (zC(X, r),
      tY(Z.W),
      tY(Z.B),
      X.row = 15,
      X.G = N,
      z = !0)
    }
    Z.style.set(3);
    Z.G = X;
    Z.G.style = Z.style;
    Z.L.mode = 1 << X.B;
    z ? X.W = 1 : X.G !== N && (X.G > N ? (zC(X, r),
    xs(X, X.row - X.G, N)) : X.row < N && (N = X.G),
    X.G = N)
  }
    , eLQ = function(Z) {
    Z.style.set(4);
    Z.G = Z.text;
    Z.G.style = Z.style;
    Z.L.mode = 1 << Z.G.B
  }
    , Lta = function(Z, N, r, X) {
    Z.W.update();
    N = ngQ(N, r, Z.W);
    switch (N.result) {
    case 0:
      return;
    case 1:
    case 2:
      return
    }
    var z = N.lH;
    N = N.Wd;
    if (32 <= z || !z)
      Z.G.mode & Z.G.W && (r = z,
      r & 128 && (r = 127),
      N & 128 && (N = 127),
      Z = Z.B.G,
      r & 96 && B3(Z, 0, r),
      N & 96 && B3(Z, 0, N),
      r !== 0 && N !== 0 && Z.style.type === 3 && zC(Z, X));
    else if (z & 16)
      a: if (!Z.W.matches(z, N) && (r = Z.W,
      r.lH = z,
      r.Wd = N,
      r.state = 2,
      r = z & 8 ? Z.Y : Z.L,
      Z.B = r,
      Z.G.mode = 1 << (Z.N << 2) + (r.N << 1) + (r.style.type === 4 ? 1 : 0),
      (Z.G.mode | 1 << (Z.N << 2) + (r.N << 1) + (r.style.type !== 4 ? 1 : 0)) & Z.G.W))
        if (N & 64) {
          X = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(z & 7) << 1 | N >> 5 & 1];
          Z = N & 16 ? ((N & 14) >> 1) * 4 : 0;
          N = r.G;
          switch (r.style.get()) {
          case 4:
            X = N.row;
            break;
          case 3:
            if (X !== N.row) {
              if (X < N.G && (X = N.G,
              X === N.row))
                break;
              var Q = 1 + N.row - N.G;
              let B = 1 + X - N.G;
              p4y(N, B, Q, N.G);
              r = Q;
              z = N.G;
              B < Q ? (Q = B + z - Q,
              Q > 0 && (r += Q,
              z -= Q)) : (Q = Q + z - B,
              Q > 0 && (z -= Q));
              xs(N, r, z)
            }
          }
          N.row = X;
          N.W = Z + 1
        } else
          switch (z & 7) {
          case 1:
            switch (N & 112) {
            case 32:
              B3(r.G, 0, 32);
              break a;
            case 48:
              N === 57 ? (X = r.G,
              Qi(X).G = 0,
              X.W < 32 && X.W++) : B3(r.G, 1, N & 15)
            }
            break;
          case 2:
            N & 32 && B3(r.G, 2, N & 31);
            break;
          case 3:
            N & 32 && B3(r.G, 3, N & 31);
            break;
          case 4:
          case 5:
            if (32 <= N && N <= 47)
              switch (N) {
              case 32:
                KtT(r);
                break;
              case 33:
                X = r.G;
                X.W > 1 && (--X.W,
                Qi(X).G = 0);
                break;
              case 36:
                X = r.G;
                Z = Qi(X);
                for (N = 0; N <= 15; N++)
                  for (r = 0; r <= 32; r++)
                    if (X.L[N][r] === Z) {
                      for (; r <= 32; r++)
                        X.L[N][r].reset();
                      break
                    }
                break;
              case 37:
                JY(r, 2, X);
                break;
              case 38:
                JY(r, 3, X);
                break;
              case 39:
                JY(r, 4, X);
                break;
              case 40:
                B3(r.G, 0, 32);
                break;
              case 41:
                X = r;
                X.style.set(2);
                X.G = X.W;
                X.G.G = 0;
                X.G.style = X.style;
                X.L.mode = 1 << X.G.B;
                break;
              case 42:
                X = r;
                Z = X.text;
                Z.G = 15;
                Z.style.set(4);
                tY(Z);
                eLQ(X);
                break;
              case 43:
                eLQ(r);
                break;
              case 44:
                Z = r;
                N = Z.W;
                switch (Z.style.get()) {
                case 1:
                case 2:
                case 3:
                  zC(N, X)
                }
                xs(N, 0, 15);
                break;
              case 45:
                b: {
                  N = r;
                  Z = N.G;
                  switch (N.style.get()) {
                  default:
                  case 2:
                  case 1:
                    break b;
                  case 4:
                    if (Z.row < 15) {
                      ++Z.row;
                      Z.W = 1;
                      break b
                    }
                    break;
                  case 3:
                  }
                  Z.G < 2 && (Z.G = 2,
                  Z.row < Z.G && (Z.row = Z.G));
                  N = Z.row - Z.G + 1;
                  zC(Z, X);
                  p4y(Z, N, N + 1, Z.G - 1);
                  xs(Z, Z.row, 1)
                }
                break;
              case 46:
                xs(r.B, 0, 15);
                break;
              case 47:
                Z = r,
                zC(Z.W, X),
                Z.B.updateTime(Z.L.time + 0),
                X = Z.B,
                Z.B = Z.W,
                Z.W = X,
                KtT(Z)
              }
            break;
          case 7:
            switch (N) {
            case 33:
            case 34:
            case 35:
              X = r.G,
              (X.W += N & 3) > 32 && (X.W = 32)
            }
          }
  }
    , frO = function(Z, N, r, X, z, Q, B) {
    var x = Q[0]
      , t = B[x.getAttribute("p")];
    if (t.OE === 1) {
      var J = Q[1]
        , W = Q[2];
      Q = Q[3];
      x.getAttribute("t");
      J.getAttribute("t");
      W.getAttribute("t");
      Q.getAttribute("t");
      x.getAttribute("p");
      J.getAttribute("p");
      Q.getAttribute("p");
      B = B[W.getAttribute("p")];
      x = arT(x.textContent, J.textContent, W.textContent, Q.textContent, B);
      return new jk(Z,N,z,r,x,X,t)
    }
    switch (t.OE) {
    case 9:
    case 10:
      t.textEmphasis = 1;
      break;
    case 11:
      t.textEmphasis = 2;
      break;
    case 12:
      t.textEmphasis = 3;
      break;
    case 13:
      t.textEmphasis = 4;
      break;
    case 14:
      t.textEmphasis = 5
    }
    return new jk(Z,N,z,r,x.textContent || "",X,t)
  }
    , arT = function(Z, N, r, X, z) {
    var Q = g.u8()
      , B = Q ? g.fZ("DIV") : g.fZ("RUBY")
      , x = g.fZ("SPAN");
    x.textContent = Z;
    B.appendChild(x);
    Z = Q ? g.fZ("DIV") : g.fZ("RP");
    Z.textContent = N;
    B.appendChild(Z);
    N = Q ? g.fZ("DIV") : g.fZ("RT");
    N.textContent = r;
    B.appendChild(N);
    r = z.OE;
    if (r === 10 || r === 11 || r === 12 || r === 13 || r === 14)
      if (g.Hv(N, "text-emphasis-style", "filled circle"),
      g.Hv(N, "text-emphasis-color", "currentcolor"),
      g.Hv(N, "webkit-text-emphasis", "filled circle"),
      z.OE === 11 || z.OE === 13)
        g.Hv(N, "webkit-text-emphasis-position", "under left"),
        g.Hv(N, "text-emphasis-position", "under left");
    r = !0;
    if (z.OE === 4 || z.OE === 7 || z.OE === 12 || z.OE === 14)
      g.Hv(B, "ruby-position", "over"),
      g.Hv(B, "-webkit-ruby-position", "before");
    else if (z.OE === 5 || z.OE === 6 || z.OE === 11 || z.OE === 13)
      g.Hv(B, "ruby-position", "under"),
      g.Hv(B, "-webkit-ruby-position", "after"),
      r = !1;
    z = Q ? g.fZ("DIV") : g.fZ("RP");
    z.textContent = X;
    B.appendChild(z);
    Q && (X = r,
    g.Hv(B, {
      display: "inline-block",
      position: "relative"
    }),
    Q = B.firstElementChild.nextElementSibling,
    g.Hv(Q, "display", "none"),
    Q = Q.nextElementSibling,
    g.Hv(Q, {
      "font-size": "0.5em",
      "line-height": "1.2em",
      "text-align": "center",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      width: "400%"
    }),
    g.Hv(B.lastElementChild, "display", "none"),
    X ? (g.Hv(B, "padding-top", "0.6em"),
    g.Hv(Q, "top", "0")) : (g.Hv(B, "padding-bottom", "0.6em"),
    g.Hv(Q, "bottom", "0")));
    return B
  }
    , lr$ = function(Z) {
    var N = "_" + W3++;
    return new H3(0,0x8000000000000,0,N,Z)
  }
    , v3 = function(Z, N) {
    Z = Z.getAttribute(N);
    if (Z != null)
      return Number(Z)
  }
    , GC = function(Z, N) {
    Z = Z.getAttribute(N);
    if (Z != null)
      return Z === "1"
  }
    , $s = function(Z, N) {
    Z = v3(Z, N);
    return Z !== void 0 ? Z : null
  }
    , wP = function(Z, N) {
    Z = Z.getAttribute(N);
    if (Z != null)
      return sb.test(Z),
      Z
  }
    , A2R = function(Z, N) {
    var r = {}
      , X = N.getAttribute("ws");
    Object.assign(r, X ? Z.D[X] : Z.B);
    Z = $s(N, "mh");
    Z != null && (r.xi = Z);
    Z = $s(N, "ju");
    Z != null && (r.textAlign = Z);
    Z = $s(N, "pd");
    Z != null && (r.P9 = Z);
    Z = $s(N, "sd");
    Z != null && (r.Wh = Z);
    Z = wP(N, "wfc");
    Z != null && (r.windowColor = Z);
    N = v3(N, "wfo");
    N !== void 0 && (r.windowOpacity = N / 255);
    return r
  }
    , IrT = function(Z, N) {
    var r = {}
      , X = N.getAttribute("wp");
    X && Object.assign(r, Z.j[X]);
    Z = $s(N, "ap");
    Z != null && (r.JW = Z);
    Z = v3(N, "cc");
    Z != null && (r.TM = Z);
    Z = v3(N, "ah");
    Z != null && (r.bu = Z);
    Z = v3(N, "rc");
    Z != null && (r.WY = Z);
    N = v3(N, "av");
    N != null && (r.BV = N);
    return r
  }
    , c2Q = function(Z, N, r, X) {
    var z = {};
    Object.assign(z, IrT(Z, N));
    Object.assign(z, A2R(Z, N));
    X ? g.El(z, Z.B) ? (X = Z.N,
    z = Z.B) : X = "_" + W3++ : X = N.getAttribute("id") || "_" + W3++;
    Z = v3(N, "t") + r;
    N = v3(N, "d") || 0x8000000000000;
    if (z.P9 === 2 || z.P9 === 3)
      r = z.WY,
      z.WY = z.TM,
      z.TM = r;
    return new H3(Z,N,0,X,z)
  }
    , Fo = function(Z) {
    Z = g.v_(Math.round(Z), 0, 16777215).toString(16).toUpperCase();
    return "#000000".substring(0, 7 - Z.length) + Z
  }
    , V37 = function(Z, N, r, X, z) {
    X === 0 && (X = 0x8000000000000);
    var Q = {};
    N.wpWinPosId && Object.assign(Q, Z.B.get(N.wpWinPosId));
    N.wsWinStyleId && Object.assign(Q, Z.N.get(N.wsWinStyleId));
    Z = N.rcRowCount;
    Z !== void 0 && (Q.WY = Z);
    N = N.ccColCount;
    N !== void 0 && (Q.TM = N);
    if (Q.P9 === 2 || Q.P9 === 3)
      N = Q.WY,
      Q.WY = Q.TM,
      Q.TM = N;
    return new H3(r,X,0,z,Q)
  }
    , C6 = function(Z) {
    var N = Z.byteOffset;
    Z.byteOffset += 1;
    return Z.G.getUint8(N)
  }
    , ks = function(Z) {
    var N = Z.byteOffset;
    Z.byteOffset += 4;
    return Z.G.getUint32(N)
  }
    , NY$ = function(Z) {
    if (typeof Z === "string")
      return !1;
    Z = new dH7(Z,0);
    return Zqu(Z)
  }
    , Zqu = function(Z) {
    if (!(Z.byteOffset < Z.G.byteLength) || ks(Z) !== 1380139777)
      return !1;
    Z.version = C6(Z);
    if (Z.version > 1)
      return !1;
    C6(Z);
    C6(Z);
    C6(Z);
    return !0
  }
    , rWu = function(Z, N) {
    if (!N)
      return "";
    Z.N && Z.W.params.Wh !== 1 && (N *= -1);
    return `translate${Z.N ? "X" : "Y"}(${N}px)`
  }
    , XIu = function(Z) {
    Z.KN = Array.from(Z.element.getElementsByClassName("caption-visual-line"));
    for (var N = Z.W.params.WY, r = 0, X = 0, z = Z.KN.length - 1; r < N && z > -1; ) {
      var Q = Z.KN[z];
      X += Z.N ? Q.offsetWidth : Q.offsetHeight;
      r++;
      z--
    }
    Z.LN = X;
    N = Math;
    r = N.max;
    isNaN(Z.AE) && ((X = Z.G.TM) ? (z = g.fZ("SPAN"),
    g.Zt(z, "\u2013".repeat(X)),
    g.Hv(z, M3T(Z, Z.G.fF)),
    Z.B.appendChild(z),
    Z.AE = z.offsetWidth,
    Z.B.removeChild(z)) : Z.AE = 0);
    X = Z.B;
    Z.BG = r.call(N, Z.AE, Z.LF, (Z.N ? X.offsetHeight : X.offsetWidth) + 1)
  }
    , zKT = function(Z, N) {
    XIu(Z);
    var r = Z.KN.reduce( (X, z) => (Z.N ? z.offsetWidth : z.offsetHeight) + X, 0);
    r = Z.LN - r;
    if (r !== Z.D$) {
      let X = r > 0 && Z.D$ === 0
        , z = r < Z.D$;
      N || isNaN(r) || X || !z || (g.mr(Z.element, "ytp-rollup-mode"),
      Z.kR(Z.element, "transitionend", Z.wz));
      g.Hv(Z.B, "transform", rWu(Z, r));
      Z.D$ = r
    }
    XIu(Z)
  }
    , BY_ = function(Z, N, r, X) {
    var {formatId: z, NA: Q, startTimeMs: B, durationMs: x} = Z.Y(N)
      , t = {
      formatId: z,
      startTimeMs: B,
      durationMs: x,
      Qg: Q,
      oi: Q
    }
      , J = Qdu(Z.Qv, t.startTimeMs)
      , W = J >= 0 ? Z.Qv[J] : null
      , H = W ? W.startTimeMs + W.durationMs : 0
      , v = t.startTimeMs + t.durationMs;
    !W || t.startTimeMs - H > Z.B ? Z.Qv.splice(J + 1, 0, t) : (W.durationMs = Math.max(H, v) - W.startTimeMs,
    W.oi = Math.max(W.oi, t.oi));
    X(Z.Qv);
    X = g.Zs(N);
    Z = Z.N;
    X = X.buffer.slice(X.byteOffset, X.byteLength + X.byteOffset);
    N = N.info.L;
    Z.X ? Z.j == null ? g.IT(Z.logger, 350058965, "Null loaded track meta data at captions data received") : r.nx(X, Z.j, N * 1E3) : g.IT(Z.logger, 350058965, "Null Representation at captions data received")
  }
    , JW_ = function(Z, N) {
    Z.W = (r, X) => {
      if (Z.WG.V().experiments.Oa("html5_sabr_live_support_subfragmented_captions"))
        (Z.G ? Z.G = Z.G.N(r) : (Z.G = r,
        x1Q(Z.G)),
        Z.G) ? r.info.J8 && (t1Q(Z.G),
        BY_(Z, Z.G, N, X),
        Z.G = null) : g.IT(Z.logger, 350058965, "Empty slice");
      else if (r.info.J8) {
        var z = r;
        if (Z.Xs.length > 0) {
          for (z = Z.Xs.shift(); Z.Xs.length > 0; )
            z = z.N(Z.Xs.shift());
          z = z.N(r)
        }
        z ? (x1Q(z),
        t1Q(z),
        BY_(Z, z, N, X)) : g.IT(Z.logger, 350058965, "Empty slice")
      } else
        Z.Xs.push(r)
    }
    ;
    Z.WG.addEventListener("sabrCaptionsDataLoaded", Z.W)
  }
    , Qdu = function(Z, N) {
    Z = g.ZC(Z, {
      startTimeMs: N
    }, (r, X) => r.startTimeMs - X.startTimeMs);
    return Z >= 0 ? Z : -Z - 2
  }
    , x1Q = function(Z) {
    try {
      var N = g.z3(Z) * 1E3
    } catch (r) {
      N = Z.info.startTime * 1E3
    }
    N < 0 && (N = Z.info.startTime * 1E3);
    Z.info.startTime = N / 1E3;
    Z.info.L = N / 1E3
  }
    , t1Q = function(Z) {
    try {
      var N = g.JF(Z) * 1E3
    } catch (r) {
      N = Z.info.duration * 1E3
    }
    N < 0 && (N = Z.info.duration * 1E3);
    Z.info.duration = N / 1E3;
    Z.info.Z = N / 1E3
  }
    , jdT = function(Z, N) {
    if (!g.CO(Z) || Z.G != null && g.hl(N, Z.G) && Z.G.G.rawcc != null)
      return !1;
    N = !!Z.G && Z.G.isManifestless && Object.values(Z.G.G).some(r => g.gj(r, "386"));
    Z = !!Z.G && !Z.G.isManifestless && g.bz(Z.G);
    return N || Z
  }
    , WRT = function(Z, N, r) {
    var X = [];
    for (let z in Z.W.G) {
      if (!Z.W.G.hasOwnProperty(z))
        continue;
      let Q = Z.W.G[z];
      if (g.gj(Q, r || null)) {
        let B = Q.info.captionTrack;
        B && B.languageCode === N && X.push(Q)
      }
    }
    return X.length ? X[0] : null
  }
    , HqQ = function(Z, N) {
    var r = [];
    for (let z in Z.W.G) {
      if (!Z.W.G.hasOwnProperty(z))
        continue;
      var X = Z.W.G[z];
      if (g.gj(X, N || null)) {
        let Q = X.info.id
          , B = Q
          , x = `.${Q}`
          , t = ""
          , J = "";
        if (X = X.info.captionTrack)
          Q = X.languageCode,
          B = X.displayName,
          x = X.vssId,
          t = X.kind,
          J = X.id;
        r.push(new g.io({
          id: z,
          languageCode: Q,
          languageName: B,
          is_servable: !0,
          is_default: !0,
          is_translateable: !1,
          vss_id: x,
          kind: t,
          captionId: J
        }))
      }
    }
    return r
  }
    , GRO = function(Z) {
    var N = vy3.length;
    if (Z.byteLength < N)
      return !1;
    Z = new Uint8Array(Z,0,N);
    for (let r = 0; r < N; r++)
      if (vy3[r] !== Z[r])
        return !1;
    return !0
  }
    , Ub = function(Z) {
    Z = Z.split(":");
    var N = 0;
    for (let r of Z)
      N = N * 60 + Number(r);
    return N * 1E3
  }
    , $1O = function(Z, N, r, X) {
    X = Object.assign({
      xi: 0
    }, X);
    return new H3(Z,N,r,"_" + W3++,X)
  }
    , sdy = function(Z, N, r, X, z, Q, B, x, t) {
    switch (B.tagName) {
    case "b":
      x.bold = !0;
      break;
    case "i":
      x.italic = !0;
      break;
    case "u":
      x.underline = !0
    }
    for (let W = 0; W < B.childNodes.length; W++) {
      var J = B.childNodes[W];
      if (J.nodeType === 3)
        J = new jk(N,r,X,z.id,J.nodeValue,Q || W > 0,g.hc(x) ? void 0 : x),
        t.push(J),
        z.G.push(J);
      else {
        let H = {};
        Object.assign(H, x);
        sdy(Z, N, r, X, z, !0, J, H, t)
      }
    }
  }
    , FR_ = function(Z, N, r) {
    if (typeof N === "string" || NY$(N))
      return [{
        trackData: N,
        bq: r
      }];
    if (typeof N === "string" && N.substring(0, 6) === "WEBVTT" || typeof N !== "string" && GRO(N))
      return [{
        trackData: N,
        bq: r
      }];
    var X = new DataView(N);
    if (X.byteLength <= 8 || X.getUint32(4) !== 1718909296)
      return [];
    var z = g.Pn(X);
    if (Z.pO && z) {
      var Q = g.Uo(z)
        , B = g.bZ(z);
      z = z.segmentNumber;
      Q && z && Z.pO.T9(z, Q, B)
    }
    Z = g.Eo(X, 1835295092);
    if (!Z || !Z.length || !Z[0].size)
      return [];
    Q = [];
    for (B = 0; B < Z.length; B++)
      z = Z[B],
      z = new Uint8Array(N,z.dataOffset,z.size - (z.dataOffset - z.offset)),
      z = g.zD(z),
      Q.push({
        trackData: z,
        bq: r + B * 1E3
      });
    wIO(X, Q, r);
    return Q = Q.filter(x => !!x.trackData)
  }
    , kRu = function(Z, N, r) {
    Z.G || (Z.G = new CeQ);
    Z = Z.G.L(N, r);
    Math.random() < .01 && g.AB(Error("Deprecated subtitles format in web player: WebVTT"));
    return Z
  }
    , wIO = function(Z, N, r) {
    var X = g.D8(Z, 0, 1836476516)
      , z = 9E4;
    X && (z = g.hN(X) || 9E4);
    X = 0;
    var Q = g.Eo(Z, 1836019558);
    for (let x = 0; x < Q.length; x++) {
      var B = Q[x];
      x < N.length && (B = g.D8(Z, B.dataOffset, 1953653094)) && (B = g.D8(Z, B.dataOffset, 1952867444)) && (B = g.n$(B) / z * 1E3,
      x === 0 && (X = B),
      N[x].bq = B - X + r || r * x * 1E3)
    }
  }
    , U1_ = function(Z) {
    var N = {};
    if (Z = g.hr(Z))
      N.lang = Z,
      g.yE$.test(Z) && (N.P9 = 1);
    return N
  }
    , bqQ = function(Z) {
    var N = !!Z.WG.vD()?.AE();
    return Z.L === "HLS" && N ? !0 : Z.pN && N && Z.L !== "LIVE" && Z.L !== "SABR_LIVE"
  }
    , b4 = function(Z, N, r=!1) {
    var X = Z.U.K("enable_player_captions_new_style_defaults") ? yW3 : TYy
      , z = X.fF;
    Z.N = {};
    Object.assign(Z.N, X);
    Z.N.fF = {};
    Object.assign(Z.N.fF, z);
    Z.Y = {
      fF: {}
    };
    var Q = N.backgroundOverride ? Z.Y : Z.N
      , B = N.background || z.background;
    sb.test(B);
    Q.fF.background = B;
    Q = N.colorOverride ? Z.Y : Z.N;
    B = N.color || z.color;
    sb.test(B);
    Q.fF.color = B;
    Q = N.windowColorOverride ? Z.Y : Z.N;
    B = N.windowColor || X.windowColor;
    sb.test(B);
    Q.windowColor = B;
    Q = N.backgroundOpacityOverride ? Z.Y : Z.N;
    B = N.backgroundOpacity;
    B == null && (B = z.backgroundOpacity);
    Q.fF.backgroundOpacity = B;
    Q = N.fontSizeIncrementOverride ? Z.Y : Z.N;
    B = N.fontSizeIncrement;
    B == null && (B = z.fontSizeIncrement);
    Q.fF.fontSizeIncrement = B;
    B = N.fontStyleOverride ? Z.Y : Z.N;
    Q = N.fontStyle;
    Q == null && (Q = z.bold && z.italic ? 3 : z.bold ? 1 : z.italic ? 2 : 0);
    B = B.fF;
    switch (Q) {
    case 1:
      B.bold = !0;
      delete B.italic;
      break;
    case 2:
      delete B.bold;
      B.italic = !0;
      break;
    case 3:
      B.bold = !0;
      B.italic = !0;
      break;
    default:
      delete B.bold,
      delete B.italic
    }
    Q = N.textOpacityOverride ? Z.Y : Z.N;
    B = N.textOpacity;
    B == null && (B = z.textOpacity);
    Q.fF.textOpacity = B;
    Q = N.windowOpacityOverride ? Z.Y : Z.N;
    B = N.windowOpacity;
    B == null && (B = X.windowOpacity);
    Q.windowOpacity = B;
    X = N.charEdgeStyleOverride ? Z.Y : Z.N;
    Q = N.charEdgeStyle;
    Q == null && (Q = z.charEdgeStyle);
    X.fF.charEdgeStyle = Q;
    X = N.fontFamilyOverride ? Z.Y : Z.N;
    Q = N.fontFamily;
    Q == null && (Q = z.fontFamily);
    X.fF.fontFamily = Q;
    Z.loaded && Z.l3();
    r && g.Cj("yt-player-caption-display-settings", N, 2592E3)
  }
    , yi = function(Z, N, r) {
    N && !Z.J ? (N = lr$({
      P9: 0,
      lang: "en"
    }),
    Z.J = [N, new jk(N.start,N.end - N.start,0,N.id,r ?? "Captions look like this")],
    Z.player.UM(Z.J)) : !N && Z.J && (Sn7(Z, Z.J),
    Z.J = null)
  }
    , M1T = function(Z) {
    if (Z.U.K("enable_player_captions_persistence_state_machine")) {
      var N = g.kT("yt-player-caption-persistence");
      if (N == null) {
        let r = g.uG().qA(65);
        if (r === !0)
          N = !1;
        else {
          let X = g.df(Z.U) ? TC(Z) : uNT(Z);
          X != null ? N = !!X : r === !1 && (N = !0)
        }
        N !== void 0 && Sk(Z, N)
      }
      return N
    }
  }
    , TC = function(Z) {
    if (!Z.WG.isInline())
      return g.kT("yt-player-sticky-caption")
  }
    , uNT = function(Z) {
    if (!Z.storage)
      return null;
    try {
      var N = Z.storage.get("module-enabled")
    } catch (r) {
      Z.storage.remove("module-enabled")
    }
    return N
  }
    , u4 = function(Z) {
    if (Z.U.K("enable_player_captions_persistence_state_machine"))
      return M1T(Z);
    var N = void 0
      , r = g.uG().qA(65);
    if (g.df(Z.U) && r != null) {
      if (TC(Z) != null)
        return !1;
      N = !r
    }
    return N
  }
    , D13 = function(Z) {
    if (Z.U.H9 === 1 || Z.videoData.qQ === 1 || g.Hh(Z.videoData, "yt:cc") === "alwayson")
      return !0;
    if (Z.videoData.captionTracks.length)
      var N = Z.getAudioTrack().W;
    if (Z.U.K("enable_player_captions_persistence_state_machine")) {
      var r = M1T(Z);
      if (r !== void 0)
        return !!r
    } else if (Z.U.H9 === 2 && (g.df(Z.U) ? r = TC(Z) : r = uNT(Z),
    r != null))
      return !!r;
    r = Ij(Z.player.getAudioTrack(), g.df(Z.U));
    var X = g.Hh(Z.videoData, "yt:cc");
    if (u4(Z) === void 0) {
      if (r === "CAPTIONS_INITIAL_STATE_ON_RECOMMENDED")
        return X ? X === "on" : !0;
      if (r === "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED")
        return X === "on"
    } else
      return X === "on";
    return N === "ON" || g.Hh(Z.videoData, "yt:cc") === "on"
  }
    , MI = function(Z, N=!1) {
    if (Z.W && !N || !Z.videoData.captionTracks.length)
      return !1;
    Z = Z.getAudioTrack();
    return !!Z.G || Z.W === "FORCED_ON"
  }
    , OqT = function(Z) {
    return Z.U.K("html5_honor_caption_availabilities_in_audio_track") && Z.L !== "LIVE" && Z.L !== "SABR_LIVE"
  }
    , RKa = function(Z, N) {
    if (Z.W) {
      var r = Z.WG.vD().A8().textTracks
        , X = null;
      Z.L === "HLS" ? X = Z.W.getId() : X = Z.W.toString();
      for (let Q = 0; Q < r.length; Q++) {
        var z = r[Q];
        z.id === X && (N ? z.mode !== "showing" && (z.mode = "showing",
        z = Z.W,
        Z.UB(z, !!z, DY(Z) ? "g" : Z.j ? "m" : "s")) : z.mode === "showing" && (z.mode = "disabled"))
      }
    }
  }
    , DY = function(Z) {
    var N = Ob(Z);
    return !!N && Z.W === N
  }
    , gyO = function(Z, N) {
    if (Z.L === "HLS")
      return !1;
    g.sR(Z.videoData) && (N = !0);
    N || (N = Z.L === "TTS" ? !1 : Z.L === "INNERTUBE" ? !1 : !0);
    return N || Z.U.K("web_watch_disable_account_level_captions_settings") && g.df(Z.U) ? !0 : !!g.uG().qA(66)
  }
    , Ob = function(Z) {
    return Z.D && Z.D.G
  }
    , Rc = function(Z, N) {
    if (!Z.G)
      return null;
    if (Z.D && Z.D.B)
      return Z.D.B;
    N = gyO(Z, N);
    N = Z.G.G.G(N);
    var r = null;
    if (Bs3(Z.U)) {
      var X = Z.WG.isInline() ? void 0 : g.kT("yt-player-caption-sticky-language");
      var z = [X, Z.videoData.captionsLanguagePreference, Z.U.captionsLanguagePreference, g.Hh(Z.videoData, "yt:cc_default_lang")];
      let x = !1;
      for (let t = 0; t < z.length; t++) {
        let J = z[t];
        if (J) {
          x = !0;
          for (var Q = 0; Q < N.length; Q++)
            if (g.hr(N[Q]) === J)
              return N[Q];
          for (Q = 0; Q < N.length; Q++)
            if (g.hr(N[Q]).split("-")[0] === J.split("-")[0])
              return N[Q]
        }
      }
      if (x && Z.G && (z = Z.G.D,
      z.length))
        for (var B of z)
          if (B.languageCode === X) {
            r = B;
            break
          }
    } else
      for (B = [Z.videoData.captionsLanguagePreference, Z.U.captionsLanguagePreference, g.Hh(Z.videoData, "yt:cc_default_lang")],
      X = 0; X < B.length; X++)
        for (z = 0; z < N.length; z++)
          if (g.hr(N[z]) === B[X])
            return N[z];
    B = null;
    Z.D && Z.D.L && (B = Z.D.L);
    B || (B = N.find(x => x.isDefault) || null);
    B || (B = N[0] || Ob(Z));
    B && r && g.hr(B).split("-")[0] !== r.languageCode.split("-")[0] && (B = Qi$(B, r));
    return B
  }
    , L6 = function(Z, N, r) {
    Z.loaded && Z.unload();
    r != null && (Z.j = r,
    Z.j && (Z.U.K("enable_player_captions_persistence_state_machine") ? Sk(Z, !!N) : g.df(Z.U) ? hY(Z, !!N) : gP(Z, !!N)));
    N !== null || MI(Z, !0) || Z.UB(N, !!N, Z.j ? "m" : "s");
    Z.W = N;
    MI(Z) && (Z.W = Ob(Z));
    n6(Z, Z.W ?? void 0);
    Z.load()
  }
    , Sk = function(Z, N) {
    Z.U.K("enable_player_captions_persistence_state_machine") && g.Cj("yt-player-caption-persistence", N, 3122064E3)
  }
    , hY = function(Z, N) {
    Z.WG.isInline() || g.Cj("yt-player-sticky-caption", N, 2592E3)
  }
    , gP = function(Z, N) {
    if (Z.storage)
      try {
        Z.storage.set("module-enabled", N)
      } catch (r) {}
  }
    , n6 = function(Z, N) {
    Z.U.K("html5_modify_caption_vss_logging") && (Z.videoData.EH = N)
  }
    , LR$ = function(Z, N) {
    var r = Z.LN[N.id];
    r && r.W !== N && (r.dispose(),
    delete Z.LN[N.id],
    r = null);
    r || (r = nya(Z, N)) && (Z.LN[N.id] = r)
  }
    , Ey$ = function(Z, N) {
    var r = N.windowId;
    Z.tE[r] || (Z.tE[r] = []);
    Z.tE[r].push(N)
  }
    , nya = function(Z, N) {
    var r = oyQ(Z);
    if (!r)
      return null;
    var X = Z.W ? g.hr(Z.W) : null;
    X && g.yE$.test(X) && (N.params.P9 = 1);
    var z = Z.wz.getPlayerSize();
    X = z.height * Z.X.height;
    z = z.width * Z.X.width;
    Z.U.playerStyle !== "google-live" || Z.N.isDefault || Object.assign(N.params, Z.N);
    switch (N.params.xi != null ? N.params.xi : N.G.length > 1 ? 1 : 0) {
    case 1:
      return new m1Q(N,Z.N,Z.Y,r.width,r.height,z,X,Z.U.experiments,Z.It.bind(Z),Z.WG);
    case 2:
      return new Pe3(N,Z.N,Z.Y,r.width,r.height,z,X,Z.U.experiments,Z.It.bind(Z),Z.WG);
    default:
      return new Eb(N,Z.N,Z.Y,r.width,r.height,z,X,Z.U.experiments,Z.It.bind(Z),Z.WG)
    }
  }
    , oyQ = function(Z) {
    var N = Z.wz.getVideoContentRect(!0).height
      , r = Z.wz.getVideoContentRect(!0).width;
    if (!N || !r)
      return null;
    N *= Z.X.height;
    r *= Z.X.width;
    return {
      width: r,
      height: N
    }
  }
    , Sn7 = function(Z, N) {
    Z.player.FG(N);
    for (let r of N)
      g.aU(Z.KN, r);
    Vl(Z.AE)
  }
    , iq3 = function(Z, N) {
    if (!Z.G)
      return {};
    if (N) {
      g.hc(N) || Z.t5(N.vss_id, "m");
      if (Z.B && Z.L !== "HLS" || !g.bT(N))
        return;
      if (g.hc(N)) {
        L6(Z, null, !0);
        return
      }
      let X;
      var r = Z.G.G.G(!0);
      for (let z = 0; z < r.length; z++) {
        let Q = r[z];
        Q.languageCode !== N.languageCode || X && (Q.languageName !== N.languageName || (Q.captionId || "") !== (N.captionId || "") || g.RX(Q) !== N.displayName) || (X = N.translationLanguage ? Qi$(Q, N.translationLanguage) : Q)
      }
      Z.AX(N.position);
      !X || X === Z.W && Z.loaded || (N = g.jl(),
      r = g.hr(X),
      N.length && r === N[N.length - 1] || (N.push(r),
      g.Cj("yt-player-caption-language-preferences", N)),
      Bs3(Z.U) && !Z.WG.isInline() && g.Cj("yt-player-caption-sticky-language", r, 2592E3),
      L6(Z, X, !0))
    } else
      return Z.loaded && Z.W && !DY(Z) ? A0(Z.W) : {};
    return ""
  };
  g.O6.prototype.T9 = g.zT(82, function(Z, N, r) {
    this.W.set(Z, {
      zy: N,
      e5: r
    })
  });
  g.Rk.prototype.T9 = g.zT(81, function(Z, N, r) {
    this.J.T9(Z, N, r)
  });
  g.uV.prototype.D = g.zT(80, function() {
    this.mediaElement.D()
  });
  g.UH.prototype.D = g.zT(79, function() {
    var Z = g.pZ(document, "track", void 0, this.G);
    for (let N = 0; N < Z.length; N++)
      g.c_(Z[N])
  });
  g.uV.prototype.cG = g.zT(78, function() {
    return this.mediaElement.cG()
  });
  g.UH.prototype.cG = g.zT(77, function() {
    return !(!this.G.textTracks || !this.G.textTracks.addEventListener)
  });
  g.uV.prototype.AE = g.zT(76, function() {
    return this.mediaElement.AE()
  });
  g.UH.prototype.AE = g.zT(75, function() {
    return !!this.G.textTracks
  });
  g.uV.prototype.LN = g.zT(74, function(Z) {
    this.mediaElement.LN(Z)
  });
  g.UH.prototype.LN = g.zT(73, function(Z) {
    for (let N = 0; N < Z.length; N++)
      this.G.appendChild(Z[N])
  });
  g.r2.prototype.t5 = g.zT(31, function(Z, N) {
    this.app.QU().t5(Z, N)
  });
  g.jy.prototype.t5 = g.zT(30, function(Z, N) {
    this.A.t5(Z, N)
  });
  g.s6.prototype.t5 = g.zT(29, function(Z, N) {
    Z = [Z, N];
    g.iP(this, g.qA(this.provider), "cfi", Z)
  });
  g.k6.prototype.t5 = g.zT(28, function(Z, N) {
    this.qoe && this.qoe.t5(Z, N)
  });
  g.Jd.prototype.t5 = g.zT(27, function(Z, N) {
    this.Uo.t5(Z, N)
  });
  g.uW.prototype.t5 = g.zT(26, function() {});
  g.r2.prototype.UB = g.zT(25, function(Z, N, r) {
    this.app.QU().UB(Z, N, r)
  });
  g.jy.prototype.UB = g.zT(24, function(Z, N, r) {
    this.A.UB(Z, N, r)
  });
  g.s6.prototype.UB = g.zT(23, function(Z, N, r) {
    if (this.D$ !== Z || this.Dg !== N)
      N = N === "rawcc" ? "" : N,
      r = [Z, N, this.D$, r],
      g.iP(this, g.qA(this.provider), "cfs", r),
      this.D$ = Z,
      this.Dg = N
  });
  g.k6.prototype.UB = g.zT(22, function(Z, N, r) {
    this.qoe && this.qoe.UB(Z, N, r)
  });
  g.Jd.prototype.UB = g.zT(21, function(Z, N, r) {
    this.Uo.UB(Z, N, r)
  });
  g.uW.prototype.UB = g.zT(20, function() {});
  g.Vk.prototype.J$ = g.zT(8, function() {
    return this.pO
  });
  g.nM.prototype.J$ = g.zT(7, function() {
    return this.QU().a7()
  });
  g.r2.prototype.a7 = g.zT(6, function() {
    return this.app.J$()
  });
  g.jy.prototype.a7 = g.zT(5, function() {
    return this.A.a7()
  });
  g.Jd.prototype.a7 = g.zT(4, function() {
    return this.loader?.J$() || null
  });
  g.uW.prototype.a7 = g.zT(3, function() {
    return null
  });
  g.pp.prototype.Li = g.zT(2, function(Z) {
    return (Z = this.L(Z)) ? Z.G : 0
  });
  g.e$.prototype.Li = g.zT(1, function() {
    return 0
  });
  g.Ea(co, g.D);
  g.u = co.prototype;
  g.u.start = function() {
    this.stop();
    this.B = !1;
    var Z = jiQ(this)
      , N = WtR(this);
    Z && !N && this.W.mozRequestAnimationFrame ? (this.G = g.ht(this.W, "MozBeforePaint", this.L),
    this.W.mozRequestAnimationFrame(null),
    this.B = !0) : this.G = Z && N ? Z.call(this.W, this.L) : this.W.setTimeout(J2a(this.L), 20)
  }
  ;
  g.u.stop = function() {
    if (this.isActive()) {
      let Z = jiQ(this)
        , N = WtR(this);
      Z && !N && this.W.mozRequestAnimationFrame ? g.zQ(this.G) : Z && N ? N.call(this.W, this.G) : this.W.clearTimeout(this.G)
    }
    this.G = null
  }
  ;
  g.u.isActive = function() {
    return this.G != null
  }
  ;
  g.u.SP = function() {
    this.B && this.G && g.zQ(this.G);
    this.G = null;
    this.Y.call(this.N, g.hy())
  }
  ;
  g.u.PG = function() {
    this.stop();
    co.rJ.PG.call(this)
  }
  ;
  var vga = /#(.)(.)(.)/
    , HLa = /^#(?:[0-9a-f]{3}){1,2}$/i
    , bLu = {
    aa: "Afar",
    ab: "Abkhazian",
    ace: "Acehnese",
    ach: "Acoli",
    ada: "Adangme",
    ady: "Adyghe",
    ae: "Avestan",
    aeb: "Tunisian Arabic",
    af: "Afrikaans",
    afh: "Afrihili",
    agq: "Aghem",
    ain: "Ainu",
    ak: "Akan",
    akk: "Akkadian",
    akz: "Alabama",
    ale: "Aleut",
    aln: "Gheg Albanian",
    alt: "Southern Altai",
    am: "Amharic",
    an: "Aragonese",
    ang: "Old English",
    anp: "Angika",
    ar: "Arabic",
    ar_001: "Arabic (world)",
    arc: "Aramaic",
    arn: "Mapuche",
    aro: "Araona",
    arp: "Arapaho",
    arq: "Algerian Arabic",
    ars: "Najdi Arabic",
    arw: "Arawak",
    ary: "Moroccan Arabic",
    arz: "Egyptian Arabic",
    as: "Assamese",
    asa: "Asu",
    ase: "American Sign Language",
    ast: "Asturian",
    av: "Avaric",
    avk: "Kotava",
    awa: "Awadhi",
    ay: "Aymara",
    az: "Azerbaijani",
    az_Cyrl: "Azerbaijani (Cyrillic)",
    az_Latn: "Azerbaijani (Latin)",
    ba: "Bashkir",
    bal: "Baluchi",
    ban: "Balinese",
    bar: "Bavarian",
    bas: "Basaa",
    bax: "Bamun",
    bbc: "Batak Toba",
    bbj: "Ghomala",
    be: "Belarusian",
    bej: "Beja",
    bem: "Bemba",
    bew: "Betawi",
    bez: "Bena",
    bfd: "Bafut",
    bfq: "Badaga",
    bg: "Bulgarian",
    bgc: "Haryanvi",
    bgn: "Western Balochi",
    bho: "Bhojpuri",
    bi: "Bislama",
    bik: "Bikol",
    bin: "Bini",
    bjn: "Banjar",
    bkm: "Kom",
    bla: "Siksik\u00e1",
    blo: "Anii",
    bm: "Bambara",
    bn: "Bangla",
    bo: "Tibetan",
    bpy: "Bishnupriya",
    bqi: "Bakhtiari",
    br: "Breton",
    bra: "Braj",
    brh: "Brahui",
    brx: "Bodo",
    bs: "Bosnian",
    bs_Cyrl: "Bosnian (Cyrillic)",
    bs_Latn: "Bosnian (Latin)",
    bss: "Akoose",
    bua: "Buriat",
    bug: "Buginese",
    bum: "Bulu",
    byn: "Blin",
    byv: "Medumba",
    ca: "Catalan",
    cad: "Caddo",
    car: "Carib",
    cay: "Cayuga",
    cch: "Atsam",
    ccp: "Chakma",
    ce: "Chechen",
    ceb: "Cebuano",
    cgg: "Chiga",
    ch: "Chamorro",
    chb: "Chibcha",
    chg: "Chagatai",
    chk: "Chuukese",
    chm: "Mari",
    chn: "Chinook Jargon",
    cho: "Choctaw",
    chp: "Chipewyan",
    chr: "Cherokee",
    chy: "Cheyenne",
    ckb: "Central Kurdish",
    co: "Corsican",
    cop: "Coptic",
    cps: "Capiznon",
    cr: "Cree",
    crh: "Crimean Tatar",
    cs: "Czech",
    csb: "Kashubian",
    csw: "Swampy Cree",
    cu: "Church Slavic",
    cv: "Chuvash",
    cy: "Welsh",
    da: "Danish",
    dak: "Dakota",
    dar: "Dargwa",
    dav: "Taita",
    de: "German",
    de_AT: "German (Austria)",
    de_CH: "German (Switzerland)",
    del: "Delaware",
    den: "Slave",
    dgr: "Dogrib",
    din: "Dinka",
    dje: "Zarma",
    doi: "Dogri",
    dsb: "Lower Sorbian",
    dua: "Duala",
    dum: "Middle Dutch",
    dv: "Divehi",
    dyo: "Jola-Fonyi",
    dyu: "Dyula",
    dz: "Dzongkha",
    dzg: "Dazaga",
    ebu: "Embu",
    ee: "Ewe",
    efi: "Efik",
    egy: "Ancient Egyptian",
    eka: "Ekajuk",
    el: "Greek",
    elx: "Elamite",
    en: "English",
    en_AU: "English (Australia)",
    en_CA: "English (Canada)",
    en_GB: "English (United Kingdom)",
    en_US: "English (United States)",
    enm: "Middle English",
    eo: "Esperanto",
    es: "Spanish",
    es_419: "Spanish (Latin America)",
    es_ES: "Spanish (Spain)",
    es_MX: "Spanish (Mexico)",
    et: "Estonian",
    eu: "Basque",
    ewo: "Ewondo",
    fa: "Persian",
    fa_AF: "Persian (Afghanistan)",
    fan: "Fang",
    fat: "Fanti",
    ff: "Fula",
    ff_Adlm: "Fula (Adlam)",
    ff_Latn: "Fula (Latin)",
    fi: "Finnish",
    fil: "Filipino",
    fj: "Fijian",
    fo: "Faroese",
    fon: "Fon",
    fr: "French",
    fr_CA: "French (Canada)",
    fr_CH: "French (Switzerland)",
    frm: "Middle French",
    fro: "Old French",
    frr: "Northern Frisian",
    frs: "Eastern Frisian",
    fur: "Friulian",
    fy: "Western Frisian",
    ga: "Irish",
    gaa: "Ga",
    gay: "Gayo",
    gba: "Gbaya",
    gd: "Scottish Gaelic",
    gez: "Geez",
    gil: "Gilbertese",
    gl: "Galician",
    gmh: "Middle High German",
    gn: "Guarani",
    goh: "Old High German",
    gon: "Gondi",
    gor: "Gorontalo",
    got: "Gothic",
    grb: "Grebo",
    grc: "Ancient Greek",
    gsw: "Swiss German",
    gu: "Gujarati",
    guz: "Gusii",
    gv: "Manx",
    gwi: "Gwich\u02bcin",
    ha: "Hausa",
    hai: "Haida",
    haw: "Hawaiian",
    he: "Hebrew",
    hi: "Hindi",
    hi_Latn: "Hindi (Latin)",
    hil: "Hiligaynon",
    hit: "Hittite",
    hmn: "Hmong",
    ho: "Hiri Motu",
    hr: "Croatian",
    hsb: "Upper Sorbian",
    ht: "Haitian Creole",
    hu: "Hungarian",
    hup: "Hupa",
    hy: "Armenian",
    hz: "Herero",
    ia: "Interlingua",
    iba: "Iban",
    ibb: "Ibibio",
    id: "Indonesian",
    ie: "Interlingue",
    ig: "Igbo",
    ii: "Sichuan Yi",
    ik: "Inupiaq",
    ilo: "Iloko",
    "in": "Indonesian",
    inh: "Ingush",
    io: "Ido",
    is: "Icelandic",
    it: "Italian",
    iu: "Inuktitut",
    iw: "Hebrew",
    ja: "Japanese",
    jbo: "Lojban",
    jgo: "Ngomba",
    jmc: "Machame",
    jpr: "Judeo-Persian",
    jrb: "Judeo-Arabic",
    jv: "Javanese",
    ka: "Georgian",
    kaa: "Kara-Kalpak",
    kab: "Kabyle",
    kac: "Kachin",
    kaj: "Jju",
    kam: "Kamba",
    kaw: "Kawi",
    kbd: "Kabardian",
    kbl: "Kanembu",
    kcg: "Tyap",
    kde: "Makonde",
    kea: "Kabuverdianu",
    kfo: "Koro",
    kg: "Kongo",
    kgp: "Kaingang",
    kha: "Khasi",
    kho: "Khotanese",
    khq: "Koyra Chiini",
    ki: "Kikuyu",
    kj: "Kuanyama",
    kk: "Kazakh",
    kk_Arab: "Kazakh (Arabic)",
    kk_Cyrl: "Kazakh (Cyrillic)",
    kkj: "Kako",
    kl: "Kalaallisut",
    kln: "Kalenjin",
    km: "Khmer",
    kmb: "Kimbundu",
    kn: "Kannada",
    ko: "Korean",
    kok: "Konkani",
    kok_Deva: "Konkani (Devanagari)",
    kok_Latn: "Konkani (Latin)",
    kos: "Kosraean",
    kpe: "Kpelle",
    kr: "Kanuri",
    krc: "Karachay-Balkar",
    krl: "Karelian",
    kru: "Kurukh",
    ks: "Kashmiri",
    ks_Arab: "Kashmiri (Arabic)",
    ks_Deva: "Kashmiri (Devanagari)",
    ksb: "Shambala",
    ksf: "Bafia",
    ksh: "Colognian",
    ku: "Kurdish",
    ku_Latn: "Kurdish (Latin)",
    kum: "Kumyk",
    kut: "Kutenai",
    kv: "Komi",
    kw: "Cornish",
    kxv: "Kuvi",
    kxv_Deva: "Kuvi (Devanagari)",
    kxv_Latn: "Kuvi (Latin)",
    kxv_Orya: "Kuvi (Odia)",
    kxv_Telu: "Kuvi (Telugu)",
    ky: "Kyrgyz",
    la: "Latin",
    lad: "Ladino",
    lag: "Langi",
    lah: "Western Panjabi",
    lam: "Lamba",
    lb: "Luxembourgish",
    lez: "Lezghian",
    lg: "Ganda",
    li: "Limburgish",
    lij: "Ligurian",
    lkt: "Lakota",
    lmo: "Lombard",
    ln: "Lingala",
    lo: "Lao",
    lol: "Mongo",
    loz: "Lozi",
    lrc: "Northern Luri",
    lt: "Lithuanian",
    lu: "Luba-Katanga",
    lua: "Luba-Lulua",
    lui: "Luiseno",
    lun: "Lunda",
    luo: "Luo",
    lus: "Mizo",
    luy: "Luyia",
    lv: "Latvian",
    mad: "Madurese",
    maf: "Mafa",
    mag: "Magahi",
    mai: "Maithili",
    mak: "Makasar",
    man: "Mandingo",
    mas: "Masai",
    mde: "Maba",
    mdf: "Moksha",
    mdr: "Mandar",
    men: "Mende",
    mer: "Meru",
    mfe: "Morisyen",
    mg: "Malagasy",
    mga: "Middle Irish",
    mgh: "Makhuwa-Meetto",
    mgo: "Meta\u02bc",
    mh: "Marshallese",
    mi: "M\u0101ori",
    mic: "Mi'kmaw",
    min: "Minangkabau",
    mk: "Macedonian",
    ml: "Malayalam",
    mn: "Mongolian",
    mnc: "Manchu",
    mni: "Manipuri",
    mni_Beng: "Manipuri (Bangla)",
    mo: "Romanian",
    moh: "Mohawk",
    mos: "Mossi",
    mr: "Marathi",
    ms: "Malay",
    mt: "Maltese",
    mua: "Mundang",
    mul: "Multiple languages",
    mus: "Muscogee",
    mwl: "Mirandese",
    mwr: "Marwari",
    my: "Burmese",
    mye: "Myene",
    myv: "Erzya",
    mzn: "Mazanderani",
    na: "Nauru",
    nap: "Neapolitan",
    naq: "Nama",
    nb: "Norwegian Bokm\u00e5l",
    nd: "North Ndebele",
    nds: "Low German",
    nds_NL: "Low German (Netherlands)",
    ne: "Nepali",
    "new": "Newari",
    ng: "Ndonga",
    nia: "Nias",
    niu: "Niuean",
    nl: "Dutch",
    nl_BE: "Dutch (Belgium)",
    nmg: "Kwasio",
    nn: "Norwegian Nynorsk",
    nnh: "Ngiemboon",
    no: "Norwegian",
    nog: "Nogai",
    non: "Old Norse",
    nqo: "N\u2019Ko",
    nr: "South Ndebele",
    nso: "Northern Sotho",
    nus: "Nuer",
    nv: "Navajo",
    nwc: "Classical Newari",
    ny: "Nyanja",
    nym: "Nyamwezi",
    nyn: "Nyankole",
    nyo: "Nyoro",
    nzi: "Nzima",
    oc: "Occitan",
    oj: "Ojibwa",
    om: "Oromo",
    or: "Odia",
    os: "Ossetic",
    osa: "Osage",
    ota: "Ottoman Turkish",
    pa: "Punjabi",
    pa_Arab: "Punjabi (Arabic)",
    pa_Guru: "Punjabi (Gurmukhi)",
    pag: "Pangasinan",
    pal: "Pahlavi",
    pam: "Pampanga",
    pap: "Papiamento",
    pau: "Palauan",
    pcm: "Nigerian Pidgin",
    peo: "Old Persian",
    phn: "Phoenician",
    pi: "Pali",
    pl: "Polish",
    pms: "Piedmontese",
    pon: "Pohnpeian",
    prg: "Prussian",
    pro: "Old Proven\u00e7al",
    ps: "Pashto",
    pt: "Portuguese",
    pt_BR: "Portuguese (Brazil)",
    pt_PT: "Portuguese (Portugal)",
    qu: "Quechua",
    raj: "Rajasthani",
    rap: "Rapanui",
    rar: "Rarotongan",
    rm: "Romansh",
    rn: "Rundi",
    ro: "Romanian",
    ro_MD: "Romanian (Moldova)",
    rof: "Rombo",
    rom: "Romany",
    ru: "Russian",
    rup: "Aromanian",
    rw: "Kinyarwanda",
    rwk: "Rwa",
    sa: "Sanskrit",
    sad: "Sandawe",
    sah: "Yakut",
    sam: "Samaritan Aramaic",
    saq: "Samburu",
    sas: "Sasak",
    sat: "Santali",
    sat_Olck: "Santali (Ol Chiki)",
    sba: "Ngambay",
    sbp: "Sangu",
    sc: "Sardinian",
    scn: "Sicilian",
    sco: "Scots",
    sd: "Sindhi",
    sd_Arab: "Sindhi (Arabic)",
    sd_Deva: "Sindhi (Devanagari)",
    se: "Northern Sami",
    see: "Seneca",
    seh: "Sena",
    sel: "Selkup",
    ses: "Koyraboro Senni",
    sg: "Sango",
    sga: "Old Irish",
    sh: "Serbo-Croatian",
    shi: "Tachelhit",
    shi_Latn: "Tachelhit (Latin)",
    shi_Tfng: "Tachelhit (Tifinagh)",
    shn: "Shan",
    shu: "Chadian Arabic",
    si: "Sinhala",
    sid: "Sidamo",
    sk: "Slovak",
    sl: "Slovenian",
    sm: "Samoan",
    sma: "Southern Sami",
    smj: "Lule Sami",
    smn: "Inari Sami",
    sms: "Skolt Sami",
    sn: "Shona",
    snk: "Soninke",
    so: "Somali",
    sog: "Sogdien",
    sq: "Albanian",
    sr: "Serbian",
    sr_Cyrl: "Serbian (Cyrillic)",
    sr_Latn: "Serbian (Latin)",
    srn: "Sranan Tongo",
    srr: "Serer",
    ss: "Swati",
    ssy: "Saho",
    st: "Southern Sotho",
    su: "Sundanese",
    su_Latn: "Sundanese (Latin)",
    suk: "Sukuma",
    sus: "Susu",
    sux: "Sumerian",
    sv: "Swedish",
    sw: "Swahili",
    sw_CD: "Swahili (Congo - Kinshasa)",
    swb: "Comorian",
    syc: "Classical Syriac",
    syr: "Syriac",
    szl: "Silesian",
    ta: "Tamil",
    te: "Telugu",
    tem: "Timne",
    teo: "Teso",
    ter: "Tereno",
    tet: "Tetum",
    tg: "Tajik",
    th: "Thai",
    ti: "Tigrinya",
    tig: "Tigre",
    tiv: "Tiv",
    tk: "Turkmen",
    tkl: "Tokelauan",
    tl: "Tagalog",
    tlh: "Klingon",
    tli: "Tlingit",
    tmh: "Tamashek",
    tn: "Tswana",
    to: "Tongan",
    tog: "Nyasa Tonga",
    tok: "Toki Pona",
    tpi: "Tok Pisin",
    tr: "Turkish",
    trv: "Taroko",
    ts: "Tsonga",
    tsi: "Tsimshian",
    tt: "Tatar",
    tum: "Tumbuka",
    tvl: "Tuvalu",
    tw: "Twi",
    twq: "Tasawaq",
    ty: "Tahitian",
    tyv: "Tuvinian",
    tzm: "Central Atlas Tamazight",
    udm: "Udmurt",
    ug: "Uyghur",
    uga: "Ugaritic",
    uk: "Ukrainian",
    umb: "Umbundu",
    ur: "Urdu",
    uz: "Uzbek",
    uz_Arab: "Uzbek (Arabic)",
    uz_Cyrl: "Uzbek (Cyrillic)",
    uz_Latn: "Uzbek (Latin)",
    vai: "Vai",
    vai_Latn: "Vai (Latin)",
    vai_Vaii: "Vai (Vai)",
    ve: "Venda",
    vec: "Venetian",
    vi: "Vietnamese",
    vmw: "Makhuwa",
    vo: "Volap\u00fck",
    vot: "Votic",
    vun: "Vunjo",
    wa: "Walloon",
    wae: "Walser",
    wal: "Wolaytta",
    war: "Waray",
    was: "Washo",
    wo: "Wolof",
    xal: "Kalmyk",
    xh: "Xhosa",
    xnr: "Kangri",
    xog: "Soga",
    yao: "Yao",
    yap: "Yapese",
    yav: "Yangben",
    ybb: "Yemba",
    yi: "Yiddish",
    yo: "Yoruba",
    yrl: "Nheengatu",
    yue: "Cantonese",
    yue_Hans: "Cantonese (Simplified)",
    yue_Hant: "Cantonese (Traditional)",
    za: "Zhuang",
    zap: "Zapotec",
    zbl: "Blissymbols",
    zen: "Zenaga",
    zgh: "Standard Moroccan Tamazight",
    zh: "Chinese",
    zh_Hans: "Chinese (Simplified)",
    zh_Hant: "Chinese (Traditional)",
    zh_TW: "Chinese (Taiwan)",
    zu: "Zulu",
    zun: "Zuni",
    zxx: "No linguistic content",
    zza: "Zaza"
  }
    , Yn3 = class {
    constructor() {
      this.L = [];
      this.W = []
    }
    G(Z) {
      return Z ? this.W.concat(this.L) : this.W
    }
  }
    , oc = class extends g.D {
    constructor(Z) {
      super();
      this.jM = Z;
      this.G = new Yn3;
      this.BG = new Yn3;
      this.N = null;
      this.D = [];
      this.LN = []
    }
    Z() {}
    B() {}
    L() {}
    Y() {
      return ""
    }
    zv() {
      return !1
    }
    xN(Z, N) {
      if (this.jM.V().K("html5_dispatch_tracklist_loaded_event")) {
        this.N && (this.N.reject(),
        this.N = null);
        var r = [];
        this.jM.Tv("trackListLoaded", this.G, r, N);
        this.jM.V().K("enable_po_decoration_of_forced_tracks") && this.jM.Tv("trackListLoaded", this.BG, r, N);
        r.length ? (N = new g.n7,
        N.promise.then(Z.xN, () => {}
        ),
        this.N = N,
        Promise.all(r).then(N.resolve, N.reject).finally( () => {
          this.N = null
        }
        )) : Z.xN()
      } else
        Z.xN()
    }
    PG() {
      this.N && (this.N.reject(),
      this.N = null);
      this.L();
      super.PG()
    }
  }
    , qny = {
    en: "English"
  }
    , pI$ = class extends oc {
    constructor(Z) {
      super(Z);
      this.W = new Set
    }
    B(Z) {
      var N = this.jM.vD();
      if (N && N.A8()) {
        N = N.A8().textTracks;
        for (let r of N)
          r.kind === "subtitles" && !this.W.has(r.language) && r.language && (NI(this.G, new g.io({
            languageCode: r.language,
            languageName: r.language,
            kind: r.kind,
            id: r.id,
            displayName: qny[r.label] || r.label,
            vss_id: `.${r.language}`
          })),
          this.W.add(r.language))
      }
      this.G.G().length > 0 && Z.xN()
    }
  }
    , KRO = class extends oc {
    constructor(Z, N, r) {
      super(Z);
      this.videoData = N;
      this.audioTrack = r;
      this.W = null;
      this.j = !1;
      this.D = N.WS;
      this.LN = N.aI;
      this.j = g.sR(N)
    }
    Z(Z, N, r) {
      this.xR();
      N = this.Y(Z, N);
      var X = this.jM.V().K("html5_report_captions_ctmp_qoe")
        , z = (0,
      g.f)();
      this.L();
      siR(this, N, {
        format: "RAW",
        onSuccess: Q => {
          this.W = null;
          if (X) {
            var B = (Q.responseText.length / 1024).toFixed();
            let x = (0,
            g.f)();
            this.videoData.C("capresp", {
              ms: x - z,
              kb: B
            })
          }
          B = Q.getResponseHeader && Q.getResponseHeader("Content-Length") ? Number(Q.getResponseHeader("Content-Length")) : 0;
          r.nx(Q.responseText, Z, void 0, void 0, B)
        }
        ,
        onError: X ? Q => {
          this.videoData.C("capfail", {
            status: Q?.status ?? 0
          })
        }
        : void 0,
        withCredentials: !0
      })
    }
    B(Z) {
      if (this.audioTrack) {
        for (let N of this.audioTrack.captionTracks)
          NI(this.G, N);
        this.audioTrack.G && NI(this.BG, this.audioTrack.G)
      }
      this.xN(Z, this.videoData.videoId)
    }
    Y(Z, N) {
      var r = Z.Nf()
        , X = {
        fmt: N
      };
      if (N === "srv3" || N === "3" || N === "json3")
        g.u8() ? Object.assign(X, {
          xorb: 2,
          xobt: 1,
          xovt: 1
        }) : Object.assign(X, {
          xorb: 2,
          xobt: 3,
          xovt: 3
        });
      Z.translationLanguage && (X.tlang = g.hr(Z));
      this.j && (X.xosf = "1");
      Object.assign(X, this.jM.V().G);
      return g.nt(r, X)
    }
    L() {
      this.W && this.W.abort()
    }
  }
    , eK3 = class {
    constructor() {
      this.segments = []
    }
    contains(Z) {
      Z = g.ZC(this.segments, Z);
      return Z >= 0 || Z < 0 && (-Z - 1) % 2 === 1
    }
    length() {
      return this.segments.length / 2
    }
  }
    , af3 = class extends g.D {
    constructor(Z, N, r, X, z, Q) {
      super();
      this.policy = Z;
      this.player = N;
      this.S = r;
      this.j = X;
      this.N = z;
      this.X = Q;
      this.B = new eK3;
      this.Y = -1;
      this.W = this.L = this.G = null;
      this.LN = 0;
      this.Z = new g.OB(this.D,1E3,this);
      this.events = new g.ae(this);
      g.R(this, this.Z);
      g.R(this, this.events);
      this.events.kR(N, "SEEK_COMPLETE", this.J);
      this.J();
      this.D()
    }
    PG() {
      super.PG();
      this.W && this.W.cancel()
    }
    J() {
      this.seekTo(this.player.getCurrentTime())
    }
    seekTo(Z) {
      Z -= this.player.gW();
      var N = this.G;
      this.G = g.gH(this.S.Y(Z).fN);
      N !== this.G && this.X && this.X()
    }
    reset() {
      this.B = new eK3;
      this.Y = -1;
      this.W && (this.W.cancel(),
      this.W = null)
    }
    D() {
      this.xR();
      var Z;
      if (Z = this.G != null)
        Z = this.G,
        Z = Z.S.B(Z);
      if (Z && !this.W && !(this.G && this.G.startTime - this.player.getCurrentTime() > 30)) {
        Z = this.G;
        Z = Z.S.KN(Z);
        let z = Z.fN[0];
        if (this.player.getVideoData()?.enableServerStitchedDai) {
          var N = this.player.a7();
          if (N) {
            var r = z.S.info.id;
            let Q = z.NA;
            var X = Z.fN[0].L;
            if (this.policy.KN) {
              if (N = g.cr(N, X, Q, r, 3))
                Z.B = N
            } else if (r = N.fZ(X, Q, r, 3))
              if (X = 2,
              N.cV.has(Q) ? X = 0 : g.Bj(N, Q) && (X = 1),
              N = X,
              N === 0)
                r && (Z.G = new g.bh(r));
              else if (N === 2) {
                this.Z.start();
                FtQ(this) && this.seekTo(this.player.getCurrentTime());
                return
              }
          }
        }
        z.S.index.FA(z.NA) ? (this.B.contains(Z.fN[0].NA) || Cua(this, Z),
        this.G = g.gH(Z.fN)) : FtQ(this) && this.seekTo(this.player.getCurrentTime())
      }
      this.Z.start()
    }
  }
    , ffQ = class extends oc {
    constructor(Z, N) {
      super(N);
      this.W = Z;
      this.WG = N;
      this.j = null;
      this.J = !1;
      this.logger = new g.AD("caps");
      this.X = g.hl(this.WG, this.W)
    }
    Z(Z, N, r) {
      this.L();
      N = kru(this, Z.getId());
      N || (N = Z.languageCode,
      N = this.W.isManifestless ? UH3(this, N, "386") : UH3(this, N));
      if (N) {
        var X = (N.index.Li(N.index.Cs()) - N.index.getStartTime(N.index.Cs())) * 1E3
          , z = new g.c4(this.WG.V());
        this.j = new af3(z,this.WG,N, (Q, B) => {
          r.nx(Q, Z, B, X)
        }
        ,this.X || g.dF(N.info), () => {
          this.j && this.j.reset();
          this.J = !0
        }
        )
      }
    }
    zv() {
      var Z = this.J;
      this.J = !1;
      return Z
    }
    B(Z) {
      var N = this.WG.V().K("html5_fallback_if_rawcc_missing");
      var r = this.W.G.rawcc != null;
      if (!this.X || !r && N)
        N = this.W.isManifestless ? y2T(this, "386") : y2T(this);
      else {
        if (!r) {
          g.IT(this.logger, 386248249, "rawcc used but unavailable");
          return
        }
        N = [new g.io({
          id: "rawcc",
          languageCode: "rawcc",
          languageName: "CC1",
          is_servable: !0,
          is_default: !0,
          is_translateable: !1,
          vss_id: ".en"
        }), new g.io({
          id: "rawcc",
          languageCode: "rawcc",
          languageName: "CC3",
          is_servable: !0,
          is_default: !0,
          is_translateable: !1,
          vss_id: ".en"
        })]
      }
      for (let X of N)
        NI(this.G, X);
      Z.xN()
    }
    L() {
      this.j && (this.j.dispose(),
      this.j = null)
    }
    Y() {
      return ""
    }
  }
    , lf$ = class extends oc {
    constructor(Z, N, r, X, z, Q) {
      super(Z);
      this.videoId = r;
      this.J = z;
      this.eventId = Q;
      this.X = {};
      this.W = null;
      Z = X || g.hq(N).hl || "";
      Z = Z.split("_").join("-");
      this.j = g.nt(N, {
        hl: Z
      })
    }
    Z(Z, N, r) {
      this.xR();
      N = this.Y(Z, N);
      this.L();
      this.W = g.rz(N, {
        format: "RAW",
        onSuccess: X => {
          this.W = null;
          var z = X.getResponseHeader && X.getResponseHeader("Content-Length") ? Number(X.getResponseHeader("Content-Length")) : 0;
          r.nx(X.responseText, Z, void 0, void 0, z)
        }
        ,
        withCredentials: !0
      })
    }
    B(Z) {
      var N = this.j
        , r = {
        type: "list",
        tlangs: 1,
        v: this.videoId,
        vssids: 1
      };
      this.J && (r.asrs = 1);
      N = g.nt(N, r);
      this.L();
      this.W = g.rz(N, {
        format: "RAW",
        onSuccess: X => {
          this.W = null;
          if ((X = X.responseXML) && X.firstChild) {
            var z = X.getElementsByTagName("track");
            for (var Q = 0; Q < z.length; Q++) {
              var B = z[Q]
                , x = B.getAttribute("lang_code");
              let t = B.getAttribute("lang_translated")
                , J = B.getAttribute("name")
                , W = B.getAttribute("kind")
                , H = B.getAttribute("id")
                , v = B.getAttribute("lang_default") === "true"
                , G = B.getAttribute("cantran") === "true";
              B = B.getAttribute("vss_id");
              NI(this.G, new g.io({
                languageCode: x,
                languageName: t,
                name: J,
                kind: W,
                id: H,
                is_servable: !0,
                is_translateable: G,
                vss_id: B,
                is_default: v
              }))
            }
            X = X.getElementsByTagName("target");
            z = X.length;
            for (Q = 0; Q < z; Q++)
              x = {
                languageCode: X[Q].getAttribute("lang_code"),
                languageName: X[Q].getAttribute("lang_translated"),
                languageOriginal: X[Q].getAttribute("lang_original"),
                id: X[Q].getAttribute("id"),
                isDefault: X[Q].getAttribute("lang_default") === "true"
              },
              this.X[x.languageCode] = x.languageName,
              this.D.push(x)
          }
          this.xN(Z, this.videoId)
        }
        ,
        withCredentials: !0
      })
    }
    Y(Z, N) {
      var r = this.j;
      N = {
        v: this.videoId,
        type: "track",
        lang: Z.languageCode,
        name: Z.getName(),
        kind: Z.kind,
        fmt: N
      };
      var X = this.jM.V();
      X.K("captions_url_add_ei") && (N.ei = this.eventId);
      Z.translationLanguage && (N.tlang = g.hr(Z));
      Object.assign(N, X.G);
      return r = g.nt(r, N)
    }
    L() {
      this.W && this.W.abort()
    }
  }
    , sb = /^#(?:[0-9a-f]{3}){1,2}$/i;
  var AWQ = ["left", "right", "center", "justify"];
  var jk = class extends g.bt {
    constructor(Z, N, r, X, z, Q=!1, B=null) {
      super(Z, Z + N, {
        priority: r,
        namespace: "captions"
      });
      this.windowId = X;
      this.text = z;
      this.append = Q;
      this.G = B
    }
    toString() {
      return super.toString()
    }
  }
  ;
  var Eb = class extends g.XU {
    constructor(Z, N, r, X, z, Q, B, x, t, J) {
      var W = J.isInline() && !0
        , H = {};
      Object.assign(H, N);
      Object.assign(H, Z.params);
      Object.assign(H, r);
      var v = {};
      Object.assign(v, N.fF);
      Z.params.fF && Object.assign(v, Z.params.fF);
      Object.assign(v, r.fF);
      W && (H.windowOpacity = .6,
      v.backgroundOpacity = 0);
      H.fF = v;
      var G = H.P9 === 1
        , U = [{
        O: "span",
        b3: "captions-text",
        hE: {
          style: "word-wrap: normal; display: block;"
        }
      }]
        , M = x.Oa("caption_edit_on_hover") && J.getVideoData().getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.openTranscriptCommand;
      M && U.unshift({
        O: "button",
        b3: "caption-edit",
        hE: {
          tabindex: "0",
          "aria-label": GrO()
        },
        HG: [{
          O: "svg",
          hE: {
            fill: "#e3e3e3",
            height: "100%",
            viewBox: "5 5 38 38",
            width: "100%"
          },
          HG: [{
            O: "path",
            hE: {
              d: "M9 39h2.2l24.25-24.25-1.1-1.1-1.1-1.1L9 36.8Zm-3 3v-6.4L35.4 6.2q.85-.85 2.12-.82 1.27.02 2.12.87L41.8 8.4q.85.85.85 2.1t-.85 2.1L12.4 42Zm33.5-31.55L37.45 8.4Zm-4.05 4.3-1.1-1.1-1.1-1.1 2.2 2.2Z"
            }
          }]
        }]
      });
      super({
        O: "div",
        b3: "caption-window",
        hE: {
          id: `caption-window-${Z.id}`,
          dir: G ? "rtl" : "ltr",
          tabindex: "0",
          lang: H.lang
        },
        HG: U
      });
      this.experiments = x;
      this.D = [];
      this.cG = !1;
      this.W = Z;
      this.pN = this.gz = null;
      this.bS = Q;
      this.RW = B;
      this.Y = null;
      this.maxWidth = Q * .96;
      this.maxHeight = B * .96;
      this.G = H;
      this.jJ = r;
      this.zv = N;
      this.B = this.FC("captions-text");
      Z = this.B.style;
      this.rz = x.Oa("enable_player_captions_new_style_defaults") && ("boxDecorationBreak"in Z || "WebkitBoxDecorationBreak"in Z);
      this.u3 = Ts3(X, z, Q, B);
      this.qd = t;
      M && (this.Z = this.FC("caption-edit"),
      this.kR(this.Z, "click", () => {
        this.qd()
      }
      ));
      this.type = 0;
      this.It = this.u3 * SwQ(v);
      this.qa = W;
      this.JE = x.Oa("enable_centered_caption_for_tvfilm_video") && J.getVideoData().isTvfilmVideo;
      this.X = J.V().VU().G.qA(g.yZQ);
      X = new g.bW(this.element,!0);
      g.R(this, X);
      X.subscribe("dragstart", this.C0, this);
      X.subscribe("dragmove", this.iS, this);
      X.subscribe("dragend", this.BU, this);
      this.Ap = this.Na = this.YQ = this.KO = 0;
      X = "";
      this.G.windowOpacity && (X = dM(this.G.windowColor),
      X = "rgba(" + X[0] + "," + X[1] + "," + X[2] + "," + this.G.windowOpacity + ")");
      z = {
        "background-color": X,
        display: this.G.isVisible === !1 ? "none" : "",
        "text-align": AWQ[this.G.textAlign]
      };
      this.rz && (z["border-radius"] = X ? `${this.It * .375}px` : "");
      (this.N = this.W.params.P9 === 2 || this.W.params.P9 === 3) && uO$(this, this.element);
      g.Hv(this.element, z);
      W && this.element.parentElement?.style.setProperty("--caption-window-color", X);
      switch (this.G.JW) {
      case 0:
      case 1:
      case 2:
        g.mr(this.element, "ytp-caption-window-top");
        break;
      case 6:
      case 7:
      case 8:
        g.mr(this.element, "ytp-caption-window-bottom")
      }
    }
    C0(Z, N) {
      this.Na = Z;
      this.Ap = N;
      var r = g.bF(this.element, this.element.parentElement);
      this.KO = Z - r.x;
      this.YQ = N - r.y
    }
    iS(Z, N) {
      if (Z !== this.Na || N !== this.Ap) {
        g.ot(this.element, "ytp-dragging") || g.mr(this.element, "ytp-dragging");
        var r = g.R6(this.element);
        Z = Z - this.KO - .02 * this.bS;
        var X = N - this.YQ - .02 * this.RW
          , z = (Z + r.width / 2) / this.maxWidth * 3;
        z = Math.floor(g.v_(z, 0, 2));
        var Q = (X + r.height / 2) / this.maxHeight * 3;
        Q = Math.floor(g.v_(Q, 0, 2));
        N = z + Q * 3;
        Z = (Z + z / 2 * r.width) / this.maxWidth;
        Z = g.v_(Z, 0, 1) * 100;
        r = (X + Q / 2 * r.height) / this.maxHeight;
        r = g.v_(r, 0, 1) * 100;
        this.W.params.JW = N;
        this.W.params.BV = r;
        this.W.params.bu = Z;
        this.W.params.isDefault = !1;
        this.G.JW = N;
        this.G.BV = r;
        this.G.bu = Z;
        this.G.isDefault = !1;
        this.zv.JW = N;
        this.zv.BV = r;
        this.zv.bu = Z;
        this.zv.isDefault = !1;
        this.Tz()
      }
    }
    BU() {
      g.iX(this.element, "ytp-dragging")
    }
    Tz() {
      this.J(this.D)
    }
    J(Z) {
      var N = this.qa ? 0 : Math.min(this.fO(), this.maxWidth)
        , r = this.Dg()
        , X = this.qa;
      if (X) {
        var z = getComputedStyle(this.B.parentNode);
        z = Xo(z.borderLeftWidth) + Xo(z.borderRightWidth) + Xo(z.paddingLeft) + Xo(z.paddingRight)
      } else
        z = 0;
      var Q = z;
      z = "";
      this.W.params.P9 === 3 && (z = "rotate(180deg)");
      var B = X ? `calc(96% - ${Q}px)` : "96%";
      g.Hv(this.element, {
        top: 0,
        left: 0,
        right: "",
        bottom: "",
        width: N ? `${N}px` : "",
        height: r ? `${r}px` : "",
        "max-width": B,
        "max-height": B,
        margin: "",
        transform: ""
      });
      this.l3(Z);
      z = {
        transform: z,
        top: "",
        left: "",
        width: N ? `${N}px` : "",
        height: r ? `${r}px` : "",
        "max-width": "",
        "max-height": ""
      };
      B = this.G.JW;
      var x = this.G.bu
        , t = this.G.BV;
      this.JE && B != null && (x = 50,
      B = Math.floor(B / 3) * 3 + 1);
      x = x * .96 + 2;
      switch (B) {
      case 0:
      case 3:
      case 6:
        (X = this.G.fF.fontSizeIncrement) && X > 0 && this.G.P9 !== 2 && this.G.P9 !== 3 && (x = Math.max(x / (1 + X * 2), 2));
        z.left = `${x}%`;
        break;
      case 1:
      case 4:
      case 7:
        z.left = `${x}%`;
        x = 0;
        this.X || (x = this.B.offsetWidth);
        N || x ? (N = N || x + 1,
        z.width = `${N}px`,
        z["margin-left"] = X ? `${N / -2 - Q / 2}px` : `${N / -2}px`) : (this.X && (z.width = "max-content"),
        z.transform += " translateX(-50%)");
        break;
      case 2:
      case 5:
      case 8:
        z.right = `${100 - x}%`
      }
      X = t * .96 + 2;
      switch (B) {
      case 0:
      case 1:
      case 2:
        z.top = `${X}%`;
        break;
      case 3:
      case 4:
      case 5:
        z.top = `${X}%`;
        X = 0;
        this.X || (X = this.element.clientHeight);
        (r = r || X) ? (z.height = `${r}px`,
        z["margin-top"] = `${r / -2}px`) : z.transform += " translateY(-50%)";
        break;
      case 6:
      case 7:
      case 8:
        z.bottom = `${100 - X}%`
      }
      g.Hv(this.element, z);
      this.Z && (this.X ? r = this.It : (Z = DH3(this, Z),
      r = this.JE ? Z > 0 ? this.B.offsetHeight / Z : 0 : this.B.offsetHeight / Z),
      this.Z.style.height = `${r}px`,
      this.Z.style.width = `${r}px`,
      this.element.style.paddingLeft = `${r + 5}px`,
      this.element.style.paddingRight = `${r + 5}px`,
      this.X || (Z = Number(this.element.style.marginLeft.replace("px", "")) - r - 5,
      r = Number(this.element.style.marginRight.replace("px", "")) - r - 5,
      this.element.style.marginLeft = `${Z}px`,
      this.element.style.marginRight = `${r}px`))
    }
    l3(Z) {
      if (this.type === 0 && this.W.params.WY !== void 0 && this.experiments.Oa("web_enable_popon_asr_captions")) {
        var N = Z
          , r = this.W.params.WY;
        if (N.length === 0 || r <= 0)
          Z = [];
        else {
          Z = [];
          for (let z = N.length - 1; z >= 0; z--) {
            var X = N[z];
            Z.unshift(X);
            let Q = DH3(this, Z);
            if (Q > r) {
              Z.shift();
              typeof X.text === "string" && (N = X.text.split("\n"),
              r = Q - r,
              N.length - r > 0 && (X = new jk(X.start,X.end - X.start,X.priority || 0,X.windowId,N.slice(r).join("\n"),X.append,X.G),
              Z.unshift(X)));
              break
            }
          }
        }
      }
      for (X = 0; X < Z.length && Z[X] === this.D[X]; X++)
        ;
      if (this.cG || this.D.length > X)
        X = 0,
        this.cG = !1,
        this.D = [],
        this.Y = this.pN = this.gz = null,
        g.Ac(this.B);
      for (; X < Z.length; X++)
        hLu(this, Z[X])
    }
    fO() {
      return 0
    }
    Dg() {
      return 0
    }
    toString() {
      return super.toString()
    }
  }
  ;
  var cW7 = class {
    constructor() {
      this.L = this.time = this.mode = this.W = 0;
      this.B = new IfQ(this);
      this.N = new IfQ(this);
      this.G = [];
      this.clear()
    }
    clear() {
      this.L = this.time = this.mode = 0;
      this.G = [];
      this.reset()
    }
    reset() {
      this.mode = 0;
      this.B.reset(0);
      this.N.reset(1)
    }
  }
    , ggO = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255]
    , V1Q = class {
    constructor() {
      this.type = 0
    }
    set(Z) {
      this.type = Z
    }
    get() {
      return this.type
    }
  }
    , d1$ = class {
    constructor() {
      this.state = this.Wd = this.lH = 0
    }
    clear() {
      this.state = 0
    }
    update() {
      this.state = this.state === 2 ? 1 : 0
    }
    kE() {
      return this.state !== 0
    }
    matches(Z, N) {
      return this.kE() && Z === this.lH && N === this.Wd
    }
  }
    , ZdR = class {
    constructor() {
      this.timestamp = this.G = 0
    }
    reset() {
      this.timestamp = this.G = 0
    }
  }
    , mE = class {
    constructor(Z) {
      this.N = Z;
      this.L = [];
      this.G = this.W = this.row = 0;
      this.style = new V1Q;
      this.B = 0;
      for (Z = 0; Z <= 15; Z++) {
        this.L[Z] = [];
        for (let N = 0; N <= 32; N++)
          this.L[Z][N] = new ZdR
      }
    }
    updateTime(Z) {
      for (let N = 1; N <= 15; ++N)
        for (let r = 1; r <= 32; ++r)
          this.L[N][r].timestamp = Z
    }
    debugString() {
      var Z = "\n";
      for (let N = 1; N <= 15; ++N) {
        for (let r = 1; r <= 32; ++r) {
          let X = this.L[N][r];
          Z = X.G === 0 ? Z + "_" : Z + String.fromCharCode(X.G)
        }
        Z += "\n"
      }
      return Z
    }
    reset(Z) {
      for (let N = 0; N <= 15; N++)
        for (let r = 0; r <= 32; r++)
          this.L[N][r].reset();
      this.B = Z;
      this.G = 0;
      this.W = this.row = 1
    }
  }
    , mHO = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
    , PuO = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
    , iLT = [193, 201, 211, 218, 220, 252, 8216, 161, 42, 39, 9473, 169, 8480, 183, 8220, 8221, 192, 194, 199, 200, 202, 203, 235, 206, 207, 239, 212, 217, 249, 219, 171, 187]
    , Yw_ = [195, 227, 205, 204, 236, 210, 242, 213, 245, 123, 125, 92, 94, 95, 124, 126, 196, 228, 214, 246, 223, 165, 164, 9475, 197, 229, 216, 248, 9487, 9491, 9495, 9499]
    , Nj3 = class {
    constructor(Z) {
      this.L = Z;
      this.N = 0;
      this.style = new V1Q;
      this.Y = new mE(this.L);
      this.Z = new mE(this.L);
      this.text = new mE(this.L);
      this.W = this.Y;
      this.B = this.Z;
      this.G = this.W
    }
    reset(Z, N) {
      this.N = N;
      this.style.set(2);
      this.W = this.Y;
      this.B = this.Z;
      this.G = this.W;
      var r = (Z << 2) + (N << 1);
      this.Y.reset(r);
      this.Z.reset(r);
      this.text.reset((Z << 2) + (N << 1) + 1)
    }
  }
    , IfQ = class {
    constructor(Z) {
      this.G = Z;
      this.N = 0;
      this.L = new Nj3(this.G);
      this.Y = new Nj3(this.G);
      this.W = new d1$;
      this.B = this.L
    }
    reset(Z) {
      this.N = Z;
      this.W.clear();
      this.B = this.L;
      this.L.reset(Z, 0);
      this.Y.reset(Z, 1)
    }
  }
  ;
  var rl$ = class {
    B() {}
  }
  ;
  var P3 = class extends g.D {
    reset() {}
  }
  ;
  var H3 = class extends g.bt {
    constructor(Z, N, r, X, z) {
      super(Z, Z + N, {
        priority: r,
        namespace: "captions"
      });
      this.id = X;
      this.params = z;
      this.G = []
    }
    toString() {
      return super.toString()
    }
  }
    , W3 = 0;
  var XET = class extends P3 {
    constructor(Z) {
      super();
      this.B = Z;
      this.pens = {};
      this.j = {};
      this.D = {};
      this.N = "_" + W3++;
      this.Z = {};
      this.W = this.G = null;
      this.Y = !0
    }
    reset() {
      this.Z = {};
      this.W = this.G = null;
      this.Y = !0
    }
    L(Z, N) {
      Z = Z.firstChild;
      Z.getAttribute("format");
      N = N || 0;
      Number.isFinite(N);
      Z = Array.from(Z.childNodes);
      for (var r of Z)
        if (r.nodeType === 1)
          switch (r.tagName) {
          case "head":
            var X = r;
            break;
          case "body":
            var z = r
          }
      if (X) {
        X = Array.from(X.childNodes);
        for (var Q of X)
          if (Q.nodeType === 1)
            switch (Q.tagName) {
            case "pen":
              r = Q.getAttribute("id");
              X = this.pens;
              Z = {};
              var B = Q.getAttribute("p");
              B && Object.assign(Z, this.pens[B]);
              B = GC(Q, "b");
              B != null && (Z.bold = B);
              B = GC(Q, "i");
              B != null && (Z.italic = B);
              B = GC(Q, "u");
              B != null && (Z.underline = B);
              B = $s(Q, "et");
              B != null && (Z.charEdgeStyle = B);
              B = $s(Q, "of");
              B != null && (Z.offset = B);
              B = wP(Q, "bc");
              B != null && (Z.background = B);
              B = wP(Q, "ec");
              B != null && (Z.oI = B);
              B = wP(Q, "fc");
              B != null && (Z.color = B);
              B = $s(Q, "fs");
              B != null && B !== 0 && (Z.fontFamily = B);
              B = v3(Q, "sz");
              B !== void 0 && (Z.fontSizeIncrement = B / 100 - 1);
              B = v3(Q, "bo");
              B !== void 0 && (Z.backgroundOpacity = B / 255);
              B = v3(Q, "fo");
              B !== void 0 && (Z.textOpacity = B / 255);
              B = $s(Q, "rb");
              B != null && B !== 10 && B !== 0 && (Z.OE = B > 10 ? B - 1 : B);
              B = $s(Q, "hg");
              B != null && (Z.F5 = B);
              X[r] = Z;
              break;
            case "ws":
              X = Q.getAttribute("id");
              this.D[X] = A2R(this, Q);
              break;
            case "wp":
              X = Q.getAttribute("id"),
              this.j[X] = IrT(this, Q)
            }
      }
      if (z) {
        Q = [];
        z = Array.from(z.childNodes);
        for (M of z)
          if (M.nodeType === 1)
            switch (M.tagName) {
            case "w":
              this.G = c2Q(this, M, N, !1);
              (z = this.Z[this.G.id]) && z.end > this.G.start && (z.end = this.G.start);
              this.Z[this.G.id] = this.G;
              Q.push(this.G);
              break;
            case "p":
              var x = M;
              Z = N;
              z = [];
              X = x.getAttribute("w") || this.N;
              r = !!GC(x, "a");
              Z = (v3(x, "t") || 0) + Z;
              B = v3(x, "d") || 5E3;
              r || (!this.Y && this.W && this.W.windowId === X && this.W.end > Z && (this.W.end = Z),
              this.W && this.W.text === "\n" && (this.W.text = ""));
              let n = r ? 6 : 5;
              var t = x.getAttribute("p");
              t = t ? this.pens[t] : null;
              let m = Array.from(x.childNodes);
              m.length && (this.Y = x.getAttribute("d") != null);
              for (x = 0; x < m.length; x++) {
                var J = m[x]
                  , W = void 0;
                x > 0 && (r = !0);
                let E;
                J.nodeType === 1 && (E = J);
                if (E && E.tagName === "s") {
                  if ((J = (J = E.getAttribute("p")) ? this.pens[J] : null) && J.OE && (J.OE === 1 ? (J = m.slice(x, x + 4),
                  J.length === 4 && (W = frO(Z, B, X, r, n, J, this.pens),
                  x += 3)) : W = frO(Z, B, X, r, n, [E], this.pens)),
                  !W) {
                    var H = E;
                    W = Z;
                    J = B;
                    var v = X
                      , G = r;
                    let K = H.textContent ? H.textContent : "";
                    var U = H.getAttribute("p");
                    U = U ? this.pens[U] : null;
                    H = v3(H, "t") || 0;
                    W = new jk(W + H,J - H,n,v,K,G,U)
                  }
                } else
                  W = new jk(Z,B,n,X,J.textContent || "",r,t);
                z.push(W);
                this.W = W
              }
              if (z.length > 0) {
                z[0].windowId === this.N && (this.G = c2Q(this, M, N, !0),
                Q.push(this.G));
                for (let E of z)
                  E.windowId = this.G.id,
                  this.G.G.push(E),
                  Q.push(E)
              }
            }
        var M = Q
      } else
        M = [];
      return M
    }
  }
  ;
  var ziO = new Map([[9, 1], [10, 1], [11, 2], [12, 3], [13, 4], [14, 5]])
    , Q8T = class extends P3 {
    constructor(Z) {
      super();
      this.Y = Z;
      this.G = new Map;
      this.B = new Map;
      this.N = new Map;
      this.W = new Map
    }
    reset() {
      this.W.clear()
    }
    L(Z, N) {
      Z = JSON.parse(Z);
      if (!Z)
        return [];
      if (Z.pens) {
        var r = Z.pens
          , X = 0;
        for (var z of r) {
          r = {};
          var Q = z.pParentId;
          Q && Object.assign(r, this.G.get(Q));
          z.bAttr && (r.bold = !0);
          z.iAttr && (r.italic = !0);
          z.uAttr && (r.underline = !0);
          Q = z.ofOffset;
          Q != null && (r.offset = Q);
          z.szPenSize !== void 0 && (r.fontSizeIncrement = z.szPenSize / 100 - 1);
          Q = z.etEdgeType;
          Q != null && (r.charEdgeStyle = Q);
          z.ecEdgeColor !== void 0 && (r.oI = Fo(z.ecEdgeColor));
          Q = z.fsFontStyle;
          Q != null && Q !== 0 && (r.fontFamily = Q);
          z.fcForeColor !== void 0 && (r.color = Fo(z.fcForeColor));
          z.foForeAlpha !== void 0 && (r.textOpacity = z.foForeAlpha / 255);
          z.bcBackColor !== void 0 && (r.background = Fo(z.bcBackColor));
          z.boBackAlpha !== void 0 && (r.backgroundOpacity = z.boBackAlpha / 255);
          (Q = z.rbRuby) && Q !== 10 && (r.OE = Q > 10 ? Q - 1 : Q,
          r.textEmphasis = ziO.get(r.OE));
          z.hgHorizGroup && (r.F5 = z.hgHorizGroup);
          this.G.set(X++, r)
        }
      }
      if (Z.wsWinStyles) {
        X = Z.wsWinStyles;
        z = 0;
        for (var B of X)
          X = {},
          (r = B.wsParentId) ? Object.assign(X, this.N.get(r)) : Object.assign(X, this.Y),
          B.mhModeHint !== void 0 && (X.xi = B.mhModeHint),
          B.juJustifCode !== void 0 && (X.textAlign = B.juJustifCode),
          B.pdPrintDir !== void 0 && (X.P9 = B.pdPrintDir),
          B.sdScrollDir !== void 0 && (X.Wh = B.sdScrollDir),
          B.wfcWinFillColor !== void 0 && (X.windowColor = Fo(B.wfcWinFillColor)),
          B.wfoWinFillAlpha !== void 0 && (X.windowOpacity = B.wfoWinFillAlpha / 255),
          this.N.set(z++, X)
      }
      if (Z.wpWinPositions) {
        z = Z.wpWinPositions;
        B = 0;
        for (var x of z)
          z = {},
          (X = x.wpParentId) && Object.assign(z, this.B.get(X)),
          x.ahHorPos !== void 0 && (z.bu = x.ahHorPos),
          x.apPoint !== void 0 && (z.JW = x.apPoint),
          x.avVerPos !== void 0 && (z.BV = x.avVerPos),
          x.ccCols !== void 0 && (z.TM = x.ccCols),
          x.rcRows !== void 0 && (z.WY = x.rcRows),
          this.B.set(B++, z)
      }
      if (Z.events) {
        Z = Z.events;
        x = [];
        for (let p of Z)
          if (B = (p.tStartMs || 0) + N,
          z = p.dDurationMs || 0,
          p.id)
            X = String(p.id),
            Z = V37(this, p, B, z, X),
            x.push(Z),
            this.W.set(X, Z);
          else {
            p.wWinId ? X = p.wWinId.toString() : (X = "_" + W3++,
            Z = V37(this, p, B, z, X),
            x.push(Z),
            this.W.set(X, Z));
            Z = x;
            var t = p;
            z === 0 && (z = 5E3);
            r = this.W.get(X);
            let d = (Q = !!t.aAppend) ? 6 : 5
              , vu = t.segs
              , jQ = null;
            t.pPenId && (jQ = this.G.get(t.pPenId));
            for (t = 0; t < vu.length; t++) {
              var J = vu[t]
                , W = J.utf8;
              if (W) {
                var H = J.tOffsetMs || 0;
                let y7 = null;
                J.pPenId && (y7 = this.G.get(J.pPenId));
                if ((r.params.xi != null ? r.params.xi : r.G.length > 1 ? 1 : 0) === 2 && Q && W === "\n")
                  continue;
                J = null;
                var v = [], G;
                if (G = y7 && y7.OE === 1)
                  a: {
                    G = vu;
                    var U = t;
                    if (U + 3 >= G.length || !G[U + 1].pPenId || !G[U + 2].pPenId || !G[U + 3].pPenId) {
                      G = !1;
                      break a
                    }
                    var M = G[U + 1].pPenId;
                    (M = this.G.get(M)) && M.OE && M.OE === 2 ? (M = G[U + 2].pPenId,
                    M = this.G.get(M),
                    !M || !M.OE || M.OE < 3 ? G = !1 : (M = G[U + 3].pPenId,
                    G = (M = this.G.get(M)) && M.OE && M.OE === 2 ? !0 : !1)) : G = !1
                  }
                if (G)
                  H = vu[t + 1].utf8,
                  J = vu[t + 3].utf8,
                  G = vu[t + 2].utf8,
                  U = this.G.get(vu[t + 2].pPenId),
                  W = arT(W, H, G, J, U),
                  J = new jk(B,z,d,X,W,Q,y7),
                  t += 3;
                else {
                  if (W.indexOf("<") > -1) {
                    v = y7;
                    G = jQ;
                    U = B;
                    M = z;
                    var n = H
                      , m = d
                      , E = Q;
                    let lT = [];
                    var K = rP(`<html>${W}</html>`);
                    if (!K.getElementsByTagName("parsererror").length && K.firstChild?.childNodes.length)
                      for (let K3 of K.firstChild.childNodes) {
                        K = K3.textContent?.replace(/\n/g, "") ?? "";
                        if (K3.nodeType === 3 && (!K || K.match(/^ *$/) != null))
                          continue;
                        let rm = {};
                        Object.assign(rm, v || G);
                        switch (K3?.tagName) {
                        case "b":
                          rm.bold = !0;
                          break;
                        case "i":
                          rm.italic = !0;
                          break;
                        case "u":
                          rm.underline = !0
                        }
                        lT.push(new jk(U + n,M - n,m,r.id,K,E,rm))
                      }
                    v = lT
                  }
                  v.length || (v = [new jk(B + H,z - H,d,r.id,W,Q,y7 || jQ)])
                }
                if (v.length)
                  for (let lT of v)
                    Z.push(lT),
                    r.G.push(lT);
                else
                  J && (Z.push(J),
                  r.G.push(J))
              }
              Q = !0
            }
          }
        N = x
      } else
        N = [];
      return N
    }
  }
  ;
  var BjQ = class extends oc {
    constructor(Z, N, r) {
      super(Z);
      this.videoData = N;
      this.audioTrack = r;
      this.D = N.WS
    }
    Z(Z, N, r) {
      t3O(this.videoData.videoId, Z.vssId, r.nx)
    }
    B(Z) {
      if (this.audioTrack)
        for (let N of this.audioTrack.captionTracks)
          NI(this.G, N);
      Z.xN()
    }
  }
  ;
  var m1Q = class extends Eb {
    constructor(Z, N, r, X, z, Q, B, x, t, J) {
      super(Z, N, r, X, z, Q, B, x, t, J);
      this.type = 1
    }
    l3(Z) {
      var N = this.W.G;
      super.l3(Z);
      for (Z = Z.length; Z < N.length; Z++) {
        let z = N[Z], Q;
        if (X && z.G === r)
          Q = X;
        else {
          Q = {};
          Object.assign(Q, z.G);
          Object.assign(Q, xKO);
          var r = z.G;
          var X = Q
        }
        hLu(this, z, Q)
      }
    }
  }
    , xKO = {
    Ih: !0
  };
  var dH7 = class extends rl$ {
    constructor(Z, N) {
      super();
      this.trackData = Z;
      this.Y = N;
      this.version = this.N = this.L = this.byteOffset = 0;
      this.W = [];
      this.G = new DataView(this.trackData)
    }
    B(Z, N, r, X, z) {
      if (r < X) {
        let Q = "_" + W3++;
        r = r / 1E3 - this.Y;
        X = X / 1E3 - this.Y;
        Z = new H3(r,X - r,5,Q,{
          textAlign: 0,
          JW: 0,
          bu: N * 2.5,
          BV: Z * 5.33
        });
        z = new jk(r,X - r,5,Q,z);
        this.W.push(Z);
        this.W.push(z)
      }
    }
  }
    , tta = class extends P3 {
    constructor(Z, N) {
      super();
      this.W = Z;
      this.B = N;
      this.track = this.B.languageName === "CC3" ? 4 : 0;
      this.G = new cW7;
      this.G.W = 1 << this.track
    }
    L(Z) {
      Z = new dH7(Z,this.W);
      if (Zqu(Z)) {
        for (; Z.byteOffset < Z.G.byteLength; )
          for (Z.version === 0 ? Z.L = ks(Z) * (1E3 / 45) : Z.version === 1 && (Z.L = ks(Z) * 4294967296 + ks(Z)),
          Z.N = C6(Z); Z.N > 0; Z.N--) {
            var N = C6(Z);
            let r = C6(Z)
              , X = C6(Z);
            N & 4 && (N & 3) === this.track && (this.track === 0 || this.track === 1) && (N = this.G,
            N.G.push({
              time: Z.L,
              type: this.track,
              Z5: r,
              Aq: X,
              order: N.G.length
            }))
          }
        og$(this.G, Z);
        return Z.W
      }
      return []
    }
    reset() {
      this.G.clear()
    }
  }
  ;
  var Pe3 = class extends Eb {
    constructor(Z, N, r, X, z, Q, B, x, t, J) {
      super(Z, N, r, X, z, Q, B, x, t, J);
      this.type = 2;
      this.KN = [];
      this.BG = this.LN = this.D$ = 0;
      this.AE = NaN;
      this.LF = 0;
      this.pF = null;
      this.Bc = new g.OB(this.wz,433,this);
      this.Z && (J.createClientVe(this.Z, this, 167342),
      this.kR(this.Z, "click", () => {
        J.logClick(this.Z)
      }
      ),
      Z = new g.bW(this.element,!0),
      g.R(this, Z),
      Z.subscribe("hoverstart", () => {
        J.logVisibility(this.Z, !0)
      }
      , this));
      g.mr(this.element, "ytp-caption-window-rollup");
      g.R(this, this.Bc);
      g.Hv(this.element, "overflow", "hidden")
    }
    Tz() {
      var Z = this.Bc;
      Z.stop();
      Z.VK()
    }
    wz() {
      this.element.removeEventListener("transitionend", this.wz, !1);
      g.iX(this.element, "ytp-rollup-mode");
      this.J(this.pF, !0)
    }
    Dg() {
      return this.N ? this.BG : this.LN
    }
    fO() {
      return this.N ? this.LN : this.BG
    }
    J(Z, N) {
      this.pF = Z;
      if (this.W.params.WY) {
        var r = 0;
        for (let X = 0; X < this.D.length && r < Z.length; X++)
          this.D[X] === Z[r] && r++;
        r > 0 && r < Z.length && (Z = this.D.concat(Z.slice(r)));
        this.LF = this.BG;
        this.LN = this.BG = 0;
        super.J(Z);
        zKT(this, N)
      }
      super.J(Z)
    }
  }
  ;
  var JlO = class {
    constructor(Z, N, r, X) {
      this.WG = Z;
      this.N = N;
      this.logger = r;
      this.kQ = X;
      this.Qv = [];
      this.G = null;
      this.L = [];
      this.Xs = [];
      this.W = null;
      Z = g.MG(this.WG.V().experiments, "html5_override_micro_discontinuities_threshold_ms");
      this.B = Z > 0 ? Z : 10
    }
    unload() {
      this.W != null && (this.WG.removeEventListener("sabrCaptionsDataLoaded", this.W),
      this.W = null);
      this.Qv = [];
      this.G = null;
      this.L = [];
      this.WG.Tv("sabrCaptionsBufferedRangesUpdated", this.Qv)
    }
    Y(Z) {
      return {
        formatId: g.v$(Z.info.S.info, this.kQ),
        NA: Z.info.NA + (this.kQ ? 0 : 1),
        startTimeMs: Z.info.L * 1E3,
        durationMs: Z.info.Z * 1E3
      }
    }
  }
  ;
  var j8$ = class extends oc {
    constructor(Z, N) {
      super(N);
      this.W = Z;
      this.WG = N;
      this.logger = new g.AD("caps");
      this.j = this.X = null;
      this.J = new JlO(this.WG,this,this.logger,this.W.kQ)
    }
    Z(Z, N, r) {
      this.L();
      N = Z.getId();
      N = N != null && N in this.W.G ? this.W.G[N] : null;
      N || (N = Z.languageCode,
      N = this.W.isManifestless ? WRT(this, N, "386") : WRT(this, N));
      N && (this.j = Z,
      this.X = N,
      JW_(this.J, r),
      this.WG.Tv("sabrCaptionsTrackChanged", g.v$(N.info, this.W.kQ)))
    }
    B(Z) {
      var N = this.W.isManifestless ? HqQ(this, "386") : HqQ(this);
      for (let r of N)
        NI(this.G, r);
      Z.xN()
    }
    L() {
      this.j && (this.j = this.X = null,
      this.J.unload(),
      this.WG.Tv("sabrCaptionsTrackChanged", null))
    }
    Y() {
      return ""
    }
  }
  ;
  var vy3 = "WEBVTT".split("").map(Z => Z.charCodeAt(0))
    , CeQ = class extends P3 {
    constructor() {
      super()
    }
    L(Z, N) {
      Z instanceof ArrayBuffer && (Z = g.zD(new Uint8Array(Z)));
      var r = [];
      Z = Z.split(WeO);
      for (let U = 1; U < Z.length; U++) {
        var X = Z[U]
          , z = N;
        if (X !== "" && !HdT.test(X)) {
          var Q = i4.exec(X);
          if (Q && Q.length >= 4) {
            var B = Ub(Q[1])
              , x = Ub(Q[2]) - B;
            B += z;
            var t = (Q = Q[3]) ? Q.split(" ") : [];
            Q = {};
            var J = null;
            var W = "";
            var H = null
              , v = "";
            for (let M of t) {
              t = M.split(":");
              if (t.length !== 2)
                continue;
              var G = t[1];
              switch (t[0]) {
              case "line":
                t = G.split(",");
                t[0].endsWith("%") && (J = t[0],
                Q.BV = Number.parseInt(J, 10),
                t.length === 2 && (W = t[1].trim()));
                break;
              case "position":
                t = G.split(",");
                H = t[0];
                Q.bu = Number.parseInt(H, 10);
                t.length === 2 && (v = t[1].trim());
                break;
              case "align":
                switch (G) {
                case "start":
                  Q.textAlign = 0;
                  break;
                case "middle":
                  Q.textAlign = 2;
                  break;
                case "end":
                  Q.textAlign = 1
                }
              }
            }
            J || W || (W = "end");
            if (!H)
              switch (Q.textAlign) {
              case 0:
                Q.bu = 0;
                break;
              case 1:
                Q.bu = 100;
                break;
              case 2:
                Q.bu = 50
              }
            if (Q.textAlign != null) {
              J = 0;
              switch (W) {
              case "center":
                J += 3;
                break;
              case "end":
                J += 6;
                break;
              default:
                J += 0
              }
              switch (v) {
              case "line-left":
                J += 0;
                break;
              case "center":
                J += 1;
                break;
              case "line-right":
                J += 2;
                break;
              default:
                switch (Q.textAlign) {
                case 0:
                  J += 0;
                  break;
                case 2:
                  J += 1;
                  break;
                case 1:
                  J += 2
                }
              }
              W = J < 0 || J > 8 ? 7 : J;
              Q.JW = W
            }
            X = X.substring(i4.lastIndex).replace(/[\x01-\x09\x0b-\x1f]/g, "");
            v = Q;
            Q = {};
            if (X.indexOf("<") < 0 && X.indexOf("&") < 0)
              z = $1O(B, x, 5, v),
              B = new jk(B,x,5,z.id,X,!1,g.hc(Q) ? void 0 : Q),
              r.push(z),
              r.push(B),
              z.G.push(B);
            else
              for (W = X.split(vlR),
              W.length === 1 ? (X = 5,
              v = $1O(B, x, X, v)) : (J = X = 6,
              v = Object.assign({
                TM: 32
              }, v),
              v = new H3(B,x,J,"_" + W3++,v)),
              r.push(v),
              J = B,
              H = 0; H < W.length; H++)
                if (t = W[H],
                H % 2 === 0) {
                  G = rP(`<html>${t}</html>`);
                  let M;
                  G.getElementsByTagName("parsererror").length ? (M = G.createElement("span"),
                  M.appendChild(G.createTextNode(t))) : M = G.firstChild;
                  sdy(this, J, x - (J - B), X, v, H > 0, M, Q, r)
                } else
                  J = Ub(t) + z
          }
          i4.lastIndex = 0
        }
      }
      return r
    }
  }
    , HdT = /^NOTE/
    , WeO = /(?:\r\n|\r|\n){2,}/
    , i4 = RegExp("^((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})[\\t ]+--\x3e[\\t ]+((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})(?:[\\t ]*)(.*)(?:\\r\\n|\\r|\\n)", "gm")
    , vlR = RegExp("<((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})>");
  var GjO = class extends g.D {
    constructor(Z, N) {
      super();
      this.WG = Z;
      this.U = N;
      this.G = null;
      this.pO = this.WG.a7();
      this.logger = new g.AD("caps")
    }
    clear() {
      this.G && this.G.dispose();
      this.G = null
    }
    reset() {
      this.G && this.G.reset()
    }
    PG() {
      super.PG();
      this.clear()
    }
  }
  ;
  var TYy = {
    windowColor: "#080808",
    windowOpacity: 0,
    textAlign: 2,
    JW: 7,
    bu: 50,
    BV: 100,
    isDefault: !0,
    fF: {
      background: "#080808",
      backgroundOpacity: .75,
      charEdgeStyle: 0,
      color: "#fff",
      fontFamily: 4,
      fontSizeIncrement: 0,
      textOpacity: 1,
      offset: 1
    }
  }
    , yW3 = {
    windowColor: "#080808",
    windowOpacity: 0,
    textAlign: 0,
    JW: 7,
    bu: 50,
    BV: 100,
    isDefault: !0,
    fF: {
      background: "#080808",
      backgroundOpacity: .7,
      charEdgeStyle: 0,
      color: "#fff",
      fontFamily: 4,
      fontSizeIncrement: 0,
      textOpacity: 1,
      offset: 1
    }
  };
  g.OV("captions", class extends g.Sw {
    constructor(Z) {
      super(Z);
      this.WG = Z;
      this.KN = [];
      this.LN = {};
      this.tE = {};
      this.j = !1;
      this.L = "NONE";
      this.G = this.D = this.J = this.gz = this.u3 = null;
      this.i$ = {
        xN: () => {
          this.xN()
        }
        ,
        nx: (X, z, Q, B, x=0) => {
          var t = Number(this.videoData.V().VU().G.qA(g.hWT) ?? 0);
          x > 0 && t > 0 && this.videoData.lengthSeconds > 0 && x / this.videoData.lengthSeconds > t ? this.WG.C("tts", {
            dropcap: x
          }) : this.nx(X, z, Q, B)
        }
      };
      this.rz = this.W = null;
      this.U = this.WG.V();
      this.videoData = this.WG.getVideoData();
      this.wz = this.WG.Eo();
      this.N = {
        fF: {}
      };
      this.Y = {
        fF: {}
      };
      g.TE(this.videoData) ? this.L = "OFFLINE" : g.R8(this.videoData, this.WG) ? this.L = "HLS" : jdT(this.videoData, this.WG) ? this.L = "SABR_LIVE" : g.nd(this.videoData, this.WG) ? this.L = "LIVE" : this.videoData.captionTracks.length ? this.L = "INNERTUBE" : this.videoData.qd && (this.L = "TTS");
      this.pN = this.U.controlsType === "3";
      this.D$ = new GjO(this.WG,this.U);
      this.BG = new g.ae(this);
      this.Z = new g.XU({
        O: "div",
        b3: "ytp-caption-window-container",
        hE: {
          id: "ytp-caption-window-container"
        }
      });
      this.X = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 1,
        height: 1
      };
      var N = null
        , r = g.tX("yt-html5-player-modules::subtitlesModuleData");
      r && (N = new g.It(r));
      this.storage = N;
      this.JE = !!Z.vD()?.cG();
      this.B = bqQ(this);
      this.zv = !this.B && this.pN && this.JE && (this.L === "LIVE" || this.L === "SABR_LIVE");
      g.R(this, this.D$);
      this.B ? this.cG = this.AE = null : (this.AE = new co(this.Ap,void 0,this),
      g.R(this, this.AE),
      this.cG = new g.OB(this.eb,2E3,this),
      g.R(this, this.cG));
      g.R(this, this.BG);
      g.z9(this.player, this.Z.element, 4);
      g.R(this, this.Z);
      this.B || this.BG.kR(Z, "resize", this.l3);
      (this.Na = g.P8(this.U) && !g.rK() && !this.WG.isFullscreen() && !this.B && !this.zv) && this.BG.kR(Z, "resize", this.YQ);
      this.BG.kR(Z, "onPlaybackAudioChange", this.KO);
      this.BG.kR(Z, g.k3("captions"), X => {
        this.onCueRangeEnter(X)
      }
      );
      this.BG.kR(Z, g.Uq("captions"), X => {
        this.onCueRangeExit(X)
      }
      );
      b4(this, ZY() || {});
      g.YE(this.player, "onCaptionsModuleAvailable");
      this.L === "HLS" && this.B && (Z = this.WG.vD().A8(),
      this.JE && this.BG.kR(Z.textTracks, "addtrack", this.qa))
    }
    PG() {
      if (this.B || this.zv) {
        let Z = this.WG.vD();
        Z && !Z.xR() && Z.D()
      } else
        yi(this, !1);
      super.PG()
    }
    w5() {
      if (this.pN)
        return this.B || this.zv;
      if (this.L === "HLS")
        return this.B;
      var Z = this.getAudioTrack();
      if (OqT(this)) {
        if (!Z.captionTracks.length)
          return !1;
        if (!this.G)
          return !0
      }
      Z = Ij(Z, g.df(this.U));
      return Z === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? !0 : Z === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" ? MI(this) : u4(this) || MI(this) ? !0 : D13(this)
    }
    load() {
      super.load();
      this.D = this.getAudioTrack();
      if (this.G)
        this.W && (this.D$.clear(),
        this.B ? RKa(this, !0) : this.player.getPresentingPlayerType() !== 3 && this.G.Z(this.W, "json3", this.i$),
        this.L !== "HLS" && this.B || this.zv || DY(this) || g.YE(this.player, "captionschanged", A0(this.W)));
      else {
        if (this.L === "OFFLINE")
          var Z = new BjQ(this.player,this.videoData,this.getAudioTrack());
        else
          this.L === "SABR_LIVE" ? Z = new j8$(this.videoData.G,this.player) : this.L === "HLS" ? Z = new pI$(this.player) : this.L === "LIVE" ? Z = new ffQ(this.videoData.G,this.player) : this.L === "INNERTUBE" ? Z = new KRO(this.player,this.videoData,this.getAudioTrack()) : (Z = this.videoData,
          Z = new lf$(this.player,this.videoData.qd,this.videoData.videoId,Z.captionsLanguagePreference || Z.Gv.captionsLanguagePreference || g.Hh(Z, "yt:cc_default_lang") || Z.Gv.pN,this.videoData.Tb,this.videoData.eventId));
        this.G = Z;
        g.R(this, this.G);
        this.G.B(this.i$)
      }
    }
    unload() {
      this.B && this.W ? RKa(this, !1) : (this.cG && this.cG.Ek(),
      this.player.Nk("captions"),
      this.KN = [],
      this.G && this.G.L(),
      this.D$.clear(),
      this.J && this.player.UM(this.J),
      this.l3());
      super.unload();
      this.player.r6();
      g.YE(this.player, "captionschanged", {})
    }
    create() {
      this.w5() && this.load();
      var Z;
      a: {
        if (this.U.K("web_player_nitrate_promo_tooltip") && this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.enableTouchCaptionsNitrate && (Z = this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.captionTracks))
          for (let N of Z)
            if (N.kind === "asr" && N.languageCode === "en") {
              Z = !0;
              break a
            }
        Z = !1
      }
      Z && this.WG.Tv("showpromotooltip", this.Z.element)
    }
    xN() {
      var Z = Ij(this.player.getAudioTrack(), g.df(this.U));
      var N = Z === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? Rc(this, this.j) : Z === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" && MI(this) ? Ob(this) : u4(this) || this.j || D13(this) ? Rc(this, this.j) : MI(this) ? Ob(this) : null;
      if (this.L !== "HLS" && this.B || this.zv) {
        let r = this.G.G.G(!0);
        Z = [];
        for (let X = 0; X < r.length; X++) {
          let z = r[X]
            , Q = g.fZ("TRACK");
          Q.setAttribute("kind", "subtitles");
          Q.setAttribute("label", g.RX(z));
          Q.setAttribute("srclang", g.hr(z));
          Q.setAttribute("id", z.toString());
          this.zv || Q.setAttribute("src", this.G.Y(z, "vtt"));
          z === N && Q.setAttribute("default", "1");
          Z.push(Q)
        }
        N = this.WG.vD();
        N.LN(Z);
        Z = N.A8();
        this.JE && this.BG.kR(Z.textTracks, "change", this.Dg)
      } else
        !this.W && N && L6(this, N),
        g.YE(this.player, "onCaptionsTrackListChanged"),
        g.q2(this.player, "onApiChange")
    }
    getTrackById(Z) {
      var N = this.G.G.G(!0);
      for (let r = 0; r < N.length; r++)
        if (N[r].toString() === Z)
          return N[r];
      return null
    }
    Dg() {
      var Z = this.WG.vD().A8().textTracks
        , N = null;
      for (let r = 0; r < Z.length; r++)
        Z[r].mode === "showing" && (N = this.getTrackById(Z[r].id));
      (this.loaded ? this.W : null) !== N && L6(this, N, !0)
    }
    qa() {
      this.G?.B(this.i$)
    }
    Iz() {
      !this.W && this.B || this.unload()
    }
    nx(Z, N, r, X) {
      if (Z) {
        n6(this, this.W ?? void 0);
        this.G.zv() && (this.KN = [],
        this.WG.Nk("captions"),
        Vl(this.AE),
        this.D$.reset());
        a: {
          var z = this.D$;
          X = X || 0;
          r = FR_(z, Z, r || 0);
          Z = [];
          try {
            for (let m of r) {
              let E = m.trackData
                , K = m.bq
                , p = z.U.K("safari_live_drm_captions_fix");
              if (typeof E !== "string") {
                r = Z;
                var Q = r.concat;
                if (p && GRO(E))
                  var B = kRu(z, E, K);
                else {
                  var x = z
                    , t = N
                    , J = E
                    , W = K
                    , H = X;
                  if (!NY$(J))
                    throw Error("Invalid binary caption track data");
                  x.G || (x.G = new tta(H,t));
                  B = x.G.L(J, W)
                }
                var v = Q.call(r, B)
              } else {
                if (E.substring(0, 6) === "WEBVTT")
                  var G = Z.concat(kRu(z, E, K));
                else {
                  r = Z;
                  var U = r.concat;
                  b: {
                    t = z;
                    x = N;
                    if (E[0] === "{")
                      try {
                        t.G || (t.G = new Q8T(U1_(x)));
                        var M = t.G.L(E, K);
                        break b
                      } catch (jQ) {
                        g.A(jQ);
                        M = [];
                        break b
                      }
                    let d = rP(E);
                    if (!d || !d.firstChild) {
                      let jQ = Error("Invalid caption track data");
                      jQ.params = E;
                      throw jQ;
                    }
                    if (d.firstChild.tagName === "timedtext") {
                      if (Number(d.firstChild.getAttribute("format")) === 3) {
                        J = d;
                        t.G || (t.G = new XET(U1_(x)));
                        M = t.G.L(J, K);
                        break b
                      }
                      let jQ = Error("Unsupported subtitles format in web player (Format2)");
                      jQ.params = E;
                      throw jQ;
                    }
                    if (d.firstChild.tagName === "transcript") {
                      let jQ = Error("Unsupported subtitles format in web player (Format1)");
                      jQ.params = E;
                      throw jQ;
                    }
                    let vu = Error("Invalid caption track data");
                    vu.params = E;
                    throw vu;
                  }
                  G = U.call(r, M)
                }
                v = G
              }
              Z = v
            }
            var n = Z;
            break a
          } catch (m) {
            g.IT(z.logger, 187101178, `Captions parsing failed: ${m.message}. `);
            z.clear();
            n = [];
            break a
          }
          n = void 0
        }
        this.U.K("html5_sabr_live_support_subfragmented_captions") && this.G instanceof j8$ && (N = this.G.J,
        z = [],
        n.length > 0 && (z = n.slice(N.L.length)),
        N.L = !N.G || N.G.info.J8 ? [] : n,
        n = z);
        n.length > 0 && (N = this.W,
        this.UB(N, !!N, DY(this) ? "g" : this.j ? "m" : "s"));
        this.player.UM(n, void 0, this.L === "LIVE" || this.L === "SABR_LIVE");
        !this.j || this.zv || DY(this) || g.la(this.U) || g.KF(this.U) || g.ml(this.U) || this.U.Y === "shortspage" || this.player.isInline() || (this.cG.Ek(),
        n = lr$({
          JW: 0,
          bu: 5,
          BV: 5,
          WY: 2,
          textAlign: 0,
          P9: 0,
          lang: "en"
        }),
        this.gz = [n],
        N = ["Click ", " for settings"],
        this.u3 || (z = new g.WcR({
          O: "svg",
          hE: {
            height: "100%",
            version: "1.1",
            viewBox: "0 0 36 36",
            width: "100%"
          },
          HG: [{
            O: "path",
            GD: !0,
            hE: {
              d: "m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z",
              fill: "#fff"
            }
          }]
        }),
        g.R(this, z),
        this.u3 = z.element),
        z = n.end - n.start,
        (v = g.RX(this.W)) && this.gz.push(new jk(n.start,z,0,n.id,v)),
        this.gz.push(new jk(n.start,z,0,n.id,N[0]), new jk(n.start,z,0,n.id,this.u3,!0), new jk(n.start,z,0,n.id,N[1],!0)),
        this.player.UM(this.gz),
        this.cG.gC());
        !this.j || this.zv || DY(this) || (this.U.K("enable_player_captions_persistence_state_machine") ? Sk(this, !0) : g.df(this.U) ? hY(this, !0) : gP(this, !0),
        this.D && (this.D.B = this.W),
        this.player.r6());
        this.j = !1
      }
    }
    onCueRangeEnter(Z) {
      this.KN.push(Z);
      Vl(this.AE)
    }
    onCueRangeExit(Z) {
      g.aU(this.KN, Z);
      this.G instanceof ffQ && this.G.X && this.player.FG([Z]);
      Vl(this.AE)
    }
    getCaptionWindowContainerId() {
      return this.Z.element.id
    }
    eb() {
      Sn7(this, this.gz);
      this.gz = null
    }
    Ap() {
      if (!this.Na || !this.B) {
        this.AE.stop();
        g.nZ(this.tE);
        this.KN.sort(g.Cx);
        var Z = this.KN;
        if (this.J) {
          let N = g.L9(Z, function(r) {
            return this.J.indexOf(r) === -1
          }, this);
          N.length && (Z = N)
        }
        for (let N of Z)
          N instanceof H3 ? LR$(this, N) : Ey$(this, N);
        for (let[N,r] of Object.entries(this.LN)) {
          let X = N
            , z = r;
          this.tE[X] ? (z.element.parentNode || (z instanceof Pe3 || z instanceof m1Q || g.Ul(this.LN, (Q, B) => {
            B !== X && Q.W.params.JW === z.W.params.JW && Q.W.params.bu === z.W.params.bu && Q.W.params.BV === z.W.params.BV && (Q.dispose(),
            delete this.LN[B]);
            return B === X
          }
          , this),
          this.Z.element.appendChild(z.element)),
          z.J(this.tE[X])) : (z.dispose(),
          delete this.LN[X])
        }
      }
    }
    Sg() {
      b4(this, {}, !0);
      g.YE(this.player, "captionssettingschanged")
    }
    Cj() {
      var Z = this.U.K("enable_player_captions_new_style_defaults") ? yW3 : TYy
        , N = Z.fF;
      Z = {
        background: N.background,
        backgroundOpacity: N.backgroundOpacity,
        charEdgeStyle: N.charEdgeStyle,
        color: N.color,
        fontFamily: N.fontFamily,
        fontSizeIncrement: N.fontSizeIncrement,
        fontStyle: N.bold && N.italic ? 3 : N.bold ? 1 : N.italic ? 2 : 0,
        textOpacity: N.textOpacity,
        windowColor: Z.windowColor,
        windowOpacity: Z.windowOpacity
      };
      N = ZY() || {};
      N.background != null && (Z.background = N.background);
      N.backgroundOverride != null && (Z.backgroundOverride = N.backgroundOverride);
      N.backgroundOpacity != null && (Z.backgroundOpacity = N.backgroundOpacity);
      N.backgroundOpacityOverride != null && (Z.backgroundOpacityOverride = N.backgroundOpacityOverride);
      N.charEdgeStyle != null && (Z.charEdgeStyle = N.charEdgeStyle);
      N.charEdgeStyleOverride != null && (Z.charEdgeStyleOverride = N.charEdgeStyleOverride);
      N.color != null && (Z.color = N.color);
      N.colorOverride != null && (Z.colorOverride = N.colorOverride);
      N.fontFamily != null && (Z.fontFamily = N.fontFamily);
      N.fontFamilyOverride != null && (Z.fontFamilyOverride = N.fontFamilyOverride);
      N.fontSizeIncrement != null && (Z.fontSizeIncrement = N.fontSizeIncrement);
      N.fontSizeIncrementOverride != null && (Z.fontSizeIncrementOverride = N.fontSizeIncrementOverride);
      N.fontStyle != null && (Z.fontStyle = N.fontStyle);
      N.fontStyleOverride != null && (Z.fontStyleOverride = N.fontStyleOverride);
      N.textOpacity != null && (Z.textOpacity = N.textOpacity);
      N.textOpacityOverride != null && (Z.textOpacityOverride = N.textOpacityOverride);
      N.windowColor != null && (Z.windowColor = N.windowColor);
      N.windowColorOverride != null && (Z.windowColorOverride = N.windowColorOverride);
      N.windowOpacity != null && (Z.windowOpacity = N.windowOpacity);
      N.windowOpacityOverride != null && (Z.windowOpacityOverride = N.windowOpacityOverride);
      return Z
    }
    BW(Z, N) {
      var r = {};
      Object.assign(r, ZY());
      Object.assign(r, Z);
      b4(this, r, N);
      g.YE(this.player, "captionssettingschanged")
    }
    l3() {
      !this.B && this.loaded && (g.Ws(this.LN, function(Z, N) {
        Z.dispose();
        delete this.LN[N]
      }, this),
      this.Ap())
    }
    ge(Z, N) {
      switch (Z) {
      case "fontSize":
        if (isNaN(N))
          break;
        Z = g.v_(N, -2, 4);
        this.BW({
          fontSizeIncrement: Z
        });
        return Z;
      case "reload":
        N && !this.B && L6(this, this.W, !0);
        break;
      case "stickyLoading":
        N !== void 0 && (this.U.K("enable_player_captions_persistence_state_machine") ? Sk(this, !(!N || !N.userInitiated)) : g.df(this.U) ? hY(this, !!N) : gP(this, !!N));
        break;
      case "track":
        return iq3(this, N);
      case "tracklist":
        return this.G ? g.Er(this.G.G.G(!(!N || !N.includeAsr)), r => A0(r)) : [];
      case "translationLanguages":
        return this.G ? this.G.D.map(r => Object.assign({}, r)) : [];
      case "sampleSubtitles":
        this.B || N === void 0 || yi(this, !!N);
        break;
      case "sampleSubtitlesCustomized":
        this.B || yi(this, !!N, N);
        break;
      case "recommendedTranslationLanguages":
        return g.jl();
      case "defaultTranslationSourceTrackIndices":
        return this.G ? this.G.LN : []
      }
    }
    getOptions() {
      var Z = "reload fontSize track tracklist translationLanguages sampleSubtitle".split(" ");
      Z.push("stickyLoading");
      return Z
    }
    Rq() {
      var Z = this.W;
      if (this.WG.FM("captions")) {
        if (this.U.K("html5_modify_caption_vss_logging"))
          return (Z = this.videoData.EH ?? null) ? {
            cc: g.gL(Z)
          } : {};
        if (Z) {
          let N = Z.vssId;
          Z.translationLanguage && N && (N = `t${N}.${g.hr(Z)}`);
          return {
            cc: N
          }
        }
      }
      return {}
    }
    FV(Z) {
      this.isSubtitlesOn() ? (this.U.K("enable_player_captions_persistence_state_machine") && Z ? Sk(this, !1) : g.df(this.U) ? hY(this, !1) : gP(this, !1),
      n6(this),
      L6(this, null, !0)) : this.X2(Z)
    }
    X2(Z) {
      var N = DY(this) || !this.W ? Rc(this, !0) : this.W;
      N && this.t5(N.vssId, "m");
      this.isSubtitlesOn() || L6(this, N, this.U.K("enable_player_captions_persistence_state_machine") ? Z : !0)
    }
    isSubtitlesOn() {
      return !!this.loaded && !!this.W && !DY(this)
    }
    KO() {
      var Z = DY(this);
      MI(this, Z) ? L6(this, this.getAudioTrack().G, !1) : this.videoData.captionTracks.length && (this.loaded && this.unload(),
      OqT(this) && (this.j = !1,
      this.W = null,
      this.G && (this.G.dispose(),
      this.G = null)),
      this.w5() && (Z ? L6(this, Rc(this, !1), !1) : this.load()))
    }
    gN(Z) {
      if (this.U.experiments.Oa("web_enable_captions_set_target_container") && Z !== this.rz) {
        var N = this.Z.element;
        N.parentNode && g.c_(N);
        (this.rz = Z) ? (this.rz.appendChild(N),
        N.style.position = "absolute",
        N.style.bottom = "0",
        N.style.left = "0",
        N.style.width = "100%",
        N.style.height = "auto",
        N.style.top = "auto") : (g.z9(this.player, N, 4),
        N.style.position = "absolute",
        N.style.bottom = "auto",
        N.style.left = "0",
        N.style.width = "100%",
        N.style.height = "100%",
        N.style.top = "0");
        this.l3()
      }
    }
    AX(Z) {
      Z && (this.X = {
        top: Z.top,
        right: Z.right,
        bottom: Z.bottom,
        left: Z.left,
        width: 1 - Z.left - Z.right,
        height: 1 - Z.top - Z.bottom
      },
      this.Z.element.style.top = `${this.X.top * 100}%`,
      this.Z.element.style.left = `${this.X.left * 100}%`,
      this.Z.element.style.width = `${this.X.width * 100}%`,
      this.Z.element.style.height = `${this.X.height * 100}%`,
      this.Z.element.style.position = "absolute",
      Z = oyQ(this)) && (this.Z.element.style.width = `${Z.width}px`,
      this.Z.element.style.height = `${Z.height}px`)
    }
    onVideoDataChange(Z, N) {
      Z === "newdata" && (this.videoData = N,
      this.loaded && this.unload(),
      this.j = !1,
      this.W = null,
      this.G && (this.G.dispose(),
      this.G = null,
      g.YE(this.player, "captionschanged", {})),
      this.w5() && this.load())
    }
    getAudioTrack() {
      return this.player.getAudioTrack()
    }
    YQ() {
      var Z = this.WG.vD();
      Z && !Z.xR() && Z.D();
      this.WG.isFullscreen() ? (this.B = this.pN = !0,
      this.loaded && this.xN()) : (this.pN = this.U.controlsType === "3",
      this.B = bqQ(this));
      L6(this, this.W)
    }
    It() {
      var Z = this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.openTranscriptCommand;
      Z && g.iv(this.player, "innertubeCommand", Z)
    }
    UB(Z, N, r) {
      var X = /&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm
        , z = "";
      Z && (z = Z.vssId,
      z = z.replace(X, ""));
      var Q = "";
      Z && Z.getId() && (Q = Z.getId() || "");
      Z && Z.getXtags() && (Z = Z.getXtags(),
      Z = Z.replace(X, ""),
      Q = Q.concat(`;${Z}`));
      this.L === "HLS" && (Q = "");
      this.WG.UB(N ? z : "", N ? Q : "", r)
    }
    t5(Z, N) {
      Z = (Z || "").replace(/&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm, "");
      Z.length > 0 && this.WG.t5(Z, N)
    }
  }
  );
}
)(_yt_player);
