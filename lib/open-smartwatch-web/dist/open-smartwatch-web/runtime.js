(() => {
  "use strict";
  var e,
    v = {},
    i = {};
  function n(e) {
    var l = i[e];
    if (void 0 !== l) return l.exports;
    var r = (i[e] = { exports: {} });
    return v[e](r, r.exports, n), r.exports;
  }
  (n.m = v),
    (e = []),
    (n.O = (l, r, s, f) => {
      if (!r) {
        var c = 1 / 0;
        for (a = 0; a < e.length; a++) {
          for (var [r, s, f] = e[a], u = !0, o = 0; o < r.length; o++)
            (!1 & f || c >= f) && Object.keys(n.O).every((b) => n.O[b](r[o]))
              ? r.splice(o--, 1)
              : ((u = !1), f < c && (c = f));
          if (u) {
            e.splice(a--, 1);
            var t = s();
            void 0 !== t && (l = t);
          }
        }
        return l;
      }
      f = f || 0;
      for (var a = e.length; a > 0 && e[a - 1][2] > f; a--) e[a] = e[a - 1];
      e[a] = [r, s, f];
    }),
    (n.o = (e, l) => Object.prototype.hasOwnProperty.call(e, l)),
    (() => {
      var e = { 666: 0 };
      n.O.j = (s) => 0 === e[s];
      var l = (s, f) => {
          var o,
            t,
            [a, c, u] = f,
            _ = 0;
          if (a.some((p) => 0 !== e[p])) {
            for (o in c) n.o(c, o) && (n.m[o] = c[o]);
            if (u) var h = u(n);
          }
          for (s && s(f); _ < a.length; _++)
            n.o(e, (t = a[_])) && e[t] && e[t][0](), (e[t] = 0);
          return n.O(h);
        },
        r = (self.webpackChunkopen_smartwatch_web =
          self.webpackChunkopen_smartwatch_web || []);
      r.forEach(l.bind(null, 0)), (r.push = l.bind(null, r.push.bind(r)));
    })();
})();
