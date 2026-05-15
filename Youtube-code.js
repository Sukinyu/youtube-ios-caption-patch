(function(g) {
    var window = this;
    'use strict';
    var iy = function(B) {
        var q = {
            languageCode: B.languageCode,
            languageName: B.languageName,
            displayName: g.t7(B),
            kind: B.kind,
            name: B.name,
            id: B.id,
            is_servable: B.G,
            is_default: B.isDefault,
            is_translateable: B.isTranslateable,
            vss_id: B.vssId
        };
        B.xtags && (q.xtags = B.xtags);
        B.captionId && (q.captionId = B.captionId);
        B.translationLanguage && (q.translationLanguage = B.translationLanguage);
        return q
    }
      , aR8 = function(B, q) {
        var A = new g.ww;
        A.languageCode = B.languageCode;
        A.languageName = B.languageName;
        A.name = B.name;
        A.displayName = B.displayName;
        A.kind = B.kind;
        A.isDefault = !1;
        A.G = B.G;
        A.isTranslateable = B.isTranslateable;
        A.vssId = B.vssId;
        A.url = B.url;
        A.translationLanguage = q;
        B.xtags && (A.xtags = B.xtags);
        B.captionId && (A.captionId = B.captionId);
        return A
    }
      , Zd = function(B, q) {
        return q ? B.captionsInitialState : "CAPTIONS_INITIAL_STATE_UNKNOWN"
    }
      , Oel = function(B) {
        return g.Ex(B) || B.B("web_enable_caption_language_preference_stickiness")
    }
      , Ni8 = async function(B, q) {
        B = B + "|" + q;
        q = await g.en();
        if (!q)
            throw g.nb("gct");
        return (await g.vm(q)).get("captions", B)
    }
      , j8J = function(B, q, A) {
        Ni8(B, q).then(z => {
            z && A(z.trackData, new g.ww(z.metadata))
        }
        )
    }
      , GCJ = function(B) {
        var q = q || 0;
        return function() {
            return B.apply(this, Array.prototype.slice.call(arguments, 0, q))
        }
    }
      , nn = function(B, q, A) {
        g.W.call(this);
        this.G = null;
        this.K = !1;
        this.N = B;
        this.S = A;
        this.O = q || window;
        this.Z = (0,
        g.hJ)(this.xU, this)
    }
      , X7 = function(B) {
        B.isActive() || B.start()
    }
      , mwc = function(B) {
        B = B.O;
        return B.requestAnimationFrame || B.webkitRequestAnimationFrame || B.mozRequestAnimationFrame || B.oRequestAnimationFrame || B.msRequestAnimationFrame || null
    }
      , gqW = function(B) {
        B = B.O;
        return B.cancelAnimationFrame || B.cancelRequestAnimationFrame || B.webkitCancelRequestAnimationFrame || B.mozCancelRequestAnimationFrame || B.oCancelRequestAnimationFrame || B.msCancelRequestAnimationFrame || null
    }
      , Dd = function(B) {
        if (!YgP.test(B))
            throw Error("'" + B + "' is not a valid hex color");
        B.length == 4 && (B = B.replace(MY0, "#$1$1$2$2$3$3"));
        B = B.toLowerCase();
        B = parseInt(B.slice(1), 16);
        return [B >> 16, B >> 8 & 255, B & 255]
    }
      , dwk = function() {
        var B = {}
          , q = "suggest_correction"in g.Yk ? g.Yk.suggest_correction : "Edit caption";
        q = q || "";
        for (let A in B) {
            let z = () => String(B[A]);
            q = q.replace(new RegExp("\\$\\{" + A + "\\}","gi"), z);
            q = q.replace(new RegExp("\\$" + A,"gi"), z)
        }
        return q
    }
      , BQ = function() {
        return g.oN("yt-player-caption-display-settings")
    }
      , CNP = function(B, q) {
        g.V8(q, A => B.equals(A)) || q.push(B)
    }
      , qM = function(B, q) {
        switch (q.kind) {
        case "asr":
            CNP(q, B.Z);
            break;
        default:
            CNP(q, B.O)
        }
    }
      , h4P = async function(B, q, A) {
        B.O = g.c9(q, A)
    }
      , kCP = function(B, q) {
        var A = g.qq(B.segments, q);
        A >= 0 || A < 0 && (-A - 1) % 2 === 1 || (A = -A - 1,
        A > 0 && q - B.segments[A - 1] === 1 && A < B.segments.length && B.segments[A] - q === 1 ? (g.bX(B.segments, A),
        g.bX(B.segments, A - 1)) : A > 0 && q - B.segments[A - 1] === 1 ? B.segments[A - 1] = q : A < B.segments.length && B.segments[A] - q === 1 ? B.segments[A] = q : (g.XE(B.segments, A, 0, q),
        g.XE(B.segments, A + 1, 0, q)))
    }
      , WVc = function(B) {
        return B.G && B.G.K ? B.G.K + B.player.xi() < B.player.getCurrentTime() : !1
    }
      , LVN = function(B, q) {
        if (B.policy.FG && B.player.zd()) {
            var A = g.r4(q, B.policy, {});
            A.set("pot", B.player.zd());
            A = A.XP()
        } else
            A = g.r4(q, B.policy, {}).XP();
        var z = {
            format: "RAW",
            withCredentials: !0
        };
        if (B.policy.bc) {
            z.method = "POST";
            let T = q.K;
            T && Object.keys(T).length > 0 ? z.postBody = g.Nd(T, g.wE) : z.postBody = (0,
            g.Xp)([120, 0])
        }
        B.S && (z.responseType = "arraybuffer");
        var U = ++B.uc
          , E = (0,
        g.w)();
        B.O = g.Ae(A, z, 3, 100, -1, T => {
            T.errorCode === "net.timeout" && B.player.A("capnt", {
                rn: U++
            })
        }
        ).then(T => {
            if (B.policy.VC && U % 100 === 1) {
                var v = (0,
                g.w)();
                B.player.A("caprsp", {
                    rn: U,
                    ms: v - E,
                    kb: (T.xhr.responseText.length / 1024).toFixed()
                })
            }
            a: {
                T = T.xhr;
                B.gi();
                if (B.Z) {
                    var l = !(B.S ? T.response : T.responseText) || T.status >= 400;
                    if (v = g.JN(T)) {
                        T = g.r4(B.Z, B.policy, {});
                        B.Z.z5(T, v);
                        LVN(B, B.Z);
                        break a
                    }
                    l ? B.player.A("capfail", {
                        status: T.status
                    }) : (g.Rh("fcb_r", (0,
                    g.w)(), B.player.getVideoData()?.J || ""),
                    v = B.Z.pn[0],
                    l = v.Kn,
                    B.Y != null && B.N !== l && (B.S ? B.Y(T.response, (v.startTime + B.player.xi()) * 1E3) : B.Y(T.responseText, (v.startTime + B.player.xi()) * 1E3),
                    B.N = l))
                }
                B.Z = null;
                B.O = null
            }
        }
        ).ey(T => {
            B.Z = null;
            B.O = null;
            B.player.A("capfail", {
                rn: U,
                status: T.xhr?.status
            })
        }
        );
        B.Z = q;
        kCP(B.K, B.Z.pn[0].Kn)
    }
      , tYJ = function(B, q) {
        return q != null && q in B.O.G ? B.O.G[q] : null
    }
      , uMW = function(B, q, A) {
        var z = [];
        for (let U in B.O.G) {
            if (!B.O.G.hasOwnProperty(U))
                continue;
            let E = B.O.G[U];
            if (g.So(E, A || null)) {
                let T = E.info.captionTrack;
                T && T.languageCode === q && z.push(E)
            }
        }
        return z.length ? z[0] : null
    }
      , IR0 = function(B, q) {
        var A = [];
        for (let U in B.O.G) {
            if (!B.O.G.hasOwnProperty(U))
                continue;
            var z = B.O.G[U];
            if (g.So(z, q || null)) {
                let E = z.info.id
                  , T = E
                  , v = `.${E}`
                  , l = ""
                  , J = "";
                if (z = z.info.captionTrack)
                    E = z.languageCode,
                    T = z.displayName,
                    v = z.vssId,
                    l = z.kind,
                    J = z.id;
                else {
                    {
                        z = E;
                        let K = g.MJl.get(z);
                        K == null && (K = e4k[z] || e4k[z.replace(/-/g, "_")],
                        g.MJl.set(z, K));
                        z = K
                    }
                    T = z || T
                }
                A.push(new g.ww({
                    id: U,
                    languageCode: E,
                    languageName: T,
                    is_servable: !0,
                    is_default: !0,
                    is_translateable: !1,
                    vss_id: v,
                    kind: l,
                    captionId: J
                }))
            }
        }
        return A
    }
      , AH = function(B) {
        if (typeof DOMParser != "undefined")
            return g.JO(new DOMParser, g.zd(B), "application/xml");
        throw Error("Your browser does not support loading xml documents");
    }
      , R4l = function(B, q, A, z) {
        var U = q / 360 * 16;
        q >= B && (B = 640,
        z > A * 1.3 && (B = 480),
        U = A / B * 16);
        return U
    }
      , yDk = function(B) {
        var q = 1 + .25 * (B.fontSizeIncrement || 0);
        if (B.offset === 0 || B.offset === 2)
            q *= .8;
        return q
    }
      , Q8P = function(B, q) {
        var A = "vertical-rl";
        B.G.h4 === 1 && (A = "vertical-lr");
        g.zZ && (A = A === "vertical-lr" ? "tb-lr" : "tb-rl");
        g.A6(q, "-o-writing-mode", A);
        g.A6(q, "-webkit-writing-mode", A);
        g.A6(q, "writing-mode", A);
        g.A6(q, "text-orientation", "upright");
        g.GW(q, "ytp-vertical-caption");
        B.O.params.Bf === 3 && (g.A6(q, "text-orientation", ""),
        g.A6(q, "transform", "rotate(180deg)"))
    }
      , rDW = function(B, q) {
        var A = {}
          , z = q.background ? q.background : B.G.WZ.background;
        if (q.backgroundOpacity != null || q.background) {
            var U = q.backgroundOpacity != null ? q.backgroundOpacity : B.G.WZ.backgroundOpacity;
            z = Dd(z);
            A.background = "rgba(" + z[0] + "," + z[1] + "," + z[2] + "," + U + ")";
            B.yM && (A["box-decoration-break"] = "clone",
            A["border-radius"] = `${B.jg * .375}px`)
        }
        if (q.fontSizeIncrement != null || q.offset != null)
            A["font-size"] = `${B.aV * yDk(q)}px`;
        z = 1;
        U = q.color || B.G.WZ.color;
        if (q.color || q.textOpacity != null)
            U = Dd(U),
            z = q.textOpacity == null ? B.G.WZ.textOpacity : q.textOpacity,
            U = "rgba(" + U[0] + "," + U[1] + "," + U[2] + "," + z + ")",
            A.color = U,
            A.fill = U;
        var E = q.charEdgeStyle;
        E === 0 && (E = void 0);
        if (E) {
            U = `rgba(34, 34, 34, ${z})`;
            let l = `rgba(204, 204, 204, ${z})`;
            q.jp && (l = U = q.jp);
            let J = B.aV / 16 / 2
              , K = Math.max(J, 1);
            var T = Math.max(2 * J, 1)
              , v = Math.max(3 * J, 1);
            let H = Math.max(5 * J, 1);
            z = [];
            switch (E) {
            case 4:
                for (; v <= H; v += J)
                    z.push(`${T}px ${T}px ${v}px ${U}`);
                break;
            case 1:
                T = window.devicePixelRatio >= 2 ? .5 : 1;
                for (E = K; E <= v; E += T)
                    z.push(`${E}px ${E}px ${U}`);
                break;
            case 2:
                z.push(`${K}px ${K}px ${l}`);
                z.push(`-${K}px -${K}px ${U}`);
                break;
            case 3:
                for (v = 0; v < 5; v++)
                    z.push(`0 0 ${T}px ${U}`)
            }
            A["text-shadow"] = z.join(", ")
        }
        U = "";
        switch (q.fontFamily) {
        case 1:
            U = '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
            break;
        case 2:
            U = '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
            break;
        case 3:
            U = '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
            break;
        case 5:
            U = '"Comic Sans MS", Impact, Handlee, fantasy';
            break;
        case 6:
            U = '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
            break;
        case 7:
            U = g.Nk() ? '"Carrois Gothic SC", sans-serif-smallcaps' : 'Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
            break;
        case 0:
        case 4:
            U = '"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'
        }
        U && (A["font-family"] = U);
        U = q.offset;
        U == null && (U = B.G.WZ.offset);
        switch (U) {
        case 0:
            A["vertical-align"] = "sub";
            break;
        case 2:
            A["vertical-align"] = "super"
        }
        q.fontFamily === 7 && (A["font-variant"] = "small-caps");
        q.bold && (A["font-weight"] = "bold");
        q.italic && (A["font-style"] = "italic");
        q.underline && (A["text-decoration"] = "underline");
        q.ZS && (A.visibility = "hidden");
        q.tQ === 1 && B.S && (A["text-combine-upright"] = "all",
        A["text-orientation"] = "mixed",
        U = g.yM || g.pb,
        B.O.params.Bf === 3 ? A.transform = U ? "rotate(90deg)" : "rotate(180deg)" : U && (A.transform = "rotate(-90deg)"));
        if (q.textEmphasis === 1 || q.textEmphasis === 2 || q.textEmphasis === 3 || q.textEmphasis === 4 || q.textEmphasis === 5)
            if (g.yM)
                A["font-weight"] = "bold";
            else
                switch (A["text-emphasis-style"] = "filled circle",
                A["text-emphasis-color"] = "currentcolor",
                A["webkit-text-emphasis"] = "filled circle",
                q.textEmphasis) {
                case 4:
                case 3:
                    A["text-emphasis-position"] = "under left";
                    A["webkit-text-emphasis-position"] = "under left";
                    break;
                case 5:
                case 2:
                    A["text-emphasis-position"] = "over right",
                    A["webkit-text-emphasis-position"] = "over right"
                }
        return A
    }
      , VYP = function(B, q) {
        if (B.VM && q.length === 0)
            return 0;
        B = 1;
        for (let A = 0; A < q.length; A++) {
            let z = q[A];
            typeof z.text === "string" && (B += z.text.split("\n").length - 1,
            z.append || A === 0 || B++)
        }
        return B
    }
      , $Z = function(B) {
        B = B.split("px");
        return B.length > 0 ? (B = Number(B[0])) ? B : 0 : 0
    }
      , FVE = function(B, q, A) {
        B.Pa = B.Pa || !!A;
        var z = {};
        Object.assign(z, B.G.WZ);
        Object.assign(z, A || q.G);
        Object.assign(z, B.RC.WZ);
        (A = !B.N) && SgJ(B);
        var U = B.Sg && B.Ha && g.dI(z, B.Ha) ? B.Sg : xwJ(B, z)
          , E = typeof q.text === "string"
          , T = E ? q.text.split("\n") : [q.text];
        for (let l = 0; l < T.length; l++) {
            var v = l > 0 || !q.append;
            let J = T[l];
            v && !A ? (SgJ(B),
            U = xwJ(B, z)) : v && A && (A = !1);
            J && (U.appendChild(E ? g.rI(J) : J),
            E || J.tagName !== "RUBY" || J.childElementCount !== 4 || g.yM || !g.TO(J.children[2], "text-emphasis") || (v = B.S ? "padding-right" : "padding-top",
            g.TO(J.children[2], "text-emphasis-position") && (v = B.S ? "padding-left" : "padding-bottom"),
            g.Ul ? g.A6(U, v, "1em") : g.A6(U, v, "0.5em")))
        }
        B.Ha = z;
        B.Sg = U;
        B.J.push(q)
    }
      , SgJ = function(B) {
        if (B.N) {
            var q = B.N;
            if (B.yM) {
                var A = B.G.textAlign;
                A === 0 ? (q = q.firstElementChild) && g.A6(q, {
                    "border-bottom-left-radius": "0"
                }) : A === 1 && (q = q.lastElementChild) && g.A6(q, {
                    "border-bottom-right-radius": "0"
                })
            }
        }
        B.N = g.QR("SPAN");
        g.A6(B.N, {
            display: "block"
        });
        g.GW(B.N, "caption-visual-line");
        B.K.appendChild(B.N)
    }
      , xwJ = function(B, q) {
        var A = g.QR("SPAN");
        g.A6(A, {
            display: "inline-block",
            "white-space": "pre-wrap"
        });
        g.A6(A, rDW(B, q));
        A.classList.add("ytp-caption-segment");
        B.N.appendChild(A);
        B.yM && B.K.children.length > 1 && (B = B.G.textAlign,
        B === 0 ? A.previousElementSibling || g.A6(A, {
            "border-top-left-radius": "0"
        }) : B === 1 && g.A6(A, {
            "border-top-right-radius": "0"
        }));
        A.previousElementSibling && (g.A6(A.previousElementSibling, {
            "border-top-right-radius": "0",
            "border-bottom-right-radius": "0"
        }),
        g.A6(A, {
            "border-top-left-radius": "0",
            "border-bottom-left-radius": "0"
        }));
        return A
    }
      , wnJ = function(B, q, A) {
        if (B === 255 && q === 255 || !B && !q)
            return {
                yO: B,
                OR: q,
                result: 0
            };
        B = bec[B];
        q = bec[q];
        if (B & 128) {
            var z;
            if (z = !(q & 128))
                z = q,
                z = A.o3() && A.OR === z;
            if (z)
                return {
                    yO: B,
                    OR: q,
                    result: 1
                }
        } else if (q & 128 && 1 <= B && B <= 31)
            return {
                yO: B,
                OR: q,
                result: 2
            };
        return {
            yO: B,
            OR: q,
            result: 3
        }
    }
      , pnP = function(B, q, A, z) {
        q === 255 && A === 255 || !q && !A ? (++B.Z === 45 && B.reset(),
        B.K.O.clear(),
        B.S.O.clear()) : (B.Z = 0,
        cDk(B.K, q, A, z))
    }
      , iel = function(B, q) {
        B.G.sort( (A, z) => {
            var U = A.time - z.time;
            return U === 0 ? A.order - z.order : U
        }
        );
        for (let A of B.G)
            B.time = A.time,
            A.type === 0 ? pnP(B, A.UL, A.zi, q) : A.type === 1 && B.O & 496 && cDk(B.S, A.UL, A.zi, q);
        B.G.length = 0
    }
      , B8l = function(B, q) {
        switch (B) {
        case 0:
            return Zek[(q & 127) - 32];
        case 1:
            return nq0[q & 15];
        case 2:
            return Xnn[q & 31];
        case 3:
            return DwE[q & 31]
        }
        return 0
    }
      , z5 = function(B, q) {
        if (B.style.type === 3) {
            var A = 0
              , z = 0
              , U = B.S.time + 0
              , E = ""
              , T = ""
              , v = U;
            for (var l = 1; l <= 15; ++l) {
                var J = !1;
                for (var K = z ? z : 1; K <= 32; ++K) {
                    var H = B.Z[l][K];
                    if (H.G !== 0) {
                        A === 0 && (A = l,
                        z = K);
                        J = String.fromCharCode(H.G);
                        var P = H.timestamp;
                        P < U && (U = P);
                        H.timestamp = v;
                        T && (E += T,
                        T = "");
                        E += J;
                        J = !0
                    }
                    if ((H.G === 0 || K === 32) && J) {
                        T = "\n";
                        break
                    } else if (z && !J)
                        break
                }
                if (A && !J)
                    break
            }
            E && q.K(A, z, U, v, E)
        } else
            for (z = A = 0,
            E = U = B.S.time + 0,
            T = 1; T <= 15; ++T)
                for (v = "",
                l = 1; l <= 32; ++l)
                    if (K = B.Z[T][l],
                    H = K.G,
                    H !== 0 && (A === 0 && (A = T,
                    z = l),
                    J = String.fromCharCode(H),
                    P = K.timestamp,
                    P <= U && (U = P),
                    v += J,
                    K.reset()),
                    l === 32 || H === 0)
                        v && q.K(A, z, U, E, v),
                        U = E,
                        v = "",
                        z = A = 0
    }
      , UR = function(B) {
        return B.Z[B.row][B.O]
    }
      , ER = function(B, q, A) {
        q >= 2 && B.O > 1 && (--B.O,
        UR(B).G = 0);
        var z = UR(B);
        z.timestamp = B.S.time + 0;
        z.G = B8l(q, A);
        B.O < 32 && B.O++
    }
      , qT8 = function(B, q, A, z) {
        for (let T = 0; T < z; T++)
            for (let v = 0; v <= 32; v++) {
                var U = B.Z[q + T][v]
                  , E = B.Z[A + T][v];
                U.G = E.G;
                U.timestamp = E.timestamp
            }
    }
      , T5 = function(B, q, A) {
        for (let z = 0; z < A; z++)
            for (let U = 0; U <= 32; U++)
                B.Z[q + z][U].reset()
    }
      , vQ = function(B) {
        B.row = B.G > 0 ? B.G : 1;
        B.O = 1;
        T5(B, 0, 15)
    }
      , Ak0 = function(B) {
        B.style.set(1);
        B.G = B.K;
        B.G.G = 0;
        B.G.style = B.style;
        B.Z.mode = 1 << B.G.K
    }
      , lD = function(B, q, A) {
        var z = B.O
          , U = !1;
        switch (B.style.get()) {
        case 4:
        case 1:
        case 2:
            B.style.get() === 4 && z.G > 0 || (z5(z, A),
            vQ(B.O),
            vQ(B.K),
            z.row = 15,
            z.G = q,
            U = !0)
        }
        B.style.set(3);
        B.G = z;
        B.G.style = B.style;
        B.Z.mode = 1 << z.K;
        U ? z.O = 1 : z.G !== q && (z.G > q ? (z5(z, A),
        T5(z, z.row - z.G, q)) : z.row < q && (q = z.G),
        z.G = q)
    }
      , $uN = function(B) {
        B.style.set(4);
        B.G = B.text;
        B.G.style = B.style;
        B.Z.mode = 1 << B.G.K
    }
      , cDk = function(B, q, A, z) {
        B.O.update();
        q = wnJ(q, A, B.O);
        switch (q.result) {
        case 0:
            return;
        case 1:
        case 2:
            return
        }
        var U = q.yO;
        q = q.OR;
        if (32 <= U || !U)
            B.G.mode & B.G.O && (A = U,
            A & 128 && (A = 127),
            q & 128 && (q = 127),
            B = B.K.G,
            A & 96 && ER(B, 0, A),
            q & 96 && ER(B, 0, q),
            A !== 0 && q !== 0 && B.style.type === 3 && z5(B, z));
        else if (U & 16)
            a: if (!B.O.matches(U, q) && (A = B.O,
            A.yO = U,
            A.OR = q,
            A.state = 2,
            A = U & 8 ? B.N : B.Z,
            B.K = A,
            B.G.mode = 1 << (B.S << 2) + (A.S << 1) + (A.style.type === 4 ? 1 : 0),
            (B.G.mode | 1 << (B.S << 2) + (A.S << 1) + (A.style.type !== 4 ? 1 : 0)) & B.G.O))
                if (q & 64) {
                    z = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(U & 7) << 1 | q >> 5 & 1];
                    B = q & 16 ? ((q & 14) >> 1) * 4 : 0;
                    q = A.G;
                    switch (A.style.get()) {
                    case 4:
                        z = q.row;
                        break;
                    case 3:
                        if (z !== q.row) {
                            if (z < q.G && (z = q.G,
                            z === q.row))
                                break;
                            var E = 1 + q.row - q.G;
                            let T = 1 + z - q.G;
                            qT8(q, T, E, q.G);
                            A = E;
                            U = q.G;
                            T < E ? (E = T + U - E,
                            E > 0 && (A += E,
                            U -= E)) : (E = E + U - T,
                            E > 0 && (U -= E));
                            T5(q, A, U)
                        }
                    }
                    q.row = z;
                    q.O = B + 1
                } else
                    switch (U & 7) {
                    case 1:
                        switch (q & 112) {
                        case 32:
                            ER(A.G, 0, 32);
                            break a;
                        case 48:
                            q === 57 ? (z = A.G,
                            UR(z).G = 0,
                            z.O < 32 && z.O++) : ER(A.G, 1, q & 15)
                        }
                        break;
                    case 2:
                        q & 32 && ER(A.G, 2, q & 31);
                        break;
                    case 3:
                        q & 32 && ER(A.G, 3, q & 31);
                        break;
                    case 4:
                    case 5:
                        if (32 <= q && q <= 47)
                            switch (q) {
                            case 32:
                                Ak0(A);
                                break;
                            case 33:
                                z = A.G;
                                z.O > 1 && (--z.O,
                                UR(z).G = 0);
                                break;
                            case 36:
                                z = A.G;
                                B = UR(z);
                                for (q = 0; q <= 15; q++)
                                    for (A = 0; A <= 32; A++)
                                        if (z.Z[q][A] === B) {
                                            for (; A <= 32; A++)
                                                z.Z[q][A].reset();
                                            break
                                        }
                                break;
                            case 37:
                                lD(A, 2, z);
                                break;
                            case 38:
                                lD(A, 3, z);
                                break;
                            case 39:
                                lD(A, 4, z);
                                break;
                            case 40:
                                ER(A.G, 0, 32);
                                break;
                            case 41:
                                z = A;
                                z.style.set(2);
                                z.G = z.O;
                                z.G.G = 0;
                                z.G.style = z.style;
                                z.Z.mode = 1 << z.G.K;
                                break;
                            case 42:
                                z = A;
                                B = z.text;
                                B.G = 15;
                                B.style.set(4);
                                vQ(B);
                                $uN(z);
                                break;
                            case 43:
                                $uN(A);
                                break;
                            case 44:
                                B = A;
                                q = B.O;
                                switch (B.style.get()) {
                                case 1:
                                case 2:
                                case 3:
                                    z5(q, z)
                                }
                                T5(q, 0, 15);
                                break;
                            case 45:
                                b: {
                                    q = A;
                                    B = q.G;
                                    switch (q.style.get()) {
                                    default:
                                    case 2:
                                    case 1:
                                        break b;
                                    case 4:
                                        if (B.row < 15) {
                                            ++B.row;
                                            B.O = 1;
                                            break b
                                        }
                                        break;
                                    case 3:
                                    }
                                    B.G < 2 && (B.G = 2,
                                    B.row < B.G && (B.row = B.G));
                                    q = B.row - B.G + 1;
                                    z5(B, z);
                                    qT8(B, q, q + 1, B.G - 1);
                                    T5(B, B.row, 1)
                                }
                                break;
                            case 46:
                                T5(A.K, 0, 15);
                                break;
                            case 47:
                                B = A,
                                z5(B.O, z),
                                B.K.updateTime(B.Z.time + 0),
                                z = B.K,
                                B.K = B.O,
                                B.O = z,
                                Ak0(B)
                            }
                        break;
                    case 7:
                        switch (q) {
                        case 33:
                        case 34:
                        case 35:
                            z = A.G,
                            (z.O += q & 3) > 32 && (z.O = 32)
                        }
                    }
    }
      , UuN = function(B, q, A, z, U, E, T) {
        var v = E[0]
          , l = T[v.getAttribute("p")];
        if (l.Lo === 1) {
            var J = E[1]
              , K = E[2];
            E = E[3];
            v.getAttribute("t");
            J.getAttribute("t");
            K.getAttribute("t");
            E.getAttribute("t");
            v.getAttribute("p");
            J.getAttribute("p");
            E.getAttribute("p");
            T = T[K.getAttribute("p")];
            v = zTP(v.textContent, J.textContent, K.textContent, E.textContent, T);
            return new JH(B,q,U,A,v,z,l)
        }
        switch (l.Lo) {
        case 9:
        case 10:
            l.textEmphasis = 1;
            break;
        case 11:
            l.textEmphasis = 2;
            break;
        case 12:
            l.textEmphasis = 3;
            break;
        case 13:
            l.textEmphasis = 4;
            break;
        case 14:
            l.textEmphasis = 5
        }
        return new JH(B,q,U,A,v.textContent || "",z,l)
    }
      , zTP = function(B, q, A, z, U) {
        var E = g.Nk()
          , T = E ? g.QR("DIV") : g.QR("RUBY")
          , v = g.QR("SPAN");
        v.textContent = B;
        T.appendChild(v);
        B = E ? g.QR("DIV") : g.QR("RP");
        B.textContent = q;
        T.appendChild(B);
        q = E ? g.QR("DIV") : g.QR("RT");
        q.textContent = A;
        T.appendChild(q);
        A = U.Lo;
        if (A === 10 || A === 11 || A === 12 || A === 13 || A === 14)
            if (g.A6(q, "text-emphasis-style", "filled circle"),
            g.A6(q, "text-emphasis-color", "currentcolor"),
            g.A6(q, "webkit-text-emphasis", "filled circle"),
            U.Lo === 11 || U.Lo === 13)
                g.A6(q, "webkit-text-emphasis-position", "under left"),
                g.A6(q, "text-emphasis-position", "under left");
        A = !0;
        if (U.Lo === 4 || U.Lo === 7 || U.Lo === 12 || U.Lo === 14)
            g.A6(T, "ruby-position", "over"),
            g.A6(T, "-webkit-ruby-position", "before");
        else if (U.Lo === 5 || U.Lo === 6 || U.Lo === 11 || U.Lo === 13)
            g.A6(T, "ruby-position", "under"),
            g.A6(T, "-webkit-ruby-position", "after"),
            A = !1;
        U = E ? g.QR("DIV") : g.QR("RP");
        U.textContent = z;
        T.appendChild(U);
        E && (z = A,
        g.A6(T, {
            display: "inline-block",
            position: "relative"
        }),
        E = T.firstElementChild.nextElementSibling,
        g.A6(E, "display", "none"),
        E = E.nextElementSibling,
        g.A6(E, {
            "font-size": "0.5em",
            "line-height": "1.2em",
            "text-align": "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400%"
        }),
        g.A6(T.lastElementChild, "display", "none"),
        z ? (g.A6(T, "padding-top", "0.6em"),
        g.A6(E, "top", "0")) : (g.A6(T, "padding-bottom", "0.6em"),
        g.A6(E, "bottom", "0")));
        return T
    }
      , EwG = function(B) {
        var q = "_" + K2++;
        return new HQ(0,0x8000000000000,0,q,B)
    }
      , oo = function(B, q) {
        B = B.getAttribute(q);
        if (B != null)
            return Number(B)
    }
      , PQ = function(B, q) {
        B = B.getAttribute(q);
        if (B != null)
            return B === "1"
    }
      , f2 = function(B, q) {
        B = oo(B, q);
        return B !== void 0 ? B : null
    }
      , ao = function(B, q) {
        B = B.getAttribute(q);
        if (B != null)
            return sR.test(B),
            B
    }
      , T8N = function(B, q) {
        var A = {}
          , z = q.getAttribute("ws");
        Object.assign(A, z ? B.J[z] : B.K);
        B = f2(q, "mh");
        B != null && (A.bJ = B);
        B = f2(q, "ju");
        B != null && (A.textAlign = B);
        B = f2(q, "pd");
        B != null && (A.Bf = B);
        B = f2(q, "sd");
        B != null && (A.h4 = B);
        B = ao(q, "wfc");
        B != null && (A.windowColor = B);
        q = oo(q, "wfo");
        q !== void 0 && (A.windowOpacity = q / 255);
        return A
    }
      , vw0 = function(B, q) {
        var A = {}
          , z = q.getAttribute("wp");
        z && Object.assign(A, B.Y[z]);
        B = f2(q, "ap");
        B != null && (A.LY = B);
        B = oo(q, "cc");
        B != null && (A.KM = B);
        B = oo(q, "ah");
        B != null && (A.hO = B);
        B = oo(q, "rc");
        B != null && (A.lV = B);
        q = oo(q, "av");
        q != null && (A.qp = q);
        return A
    }
      , lnk = function(B, q, A, z) {
        var U = {};
        Object.assign(U, vw0(B, q));
        Object.assign(U, T8N(B, q));
        z ? g.dI(U, B.K) ? (z = B.S,
        U = B.K) : z = "_" + K2++ : z = q.getAttribute("id") || "_" + K2++;
        B = oo(q, "t") + A;
        q = oo(q, "d") || 0x8000000000000;
        if (U.Bf === 2 || U.Bf === 3)
            A = U.lV,
            U.lV = U.KM,
            U.KM = A;
        return new HQ(B,q,0,z,U)
    }
      , OR = function(B) {
        B = g.zt(Math.round(B), 0, 16777215).toString(16).toUpperCase();
        return "#000000".substring(0, 7 - B.length) + B
    }
      , Jkn = function(B, q, A, z, U) {
        z === 0 && (z = 0x8000000000000);
        var E = {};
        q.wpWinPosId && Object.assign(E, B.K.get(q.wpWinPosId));
        q.wsWinStyleId && Object.assign(E, B.S.get(q.wsWinStyleId));
        B = q.rcRowCount;
        B !== void 0 && (E.lV = B);
        q = q.ccColCount;
        q !== void 0 && (E.KM = q);
        if (E.Bf === 2 || E.Bf === 3)
            q = E.lV,
            E.lV = E.KM,
            E.KM = q;
        return new HQ(A,z,0,U,E)
    }
      , NM = function(B) {
        var q = B.byteOffset;
        B.byteOffset += 1;
        return B.G.getUint8(q)
    }
      , jm = function(B) {
        var q = B.byteOffset;
        B.byteOffset += 4;
        return B.G.getUint32(q)
    }
      , owP = function(B) {
        if (typeof B === "string")
            return !1;
        B = new KPk(B,0);
        return H8c(B)
    }
      , H8c = function(B) {
        if (!(B.byteOffset < B.G.byteLength) || jm(B) !== 1380139777)
            return !1;
        B.version = NM(B);
        if (B.version > 1)
            return !1;
        NM(B);
        NM(B);
        NM(B);
        return !0
    }
      , P40 = function(B, q) {
        if (!q)
            return "";
        B.S && B.O.params.h4 !== 1 && (q *= -1);
        return `translate${B.S ? "X" : "Y"}(${q}px)`
    }
      , fnP = function(B) {
        B.bc = Array.from(B.element.getElementsByClassName("caption-visual-line"));
        for (var q = B.O.params.lV, A = 0, z = 0, U = B.bc.length - 1; A < q && U > -1; ) {
            var E = B.bc[U];
            z += B.S ? E.offsetWidth : E.offsetHeight;
            A++;
            U--
        }
        B.uc = z;
        q = Math;
        A = q.max;
        isNaN(B.xf) && ((z = B.G.KM) ? (U = g.QR("SPAN"),
        g.wI(U, "\u2013".repeat(z)),
        g.A6(U, rDW(B, B.G.WZ)),
        B.K.appendChild(U),
        B.xf = U.offsetWidth,
        B.K.removeChild(U)) : B.xf = 0);
        z = B.K;
        B.OO = A.call(q, B.xf, B.Z4, (B.S ? z.offsetHeight : z.offsetWidth) + 1)
    }
      , sEW = function(B, q) {
        fnP(B);
        var A = B.bc.reduce( (z, U) => (B.S ? U.offsetWidth : U.offsetHeight) + z, 0);
        A = B.uc - A;
        if (A !== B.fn) {
            let z = A > 0 && B.fn === 0
              , U = A < B.fn;
            q || isNaN(A) || z || !U || (g.GW(B.element, "ytp-rollup-mode"),
            B.lc(B.element, "transitionend", B.Fw));
            g.A6(B.K, "transform", P40(B, A));
            B.fn = A
        }
        fnP(B)
    }
      , O80 = function(B, q, A, z) {
        var {formatId: U, Kn: E, startTimeMs: T, durationMs: v} = B.N(q)
          , l = {
            formatId: U,
            startTimeMs: T,
            durationMs: v,
            Q5: E,
            Co: E
        }
          , J = anl(B.Ed, l.startTimeMs)
          , K = J >= 0 ? B.Ed[J] : null
          , H = K ? K.startTimeMs + K.durationMs : 0
          , P = l.startTimeMs + l.durationMs;
        !K || l.startTimeMs - H > B.K ? B.Ed.splice(J + 1, 0, l) : (K.durationMs = Math.max(H, P) - K.startTimeMs,
        K.Co = Math.max(K.Co, l.Co));
        z(B.Ed);
        z = g.z6(q);
        B = B.S;
        z = z.buffer.slice(z.byteOffset, z.byteLength + z.byteOffset);
        q = q.info.Z;
        B.L ? B.Y == null ? g.Bg(B.logger, 350058965, "Null loaded track meta data at captions data received") : A.CZ(z, B.Y, q * 1E3) : g.Bg(B.logger, 350058965, "Null Representation at captions data received")
    }
      , GbJ = function(B, q) {
        B.O = (A, z) => {
            if (B.di.j().experiments.zg("html5_sabr_live_support_subfragmented_captions"))
                (B.G ? B.G = B.G.S(A) : (B.G = A,
                N8W(B.G)),
                B.G) ? A.info.ut && (jEk(B.G),
                O80(B, B.G, q, z),
                B.G = null) : g.Bg(B.logger, 350058965, "Empty slice");
            else if (A.info.ut) {
                var U = A;
                if (B.df.length > 0) {
                    for (U = B.df.shift(); B.df.length > 0; )
                        U = U.S(B.df.shift());
                    U = U.S(A)
                }
                U ? (N8W(U),
                jEk(U),
                O80(B, U, q, z)) : g.Bg(B.logger, 350058965, "Empty slice")
            } else
                B.df.push(A)
        }
        ;
        B.di.addEventListener("sabrCaptionsDataLoaded", B.O)
    }
      , anl = function(B, q) {
        B = g.qq(B, {
            startTimeMs: q
        }, (A, z) => A.startTimeMs - z.startTimeMs);
        return B >= 0 ? B : -B - 2
    }
      , N8W = function(B) {
        try {
            var q = g.vg(B) * 1E3
        } catch (A) {
            q = B.info.startTime * 1E3
        }
        q < 0 && (q = B.info.startTime * 1E3);
        B.info.startTime = q / 1E3;
        B.info.Z = q / 1E3
    }
      , jEk = function(B) {
        try {
            var q = g.o9(B) * 1E3
        } catch (A) {
            q = B.info.duration * 1E3
        }
        q < 0 && (q = B.info.duration * 1E3);
        B.info.duration = q / 1E3;
        B.info.X = q / 1E3
    }
      , mun = function(B, q) {
        if (!g.dB(B) || B.G != null && g.Vd(q, B.G) && B.G.G.rawcc != null)
            return !1;
        q = !!B.G && B.G.isManifestless && Object.values(B.G.G).some(A => g.So(A, "386"));
        B = !!B.G && !B.G.isManifestless && g.hN(B.G);
        return q || B
    }
      , gwE = function(B, q, A) {
        var z = [];
        for (let U in B.O.G) {
            if (!B.O.G.hasOwnProperty(U))
                continue;
            let E = B.O.G[U];
            if (g.So(E, A || null)) {
                let T = E.info.captionTrack;
                T && T.languageCode === q && z.push(E)
            }
        }
        return z.length ? z[0] : null
    }
      , YTE = function(B, q) {
        var A = [];
        for (let U in B.O.G) {
            if (!B.O.G.hasOwnProperty(U))
                continue;
            var z = B.O.G[U];
            if (g.So(z, q || null)) {
                let E = z.info.id
                  , T = E
                  , v = `.${E}`
                  , l = ""
                  , J = "";
                if (z = z.info.captionTrack)
                    E = z.languageCode,
                    T = z.displayName,
                    v = z.vssId,
                    l = z.kind,
                    J = z.id;
                A.push(new g.ww({
                    id: U,
                    languageCode: E,
                    languageName: T,
                    is_servable: !0,
                    is_default: !0,
                    is_translateable: !1,
                    vss_id: v,
                    kind: l,
                    captionId: J
                }))
            }
        }
        return A
    }
      , duP = function(B) {
        var q = Mq0.length;
        if (B.byteLength < q)
            return !1;
        B = new Uint8Array(B,0,q);
        for (let A = 0; A < q; A++)
            if (Mq0[A] !== B[A])
                return !1;
        return !0
    }
      , G5 = function(B) {
        B = B.split(":");
        var q = 0;
        for (let A of B)
            q = q * 60 + Number(A);
        return q * 1E3
    }
      , C4k = function(B, q, A, z) {
        z = Object.assign({
            bJ: 0
        }, z);
        return new HQ(B,q,A,"_" + K2++,z)
    }
      , hT8 = function(B, q, A, z, U, E, T, v, l) {
        switch (T.tagName) {
        case "b":
            v.bold = !0;
            break;
        case "i":
            v.italic = !0;
            break;
        case "u":
            v.underline = !0
        }
        for (let K = 0; K < T.childNodes.length; K++) {
            var J = T.childNodes[K];
            if (J.nodeType === 3)
                J = new JH(q,A,z,U.id,J.nodeValue,E || K > 0,g.gI(v) ? void 0 : v),
                l.push(J),
                U.G.push(J);
            else {
                let H = {};
                Object.assign(H, v);
                hT8(B, q, A, z, U, !0, J, H, l)
            }
        }
    }
      , WPn = function(B, q, A) {
        if (typeof q === "string" || owP(q))
            return [{
                trackData: q,
                X4: A
            }];
        if (typeof q === "string" && q.substring(0, 6) === "WEBVTT" || typeof q !== "string" && duP(q))
            return [{
                trackData: q,
                X4: A
            }];
        var z = new DataView(q);
        if (z.byteLength <= 8 || z.getUint32(4) !== 1718909296)
            return [];
        var U = g.Vw(z);
        if (B.X1 && U) {
            var E = g.gF(U)
              , T = g.Yg(U);
            U = U.segmentNumber;
            E && U && B.X1.cO(U, E, T)
        }
        B = g.yw(z, 1835295092);
        if (!B || !B.length || !B[0].size)
            return [];
        E = [];
        for (T = 0; T < B.length; T++)
            U = B[T],
            U = new Uint8Array(q,U.dataOffset,U.size - (U.dataOffset - U.offset)),
            U = g.Bv(U),
            E.push({
                trackData: U,
                X4: A + T * 1E3
            });
        kbk(z, E, A);
        return E = E.filter(v => !!v.trackData)
    }
      , tqk = function(B, q, A) {
        B.G || (B.G = new LPW);
        B = B.G.Z(q, A);
        Math.random() < .01 && g.rn(Error("Deprecated subtitles format in web player: WebVTT"));
        return B
    }
      , kbk = function(B, q, A) {
        var z = g.Wy(B, 0, 1836476516)
          , U = 9E4;
        z && (U = g.ua(z) || 9E4);
        z = 0;
        var E = g.yw(B, 1836019558);
        for (let v = 0; v < E.length; v++) {
            var T = E[v];
            v < q.length && (T = g.Wy(B, T.dataOffset, 1953653094)) && (T = g.Wy(B, T.dataOffset, 1952867444)) && (T = g.IY(T) / U * 1E3,
            v === 0 && (z = T),
            q[v].X4 = T - z + A || A * v * 1E3)
        }
    }
      , uVc = function(B) {
        var q = {};
        if (B = g.u1(B))
            q.lang = B,
            g.urP.test(B) && (q.Bf = 1);
        return q
    }
      , eTN = function(B) {
        var q = !!B.di.F1()?.xf();
        return B.Z === "HLS" && q ? !0 : B.Ha && q && B.Z !== "LIVE" && B.Z !== "SABR_LIVE"
    }
      , mm = function(B, q, A=!1) {
        var z = B.U.B("enable_player_captions_new_style_defaults") ? Inn : RTN
          , U = z.WZ;
        B.S = {};
        Object.assign(B.S, z);
        B.S.WZ = {};
        Object.assign(B.S.WZ, U);
        B.N = {
            WZ: {}
        };
        var E = q.backgroundOverride ? B.N : B.S
          , T = q.background || U.background;
        sR.test(T);
        E.WZ.background = T;
        E = q.colorOverride ? B.N : B.S;
        T = q.color || U.color;
        sR.test(T);
        E.WZ.color = T;
        E = q.windowColorOverride ? B.N : B.S;
        T = q.windowColor || z.windowColor;
        sR.test(T);
        E.windowColor = T;
        E = q.backgroundOpacityOverride ? B.N : B.S;
        T = q.backgroundOpacity;
        T == null && (T = U.backgroundOpacity);
        E.WZ.backgroundOpacity = T;
        E = q.fontSizeIncrementOverride ? B.N : B.S;
        T = q.fontSizeIncrement;
        T == null && (T = U.fontSizeIncrement);
        E.WZ.fontSizeIncrement = T;
        T = q.fontStyleOverride ? B.N : B.S;
        E = q.fontStyle;
        E == null && (E = U.bold && U.italic ? 3 : U.bold ? 1 : U.italic ? 2 : 0);
        T = T.WZ;
        switch (E) {
        case 1:
            T.bold = !0;
            delete T.italic;
            break;
        case 2:
            delete T.bold;
            T.italic = !0;
            break;
        case 3:
            T.bold = !0;
            T.italic = !0;
            break;
        default:
            delete T.bold,
            delete T.italic
        }
        E = q.textOpacityOverride ? B.N : B.S;
        T = q.textOpacity;
        T == null && (T = U.textOpacity);
        E.WZ.textOpacity = T;
        E = q.windowOpacityOverride ? B.N : B.S;
        T = q.windowOpacity;
        T == null && (T = z.windowOpacity);
        E.windowOpacity = T;
        z = q.charEdgeStyleOverride ? B.N : B.S;
        E = q.charEdgeStyle;
        E == null && (E = U.charEdgeStyle);
        z.WZ.charEdgeStyle = E;
        z = q.fontFamilyOverride ? B.N : B.S;
        E = q.fontFamily;
        E == null && (E = U.fontFamily);
        z.WZ.fontFamily = E;
        B.loaded && B.Yf();
        A && g.HO("yt-player-caption-display-settings", q, 2592E3)
    }
      , g9 = function(B, q, A) {
        q && !B.C ? (q = EwG({
            Bf: 0,
            lang: "en"
        }),
        B.C = [q, new JH(q.start,q.end - q.start,0,q.id,A ?? "Captions look like this")],
        B.player.nY(B.C)) : !q && B.C && (ykc(B, B.C),
        B.C = null)
    }
      , rkP = function(B) {
        if (B.U.B("enable_player_captions_persistence_state_machine")) {
            var q = g.oN("yt-player-caption-persistence");
            if (q == null) {
                let A = g.NG().MW(65);
                if (A === !0)
                    q = !1;
                else {
                    let z = g.Ex(B.U) ? YZ(B) : QEk(B);
                    z != null ? q = !!z : A === !1 && (q = !0)
                }
                q !== void 0 && MM(B, q)
            }
            return q
        }
    }
      , YZ = function(B) {
        if (!B.di.isInline())
            return g.oN("yt-player-sticky-caption")
    }
      , QEk = function(B) {
        if (!B.storage)
            return null;
        try {
            var q = B.storage.get("module-enabled")
        } catch (A) {
            B.storage.remove("module-enabled")
        }
        return q
    }
      , d9 = function(B) {
        if (B.U.B("enable_player_captions_persistence_state_machine"))
            return rkP(B);
        var q = void 0
          , A = g.NG().MW(65);
        if (g.Ex(B.U) && A != null) {
            if (YZ(B) != null)
                return !1;
            q = !A
        }
        return q
    }
      , Vq0 = function(B) {
        if (B.U.T0 === 1 || B.videoData.Ma === 1 || g.NR(B.videoData, "yt:cc") === "alwayson")
            return !0;
        if (B.videoData.captionTracks.length)
            var q = B.getAudioTrack().O;
        if (B.U.B("enable_player_captions_persistence_state_machine")) {
            var A = rkP(B);
            if (A !== void 0)
                return !!A
        } else if (B.U.T0 === 2 && (g.Ex(B.U) ? A = YZ(B) : A = QEk(B),
        A != null))
            return !!A;
        A = Zd(B.player.getAudioTrack(), g.Ex(B.U));
        var z = g.NR(B.videoData, "yt:cc");
        if (d9(B) === void 0) {
            if (A === "CAPTIONS_INITIAL_STATE_ON_RECOMMENDED")
                return z ? z === "on" : !0;
            if (A === "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED")
                return z === "on"
        } else
            return z === "on";
        return q === "ON" || g.NR(B.videoData, "yt:cc") === "on"
    }
      , C2 = function(B, q=!1) {
        if (B.O && !q || !B.videoData.captionTracks.length)
            return !1;
        B = B.getAudioTrack();
        return !!B.G || B.O === "FORCED_ON"
    }
      , STc = function(B) {
        return B.U.B("html5_honor_caption_availabilities_in_audio_track") && B.Z !== "LIVE" && B.Z !== "SABR_LIVE"
    }
      , xul = function(B, q) {
        if (B.O) {
            var A = B.di.F1().m8().textTracks
              , z = null;
            B.Z === "HLS" ? z = B.O.getId() : z = B.O.toString();
            for (let E = 0; E < A.length; E++) {
                var U = A[E];
                U.id === z && (q ? U.mode !== "showing" && (U.mode = "showing",
                U = B.O,
                B.R5(U, !!U, hH(B) ? "g" : B.Y ? "m" : "s")) : U.mode === "showing" && (U.mode = "disabled"))
            }
        }
    }
      , hH = function(B) {
        var q = kZ(B);
        return !!q && B.O === q
    }
      , b8G = function(B, q) {
        if (B.Z === "HLS")
            return !1;
        g.gB(B.videoData) && (q = !0);
        q || (q = B.Z === "TTS" ? !1 : B.Z === "INNERTUBE" ? !1 : !0);
        return q || B.U.B("web_watch_disable_account_level_captions_settings") && g.Ex(B.U) ? !0 : !!g.NG().MW(66)
    }
      , kZ = function(B) {
        return B.J && B.J.G
    }
      , WQ = function(B, q) {
        if (!B.G)
            return null;
        if (B.J && B.J.K)
            return B.J.K;
        q = b8G(B, q);
        q = B.G.G.G(q);
        var A = null;
        if (Oel(B.U)) {
            var z = B.di.isInline() ? void 0 : g.oN("yt-player-caption-sticky-language");
            var U = [z, B.videoData.captionsLanguagePreference, B.U.captionsLanguagePreference, g.NR(B.videoData, "yt:cc_default_lang")];
            let v = !1;
            for (let l = 0; l < U.length; l++) {
                let J = U[l];
                if (J) {
                    v = !0;
                    for (var E = 0; E < q.length; E++)
                        if (g.u1(q[E]) === J)
                            return q[E];
                    for (E = 0; E < q.length; E++)
                        if (g.u1(q[E]).split("-")[0] === J.split("-")[0])
                            return q[E]
                }
            }
            if (v && B.G && (U = B.G.J,
            U.length))
                for (var T of U)
                    if (T.languageCode === z) {
                        A = T;
                        break
                    }
        } else
            for (T = [B.videoData.captionsLanguagePreference, B.U.captionsLanguagePreference, g.NR(B.videoData, "yt:cc_default_lang")],
            z = 0; z < T.length; z++)
                for (U = 0; U < q.length; U++)
                    if (g.u1(q[U]) === T[z])
                        return q[U];
        T = null;
        B.J && B.J.Z && (T = B.J.Z);
        T || (T = q.find(v => v.isDefault) || null);
        T || (T = q[0] || kZ(B));
        T && A && g.u1(T).split("-")[0] !== A.languageCode.split("-")[0] && (T = aR8(T, A));
        return T
    }
      , em = function(B, q, A) {
        B.loaded && B.unload();
        A != null && (B.Y = A,
        B.Y && (B.U.B("enable_player_captions_persistence_state_machine") ? MM(B, !!q) : g.Ex(B.U) ? L2(B, !!q) : tH(B, !!q)));
        q !== null || C2(B, !0) || B.R5(q, !!q, B.Y ? "m" : "s");
        B.O = q;
        C2(B) && (B.O = kZ(B));
        uD(B, B.O ?? void 0);
        B.load()
    }
      , MM = function(B, q) {
        B.U.B("enable_player_captions_persistence_state_machine") && g.HO("yt-player-caption-persistence", q, 3122064E3)
    }
      , L2 = function(B, q) {
        B.di.isInline() || g.HO("yt-player-sticky-caption", q, 2592E3)
    }
      , tH = function(B, q) {
        if (B.storage)
            try {
                B.storage.set("module-enabled", q)
            } catch (A) {}
    }
      , uD = function(B, q) {
        B.U.B("html5_modify_caption_vss_logging") && (B.videoData.ju = q)
    }
      , ckP = function(B, q) {
        var A = B.uc[q.id];
        A && A.O !== q && (A.dispose(),
        delete B.uc[q.id],
        A = null);
        A || (A = wNJ(B, q)) && (B.uc[q.id] = A)
    }
      , pNk = function(B, q) {
        var A = q.windowId;
        B.eg[A] || (B.eg[A] = []);
        B.eg[A].push(q)
    }
      , wNJ = function(B, q) {
        var A = i8E(B);
        if (!A)
            return null;
        var z = B.O ? g.u1(B.O) : null;
        z && g.urP.test(z) && (q.params.Bf = 1);
        var U = B.Fw.getPlayerSize();
        z = U.height * B.L.height;
        U = U.width * B.L.width;
        B.U.playerStyle !== "google-live" || B.S.isDefault || Object.assign(q.params, B.S);
        switch (q.params.bJ != null ? q.params.bJ : q.G.length > 1 ? 1 : 0) {
        case 1:
            return new Z80(q,B.S,B.N,A.width,A.height,U,z,B.U.experiments,B.jg.bind(B),B.di);
        case 2:
            return new nwc(q,B.S,B.N,A.width,A.height,U,z,B.U.experiments,B.jg.bind(B),B.di);
        default:
            return new Io(q,B.S,B.N,A.width,A.height,U,z,B.U.experiments,B.jg.bind(B),B.di)
        }
    }
      , i8E = function(B) {
        var q = B.Fw.getVideoContentRect(!0).height
          , A = B.Fw.getVideoContentRect(!0).width;
        if (!q || !A)
            return null;
        q *= B.L.height;
        A *= B.L.width;
        return {
            width: A,
            height: q
        }
    }
      , ykc = function(B, q) {
        B.player.CN(q);
        for (let A of q)
            g.wA(B.bc, A);
        X7(B.xf)
    }
      , XNJ = function(B, q) {
        if (!B.G)
            return {};
        if (q) {
            g.gI(q) || B.pC(q.vss_id, "m");
            if (B.K && B.Z !== "HLS" || !g.m8(q))
                return;
            if (g.gI(q)) {
                em(B, null, !0);
                return
            }
            let z;
            var A = B.G.G.G(!0);
            for (let U = 0; U < A.length; U++) {
                let E = A[U];
                E.languageCode !== q.languageCode || z && (E.languageName !== q.languageName || (E.captionId || "") !== (q.captionId || "") || g.t7(E) !== q.displayName) || (z = q.translationLanguage ? aR8(E, q.translationLanguage) : E)
            }
            B.Yk(q.position);
            !z || z === B.O && B.loaded || (q = g.Kp(),
            A = g.u1(z),
            q.length && A === q[q.length - 1] || (q.push(A),
            g.HO("yt-player-caption-language-preferences", q)),
            Oel(B.U) && !B.di.isInline() && g.HO("yt-player-caption-sticky-language", A, 2592E3),
            em(B, z, !0))
        } else
            return B.loaded && B.O && !hH(B) ? iy(B.O) : {};
        return ""
    };
    g.h5.prototype.cO = g.zG(82, function(B, q, A) {
        this.O.set(B, {
            KW: q,
            kz: A
        })
    });
    g.kI.prototype.cO = g.zG(81, function(B, q, A) {
        this.C.cO(B, q, A)
    });
    g.Il.prototype.J = g.zG(80, function() {
        this.mediaElement.J()
    });
    g.Ww.prototype.J = g.zG(79, function() {
        var B = g.eU(document, "track", void 0, this.G);
        for (let q = 0; q < B.length; q++)
            g.xG(B[q])
    });
    g.Il.prototype.Pa = g.zG(78, function() {
        return this.mediaElement.Pa()
    });
    g.Ww.prototype.Pa = g.zG(77, function() {
        return !(!this.G.textTracks || !this.G.textTracks.addEventListener)
    });
    g.Il.prototype.xf = g.zG(76, function() {
        return this.mediaElement.xf()
    });
    g.Ww.prototype.xf = g.zG(75, function() {
        return !!this.G.textTracks
    });
    g.Il.prototype.uc = g.zG(74, function(B) {
        this.mediaElement.uc(B)
    });
    g.Ww.prototype.uc = g.zG(73, function(B) {
        for (let q = 0; q < B.length; q++)
            this.G.appendChild(B[q])
    });
    g.A5.prototype.pC = g.zG(31, function(B, q) {
        this.app.Jc().pC(B, q)
    });
    g.Hf.prototype.pC = g.zG(30, function(B, q) {
        this.D.pC(B, q)
    });
    g.sS.prototype.pC = g.zG(29, function(B, q) {
        B = [B, q];
        g.Zh(this, g.Xj(this.provider), "cfi", B)
    });
    g.jV.prototype.pC = g.zG(28, function(B, q) {
        this.qoe && this.qoe.pC(B, q)
    });
    g.Km.prototype.pC = g.zG(27, function(B, q) {
        this.HG.pC(B, q)
    });
    g.MD.prototype.pC = g.zG(26, function() {});
    g.A5.prototype.R5 = g.zG(25, function(B, q, A) {
        this.app.Jc().R5(B, q, A)
    });
    g.Hf.prototype.R5 = g.zG(24, function(B, q, A) {
        this.D.R5(B, q, A)
    });
    g.sS.prototype.R5 = g.zG(23, function(B, q, A) {
        if (this.fn !== B || this.D0 !== q)
            q = q === "rawcc" ? "" : q,
            A = [B, q, this.fn, A],
            g.Zh(this, g.Xj(this.provider), "cfs", A),
            this.fn = B,
            this.D0 = q
    });
    g.jV.prototype.R5 = g.zG(22, function(B, q, A) {
        this.qoe && this.qoe.R5(B, q, A)
    });
    g.Km.prototype.R5 = g.zG(21, function(B, q, A) {
        this.HG.R5(B, q, A)
    });
    g.MD.prototype.R5 = g.zG(20, function() {});
    g.vN.prototype.Wl = g.zG(8, function() {
        return this.X1
    });
    g.t5.prototype.Wl = g.zG(7, function() {
        return this.Jc().iq()
    });
    g.A5.prototype.iq = g.zG(6, function() {
        return this.app.Wl()
    });
    g.Hf.prototype.iq = g.zG(5, function() {
        return this.D.iq()
    });
    g.Km.prototype.iq = g.zG(4, function() {
        return this.loader?.Wl() || null
    });
    g.MD.prototype.iq = g.zG(3, function() {
        return null
    });
    g.xk.prototype.v1 = g.zG(2, function(B) {
        return (B = this.Z(B)) ? B.G : 0
    });
    g.bI.prototype.v1 = g.zG(1, function() {
        return 0
    });
    g.eE(nn, g.W);
    g.h = nn.prototype;
    g.h.start = function() {
        this.stop();
        this.K = !1;
        var B = mwc(this)
          , q = gqW(this);
        B && !q && this.O.mozRequestAnimationFrame ? (this.G = g.mD(this.O, "MozBeforePaint", this.Z),
        this.O.mozRequestAnimationFrame(null),
        this.K = !0) : this.G = B && q ? B.call(this.O, this.Z) : this.O.setTimeout(GCJ(this.Z), 20)
    }
    ;
    g.h.stop = function() {
        if (this.isActive()) {
            let B = mwc(this)
              , q = gqW(this);
            B && !q && this.O.mozRequestAnimationFrame ? g.Wz(this.G) : B && q ? q.call(this.O, this.G) : this.O.clearTimeout(this.G)
        }
        this.G = null
    }
    ;
    g.h.isActive = function() {
        return this.G != null
    }
    ;
    g.h.xU = function() {
        this.K && this.G && g.Wz(this.G);
        this.G = null;
        this.N.call(this.S, g.WW())
    }
    ;
    g.h.qW = function() {
        this.stop();
        nn.FZ.qW.call(this)
    }
    ;
    var MY0 = /#(.)(.)(.)/
      , YgP = /^#(?:[0-9a-f]{3}){1,2}$/i
      , e4k = {
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
      , DuN = class {
        constructor() {
            this.Z = [];
            this.O = []
        }
        G(B) {
            return B ? this.O.concat(this.Z) : this.O
        }
    }
      , Ro = class extends g.W {
        constructor(B) {
            super();
            this.Xw = B;
            this.G = new DuN;
            this.OO = new DuN;
            this.S = null;
            this.J = [];
            this.uc = []
        }
        X() {}
        K() {}
        Z() {}
        N() {
            return ""
        }
        ZT() {
            return !1
        }
        X6(B, q) {
            if (this.Xw.j().B("html5_dispatch_tracklist_loaded_event")) {
                this.S && (this.S.reject(),
                this.S = null);
                var A = [];
                this.Xw.IV("trackListLoaded", this.G, A, q);
                this.Xw.j().B("enable_po_decoration_of_forced_tracks") && this.Xw.IV("trackListLoaded", this.OO, A, q);
                A.length ? (q = new g.gJ,
                q.promise.then(B.X6, () => {}
                ),
                this.S = q,
                Promise.all(A).then(q.resolve, q.reject).finally( () => {
                    this.S = null
                }
                )) : B.X6()
            } else
                B.X6()
        }
        qW() {
            this.S && (this.S.reject(),
            this.S = null);
            this.Z();
            super.qW()
        }
    }
      , BNG = {
        en: "English"
    }
      , qVW = class extends Ro {
        constructor(B) {
            super(B);
            this.O = new Set
        }
        K(B) {
            var q = this.Xw.F1();
            if (q && q.m8()) {
                q = q.m8().textTracks;
                for (let A of q)
                    A.kind === "subtitles" && !this.O.has(A.language) && A.language && (qM(this.G, new g.ww({
                        languageCode: A.language,
                        languageName: A.language,
                        kind: A.kind,
                        id: A.id,
                        displayName: BNG[A.label] || A.label,
                        vss_id: `.${A.language}`
                    })),
                    this.O.add(A.language))
            }
            this.G.G().length > 0 && B.X6()
        }
    }
      , AhP = class extends Ro {
        constructor(B, q, A) {
            super(B);
            this.videoData = q;
            this.audioTrack = A;
            this.O = null;
            this.Y = !1;
            this.J = q.Xd;
            this.uc = q.wC;
            this.Y = g.gB(q)
        }
        X(B, q, A) {
            this.gi();
            q = this.N(B, q);
            var z = this.Xw.j().B("html5_report_captions_ctmp_qoe")
              , U = (0,
            g.w)();
            this.Z();
            h4P(this, q, {
                format: "RAW",
                onSuccess: E => {
                    this.O = null;
                    if (z) {
                        var T = (E.responseText.length / 1024).toFixed();
                        let v = (0,
                        g.w)();
                        this.videoData.A("capresp", {
                            ms: v - U,
                            kb: T
                        })
                    }
                    T = E.getResponseHeader && E.getResponseHeader("Content-Length") ? Number(E.getResponseHeader("Content-Length")) : 0;
                    A.CZ(E.responseText, B, void 0, void 0, T)
                }
                ,
                onError: z ? E => {
                    this.videoData.A("capfail", {
                        status: E?.status ?? 0
                    })
                }
                : void 0,
                withCredentials: !0
            })
        }
        K(B) {
            if (this.audioTrack) {
                for (let q of this.audioTrack.captionTracks)
                    qM(this.G, q);
                this.audioTrack.G && qM(this.OO, this.audioTrack.G)
            }
            this.X6(B, this.videoData.videoId)
        }
        N(B, q) {
            var A = B.XP()
              , z = {
                fmt: q
            };
            if (q === "srv3" || q === "3" || q === "json3")
                g.Nk() ? Object.assign(z, {
                    xorb: 2,
                    xobt: 1,
                    xovt: 1
                }) : Object.assign(z, {
                    xorb: 2,
                    xobt: 3,
                    xovt: 3
                });
            B.translationLanguage && (z.tlang = g.u1(B));
            this.Y && (z.xosf = "1");
            Object.assign(z, this.Xw.j().G);
            return g.YQ(A, z)
        }
        Z() {
            this.O && this.O.abort()
        }
    }
      , $U0 = class {
        constructor() {
            this.segments = []
        }
        contains(B) {
            B = g.qq(this.segments, B);
            return B >= 0 || B < 0 && (-B - 1) % 2 === 1
        }
        length() {
            return this.segments.length / 2
        }
    }
      , zc0 = class extends g.W {
        constructor(B, q, A, z, U, E) {
            super();
            this.policy = B;
            this.player = q;
            this.W = A;
            this.Y = z;
            this.S = U;
            this.L = E;
            this.K = new $U0;
            this.N = -1;
            this.O = this.Z = this.G = null;
            this.uc = 0;
            this.X = new g.fE(this.J,1E3,this);
            this.events = new g.w0(this);
            g.t(this, this.X);
            g.t(this, this.events);
            this.events.lc(q, "SEEK_COMPLETE", this.C);
            this.C();
            this.J()
        }
        qW() {
            super.qW();
            this.O && this.O.cancel()
        }
        C() {
            this.seekTo(this.player.getCurrentTime())
        }
        seekTo(B) {
            B -= this.player.xi();
            var q = this.G;
            this.G = g.tn(this.W.N(B).pn);
            q !== this.G && this.L && this.L()
        }
        reset() {
            this.K = new $U0;
            this.N = -1;
            this.O && (this.O.cancel(),
            this.O = null)
        }
        J() {
            this.gi();
            var B;
            if (B = this.G != null)
                B = this.G,
                B = B.W.K(B);
            if (B && !this.O && !(this.G && this.G.startTime - this.player.getCurrentTime() > 30)) {
                B = this.G;
                B = B.W.bc(B);
                let U = B.pn[0];
                if (this.player.getVideoData()?.enableServerStitchedDai) {
                    var q = this.player.iq();
                    if (q) {
                        var A = U.W.info.id;
                        let E = U.Kn;
                        var z = B.pn[0].Z;
                        if (this.policy.bc) {
                            if (q = g.EX(q, z, E, A, 3))
                                B.K = q
                        } else if (A = q.oH(z, E, A, 3))
                            if (z = 2,
                            q.fJ.has(E) ? z = 0 : g.Pa(q, E) && (z = 1),
                            q = z,
                            q === 0)
                                A && (B.G = new g.Xz(A));
                            else if (q === 2) {
                                this.X.start();
                                WVc(this) && this.seekTo(this.player.getCurrentTime());
                                return
                            }
                    }
                }
                U.W.index.J2(U.Kn) ? (this.K.contains(B.pn[0].Kn) || LVN(this, B),
                this.G = g.tn(B.pn)) : WVc(this) && this.seekTo(this.player.getCurrentTime())
            }
            this.X.start()
        }
    }
      , UUG = class extends Ro {
        constructor(B, q) {
            super(q);
            this.O = B;
            this.di = q;
            this.Y = null;
            this.C = !1;
            this.logger = new g.D$("caps");
            this.L = g.Vd(this.di, this.O)
        }
        X(B, q, A) {
            this.Z();
            q = tYJ(this, B.getId());
            q || (q = B.languageCode,
            q = this.O.isManifestless ? uMW(this, q, "386") : uMW(this, q));
            if (q) {
                var z = (q.index.v1(q.index.Td()) - q.index.getStartTime(q.index.Td())) * 1E3
                  , U = new g.Tb(this.di.j());
                this.Y = new zc0(U,this.di,q, (E, T) => {
                    A.CZ(E, B, T, z)
                }
                ,this.L || g.$8(q.info), () => {
                    this.Y && this.Y.reset();
                    this.C = !0
                }
                )
            }
        }
        ZT() {
            var B = this.C;
            this.C = !1;
            return B
        }
        K(B) {
            var q = this.di.j().B("html5_fallback_if_rawcc_missing");
            var A = this.O.G.rawcc != null;
            if (!this.L || !A && q)
                q = this.O.isManifestless ? IR0(this, "386") : IR0(this);
            else {
                if (!A) {
                    g.Bg(this.logger, 386248249, "rawcc used but unavailable");
                    return
                }
                q = [new g.ww({
                    id: "rawcc",
                    languageCode: "rawcc",
                    languageName: "CC1",
                    is_servable: !0,
                    is_default: !0,
                    is_translateable: !1,
                    vss_id: ".en"
                }), new g.ww({
                    id: "rawcc",
                    languageCode: "rawcc",
                    languageName: "CC3",
                    is_servable: !0,
                    is_default: !0,
                    is_translateable: !1,
                    vss_id: ".en"
                })]
            }
            for (let z of q)
                qM(this.G, z);
            B.X6()
        }
        Z() {
            this.Y && (this.Y.dispose(),
            this.Y = null)
        }
        N() {
            return ""
        }
    }
      , EON = class extends Ro {
        constructor(B, q, A, z, U, E) {
            super(B);
            this.videoId = A;
            this.C = U;
            this.eventId = E;
            this.L = {};
            this.O = null;
            B = z || g.mn(q).hl || "";
            B = B.split("_").join("-");
            this.Y = g.YQ(q, {
                hl: B
            })
        }
        X(B, q, A) {
            this.gi();
            q = this.N(B, q);
            this.Z();
            this.O = g.c9(q, {
                format: "RAW",
                onSuccess: z => {
                    this.O = null;
                    var U = z.getResponseHeader && z.getResponseHeader("Content-Length") ? Number(z.getResponseHeader("Content-Length")) : 0;
                    A.CZ(z.responseText, B, void 0, void 0, U)
                }
                ,
                withCredentials: !0
            })
        }
        K(B) {
            var q = this.Y
              , A = {
                type: "list",
                tlangs: 1,
                v: this.videoId,
                vssids: 1
            };
            this.C && (A.asrs = 1);
            q = g.YQ(q, A);
            this.Z();
            this.O = g.c9(q, {
                format: "RAW",
                onSuccess: z => {
                    this.O = null;
                    if ((z = z.responseXML) && z.firstChild) {
                        var U = z.getElementsByTagName("track");
                        for (var E = 0; E < U.length; E++) {
                            var T = U[E]
                              , v = T.getAttribute("lang_code");
                            let l = T.getAttribute("lang_translated")
                              , J = T.getAttribute("name")
                              , K = T.getAttribute("kind")
                              , H = T.getAttribute("id")
                              , P = T.getAttribute("lang_default") === "true"
                              , f = T.getAttribute("cantran") === "true";
                            T = T.getAttribute("vss_id");
                            qM(this.G, new g.ww({
                                languageCode: v,
                                languageName: l,
                                name: J,
                                kind: K,
                                id: H,
                                is_servable: !0,
                                is_translateable: f,
                                vss_id: T,
                                is_default: P
                            }))
                        }
                        z = z.getElementsByTagName("target");
                        U = z.length;
                        for (E = 0; E < U; E++)
                            v = {
                                languageCode: z[E].getAttribute("lang_code"),
                                languageName: z[E].getAttribute("lang_translated"),
                                languageOriginal: z[E].getAttribute("lang_original"),
                                id: z[E].getAttribute("id"),
                                isDefault: z[E].getAttribute("lang_default") === "true"
                            },
                            this.L[v.languageCode] = v.languageName,
                            this.J.push(v)
                    }
                    this.X6(B, this.videoId)
                }
                ,
                withCredentials: !0
            })
        }
        N(B, q) {
            var A = this.Y;
            q = {
                v: this.videoId,
                type: "track",
                lang: B.languageCode,
                name: B.getName(),
                kind: B.kind,
                fmt: q
            };
            var z = this.Xw.j();
            z.B("captions_url_add_ei") && (q.ei = this.eventId);
            B.translationLanguage && (q.tlang = g.u1(B));
            Object.assign(q, z.G);
            return A = g.YQ(A, q)
        }
        Z() {
            this.O && this.O.abort()
        }
    }
      , sR = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var TNn = ["left", "right", "center", "justify"];
    var JH = class extends g.tz {
        constructor(B, q, A, z, U, E=!1, T=null) {
            super(B, B + q, {
                priority: A,
                namespace: "captions"
            });
            this.windowId = z;
            this.text = U;
            this.append = E;
            this.G = T
        }
        toString() {
            return super.toString()
        }
    }
    ;
    var Io = class extends g.$I {
        constructor(B, q, A, z, U, E, T, v, l, J) {
            var K = J.isInline() && !0
              , H = {};
            Object.assign(H, q);
            Object.assign(H, B.params);
            Object.assign(H, A);
            var P = {};
            Object.assign(P, q.WZ);
            B.params.WZ && Object.assign(P, B.params.WZ);
            Object.assign(P, A.WZ);
            K && (H.windowOpacity = .6,
            P.backgroundOpacity = 0);
            H.WZ = P;
            var f = H.Bf === 1
              , G = [{
                V: "span",
                Gg: "captions-text",
                Tg: {
                    style: "word-wrap: normal; display: block;"
                }
            }]
              , k = v.zg("caption_edit_on_hover") && J.getVideoData().getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.openTranscriptCommand;
            k && G.unshift({
                V: "button",
                Gg: "caption-edit",
                Tg: {
                    tabindex: "0",
                    "aria-label": dwk()
                },
                hc: [{
                    V: "svg",
                    Tg: {
                        fill: "#e3e3e3",
                        height: "100%",
                        viewBox: "5 5 38 38",
                        width: "100%"
                    },
                    hc: [{
                        V: "path",
                        Tg: {
                            d: "M9 39h2.2l24.25-24.25-1.1-1.1-1.1-1.1L9 36.8Zm-3 3v-6.4L35.4 6.2q.85-.85 2.12-.82 1.27.02 2.12.87L41.8 8.4q.85.85.85 2.1t-.85 2.1L12.4 42Zm33.5-31.55L37.45 8.4Zm-4.05 4.3-1.1-1.1-1.1-1.1 2.2 2.2Z"
                        }
                    }]
                }]
            });
            super({
                V: "div",
                Gg: "caption-window",
                Tg: {
                    id: `caption-window-${B.id}`,
                    dir: f ? "rtl" : "ltr",
                    tabindex: "0",
                    lang: H.lang
                },
                hc: G
            });
            this.experiments = v;
            this.J = [];
            this.Pa = !1;
            this.O = B;
            this.Ha = this.Sg = null;
            this.Bs = E;
            this.E8 = T;
            this.N = null;
            this.maxWidth = E * .96;
            this.maxHeight = T * .96;
            this.G = H;
            this.RC = A;
            this.ZT = q;
            this.K = this.sO("captions-text");
            B = this.K.style;
            this.yM = v.zg("enable_player_captions_new_style_defaults") && ("boxDecorationBreak"in B || "WebkitBoxDecorationBreak"in B);
            this.aV = R4l(z, U, E, T);
            this.nk = l;
            k && (this.X = this.sO("caption-edit"),
            this.lc(this.X, "click", () => {
                this.nk()
            }
            ));
            this.type = 0;
            this.jg = this.aV * yDk(P);
            this.m0 = K;
            this.VM = v.zg("enable_centered_caption_for_tvfilm_video") && J.getVideoData().isTvfilmVideo;
            this.L = J.j().Ac().G.MW(g.uQN);
            z = new g.mH(this.element,!0);
            g.t(this, z);
            z.subscribe("dragstart", this.wX, this);
            z.subscribe("dragmove", this.Hs, this);
            z.subscribe("dragend", this.Ps, this);
            this.cG = this.gP = this.bF = this.hT = 0;
            z = "";
            this.G.windowOpacity && (z = Dd(this.G.windowColor),
            z = "rgba(" + z[0] + "," + z[1] + "," + z[2] + "," + this.G.windowOpacity + ")");
            U = {
                "background-color": z,
                display: this.G.isVisible === !1 ? "none" : "",
                "text-align": TNn[this.G.textAlign]
            };
            this.yM && (U["border-radius"] = z ? `${this.jg * .375}px` : "");
            (this.S = this.O.params.Bf === 2 || this.O.params.Bf === 3) && Q8P(this, this.element);
            g.A6(this.element, U);
            K && this.element.parentElement?.style.setProperty("--caption-window-color", z);
            switch (this.G.LY) {
            case 0:
            case 1:
            case 2:
                g.GW(this.element, "ytp-caption-window-top");
                break;
            case 6:
            case 7:
            case 8:
                g.GW(this.element, "ytp-caption-window-bottom")
            }
        }
        wX(B, q) {
            this.gP = B;
            this.cG = q;
            var A = g.Kh(this.element, this.element.parentElement);
            this.hT = B - A.x;
            this.bF = q - A.y
        }
        Hs(B, q) {
            if (B !== this.gP || q !== this.cG) {
                g.jf(this.element, "ytp-dragging") || g.GW(this.element, "ytp-dragging");
                var A = g.fh(this.element);
                B = B - this.hT - .02 * this.Bs;
                var z = q - this.bF - .02 * this.E8
                  , U = (B + A.width / 2) / this.maxWidth * 3;
                U = Math.floor(g.zt(U, 0, 2));
                var E = (z + A.height / 2) / this.maxHeight * 3;
                E = Math.floor(g.zt(E, 0, 2));
                q = U + E * 3;
                B = (B + U / 2 * A.width) / this.maxWidth;
                B = g.zt(B, 0, 1) * 100;
                A = (z + E / 2 * A.height) / this.maxHeight;
                A = g.zt(A, 0, 1) * 100;
                this.O.params.LY = q;
                this.O.params.qp = A;
                this.O.params.hO = B;
                this.O.params.isDefault = !1;
                this.G.LY = q;
                this.G.qp = A;
                this.G.hO = B;
                this.G.isDefault = !1;
                this.ZT.LY = q;
                this.ZT.qp = A;
                this.ZT.hO = B;
                this.ZT.isDefault = !1;
                this.Kk()
            }
        }
        Ps() {
            g.ge(this.element, "ytp-dragging")
        }
        Kk() {
            this.C(this.J)
        }
        C(B) {
            var q = this.m0 ? 0 : Math.min(this.Cr(), this.maxWidth)
              , A = this.D0()
              , z = this.m0;
            if (z) {
                var U = getComputedStyle(this.K.parentNode);
                U = $Z(U.borderLeftWidth) + $Z(U.borderRightWidth) + $Z(U.paddingLeft) + $Z(U.paddingRight)
            } else
                U = 0;
            var E = U;
            U = "";
            this.O.params.Bf === 3 && (U = "rotate(180deg)");
            var T = z ? `calc(96% - ${E}px)` : "96%";
            g.A6(this.element, {
                top: 0,
                left: 0,
                right: "",
                bottom: "",
                width: q ? `${q}px` : "",
                height: A ? `${A}px` : "",
                "max-width": T,
                "max-height": T,
                margin: "",
                transform: ""
            });
            this.Yf(B);
            U = {
                transform: U,
                top: "",
                left: "",
                width: q ? `${q}px` : "",
                height: A ? `${A}px` : "",
                "max-width": "",
                "max-height": ""
            };
            T = this.G.LY;
            var v = this.G.hO
              , l = this.G.qp;
            this.VM && T != null && (v = 50,
            T = Math.floor(T / 3) * 3 + 1);
            v = v * .96 + 2;
            switch (T) {
            case 0:
            case 3:
            case 6:
                (z = this.G.WZ.fontSizeIncrement) && z > 0 && this.G.Bf !== 2 && this.G.Bf !== 3 && (v = Math.max(v / (1 + z * 2), 2));
                U.left = `${v}%`;
                break;
            case 1:
            case 4:
            case 7:
                U.left = `${v}%`;
                v = 0;
                this.L || (v = this.K.offsetWidth);
                q || v ? (q = q || v + 1,
                U.width = `${q}px`,
                U["margin-left"] = z ? `${q / -2 - E / 2}px` : `${q / -2}px`) : (this.L && (U.width = "max-content"),
                U.transform += " translateX(-50%)");
                break;
            case 2:
            case 5:
            case 8:
                U.right = `${100 - v}%`
            }
            z = l * .96 + 2;
            switch (T) {
            case 0:
            case 1:
            case 2:
                U.top = `${z}%`;
                break;
            case 3:
            case 4:
            case 5:
                U.top = `${z}%`;
                z = 0;
                this.L || (z = this.element.clientHeight);
                (A = A || z) ? (U.height = `${A}px`,
                U["margin-top"] = `${A / -2}px`) : U.transform += " translateY(-50%)";
                break;
            case 6:
            case 7:
            case 8:
                U.bottom = `${100 - z}%`
            }
            g.A6(this.element, U);
            this.X && (this.L ? A = this.jg : (B = VYP(this, B),
            A = this.VM ? B > 0 ? this.K.offsetHeight / B : 0 : this.K.offsetHeight / B),
            this.X.style.height = `${A}px`,
            this.X.style.width = `${A}px`,
            this.element.style.paddingLeft = `${A + 5}px`,
            this.element.style.paddingRight = `${A + 5}px`,
            this.L || (B = Number(this.element.style.marginLeft.replace("px", "")) - A - 5,
            A = Number(this.element.style.marginRight.replace("px", "")) - A - 5,
            this.element.style.marginLeft = `${B}px`,
            this.element.style.marginRight = `${A}px`))
        }
        Yf(B) {
            if (this.type === 0 && this.O.params.lV !== void 0 && this.experiments.zg("web_enable_popon_asr_captions")) {
                var q = B
                  , A = this.O.params.lV;
                if (q.length === 0 || A <= 0)
                    B = [];
                else {
                    B = [];
                    for (let U = q.length - 1; U >= 0; U--) {
                        var z = q[U];
                        B.unshift(z);
                        let E = VYP(this, B);
                        if (E > A) {
                            B.shift();
                            typeof z.text === "string" && (q = z.text.split("\n"),
                            A = E - A,
                            q.length - A > 0 && (z = new JH(z.start,z.end - z.start,z.priority || 0,z.windowId,q.slice(A).join("\n"),z.append,z.G),
                            B.unshift(z)));
                            break
                        }
                    }
                }
            }
            for (z = 0; z < B.length && B[z] === this.J[z]; z++)
                ;
            if (this.Pa || this.J.length > z)
                z = 0,
                this.Pa = !1,
                this.J = [],
                this.N = this.Ha = this.Sg = null,
                g.VR(this.K);
            for (; z < B.length; z++)
                FVE(this, B[z])
        }
        Cr() {
            return 0
        }
        D0() {
            return 0
        }
        toString() {
            return super.toString()
        }
    }
    ;
    var ltG = class {
        constructor() {
            this.Z = this.time = this.mode = this.O = 0;
            this.K = new vOJ(this);
            this.S = new vOJ(this);
            this.G = [];
            this.clear()
        }
        clear() {
            this.Z = this.time = this.mode = 0;
            this.G = [];
            this.reset()
        }
        reset() {
            this.mode = 0;
            this.K.reset(0);
            this.S.reset(1)
        }
    }
      , bec = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255]
      , Jhc = class {
        constructor() {
            this.type = 0
        }
        set(B) {
            this.type = B
        }
        get() {
            return this.type
        }
    }
      , KoE = class {
        constructor() {
            this.state = this.OR = this.yO = 0
        }
        clear() {
            this.state = 0
        }
        update() {
            this.state = this.state === 2 ? 1 : 0
        }
        o3() {
            return this.state !== 0
        }
        matches(B, q) {
            return this.o3() && B === this.yO && q === this.OR
        }
    }
      , HgW = class {
        constructor() {
            this.timestamp = this.G = 0
        }
        reset() {
            this.timestamp = this.G = 0
        }
    }
      , yW = class {
        constructor(B) {
            this.S = B;
            this.Z = [];
            this.G = this.O = this.row = 0;
            this.style = new Jhc;
            this.K = 0;
            for (B = 0; B <= 15; B++) {
                this.Z[B] = [];
                for (let q = 0; q <= 32; q++)
                    this.Z[B][q] = new HgW
            }
        }
        updateTime(B) {
            for (let q = 1; q <= 15; ++q)
                for (let A = 1; A <= 32; ++A)
                    this.Z[q][A].timestamp = B
        }
        debugString() {
            var B = "\n";
            for (let q = 1; q <= 15; ++q) {
                for (let A = 1; A <= 32; ++A) {
                    let z = this.Z[q][A];
                    B = z.G === 0 ? B + "_" : B + String.fromCharCode(z.G)
                }
                B += "\n"
            }
            return B
        }
        reset(B) {
            for (let q = 0; q <= 15; q++)
                for (let A = 0; A <= 32; A++)
                    this.Z[q][A].reset();
            this.K = B;
            this.G = 0;
            this.O = this.row = 1
        }
    }
      , Zek = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
      , nq0 = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
      , Xnn = [193, 201, 211, 218, 220, 252, 8216, 161, 42, 39, 9473, 169, 8480, 183, 8220, 8221, 192, 194, 199, 200, 202, 203, 235, 206, 207, 239, 212, 217, 249, 219, 171, 187]
      , DwE = [195, 227, 205, 204, 236, 210, 242, 213, 245, 123, 125, 92, 94, 95, 124, 126, 196, 228, 214, 246, 223, 165, 164, 9475, 197, 229, 216, 248, 9487, 9491, 9495, 9499]
      , oOP = class {
        constructor(B) {
            this.Z = B;
            this.S = 0;
            this.style = new Jhc;
            this.N = new yW(this.Z);
            this.X = new yW(this.Z);
            this.text = new yW(this.Z);
            this.O = this.N;
            this.K = this.X;
            this.G = this.O
        }
        reset(B, q) {
            this.S = q;
            this.style.set(2);
            this.O = this.N;
            this.K = this.X;
            this.G = this.O;
            var A = (B << 2) + (q << 1);
            this.N.reset(A);
            this.X.reset(A);
            this.text.reset((B << 2) + (q << 1) + 1)
        }
    }
      , vOJ = class {
        constructor(B) {
            this.G = B;
            this.S = 0;
            this.Z = new oOP(this.G);
            this.N = new oOP(this.G);
            this.O = new KoE;
            this.K = this.Z
        }
        reset(B) {
            this.S = B;
            this.O.clear();
            this.K = this.Z;
            this.Z.reset(B, 0);
            this.N.reset(B, 1)
        }
    }
    ;
    var PTP = class {
        K() {}
    }
    ;
    var QW = class extends g.W {
        reset() {}
    }
    ;
    var HQ = class extends g.tz {
        constructor(B, q, A, z, U) {
            super(B, B + q, {
                priority: A,
                namespace: "captions"
            });
            this.id = z;
            this.params = U;
            this.G = []
        }
        toString() {
            return super.toString()
        }
    }
      , K2 = 0;
    var ftW = class extends QW {
        constructor(B) {
            super();
            this.K = B;
            this.pens = {};
            this.Y = {};
            this.J = {};
            this.S = "_" + K2++;
            this.X = {};
            this.O = this.G = null;
            this.N = !0
        }
        reset() {
            this.X = {};
            this.O = this.G = null;
            this.N = !0
        }
        Z(B, q) {
            B = B.firstChild;
            B.getAttribute("format");
            q = q || 0;
            Number.isFinite(q);
            B = Array.from(B.childNodes);
            for (var A of B)
                if (A.nodeType === 1)
                    switch (A.tagName) {
                    case "head":
                        var z = A;
                        break;
                    case "body":
                        var U = A
                    }
            if (z) {
                z = Array.from(z.childNodes);
                for (var E of z)
                    if (E.nodeType === 1)
                        switch (E.tagName) {
                        case "pen":
                            A = E.getAttribute("id");
                            z = this.pens;
                            B = {};
                            var T = E.getAttribute("p");
                            T && Object.assign(B, this.pens[T]);
                            T = PQ(E, "b");
                            T != null && (B.bold = T);
                            T = PQ(E, "i");
                            T != null && (B.italic = T);
                            T = PQ(E, "u");
                            T != null && (B.underline = T);
                            T = f2(E, "et");
                            T != null && (B.charEdgeStyle = T);
                            T = f2(E, "of");
                            T != null && (B.offset = T);
                            T = ao(E, "bc");
                            T != null && (B.background = T);
                            T = ao(E, "ec");
                            T != null && (B.jp = T);
                            T = ao(E, "fc");
                            T != null && (B.color = T);
                            T = f2(E, "fs");
                            T != null && T !== 0 && (B.fontFamily = T);
                            T = oo(E, "sz");
                            T !== void 0 && (B.fontSizeIncrement = T / 100 - 1);
                            T = oo(E, "bo");
                            T !== void 0 && (B.backgroundOpacity = T / 255);
                            T = oo(E, "fo");
                            T !== void 0 && (B.textOpacity = T / 255);
                            T = f2(E, "rb");
                            T != null && T !== 10 && T !== 0 && (B.Lo = T > 10 ? T - 1 : T);
                            T = f2(E, "hg");
                            T != null && (B.tQ = T);
                            z[A] = B;
                            break;
                        case "ws":
                            z = E.getAttribute("id");
                            this.J[z] = T8N(this, E);
                            break;
                        case "wp":
                            z = E.getAttribute("id"),
                            this.Y[z] = vw0(this, E)
                        }
            }
            if (U) {
                E = [];
                U = Array.from(U.childNodes);
                for (k of U)
                    if (k.nodeType === 1)
                        switch (k.tagName) {
                        case "w":
                            this.G = lnk(this, k, q, !1);
                            (U = this.X[this.G.id]) && U.end > this.G.start && (U.end = this.G.start);
                            this.X[this.G.id] = this.G;
                            E.push(this.G);
                            break;
                        case "p":
                            var v = k;
                            B = q;
                            U = [];
                            z = v.getAttribute("w") || this.S;
                            A = !!PQ(v, "a");
                            B = (oo(v, "t") || 0) + B;
                            T = oo(v, "d") || 5E3;
                            A || (!this.N && this.O && this.O.windowId === z && this.O.end > B && (this.O.end = B),
                            this.O && this.O.text === "\n" && (this.O.text = ""));
                            let e = A ? 6 : 5;
                            var l = v.getAttribute("p");
                            l = l ? this.pens[l] : null;
                            let R = Array.from(v.childNodes);
                            R.length && (this.N = v.getAttribute("d") != null);
                            for (v = 0; v < R.length; v++) {
                                var J = R[v]
                                  , K = void 0;
                                v > 0 && (A = !0);
                                let I;
                                J.nodeType === 1 && (I = J);
                                if (I && I.tagName === "s") {
                                    if ((J = (J = I.getAttribute("p")) ? this.pens[J] : null) && J.Lo && (J.Lo === 1 ? (J = R.slice(v, v + 4),
                                    J.length === 4 && (K = UuN(B, T, z, A, e, J, this.pens),
                                    v += 3)) : K = UuN(B, T, z, A, e, [I], this.pens)),
                                    !K) {
                                        var H = I;
                                        K = B;
                                        J = T;
                                        var P = z
                                          , f = A;
                                        let b = H.textContent ? H.textContent : "";
                                        var G = H.getAttribute("p");
                                        G = G ? this.pens[G] : null;
                                        H = oo(H, "t") || 0;
                                        K = new JH(K + H,J - H,e,P,b,f,G)
                                    }
                                } else
                                    K = new JH(B,T,e,z,J.textContent || "",A,l);
                                U.push(K);
                                this.O = K
                            }
                            if (U.length > 0) {
                                U[0].windowId === this.S && (this.G = lnk(this, k, q, !0),
                                E.push(this.G));
                                for (let I of U)
                                    I.windowId = this.G.id,
                                    this.G.G.push(I),
                                    E.push(I)
                            }
                        }
                var k = E
            } else
                k = [];
            return k
        }
    }
    ;
    var svJ = new Map([[9, 1], [10, 1], [11, 2], [12, 3], [13, 4], [14, 5]])
      , atk = class extends QW {
        constructor(B) {
            super();
            this.N = B;
            this.G = new Map;
            this.K = new Map;
            this.S = new Map;
            this.O = new Map
        }
        reset() {
            this.O.clear()
        }
        Z(B, q) {
            B = JSON.parse(B);
            if (!B)
                return [];
            if (B.pens) {
                var A = B.pens
                  , z = 0;
                for (var U of A) {
                    A = {};
                    var E = U.pParentId;
                    E && Object.assign(A, this.G.get(E));
                    U.bAttr && (A.bold = !0);
                    U.iAttr && (A.italic = !0);
                    U.uAttr && (A.underline = !0);
                    E = U.ofOffset;
                    E != null && (A.offset = E);
                    U.szPenSize !== void 0 && (A.fontSizeIncrement = U.szPenSize / 100 - 1);
                    E = U.etEdgeType;
                    E != null && (A.charEdgeStyle = E);
                    U.ecEdgeColor !== void 0 && (A.jp = OR(U.ecEdgeColor));
                    E = U.fsFontStyle;
                    E != null && E !== 0 && (A.fontFamily = E);
                    U.fcForeColor !== void 0 && (A.color = OR(U.fcForeColor));
                    U.foForeAlpha !== void 0 && (A.textOpacity = U.foForeAlpha / 255);
                    U.bcBackColor !== void 0 && (A.background = OR(U.bcBackColor));
                    U.boBackAlpha !== void 0 && (A.backgroundOpacity = U.boBackAlpha / 255);
                    (E = U.rbRuby) && E !== 10 && (A.Lo = E > 10 ? E - 1 : E,
                    A.textEmphasis = svJ.get(A.Lo));
                    U.hgHorizGroup && (A.tQ = U.hgHorizGroup);
                    this.G.set(z++, A)
                }
            }
            if (B.wsWinStyles) {
                z = B.wsWinStyles;
                U = 0;
                for (var T of z)
                    z = {},
                    (A = T.wsParentId) ? Object.assign(z, this.S.get(A)) : Object.assign(z, this.N),
                    T.mhModeHint !== void 0 && (z.bJ = T.mhModeHint),
                    T.juJustifCode !== void 0 && (z.textAlign = T.juJustifCode),
                    T.pdPrintDir !== void 0 && (z.Bf = T.pdPrintDir),
                    T.sdScrollDir !== void 0 && (z.h4 = T.sdScrollDir),
                    T.wfcWinFillColor !== void 0 && (z.windowColor = OR(T.wfcWinFillColor)),
                    T.wfoWinFillAlpha !== void 0 && (z.windowOpacity = T.wfoWinFillAlpha / 255),
                    this.S.set(U++, z)
            }
            if (B.wpWinPositions) {
                U = B.wpWinPositions;
                T = 0;
                for (var v of U)
                    U = {},
                    (z = v.wpParentId) && Object.assign(U, this.K.get(z)),
                    v.ahHorPos !== void 0 && (U.hO = v.ahHorPos),
                    v.apPoint !== void 0 && (U.LY = v.apPoint),
                    v.avVerPos !== void 0 && (U.qp = v.avVerPos),
                    v.ccCols !== void 0 && (U.KM = v.ccCols),
                    v.rcRows !== void 0 && (U.lV = v.rcRows),
                    this.K.set(T++, U)
            }
            if (B.events) {
                B = B.events;
                v = [];
                for (let F of B)
                    if (T = (F.tStartMs || 0) + q,
                    U = F.dDurationMs || 0,
                    F.id)
                        z = String(F.id),
                        B = Jkn(this, F, T, U, z),
                        v.push(B),
                        this.O.set(z, B);
                    else {
                        F.wWinId ? z = F.wWinId.toString() : (z = "_" + K2++,
                        B = Jkn(this, F, T, U, z),
                        v.push(B),
                        this.O.set(z, B));
                        B = v;
                        var l = F;
                        U === 0 && (U = 5E3);
                        A = this.O.get(z);
                        let BW = (E = !!l.aAppend) ? 6 : 5
                          , HW = l.segs
                          , Kk = null;
                        l.pPenId && (Kk = this.G.get(l.pPenId));
                        for (l = 0; l < HW.length; l++) {
                            var J = HW[l]
                              , K = J.utf8;
                            if (K) {
                                var H = J.tOffsetMs || 0;
                                let Ml = null;
                                J.pPenId && (Ml = this.G.get(J.pPenId));
                                if ((A.params.bJ != null ? A.params.bJ : A.G.length > 1 ? 1 : 0) === 2 && E && K === "\n")
                                    continue;
                                J = null;
                                var P = [], f;
                                if (f = Ml && Ml.Lo === 1)
                                    a: {
                                        f = HW;
                                        var G = l;
                                        if (G + 3 >= f.length || !f[G + 1].pPenId || !f[G + 2].pPenId || !f[G + 3].pPenId) {
                                            f = !1;
                                            break a
                                        }
                                        var k = f[G + 1].pPenId;
                                        (k = this.G.get(k)) && k.Lo && k.Lo === 2 ? (k = f[G + 2].pPenId,
                                        k = this.G.get(k),
                                        !k || !k.Lo || k.Lo < 3 ? f = !1 : (k = f[G + 3].pPenId,
                                        f = (k = this.G.get(k)) && k.Lo && k.Lo === 2 ? !0 : !1)) : f = !1
                                    }
                                if (f)
                                    H = HW[l + 1].utf8,
                                    J = HW[l + 3].utf8,
                                    f = HW[l + 2].utf8,
                                    G = this.G.get(HW[l + 2].pPenId),
                                    K = zTP(K, H, f, J, G),
                                    J = new JH(T,U,BW,z,K,E,Ml),
                                    l += 3;
                                else {
                                    if (K.indexOf("<") > -1) {
                                        P = Ml;
                                        f = Kk;
                                        G = T;
                                        k = U;
                                        var e = H
                                          , R = BW
                                          , I = E;
                                        let iP = [];
                                        var b = AH(`<html>${K}</html>`);
                                        if (!b.getElementsByTagName("parsererror").length && b.firstChild?.childNodes.length)
                                            for (let wc of b.firstChild.childNodes) {
                                                b = wc.textContent?.replace(/\n/g, "") ?? "";
                                                if (wc.nodeType === 3 && (!b || b.match(/^ *$/) != null))
                                                    continue;
                                                let zF = {};
                                                Object.assign(zF, P || f);
                                                switch (wc?.tagName) {
                                                case "b":
                                                    zF.bold = !0;
                                                    break;
                                                case "i":
                                                    zF.italic = !0;
                                                    break;
                                                case "u":
                                                    zF.underline = !0
                                                }
                                                iP.push(new JH(G + e,k - e,R,A.id,b,I,zF))
                                            }
                                        P = iP
                                    }
                                    P.length || (P = [new JH(T + H,U - H,BW,A.id,K,E,Ml || Kk)])
                                }
                                if (P.length)
                                    for (let iP of P)
                                        B.push(iP),
                                        A.G.push(iP);
                                else
                                    J && (B.push(J),
                                    A.G.push(J))
                            }
                            E = !0
                        }
                    }
                q = v
            } else
                q = [];
            return q
        }
    }
    ;
    var OgJ = class extends Ro {
        constructor(B, q, A) {
            super(B);
            this.videoData = q;
            this.audioTrack = A;
            this.J = q.Xd
        }
        X(B, q, A) {
            j8J(this.videoData.videoId, B.vssId, A.CZ)
        }
        K(B) {
            if (this.audioTrack)
                for (let q of this.audioTrack.captionTracks)
                    qM(this.G, q);
            B.X6()
        }
    }
    ;
    var Z80 = class extends Io {
        constructor(B, q, A, z, U, E, T, v, l, J) {
            super(B, q, A, z, U, E, T, v, l, J);
            this.type = 1
        }
        Yf(B) {
            var q = this.O.G;
            super.Yf(B);
            for (B = B.length; B < q.length; B++) {
                let U = q[B], E;
                if (z && U.G === A)
                    E = z;
                else {
                    E = {};
                    Object.assign(E, U.G);
                    Object.assign(E, NNk);
                    var A = U.G;
                    var z = E
                }
                FVE(this, U, E)
            }
        }
    }
      , NNk = {
        ZS: !0
    };
    var KPk = class extends PTP {
        constructor(B, q) {
            super();
            this.trackData = B;
            this.N = q;
            this.version = this.S = this.Z = this.byteOffset = 0;
            this.O = [];
            this.G = new DataView(this.trackData)
        }
        K(B, q, A, z, U) {
            if (A < z) {
                let E = "_" + K2++;
                A = A / 1E3 - this.N;
                z = z / 1E3 - this.N;
                B = new HQ(A,z - A,5,E,{
                    textAlign: 0,
                    LY: 0,
                    hO: q * 2.5,
                    qp: B * 5.33
                });
                U = new JH(A,z - A,5,E,U);
                this.O.push(B);
                this.O.push(U)
            }
        }
    }
      , jv0 = class extends QW {
        constructor(B, q) {
            super();
            this.O = B;
            this.K = q;
            this.track = this.K.languageName === "CC3" ? 4 : 0;
            this.G = new ltG;
            this.G.O = 1 << this.track
        }
        Z(B) {
            B = new KPk(B,this.O);
            if (H8c(B)) {
                for (; B.byteOffset < B.G.byteLength; )
                    for (B.version === 0 ? B.Z = jm(B) * (1E3 / 45) : B.version === 1 && (B.Z = jm(B) * 4294967296 + jm(B)),
                    B.S = NM(B); B.S > 0; B.S--) {
                        var q = NM(B);
                        let A = NM(B)
                          , z = NM(B);
                        q & 4 && (q & 3) === this.track && (this.track === 0 || this.track === 1) && (q = this.G,
                        q.G.push({
                            time: B.Z,
                            type: this.track,
                            UL: A,
                            zi: z,
                            order: q.G.length
                        }))
                    }
                iel(this.G, B);
                return B.O
            }
            return []
        }
        reset() {
            this.G.clear()
        }
    }
    ;
    var nwc = class extends Io {
        constructor(B, q, A, z, U, E, T, v, l, J) {
            super(B, q, A, z, U, E, T, v, l, J);
            this.type = 2;
            this.bc = [];
            this.OO = this.uc = this.fn = 0;
            this.xf = NaN;
            this.Z4 = 0;
            this.Tb = null;
            this.oC = new g.fE(this.Fw,433,this);
            this.X && (J.createClientVe(this.X, this, 167342),
            this.lc(this.X, "click", () => {
                J.logClick(this.X)
            }
            ),
            B = new g.mH(this.element,!0),
            g.t(this, B),
            B.subscribe("hoverstart", () => {
                J.logVisibility(this.X, !0)
            }
            , this));
            g.GW(this.element, "ytp-caption-window-rollup");
            g.t(this, this.oC);
            g.A6(this.element, "overflow", "hidden")
        }
        Kk() {
            var B = this.oC;
            B.stop();
            B.lz()
        }
        Fw() {
            this.element.removeEventListener("transitionend", this.Fw, !1);
            g.ge(this.element, "ytp-rollup-mode");
            this.C(this.Tb, !0)
        }
        D0() {
            return this.S ? this.OO : this.uc
        }
        Cr() {
            return this.S ? this.uc : this.OO
        }
        C(B, q) {
            this.Tb = B;
            if (this.O.params.lV) {
                var A = 0;
                for (let z = 0; z < this.J.length && A < B.length; z++)
                    this.J[z] === B[A] && A++;
                A > 0 && A < B.length && (B = this.J.concat(B.slice(A)));
                this.Z4 = this.OO;
                this.uc = this.OO = 0;
                super.C(B);
                sEW(this, q)
            }
            super.C(B)
        }
    }
    ;
    var GMk = class {
        constructor(B, q, A, z) {
            this.di = B;
            this.S = q;
            this.logger = A;
            this.tT = z;
            this.Ed = [];
            this.G = null;
            this.Z = [];
            this.df = [];
            this.O = null;
            B = g.h9(this.di.j().experiments, "html5_override_micro_discontinuities_threshold_ms");
            this.K = B > 0 ? B : 10
        }
        unload() {
            this.O != null && (this.di.removeEventListener("sabrCaptionsDataLoaded", this.O),
            this.O = null);
            this.Ed = [];
            this.G = null;
            this.Z = [];
            this.di.IV("sabrCaptionsBufferedRangesUpdated", this.Ed)
        }
        N(B) {
            return {
                formatId: g.ad(B.info.W.info, this.tT),
                Kn: B.info.Kn + (this.tT ? 0 : 1),
                startTimeMs: B.info.Z * 1E3,
                durationMs: B.info.X * 1E3
            }
        }
    }
    ;
    var mUk = class extends Ro {
        constructor(B, q) {
            super(q);
            this.O = B;
            this.di = q;
            this.logger = new g.D$("caps");
            this.Y = this.L = null;
            this.C = new GMk(this.di,this,this.logger,this.O.tT)
        }
        X(B, q, A) {
            this.Z();
            q = B.getId();
            q = q != null && q in this.O.G ? this.O.G[q] : null;
            q || (q = B.languageCode,
            q = this.O.isManifestless ? gwE(this, q, "386") : gwE(this, q));
            q && (this.Y = B,
            this.L = q,
            GbJ(this.C, A),
            this.di.IV("sabrCaptionsTrackChanged", g.ad(q.info, this.O.tT)))
        }
        K(B) {
            var q = this.O.isManifestless ? YTE(this, "386") : YTE(this);
            for (let A of q)
                qM(this.G, A);
            B.X6()
        }
        Z() {
            this.Y && (this.Y = this.L = null,
            this.C.unload(),
            this.di.IV("sabrCaptionsTrackChanged", null))
        }
        N() {
            return ""
        }
    }
    ;
    var Mq0 = "WEBVTT".split("").map(B => B.charCodeAt(0))
      , LPW = class extends QW {
        constructor() {
            super()
        }
        Z(B, q) {
            B instanceof ArrayBuffer && (B = g.Bv(new Uint8Array(B)));
            var A = [];
            B = B.split(gOn);
            for (let G = 1; G < B.length; G++) {
                var z = B[G]
                  , U = q;
                if (z !== "" && !YV8.test(z)) {
                    var E = r9.exec(z);
                    if (E && E.length >= 4) {
                        var T = G5(E[1])
                          , v = G5(E[2]) - T;
                        T += U;
                        var l = (E = E[3]) ? E.split(" ") : [];
                        E = {};
                        var J = null;
                        var K = "";
                        var H = null
                          , P = "";
                        for (let k of l) {
                            l = k.split(":");
                            if (l.length !== 2)
                                continue;
                            var f = l[1];
                            switch (l[0]) {
                            case "line":
                                l = f.split(",");
                                l[0].endsWith("%") && (J = l[0],
                                E.qp = Number.parseInt(J, 10),
                                l.length === 2 && (K = l[1].trim()));
                                break;
                            case "position":
                                l = f.split(",");
                                H = l[0];
                                E.hO = Number.parseInt(H, 10);
                                l.length === 2 && (P = l[1].trim());
                                break;
                            case "align":
                                switch (f) {
                                case "start":
                                    E.textAlign = 0;
                                    break;
                                case "middle":
                                    E.textAlign = 2;
                                    break;
                                case "end":
                                    E.textAlign = 1
                                }
                            }
                        }
                        J || K || (K = "end");
                        if (!H)
                            switch (E.textAlign) {
                            case 0:
                                E.hO = 0;
                                break;
                            case 1:
                                E.hO = 100;
                                break;
                            case 2:
                                E.hO = 50
                            }
                        if (E.textAlign != null) {
                            J = 0;
                            switch (K) {
                            case "center":
                                J += 3;
                                break;
                            case "end":
                                J += 6;
                                break;
                            default:
                                J += 0
                            }
                            switch (P) {
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
                                switch (E.textAlign) {
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
                            K = J < 0 || J > 8 ? 7 : J;
                            E.LY = K
                        }
                        z = z.substring(r9.lastIndex).replace(/[\x01-\x09\x0b-\x1f]/g, "");
                        P = E;
                        E = {};
                        if (z.indexOf("<") < 0 && z.indexOf("&") < 0)
                            U = C4k(T, v, 5, P),
                            T = new JH(T,v,5,U.id,z,!1,g.gI(E) ? void 0 : E),
                            A.push(U),
                            A.push(T),
                            U.G.push(T);
                        else
                            for (K = z.split(Mo0),
                            K.length === 1 ? (z = 5,
                            P = C4k(T, v, z, P)) : (J = z = 6,
                            P = Object.assign({
                                KM: 32
                            }, P),
                            P = new HQ(T,v,J,"_" + K2++,P)),
                            A.push(P),
                            J = T,
                            H = 0; H < K.length; H++)
                                if (l = K[H],
                                H % 2 === 0) {
                                    f = AH(`<html>${l}</html>`);
                                    let k;
                                    f.getElementsByTagName("parsererror").length ? (k = f.createElement("span"),
                                    k.appendChild(f.createTextNode(l))) : k = f.firstChild;
                                    hT8(this, J, v - (J - T), z, P, H > 0, k, E, A)
                                } else
                                    J = G5(l) + U
                    }
                    r9.lastIndex = 0
                }
            }
            return A
        }
    }
      , YV8 = /^NOTE/
      , gOn = /(?:\r\n|\r|\n){2,}/
      , r9 = RegExp("^((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})[\\t ]+--\x3e[\\t ]+((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})(?:[\\t ]*)(.*)(?:\\r\\n|\\r|\\n)", "gm")
      , Mo0 = RegExp("<((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})>");
    var dUc = class extends g.W {
        constructor(B, q) {
            super();
            this.di = B;
            this.U = q;
            this.G = null;
            this.X1 = this.di.iq();
            this.logger = new g.D$("caps")
        }
        clear() {
            this.G && this.G.dispose();
            this.G = null
        }
        reset() {
            this.G && this.G.reset()
        }
        qW() {
            super.qW();
            this.clear()
        }
    }
    ;
    var RTN = {
        windowColor: "#080808",
        windowOpacity: 0,
        textAlign: 2,
        LY: 7,
        hO: 50,
        qp: 100,
        isDefault: !0,
        WZ: {
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
      , Inn = {
        windowColor: "#080808",
        windowOpacity: 0,
        textAlign: 0,
        LY: 7,
        hO: 50,
        qp: 100,
        isDefault: !0,
        WZ: {
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
    g.Qd("captions", class extends g.YI {
        constructor(B) {
            super(B);
            this.di = B;
            this.bc = [];
            this.uc = {};
            this.eg = {};
            this.Y = !1;
            this.Z = "NONE";
            this.G = this.J = this.C = this.Sg = this.aV = null;
            this.Kr = {
                X6: () => {
                    this.X6()
                }
                ,
                CZ: (z, U, E, T, v=0) => {
                    var l = Number(this.videoData.j().Ac().G.MW(g.S9G) ?? 0);
                    v > 0 && l > 0 && this.videoData.lengthSeconds > 0 && v / this.videoData.lengthSeconds > l ? this.di.A("tts", {
                        dropcap: v
                    }) : this.CZ(z, U, E, T)
                }
            };
            this.yM = this.O = null;
            this.U = this.di.j();
            this.videoData = this.di.getVideoData();
            this.Fw = this.di.jW();
            this.S = {
                WZ: {}
            };
            this.N = {
                WZ: {}
            };
            g.LX(this.videoData) ? this.Z = "OFFLINE" : g.rN(this.videoData, this.di) ? this.Z = "HLS" : mun(this.videoData, this.di) ? this.Z = "SABR_LIVE" : g.xO(this.videoData, this.di) ? this.Z = "LIVE" : this.videoData.captionTracks.length ? this.Z = "INNERTUBE" : this.videoData.nk && (this.Z = "TTS");
            this.Ha = this.U.controlsType === "3";
            this.fn = new dUc(this.di,this.U);
            this.OO = new g.w0(this);
            this.X = new g.$I({
                V: "div",
                Gg: "ytp-caption-window-container",
                Tg: {
                    id: "ytp-caption-window-container"
                }
            });
            this.L = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 1,
                height: 1
            };
            var q = null
              , A = g.ic("yt-html5-player-modules::subtitlesModuleData");
            A && (q = new g.Ix(A));
            this.storage = q;
            this.VM = !!B.F1()?.Pa();
            this.K = eTN(this);
            this.ZT = !this.K && this.Ha && this.VM && (this.Z === "LIVE" || this.Z === "SABR_LIVE");
            g.t(this, this.fn);
            this.K ? this.Pa = this.xf = null : (this.xf = new nn(this.cG,void 0,this),
            g.t(this, this.xf),
            this.Pa = new g.fE(this.l0,2E3,this),
            g.t(this, this.Pa));
            g.t(this, this.OO);
            g.Pp(this.player, this.X.element, 4);
            g.t(this, this.X);
            this.K || this.OO.lc(B, "resize", this.Yf);
            (this.gP = g.b$(this.U) && !g.ir() && !this.di.isFullscreen() && !this.K && !this.ZT) && this.OO.lc(B, "resize", this.bF);
            this.OO.lc(B, "onPlaybackAudioChange", this.hT);
            this.OO.lc(B, g.Wp("captions"), z => {
                this.onCueRangeEnter(z)
            }
            );
            this.OO.lc(B, g.LN("captions"), z => {
                this.onCueRangeExit(z)
            }
            );
            mm(this, BQ() || {});
            g.nX(this.player, "onCaptionsModuleAvailable");
            this.Z === "HLS" && this.K && (B = this.di.F1().m8(),
            this.VM && this.OO.lc(B.textTracks, "addtrack", this.m0))
        }
        qW() {
            if (this.K || this.ZT) {
                let B = this.di.F1();
                B && !B.gi() && B.J()
            } else
                g9(this, !1);
            super.qW()
        }
        rR() {
            if (this.Ha)
                return this.K || this.ZT;
            if (this.Z === "HLS")
                return this.K;
            var B = this.getAudioTrack();
            if (STc(this)) {
                if (!B.captionTracks.length)
                    return !1;
                if (!this.G)
                    return !0
            }
            B = Zd(B, g.Ex(this.U));
            return B === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? !0 : B === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" ? C2(this) : d9(this) || C2(this) ? !0 : Vq0(this)
        }
        load() {
            super.load();
            this.J = this.getAudioTrack();
            if (this.G)
                this.O && (this.fn.clear(),
                this.K ? xul(this, !0) : this.player.getPresentingPlayerType() !== 3 && this.G.X(this.O, "json3", this.Kr),
                this.Z !== "HLS" && this.K || this.ZT || hH(this) || g.nX(this.player, "captionschanged", iy(this.O)));
            else {
                if (this.Z === "OFFLINE")
                    var B = new OgJ(this.player,this.videoData,this.getAudioTrack());
                else
                    this.Z === "SABR_LIVE" ? B = new mUk(this.videoData.G,this.player) : this.Z === "HLS" ? B = new qVW(this.player) : this.Z === "LIVE" ? B = new UUG(this.videoData.G,this.player) : this.Z === "INNERTUBE" ? B = new AhP(this.player,this.videoData,this.getAudioTrack()) : (B = this.videoData,
                    B = new EON(this.player,this.videoData.nk,this.videoData.videoId,B.captionsLanguagePreference || B.kf.captionsLanguagePreference || g.NR(B, "yt:cc_default_lang") || B.kf.fn,this.videoData.lH,this.videoData.eventId));
                this.G = B;
                g.t(this, this.G);
                this.G.K(this.Kr)
            }
        }
        unload() {
            this.K && this.O ? xul(this, !1) : (this.Pa && this.Pa.G8(),
            this.player.hH("captions"),
            this.bc = [],
            this.G && this.G.Z(),
            this.fn.clear(),
            this.C && this.player.nY(this.C),
            this.Yf());
            super.unload();
            this.player.VP();
            g.nX(this.player, "captionschanged", {})
        }
        create() {
            this.rR() && this.load();
            var B;
            a: {
                if (this.U.B("web_player_nitrate_promo_tooltip") && this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.enableTouchCaptionsNitrate && (B = this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.captionTracks))
                    for (let q of B)
                        if (q.kind === "asr" && q.languageCode === "en") {
                            B = !0;
                            break a
                        }
                B = !1
            }
            B && this.di.IV("showpromotooltip", this.X.element)
        }
        X6() {
            var B = Zd(this.player.getAudioTrack(), g.Ex(this.U));
            var q = B === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? WQ(this, this.Y) : B === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" && C2(this) ? kZ(this) : d9(this) || this.Y || Vq0(this) ? WQ(this, this.Y) : C2(this) ? kZ(this) : null;
            if (this.Z !== "HLS" && this.K || this.ZT) {
                let A = this.G.G.G(!0);
                B = [];
                for (let z = 0; z < A.length; z++) {
                    let U = A[z]
                      , E = g.QR("TRACK");
                    E.setAttribute("kind", "subtitles");
                    E.setAttribute("label", g.t7(U));
                    E.setAttribute("srclang", g.u1(U));
                    E.setAttribute("id", U.toString());
                    this.ZT || E.setAttribute("src", this.G.N(U, "vtt"));
                    U === q && E.setAttribute("default", "1");
                    B.push(E)
                }
                q = this.di.F1();
                q.uc(B);
                B = q.m8();
                this.VM && this.OO.lc(B.textTracks, "change", this.D0)
            } else
                !this.O && q && em(this, q),
                g.nX(this.player, "onCaptionsTrackListChanged"),
                g.X3(this.player, "onApiChange")
        }
        getTrackById(B) {
            var q = this.G.G.G(!0);
            for (let A = 0; A < q.length; A++)
                if (q[A].toString() === B)
                    return q[A];
            return null
        }
        D0() {
            var B = this.di.F1().m8().textTracks
              , q = null;
            for (let A = 0; A < B.length; A++)
                B[A].mode === "showing" && (q = this.getTrackById(B[A].id));
            (this.loaded ? this.O : null) !== q && em(this, q, !0)
        }
        m0() {
            this.G?.K(this.Kr)
        }
        NC() {
            !this.O && this.K || this.unload()
        }
        CZ(B, q, A, z) {
            if (B) {
                uD(this, this.O ?? void 0);
                this.G.ZT() && (this.bc = [],
                this.di.hH("captions"),
                X7(this.xf),
                this.fn.reset());
                a: {
                    var U = this.fn;
                    z = z || 0;
                    A = WPn(U, B, A || 0);
                    B = [];
                    try {
                        for (let R of A) {
                            let I = R.trackData
                              , b = R.X4
                              , F = U.U.B("safari_live_drm_captions_fix");
                            if (typeof I !== "string") {
                                A = B;
                                var E = A.concat;
                                if (F && duP(I))
                                    var T = tqk(U, I, b);
                                else {
                                    var v = U
                                      , l = q
                                      , J = I
                                      , K = b
                                      , H = z;
                                    if (!owP(J))
                                        throw Error("Invalid binary caption track data");
                                    v.G || (v.G = new jv0(H,l));
                                    T = v.G.Z(J, K)
                                }
                                var P = E.call(A, T)
                            } else {
                                if (I.substring(0, 6) === "WEBVTT")
                                    var f = B.concat(tqk(U, I, b));
                                else {
                                    A = B;
                                    var G = A.concat;
                                    b: {
                                        l = U;
                                        v = q;
                                        if (I[0] === "{")
                                            try {
                                                l.G || (l.G = new atk(uVc(v)));
                                                var k = l.G.Z(I, b);
                                                break b
                                            } catch (Kk) {
                                                g.Z(Kk);
                                                k = [];
                                                break b
                                            }
                                        let BW = AH(I);
                                        if (!BW || !BW.firstChild) {
                                            let Kk = Error("Invalid caption track data");
                                            Kk.params = I;
                                            throw Kk;
                                        }
                                        if (BW.firstChild.tagName === "timedtext") {
                                            if (Number(BW.firstChild.getAttribute("format")) === 3) {
                                                J = BW;
                                                l.G || (l.G = new ftW(uVc(v)));
                                                k = l.G.Z(J, b);
                                                break b
                                            }
                                            let Kk = Error("Unsupported subtitles format in web player (Format2)");
                                            Kk.params = I;
                                            throw Kk;
                                        }
                                        if (BW.firstChild.tagName === "transcript") {
                                            let Kk = Error("Unsupported subtitles format in web player (Format1)");
                                            Kk.params = I;
                                            throw Kk;
                                        }
                                        let HW = Error("Invalid caption track data");
                                        HW.params = I;
                                        throw HW;
                                    }
                                    f = G.call(A, k)
                                }
                                P = f
                            }
                            B = P
                        }
                        var e = B;
                        break a
                    } catch (R) {
                        g.Bg(U.logger, 187101178, `Captions parsing failed: ${R.message}. `);
                        U.clear();
                        e = [];
                        break a
                    }
                    e = void 0
                }
                this.U.B("html5_sabr_live_support_subfragmented_captions") && this.G instanceof mUk && (q = this.G.C,
                U = [],
                e.length > 0 && (U = e.slice(q.Z.length)),
                q.Z = !q.G || q.G.info.ut ? [] : e,
                e = U);
                e.length > 0 && (q = this.O,
                this.R5(q, !!q, hH(this) ? "g" : this.Y ? "m" : "s"));
                this.player.nY(e, void 0, this.Z === "LIVE" || this.Z === "SABR_LIVE");
                !this.Y || this.ZT || hH(this) || g.qh(this.U) || g.Zf(this.U) || g.Fe(this.U) || this.U.N === "shortspage" || this.player.isInline() || (this.Pa.G8(),
                e = EwG({
                    LY: 0,
                    hO: 5,
                    qp: 5,
                    lV: 2,
                    textAlign: 0,
                    Bf: 0,
                    lang: "en"
                }),
                this.Sg = [e],
                q = ["Click ", " for settings"],
                this.aV || (U = new g.Gj0({
                    V: "svg",
                    Tg: {
                        height: "100%",
                        version: "1.1",
                        viewBox: "0 0 36 36",
                        width: "100%"
                    },
                    hc: [{
                        V: "path",
                        xP: !0,
                        Tg: {
                            d: "m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z",
                            fill: "#fff"
                        }
                    }]
                }),
                g.t(this, U),
                this.aV = U.element),
                U = e.end - e.start,
                (P = g.t7(this.O)) && this.Sg.push(new JH(e.start,U,0,e.id,P)),
                this.Sg.push(new JH(e.start,U,0,e.id,q[0]), new JH(e.start,U,0,e.id,this.aV,!0), new JH(e.start,U,0,e.id,q[1],!0)),
                this.player.nY(this.Sg),
                this.Pa.MM());
                !this.Y || this.ZT || hH(this) || (this.U.B("enable_player_captions_persistence_state_machine") ? MM(this, !0) : g.Ex(this.U) ? L2(this, !0) : tH(this, !0),
                this.J && (this.J.K = this.O),
                this.player.VP());
                this.Y = !1
            }
        }
        onCueRangeEnter(B) {
            this.bc.push(B);
            X7(this.xf)
        }
        onCueRangeExit(B) {
            g.wA(this.bc, B);
            this.G instanceof UUG && this.G.L && this.player.CN([B]);
            X7(this.xf)
        }
        getCaptionWindowContainerId() {
            return this.X.element.id
        }
        l0() {
            ykc(this, this.Sg);
            this.Sg = null
        }
        cG() {
            if (!this.gP || !this.K) {
                this.xf.stop();
                g.YG(this.eg);
                this.bc.sort(g.kW);
                var B = this.bc;
                if (this.C) {
                    let q = g.ew(B, function(A) {
                        return this.C.indexOf(A) === -1
                    }, this);
                    q.length && (B = q)
                }
                for (let q of B)
                    q instanceof HQ ? ckP(this, q) : pNk(this, q);
                for (let[q,A] of Object.entries(this.uc)) {
                    let z = q
                      , U = A;
                    this.eg[z] ? (U.element.parentNode || (U instanceof nwc || U instanceof Z80 || g.om(this.uc, (E, T) => {
                        T !== z && E.O.params.LY === U.O.params.LY && E.O.params.hO === U.O.params.hO && E.O.params.qp === U.O.params.qp && (E.dispose(),
                        delete this.uc[T]);
                        return T === z
                    }
                    , this),
                    this.X.element.appendChild(U.element)),
                    U.C(this.eg[z])) : (U.dispose(),
                    delete this.uc[z])
                }
            }
        }
        Bx() {
            mm(this, {}, !0);
            g.nX(this.player, "captionssettingschanged")
        }
        wM() {
            var B = this.U.B("enable_player_captions_new_style_defaults") ? Inn : RTN
              , q = B.WZ;
            B = {
                background: q.background,
                backgroundOpacity: q.backgroundOpacity,
                charEdgeStyle: q.charEdgeStyle,
                color: q.color,
                fontFamily: q.fontFamily,
                fontSizeIncrement: q.fontSizeIncrement,
                fontStyle: q.bold && q.italic ? 3 : q.bold ? 1 : q.italic ? 2 : 0,
                textOpacity: q.textOpacity,
                windowColor: B.windowColor,
                windowOpacity: B.windowOpacity
            };
            q = BQ() || {};
            q.background != null && (B.background = q.background);
            q.backgroundOverride != null && (B.backgroundOverride = q.backgroundOverride);
            q.backgroundOpacity != null && (B.backgroundOpacity = q.backgroundOpacity);
            q.backgroundOpacityOverride != null && (B.backgroundOpacityOverride = q.backgroundOpacityOverride);
            q.charEdgeStyle != null && (B.charEdgeStyle = q.charEdgeStyle);
            q.charEdgeStyleOverride != null && (B.charEdgeStyleOverride = q.charEdgeStyleOverride);
            q.color != null && (B.color = q.color);
            q.colorOverride != null && (B.colorOverride = q.colorOverride);
            q.fontFamily != null && (B.fontFamily = q.fontFamily);
            q.fontFamilyOverride != null && (B.fontFamilyOverride = q.fontFamilyOverride);
            q.fontSizeIncrement != null && (B.fontSizeIncrement = q.fontSizeIncrement);
            q.fontSizeIncrementOverride != null && (B.fontSizeIncrementOverride = q.fontSizeIncrementOverride);
            q.fontStyle != null && (B.fontStyle = q.fontStyle);
            q.fontStyleOverride != null && (B.fontStyleOverride = q.fontStyleOverride);
            q.textOpacity != null && (B.textOpacity = q.textOpacity);
            q.textOpacityOverride != null && (B.textOpacityOverride = q.textOpacityOverride);
            q.windowColor != null && (B.windowColor = q.windowColor);
            q.windowColorOverride != null && (B.windowColorOverride = q.windowColorOverride);
            q.windowOpacity != null && (B.windowOpacity = q.windowOpacity);
            q.windowOpacityOverride != null && (B.windowOpacityOverride = q.windowOpacityOverride);
            return B
        }
        BU(B, q) {
            var A = {};
            Object.assign(A, BQ());
            Object.assign(A, B);
            mm(this, A, q);
            g.nX(this.player, "captionssettingschanged")
        }
        Yf() {
            !this.K && this.loaded && (g.JT(this.uc, function(B, q) {
                B.dispose();
                delete this.uc[q]
            }, this),
            this.cG())
        }
        So(B, q) {
            switch (B) {
            case "fontSize":
                if (isNaN(q))
                    break;
                B = g.zt(q, -2, 4);
                this.BU({
                    fontSizeIncrement: B
                });
                return B;
            case "reload":
                q && !this.K && em(this, this.O, !0);
                break;
            case "stickyLoading":
                q !== void 0 && (this.U.B("enable_player_captions_persistence_state_machine") ? MM(this, !(!q || !q.userInitiated)) : g.Ex(this.U) ? L2(this, !!q) : tH(this, !!q));
                break;
            case "track":
                return XNJ(this, q);
            case "tracklist":
                return this.G ? g.Iq(this.G.G.G(!(!q || !q.includeAsr)), A => iy(A)) : [];
            case "translationLanguages":
                return this.G ? this.G.J.map(A => Object.assign({}, A)) : [];
            case "sampleSubtitles":
                this.K || q === void 0 || g9(this, !!q);
                break;
            case "sampleSubtitlesCustomized":
                this.K || g9(this, !!q, q);
                break;
            case "recommendedTranslationLanguages":
                return g.Kp();
            case "defaultTranslationSourceTrackIndices":
                return this.G ? this.G.uc : []
            }
        }
        getOptions() {
            var B = "reload fontSize track tracklist translationLanguages sampleSubtitle".split(" ");
            B.push("stickyLoading");
            return B
        }
        R7() {
            var B = this.O;
            if (this.di.s9("captions")) {
                if (this.U.B("html5_modify_caption_vss_logging"))
                    return (B = this.videoData.ju ?? null) ? {
                        cc: g.eX(B)
                    } : {};
                if (B) {
                    let q = B.vssId;
                    B.translationLanguage && q && (q = `t${q}.${g.u1(B)}`);
                    return {
                        cc: q
                    }
                }
            }
            return {}
        }
        Is(B) {
            this.isSubtitlesOn() ? (this.U.B("enable_player_captions_persistence_state_machine") && B ? MM(this, !1) : g.Ex(this.U) ? L2(this, !1) : tH(this, !1),
            uD(this),
            em(this, null, !0)) : this.ZV(B)
        }
        ZV(B) {
            var q = hH(this) || !this.O ? WQ(this, !0) : this.O;
            q && this.pC(q.vssId, "m");
            this.isSubtitlesOn() || em(this, q, this.U.B("enable_player_captions_persistence_state_machine") ? B : !0)
        }
        isSubtitlesOn() {
            return !!this.loaded && !!this.O && !hH(this)
        }
        hT() {
            var B = hH(this);
            C2(this, B) ? em(this, this.getAudioTrack().G, !1) : this.videoData.captionTracks.length && (this.loaded && this.unload(),
            STc(this) && (this.Y = !1,
            this.O = null,
            this.G && (this.G.dispose(),
            this.G = null)),
            this.rR() && (B ? em(this, WQ(this, !1), !1) : this.load()))
        }
        nG(B) {
            if (this.U.experiments.zg("web_enable_captions_set_target_container") && B !== this.yM) {
                var q = this.X.element;
                q.parentNode && g.xG(q);
                (this.yM = B) ? (this.yM.appendChild(q),
                q.style.position = "absolute",
                q.style.bottom = "0",
                q.style.left = "0",
                q.style.width = "100%",
                q.style.height = "auto",
                q.style.top = "auto") : (g.Pp(this.player, q, 4),
                q.style.position = "absolute",
                q.style.bottom = "auto",
                q.style.left = "0",
                q.style.width = "100%",
                q.style.height = "100%",
                q.style.top = "0");
                this.Yf()
            }
        }
        Yk(B) {
            B && (this.L = {
                top: B.top,
                right: B.right,
                bottom: B.bottom,
                left: B.left,
                width: 1 - B.left - B.right,
                height: 1 - B.top - B.bottom
            },
            this.X.element.style.top = `${this.L.top * 100}%`,
            this.X.element.style.left = `${this.L.left * 100}%`,
            this.X.element.style.width = `${this.L.width * 100}%`,
            this.X.element.style.height = `${this.L.height * 100}%`,
            this.X.element.style.position = "absolute",
            B = i8E(this)) && (this.X.element.style.width = `${B.width}px`,
            this.X.element.style.height = `${B.height}px`)
        }
        onVideoDataChange(B, q) {
            B === "newdata" && (this.videoData = q,
            this.loaded && this.unload(),
            this.Y = !1,
            this.O = null,
            this.G && (this.G.dispose(),
            this.G = null,
            g.nX(this.player, "captionschanged", {})),
            this.rR() && this.load())
        }
        getAudioTrack() {
            return this.player.getAudioTrack()
        }
        bF() {
            var B = this.di.F1();
            B && !B.gi() && B.J();
            this.di.isFullscreen() ? (this.K = this.Ha = !0,
            this.loaded && this.X6()) : (this.Ha = this.U.controlsType === "3",
            this.K = eTN(this));
            em(this, this.O)
        }
        jg() {
            var B = this.videoData.getPlayerResponse()?.captions?.playerCaptionsTracklistRenderer?.openTranscriptCommand;
            B && g.Z_(this.player, "innertubeCommand", B)
        }
        R5(B, q, A) {
            var z = /&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm
              , U = "";
            B && (U = B.vssId,
            U = U.replace(z, ""));
            var E = "";
            B && B.getId() && (E = B.getId() || "");
            B && B.getXtags() && (B = B.getXtags(),
            B = B.replace(z, ""),
            E = E.concat(`;${B}`));
            this.Z === "HLS" && (E = "");
            this.di.R5(q ? U : "", q ? E : "", A)
        }
        pC(B, q) {
            B = (B || "").replace(/&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm, "");
            B.length > 0 && this.di.pC(B, q)
        }
    }
    );
}
)(_yt_player);
