/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.11 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */

/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */

/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/

var requirejs, require, define;
(function (global) {
    function isFunction(e) {
        return ostring.call(e) === "[object Function]"
    }

    function isArray(e) {
        return ostring.call(e) === "[object Array]"
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length; n += 1)if (e[n] && t(e[n], n, e))break
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1; n -= 1)if (e[n] && t(e[n], n, e))break
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)if (hasProp(e, n) && t(e[n], n))break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t, function (t, i) {
            if (n || !hasProp(e, i)) r && typeof t == "object" && t && !isArray(t) && !isFunction(t) && !(t instanceof RegExp) ? (e[i] || (e[i] = {}), mixin(e[i], t, n, r)) : e[i] = t
        }), e
    }

    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e)return e;
        var t = global;
        return each(e.split("."), function (e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }

    function newContext(e) {
        function m(e) {
            var t, n, r = e.length;
            for (t = 0; t < r; t++) {
                n = e[t];
                if (n === ".") e.splice(t, 1), t -= 1; else if (n === "..") {
                    if (t === 1 && (e[2] === ".." || e[0] === ".."))break;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
        }

        function g(e, t, n) {
            var r, i, s, u, a, f, l, c, h, p, d, v = t && t.split("/"), g = v, y = o.map, b = y && y["*"];
            e && e.charAt(0) === "." && (t ? (g = v.slice(0, v.length - 1), e = e.split("/"), l = e.length - 1, o.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), e = g.concat(e), m(e), e = e.join("/")) : e.indexOf("./") === 0 && (e = e.substring(2)));
            if (n && y && (v || b)) {
                s = e.split("/");
                e:for (u = s.length; u > 0; u -= 1) {
                    f = s.slice(0, u).join("/");
                    if (v)for (a = v.length; a > 0; a -= 1) {
                        i = getOwn(y, v.slice(0, a).join("/"));
                        if (i) {
                            i = getOwn(i, f);
                            if (i) {
                                c = i, h = u;
                                break e
                            }
                        }
                    }
                    !p && b && getOwn(b, f) && (p = getOwn(b, f), d = u)
                }
                !c && p && (c = p, h = d), c && (s.splice(0, h, c), e = s.join("/"))
            }
            return r = getOwn(o.pkgs, e), r ? r : e
        }

        function y(e) {
            isBrowser && each(scripts(), function (t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === r.contextName)return t.parentNode.removeChild(t), !0
            })
        }

        function b(e) {
            var t = getOwn(o.paths, e);
            if (t && isArray(t) && t.length > 1)return t.shift(), r.require.undef(e), r.require([e]), !0
        }

        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function E(e, t, n, i) {
            var s, o, u, a, f = null, l = t ? t.name : null, h = e, p = !0, m = "";
            return e || (p = !1, e = "_@r" + (d += 1)), a = w(e), f = a[0], e = a[1], f && (f = g(f, l, i), o = getOwn(c, f)), e && (f ? o && o.normalize ? m = o.normalize(e, function (e) {
                return g(e, l, i)
            }) : m = g(e, l, i) : (m = g(e, l, i), a = w(m), f = a[0], m = a[1], n = !0, s = r.nameToUrl(m))), u = f && !o && !n ? "_unnormalized" + (v += 1) : "", {
                prefix: f,
                name: m,
                parentMap: t,
                unnormalized: !!u,
                url: s,
                originalName: h,
                isDefine: p,
                id: (f ? f + "!" + m : m) + u
            }
        }

        function S(e) {
            var t = e.id, n = getOwn(u, t);
            return n || (n = u[t] = new r.Module(e)), n
        }

        function x(e, t, n) {
            var r = e.id, i = getOwn(u, r);
            hasProp(c, r) && (!i || i.defineEmitComplete) ? t === "defined" && n(c[r]) : (i = S(e), i.error && t === "error" ? n(i.error) : i.on(t, n))
        }

        function T(e, t) {
            var n = e.requireModules, r = !1;
            t ? t(e) : (each(n, function (t) {
                var n = getOwn(u, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }

        function N() {
            globalDefQueue.length && (apsp.apply(l, [l.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function C(e) {
            delete u[e], delete a[e]
        }

        function k(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, i) {
                var s = r.id, o = getOwn(u, s);
                o && !e.depMatched[i] && !n[s] && (getOwn(t, s) ? (e.defineDep(i, c[s]), e.check()) : k(o, t, n))
            }), n[r] = !0)
        }

        function L() {
            var e, n, i = o.waitSeconds * 1e3, u = i && r.startTime + i < (new Date).getTime(), f = [], l = [], c = !1,
                h = !0;
            if (t)return;
            t = !0, eachProp(a, function (e) {
                var t = e.map, r = t.id;
                if (!e.enabled)return;
                t.isDefine || l.push(e);
                if (!e.error)if (!e.inited && u) b(r) ? (n = !0, c = !0) : (f.push(r), y(r)); else if (!e.inited && e.fetched && t.isDefine) {
                    c = !0;
                    if (!t.prefix)return h = !1
                }
            });
            if (u && f.length)return e = makeError("timeout", "Load timeout for modules: " + f, null, f), e.contextName = r.contextName, T(e);
            h && each(l, function (e) {
                k(e, {}, {})
            }), (!u || n) && c && (isBrowser || isWebWorker) && !s && (s = setTimeout(function () {
                s = 0, L()
            }, 50)), t = !1
        }

        function A(e) {
            hasProp(c, e[0]) || S(E(e[0], null, !0)).init(e[1], e[2])
        }

        function O(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function M(e) {
            var t = e.currentTarget || e.srcElement;
            return O(t, r.onScriptLoad, "load", "onreadystatechange"), O(t, r.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function _() {
            var e;
            N();
            while (l.length) {
                e = l.shift();
                if (e[0] === null)return T(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                A(e)
            }
        }

        var t, n, r, i, s, o = {waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {}},
            u = {}, a = {}, f = {}, l = [], c = {}, h = {}, p = {}, d = 1, v = 1;
        return i = {
            require: function (e) {
                return e.require ? e.require : e.require = r.makeRequire(e.map)
            }, exports: function (e) {
                e.usingExports = !0;
                if (e.map.isDefine)return e.exports ? c[e.map.id] = e.exports : e.exports = c[e.map.id] = {}
            }, module: function (e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id, uri: e.map.url, config: function () {
                        return getOwn(o.config, e.map.id) || {}
                    }, exports: e.exports || (e.exports = {})
                }
            }
        }, n = function (e) {
            this.events = getOwn(f, e.id) || {}, this.map = e, this.shim = getOwn(o.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, n.prototype = {
            init: function (e, t, n, r) {
                r = r || {};
                if (this.inited)return;
                this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function (e) {
                        this.emit("error", e)
                    })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()
            }, defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            }, fetch: function () {
                if (this.fetched)return;
                this.fetched = !0, r.startTime = (new Date).getTime();
                var e = this.map;
                if (!this.shim)return e.prefix ? this.callPlugin() : this.load();
                r.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
                    return e.prefix ? this.callPlugin() : this.load()
                }))
            }, load: function () {
                var e = this.map.url;
                h[e] || (h[e] = !0, r.load(this.map.id, e))
            }, check: function () {
                if (!this.enabled || this.enabling)return;
                var e, t, n = this.map.id, i = this.depExports, s = this.exports, o = this.factory;
                if (!this.inited) this.fetch(); else if (this.error) this.emit("error", this.error); else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(o)) {
                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)try {
                                s = r.execCb(n, o, i, s)
                            } catch (u) {
                                e = u
                            } else s = r.execCb(n, o, i, s);
                            this.map.isDefine && s === undefined && (t = this.module, t ? s = t.exports : this.usingExports && (s = this.exports));
                            if (e)return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", T(this.error = e)
                        } else s = o;
                        this.exports = s, this.map.isDefine && !this.ignore && (c[n] = s, req.onResourceLoad && req.onResourceLoad(r, this.map, this.depMaps)), C(n), this.defined = !0
                    }
                    this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            }, callPlugin: function () {
                var e = this.map, t = e.id, n = E(e.prefix);
                this.depMaps.push(n), x(n, "defined", bind(this, function (n) {
                    var i, s, a, f = getOwn(p, this.map.id), l = this.map.name,
                        c = this.map.parentMap ? this.map.parentMap.name : null,
                        h = r.makeRequire(e.parentMap, {enableBuildCallback: !0});
                    if (this.map.unnormalized) {
                        n.normalize && (l = n.normalize(l, function (e) {
                                return g(e, c, !0)
                            }) || ""), s = E(e.prefix + "!" + l, this.map.parentMap), x(s, "defined", bind(this, function (e) {
                            this.init([], function () {
                                return e
                            }, null, {enabled: !0, ignore: !0})
                        })), a = getOwn(u, s.id), a && (this.depMaps.push(s), this.events.error && a.on("error", bind(this, function (e) {
                            this.emit("error", e)
                        })), a.enable());
                        return
                    }
                    if (f) {
                        this.map.url = r.nameToUrl(f), this.load();
                        return
                    }
                    i = bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {enabled: !0})
                    }), i.error = bind(this, function (e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(u, function (e) {
                            e.map.id.indexOf(t + "_unnormalized") === 0 && C(e.map.id)
                        }), T(e)
                    }), i.fromText = bind(this, function (n, s) {
                        var u = e.name, a = E(u), f = useInteractive;
                        s && (n = s), f && (useInteractive = !1), S(a), hasProp(o.config, t) && (o.config[u] = o.config[t]);
                        try {
                            req.exec(n)
                        } catch (l) {
                            return T(makeError("fromtexteval", "fromText eval for " + t + " failed: " + l, l, [t]))
                        }
                        f && (useInteractive = !0), this.depMaps.push(a), r.completeLoad(u), h([u], i)
                    }), n.load(e.name, h, i, o)
                })), r.enable(n, this), this.pluginMaps[n.id] = n
            }, enable: function () {
                a[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                    var n, s, o;
                    if (typeof e == "string") {
                        e = E(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(i, e.id);
                        if (o) {
                            this.depExports[t] = o(this);
                            return
                        }
                        this.depCount += 1, x(e, "defined", bind(this, function (e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && x(e, "error", bind(this, this.errback))
                    }
                    n = e.id, s = u[n], !hasProp(i, n) && s && !s.enabled && r.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function (e) {
                    var t = getOwn(u, e.id);
                    t && !t.enabled && r.enable(e, this)
                })), this.enabling = !1, this.check()
            }, on: function (e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            }, emit: function (e, t) {
                each(this.events[e], function (e) {
                    e(t)
                }), e === "error" && delete this.events[e]
            }
        }, r = {
            config: o,
            contextName: e,
            registry: u,
            defined: c,
            urlFetched: h,
            defQueue: l,
            Module: n,
            makeModuleMap: E,
            nextTick: req.nextTick,
            onError: T,
            configure: function (e) {
                e.baseUrl && e.baseUrl.charAt(e.baseUrl.length - 1) !== "/" && (e.baseUrl += "/");
                var t = o.shim, n = {paths: !0, bundles: !0, config: !0, map: !0};
                eachProp(e, function (e, t) {
                    n[t] ? (o[t] || (o[t] = {}), mixin(o[t], e, !0, !0)) : o[t] = e
                }), e.bundles && eachProp(e.bundles, function (e, t) {
                    each(e, function (e) {
                        e !== t && (p[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function (e, n) {
                    isArray(e) && (e = {deps: e}), (e.exports || e.init) && !e.exportsFn && (e.exportsFn = r.makeShimExports(e)), t[n] = e
                }), o.shim = t), e.packages && each(e.packages, function (e) {
                    var t, n;
                    e = typeof e == "string" ? {name: e} : e, n = e.name, t = e.location, t && (o.paths[n] = e.location), o.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(u, function (e, t) {
                    !e.inited && !e.map.unnormalized && (e.map = E(t))
                }), (e.deps || e.callback) && r.require(e.deps || [], e.callback)
            },
            makeShimExports: function (e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }

                return t
            },
            makeRequire: function (t, n) {
                function s(o, a, f) {
                    var l, h, p;
                    return n.enableBuildCallback && a && isFunction(a) && (a.__requireJsBuild = !0), typeof o == "string" ? isFunction(a) ? T(makeError("requireargs", "Invalid require call"), f) : t && hasProp(i, o) ? i[o](u[t.id]) : req.get ? req.get(r, o, t, s) : (h = E(o, t, !1, !0), l = h.id, hasProp(c, l) ? c[l] : T(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (_(), r.nextTick(function () {
                        _(), p = S(E(null, t)), p.skipMap = n.skipMap, p.init(o, a, f, {enabled: !0}), L()
                    }), s)
                }

                return n = n || {}, mixin(s, {
                    isBrowser: isBrowser, toUrl: function (e) {
                        var n, i = e.lastIndexOf("."), s = e.split("/")[0], o = s === "." || s === "..";
                        return i !== -1 && (!o || i > 1) && (n = e.substring(i, e.length), e = e.substring(0, i)), r.nameToUrl(g(e, t && t.id, !0), n, !0)
                    }, defined: function (e) {
                        return hasProp(c, E(e, t, !1, !0).id)
                    }, specified: function (e) {
                        return e = E(e, t, !1, !0).id, hasProp(c, e) || hasProp(u, e)
                    }
                }), t || (s.undef = function (e) {
                    N();
                    var n = E(e, t, !0), r = getOwn(u, e);
                    y(e), delete c[e], delete h[n.url], delete f[e], eachReverse(l, function (t, n) {
                        t[0] === e && l.splice(n, 1)
                    }), r && (r.events.defined && (f[e] = r.events), C(e))
                }), s
            },
            enable: function (e) {
                var t = getOwn(u, e.id);
                t && S(e).enable()
            },
            completeLoad: function (e) {
                var t, n, r, i = getOwn(o.shim, e) || {}, s = i.exports;
                N();
                while (l.length) {
                    n = l.shift();
                    if (n[0] === null) {
                        n[0] = e;
                        if (t)break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    A(n)
                }
                r = getOwn(u, e);
                if (!t && !hasProp(c, e) && r && !r.inited) {
                    if (o.enforceDefine && (!s || !getGlobal(s))) {
                        if (b(e))return;
                        return T(makeError("nodefine", "No define call for " + e, null, [e]))
                    }
                    A([e, i.deps || [], i.exportsFn])
                }
                L()
            },
            nameToUrl: function (e, t, n) {
                var i, s, u, a, f, l, c, h = getOwn(o.pkgs, e);
                h && (e = h), c = getOwn(p, e);
                if (c)return r.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) f = e + (t || ""); else {
                    i = o.paths, s = e.split("/");
                    for (u = s.length; u > 0; u -= 1) {
                        a = s.slice(0, u).join("/"), l = getOwn(i, a);
                        if (l) {
                            isArray(l) && (l = l[0]), s.splice(0, u, l);
                            break
                        }
                    }
                    f = s.join("/"), f += t || (/^data\:|\?/.test(f) || n ? "" : ".js"), f = (f.charAt(0) === "/" || f.match(/^[\w\+\.\-]+:/) ? "" : o.baseUrl) + f
                }
                return o.urlArgs ? f + ((f.indexOf("?") === -1 ? "?" : "&") + o.urlArgs) : f
            },
            load: function (e, t) {
                req.load(r, e, t)
            },
            execCb: function (e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function (e) {
                if (e.type === "load" || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = M(e);
                    r.completeLoad(t.id)
                }
            },
            onScriptError: function (e) {
                var t = M(e);
                if (!b(t.id))return T(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, r.require = r.makeRequire(), r
    }

    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function (e) {
            if (e.readyState === "interactive")return interactiveScript = e
        }), interactiveScript)
    }

    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = "2.1.11", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty,
        ap = Array.prototype, apsp = ap.splice,
        isBrowser = typeof window != "undefined" && typeof navigator != "undefined" && !!window.document,
        isWebWorker = !isBrowser && typeof importScripts != "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_", isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
        contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if (typeof define != "undefined")return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs))return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function (e, t, n, r) {
        var i, s, o = defContextName;
        return !isArray(e) && typeof e != "string" && (s = e, isArray(t) ? (e = t, t = n, n = r) : e = []), s && s.context && (o = s.context), i = getOwn(contexts, o), i || (i = contexts[o] = req.s.newContext(o)), s && i.configure(s), i.require(e, t, n)
    }, req.config = function (e) {
        return req(e)
    }, req.nextTick = typeof setTimeout != "undefined" ? function (e) {
        setTimeout(e, 4)
    } : function (e) {
        e()
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
    }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
        req[e] = function () {
            var t = contexts[defContextName];
            return t.require[e].apply(t, arguments)
        }
    }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, n) {
        var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
    }, req.load = function (e, t, n) {
        var r = e && e.config || {}, i;
        if (isBrowser)return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), i.attachEvent && !(i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)) : (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
        if (isWebWorker)try {
            importScripts(n), e.completeLoad(t)
        } catch (s) {
            e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, s, [t]))
        }
    }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
        head || (head = e.parentNode), dataMain = e.getAttribute("data-main");
        if (dataMain)return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
    }), define = function (e, t, n) {
        var r, i;
        typeof e != "string" && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function (e, n) {
            t.push(n)
        }), t = (n.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
    }, define.amd = {jQuery: !0}, req.exec = function (text) {
        return eval(text)
    }, req(cfg)
})(this), define("requirejs", function () {
}), define("FFF.fc.template.min", function () {
});
var Zepto = function () {
    function M(e) {
        return e == null ? String(e) : x[T.call(e)] || "object"
    }

    function _(e) {
        return M(e) == "function"
    }

    function D(e) {
        return e != null && e == e.window
    }

    function P(e) {
        return e != null && e.nodeType == e.DOCUMENT_NODE
    }

    function H(e) {
        return M(e) == "object"
    }

    function B(e) {
        return H(e) && !D(e) && Object.getPrototypeOf(e) == Object.prototype
    }

    function j(e) {
        return typeof e.length == "number"
    }

    function F(e) {
        return o.call(e, function (e) {
            return e != null
        })
    }

    function I(e) {
        return e.length > 0 ? n.fn.concat.apply([], e) : e
    }

    function q(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function R(e) {
        return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }

    function U(e, t) {
        return typeof t == "number" && !l[q(e)] ? t + "px" : t
    }

    function z(e) {
        var t, n;
        return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
    }

    function W(e) {
        return "children" in e ? s.call(e.children) : n.map(e.childNodes, function (e) {
            if (e.nodeType == 1)return e
        })
    }

    function X(n, r, i) {
        for (t in r)i && (B(r[t]) || O(r[t])) ? (B(r[t]) && !B(n[t]) && (n[t] = {}), O(r[t]) && !O(n[t]) && (n[t] = []), X(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
    }

    function V(e, t) {
        return t == null ? n(e) : n(e).filter(t)
    }

    function $(e, t, n, r) {
        return _(t) ? t.call(e, n, r) : t
    }

    function J(e, t, n) {
        n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
    }

    function K(t, n) {
        var r = t.className, i = r && r.baseVal !== e;
        if (n === e)return i ? r.baseVal : r;
        i ? r.baseVal = n : t.className = n
    }

    function Q(e) {
        var t;
        try {
            return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : !/^0/.test(e) && !isNaN(t = Number(e)) ? t : /^[\[\{]/.test(e) ? n.parseJSON(e) : e) : e
        } catch (r) {
            return e
        }
    }

    function G(e, t) {
        t(e);
        for (var n in e.childNodes)G(e.childNodes[n], t)
    }

    var e, t, n, r, i = [], s = i.slice, o = i.filter, u = window.document, a = {}, f = {},
        l = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1},
        c = /^\s*<(\w+|!)[^>]*>/, h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, d = /^(?:body|html)$/i,
        v = /([A-Z])/g, m = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        g = ["after", "prepend", "before", "append"], y = u.createElement("table"), b = u.createElement("tr"),
        w = {tr: u.createElement("tbody"), tbody: y, thead: y, tfoot: y, td: b, th: b, "*": u.createElement("div")},
        E = /complete|loaded|interactive/, S = /^[\w-]*$/, x = {}, T = x.toString, N = {}, C, k,
        L = u.createElement("div"), A = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, O = Array.isArray || function (e) {
                return e instanceof Array
            };
    return N.matches = function (e, t) {
        if (!t || !e || e.nodeType !== 1)return !1;
        var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (n)return n.call(e, t);
        var r, i = e.parentNode, s = !i;
        return s && (i = L).appendChild(e), r = ~N.qsa(i, t).indexOf(e), s && L.removeChild(e), r
    }, C = function (e) {
        return e.replace(/-+(.)?/g, function (e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, k = function (e) {
        return o.call(e, function (t, n) {
            return e.indexOf(t) == n
        })
    }, N.fragment = function (t, r, i) {
        var o, a, f;
        return h.test(t) && (o = n(u.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = c.test(t) && RegExp.$1), r in w || (r = "*"), f = w[r], f.innerHTML = "" + t, o = n.each(s.call(f.childNodes), function () {
            f.removeChild(this)
        })), B(i) && (a = n(o), n.each(i, function (e, t) {
            m.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
        })), o
    }, N.Z = function (e, t) {
        return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
    }, N.isZ = function (e) {
        return e instanceof N.Z
    }, N.init = function (t, r) {
        var i;
        if (!t)return N.Z();
        if (typeof t == "string") {
            t = t.trim();
            if (t[0] == "<" && c.test(t)) i = N.fragment(t, RegExp.$1, r), t = null; else {
                if (r !== e)return n(r).find(t);
                i = N.qsa(u, t)
            }
        } else {
            if (_(t))return n(u).ready(t);
            if (N.isZ(t))return t;
            if (O(t)) i = F(t); else if (H(t)) i = [t], t = null; else if (c.test(t)) i = N.fragment(t.trim(), RegExp.$1, r), t = null; else {
                if (r !== e)return n(r).find(t);
                i = N.qsa(u, t)
            }
        }
        return N.Z(i, t)
    }, n = function (e, t) {
        return N.init(e, t)
    }, n.extend = function (e) {
        var t, n = s.call(arguments, 1);
        return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function (n) {
            X(e, n, t)
        }), e
    }, N.qsa = function (e, t) {
        var n, r = t[0] == "#", i = !r && t[0] == ".", o = r || i ? t.slice(1) : t, u = S.test(o);
        return P(e) && u && r ? (n = e.getElementById(o)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(u && !r ? i ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
    }, n.contains = function (e, t) {
        return e !== t && e.contains(t)
    }, n.type = M, n.isFunction = _, n.isWindow = D, n.isArray = O, n.isPlainObject = B, n.isEmptyObject = function (e) {
        var t;
        for (t in e)return !1;
        return !0
    }, n.inArray = function (e, t, n) {
        return i.indexOf.call(t, e, n)
    }, n.camelCase = C, n.trim = function (e) {
        return e == null ? "" : String.prototype.trim.call(e)
    }, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function (e, t) {
        var n, r = [], i, s;
        if (j(e))for (i = 0; i < e.length; i++)n = t(e[i], i), n != null && r.push(n); else for (s in e)n = t(e[s], s), n != null && r.push(n);
        return I(r)
    }, n.each = function (e, t) {
        var n, r;
        if (j(e)) {
            for (n = 0; n < e.length; n++)if (t.call(e[n], n, e[n]) === !1)return e
        } else for (r in e)if (t.call(e[r], r, e[r]) === !1)return e;
        return e
    }, n.grep = function (e, t) {
        return o.call(e, t)
    }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        x["[object " + t + "]"] = t.toLowerCase()
    }), n.fn = {
        forEach: i.forEach,
        reduce: i.reduce,
        push: i.push,
        sort: i.sort,
        indexOf: i.indexOf,
        concat: i.concat,
        map: function (e) {
            return n(n.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function () {
            return n(s.apply(this, arguments))
        },
        ready: function (e) {
            return E.test(u.readyState) && u.body ? e(n) : u.addEventListener("DOMContentLoaded", function () {
                e(n)
            }, !1), this
        },
        get: function (t) {
            return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                this.parentNode != null && this.parentNode.removeChild(this)
            })
        },
        each: function (e) {
            return i.every.call(this, function (t, n) {
                return e.call(t, n, t) !== !1
            }), this
        },
        filter: function (e) {
            return _(e) ? this.not(this.not(e)) : n(o.call(this, function (t) {
                return N.matches(t, e)
            }))
        },
        add: function (e, t) {
            return n(k(this.concat(n(e, t))))
        },
        is: function (e) {
            return this.length > 0 && N.matches(this[0], e)
        },
        not: function (t) {
            var r = [];
            if (_(t) && t.call !== e) this.each(function (e) {
                t.call(this, e) || r.push(this)
            }); else {
                var i = typeof t == "string" ? this.filter(t) : j(t) && _(t.item) ? s.call(t) : n(t);
                this.forEach(function (e) {
                    i.indexOf(e) < 0 && r.push(e)
                })
            }
            return n(r)
        },
        has: function (e) {
            return this.filter(function () {
                return H(e) ? n.contains(this, e) : n(this).find(e).size()
            })
        },
        eq: function (e) {
            return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
        },
        first: function () {
            var e = this[0];
            return e && !H(e) ? e : n(e)
        },
        last: function () {
            var e = this[this.length - 1];
            return e && !H(e) ? e : n(e)
        },
        find: function (e) {
            var t, r = this;
            return typeof e == "object" ? t = n(e).filter(function () {
                var e = this;
                return i.some.call(r, function (t) {
                    return n.contains(t, e)
                })
            }) : this.length == 1 ? t = n(N.qsa(this[0], e)) : t = this.map(function () {
                return N.qsa(this, e)
            }), t
        },
        closest: function (e, t) {
            var r = this[0], i = !1;
            typeof e == "object" && (i = n(e));
            while (r && !(i ? i.indexOf(r) >= 0 : N.matches(r, e)))r = r !== t && !P(r) && r.parentNode;
            return n(r)
        },
        parents: function (e) {
            var t = [], r = this;
            while (r.length > 0)r = n.map(r, function (e) {
                if ((e = e.parentNode) && !P(e) && t.indexOf(e) < 0)return t.push(e), e
            });
            return V(t, e)
        },
        parent: function (e) {
            return V(k(this.pluck("parentNode")), e)
        },
        children: function (e) {
            return V(this.map(function () {
                return W(this)
            }), e)
        },
        contents: function () {
            return this.map(function () {
                return s.call(this.childNodes)
            })
        },
        siblings: function (e) {
            return V(this.map(function (e, t) {
                return o.call(W(t.parentNode), function (e) {
                    return e !== t
                })
            }), e)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (e) {
            return n.map(this, function (t) {
                return t[e]
            })
        },
        show: function () {
            return this.each(function () {
                this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = z(this.nodeName))
            })
        },
        replaceWith: function (e) {
            return this.before(e).remove()
        },
        wrap: function (e) {
            var t = _(e);
            if (this[0] && !t)var r = n(e).get(0), i = r.parentNode || this.length > 1;
            return this.each(function (s) {
                n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
            })
        },
        wrapAll: function (e) {
            if (this[0]) {
                n(this[0]).before(e = n(e));
                var t;
                while ((t = e.children()).length)e = t.first();
                n(e).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            var t = _(e);
            return this.each(function (r) {
                var i = n(this), s = i.contents(), o = t ? e.call(this, r) : e;
                s.length ? s.wrapAll(o) : i.append(o)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                n(this).replaceWith(n(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (t) {
            return this.each(function () {
                var r = n(this);
                (t === e ? r.css("display") == "none" : t) ? r.show() : r.hide()
            })
        },
        prev: function (e) {
            return n(this.pluck("previousElementSibling")).filter(e || "*")
        },
        next: function (e) {
            return n(this.pluck("nextElementSibling")).filter(e || "*")
        },
        html: function (e) {
            return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function (t) {
                var r = this.innerHTML;
                n(this).empty().append($(this, e, t, r))
            })
        },
        text: function (t) {
            return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function () {
                this.textContent = t === e ? "" : "" + t
            })
        },
        attr: function (n, r) {
            var i;
            return typeof n == "string" && r === e ? this.length == 0 || this[0].nodeType !== 1 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function (e) {
                if (this.nodeType !== 1)return;
                if (H(n))for (t in n)J(this, t, n[t]); else J(this, n, $(this, r, e, this.getAttribute(n)))
            })
        },
        removeAttr: function (e) {
            return this.each(function () {
                this.nodeType === 1 && J(this, e)
            })
        },
        prop: function (t, n) {
            return t = A[t] || t, n === e ? this[0] && this[0][t] : this.each(function (e) {
                this[t] = $(this, n, e, this[t])
            })
        },
        data: function (t, n) {
            var r = this.attr("data-" + t.replace(v, "-$1").toLowerCase(), n);
            return r !== null ? Q(r) : e
        },
        val: function (e) {
            return arguments.length === 0 ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function (t) {
                this.value = $(this, e, t, this.value)
            })
        },
        offset: function (e) {
            if (e)return this.each(function (t) {
                var r = n(this), i = $(this, e, t, r.offset()), s = r.offsetParent().offset(),
                    o = {top: i.top - s.top, left: i.left - s.left};
                r.css("position") == "static" && (o.position = "relative"), r.css(o)
            });
            if (this.length == 0)return null;
            var t = this[0].getBoundingClientRect();
            return {
                left: t.left + window.pageXOffset,
                top: t.top + window.pageYOffset,
                width: Math.round(t.width),
                height: Math.round(t.height)
            }
        },
        css: function (e, r) {
            if (arguments.length < 2) {
                var i = this[0], s = getComputedStyle(i, "");
                if (!i)return;
                if (typeof e == "string")return i.style[C(e)] || s.getPropertyValue(e);
                if (O(e)) {
                    var o = {};
                    return n.each(O(e) ? e : [e], function (e, t) {
                        o[t] = i.style[C(t)] || s.getPropertyValue(t)
                    }), o
                }
            }
            var u = "";
            if (M(e) == "string") !r && r !== 0 ? this.each(function () {
                this.style.removeProperty(q(e))
            }) : u = q(e) + ":" + U(e, r); else for (t in e)!e[t] && e[t] !== 0 ? this.each(function () {
                this.style.removeProperty(q(t))
            }) : u += q(t) + ":" + U(t, e[t]) + ";";
            return this.each(function () {
                this.style.cssText += ";" + u
            })
        },
        index: function (e) {
            return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (e) {
            return e ? i.some.call(this, function (e) {
                return this.test(K(e))
            }, R(e)) : !1
        },
        addClass: function (e) {
            return e ? this.each(function (t) {
                r = [];
                var i = K(this), s = $(this, e, t, i);
                s.split(/\s+/g).forEach(function (e) {
                    n(this).hasClass(e) || r.push(e)
                }, this), r.length && K(this, i + (i ? " " : "") + r.join(" "))
            }) : this
        },
        removeClass: function (t) {
            return this.each(function (n) {
                if (t === e)return K(this, "");
                r = K(this), $(this, t, n, r).split(/\s+/g).forEach(function (e) {
                    r = r.replace(R(e), " ")
                }), K(this, r.trim())
            })
        },
        toggleClass: function (t, r) {
            return t ? this.each(function (i) {
                var s = n(this), o = $(this, t, i, K(this));
                o.split(/\s+/g).forEach(function (t) {
                    (r === e ? !s.hasClass(t) : r) ? s.addClass(t) : s.removeClass(t)
                })
            }) : this
        },
        scrollTop: function (t) {
            if (!this.length)return;
            var n = "scrollTop" in this[0];
            return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
                this.scrollTop = t
            } : function () {
                this.scrollTo(this.scrollX, t)
            })
        },
        scrollLeft: function (t) {
            if (!this.length)return;
            var n = "scrollLeft" in this[0];
            return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
                this.scrollLeft = t
            } : function () {
                this.scrollTo(t, this.scrollY)
            })
        },
        position: function () {
            if (!this.length)return;
            var e = this[0], t = this.offsetParent(), r = this.offset(),
                i = d.test(t[0].nodeName) ? {top: 0, left: 0} : t.offset();
            return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {
                top: r.top - i.top,
                left: r.left - i.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || u.body;
                while (e && !d.test(e.nodeName) && n(e).css("position") == "static")e = e.offsetParent;
                return e
            })
        }
    }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (t) {
        var r = t.replace(/./, function (e) {
            return e[0].toUpperCase()
        });
        n.fn[t] = function (i) {
            var s, o = this[0];
            return i === e ? D(o) ? o["inner" + r] : P(o) ? o.documentElement["scroll" + r] : (s = this.offset()) && s[t] : this.each(function (e) {
                o = n(this), o.css(t, $(this, i, e, o[t]()))
            })
        }
    }), g.forEach(function (e, t) {
        var r = t % 2;
        n.fn[e] = function () {
            var e, i = n.map(arguments, function (t) {
                return e = M(t), e == "object" || e == "array" || t == null ? t : N.fragment(t)
            }), s, o = this.length > 1;
            return i.length < 1 ? this : this.each(function (e, u) {
                s = r ? u : u.parentNode, u = t == 0 ? u.nextSibling : t == 1 ? u.firstChild : t == 2 ? u : null, i.forEach(function (e) {
                    if (o) e = e.cloneNode(!0); else if (!s)return n(e).remove();
                    G(s.insertBefore(e, u), function (e) {
                        e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
                    })
                })
            })
        }, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function (t) {
            return n(t)[e](this), this
        }
    }), N.Z.prototype = n.fn, N.uniq = k, N.deserializeValue = Q, n.zepto = N, n
}();
window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto), function (e) {
    function c(e) {
        return e._zid || (e._zid = t++)
    }

    function h(e, t, n, r) {
        t = p(t);
        if (t.ns)var i = d(t.ns);
        return (o[c(e)] || []).filter(function (e) {
            return e && (!t.e || e.e == t.e) && (!t.ns || i.test(e.ns)) && (!n || c(e.fn) === c(n)) && (!r || e.sel == r)
        })
    }

    function p(e) {
        var t = ("" + e).split(".");
        return {e: t[0], ns: t.slice(1).sort().join(" ")}
    }

    function d(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }

    function v(e, t) {
        return e.del && !a && e.e in f || !!t
    }

    function m(e) {
        return l[e] || a && f[e] || e
    }

    function g(t, r, i, s, u, a, f) {
        var h = c(t), d = o[h] || (o[h] = []);
        r.split(/\s/).forEach(function (r) {
            if (r == "ready")return e(document).ready(i);
            var o = p(r);
            o.fn = i, o.sel = u, o.e in l && (i = function (t) {
                var n = t.relatedTarget;
                if (!n || n !== this && !e.contains(this, n))return o.fn.apply(this, arguments)
            }), o.del = a;
            var c = a || i;
            o.proxy = function (e) {
                e = x(e);
                if (e.isImmediatePropagationStopped())return;
                e.data = s;
                var r = c.apply(t, e._args == n ? [e] : [e].concat(e._args));
                return r === !1 && (e.preventDefault(), e.stopPropagation()), r
            }, o.i = d.length, d.push(o), "addEventListener" in t && t.addEventListener(m(o.e), o.proxy, v(o, f))
        })
    }

    function y(e, t, n, r, i) {
        var s = c(e);
        (t || "").split(/\s/).forEach(function (t) {
            h(e, t, n, r).forEach(function (t) {
                delete o[s][t.i], "removeEventListener" in e && e.removeEventListener(m(t.e), t.proxy, v(t, i))
            })
        })
    }

    function x(t, r) {
        if (r || !t.isDefaultPrevented) {
            r || (r = t), e.each(S, function (e, n) {
                var i = r[e];
                t[e] = function () {
                    return this[n] = b, i && i.apply(r, arguments)
                }, t[n] = w
            });
            if (r.defaultPrevented !== n ? r.defaultPrevented : "returnValue" in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault()) t.isDefaultPrevented = b
        }
        return t
    }

    function T(e) {
        var t, r = {originalEvent: e};
        for (t in e)!E.test(t) && e[t] !== n && (r[t] = e[t]);
        return x(r, e)
    }

    var t = 1, n, r = Array.prototype.slice, i = e.isFunction, s = function (e) {
            return typeof e == "string"
        }, o = {}, u = {}, a = "onfocusin" in window, f = {focus: "focusin", blur: "focusout"},
        l = {mouseenter: "mouseover", mouseleave: "mouseout"};
    u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = {
        add: g,
        remove: y
    }, e.proxy = function (t, n) {
        if (i(t)) {
            var r = function () {
                return t.apply(n, arguments)
            };
            return r._zid = c(t), r
        }
        if (s(n))return e.proxy(t[n], t);
        throw new TypeError("expected function")
    }, e.fn.bind = function (e, t, n) {
        return this.on(e, t, n)
    }, e.fn.unbind = function (e, t) {
        return this.off(e, t)
    }, e.fn.one = function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    };
    var b = function () {
        return !0
    }, w = function () {
        return !1
    }, E = /^([A-Z]|returnValue$|layer[XY]$)/, S = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    e.fn.delegate = function (e, t, n) {
        return this.on(t, e, n)
    }, e.fn.undelegate = function (e, t, n) {
        return this.off(t, e, n)
    }, e.fn.live = function (t, n) {
        return e(document.body).delegate(this.selector, t, n), this
    }, e.fn.die = function (t, n) {
        return e(document.body).undelegate(this.selector, t, n), this
    }, e.fn.on = function (t, o, u, a, f) {
        var l, c, h = this;
        if (t && !s(t))return e.each(t, function (e, t) {
            h.on(e, o, u, t, f)
        }), h;
        !s(o) && !i(a) && a !== !1 && (a = u, u = o, o = n);
        if (i(u) || u === !1) a = u, u = n;
        return a === !1 && (a = w), h.each(function (n, i) {
            f && (l = function (e) {
                return y(i, e.type, a), a.apply(this, arguments)
            }), o && (c = function (t) {
                var n, s = e(t.target).closest(o, i).get(0);
                if (s && s !== i)return n = e.extend(T(t), {
                    currentTarget: s,
                    liveFired: i
                }), (l || a).apply(s, [n].concat(r.call(arguments, 1)))
            }), g(i, t, a, u, o, c || l)
        })
    }, e.fn.off = function (t, r, o) {
        var u = this;
        return t && !s(t) ? (e.each(t, function (e, t) {
            u.off(e, r, t)
        }), u) : (!s(r) && !i(o) && o !== !1 && (o = r, r = n), o === !1 && (o = w), u.each(function () {
            y(this, t, o, r)
        }))
    }, e.fn.trigger = function (t, n) {
        return t = s(t) || e.isPlainObject(t) ? e.Event(t) : x(t), t._args = n, this.each(function () {
            "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
        })
    }, e.fn.triggerHandler = function (t, n) {
        var r, i;
        return this.each(function (o, u) {
            r = T(s(t) ? e.Event(t) : t), r._args = n, r.target = u, e.each(h(u, t.type || t), function (e, t) {
                i = t.proxy(r);
                if (r.isImmediatePropagationStopped())return !1
            })
        }), i
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.trigger(t)
        }
    }), ["focus", "blur"].forEach(function (t) {
        e.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.each(function () {
                try {
                    this[t]()
                } catch (e) {
                }
            }), this
        }
    }), e.Event = function (e, t) {
        s(e) || (t = e, e = t.type);
        var n = document.createEvent(u[e] || "Events"), r = !0;
        if (t)for (var i in t)i == "bubbles" ? r = !!t[i] : n[i] = t[i];
        return n.initEvent(e, r, !0), x(n)
    }
}(Zepto), function ($) {
    function triggerAndReturn(e, t, n) {
        var r = $.Event(t);
        return $(e).trigger(r, n), !r.isDefaultPrevented()
    }

    function triggerGlobal(e, t, n, r) {
        if (e.global)return triggerAndReturn(t || document, n, r)
    }

    function ajaxStart(e) {
        e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
    }

    function ajaxStop(e) {
        e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
    }

    function ajaxBeforeSend(e, t) {
        var n = t.context;
        if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1)return !1;
        triggerGlobal(t, n, "ajaxSend", [e, t])
    }

    function ajaxSuccess(e, t, n, r) {
        var i = n.context, s = "success";
        n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
    }

    function ajaxError(e, t, n, r, i) {
        var s = r.context;
        r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
    }

    function ajaxComplete(e, t, n) {
        var r = n.context;
        n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
    }

    function empty() {
    }

    function mimeToDataType(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
    }

    function appendQuery(e, t) {
        return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }

    function serializeData(e) {
        e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
    }

    function parseArguments(e, t, n, r) {
        return $.isFunction(t) && (r = n, n = t, t = undefined), $.isFunction(n) || (r = n, n = undefined), {
            url: e,
            data: t,
            success: n,
            dataType: r
        }
    }

    function serialize(e, t, n, r) {
        var i, s = $.isArray(t), o = $.isPlainObject(t);
        $.each(t, function (t, u) {
            i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
        })
    }

    var jsonpID = 0, document = window.document, key, name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;
    $.active = 0, $.ajaxJSONP = function (e, t) {
        if ("type" in e) {
            var n = e.jsonpCallback, r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID,
                i = document.createElement("script"), s = window[r], o, u = function (e) {
                    $(i).triggerHandler("error", e || "abort")
                }, a = {abort: u}, f;
            return t && t.promise(a), $(i).on("load error", function (n, u) {
                clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
            }), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function () {
                o = arguments
            }, i.src = e.url.replace(/\?(.+)=\?/, "?$1=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function () {
                u("timeout")
            }, e.timeout)), a)
        }
        return $.ajax(e)
    }, $.ajaxSettings = {
        type: "GET",
        beforeSend: empty,
        success: empty,
        error: empty,
        complete: empty,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: jsonType,
            xml: "application/xml, text/xml",
            html: htmlType,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, $.ajax = function (options) {
        var settings = $.extend({}, options || {}), deferred = $.Deferred && $.Deferred();
        for (key in $.ajaxSettings)settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
        ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings), settings.cache === !1 && (settings.url = appendQuery(settings.url, "_=" + Date.now()));
        var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url);
        if (dataType == "jsonp" || hasPlaceholder)return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
        var mime = settings.accepts[dataType], headers = {}, setHeader = function (e, t) {
                headers[e.toLowerCase()] = [e, t]
            }, protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol, xhr = settings.xhr(),
            nativeSetHeader = xhr.setRequestHeader, abortTimeout;
        deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
        if (mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
        (settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
        if (settings.headers)for (name in settings.headers)setHeader(name, settings.headers[name]);
        xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
                var result, error = !1;
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                    dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
                    try {
                        dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
                    } catch (e) {
                        error = e
                    }
                    error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
                } else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
            }
        };
        if (ajaxBeforeSend(xhr, settings) === !1)return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
        if (settings.xhrFields)for (name in settings.xhrFields)xhr[name] = settings.xhrFields[name];
        var async = "async" in settings ? settings.async : !0;
        xhr.open(settings.type, settings.url, async, settings.username, settings.password);
        for (name in headers)nativeSetHeader.apply(xhr, headers[name]);
        return settings.timeout > 0 && (abortTimeout = setTimeout(function () {
            xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
        }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
    }, $.get = function () {
        return $.ajax(parseArguments.apply(null, arguments))
    }, $.post = function () {
        var e = parseArguments.apply(null, arguments);
        return e.type = "POST", $.ajax(e)
    }, $.getJSON = function () {
        var e = parseArguments.apply(null, arguments);
        return e.dataType = "json", $.ajax(e)
    }, $.fn.load = function (e, t, n) {
        if (!this.length)return this;
        var r = this, i = e.split(/\s/), s, o = parseArguments(e, t, n), u = o.success;
        return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function (e) {
            r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
        }, $.ajax(o), this
    };
    var escape = encodeURIComponent;
    $.param = function (e, t) {
        var n = [];
        return n.add = function (e, t) {
            this.push(escape(e) + "=" + escape(t))
        }, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (e) {
    e.fn.serializeArray = function () {
        var t = [], n;
        return e([].slice.call(this.get(0).elements)).each(function () {
            n = e(this);
            var r = n.attr("type");
            this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
                name: n.attr("name"),
                value: n.val()
            })
        }), t
    }, e.fn.serialize = function () {
        var e = [];
        return this.serializeArray().forEach(function (t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function (t) {
        if (t) this.bind("submit", t); else if (this.length) {
            var n = e.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (e) {
    "__proto__" in {} || e.extend(e.zepto, {
        Z: function (t, n) {
            return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
        }, isZ: function (t) {
            return e.type(t) === "array" && "__Z" in t
        }
    });
    try {
        getComputedStyle(undefined)
    } catch (t) {
        var n = getComputedStyle;
        window.getComputedStyle = function (e) {
            try {
                return n(e)
            } catch (t) {
                return null
            }
        }
    }
}(Zepto), window.Zepto = Zepto, "$" in window || (window.$ = Zepto), typeof define == "function" && define.amd && define("zepto", [], function () {
    return Zepto
}), define("language", ["jquery"], function (e) {
    var t = {
        "undefined": "undefined",
        number: "number",
        "boolean": "boolean",
        string: "string",
        "[object String]": "string",
        "[object Number]": "number",
        "[object Function]": "function",
        "[object RegExp]": "regexp",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object Error]": "error"
    }, n = Object.prototype.toString, r = {
        extend: function (e, t, n) {
            if (!t || !e)throw new Error("extend failed, please check that all dependencies are included!");
            var i = Object.create(t.prototype), s = Object.create(t.prototype), o = e.prototype;
            return n && r.__override__(o, n, e), r.__override__(i, o, e), e.prototype = i, e.prototype.constructor = e, e.prototype.superclass = s, e.superclass = t, e
        }, mix: function (e, t, n) {
            return Object.keys(t).forEach(function (r) {
                n ? e[r] = t[r] : e.hasOwnProperty(r) || (e[r] = t[r])
            }), e
        }, __override__: function (e, t, n) {
            return Object.keys(t).forEach(function (r) {
                e[r] = t[r], e[r].__owner__ = n, e[r].__name__ = r
            }), e
        }, type: function (e) {
            return t[typeof e] || t[n.call(e)] || (e ? "object" : "null")
        }, clone: function (e) {
            if (e === null || e === undefined)return e;
            if (e.nodeType && e.cloneNode)return e.cloneNode(!0);
            if (e.clone)return e.clone();
            var t = r.type(e), n, i, s, o, u;
            if (t === "date")return new Date(e.getTime());
            if (t === "array") {
                n = e.length, o = [];
                while (n--)o[n] = r.clone(e[n])
            } else if (t === "object" && e.constructor === Object) {
                o = {};
                for (u in e)o[u] = r.clone(e[u])
            }
            return o || e
        }, setProp: function (e, t, n, r, i) {
            var s = {};
            return e ? (r ? s.get = r : delete s.get, i ? s.set = i : delete s.set, delete s.value, delete s.writable) : (arguments.length > 3 ? s.value = r : delete s.value, s.writable = e, delete s.get, delete s.set), s.enumerable = e, s.configurable = !0, Object.defineProperty(t, n, s), t
        }
    };
    return {language: r}
}), define("attribute", ["language"], function (e) {
    function n() {
        this.__initAttr__()
    }

    function r(e, n) {
        var i = n || {};
        return e.hasOwnProperty("ATTRS") && t.mix(i, e.ATTRS, !1), e.superclass && r(e.superclass, i), i
    }

    function i(e, n) {
        var r = t.setProp;
        n = t.clone(n), Object.keys(n).forEach(function (t) {
            var i = t.charAt(0).toUpperCase() + t.substr(1), s = "set" + i, o = "get" + i, u = "del" + i,
                a = n[t].value;
            n[t].hasOwnProperty("changeFn") && e.on && e.on(t + "Change", n[t].changeFn, e), r(!1, e, t, a), n[t].hasOwnProperty("valueFn") || (e[s] = function (i) {
                var s = e[o]();
                r(!0, e, t, function () {
                    return n[t].hasOwnProperty("valueFn") && (a = n[t].valueFn.call(e)), a
                }, function (e) {
                    a = e
                });
                if (n[t].hasOwnProperty("set")) {
                    var u = n[t].set.call(e, i);
                    Object.getOwnPropertyDescriptor(e, t).set(u)
                } else Object.getOwnPropertyDescriptor(e, t).set(i);
                e.trigger(t + "Change", {value: e[o](), preValue: s}), r(!1, e, t, e[o]())
            }), e[o] = function () {
                var i = "";
                return r(!0, e, t, function () {
                    return n[t].hasOwnProperty("valueFn") && (a = n[t].valueFn.call(e)), a
                }, function (e) {
                    a = e
                }), n[t].hasOwnProperty("get") ? i = n[t].get.call(e, Object.getOwnPropertyDescriptor(e, t).get()) : i = Object.getOwnPropertyDescriptor(e, t).get(), r(!1, e, t, i), i
            }, e[u] = function () {
                defineProperty(e, t, {
                    enumerable: !0,
                    configurable: !0
                }), delete e[t], delete e[s], delete e[o], delete e[u]
            }
        })
    }

    var t = e.language;
    return n.prototype.__initAttr__ = function () {
        var e = r(this.constructor);
        i(this, e)
    }, {Attribute: n}
}), define("eventEmitter", ["language"], function (e) {
    function n() {
        this.__events__ = {}
    }

    var t = e.language;
    return n.prototype.trigger = function (e, n) {
        if (this.__events__.hasOwnProperty(e)) {
            var r = this.__events__[e];
            t.type(n) != "array" && (n = [n]), r.forEach(function (e) {
                e.handler.apply(e.scope, n)
            })
        }
        return this
    }, n.prototype.on = function (e, t, n) {
        return this.__events__.hasOwnProperty(e) ? this.__events__[e].push({
            handler: t,
            scope: n || this
        }) : this.__events__[e] = [{handler: t, scope: n || this}], this
    }, n.prototype.off = function (e) {
        try {
            return this.__events__.hasOwnProperty(e) && delete this.__events__[e], this
        } catch (e) {
            console.error('framework code is error ');
        }
    }, n.prototype.offLink = function (e) {
        var t = this.__events__;
        return Object.keys(t).forEach(function (n) {
            t[n].forEach(function (r, i) {
                r.scope === e && t[n].splice(i, 1)
            })
        }), this
    }, n.prototype.offAll = function () {
        return this.__events__ = {}, this
    }, {EventEmitter: n}
}), define("base", ["language", "attribute", "eventEmitter", "jquery"], function (e, t, n, r) {
    function u() {
        s.apply(this, arguments), i.apply(this, arguments), a.apply(this, arguments)
    }

    function a() {
        var e = arguments[0], t = [], n = this;
        if (typeof e == "object") {
            var r;
            for (r in e) {
                var i = r.charAt(0).toUpperCase() + r.substr(1);
                this.hasOwnProperty("set" + i) && this["set" + i](e[r])
            }
        }
        while (n.constructor.prototype.hasOwnProperty("initialize"))t.push(n.initialize), n = n.superclass || {};
        for (var s = t.length - 1; s >= 0; s--)t[s].apply(this, arguments)
    }

    var i = t.Attribute, s = n.EventEmitter, o = e.language;
    return u.prototype.callParent = function () {
        var e = this, t = this.callParent.caller, n = t.__owner__.superclass, r = t.__name__, i = n.prototype[r];
        i && i.apply(e, arguments)
    }, u.prototype.destructor = function () {
    }, u.prototype.destroy = function () {
        var e = this, t = e.constructor.ATTRS || {};
        e.destructor(), Object.keys(t).forEach(function (t) {
            var n = t.charAt(0).toUpperCase() + t.substr(1), r = "set" + n, i = "get" + n, s = "del" + n;
            o.setProp(!0, e, t), delete e[r], delete e[i], delete e[s]
        }), Object.keys(e).forEach(function (t) {
            var n = e[t];
            try{
                n !== null && n != undefined && (r && n.off && n.off().remove && n.off().remove(), n.nodeType && "nodeType" in n && n.parentNode.removeChild(n), n.isWidget && (n.destroy(), FFF && FFF.offLink(n)), t == "boundingBox" && r && (n.off ? n.off().remove() : r(n).off().remove()), e[t] = null, delete e[t])
            }catch (e){
                console.error('framework code is error');
            }
        }), FFF && FFF.offLink(e)
    }, o.mix(u.prototype, i.prototype, !1), o.mix(u.prototype, s.prototype, !1), {Base: u}
}), define("widget", ["base", "language", "require", "jquery"], function (e, t, n, r) {
    function o() {
        i.apply(this, arguments), this.isWidget = !0
    }

    var i = e.Base, s = t.language;
    return o.prototype.initialize = function () {
    }, o.prototype.renderUI = function () {
    }, o.prototype.bindUI = function () {
    }, o.prototype.syncUI = function () {
    }, o.prototype.render = function (e) {
        var t = e ? e : {container: r("body"), type: "append", async: !0}, n = this;
        t.hasOwnProperty("container") || (t.container = r("body")), t.hasOwnProperty("type") || (t.type = "append"), t.hasOwnProperty("async") || (t.async = !0);
        var i = t.container.on ? t.container : r(t.container),
            s = this.getBoundingBox().on ? this.getBoundingBox() : r(this.getBoundingBox());
        return e && typeof e == "object" && e.hasOwnProperty("container") && i[t.type](s), s.parent().length === 0 && (!e || typeof e != "object" || !e.hasOwnProperty("container")) && i[t.type](s), t.async == 1 ? (this.renderUI(e), this.bindUI(e), this.syncUI(e)) : t.async == 0 && this.renderUI(e, function () {
                n.bindUI(e, function () {
                    n.syncUI(e)
                })
            }), this
    }, o.ATTRS = {boundingBox: {value: r('<div class="boundingBox"></div>')}}, s.extend(o, i), {Widget: o}
}), define("FFF", ["base", "language", "widget"], function (e, t, n) {
    function u() {
        this.version = o, i.apply(this, arguments)
    }

    var r = t.language, i = e.Base, s = n.Widget, o = "0.1.2";
    u.STATICS = {Language: r, Base: i, Widget: s}, r.mix(u.prototype, r), r.extend(u, i, u.STATICS);
    var a = new u;
    return window.FFF = a, {FFF: a}
}), !function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function g(e) {
        var t = e.length, n = h.type(e);
        return "function" === n || h.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function S(e, t, n) {
        if (h.isFunction(t))return h.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType)return h.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (E.test(t))return h.filter(t, e, n);
            t = h.filter(t, e)
        }
        return h.grep(e, function (e) {
            return h.inArray(e, t) >= 0 !== n
        })
    }

    function A(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function _(e) {
        var t = M[e] = {};
        return h.each(e.match(O) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function P() {
        T.addEventListener ? (T.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (T.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
    }

    function H() {
        (T.addEventListener || "load" === event.type || "complete" === T.readyState) && (P(), h.ready())
    }

    function q(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(I, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : F.test(n) ? h.parseJSON(n) : n
                } catch (i) {
                }
                h.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function R(e) {
        var t;
        for (t in e)if (("data" !== t || !h.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
        return !0
    }

    function U(e, t, r, i) {
        if (h.acceptData(e)) {
            var s, o, u = h.expando, a = e.nodeType, f = a ? h.cache : e, l = a ? e[u] : e[u] && u;
            if (l && f[l] && (i || f[l].data) || void 0 !== r || "string" != typeof t)return l || (l = a ? e[u] = n.pop() || h.guid++ : u), f[l] || (f[l] = a ? {} : {toJSON: h.noop}), ("object" == typeof t || "function" == typeof t) && (i ? f[l] = h.extend(f[l], t) : f[l].data = h.extend(f[l].data, t)), o = f[l], i || (o.data || (o.data = {}), o = o.data), void 0 !== r && (o[h.camelCase(t)] = r), "string" == typeof t ? (s = o[t], null == s && (s = o[h.camelCase(t)])) : s = o, s
        }
    }

    function z(e, t, n) {
        if (h.acceptData(e)) {
            var r, i, s = e.nodeType, o = s ? h.cache : e, u = s ? e[h.expando] : h.expando;
            if (o[u]) {
                if (t && (r = n ? o[u] : o[u].data)) {
                    h.isArray(t) ? t = t.concat(h.map(t, h.camelCase)) : t in r ? t = [t] : (t = h.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    while (i--)delete r[t[i]];
                    if (n ? !R(r) : !h.isEmptyObject(r))return
                }
                (n || (delete o[u].data, R(o[u]))) && (s ? h.cleanData([e], !0) : l.deleteExpando || o != o.window ? delete o[u] : o[u] = null)
            }
        }
    }

    function et() {
        return !0
    }

    function tt() {
        return !1
    }

    function nt() {
        try {
            return T.activeElement
        } catch (e) {
        }
    }

    function rt(e) {
        var t = it.split("|"), n = e.createDocumentFragment();
        if (n.createElement)while (t.length)n.createElement(t.pop());
        return n
    }

    function wt(e, t) {
        var n, r, i = 0,
            s = typeof e.getElementsByTagName !== B ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== B ? e.querySelectorAll(t || "*") : void 0;
        if (!s)for (s = [], n = e.childNodes || e; null != (r = n[i]); i++)!t || h.nodeName(r, t) ? s.push(r) : h.merge(s, wt(r, t));
        return void 0 === t || t && h.nodeName(e, t) ? h.merge([e], s) : s
    }

    function Et(e) {
        J.test(e.type) && (e.defaultChecked = e.checked)
    }

    function St(e, t) {
        return h.nodeName(e, "table") && h.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function xt(e) {
        return e.type = (null !== h.find.attr(e, "type")) + "/" + e.type, e
    }

    function Tt(e) {
        var t = vt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Nt(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)h._data(n, "globalEval", !t || h._data(t[r], "globalEval"))
    }

    function Ct(e, t) {
        if (1 === t.nodeType && h.hasData(e)) {
            var n, r, i, s = h._data(e), o = h._data(t, s), u = s.events;
            if (u) {
                delete o.handle, o.events = {};
                for (n in u)for (r = 0, i = u[n].length; i > r; r++)h.event.add(t, n, u[n][r])
            }
            o.data && (o.data = h.extend({}, o.data))
        }
    }

    function kt(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !l.noCloneEvent && t[h.expando]) {
                i = h._data(t);
                for (r in i.events)h.removeEvent(t, r, i.handle);
                t.removeAttribute(h.expando)
            }
            "script" === n && t.text !== e.text ? (xt(t).text = e.text, Tt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), l.html5Clone && e.innerHTML && !h.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && J.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function Ot(t, n) {
        var r, i = h(n.createElement(t)).appendTo(n.body),
            s = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : h.css(i[0], "display");
        return i.detach(), s
    }

    function Mt(e) {
        var t = T, n = At[e];
        return n || (n = Ot(e, t), "none" !== n && n || (Lt = (Lt || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Lt[0].contentWindow || Lt[0].contentDocument).document, t.write(), t.close(), n = Ot(e, t), Lt.detach()), At[e] = n), n
    }

    function jt(e, t) {
        return {
            get: function () {
                var n = e();
                if (null != n)return n ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function Vt(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Xt.length;
        while (i--)if (t = Xt[i] + n, t in e)return t;
        return r
    }

    function $t(e, t) {
        for (var n, r, i, s = [], o = 0, u = e.length; u > o; o++)r = e[o], r.style && (s[o] = h._data(r, "olddisplay"), n = r.style.display, t ? (s[o] || "none" !== n || (r.style.display = ""), "" === r.style.display && V(r) && (s[o] = h._data(r, "olddisplay", Mt(r.nodeName)))) : (i = V(r), (n && "none" !== n || !i) && h._data(r, "olddisplay", i ? n : h.css(r, "display"))));
        for (o = 0; u > o; o++)r = e[o], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? s[o] || "" : "none"));
        return e
    }

    function Jt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Kt(e, t, n, r, i) {
        for (var s = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > s; s += 2)"margin" === n && (o += h.css(e, n + X[s], !0, i)), r ? ("content" === n && (o -= h.css(e, "padding" + X[s], !0, i)), "margin" !== n && (o -= h.css(e, "border" + X[s] + "Width", !0, i))) : (o += h.css(e, "padding" + X[s], !0, i), "padding" !== n && (o += h.css(e, "border" + X[s] + "Width", !0, i)));
        return o
    }

    function Qt(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, s = Pt(e),
            o = l.boxSizing && "border-box" === h.css(e, "boxSizing", !1, s);
        if (0 >= i || null == i) {
            if (i = Ht(e, t, s), (0 > i || null == i) && (i = e.style[t]), Dt.test(i))return i;
            r = o && (l.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Kt(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function Gt(e, t, n, r, i) {
        return new Gt.prototype.init(e, t, n, r, i)
    }

    function on() {
        return setTimeout(function () {
            Yt = void 0
        }), Yt = h.now()
    }

    function un(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = X[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function an(e, t, n) {
        for (var r, i = (sn[t] || []).concat(sn["*"]), s = 0, o = i.length; o > s; s++)if (r = i[s].call(n, t, e))return r
    }

    function fn(e, t, n) {
        var r, i, s, o, u, a, f, c, p = this, d = {}, v = e.style, m = e.nodeType && V(e), g = h._data(e, "fxshow");
        n.queue || (u = h._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function () {
            u.unqueued || a()
        }), u.unqueued++, p.always(function () {
            p.always(function () {
                u.unqueued--, h.queue(e, "fx").length || u.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = h.css(e, "display"), c = "none" === f ? h._data(e, "olddisplay") || Mt(e.nodeName) : f, "inline" === c && "none" === h.css(e, "float") && (l.inlineBlockNeedsLayout && "inline" !== Mt(e.nodeName) ? v.zoom = 1 : v.display = "inline-block")), n.overflow && (v.overflow = "hidden", l.shrinkWrapBlocks() || p.always(function () {
            v.overflow = n.overflow[0], v.overflowX = n.overflow[1], v.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], en.exec(i)) {
            if (delete t[r], s = s || "toggle" === i, i === (m ? "hide" : "show")) {
                if ("show" !== i || !g || void 0 === g[r])continue;
                m = !0
            }
            d[r] = g && g[r] || h.style(e, r)
        } else f = void 0;
        if (h.isEmptyObject(d)) "inline" === ("none" === f ? Mt(e.nodeName) : f) && (v.display = f); else {
            g ? "hidden" in g && (m = g.hidden) : g = h._data(e, "fxshow", {}), s && (g.hidden = !m), m ? h(e).show() : p.done(function () {
                h(e).hide()
            }), p.done(function () {
                var t;
                h._removeData(e, "fxshow");
                for (t in d)h.style(e, t, d[t])
            });
            for (r in d)o = an(m ? g[r] : 0, r, p), r in g || (g[r] = o.start, m && (o.end = o.start, o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function ln(e, t) {
        var n, r, i, s, o;
        for (n in e)if (r = h.camelCase(n), i = t[r], s = e[n], h.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = h.cssHooks[r], o && "expand" in o) {
            s = o.expand(s), delete e[r];
            for (n in s)n in e || (e[n] = s[n], t[n] = i)
        } else t[r] = i
    }

    function cn(e, t, n) {
        var r, i, s = 0, o = rn.length, u = h.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            if (i)return !1;
            for (var t = Yt || on(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length; a > o; o++)f.tweens[o].run(s);
            return u.notifyWith(e, [f, s, n]), 1 > s && a ? n : (u.resolveWith(e, [f]), !1)
        }, f = u.promise({
            elem: e,
            props: h.extend({}, t),
            opts: h.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Yt || on(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = h.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                return f.tweens.push(r), r
            },
            stop: function (t) {
                var n = 0, r = t ? f.tweens.length : 0;
                if (i)return this;
                for (i = !0; r > n; n++)f.tweens[n].run(1);
                return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
            }
        }), l = f.props;
        for (ln(l, f.opts.specialEasing); o > s; s++)if (r = rn[s].call(f, e, l, f.opts))return r;
        return h.map(l, an, f), h.isFunction(f.opts.start) && f.opts.start.call(e, f), h.fx.timer(h.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Fn(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, s = t.toLowerCase().match(O) || [];
            if (h.isFunction(n))while (r = s[i++])"+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function In(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, h.each(e[u] || [], function (e, u) {
                var f = u(t, n, r);
                return "string" != typeof f || s || i[f] ? s ? !(a = f) : void 0 : (t.dataTypes.unshift(f), o(f), !1)
            }), a
        }

        var i = {}, s = e === Hn;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function qn(e, t) {
        var n, r, i = h.ajaxSettings.flatOptions || {};
        for (r in t)void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && h.extend(!0, e, n), e
    }

    function Rn(e, t, n) {
        var r, i, s, o, u = e.contents, a = e.dataTypes;
        while ("*" === a[0])a.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)for (o in u)if (u[o] && u[o].test(i)) {
            a.unshift(o);
            break
        }
        if (a[0] in n) s = a[0]; else {
            for (o in n) {
                if (!a[0] || e.converters[o + " " + a[0]]) {
                    s = o;
                    break
                }
                r || (r = o)
            }
            s = s || r
        }
        return s ? (s !== a[0] && a.unshift(s), n[s]) : void 0
    }

    function Un(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1])for (o in e.converters)f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s)if (e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift())if ("*" === s) s = a; else if ("*" !== a && a !== s) {
            if (o = f[a + " " + s] || f["* " + s], !o)for (i in f)if (u = i.split(" "), u[1] === s && (o = f[a + " " + u[0]] || f["* " + u[0]])) {
                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                break
            }
            if (o !== !0)if (o && e["throws"]) t = o(t); else try {
                t = o(t)
            } catch (c) {
                return {state: "parsererror", error: o ? c : "No conversion from " + a + " to " + s}
            }
        }
        return {state: "success", data: t}
    }

    function Jn(e, t, n, r) {
        var i;
        if (h.isArray(t)) h.each(t, function (t, i) {
            n || Wn.test(e) ? r(e, i) : Jn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== h.type(t)) r(e, t); else for (i in t)Jn(e + "[" + i + "]", t[i], n, r)
    }

    function Yn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function Zn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function ir(e) {
        return h.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var n = [], r = n.slice, i = n.concat, s = n.push, o = n.indexOf, u = {}, a = u.toString, f = u.hasOwnProperty,
        l = {}, c = "1.11.2", h = function (e, t) {
            return new h.fn.init(e, t)
        }, p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, d = /^-ms-/, v = /-([\da-z])/gi, m = function (e, t) {
            return t.toUpperCase()
        };
    h.fn = h.prototype = {
        jquery: c, constructor: h, selector: "", length: 0, toArray: function () {
            return r.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : r.call(this)
        }, pushStack: function (e) {
            var t = h.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return h.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(h.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(r.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: s, sort: n.sort, splice: n.splice
    }, h.extend = h.fn.extend = function () {
        var e, t, n, r, i, s, o = arguments[0] || {}, u = 1, a = arguments.length, f = !1;
        for ("boolean" == typeof o && (f = o, o = arguments[u] || {}, u++), "object" == typeof o || h.isFunction(o) || (o = {}), u === a && (o = this, u--); a > u; u++)if (null != (i = arguments[u]))for (r in i)e = o[r], n = i[r], o !== n && (f && n && (h.isPlainObject(n) || (t = h.isArray(n))) ? (t ? (t = !1, s = e && h.isArray(e) ? e : []) : s = e && h.isPlainObject(e) ? e : {}, o[r] = h.extend(f, s, n)) : void 0 !== n && (o[r] = n));
        return o
    }, h.extend({
        expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === h.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === h.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return !h.isArray(e) && e - parseFloat(e) + 1 >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== h.type(e) || e.nodeType || h.isWindow(e))return !1;
            try {
                if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (l.ownLast)for (t in e)return f.call(e, t);
            for (t in e);
            return void 0 === t || f.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[a.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && h.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(d, "ms-").replace(v, m)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, n) {
            var r, i = 0, s = e.length, o = g(e);
            if (n) {
                if (o) {
                    for (; s > i; i++)if (r = t.apply(e[i], n), r === !1)break
                } else for (i in e)if (r = t.apply(e[i], n), r === !1)break
            } else if (o) {
                for (; s > i; i++)if (r = t.call(e[i], i, e[i]), r === !1)break
            } else for (i in e)if (r = t.call(e[i], i, e[i]), r === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(p, "")
        }, makeArray: function (e, t) {
            var n = t || [];
            return null != e && (g(Object(e)) ? h.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n
        }, inArray: function (e, t, n) {
            var r;
            if (t) {
                if (o)return o.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
            }
            return -1
        }, merge: function (e, t) {
            var n = +t.length, r = 0, i = e.length;
            while (n > r)e[i++] = t[r++];
            if (n !== n)while (void 0 !== t[r])e[i++] = t[r++];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var r, i = [], s = 0, o = e.length, u = !n; o > s; s++)r = !t(e[s], s), r !== u && i.push(e[s]);
            return i
        }, map: function (e, t, n) {
            var r, s = 0, o = e.length, u = g(e), a = [];
            if (u)for (; o > s; s++)r = t(e[s], s, n), null != r && a.push(r); else for (s in e)r = t(e[s], s, n), null != r && a.push(r);
            return i.apply([], a)
        }, guid: 1, proxy: function (e, t) {
            var n, i, s;
            return "string" == typeof t && (s = e[t], t = e, e = s), h.isFunction(e) ? (n = r.call(arguments, 2), i = function () {
                return e.apply(t || this, n.concat(r.call(arguments)))
            }, i.guid = e.guid = e.guid || h.guid++, i) : void 0
        }, now: function () {
            return +(new Date)
        }, support: l
    }), h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    });
    var y = function (e) {
        function ot(e, t, r, i) {
            var s, u, f, l, c, d, g, y, S, x;
            if ((t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], l = t.nodeType, "string" != typeof e || !e || 1 !== l && 9 !== l && 11 !== l)return r;
            if (!i && v) {
                if (11 !== l && (s = Z.exec(e)))if (f = s[1]) {
                    if (9 === l) {
                        if (u = t.getElementById(f), !u || !u.parentNode)return r;
                        if (u.id === f)return r.push(u), r
                    } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f)return r.push(u), r
                } else {
                    if (s[2])return D.apply(r, t.getElementsByTagName(e)), r;
                    if ((f = s[3]) && n.getElementsByClassName)return D.apply(r, t.getElementsByClassName(f)), r
                }
                if (n.qsa && (!m || !m.test(e))) {
                    if (y = g = w, S = t, x = 1 !== l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                        d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                        while (c--)d[c] = y + gt(d[c]);
                        S = et.test(e) && vt(t.parentNode) || t, x = d.join(",")
                    }
                    if (x)try {
                        return D.apply(r, S.querySelectorAll(x)), r
                    } catch (T) {
                    } finally {
                        g || t.removeAttribute("id")
                    }
                }
            }
            return a(e.replace(z, "$1"), t, r, i)
        }

        function ut() {
            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }

            var e = [];
            return t
        }

        function at(e) {
            return e[w] = !0, e
        }

        function ft(e) {
            var t = p.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function lt(e, t) {
            var n = e.split("|"), i = e.length;
            while (i--)r.attrHandle[n[i]] = t
        }

        function ct(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || L) - (~e.sourceIndex || L);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return -1;
            return e ? 1 : -1
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function pt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function dt(e) {
            return at(function (t) {
                return t = +t, at(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--)n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function vt(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function mt() {
        }

        function gt(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
            return r
        }

        function yt(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, s = x++;
            return t.first ? function (t, n, s) {
                while (t = t[r])if (1 === t.nodeType || i)return e(t, n, s)
            } : function (t, n, o) {
                var u, a, f = [S, s];
                if (o) {
                    while (t = t[r])if ((1 === t.nodeType || i) && e(t, n, o))return !0
                } else while (t = t[r])if (1 === t.nodeType || i) {
                    if (a = t[w] || (t[w] = {}), (u = a[r]) && u[0] === S && u[1] === s)return f[2] = u[2];
                    if (a[r] = f, f[2] = e(t, n, o))return !0
                }
            }
        }

        function bt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return !1;
                return !0
            } : e[0]
        }

        function wt(e, t, n) {
            for (var r = 0, i = t.length; i > r; r++)ot(e, t[r], n);
            return n
        }

        function Et(e, t, n, r, i) {
            for (var s, o = [], u = 0, a = e.length, f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
            return o
        }

        function St(e, t, n, r, i, s) {
            return r && !r[w] && (r = St(r)), i && !i[w] && (i = St(i, s)), at(function (s, o, u, a) {
                var f, l, c, h = [], p = [], d = o.length, v = s || wt(t || "*", u.nodeType ? [u] : u, []),
                    m = !e || !s && t ? v : Et(v, h, e, u, a), g = n ? i || (s ? e : d || r) ? [] : o : m;
                if (n && n(m, g, u, a), r) {
                    f = Et(g, p), r(f, [], u, a), l = f.length;
                    while (l--)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c))
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = Et(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
            })
        }

        function xt(e) {
            for (var t, n, i, s = e.length, o = r.relative[e[0].type], u = o || r.relative[" "], a = o ? 1 : 0, l = yt(function (e) {
                return e === t
            }, u, !0), c = yt(function (e) {
                return H(t, e) > -1
            }, u, !0), h = [function (e, n, r) {
                var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                return t = null, i
            }]; s > a; a++)if (n = r.relative[e[a].type]) h = [yt(bt(h), n)]; else {
                if (n = r.filter[e[a].type].apply(null, e[a].matches), n[w]) {
                    for (i = ++a; s > i; i++)if (r.relative[e[i].type])break;
                    return St(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(z, "$1"), n, i > a && xt(e.slice(a, i)), s > i && xt(e = e.slice(i)), s > i && gt(e))
                }
                h.push(n)
            }
            return bt(h)
        }

        function Tt(e, t) {
            var n = t.length > 0, i = e.length > 0, s = function (s, o, u, a, l) {
                var c, h, d, v = 0, m = "0", g = s && [], y = [], b = f, w = s || i && r.find.TAG("*", l),
                    E = S += null == b ? 1 : Math.random() || .1, x = w.length;
                for (l && (f = o !== p && o); m !== x && null != (c = w[m]); m++) {
                    if (i && c) {
                        h = 0;
                        while (d = e[h++])if (d(c, o, u)) {
                            a.push(c);
                            break
                        }
                        l && (S = E)
                    }
                    n && ((c = !d && c) && v--, s && g.push(c))
                }
                if (v += m, n && m !== v) {
                    h = 0;
                    while (d = t[h++])d(g, y, o, u);
                    if (s) {
                        if (v > 0)while (m--)g[m] || y[m] || (y[m] = M.call(a));
                        y = Et(y)
                    }
                    D.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && ot.uniqueSort(a)
                }
                return l && (S = E, f = b), g
            };
            return n ? at(s) : s
        }

        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date, E = e.document, S = 0,
            x = 0, T = ut(), N = ut(), C = ut(), k = function (e, t) {
                return e === t && (c = !0), 0
            }, L = 1 << 31, A = {}.hasOwnProperty, O = [], M = O.pop, _ = O.push, D = O.push, P = O.slice,
            H = function (e, t) {
                for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                return -1
            },
            B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            j = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", I = F.replace("w", "w#"),
            q = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + j + "*\\]",
            R = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
            U = new RegExp(j + "+", "g"), z = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
            W = new RegExp("^" + j + "*," + j + "*"), X = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
            V = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"), $ = new RegExp(R),
            J = new RegExp("^" + I + "$"), K = {
                ID: new RegExp("^#(" + F + ")"),
                CLASS: new RegExp("^\\.(" + F + ")"),
                TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + q),
                PSEUDO: new RegExp("^" + R),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + B + ")$", "i"),
                needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
            }, Q = /^(?:input|select|textarea|button)$/i, G = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /[+~]/, tt = /'|\\/g,
            nt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"), rt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, it = function () {
                h()
            };
        try {
            D.apply(O = P.call(E.childNodes), E.childNodes), O[E.childNodes.length].nodeType
        } catch (st) {
            D = {
                apply: O.length ? function (e, t) {
                    _.apply(e, P.call(t))
                } : function (e, t) {
                    var n = e.length, r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        n = ot.support = {}, s = ot.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, h = ot.setDocument = function (e) {
            var t, i, o = e ? e.ownerDocument || e : E;
            return o !== p && 9 === o.nodeType && o.documentElement ? (p = o, d = o.documentElement, i = o.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), v = !s(o), n.attributes = ft(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ft(function (e) {
                return e.appendChild(o.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Y.test(o.getElementsByClassName), n.getById = ft(function (e) {
                return d.appendChild(e).id = w, !o.getElementsByName || !o.getElementsByName(w).length
            }), n.getById ? (r.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && v) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, s = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = s[i++])1 === n.nodeType && r.push(n);
                    return r
                }
                return s
            }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
                    return v ? t.getElementsByClassName(e) : void 0
                }, g = [], m = [], (n.qsa = Y.test(o.querySelectorAll)) && (ft(function (e) {
                d.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
            }), ft(function (e) {
                var t = o.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            })), (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ft(function (e) {
                n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", R)
            }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !!r && 1 === r.nodeType && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return !0;
                return !1
            }, k = t ? function (e, t) {
                if (e === t)return c = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === o || e.ownerDocument === E && b(E, e) ? -1 : t === o || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : 4 & r ? -1 : 1)
            } : function (e, t) {
                if (e === t)return c = !0, 0;
                var n, r = 0, i = e.parentNode, s = t.parentNode, u = [e], a = [t];
                if (!i || !s)return e === o ? -1 : t === o ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
                if (i === s)return ct(e, t);
                n = e;
                while (n = n.parentNode)u.unshift(n);
                n = t;
                while (n = n.parentNode)a.unshift(n);
                while (u[r] === a[r])r++;
                return r ? ct(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
            }, o) : p
        }, ot.matches = function (e, t) {
            return ot(e, null, null, t)
        }, ot.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']"), !(!n.matchesSelector || !v || g && g.test(t) || m && m.test(t)))try {
                var r = y.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
            } catch (i) {
            }
            return ot(t, p, null, [e]).length > 0
        }, ot.contains = function (e, t) {
            return (e.ownerDocument || e) !== p && h(e), b(e, t)
        }, ot.attr = function (e, t) {
            (e.ownerDocument || e) !== p && h(e);
            var i = r.attrHandle[t.toLowerCase()],
                s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
            return void 0 !== s ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }, ot.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, ot.uniqueSort = function (e) {
            var t, r = [], i = 0, s = 0;
            if (c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k), c) {
                while (t = e[s++])t === e[s] && (i = r.push(s));
                while (i--)e.splice(r[i], 1)
            }
            return l = null, e
        }, i = ot.getText = function (e) {
            var t, n = "", r = 0, s = e.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += i(e)
                } else if (3 === s || 4 === s)return e.nodeValue
            } else while (t = e[r++])n += i(t);
            return n
        }, r = ot.selectors = {
            cacheLength: 50,
            createPseudo: at,
            match: K,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = T[e + " "];
                    return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, t, n) {
                    return function (r) {
                        var i = ot.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var s = "nth" !== e.slice(0, 3), o = "last" !== e.slice(-4), u = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling", m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(), y = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])if (u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType)return !1;
                                    d = v = "only" === e && !d && "nextSibling"
                                }
                                return !0
                            }
                            if (d = [o ? m.firstChild : m.lastChild], o && y) {
                                l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if (1 === c.nodeType && ++h && c === t) {
                                    l[e] = [S, p, h];
                                    break
                                }
                            } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1]; else while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if ((u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++h && (y && ((c[w] || (c[w] = {}))[e] = [S, h]), c === t))break;
                            return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                }, PSEUDO: function (e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function (e, n) {
                        var r, s = i(e, t), o = s.length;
                        while (o--)r = H(e, s[o]), e[r] = !(n[r] = s[o])
                    }) : function (e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: at(function (e) {
                    var t = [], n = [], r = u(e.replace(z, "$1"));
                    return r[w] ? at(function (e, t, n, i) {
                        var s, o = r(e, null, i, []), u = e.length;
                        while (u--)(s = o[u]) && (e[u] = !(t[u] = s))
                    }) : function (e, i, s) {
                        return t[0] = e, r(t, null, s, n), t[0] = null, !n.pop()
                    }
                }), has: at(function (e) {
                    return function (t) {
                        return ot(e, t).length > 0
                    }
                }), contains: at(function (e) {
                    return e = e.replace(nt, rt), function (t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }), lang: at(function (e) {
                    return J.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(), function (t) {
                        var n;
                        do if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === d
                }, focus: function (e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !r.pseudos.empty(e)
                }, header: function (e) {
                    return G.test(e.nodeName)
                }, input: function (e) {
                    return Q.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: dt(function () {
                    return [0]
                }), last: dt(function (e, t) {
                    return [t - 1]
                }), eq: dt(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: dt(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: dt(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: dt(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                    return e
                }), gt: dt(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})r.pseudos[t] = ht(t);
        for (t in{submit: !0, reset: !0})r.pseudos[t] = pt(t);
        return mt.prototype = r.filters = r.pseudos, r.setFilters = new mt, o = ot.tokenize = function (e, t) {
            var n, i, s, o, u, a, f, l = N[e + " "];
            if (l)return t ? 0 : l.slice(0);
            u = e, a = [], f = r.preFilter;
            while (u) {
                (!n || (i = W.exec(u))) && (i && (u = u.slice(i[0].length) || u), a.push(s = [])), n = !1, (i = X.exec(u)) && (n = i.shift(), s.push({
                    value: n,
                    type: i[0].replace(z, " ")
                }), u = u.slice(n.length));
                for (o in r.filter)!(i = K[o].exec(u)) || f[o] && !(i = f[o](i)) || (n = i.shift(), s.push({
                    value: n,
                    type: o,
                    matches: i
                }), u = u.slice(n.length));
                if (!n)break
            }
            return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
        }, u = ot.compile = function (e, t) {
            var n, r = [], i = [], s = C[e + " "];
            if (!s) {
                t || (t = o(e)), n = t.length;
                while (n--)s = xt(t[n]), s[w] ? r.push(s) : i.push(s);
                s = C(e, Tt(i, r)), s.selector = e
            }
            return s
        }, a = ot.select = function (e, t, i, s) {
            var a, f, l, c, h, p = "function" == typeof e && e, d = !s && o(e = p.selector || e);
            if (i = i || [], 1 === d.length) {
                if (f = d[0] = d[0].slice(0), f.length > 2 && "ID" === (l = f[0]).type && n.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
                    if (t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t)return i;
                    p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                }
                a = K.needsContext.test(e) ? 0 : f.length;
                while (a--) {
                    if (l = f[a], r.relative[c = l.type])break;
                    if ((h = r.find[c]) && (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && vt(t.parentNode) || t))) {
                        if (f.splice(a, 1), e = s.length && gt(f), !e)return D.apply(i, s), i;
                        break
                    }
                }
            }
            return (p || u(e, d))(s, t, !v, i, et.test(e) && vt(t.parentNode) || t), i
        }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = ft(function (e) {
            return 1 & e.compareDocumentPosition(p.createElement("div"))
        }), ft(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || lt("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ft(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || lt("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), ft(function (e) {
            return null == e.getAttribute("disabled")
        }) || lt(B, function (e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), ot
    }(e);
    h.find = y, h.expr = y.selectors, h.expr[":"] = h.expr.pseudos, h.unique = y.uniqueSort, h.text = y.getText, h.isXMLDoc = y.isXML, h.contains = y.contains;
    var b = h.expr.match.needsContext, w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, E = /^.[^:#\[\.,]*$/;
    h.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? h.find.matchesSelector(r, e) ? [r] : [] : h.find.matches(e, h.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, h.fn.extend({
        find: function (e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e)return this.pushStack(h(e).filter(function () {
                for (t = 0; i > t; t++)if (h.contains(r[t], this))return !0
            }));
            for (t = 0; i > t; t++)h.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? h.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(S(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(S(this, e || [], !0))
        }, is: function (e) {
            return !!S(this, "string" == typeof e && b.test(e) ? h(e) : e || [], !1).length
        }
    });
    var x, T = e.document, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = h.fn.init = function (e, t) {
        var n, r;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || x).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof h ? t[0] : t, h.merge(this, h.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), w.test(n[1]) && h.isPlainObject(t))for (n in t)h.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (r = T.getElementById(n[2]), r && r.parentNode) {
                if (r.id !== n[2])return x.find(e);
                this.length = 1, this[0] = r
            }
            return this.context = T, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : h.isFunction(e) ? "undefined" != typeof x.ready ? x.ready(e) : e(h) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), h.makeArray(e, this))
    };
    C.prototype = h.fn, x = h(T);
    var k = /^(?:parents|prev(?:Until|All))/, L = {children: !0, contents: !0, next: !0, prev: !0};
    h.extend({
        dir: function (e, t, n) {
            var r = [], i = e[t];
            while (i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !h(i).is(n)))1 === i.nodeType && r.push(i), i = i[t];
            return r
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), h.fn.extend({
        has: function (e) {
            var t, n = h(e, this), r = n.length;
            return this.filter(function () {
                for (t = 0; r > t; t++)if (h.contains(this, n[t]))return !0
            })
        }, closest: function (e, t) {
            for (var n, r = 0, i = this.length, s = [], o = b.test(e) || "string" != typeof e ? h(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && h.find.matchesSelector(n, e))) {
                s.push(n);
                break
            }
            return this.pushStack(s.length > 1 ? h.unique(s) : s)
        }, index: function (e) {
            return e ? "string" == typeof e ? h.inArray(this[0], h(e)) : h.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(h.unique(h.merge(this.get(), h(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), h.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return h.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return h.dir(e, "parentNode", n)
        }, next: function (e) {
            return A(e, "nextSibling")
        }, prev: function (e) {
            return A(e, "previousSibling")
        }, nextAll: function (e) {
            return h.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return h.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return h.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return h.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return h.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return h.sibling(e.firstChild)
        }, contents: function (e) {
            return h.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : h.merge([], e.childNodes)
        }
    }, function (e, t) {
        h.fn[e] = function (n, r) {
            var i = h.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = h.filter(r, i)), this.length > 1 && (L[e] || (i = h.unique(i)), k.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var O = /\S+/g, M = {};
    h.Callbacks = function (e) {
        e = "string" == typeof e ? M[e] || _(e) : h.extend({}, e);
        var t, n, r, i, s, o, u = [], a = !e.once && [], f = function (c) {
            for (n = e.memory && c, r = !0, s = o || 0, o = 0, i = u.length, t = !0; u && i > s; s++)if (u[s].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, u && (a ? a.length && f(a.shift()) : n ? u = [] : l.disable())
        }, l = {
            add: function () {
                if (u) {
                    var r = u.length;
                    !function s(t) {
                        h.each(t, function (t, n) {
                            var r = h.type(n);
                            "function" === r ? e.unique && l.has(n) || u.push(n) : n && n.length && "string" !== r && s(n)
                        })
                    }(arguments), t ? i = u.length : n && (o = r, f(n))
                }
                return this
            }, remove: function () {
                return u && h.each(arguments, function (e, n) {
                    var r;
                    while ((r = h.inArray(n, u, r)) > -1)u.splice(r, 1), t && (i >= r && i--, s >= r && s--)
                }), this
            }, has: function (e) {
                return e ? h.inArray(e, u) > -1 : !!u && !!u.length
            }, empty: function () {
                return u = [], i = 0, this
            }, disable: function () {
                return u = a = n = void 0, this
            }, disabled: function () {
                return !u
            }, lock: function () {
                return a = void 0, n || l.disable(), this
            }, locked: function () {
                return !a
            }, fireWith: function (e, n) {
                return !u || r && !a || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? a.push(n) : f(n)), this
            }, fire: function () {
                return l.fireWith(this, arguments), this
            }, fired: function () {
                return !!r
            }
        };
        return l
    }, h.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", h.Callbacks("once memory"), "resolved"], ["reject", "fail", h.Callbacks("once memory"), "rejected"], ["notify", "progress", h.Callbacks("memory")]],
                n = "pending", r = {
                    state: function () {
                        return n
                    }, always: function () {
                        return i.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return h.Deferred(function (n) {
                            h.each(t, function (t, s) {
                                var o = h.isFunction(e[t]) && e[t];
                                i[s[1]](function () {
                                    var e = o && o.apply(this, arguments);
                                    e && h.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? h.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, h.each(t, function (e, s) {
                var o = s[2], u = s[3];
                r[s[1]] = o.add, u && o.add(function () {
                    n = u
                }, t[1 ^ e][2].disable, t[2][2].lock), i[s[0]] = function () {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t = 0, n = r.call(arguments), i = n.length, s = 1 !== i || e && h.isFunction(e.promise) ? i : 0,
                o = 1 === s ? e : h.Deferred(), u = function (e, t, n) {
                    return function (i) {
                        t[e] = this, n[e] = arguments.length > 1 ? r.call(arguments) : i, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                    }
                }, a, f, l;
            if (i > 1)for (a = new Array(i), f = new Array(i), l = new Array(i); i > t; t++)n[t] && h.isFunction(n[t].promise) ? n[t].promise().done(u(t, l, n)).fail(o.reject).progress(u(t, f, a)) : --s;
            return s || o.resolveWith(l, n), o.promise()
        }
    });
    var D;
    h.fn.ready = function (e) {
        return h.ready.promise().done(e), this
    }, h.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? h.readyWait++ : h.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--h.readyWait : !h.isReady) {
                if (!T.body)return setTimeout(h.ready);
                h.isReady = !0, e !== !0 && --h.readyWait > 0 || (D.resolveWith(T, [h]), h.fn.triggerHandler && (h(T).triggerHandler("ready"), h(T).off("ready")))
            }
        }
    }), h.ready.promise = function (t) {
        if (!D)if (D = h.Deferred(), "complete" === T.readyState) setTimeout(h.ready); else if (T.addEventListener) T.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1); else {
            T.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
            var n = !1;
            try {
                n = null == e.frameElement && T.documentElement
            } catch (r) {
            }
            n && n.doScroll && !function i() {
                if (!h.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    P(), h.ready()
                }
            }()
        }
        return D.promise(t)
    };
    var B = "undefined", j;
    for (j in h(l))break;
    l.ownLast = "0" !== j, l.inlineBlockNeedsLayout = !1, h(function () {
        var e, t, n, r;
        n = T.getElementsByTagName("body")[0], n && n.style && (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
    }), function () {
        var e = T.createElement("div");
        if (null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                l.deleteExpando = !1
            }
        }
        e = null
    }(), h.acceptData = function (e) {
        var t = h.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, I = /([A-Z])/g;
    h.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return e = e.nodeType ? h.cache[e[h.expando]] : e[h.expando], !!e && !R(e)
        },
        data: function (e, t, n) {
            return U(e, t, n)
        },
        removeData: function (e, t) {
            return z(e, t)
        },
        _data: function (e, t, n) {
            return U(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return z(e, t, !0)
        }
    }), h.fn.extend({
        data: function (e, t) {
            var n, r, i, s = this[0], o = s && s.attributes;
            if (void 0 === e) {
                if (this.length && (i = h.data(s), 1 === s.nodeType && !h._data(s, "parsedAttrs"))) {
                    n = o.length;
                    while (n--)o[n] && (r = o[n].name, 0 === r.indexOf("data-") && (r = h.camelCase(r.slice(5)), q(s, r, i[r])));
                    h._data(s, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                h.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                h.data(this, e, t)
            }) : s ? q(s, e, h.data(s, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                h.removeData(this, e)
            })
        }
    }), h.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = h._data(e, t), n && (!r || h.isArray(n) ? r = h._data(e, t, h.makeArray(n)) : r.push(n)), r || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = h.queue(e, t), r = n.length, i = n.shift(), s = h._queueHooks(e, t), o = function () {
                h.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return h._data(e, n) || h._data(e, n, {
                    empty: h.Callbacks("once memory").add(function () {
                        h._removeData(e, t + "queue"), h._removeData(e, n)
                    })
                })
        }
    }), h.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? h.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = h.queue(this, e, t);
                h._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && h.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                h.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1, i = h.Deferred(), s = this, o = this.length, u = function () {
                --r || i.resolveWith(s, [s])
            };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (o--)n = h._data(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, X = ["Top", "Right", "Bottom", "Left"], V = function (e, t) {
        return e = t || e, "none" === h.css(e, "display") || !h.contains(e.ownerDocument, e)
    }, $ = h.access = function (e, t, n, r, i, s, o) {
        var u = 0, a = e.length, f = null == n;
        if ("object" === h.type(n)) {
            i = !0;
            for (u in n)h.access(e, t, u, n[u], !0, s, o)
        } else if (void 0 !== r && (i = !0, h.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function (e, t, n) {
                return f.call(h(e), n)
            })), t))for (; a > u; u++)t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)));
        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    }, J = /^(?:checkbox|radio)$/i;
    !function () {
        var e = T.createElement("input"), t = T.createElement("div"), n = T.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = 3 === t.firstChild.nodeType, l.tbody = !t.getElementsByTagName("tbody").length, l.htmlSerialize = !!t.getElementsByTagName("link").length, l.html5Clone = "<:nav></:nav>" !== T.createElement("nav").cloneNode(!0).outerHTML, e.type = "checkbox", e.checked = !0, n.appendChild(e), l.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", l.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                l.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == l.deleteExpando) {
            l.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                l.deleteExpando = !1
            }
        }
    }(), function () {
        var t, n, r = T.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        })n = "on" + t, (l[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), l[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var K = /^(?:input|select|textarea)$/i, Q = /^key/, G = /^(?:mouse|pointer|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/, Z = /^([^.]*)(?:\.(.+)|)$/;
    h.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, p, d, v, m, g = h._data(e);
            if (g) {
                n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = h.guid++), (o = g.events) || (o = g.events = {}), (l = g.handle) || (l = g.handle = function (e) {
                    return typeof h === B || e && h.event.triggered === e.type ? void 0 : h.event.dispatch.apply(l.elem, arguments)
                }, l.elem = e), t = (t || "").match(O) || [""], u = t.length;
                while (u--)s = Z.exec(t[u]) || [], d = m = s[1], v = (s[2] || "").split(".").sort(), d && (f = h.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = h.event.special[d] || {}, c = h.extend({
                    type: d,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && h.expr.match.needsContext.test(i),
                    namespace: v.join(".")
                }, a), (p = o[d]) || (p = o[d] = [], p.delegateCount = 0, f.setup && f.setup.call(e, r, v, l) !== !1 || (e.addEventListener ? e.addEventListener(d, l, !1) : e.attachEvent && e.attachEvent("on" + d, l))), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), h.event.global[d] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, p, d, v, m, g = h.hasData(e) && h._data(e);
            if (g && (l = g.events)) {
                t = (t || "").match(O) || [""], f = t.length;
                while (f--)if (u = Z.exec(t[f]) || [], d = m = u[1], v = (u[2] || "").split(".").sort(), d) {
                    c = h.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, p = l[d] || [], u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = p.length;
                    while (s--)o = p[s], !i && m !== o.origType || n && n.guid !== o.guid || u && !u.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (p.splice(s, 1), o.selector && p.delegateCount--, c.remove && c.remove.call(e, o));
                    a && !p.length && (c.teardown && c.teardown.call(e, v, g.handle) !== !1 || h.removeEvent(e, d, g.handle), delete l[d])
                } else for (d in l)h.event.remove(e, d + t[f], n, r, !0);
                h.isEmptyObject(l) && (delete g.handle, h._removeData(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var s, o, u, a, l, c, p, d = [r || T], v = f.call(t, "type") ? t.type : t,
                m = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (u = c = r = r || T, 3 !== r.nodeType && 8 !== r.nodeType && !Y.test(v + h.event.triggered) && (v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), o = v.indexOf(":") < 0 && "on" + v, t = t[h.expando] ? t : new h.Event(v, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : h.makeArray(n, [t]), l = h.event.special[v] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !h.isWindow(r)) {
                    for (a = l.delegateType || v, Y.test(a + v) || (u = u.parentNode); u; u = u.parentNode)d.push(u), c = u;
                    c === (r.ownerDocument || T) && d.push(c.defaultView || c.parentWindow || e)
                }
                p = 0;
                while ((u = d[p++]) && !t.isPropagationStopped())t.type = p > 1 ? a : l.bindType || v, s = (h._data(u, "events") || {})[t.type] && h._data(u, "handle"), s && s.apply(u, n), s = o && u[o], s && s.apply && h.acceptData(u) && (t.result = s.apply(u, n), t.result === !1 && t.preventDefault());
                if (t.type = v, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && h.acceptData(r) && o && r[v] && !h.isWindow(r)) {
                    c = r[o], c && (r[o] = null), h.event.triggered = v;
                    try {
                        r[v]()
                    } catch (g) {
                    }
                    h.event.triggered = void 0, c && (r[o] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = h.event.fix(e);
            var t, n, i, s, o, u = [], a = r.call(arguments), f = (h._data(this, "events") || {})[e.type] || [],
                l = h.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                u = h.event.handlers.call(this, e, f), t = 0;
                while ((s = u[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = s.elem, o = 0;
                    while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((h.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, s, o = [], u = t.delegateCount, a = e.target;
            if (u && a.nodeType && (!e.button || "click" !== e.type))for (; a != this; a = a.parentNode || this)if (1 === a.nodeType && (a.disabled !== !0 || "click" !== e.type)) {
                for (i = [], s = 0; u > s; s++)r = t[s], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? h(n, this).index(a) >= 0 : h.find(n, this, null, [a]).length), i[n] && i.push(r);
                i.length && o.push({elem: a, handlers: i})
            }
            return u < t.length && o.push({elem: this, handlers: t.slice(u)}), o
        },
        fix: function (e) {
            if (e[h.expando])return e;
            var t, n, r, i = e.type, s = e, o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = G.test(i) ? this.mouseHooks : Q.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new h.Event(s), t = r.length;
            while (t--)n = r[t], e[n] = s[n];
            return e.target || (e.target = s.srcElement || T), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, s) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, s = t.button, o = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || T, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== nt() && this.focus)try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === nt() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return h.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return h.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = h.extend(new h.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? h.event.trigger(i, null, t) : h.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, h.removeEvent = T.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === B && (e[r] = null), e.detachEvent(r, n))
    }, h.Event = function (e, t) {
        return this instanceof h.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? et : tt) : this.type = e, t && h.extend(this, t), this.timeStamp = e && e.timeStamp || h.now(), void (this[h.expando] = !0)) : new h.Event(e, t)
    }, h.Event.prototype = {
        isDefaultPrevented: tt,
        isPropagationStopped: tt,
        isImmediatePropagationStopped: tt,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = et, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = et, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = et, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, h.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        h.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, r = this, i = e.relatedTarget, s = e.handleObj;
                return (!i || i !== r && !h.contains(r, i)) && (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), l.submitBubbles || (h.event.special.submit = {
        setup: function () {
            return h.nodeName(this, "form") ? !1 : void h.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = h.nodeName(t, "input") || h.nodeName(t, "button") ? t.form : void 0;
                n && !h._data(n, "submitBubbles") && (h.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), h._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && h.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return h.nodeName(this, "form") ? !1 : void h.event.remove(this, "._submit")
        }
    }), l.changeBubbles || (h.event.special.change = {
        setup: function () {
            return K.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (h.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), h.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), h.event.simulate("change", this, e, !0)
            })), !1) : void h.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                K.test(t.nodeName) && !h._data(t, "changeBubbles") && (h.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || h.event.simulate("change", this.parentNode, e, !0)
                }), h._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return h.event.remove(this, "._change"), !K.test(this.nodeName)
        }
    }), l.focusinBubbles || h.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            h.event.simulate(t, e.target, h.event.fix(e), !0)
        };
        h.event.special[t] = {
            setup: function () {
                var r = this.ownerDocument || this, i = h._data(r, t);
                i || r.addEventListener(e, n, !0), h._data(r, t, (i || 0) + 1)
            }, teardown: function () {
                var r = this.ownerDocument || this, i = h._data(r, t) - 1;
                i ? h._data(r, t, i) : (r.removeEventListener(e, n, !0), h._removeData(r, t))
            }
        }
    }), h.fn.extend({
        on: function (e, t, n, r, i) {
            var s, o;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (s in e)this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1) r = tt; else if (!r)return this;
            return 1 === i && (o = r, r = function (e) {
                return h().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = h.guid++)), this.each(function () {
                h.event.add(this, e, r, n, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)return r = e.handleObj, h(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e)this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = tt), this.each(function () {
                h.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                h.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? h.event.trigger(e, t, n, !0) : void 0
        }
    });
    var it = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        st = / jQuery\d+="(?:null|\d+)"/g, ot = new RegExp("<(?:" + it + ")[\\s/>]", "i"), ut = /^\s+/,
        at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ft = /<([\w:]+)/,
        lt = /<tbody/i, ct = /<|&#?\w+;/, ht = /<(?:script|style|link)/i, pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        dt = /^$|\/(?:java|ecma)script/i, vt = /^true\/(.*)/, mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, gt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, yt = rt(T), bt = yt.appendChild(T.createElement("div"));
    gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td, h.extend({
        clone: function (e, t, n) {
            var r, i, s, o, u, a = h.contains(e.ownerDocument, e);
            if (l.html5Clone || h.isXMLDoc(e) || !ot.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (bt.innerHTML = e.outerHTML, bt.removeChild(s = bt.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || h.isXMLDoc(e)))for (r = wt(s), u = wt(e), o = 0; null != (i = u[o]); ++o)r[o] && kt(i, r[o]);
            if (t)if (n)for (u = u || wt(e), r = r || wt(s), o = 0; null != (i = u[o]); o++)Ct(i, r[o]); else Ct(e, s);
            return r = wt(s, "script"), r.length > 0 && Nt(r, !a && wt(e, "script")), r = u = i = null, s
        }, buildFragment: function (e, t, n, r) {
            for (var i, s, o, u, a, f, c, p = e.length, d = rt(t), v = [], m = 0; p > m; m++)if (s = e[m], s || 0 === s)if ("object" === h.type(s)) h.merge(v, s.nodeType ? [s] : s); else if (ct.test(s)) {
                u = u || d.appendChild(t.createElement("div")), a = (ft.exec(s) || ["", ""])[1].toLowerCase(), c = gt[a] || gt._default, u.innerHTML = c[1] + s.replace(at, "<$1></$2>") + c[2], i = c[0];
                while (i--)u = u.lastChild;
                if (!l.leadingWhitespace && ut.test(s) && v.push(t.createTextNode(ut.exec(s)[0])), !l.tbody) {
                    s = "table" !== a || lt.test(s) ? "<table>" !== c[1] || lt.test(s) ? 0 : u : u.firstChild, i = s && s.childNodes.length;
                    while (i--)h.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
                }
                h.merge(v, u.childNodes), u.textContent = "";
                while (u.firstChild)u.removeChild(u.firstChild);
                u = d.lastChild
            } else v.push(t.createTextNode(s));
            u && d.removeChild(u), l.appendChecked || h.grep(wt(v, "input"), Et), m = 0;
            while (s = v[m++])if ((!r || -1 === h.inArray(s, r)) && (o = h.contains(s.ownerDocument, s), u = wt(d.appendChild(s), "script"), o && Nt(u), n)) {
                i = 0;
                while (s = u[i++])dt.test(s.type || "") && n.push(s)
            }
            return u = null, d
        }, cleanData: function (e, t) {
            for (var r, i, s, o, u = 0, a = h.expando, f = h.cache, c = l.deleteExpando, p = h.event.special; null != (r = e[u]); u++)if ((t || h.acceptData(r)) && (s = r[a], o = s && f[s])) {
                if (o.events)for (i in o.events)p[i] ? h.event.remove(r, i) : h.removeEvent(r, i, o.handle);
                f[s] && (delete f[s], c ? delete r[a] : typeof r.removeAttribute !== B ? r.removeAttribute(a) : r[a] = null, n.push(s))
            }
        }
    }), h.fn.extend({
        text: function (e) {
            return $(this, function (e) {
                return void 0 === e ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = St(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = St(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, r = e ? h.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || h.cleanData(wt(n)), n.parentNode && (t && h.contains(n.ownerDocument, n) && Nt(wt(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                1 === e.nodeType && h.cleanData(wt(e, !1));
                while (e.firstChild)e.removeChild(e.firstChild);
                e.options && h.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return h.clone(this, e, t)
            })
        }, html: function (e) {
            return $(this, function (e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(st, "") : void 0;
                if (!("string" != typeof e || ht.test(e) || !l.htmlSerialize && ot.test(e) || !l.leadingWhitespace && ut.test(e) || gt[(ft.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(at, "<$1></$2>");
                    try {
                        for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (h.cleanData(wt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, h.cleanData(wt(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = i.apply([], e);
            var n, r, s, o, u, a, f = 0, c = this.length, p = this, d = c - 1, v = e[0], m = h.isFunction(v);
            if (m || c > 1 && "string" == typeof v && !l.checkClone && pt.test(v))return this.each(function (n) {
                var r = p.eq(n);
                m && (e[0] = v.call(this, n, r.html())), r.domManip(e, t)
            });
            if (c && (a = h.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                for (o = h.map(wt(a, "script"), xt), s = o.length; c > f; f++)r = a, f !== d && (r = h.clone(r, !0, !0), s && h.merge(o, wt(r, "script"))), t.call(this[f], r, f);
                if (s)for (u = o[o.length - 1].ownerDocument, h.map(o, Tt), f = 0; s > f; f++)r = o[f], dt.test(r.type || "") && !h._data(r, "globalEval") && h.contains(u, r) && (r.src ? h._evalUrl && h._evalUrl(r.src) : h.globalEval((r.text || r.textContent || r.innerHTML || "").replace(mt, "")));
                a = n = null
            }
            return this
        }
    }), h.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        h.fn[e] = function (e) {
            for (var n, r = 0, i = [], o = h(e), u = o.length - 1; u >= r; r++)n = r === u ? this : this.clone(!0), h(o[r])[t](n), s.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Lt, At = {};
    !function () {
        var e;
        l.shrinkWrapBlocks = function () {
            if (null != e)return e;
            e = !1;
            var t, n, r;
            return n = T.getElementsByTagName("body")[0], n && n.style ? (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(T.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
        }
    }();
    var _t = /^margin/, Dt = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"), Pt, Ht, Bt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (Pt = function (t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    }, Ht = function (e, t, n) {
        var r, i, s, o, u = e.style;
        return n = n || Pt(e), o = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== o || h.contains(e.ownerDocument, e) || (o = h.style(e, t)), Dt.test(o) && _t.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), void 0 === o ? o : o + ""
    }) : T.documentElement.currentStyle && (Pt = function (e) {
            return e.currentStyle
        }, Ht = function (e, t, n) {
            var r, i, s, o, u = e.style;
            return n = n || Pt(e), o = n ? n[t] : void 0, null == o && u && u[t] && (o = u[t]), Dt.test(o) && !Bt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = "fontSize" === t ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)), void 0 === o ? o : o + "" || "auto"
        }), !function () {
        var t, n, r, i, s, o, u;
        if (t = T.createElement("div"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = r && r.style) {
            n.cssText = "float:left;opacity:.5", l.opacity = "0.5" === n.opacity, l.cssFloat = !!n.cssFloat, t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === t.style.backgroundClip, l.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, h.extend(l, {
                reliableHiddenOffsets: function () {
                    return null == o && a(), o
                }, boxSizingReliable: function () {
                    return null == s && a(), s
                }, pixelPosition: function () {
                    return null == i && a(), i
                }, reliableMarginRight: function () {
                    return null == u && a(), u
                }
            });
            function a() {
                var t, n, r, a;
                n = T.getElementsByTagName("body")[0], n && n.style && (t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i = s = !1, u = !0, e.getComputedStyle && (i = "1%" !== (e.getComputedStyle(t, null) || {}).top, s = "4px" === (e.getComputedStyle(t, null) || {width: "4px"}).width, a = t.appendChild(T.createElement("div")), a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight), t.removeChild(a)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = t.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === a[0].offsetHeight, o && (a[0].style.display = "", a[1].style.display = "none", o = 0 === a[0].offsetHeight), n.removeChild(r))
            }
        }
    }(), h.swap = function (e, t, n, r) {
        var i, s, o = {};
        for (s in t)o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t)e.style[s] = o[s];
        return i
    };
    var Ft = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, qt = /^(none|table(?!-c[ea]).+)/,
        Rt = new RegExp("^(" + W + ")(.*)$", "i"), Ut = new RegExp("^([+-])=(" + W + ")", "i"),
        zt = {position: "absolute", visibility: "hidden", display: "block"},
        Wt = {letterSpacing: "0", fontWeight: "400"}, Xt = ["Webkit", "O", "Moz", "ms"];
    h.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Ht(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": l.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, s, o, u = h.camelCase(t), a = e.style;
                if (t = h.cssProps[u] || (h.cssProps[u] = Vt(a, u)), o = h.cssHooks[t] || h.cssHooks[u], void 0 === n)return o && "get" in o && void 0 !== (i = o.get(e, !1, r)) ? i : a[t];
                if (s = typeof n, "string" === s && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(e, t)), s = "number"), null != n && n === n && ("number" !== s || h.cssNumber[u] || (n += "px"), l.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (a[t] = "inherit"), !(o && "set" in o && void 0 === (n = o.set(e, n, r)))))try {
                    a[t] = n
                } catch (f) {
                }
            }
        },
        css: function (e, t, n, r) {
            var i, s, o, u = h.camelCase(t);
            return t = h.cssProps[u] || (h.cssProps[u] = Vt(e.style, u)), o = h.cssHooks[t] || h.cssHooks[u], o && "get" in o && (s = o.get(e, !0, n)), void 0 === s && (s = Ht(e, t, r)), "normal" === s && t in Wt && (s = Wt[t]), "" === n || n ? (i = parseFloat(s), n === !0 || h.isNumeric(i) ? i || 0 : s) : s
        }
    }), h.each(["height", "width"], function (e, t) {
        h.cssHooks[t] = {
            get: function (e, n, r) {
                return n ? qt.test(h.css(e, "display")) && 0 === e.offsetWidth ? h.swap(e, zt, function () {
                    return Qt(e, t, r)
                }) : Qt(e, t, r) : void 0
            }, set: function (e, n, r) {
                var i = r && Pt(e);
                return Jt(e, n, r ? Kt(e, t, r, l.boxSizing && "border-box" === h.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), l.opacity || (h.cssHooks.opacity = {
        get: function (e, t) {
            return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, r = e.currentStyle, i = h.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === h.trim(s.replace(Ft, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = Ft.test(s) ? s.replace(Ft, i) : s + " " + i)
        }
    }), h.cssHooks.marginRight = jt(l.reliableMarginRight, function (e, t) {
        return t ? h.swap(e, {display: "inline-block"}, Ht, [e, "marginRight"]) : void 0
    }), h.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        h.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {}, s = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + X[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, _t.test(e) || (h.cssHooks[e + t].set = Jt)
    }), h.fn.extend({
        css: function (e, t) {
            return $(this, function (e, t, n) {
                var r, i, s = {}, o = 0;
                if (h.isArray(t)) {
                    for (r = Pt(e), i = t.length; i > o; o++)s[t[o]] = h.css(e, t[o], !1, r);
                    return s
                }
                return void 0 !== n ? h.style(e, t, n) : h.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return $t(this, !0)
        }, hide: function () {
            return $t(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                V(this) ? h(this).show() : h(this).hide()
            })
        }
    }), h.Tween = Gt, Gt.prototype = {
        constructor: Gt, init: function (e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (h.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = Gt.propHooks[this.prop];
            return e && e.get ? e.get(this) : Gt.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = Gt.propHooks[this.prop];
            return this.pos = t = this.options.duration ? h.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Gt.propHooks._default.set(this), this
        }
    }, Gt.prototype.init.prototype = Gt.prototype, Gt.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = h.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                h.fx.step[e.prop] ? h.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[h.cssProps[e.prop]] || h.cssHooks[e.prop]) ? h.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Gt.propHooks.scrollTop = Gt.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, h.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, h.fx = Gt.prototype.init, h.fx.step = {};
    var Yt, Zt, en = /^(?:toggle|show|hide)$/, tn = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"),
        nn = /queueHooks$/, rn = [fn], sn = {
            "*": [function (e, t) {
                var n = this.createTween(e, t), r = n.cur(), i = tn.exec(t), s = i && i[3] || (h.cssNumber[e] ? "" : "px"),
                    o = (h.cssNumber[e] || "px" !== s && +r) && tn.exec(h.css(n.elem, e)), u = 1, a = 20;
                if (o && o[3] !== s) {
                    s = s || o[3], i = i || [], o = +r || 1;
                    do u = u || ".5", o /= u, h.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && 1 !== u && --a)
                }
                return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    h.Animation = h.extend(cn, {
        tweener: function (e, t) {
            h.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++)n = e[r], sn[n] = sn[n] || [], sn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? rn.unshift(e) : rn.push(e)
        }
    }), h.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? h.extend({}, e) : {
            complete: n || !n && t || h.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !h.isFunction(t) && t
        };
        return r.duration = h.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in h.fx.speeds ? h.fx.speeds[r.duration] : h.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            h.isFunction(r.old) && r.old.call(this), r.queue && h.dequeue(this, r.queue)
        }, r
    }, h.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(V).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, r) {
            var i = h.isEmptyObject(e), s = h.speed(t, n, r), o = function () {
                var t = cn(this, h.extend({}, e), s);
                (i || h._data(this, "finish")) && t.stop(!0)
            };
            return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        }, stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", s = h.timers, o = h._data(this);
                if (i) o[i] && o[i].stop && r(o[i]); else for (i in o)o[i] && o[i].stop && nn.test(i) && r(o[i]);
                for (i = s.length; i--;)s[i].elem !== this || null != e && s[i].queue !== e || (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                (t || !n) && h.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = h._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], s = h.timers,
                    o = r ? r.length : 0;
                for (n.finish = !0, h.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = s.length; t--;)s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; o > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), h.each(["toggle", "show", "hide"], function (e, t) {
        var n = h.fn[t];
        h.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(un(t, !0), e, r, i)
        }
    }), h.each({
        slideDown: un("show"),
        slideUp: un("hide"),
        slideToggle: un("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        h.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), h.timers = [], h.fx.tick = function () {
        var e, t = h.timers, n = 0;
        for (Yt = h.now(); n < t.length; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || h.fx.stop(), Yt = void 0
    }, h.fx.timer = function (e) {
        h.timers.push(e), e() ? h.fx.start() : h.timers.pop()
    }, h.fx.interval = 13, h.fx.start = function () {
        Zt || (Zt = setInterval(h.fx.tick, h.fx.interval))
    }, h.fx.stop = function () {
        clearInterval(Zt), Zt = null
    }, h.fx.speeds = {slow: 600, fast: 200, _default: 400}, h.fn.delay = function (e, t) {
        return e = h.fx ? h.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e, t, n, r, i;
        t = T.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = T.createElement("select"), i = n.appendChild(T.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", l.getSetAttribute = "t" !== t.className, l.style = /top/.test(r.getAttribute("style")), l.hrefNormalized = "/a" === r.getAttribute("href"), l.checkOn = !!e.value, l.optSelected = i.selected, l.enctype = !!T.createElement("form").enctype, n.disabled = !0, l.optDisabled = !i.disabled, e = T.createElement("input"), e.setAttribute("value", ""), l.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), l.radioValue = "t" === e.value
    }();
    var hn = /\r/g;
    h.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            if (arguments.length)return r = h.isFunction(e), this.each(function (n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, h(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : h.isArray(i) && (i = h.map(i, function (e) {
                        return null == e ? "" : e + ""
                    })), t = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            });
            if (i)return t = h.valHooks[i.type] || h.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(hn, "") : null == n ? "" : n)
        }
    }), h.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = h.find.attr(e, "value");
                    return null != t ? t : h.trim(h.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, s = "select-one" === e.type || 0 > i, o = s ? null : [], u = s ? i + 1 : r.length, a = 0 > i ? u : s ? i : 0; u > a; a++)if (n = r[a], !(!n.selected && a !== i || (l.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && h.nodeName(n.parentNode, "optgroup"))) {
                        if (t = h(n).val(), s)return t;
                        o.push(t)
                    }
                    return o
                }, set: function (e, t) {
                    var n, r, i = e.options, s = h.makeArray(t), o = i.length;
                    while (o--)if (r = i[o], h.inArray(h.valHooks.option.get(r), s) >= 0)try {
                        r.selected = n = !0
                    } catch (u) {
                        r.scrollHeight
                    } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), h.each(["radio", "checkbox"], function () {
        h.valHooks[this] = {
            set: function (e, t) {
                return h.isArray(t) ? e.checked = h.inArray(h(e).val(), t) >= 0 : void 0
            }
        }, l.checkOn || (h.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var pn, dn, vn = h.expr.attrHandle, mn = /^(?:checked|selected)$/i, gn = l.getSetAttribute, yn = l.input;
    h.fn.extend({
        attr: function (e, t) {
            return $(this, h.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                h.removeAttr(this, e)
            })
        }
    }), h.extend({
        attr: function (e, t, n) {
            var r, i, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s)return typeof e.getAttribute === B ? h.prop(e, t, n) : (1 === s && h.isXMLDoc(e) || (t = t.toLowerCase(), r = h.attrHooks[t] || (h.expr.match.bool.test(t) ? dn : pn)), void 0 === n ? r && "get" in r && null !== (i = r.get(e, t)) ? i : (i = h.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void h.removeAttr(e, t))
        }, removeAttr: function (e, t) {
            var n, r, i = 0, s = t && t.match(O);
            if (s && 1 === e.nodeType)while (n = s[i++])r = h.propFix[n] || n, h.expr.match.bool.test(n) ? yn && gn || !mn.test(n) ? e[r] = !1 : e[h.camelCase("default-" + n)] = e[r] = !1 : h.attr(e, n, ""), e.removeAttribute(gn ? n : r)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!l.radioValue && "radio" === t && h.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), dn = {
        set: function (e, t, n) {
            return t === !1 ? h.removeAttr(e, n) : yn && gn || !mn.test(n) ? e.setAttribute(!gn && h.propFix[n] || n, n) : e[h.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, h.each(h.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = vn[t] || h.find.attr;
        vn[t] = yn && gn || !mn.test(t) ? function (e, t, r) {
            var i, s;
            return r || (s = vn[t], vn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, vn[t] = s), i
        } : function (e, t, n) {
            return n ? void 0 : e[h.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), yn && gn || (h.attrHooks.value = {
        set: function (e, t, n) {
            return h.nodeName(e, "input") ? void (e.defaultValue = t) : pn && pn.set(e, t, n)
        }
    }), gn || (pn = {
        set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, vn.id = vn.name = vn.coords = function (e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, h.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: pn.set
    }, h.attrHooks.contenteditable = {
        set: function (e, t, n) {
            pn.set(e, "" === t ? !1 : t, n)
        }
    }, h.each(["width", "height"], function (e, t) {
        h.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), l.style || (h.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var bn = /^(?:input|select|textarea|button|object)$/i, wn = /^(?:a|area)$/i;
    h.fn.extend({
        prop: function (e, t) {
            return $(this, h.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = h.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {
                }
            })
        }
    }), h.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var r, i, s, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o)return s = 1 !== o || !h.isXMLDoc(e), s && (t = h.propFix[t] || t, i = h.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = h.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : bn.test(e.nodeName) || wn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), l.hrefNormalized || h.each(["href", "src"], function (e, t) {
        h.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), l.optSelected || (h.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), h.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        h.propFix[this.toLowerCase()] = this
    }), l.enctype || (h.propFix.enctype = "encoding");
    var En = /[\t\r\n\f]/g;
    h.fn.extend({
        addClass: function (e) {
            var t, n, r, i, s, o, u = 0, a = this.length, f = "string" == typeof e && e;
            if (h.isFunction(e))return this.each(function (t) {
                h(this).addClass(e.call(this, t, this.className))
            });
            if (f)for (t = (e || "").match(O) || []; a > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(En, " ") : " ")) {
                s = 0;
                while (i = t[s++])r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                o = h.trim(r), n.className !== o && (n.className = o)
            }
            return this
        }, removeClass: function (e) {
            var t, n, r, i, s, o, u = 0, a = this.length, f = 0 === arguments.length || "string" == typeof e && e;
            if (h.isFunction(e))return this.each(function (t) {
                h(this).removeClass(e.call(this, t, this.className))
            });
            if (f)for (t = (e || "").match(O) || []; a > u; u++)if (n = this[u], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(En, " ") : "")) {
                s = 0;
                while (i = t[s++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " ", " ");
                o = e ? h.trim(r) : "", n.className !== o && (n.className = o)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(h.isFunction(e) ? function (n) {
                h(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n) {
                    var t, r = 0, i = h(this), s = e.match(O) || [];
                    while (t = s[r++])i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else(n === B || "boolean" === n) && (this.className && h._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : h._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(En, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    }), h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        h.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), h.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Sn = h.now(), xn = /\?/,
        Tn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    h.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
        var n, r = null, i = h.trim(t + "");
        return i && !h.trim(i.replace(Tn, function (e, t, i, s) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !s - !i, "")
        })) ? Function("return " + i)() : h.error("Invalid JSON: " + t)
    }, h.parseXML = function (t) {
        var n, r;
        if (!t || "string" != typeof t)return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || h.error("Invalid XML: " + t), n
    };
    var Nn, Cn, kn = /#.*$/, Ln = /([?&])_=[^&]*/, An = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        On = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Mn = /^(?:GET|HEAD)$/, _n = /^\/\//,
        Dn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Pn = {}, Hn = {}, Bn = "*/".concat("*");
    try {
        Cn = location.href
    } catch (jn) {
        Cn = T.createElement("a"), Cn.href = "", Cn = Cn.href
    }
    Nn = Dn.exec(Cn.toLowerCase()) || [], h.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Cn,
            type: "GET",
            isLocal: On.test(Nn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Bn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": h.parseJSON, "text xml": h.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? qn(qn(e, h.ajaxSettings), t) : qn(h.ajaxSettings, e)
        },
        ajaxPrefilter: Fn(Pn),
        ajaxTransport: Fn(Hn),
        ajax: function (e, t) {
            function x(e, t, n, r) {
                var f, g, y, w, S, x = t;
                2 !== b && (b = 2, o && clearTimeout(o), a = void 0, s = r || "", E.readyState = e > 0 ? 4 : 0, f = e >= 200 && 300 > e || 304 === e, n && (w = Rn(l, E, n)), w = Un(l, w, E, f), f ? (l.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (h.lastModified[i] = S), S = E.getResponseHeader("etag"), S && (h.etag[i] = S)), 204 === e || "HEAD" === l.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, f = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), E.status = e, E.statusText = (t || x) + "", f ? d.resolveWith(c, [g, x, E]) : d.rejectWith(c, [E, x, y]), E.statusCode(m), m = void 0, u && p.trigger(f ? "ajaxSuccess" : "ajaxError", [E, l, f ? g : y]), v.fireWith(c, [E, x]), u && (p.trigger("ajaxComplete", [E, l]), --h.active || h.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, r, i, s, o, u, a, f, l = h.ajaxSetup({}, t), c = l.context || l,
                p = l.context && (c.nodeType || c.jquery) ? h(c) : h.event, d = h.Deferred(),
                v = h.Callbacks("once memory"), m = l.statusCode || {}, g = {}, y = {}, b = 0, w = "canceled", E = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!f) {
                                f = {};
                                while (t = An.exec(s))f[t[1].toLowerCase()] = t[2]
                            }
                            t = f[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === b ? s : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, g[e] = t), this
                    }, overrideMimeType: function (e) {
                        return b || (l.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)if (2 > b)for (t in e)m[t] = [m[t], e[t]]; else E.always(e[E.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || w;
                        return a && a.abort(t), x(0, t), this
                    }
                };
            if (d.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, l.url = ((e || l.url || Cn) + "").replace(kn, "").replace(_n, Nn[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = h.trim(l.dataType || "*").toLowerCase().match(O) || [""], null == l.crossDomain && (n = Dn.exec(l.url.toLowerCase()), l.crossDomain = !(!n || n[1] === Nn[1] && n[2] === Nn[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Nn[3] || ("http:" === Nn[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = h.param(l.data, l.traditional)), In(Pn, l, t, E), 2 === b)return E;
            u = h.event && l.global, u && 0 === h.active++ && h.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Mn.test(l.type), i = l.url, l.hasContent || (l.data && (i = l.url += (xn.test(i) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ln.test(i) ? i.replace(Ln, "$1_=" + Sn++) : i + (xn.test(i) ? "&" : "?") + "_=" + Sn++)), l.ifModified && (h.lastModified[i] && E.setRequestHeader("If-Modified-Since", h.lastModified[i]), h.etag[i] && E.setRequestHeader("If-None-Match", h.etag[i])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && E.setRequestHeader("Content-Type", l.contentType), E.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Bn + "; q=0.01" : "") : l.accepts["*"]);
            for (r in l.headers)E.setRequestHeader(r, l.headers[r]);
            if (!l.beforeSend || l.beforeSend.call(c, E, l) !== !1 && 2 !== b) {
                w = "abort";
                for (r in{success: 1, error: 1, complete: 1})E[r](l[r]);
                if (a = In(Hn, l, t, E)) {
                    E.readyState = 1, u && p.trigger("ajaxSend", [E, l]), l.async && l.timeout > 0 && (o = setTimeout(function () {
                        E.abort("timeout")
                    }, l.timeout));
                    try {
                        b = 1, a.send(g, x)
                    } catch (S) {
                        if (!(2 > b))throw S;
                        x(-1, S)
                    }
                } else x(-1, "No Transport");
                return E
            }
            return E.abort()
        },
        getJSON: function (e, t, n) {
            return h.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return h.get(e, void 0, t, "script")
        }
    }), h.each(["get", "post"], function (e, t) {
        h[t] = function (e, n, r, i) {
            return h.isFunction(n) && (i = i || r, r = n, n = void 0), h.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), h._evalUrl = function (e) {
        return h.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, h.fn.extend({
        wrapAll: function (e) {
            if (h.isFunction(e))return this.each(function (t) {
                h(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = h(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    var e = this;
                    while (e.firstChild && 1 === e.firstChild.nodeType)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(h.isFunction(e) ? function (t) {
                h(this).wrapInner(e.call(this, t))
            } : function () {
                var t = h(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = h.isFunction(e);
            return this.each(function (n) {
                h(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
            }).end()
        }
    }), h.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !l.reliableHiddenOffsets() && "none" === (e.style && e.style.display || h.css(e, "display"))
    }, h.expr.filters.visible = function (e) {
        return !h.expr.filters.hidden(e)
    };
    var zn = /%20/g, Wn = /\[\]$/, Xn = /\r?\n/g, Vn = /^(?:submit|button|image|reset|file)$/i,
        $n = /^(?:input|select|textarea|keygen)/i;
    h.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = h.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = h.ajaxSettings && h.ajaxSettings.traditional), h.isArray(e) || e.jquery && !h.isPlainObject(e)) h.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)Jn(n, e[n], t, i);
        return r.join("&").replace(zn, "+")
    }, h.fn.extend({
        serialize: function () {
            return h.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = h.prop(this, "elements");
                return e ? h.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !h(this).is(":disabled") && $n.test(this.nodeName) && !Vn.test(e) && (this.checked || !J.test(e))
            }).map(function (e, t) {
                var n = h(this).val();
                return null == n ? null : h.isArray(n) ? h.map(n, function (e) {
                    return {name: t.name, value: e.replace(Xn, "\r\n")}
                }) : {name: t.name, value: n.replace(Xn, "\r\n")}
            }).get()
        }
    }), h.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Yn() || Zn()
    } : Yn;
    var Kn = 0, Qn = {}, Gn = h.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function () {
        for (var e in Qn)Qn[e](void 0, !0)
    }), l.cors = !!Gn && "withCredentials" in Gn, Gn = l.ajax = !!Gn, Gn && h.ajaxTransport(function (e) {
        if (!e.crossDomain || l.cors) {
            var t;
            return {
                send: function (n, r) {
                    var i, s = e.xhr(), o = ++Kn;
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)s[i] = e.xhrFields[i];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n)void 0 !== n[i] && s.setRequestHeader(i, n[i] + "");
                    s.send(e.hasContent && e.data || null), t = function (n, i) {
                        var u, a, f;
                        if (t && (i || 4 === s.readyState))if (delete Qn[o], t = void 0, s.onreadystatechange = h.noop, i) 4 !== s.readyState && s.abort(); else {
                            f = {}, u = s.status, "string" == typeof s.responseText && (f.text = s.responseText);
                            try {
                                a = s.statusText
                            } catch (l) {
                                a = ""
                            }
                            u || !e.isLocal || e.crossDomain ? 1223 === u && (u = 204) : u = f.text ? 200 : 404
                        }
                        f && r(u, a, f, s.getAllResponseHeaders())
                    }, e.async ? 4 === s.readyState ? setTimeout(t) : s.onreadystatechange = Qn[o] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), h.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return h.globalEval(e), e
            }
        }
    }), h.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), h.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = T.head || h("head")[0] || T.documentElement;
            return {
                send: function (r, i) {
                    t = T.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var er = [], tr = /(=)\?(?=&|$)|\?\?/;
    h.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = er.pop() || h.expando + "_" + Sn++;
            return this[e] = !0, e
        }
    }), h.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, s, o,
            u = t.jsonp !== !1 && (tr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
        return u || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = h.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(tr, "$1" + i) : t.jsonp !== !1 && (t.url += (xn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return o || h.error(i + " was not called"), o[0]
        }, t.dataTypes[0] = "json", s = e[i], e[i] = function () {
            o = arguments
        }, r.always(function () {
            e[i] = s, t[i] && (t.jsonpCallback = n.jsonpCallback, er.push(i)), o && h.isFunction(s) && s(o[0]), o = s = void 0
        }), "script") : void 0
    }), h.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || T;
        var r = w.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = h.buildFragment([e], t, i), i && i.length && h(i).remove(), h.merge([], r.childNodes))
    };
    var nr = h.fn.load;
    h.fn.load = function (e, t, n) {
        if ("string" != typeof e && nr)return nr.apply(this, arguments);
        var r, i, s, o = this, u = e.indexOf(" ");
        return u >= 0 && (r = h.trim(e.slice(u, e.length)), e = e.slice(0, u)), h.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (s = "POST"), o.length > 0 && h.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: t
        }).done(function (e) {
            i = arguments, o.html(r ? h("<div>").append(h.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
                o.each(n, i || [e.responseText, t, e])
            }), this
    }, h.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        h.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), h.expr.filters.animated = function (e) {
        return h.grep(h.timers, function (t) {
            return e === t.elem
        }).length
    };
    var rr = e.document.documentElement;
    h.offset = {
        setOffset: function (e, t, n) {
            var r, i, s, o, u, a, f, l = h.css(e, "position"), c = h(e), p = {};
            "static" === l && (e.style.position = "relative"), u = c.offset(), s = h.css(e, "top"), a = h.css(e, "left"), f = ("absolute" === l || "fixed" === l) && h.inArray("auto", [s, a]) > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), h.isFunction(t) && (t = t.call(e, n, u)), null != t.top && (p.top = t.top - u.top + o), null != t.left && (p.left = t.left - u.left + i), "using" in t ? t.using.call(e, p) : c.css(p)
        }
    }, h.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                h.offset.setOffset(this, e, t)
            });
            var t, n, r = {top: 0, left: 0}, i = this[0], s = i && i.ownerDocument;
            if (s)return t = s.documentElement, h.contains(t, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), n = ir(s), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, r = this[0];
                return "fixed" === h.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), h.nodeName(e[0], "html") || (n = e.offset()), n.top += h.css(e[0], "borderTopWidth", !0), n.left += h.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - h.css(r, "marginTop", !0),
                    left: t.left - n.left - h.css(r, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || rr;
                while (e && !h.nodeName(e, "html") && "static" === h.css(e, "position"))e = e.offsetParent;
                return e || rr
            })
        }
    }), h.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        h.fn[e] = function (r) {
            return $(this, function (e, r, i) {
                var s = ir(e);
                return void 0 === i ? s ? t in s ? s[t] : s.document.documentElement[r] : e[r] : void (s ? s.scrollTo(n ? h(s).scrollLeft() : i, n ? i : h(s).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null)
        }
    }), h.each(["top", "left"], function (e, t) {
        h.cssHooks[t] = jt(l.pixelPosition, function (e, n) {
            return n ? (n = Ht(e, t), Dt.test(n) ? h(e).position()[t] + "px" : n) : void 0
        })
    }), h.each({Height: "height", Width: "width"}, function (e, t) {
        h.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            h.fn[r] = function (r, i) {
                var s = arguments.length && (n || "boolean" != typeof r),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return $(this, function (t, n, r) {
                    var i;
                    return h.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? h.css(t, n, o) : h.style(t, n, r, o)
                }, t, s ? r : void 0, s, null)
            }
        })
    }), h.fn.size = function () {
        return this.length
    }, h.fn.andSelf = h.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return h
    });
    var sr = e.jQuery, or = e.$;
    return h.noConflict = function (t) {
        return e.$ === h && (e.$ = or), t && e.jQuery === h && (e.jQuery = sr), h
    }, typeof t === B && (e.jQuery = e.$ = h), h
}), function () {
    "use strict";
    function e(t, r) {
        function s(e, t) {
            return function () {
                return e.apply(t, arguments)
            }
        }

        var i;
        r = r || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = r.touchBoundary || 10, this.layer = t, this.tapDelay = r.tapDelay || 200, this.tapTimeout = r.tapTimeout || 700;
        if (e.notNeeded(t))return;
        var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], u = this;
        for (var a = 0, f = o.length; a < f; a++)u[o[a]] = s(u[o[a]], u);
        n && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, r) {
            var i = Node.prototype.removeEventListener;
            e === "click" ? i.call(t, e, n.hijacked || n, r) : i.call(t, e, n, r)
        }, t.addEventListener = function (e, n, r) {
            var i = Node.prototype.addEventListener;
            e === "click" ? i.call(t, e, n.hijacked || (n.hijacked = function (e) {
                    e.propagationStopped || n(e)
                }), r) : i.call(t, e, n, r)
        }), typeof t.onclick == "function" && (i = t.onclick, t.addEventListener("click", function (e) {
            i(e)
        }, !1), t.onclick = null)
    }

    var t = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !t,
        r = /iP(ad|hone|od)/.test(navigator.userAgent) && !t, i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        s = r && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), o = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (e.disabled)return !0;
                break;
            case"input":
                if (r && e.type === "file" || e.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function (e) {
        switch (e.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (e.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function (e, t) {
        var n, r;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
    }, e.prototype.determineEventType = function (e) {
        return n && e.tagName.toLowerCase() === "select" ? "mousedown" : "click"
    }, e.prototype.focus = function (e) {
        var t;
        r && e.setSelectionRange && e.type.indexOf("date") !== 0 && e.type !== "time" && e.type !== "month" ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function (e) {
        var t, n;
        t = e.fastClickScrollParent;
        if (!t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n, e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function (e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function (e) {
        var t, n, s;
        if (e.targetTouches.length > 1)return !0;
        t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0];
        if (r) {
            s = window.getSelection();
            if (s.rangeCount && !s.isCollapsed)return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function (e) {
        var t = e.changedTouches[0], n = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
    }, e.prototype.onTouchMove = function (e) {
        if (!this.trackingClick)return !0;
        if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) this.trackingClick = !1, this.targetElement = null;
        return !0
    }, e.prototype.findControl = function (e) {
        return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function (e) {
        var t, o, u, a, f, l = this.targetElement;
        if (!this.trackingClick)return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (f = e.changedTouches[0], l = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), u = l.tagName.toLowerCase();
        if (u === "label") {
            t = this.findControl(l);
            if (t) {
                this.focus(l);
                if (n)return !1;
                l = t
            }
        } else if (this.needsFocus(l)) {
            if (e.timeStamp - o > 100 || r && window.top !== window && u === "input")return this.targetElement = null, !1;
            this.focus(l), this.sendClick(l, e);
            if (!r || u !== "select") this.targetElement = null, e.preventDefault();
            return !1
        }
        if (r && !i) {
            a = l.fastClickScrollParent;
            if (a && a.fastClickLastScrollTop !== a.scrollTop)return !0
        }
        return this.needsClick(l) || (e.preventDefault(), this.sendClick(l, e)), !1
    }, e.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function (e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0 : !0
    }, e.prototype.onClick = function (e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : e.target.type === "submit" && e.detail === 0 ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, e.prototype.destroy = function () {
        var e = this.layer;
        n && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function (e) {
        var t, r, i;
        if (typeof window.ontouchstart == "undefined")return !0;
        r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
        if (r) {
            if (!n)return !0;
            t = document.querySelector("meta[name=viewport]");
            if (t) {
                if (t.content.indexOf("user-scalable=no") !== -1)return !0;
                if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (o) {
            i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (i[1] >= 10 && i[2] >= 3) {
                t = document.querySelector("meta[name=viewport]");
                if (t) {
                    if (t.content.indexOf("user-scalable=no") !== -1)return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth)return !0
                }
            }
        }
        return e.style.msTouchAction === "none" ? !0 : e.style.touchAction === "none" ? !0 : !1
    }, e.attach = function (t, n) {
        return new e(t, n)
    }, typeof define == "function" && typeof define.amd == "object" && define.amd ? define("fastclick", [], function () {
        return e
    }) : typeof module != "undefined" && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e
}(), !function () {
    function e(e) {
        return e.replace(b, "").replace(w, ",").replace(E, "").replace(S, "").replace(x, "").split(T)
    }

    function t(e) {
        return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function n(n, r) {
        function i(e) {
            return h += e.split(/\n/).length - 1, l && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), e && (e = y[1] + t(e) + y[2] + "\n"), e
        }

        function s(t) {
            var n = h;
            if (f ? t = f(t, r) : o && (t = t.replace(/\n/g, function () {
                        return h++, "$line=" + h + ";"
                    })), 0 === t.indexOf("=")) {
                var i = c && !/^=[=#]/.test(t);
                if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), i) {
                    var s = t.replace(/\s*\([^\)]+\)/, "");
                    p[s] || /^(include|print)$/.test(s) || (t = "$escape(" + t + ")")
                } else t = "$string(" + t + ")";
                t = y[1] + t + y[2]
            }
            return o && (t = "$line=" + n + ";" + t), g(e(t), function (e) {
                if (e && !v[e]) {
                    var t;
                    t = "print" === e ? w : "include" === e ? E : p[e] ? "$utils." + e : d[e] ? "$helpers." + e : "$data." + e, S += e + "=" + t + ",", v[e] = !0
                }
            }), t + "\n"
        }

        var o = r.debug, u = r.openTag, a = r.closeTag, f = r.parser, l = r.compress, c = r.escape, h = 1,
            v = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, m = "".trim,
            y = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            b = m ? "$out+=text;return $out;" : "$out.push(text);",
            w = "function(){var text=''.concat.apply('',arguments);" + b + "}",
            E = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}",
            S = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (o ? "$line=0," : ""), x = y[0],
            T = "return new String(" + y[3] + ");";
        g(n.split(u), function (e) {
            e = e.split(a);
            var t = e[0], n = e[1];
            1 === e.length ? x += i(t) : (x += s(t), n && (x += i(n)))
        });
        var N = S + x + T;
        o && (N = "try{" + N + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var C = new Function("$data", "$filename", N);
            return C.prototype = p, C
        } catch (k) {
            throw k.temp = "function anonymous($data,$filename) {" + N + "}", k
        }
    }

    var r = function (e, t) {
        return "string" == typeof t ? m(t, {filename: e}) : o(e, t)
    };
    r.version = "3.0.0", r.config = function (e, t) {
        i[e] = t
    };
    var i = r.defaults = {openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null},
        s = r.cache = {};
    r.render = function (e, t) {
        return m(e, t)
    };
    var o = r.renderFile = function (e, t) {
        var n = r.get(e) || v({filename: e, name: "Render Error", message: "Template not found"});
        return t ? n(t) : n
    };
    r.get = function (e) {
        var t;
        if (s[e]) t = s[e]; else if ("object" == typeof document) {
            var n = document.getElementById(e);
            if (n) {
                var r = (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "");
                t = m(r, {filename: e})
            }
        }
        return t
    };
    var u = function (e, t) {
        return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? u(e.call(e)) : ""), e
    }, a = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, f = function (e) {
        return a[e]
    }, l = function (e) {
        return u(e).replace(/&(?![\w#]+;)|[<>"']/g, f)
    }, c = Array.isArray || function (e) {
            return "[object Array]" === {}.toString.call(e)
        }, h = function (e, t) {
        var n, r;
        if (c(e))for (n = 0, r = e.length; r > n; n++)t.call(e, e[n], n, e); else for (n in e)t.call(e, e[n], n)
    }, p = r.utils = {$helpers: {}, $include: o, $string: u, $escape: l, $each: h};
    r.helper = function (e, t) {
        d[e] = t
    };
    var d = r.helpers = p.$helpers;
    r.onerror = function (e) {
        var t = "Template Error\n\n";
        for (var n in e)t += "<" + n + ">\n" + e[n] + "\n\n";
        "object" == typeof console && console.error(t)
    };
    var v = function (e) {
            return r.onerror(e), function () {
                return "{Template Error}"
            }
        }, m = r.compile = function (e, t) {
            function r(n) {
                try {
                    return new a(n, u) + ""
                } catch (r) {
                    return t.debug ? v(r)() : (t.debug = !0, m(e, t)(n))
                }
            }

            t = t || {};
            for (var o in i)void 0 === t[o] && (t[o] = i[o]);
            var u = t.filename;
            try {
                var a = n(e, t)
            } catch (f) {
                return f.filename = u || "anonymous", f.name = "Syntax Error", v(f)
            }
            return r.prototype = a.prototype, r.toString = function () {
                return a.toString()
            }, u && t.cache && (s[u] = r), r
        }, g = p.$each,
        y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        w = /[^\w$]+/g, E = new RegExp(["\\b" + y.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        S = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, T = /^$|,+/;
    i.openTag = "{{", i.closeTag = "}}";
    var N = function (e, t) {
        var n = t.split(":"), r = n.shift(), i = n.join(":") || "";
        return i && (i = ", " + i), "$helpers." + r + "(" + e + i + ")"
    };
    i.parser = function (e) {
        e = e.replace(/^\s/, "");
        var t = e.split(" "), n = t.shift(), i = t.join(" ");
        switch (n) {
            case"if":
                e = "if(" + i + "){";
                break;
            case"else":
                t = "if" === t.shift() ? " if(" + t.join(" ") + ")" : "", e = "}else" + t + "{";
                break;
            case"/if":
                e = "}";
                break;
            case"each":
                var s = t[0] || "$data", o = t[1] || "as", u = t[2] || "$value", a = t[3] || "$index", f = u + "," + a;
                "as" !== o && (s = "[]"), e = "$each(" + s + ",function(" + f + "){";
                break;
            case"/each":
                e = "});";
                break;
            case"echo":
                e = "print(" + i + ");";
                break;
            case"print":
            case"include":
                e = n + "(" + t.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(i)) {
                    var l = !0;
                    0 === e.indexOf("#") && (e = e.substr(1), l = !1);
                    for (var c = 0, h = e.split("|"), p = h.length, d = h[c++]; p > c; c++)d = N(d, h[c]);
                    e = (l ? "=" : "=#") + d
                } else e = r.helpers[n] ? "=#" + n + "(" + t.join(",") + ");" : "=" + e
        }
        return e
    }, "function" == typeof define ? define("template", [], function () {
        return r
    }) : "undefined" != typeof exports ? module.exports = r : this.template = r
}();