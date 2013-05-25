/*
 * justfont JavaScript 
 * v1.13 justfont
 * http://www.justfont.com/
 * Copyright 2013, justfont.com
 * Date: 2013-04-30
 */ (function () {
    jf.md5 = function (D) {
        var E;
        var y = function (x, k) {
            return (x << k) | (x >>> (32 - k))
        };
        var I = function (Y, x) {
            var aa, k, X, Z, W;
            X = (Y & 2147483648);
            Z = (x & 2147483648);
            aa = (Y & 1073741824);
            k = (x & 1073741824);
            W = (Y & 1073741823) + (x & 1073741823);
            if (aa & k) {
                return (W ^ 2147483648 ^ X ^ Z)
            }
            if (aa | k) {
                if (W & 1073741824) {
                    return (W ^ 3221225472 ^ X ^ Z)
                } else {
                    return (W ^ 1073741824 ^ X ^ Z)
                }
            } else {
                return (W ^ X ^ Z)
            }
        };
        var r = function (k, X, W) {
            return (k & X) | ((~k) & W)
        };
        var q = function (k, X, W) {
            return (k & W) | (X & (~W))
        };
        var p = function (k, X, W) {
            return (k ^ X ^ W)
        };
        var n = function (k, X, W) {
            return (X ^ (k | (~W)))
        };
        var v = function (X, W, ab, aa, k, Y, Z) {
            X = I(X, I(I(r(W, ab, aa), k), Z));
            return I(y(X, Y), W)
        };
        var f = function (X, W, ab, aa, k, Y, Z) {
            X = I(X, I(I(q(W, ab, aa), k), Z));
            return I(y(X, Y), W)
        };
        var G = function (X, W, ab, aa, k, Y, Z) {
            X = I(X, I(I(p(W, ab, aa), k), Z));
            return I(y(X, Y), W)
        };
        var u = function (X, W, ab, aa, k, Y, Z) {
            X = I(X, I(I(n(W, ab, aa), k), Z));
            return I(y(X, Y), W)
        };
        var e = function (aa) {
            var ab;
            var X = aa.length;
            var W = X + 8;
            var x = (W - (W % 64)) / 64;
            var Z = (x + 1) * 16;
            var ac = new Array(Z - 1);
            var k = 0;
            var Y = 0;
            while (Y < X) {
                ab = (Y - (Y % 4)) / 4;
                k = (Y % 4) * 8;
                ac[ab] = (ac[ab] | (aa.charCodeAt(Y) << k));
                Y++
            }
            ab = (Y - (Y % 4)) / 4;
            k = (Y % 4) * 8;
            ac[ab] = ac[ab] | (128 << k);
            ac[Z - 2] = X << 3;
            ac[Z - 1] = X >>> 29;
            return ac
        };
        var s = function (X) {
            var k = "",
                x = "",
                Y, W;
            for (W = 0; W <= 3; W++) {
                Y = (X >>> (W * 8)) & 255;
                x = "0" + Y.toString(16);
                k = k + x.substr(x.length - 2, 2)
            }
            return k
        };
        var t = function (k) {
            if (k === null || typeof k === "undefined") {
                return ""
            }
            var ab = (k + "");
            var ac = "",
                x, Y, W = 0;
            x = Y = 0;
            W = ab.length;
            for (var X = 0; X < W; X++) {
                var aa = ab.charCodeAt(X);
                var Z = null;
                if (aa < 128) {
                    Y++
                } else {
                    if (aa > 127 && aa < 2048) {
                        Z = String.fromCharCode((aa >> 6) | 192) + String.fromCharCode((aa & 63) | 128)
                    } else {
                        Z = String.fromCharCode((aa >> 12) | 224) + String.fromCharCode(((aa >> 6) & 63) | 128) + String.fromCharCode((aa & 63) | 128)
                    }
                } if (Z !== null) {
                    if (Y > x) {
                        ac += ab.slice(x, Y)
                    }
                    ac += Z;
                    x = Y = X + 1
                }
            }
            if (Y > x) {
                ac += ab.slice(x, W)
            }
            return ac
        };
        var F = [],
            M, h, H, w, g, V, U, T, S, P = 7,
            N = 12,
            K = 17,
            J = 22,
            C = 5,
            B = 9,
            A = 14,
            z = 20,
            o = 4,
            m = 11,
            l = 16,
            j = 23,
            R = 6,
            Q = 10,
            O = 15,
            L = 21;
        D = t(D);
        F = e(D);
        V = 1732584193;
        U = 4023233417;
        T = 2562383102;
        S = 271733878;
        E = F.length;
        for (M = 0; M < E; M += 16) {
            h = V;
            H = U;
            w = T;
            g = S;
            V = v(V, U, T, S, F[M + 0], P, 3614090360);
            S = v(S, V, U, T, F[M + 1], N, 3905402710);
            T = v(T, S, V, U, F[M + 2], K, 606105819);
            U = v(U, T, S, V, F[M + 3], J, 3250441966);
            V = v(V, U, T, S, F[M + 4], P, 4118548399);
            S = v(S, V, U, T, F[M + 5], N, 1200080426);
            T = v(T, S, V, U, F[M + 6], K, 2821735955);
            U = v(U, T, S, V, F[M + 7], J, 4249261313);
            V = v(V, U, T, S, F[M + 8], P, 1770035416);
            S = v(S, V, U, T, F[M + 9], N, 2336552879);
            T = v(T, S, V, U, F[M + 10], K, 4294925233);
            U = v(U, T, S, V, F[M + 11], J, 2304563134);
            V = v(V, U, T, S, F[M + 12], P, 1804603682);
            S = v(S, V, U, T, F[M + 13], N, 4254626195);
            T = v(T, S, V, U, F[M + 14], K, 2792965006);
            U = v(U, T, S, V, F[M + 15], J, 1236535329);
            V = f(V, U, T, S, F[M + 1], C, 4129170786);
            S = f(S, V, U, T, F[M + 6], B, 3225465664);
            T = f(T, S, V, U, F[M + 11], A, 643717713);
            U = f(U, T, S, V, F[M + 0], z, 3921069994);
            V = f(V, U, T, S, F[M + 5], C, 3593408605);
            S = f(S, V, U, T, F[M + 10], B, 38016083);
            T = f(T, S, V, U, F[M + 15], A, 3634488961);
            U = f(U, T, S, V, F[M + 4], z, 3889429448);
            V = f(V, U, T, S, F[M + 9], C, 568446438);
            S = f(S, V, U, T, F[M + 14], B, 3275163606);
            T = f(T, S, V, U, F[M + 3], A, 4107603335);
            U = f(U, T, S, V, F[M + 8], z, 1163531501);
            V = f(V, U, T, S, F[M + 13], C, 2850285829);
            S = f(S, V, U, T, F[M + 2], B, 4243563512);
            T = f(T, S, V, U, F[M + 7], A, 1735328473);
            U = f(U, T, S, V, F[M + 12], z, 2368359562);
            V = G(V, U, T, S, F[M + 5], o, 4294588738);
            S = G(S, V, U, T, F[M + 8], m, 2272392833);
            T = G(T, S, V, U, F[M + 11], l, 1839030562);
            U = G(U, T, S, V, F[M + 14], j, 4259657740);
            V = G(V, U, T, S, F[M + 1], o, 2763975236);
            S = G(S, V, U, T, F[M + 4], m, 1272893353);
            T = G(T, S, V, U, F[M + 7], l, 4139469664);
            U = G(U, T, S, V, F[M + 10], j, 3200236656);
            V = G(V, U, T, S, F[M + 13], o, 681279174);
            S = G(S, V, U, T, F[M + 0], m, 3936430074);
            T = G(T, S, V, U, F[M + 3], l, 3572445317);
            U = G(U, T, S, V, F[M + 6], j, 76029189);
            V = G(V, U, T, S, F[M + 9], o, 3654602809);
            S = G(S, V, U, T, F[M + 12], m, 3873151461);
            T = G(T, S, V, U, F[M + 15], l, 530742520);
            U = G(U, T, S, V, F[M + 2], j, 3299628645);
            V = u(V, U, T, S, F[M + 0], R, 4096336452);
            S = u(S, V, U, T, F[M + 7], Q, 1126891415);
            T = u(T, S, V, U, F[M + 14], O, 2878612391);
            U = u(U, T, S, V, F[M + 5], L, 4237533241);
            V = u(V, U, T, S, F[M + 12], R, 1700485571);
            S = u(S, V, U, T, F[M + 3], Q, 2399980690);
            T = u(T, S, V, U, F[M + 10], O, 4293915773);
            U = u(U, T, S, V, F[M + 1], L, 2240044497);
            V = u(V, U, T, S, F[M + 8], R, 1873313359);
            S = u(S, V, U, T, F[M + 15], Q, 4264355552);
            T = u(T, S, V, U, F[M + 6], O, 2734768916);
            U = u(U, T, S, V, F[M + 13], L, 1309151649);
            V = u(V, U, T, S, F[M + 4], R, 4149444226);
            S = u(S, V, U, T, F[M + 11], Q, 3174756917);
            T = u(T, S, V, U, F[M + 2], O, 718787259);
            U = u(U, T, S, V, F[M + 9], L, 3951481745);
            V = I(V, h);
            U = I(U, H);
            T = I(T, w);
            S = I(S, g)
        }
        var i = s(V) + s(U) + s(T) + s(S);
        return i.toLowerCase()
    };
    jf.domain = window.location.href.match(/:\/\/(.[^/]+)/)[1];
    jf.url = jf.domain + window.location.href.match(/:\/\/.[^/]+(.+)/)[1];
    jf.font;
    jf.appId;
    jf.p;
    jf.tmpcss = "";
    jf.prefont;
    jf.md5code;
    jf.fontType;
    jf.fontAddr = new Array();
    var b = false;
    var d;
    jf.unique = function (f) {
        var j = {}, e = [],
            g = f.length;
        for (var h = 0; h < g; h++) {
            if (!(f[h] in j)) {
                j[f[h]] = true;
                e.push(f[h])
            }
        }
        return e
    };
    var c = /^[\s]+|[\s]+|&nbsp;|\u3000+/gi;
    var a = /&/gi;
    jf.assignFonts = function () {
        var f = [];
        for (var e = 0; e < jf.fontAddr.length; e++) {
            var h = jf.fontAddr[e];
            f.push(jQuery.ajax({
                url: h
            }))
        }
        var g = jQuery.when.apply(null, f);
        if (b) {
            jQuery("html").removeClass("jf-loading").addClass("jf-active")
        } else {
            g.done(function () {
                jQuery("html").removeClass("jf-loading").addClass("jf-active")
            }).fail(function () {
                jQuery("html").removeClass("jf-loading").addClass("jf-inactive")
            })
        }
    };
    jf.getText = function () {
        var g = false;
        var i = "";
        for (var h in jf.font) {
            var j = "";
            if (jf.font[h]["css"]) {
                var f = jf.font[h]["css"];
                for (var e in f) {
                    if (f[e]) {
                        j += jQuery(f[e]).text()
                    }
                }
            }
            if (jf.font[h]["alias"]) {
                if (jf.font[h]["alias"]) {
                    j += jQuery(":regex(css:font-family, " + jf.font[h]["alias"] + ")").text()
                }
            }
            if (j) {
                jf.font[h]["string"] = jf.unique(j.replace(c, "").replace(a, "").split("")).join("");
                i += h + jf.font[h]["string"]
            }
        }
        jf.md5code = jf.md5(i + jf.url + jf.appId + jf.p);
        if (i) {
            return true
        } else {
            return false
        }
    };
    jf.send = function () {
        var e = {};
        for (var f in jf.font) {
            if (jf.font[f]["string"]) {
                e[f] = jf.font[f]["string"]
            }
        }
        jQuery.ajax({
            async: false,
            url: "http://dhs.justfont.com/post/recept/",
            type: "GET",
            dataType: "jsonp",
            timeout: 2000,
            cache: true,
            jsonpCallback: "getData",
            data: {
                key: jf.appId,
                addr: jf.url,
                md5: jf.md5code,
                p: jf.p,
                font: e
            },
            success: function (g) {
                clearTimeout(d);
                if (typeof g.font != "object") {
                    jQuery("html").removeClass("jf-loading").addClass("jf-inactive")
                }
            },
            error: function (i, g, h) {
                jQuery("html").removeClass("jf-loading").addClass("jf-inactive")
            }
        })
    };
    getData = function (f) {
        var e = 0;
        clearTimeout(d);
        jQuery.each(f, function (j, k) {
            if (j == "badge" && k.enable == "true") {
                var i = '<img width="83" height="32" src="' + k.pic + '" class="justfont-badge" alt="Fonts by justfont" title="Information about the fonts used on this site" style="position: fixed; z-index: 2000000000; right: 0px; bottom: 0px; cursor: pointer; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; border-image: initial; content: none; display: inline; float: none; height: 32px; left: auto; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; max-height: 32px; max-width: 83px; min-height: 32px; min-width: 83px; orphans: 2; outline-style: none; outline-width: initial; outline-color: initial; overflow-x: visible; overflow-y: visible; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; page-break-after: auto; page-break-before: auto; page-break-inside: auto; table-layout: auto; text-indent: 0px; top: auto; unicode-bidi: normal; vertical-align: baseline; visibility: visible; widows: 2; width: 83px; " id="justfont-badge">';
                jQuery("body").append(i);
                jQuery(".justfont-badge").click(function (m) {
                    window.open(k.link, "Continue_to_Application");
                    m.preventDefault();
                    return false
                })
            } else {
                if (j == "font") {
                    var g = "";
                    var h = "";
                    var l;
                    jQuery.each(this, function (p, o) {
                        var n = "";
                        if (jf.fontType == "eot") {
                            n = " src: url(" + o + "?type=eot);}";
                            jf.fontAddr[e] = o + "?type=eot"
                        } else {
                            n = 'src: local(" "), url(' + o + '?type=woff) format("woff");}';
                            jf.fontAddr[e] = o + "?type=woff"
                        }
                        e++;
                        if (jf.font[p]["alias"]) {
                            g += ' @font-face { font-family: "' + jf.font[p]["alias"] + '";' + n
                        } else {
                            g += ' @font-face { font-family: "' + p + '";' + n
                        }
                        l = "";
                        var q = jf.font[p]["css"];
                        for (var r in q) {
                            l = l ? l + ",.jf-active " + q[r] : ".jf-active " + q[r]
                        }
                        var m = "";
                        if (jf.font[p]["english"]) {
                            m = '"' + jf.font[p]["english"] + '",'
                        }
                        if (jf.font[p]["alias"]) {
                            l += " { font-family: " + m + '"' + jf.font[p]["alias"] + '"; }'
                        } else {
                            l += " { font-family: " + m + '"' + p + '"; }'
                        }
                        g += l
                    });
                    g = "<style type='text/css'>" + g + "</style>";
                    jQuery("head").append(g);
                    jf.assignFonts()
                } else {
                    if (j == "error") {
                        jQuery("html").removeClass("jf-loading").addClass("jf-inactive")
                    }
                }
            }
        })
    };
    jf.main = function (g) {
        jQuery("html").addClass("jf-loading");
        d = setTimeout(function () {
            jQuery("html").removeClass("jf-loading").addClass("jf-inactive")
        }, 2000);
        if (g && typeof g.appId == "string") {
            jf.appId = g.appId
        } else {
            return false
        } if (g && typeof g.font == "object") {
            jf.font = g.font
        }
        if (g && typeof g.p == "string") {
            jf.p = g.p
        }
        jQuery.expr[":"].regex = function (n, k, j) {
            var o = j[3].split(","),
                i = /^(data|css):/,
                h = {
                    method: o[0].match(i) ? o[0].split(":")[0] : "attr",
                    property: o.shift().replace(i, "")
                }, m = "ig",
                l = new RegExp(o.join("").replace(/^\s+|\s+$/g, ""), m);
            return l.test(jQuery(n)[h.method](h.property))
        };
        var f = window.navigator.userAgent;
        var e = "";
        if (/MSIE/g.test(f)) {
            f = f.split(";");
            b = true;
            e = parseInt(f[1].split(" ")[2], 10)
        }
        if (b && e < 9) {
            jf.fontType = "eot"
        } else {
            jf.fontType = "woff"
        } if (jf.getText()) {
            jf.send()
        }
    };
    if (typeof jfAsyncInit != "function") {
        window.jfAsyncInit = function () {};
        window.jfAsyncInit.hasRun = true;
        jf.main()
    } else {
        if (window.jfAsyncInit && !window.jfAsyncInit.hasRun) {
            window.jfAsyncInit.hasRun = true;
            jfAsyncInit()
        }
    }
})();

function jf() {};