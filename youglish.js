var YG = function(D, F) {
    var e = {},
        x = {},
        S = [],
        i = "4.2";
    console.log("yg widget vers: " + i);
    var n, W, Y = 1,
        L = 1024,
        k = 2048,
        G = 4096,
        H = !1;
    var a = !1;

    function r(e) {
        W = e
    }
    var M = {
        NONE: 0,
        YG: 1,
        PARTNER: 2
    };
    var B = {
        LEFT: 1,
        RIGHT: 2,
        TOP: 4,
        BOTTOM: 8
    };

    function U(e) {
        var t = "???";
        switch (Number(e)) {
            case B.TOP:
                t = "plc_top";
                break;
            case B.BOTTOM:
                t = "plc_bottom";
                break;
            case B.LEFT:
                t = "plc_left";
                break;
            case B.RIGHT:
                t = "plc_right"
        }
        return t
    }
    var z = "%%AF%%",
        q = {
            ad_network_name: "google adsense",
            responsive: !0,
            code: "<ins class='adsbygoogle' style='display:block' data-ad-client='ca-pub-4884889260645232' data-ad-slot='7940721009' data-ad-format='" + z + "'></ins>"
        },
        V = 30;
    var Z = 120;
    var j = {
        PLAYER: 1,
        OUTDATED_BROWSER: 2,
        TIMEOUT: 3,
        GENERIC: 4
    };
    W_ACTION = {
        ERROR: 1,
        WIDGET_RESIZE: 2,
        SERVER_HIT: 3,
        ADV: 4,
        SEARCH_DONE: 20,
        VIDEO_CHANGE: 21,
        CAPTION_CHANGE: 22,
        CAPTION_CONSUMED: 23,
        PLAYER_READY: 40,
        PLAYER_STATECHANGE: 41,
        PLAYER_SPEED_UPDATED: 42,
        YT_IFRAME_READY: 43,
        DOC_READY: 44,
        UNREADY: 100
    };
    var t = !(P_ACTION = {
        PLAY: 1,
        REPLAY: 2,
        PAUSE: 3,
        PREV: 4,
        NEXT: 5,
        DELTA: 6,
        SEARCH: 7,
        SIZE: 8,
        SETPLAYERSPEED: 9,
        SETDELAYSTART: 10
    });

    function l(e) {
        try {
            return JSON.parse(e)
        } catch (e) {}
        return ""
    }

    function o(e) {
        if ("https://youglish.com" === (e.origin || e.originalEvent.origin)) {
            var t = l(e.data);
            if (t && t.wid && t.action) {
                if (!x[t.wid]) return;
                if (x[t.wid].serverHit(), t.action === W_ACTION.DOC_READY) x[t.wid].broadcast("onWidgetReady", t);
                else if (t.action === W_ACTION.YT_IFRAME_READY) x[t.wid].broadcast("onYouTubeReady", t);
                else if (t.action === W_ACTION.PLAYER_READY) x[t.wid].setReady(!0), x[t.wid].broadcast("onPlayerReady", t);
                else if (t.action === W_ACTION.WIDGET_RESIZE) {
                    var o = t.update === F || 1 == t.update;
                    x[t.wid].resize(t.width, t.height, o)
                } else t.action === W_ACTION.ADV ? (a = 1 == t.is_partner, console.log("------------v: " + i), console.log("Ads raw data: " + e.data), console.log("-> key used: " + t.key + " -isPartner: " + a + " -adToDisplay: " + function(e) {
                    var t = "???";
                    switch (Number(e)) {
                        case M.NONE:
                            t = "NONE";
                            break;
                        case M.YG:
                            t = "YG";
                            break;
                        case M.PARTNER:
                            t = "PARTNER"
                    }
                    return t
                }(t.ads_display)), console.log("-> YGAds: " + t.ads_code + " -YGLocations: " + t.ads_loc), console.log("------------"), x[t.wid].setAdConfig(t.ads_display, l(t.ads_code), t.ads_loc, 1 == Number(t.show_logo))) : t.action === W_ACTION.SEARCH_DONE ? (x[t.wid].display(), x[t.wid].broadcast("onSearchDone", t), x[t.wid].broadcast("onFetchDone", t)) : t.action === W_ACTION.VIDEO_CHANGE ? x[t.wid].broadcast("onVideoChange", t) : t.action === W_ACTION.CAPTION_CHANGE ? x[t.wid].broadcast("onCaptionChange", t) : t.action === W_ACTION.CAPTION_CONSUMED ? x[t.wid].broadcast("onCaptionConsumed", t) : t.action === W_ACTION.PLAYER_STATECHANGE ? x[t.wid].broadcast("onPlayerStateChange", t) : t.action === W_ACTION.PLAYER_SPEED_UPDATED ? (x[t.wid].onSpeedUpdated(t.speed), x[t.wid].broadcast("onSpeedChange", t)) : t.action === W_ACTION.ERROR ? +t.code == j.GENERIC ? x[t.wid].display(!1) : (+t.code == j.OUTDATED_BROWSER && (x[t.wid].display(), x[t.wid].resize(t.width, t.height, !1), n && clearTimeout(n), n = setTimeout(function() {
                    x[t.wid].close()
                }, 3e3)), x[t.wid].broadcast("onError", t)) : t.action === W_ACTION.UNREADY && x[t.wid].setReady(!1)
            }
        }
    }

    function J(e) {
        return encodeURIComponent(e).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29")
    }

    function Q(e, t) {
        e && (e.contentWindow || e.contentDocument).postMessage(JSON.stringify(t), "*")
    }

    function s(e) {
        e && (x = {}, S = []);
        for (var t = document.querySelectorAll("a.youglish-widget"), o = 0; o < t.length; o++) c(t[o])
    }

    function c(e) {
        var t = e.id,
            o = {
                width: e.getAttribute("width") || e.getAttribute("data-width"),
                height: e.getAttribute("height") || e.getAttribute("data-height"),
                components: e.getAttribute("data-components"),
                scroll: e.getAttribute("data-scroll"),
                backgroundColor: e.getAttribute("data-bkg-color"),
                linkColor: e.getAttribute("data-link-color"),
                titleColor: e.getAttribute("data-ttl-color"),
                captionColor: e.getAttribute("data-cap-color"),
                markerColor: e.getAttribute("data-marker-color"),
                queryColor: e.getAttribute("data-query-color"),
                captionSize: e.getAttribute("data-cap-size"),
                restrictionMode: e.getAttribute("data-rest-mode"),
                videoQuality: e.getAttribute("data-video-quality"),
                title: e.getAttribute("data-title"),
                toggleUI: e.getAttribute("data-toggle-ui"),
                autoStart: e.getAttribute("data-auto-start"),
                panelsBackgroundColor: e.getAttribute("data-panels-bkg-color"),
                textColor: e.getAttribute("data-text-color"),
                keywordColor: e.getAttribute("data-keyword-color"),
                client: e.getAttribute("data-client"),
                lang: e.getAttribute("data-lang"),
                accent: e.getAttribute("data-accent"),
                zones: e.getAttribute("data-zones"),
                playlist: e.getAttribute("data-playlist"),
                captionLineHeight: e.getAttribute("data-cap-line-height"),
                captionFontFamily: e.getAttribute("data-cap-font-family"),
                titleFontFamily: e.getAttribute("data-ttl-font-family"),
                accentFontFamily: e.getAttribute("data-accent-font-family"),
                formFontFamily: e.getAttribute("data-form-font-family")
            };
        r(e.getAttribute("data-partner-key"));
        var i = new d(t, o); + e.getAttribute("data-delay-load") || i.fetch(e.getAttribute("data-query"), e.getAttribute("data-lang"), e.getAttribute("data-accent"))
    }

    function d(e, t) {
        var p, f, r, o, i = {},
            l = 0,
            s = null,
            A = !1,
            E = !1;
        o = e, p = ("object" == typeof HTMLElement ? o instanceof HTMLElement : o && "object" == typeof o && null !== o && 1 === o.nodeType && "string" == typeof o.nodeName) ? e.getAttribute("id") : e, f = "fr_" + p;
        var _ = t || {},
            n = {};
        if (_.scroll = _.scroll ? _.scroll : "inner", _.components = _.components ? _.components : 255, _.events)
            for (var a in _.events) C(a, _.events[a]);

        function h(e, t, o, i, n) {
            return "<" + e + (t ? " id='" + t + "'" : "") + (o ? " class='" + o + "'" : "") + (i ? " style='" + i + "'" : "") + ">" + (n || "") + "</" + e + ">"
        }

        function c(e, t, o, i, n) {
            if (E && !i) N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.SEARCH,
                query: e,
                lang: t,
                accent: o,
                cid: i,
                playlist: n,
                partner: W || ""
            });
            else {
                var a = Number(_.components);
                if (y = e, !(0 < (a & Y) || y)) return;
                var r = (g = _.width, u = _.height, "position: static;visibility: visible;display: inline-block;padding: 0px;border: none;max-width: 100%;margin-top: 0px;margin-bottom: 1px;width: " + (g = g && 0 < Number(g) ? g + "px" : "100%") + ";height: " + (u = u && 0 < Number(u) ? u + "px" : "1px")),
                    l = function(e, t, o, i, n, a, r, l, s, c, d, g, u, y, p, f, A, E, _, h, m, b, T, v, C, N, R, w, I, O, P, D, x) {
                        var S = !1,
                            Y = s,
                            L = l;
                        s && 0 < Number(s) ? "inner" != c && (s = -1) : (S = !0, s = -1);
                        var k = "";
                        return k = x ? "https://youglish.com/getbyid/" + x + "/" + J(t) + "/" + (o || "-1") + "/" + (i ? i.toLowerCase() : "all") : "https://youglish.com/pronounce/" + (t ? J(t) : "") + "/" + (o || "-1") + "/" + (i ? i.toLowerCase() : "all"), k += "/emb=1&e_id=" + e + "&e_comp=" + r + (null == n ? "" : "&e_zones=" + n) + (null == a ? "" : "&e_playlist=" + a) + (null == b ? "" : "&e_start=" + b) + (s ? "&e_h=" + s : "") + (S ? "&e_notif_h=1" : "") + (D ? "&e_hidepwdby=1" : "") + (d ? "&e_bg_color=" + J(d) : "") + (T ? "&e_partbg_color=" + J(T) : "") + (v ? "&e_txt_color=" + J(v) : "") + (C ? "&e_kw_color=" + J(C) : "") + (g ? "&e_link_color=" + J(g) : "") + (u ? "&e_ttl_color=" + J(u) : "") + (y ? "&e_cap_color=" + J(y) : "") + (p ? "&e_marker_color=" + J(p) : "") + (f ? "&e_query_color=" + J(f) : "") + (A ? "&e_cap_size=" + A : "") + (R ? "&e_cap_line_height=" + R : "") + (w ? "&e_cap_font_family=" + J(w) : "") + (I ? "&e_title_font_family=" + J(I) : "") + (O ? "&e_accent_font_family=" + J(O) : "") + (P ? "&e_form_font_family=" + J(P) : "") + (E ? "&e_rest_mode=" + E : "") + (_ ? "&e_vid_quality=" + _ : "") + (h ? "&e_title=" + J(h) : "") + (m != F ? "&e_toggle_ui=" + m : "") + (Y ? "&e_cur_h=" + Y : "") + (L ? "&e_cur_w=" + L : "") + (N ? "&e_client=" + N : "") + (W ? "&e_partner=" + W : "")
                    }(p, e, t || _.lang, o || _.accent, _.zones, n || _.playlist, _.components, _.width, _.height, _.scroll, _.backgroundColor, _.linkColor, _.titleColor, _.captionColor, _.markerColor, _.queryColor, _.captionSize, _.restrictionMode, _.videoQuality, _.title, _.toggleUI, _.autoStart, _.panelsBackgroundColor, _.textColor, _.keywordColor, _.client, _.captionLineHeight, _.captionFontFamily, _.titleFontFamily, _.accentFontFamily, _.formFontFamily, A, i),
                    s = _.height && 0 < Number(_.height) && "inner" != _.scroll ? "" : "scrolling='no'",
                    c = 0 < (a & (L | k | G)),
                    d = "<div style='display:none;" + (c ? "border: 1px solid #bec3e4" : "") + "' class='ygPanel'>" + (c ? function(e) {
                        var t = "<div style='font-size: 20px;padding: 4px;background-color: #3e4571;color: white;" + (0 < (e & L) ? "cursor: move" : "") + "'>&nbsp;\n";
                        0 < (e & G) && (t += "<span title='close widget' style='cursor:hand;cursor:pointer;float: right;color: #b9b9b9;margin-left:5px;line-height: 23px;font-size:30px' onclick='YG.close(\"" + p + "\")'>&times</span>");
                        0 < (e & k) && (t += "<span title='Show/hide widget' style='cursor:hand;cursor:pointer;float: right;color: #b9b9b9;margin-left:5px;line-height: 23px;' onclick='YG.toggle(\"" + p + "\")'>&#9776</span>   ");
                        return t += "</div>"
                    }(a) : "") + "<div class='ygContentEx' style='display:flex;'><div style='flex-grow: 0;margin-right:5px;display:none' class='plc_left'></div><div style='flex-grow: 1' class='ygContent'><div style='display:flex;flex-direction:column;align-items:center'><div style='margin-bottom:5px;display:none' class='plc_top'></div><iframe allow='autoplay' id='" + f + "' class='ygFrame'" + s + " style='" + r + "'  src='" + l + "'></iframe><div style='margin-top:5px;display:none' class='plc_bottom'></div></div></div><div style='flex-grow: 0;margin-left:5px;display:none' class='plc_right'></div></div></div>";
                h("div", null, "ygProgress", "padding:12px;border: 1px solid lightgrey;font-size:18px;font-style: italic", "Loading...");
                d = h("div", p, 0 < (a & L) ? "ygContainer ygDraggable" : "ygContainer", "background-color:white;z-index:999999", "<div class='ygProgress' style='padding:12px;border: 1px solid lightgrey;font-size:18px;font-style: italic'>Loading...</div>\n" + d), document.getElementById(p).outerHTML = d, 0 < (a & L) && ("undefined" == typeof DragModule ? D.onDragModuleReady = function(e) {
                    e.registerAll()
                } : DragModule.registerAll()), null
            }
            var g, u, y;
            ! function() {
                w && clearTimeout(w);
                w = setTimeout(P, 5e3)
            }()
        }

        function d(e, t, o) {
            return o == B.TOP || o == B.BOTTOM ? e.replace(z, "horizontal") : e.replace(z, "vertical")
        }

        function g(e, t, o, i) {
            var n = s.ygAds[e];
            n = n || q;
            var a = s.ygAds[e];
            a = a || q, Number(n.responsive) && (t.style.width = i + "px"), -1 != n.ad_network_name.indexOf("adsense") ? (t.innerHTML = d(a.code, 0, e), (adsbygoogle = D.adsbygoogle || []).push({})) : t.innerHTML = d(a.code, 0, e)
        }

        function u(e, t, o, i) {
            "function" == typeof onYouglishDisplayAd && onYouglishDisplayAd(p, e, t, i)
        }

        function y(e, t) {
            var o = -1;
            if (e == B.LEFT || e == B.RIGHT) {
                var i = B.LEFT | B.RIGHT,
                    n = document.getElementById(p).offsetWidth;
                if ((o = Math.floor(n * (V / 100))) < Z && (t & i) == i && e == B.LEFT) {
                    var a = 2 * V;
                    50 < a && (a = 50), o = Math.floor(n * (a / 100))
                }
            } else o = R().offsetWidth;
            return Z <= o ? o : -1
        }

        function m() {
            N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.PLAY
            })
        }

        function b() {
            Q(R(), {
                source: "youglish",
                action: P_ACTION.PAUSE
            })
        }
        _.query && c(_.query, _.lang, _.accent), 0 < (Number(_.components) & L) && !H && (H = !0, function() {
            var e = document.createElement("script");
            e.async = !0, e.src = "https://youglish.com/public/emb/ext_min.js";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        }());
        var T = 1;

        function v(e, t) {
            if (n[e])
                for (var o = 0; o < n[e].length; o++) n[e][o](t)
        }

        function C(e, t) {
            void 0 === n[e] && (n[e] = []), n[e].push(t)
        }

        function N() {
            R().style.display = "block"
        }

        function R() {
            return document.getElementById(f)
        }
        var w, I, O = !1;

        function P() {
            v("onError", {
                wid: p,
                action: W_ACTION.ERROR,
                code: j.TIMEOUT
            })
        }
        return i.broadcast = v, i.addEventListener = C, i.removeEventListener = function(e, t) {
            if (n[e])
                for (var o = 0; o < n[e].length; o++)
                    if (n[e][o] === t) {
                        n[e].splice(o, 1);
                        break
                    }
        }, i.fetch = c, i.search = function(e, t, o) {
            console.log("The method 'search' is deprecated. Use 'fetch' instead."), c(e, null, t, o)
        }, i.replay = function() {
            N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.REPLAY
            })
        }, i.play = m, i.pause = b, i.previous = function() {
            N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.PREV
            })
        }, i.next = function() {
            N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.NEXT
            })
        }, i.move = function(e) {
            N(), Q(R(), {
                source: "youglish",
                action: P_ACTION.DELTA,
                delta: e
            })
        }, i.getId = function() {
            return p
        }, i.resize = function(e, t, o) {
            var i = {
                    source: "youglish",
                    action: P_ACTION.SIZE
                },
                n = R();
            t && 0 < Number(t) && (n.style.height = t + "px", i.height = t), e && 0 < Number(e) && (n.style.width = e + "px", i.width = e), o && Q(n, i)
        }, i.toggle = function() {
            var e = document.getElementById(p).getElementsByClassName("ygContentEx")[0];
            null == e.style.display || "none" == e.style.display ? (e.style.display = "flex", m()) : (e.style.display = "none", b())
        }, i.close = function() {
            E = !1, document.getElementById(p).innerHTML = ""
        }, i.show = N, i.hide = function() {
            R().style.display = "none"
        }, i.display = function(e) {
            var t = document.getElementById(p),
                o = t.getElementsByClassName("ygPanel")[0];
            O && "block" == o.style.display || (t.getElementsByClassName("ygProgress")[0].style.display = "none", o.style.display = "block", !s || s.display != M.PARTNER && s.display != M.YG || function() {
                var e, t;
                t = s.display == M.YG ? (console.log("\nDisplaying YG ads..."), e = s.ygLocations, g) : (console.log("\nDisplaying PARTNER ads..."), e = l, u);
                for (var o = 1; o <= 8; o *= 2)
                    if (0 < (e & o)) {
                        var i = U(o);
                        console.log("...draw " + i + " ad unit ...?");
                        var n = document.getElementById(p).getElementsByClassName(i)[0],
                            a = y(o, e); - 1 != a ? (n.style.display = "block", console.log("-----\x3e YES, sugWidth: " + a), t(o, n, e, a)) : console.log("-----\x3e NOP, not enough space")
                    } console.log("done.\n")
            }(), O = void 0 === e || e)
        }, i.serverHit = function() {
            w && (clearTimeout(w), w = null)
        }, i.setAdsLocation = function(e) {
            // A = 0 < ((l = e) & B.BOTTOM) || 0 < (e & B.RIGHT), E = !1
        }, i.setAdConfig = function(e, t, o, i) {
            // var n, a;
            // s = {
            //     display: Number(e),
            //     ygAds: t,
            //     ygLocations: Number(o)
            // }, i && document.getElementById(r || p).appendChild((n = "<div style='position:relative'><div style='margin-top: 15px;float: right;color: grey;font-size: 11px;font-style: oblique;padding: 2px 5px;border-top: 1px solid #d4d4d4'> Powered by <a style='text-decoration: none;color:#337ab7' href='https://youglish.com'>Youglish.com</a></div><div style='clear: both;float:none'></div></div>", (a = document.createElement("div")).innerHTML = n, a.firstChild))
        }, i.setContainerId = function(e) {
            r = e
        }, i.setReady = function(e) {
            E = e
        }, i.onSpeedUpdated = function(e) {
            T = e
        }, i.getSpeed = function() {
            return T
        }, i.setSpeed = function(e) {
            Q(R(), {
                source: "youglish",
                action: P_ACTION.SETPLAYERSPEED,
                speed: e
            })
        }, i.setDelayStart = function(e) {
            Q(R(), {
                source: "youglish",
                action: P_ACTION.SETDELAYSTART,
                delay: e
            })
        }, x[(I = i).getId()] = I, S.push(I), i
    }
    return t || (t = !0, D.addEventListener("message", o, !1)), s(), e.PlayerState = {
        UNSTARTED: -1,
        ENDED: 0,
        PLAYING: 1,
        PAUSED: 2,
        BUFFERING: 3,
        CUED: 5
    }, e.Error = j, e.AdLocations = B, e.setParnterKey = r, e.parsePage = s, e.getWidget = function(e) {
        return x[e]
    }, e.getWidgets = function() {
        return S
    }, e.Widget = d, e.toggle = function(e) {
        x[e].toggle()
    }, e.close = function(e) {
        x[e].close()
    }, e.setAdWidthRatio = function(e) {
        10 < e && e <= 50 && (V = e)
    }, e.setMinAdWidth = function(e) {
        Z = e
    }, e
}(window);
"function" == typeof onYouglishAPIReady && onYouglishAPIReady();