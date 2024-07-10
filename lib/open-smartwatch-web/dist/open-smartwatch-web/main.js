"use strict";
(self.webpackChunkopen_smartwatch_web =
  self.webpackChunkopen_smartwatch_web || []).push([
  [179],
  {
    179: () => {
      function se(e) {
        return "function" == typeof e;
      }
      function ao(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const Ei = ao(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function uo(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class gt {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const i of t) i.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (se(r))
              try {
                r();
              } catch (i) {
                n = i instanceof Ei ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  pd(i);
                } catch (s) {
                  (n = n ?? []),
                    s instanceof Ei ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new Ei(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) pd(n);
            else {
              if (n instanceof gt) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              );
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && uo(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && uo(t, n), n instanceof gt && n._removeParent(this);
        }
      }
      gt.EMPTY = (() => {
        const e = new gt();
        return (e.closed = !0), e;
      })();
      const fd = gt.EMPTY;
      function hd(e) {
        return (
          e instanceof gt ||
          (e && "closed" in e && se(e.remove) && se(e.add) && se(e.unsubscribe))
        );
      }
      function pd(e) {
        se(e) ? e() : e.unsubscribe();
      }
      const Ln = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        bi = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = bi;
            return r?.setTimeout
              ? r.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = bi;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function gd(e) {
        bi.setTimeout(() => {
          const { onUnhandledError: n } = Ln;
          if (!n) throw e;
          n(e);
        });
      }
      function md() {}
      const LD = Ia("C", void 0, void 0);
      function Ia(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let $n = null;
      function Ii(e) {
        if (Ln.useDeprecatedSynchronousErrorHandling) {
          const n = !$n;
          if ((n && ($n = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: r } = $n;
            if ((($n = null), t)) throw r;
          }
        } else e();
      }
      class Sa extends gt {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), hd(n) && n.add(this))
              : (this.destination = zD);
        }
        static create(n, t, r) {
          return new lo(n, t, r);
        }
        next(n) {
          this.isStopped
            ? Ta(
                (function jD(e) {
                  return Ia("N", e, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? Ta(
                (function $D(e) {
                  return Ia("E", void 0, e);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped
            ? Ta(LD, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const UD = Function.prototype.bind;
      function Ma(e, n) {
        return UD.call(e, n);
      }
      class BD {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (r) {
              Si(r);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (r) {
              Si(r);
            }
          else Si(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              Si(t);
            }
        }
      }
      class lo extends Sa {
        constructor(n, t, r) {
          let o;
          if ((super(), se(n) || !n))
            o = {
              next: n ?? void 0,
              error: t ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Ln.useDeprecatedNextContext
              ? ((i = Object.create(n)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: n.next && Ma(n.next, i),
                  error: n.error && Ma(n.error, i),
                  complete: n.complete && Ma(n.complete, i),
                }))
              : (o = n);
          }
          this.destination = new BD(o);
        }
      }
      function Si(e) {
        Ln.useDeprecatedSynchronousErrorHandling
          ? (function VD(e) {
              Ln.useDeprecatedSynchronousErrorHandling &&
                $n &&
                (($n.errorThrown = !0), ($n.error = e));
            })(e)
          : gd(e);
      }
      function Ta(e, n) {
        const { onStoppedNotification: t } = Ln;
        t && bi.setTimeout(() => t(e, n));
      }
      const zD = {
          closed: !0,
          next: md,
          error: function HD(e) {
            throw e;
          },
          complete: md,
        },
        Aa =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function jn(e) {
        return e;
      }
      function yd(e) {
        return 0 === e.length
          ? jn
          : 1 === e.length
          ? e[0]
          : function (t) {
              return e.reduce((r, o) => o(r), t);
            };
      }
      let Se = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const r = new e();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, o) {
            const i = (function qD(e) {
              return (
                (e && e instanceof Sa) ||
                ((function WD(e) {
                  return e && se(e.next) && se(e.error) && se(e.complete);
                })(e) &&
                  hd(e))
              );
            })(t)
              ? t
              : new lo(t, r, o);
            return (
              Ii(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              t.error(r);
            }
          }
          forEach(t, r) {
            return new (r = vd(r))((o, i) => {
              const s = new lo({
                next: (a) => {
                  try {
                    t(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t);
          }
          [Aa]() {
            return this;
          }
          pipe(...t) {
            return yd(t)(this);
          }
          toPromise(t) {
            return new (t = vd(t))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (n) => new e(n)), e;
      })();
      function vd(e) {
        var n;
        return null !== (n = e ?? Ln.Promise) && void 0 !== n ? n : Promise;
      }
      const QD = ao(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Xt = (() => {
        class e extends Se {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const r = new Dd(this, this);
            return (r.operator = t), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new QD();
          }
          next(t) {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(t);
              }
            });
          }
          error(t) {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(t);
              }
            });
          }
          complete() {
            Ii(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? fd
              : ((this.currentObservers = null),
                i.push(t),
                new gt(() => {
                  (this.currentObservers = null), uo(i, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? t.error(o) : i && t.complete();
          }
          asObservable() {
            const t = new Se();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new Dd(n, t)), e;
      })();
      class Dd extends Xt {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, n);
        }
        error(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, n);
        }
        complete() {
          var n, t;
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, r;
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== r
            ? r
            : fd;
        }
      }
      function _d(e) {
        return se(e?.lift);
      }
      function xe(e) {
        return (n) => {
          if (_d(n))
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ne(e, n, t, r, o) {
        return new ZD(e, n, t, r, o);
      }
      class ZD extends Sa {
        constructor(n, t, r, o, i, s) {
          super(n),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (u) {
                    n.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    n.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) ||
                  void 0 === n ||
                  n.call(this));
          }
        }
      }
      function Y(e, n) {
        return xe((t, r) => {
          let o = 0;
          t.subscribe(
            Ne(r, (i) => {
              r.next(e.call(n, i, o++));
            })
          );
        });
      }
      function _n(e) {
        return this instanceof _n ? ((this.v = e), this) : new _n(e);
      }
      function bd(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function Pa(e) {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0;
              if (t) return t.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                n
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(i) {
          t[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Id = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Sd(e) {
        return se(e?.then);
      }
      function Md(e) {
        return se(e[Aa]);
      }
      function Td(e) {
        return Symbol.asyncIterator && se(e?.[Symbol.asyncIterator]);
      }
      function Ad(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Rd = (function y_() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function xd(e) {
        return se(e?.[Rd]);
      }
      function Nd(e) {
        return (function Ed(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = t.apply(e, n || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(h) {
            r[h] &&
              (o[h] = function (f) {
                return new Promise(function (g, p) {
                  i.push([h, f, g, p]) > 1 || a(h, f);
                });
              });
          }
          function a(h, f) {
            try {
              !(function u(h) {
                h.value instanceof _n
                  ? Promise.resolve(h.value.v).then(l, c)
                  : d(i[0][2], h);
              })(r[h](f));
            } catch (g) {
              d(i[0][3], g);
            }
          }
          function l(h) {
            a("next", h);
          }
          function c(h) {
            a("throw", h);
          }
          function d(h, f) {
            h(f), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield _n(t.read());
              if (o) return yield _n(void 0);
              yield yield _n(r);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function Pd(e) {
        return se(e?.getReader);
      }
      function St(e) {
        if (e instanceof Se) return e;
        if (null != e) {
          if (Md(e))
            return (function v_(e) {
              return new Se((n) => {
                const t = e[Aa]();
                if (se(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Id(e))
            return (function D_(e) {
              return new Se((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (Sd(e))
            return (function __(e) {
              return new Se((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete());
                  },
                  (t) => n.error(t)
                ).then(null, gd);
              });
            })(e);
          if (Td(e)) return Fd(e);
          if (xd(e))
            return (function C_(e) {
              return new Se((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (Pd(e))
            return (function w_(e) {
              return Fd(Nd(e));
            })(e);
        }
        throw Ad(e);
      }
      function Fd(e) {
        return new Se((n) => {
          (function E_(e, n) {
            var t, r, o, i;
            return (function Cd(e, n, t, r) {
              return new (t || (t = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof t
                          ? i
                          : new t(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = bd(e); !(r = yield t.next()).done; )
                  if ((n.next(r.value), n.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = t.return) && (yield i.call(t));
                } finally {
                  if (o) throw o.error;
                }
              }
              n.complete();
            });
          })(e, n).catch((t) => n.error(t));
        });
      }
      function Jt(e, n, t, r = 0, o = !1) {
        const i = n.schedule(function () {
          t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Fe(e, n, t = 1 / 0) {
        return se(n)
          ? Fe((r, o) => Y((i, s) => n(r, i, o, s))(St(e(r, o))), t)
          : ("number" == typeof n && (t = n),
            xe((r, o) =>
              (function b_(e, n, t, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const h = () => {
                    d && !u.length && !l && n.complete();
                  },
                  f = (p) => (l < r ? g(p) : u.push(p)),
                  g = (p) => {
                    i && n.next(p), l++;
                    let m = !1;
                    St(t(p, c++)).subscribe(
                      Ne(
                        n,
                        (v) => {
                          o?.(v), i ? f(v) : n.next(v);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (l--; u.length && l < r; ) {
                                const v = u.shift();
                                s ? Jt(n, s, () => g(v)) : g(v);
                              }
                              h();
                            } catch (v) {
                              n.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ne(n, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, t)
            ));
      }
      function lr(e = 1 / 0) {
        return Fe(jn, e);
      }
      const $t = new Se((e) => e.complete());
      function Fa(e) {
        return e[e.length - 1];
      }
      function co(e) {
        return (function S_(e) {
          return e && se(e.schedule);
        })(Fa(e))
          ? e.pop()
          : void 0;
      }
      function Od(e, n = 0) {
        return xe((t, r) => {
          t.subscribe(
            Ne(
              r,
              (o) => Jt(r, e, () => r.next(o), n),
              () => Jt(r, e, () => r.complete(), n),
              (o) => Jt(r, e, () => r.error(o), n)
            )
          );
        });
      }
      function kd(e, n = 0) {
        return xe((t, r) => {
          r.add(e.schedule(() => t.subscribe(r), n));
        });
      }
      function Ld(e, n) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Se((t) => {
          Jt(t, n, () => {
            const r = e[Symbol.asyncIterator]();
            Jt(
              t,
              n,
              () => {
                r.next().then((o) => {
                  o.done ? t.complete() : t.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Me(e, n) {
        return n
          ? (function F_(e, n) {
              if (null != e) {
                if (Md(e))
                  return (function A_(e, n) {
                    return St(e).pipe(kd(n), Od(n));
                  })(e, n);
                if (Id(e))
                  return (function x_(e, n) {
                    return new Se((t) => {
                      let r = 0;
                      return n.schedule(function () {
                        r === e.length
                          ? t.complete()
                          : (t.next(e[r++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (Sd(e))
                  return (function R_(e, n) {
                    return St(e).pipe(kd(n), Od(n));
                  })(e, n);
                if (Td(e)) return Ld(e, n);
                if (xd(e))
                  return (function N_(e, n) {
                    return new Se((t) => {
                      let r;
                      return (
                        Jt(t, n, () => {
                          (r = e[Rd]()),
                            Jt(
                              t,
                              n,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                i ? t.complete() : t.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => se(r?.return) && r.return()
                      );
                    });
                  })(e, n);
                if (Pd(e))
                  return (function P_(e, n) {
                    return Ld(Nd(e), n);
                  })(e, n);
              }
              throw Ad(e);
            })(e, n)
          : St(e);
      }
      function Oa(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const r = new lo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return St(n(...t)).subscribe(r);
      }
      /**
       * @license Angular v15.2.10
       * (c) 2010-2022 Google LLC. https://angular.io/
       * License: MIT
       */ function ie(e) {
        for (let n in e) if (e[n] === ie) return n;
        throw Error("Could not find renamed property on target object.");
      }
      function ae(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ae).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return "" + n;
        const t = n.indexOf("\n");
        return -1 === t ? n : n.substring(0, t);
      }
      function La(e, n) {
        return null == e || "" === e
          ? null === n
            ? ""
            : n
          : null == n || "" === n
          ? e
          : e + " " + n;
      }
      const L_ = ie({ __forward_ref__: ie });
      function $a(e) {
        return (
          (e.__forward_ref__ = $a),
          (e.toString = function () {
            return ae(this());
          }),
          e
        );
      }
      function P(e) {
        return ja(e) ? e() : e;
      }
      function ja(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(L_) &&
          e.__forward_ref__ === $a
        );
      }
      function Va(e) {
        return e && !!e.ɵproviders;
      }
      const $d = "https://g.co/ng/security#xss";
      class C extends Error {
        constructor(n, t) {
          super(Mi(n, t)), (this.code = n);
        }
      }
      function Mi(e, n) {
        return `NG0${Math.abs(e)}${n ? ": " + n.trim() : ""}`;
      }
      function j(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ti(e, n) {
        throw new C(-201, !1);
      }
      function mt(e, n) {
        null == e &&
          (function ne(e, n, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`)
            );
          })(n, e, null, "!=");
      }
      function F(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function wn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ai(e) {
        return jd(e, Ri) || jd(e, Ud);
      }
      function jd(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function Vd(e) {
        return e && (e.hasOwnProperty(Ua) || e.hasOwnProperty(G_))
          ? e[Ua]
          : null;
      }
      const Ri = ie({ ɵprov: ie }),
        Ua = ie({ ɵinj: ie }),
        Ud = ie({ ngInjectableDef: ie }),
        G_ = ie({ ngInjectorDef: ie });
      var O = (() => (
        ((O = O || {})[(O.Default = 0)] = "Default"),
        (O[(O.Host = 1)] = "Host"),
        (O[(O.Self = 2)] = "Self"),
        (O[(O.SkipSelf = 4)] = "SkipSelf"),
        (O[(O.Optional = 8)] = "Optional"),
        O
      ))();
      let Ba;
      function yt(e) {
        const n = Ba;
        return (Ba = e), n;
      }
      function Bd(e, n, t) {
        const r = Ai(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & O.Optional
          ? null
          : void 0 !== n
          ? n
          : void Ti(ae(e));
      }
      const le = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        fo = {},
        Ha = "__NG_DI_FLAG__",
        xi = "ngTempTokenPath",
        q_ = "ngTokenPath",
        Q_ = /\n/gm,
        Z_ = "\u0275",
        Hd = "__source";
      let ho;
      function cr(e) {
        const n = ho;
        return (ho = e), n;
      }
      function Y_(e, n = O.Default) {
        if (void 0 === ho) throw new C(-203, !1);
        return null === ho
          ? Bd(e, void 0, n)
          : ho.get(e, n & O.Optional ? null : void 0, n);
      }
      function R(e, n = O.Default) {
        return (
          (function W_() {
            return Ba;
          })() || Y_
        )(P(e), n);
      }
      function K(e, n = O.Default) {
        return R(e, Ni(n));
      }
      function Ni(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function za(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const r = P(e[t]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = O.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = K_(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            n.push(R(o, i));
          } else n.push(R(r));
        }
        return n;
      }
      function po(e, n) {
        return (e[Ha] = n), (e.prototype[Ha] = n), e;
      }
      function K_(e) {
        return e[Ha];
      }
      function en(e) {
        return { toString: e }.toString();
      }
      var jt = (() => (
          ((jt = jt || {})[(jt.OnPush = 0)] = "OnPush"),
          (jt[(jt.Default = 1)] = "Default"),
          jt
        ))(),
        Vt = (() => {
          return (
            ((e = Vt || (Vt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            Vt
          );
          var e;
        })();
      const tn = {},
        ee = [],
        Pi = ie({ ɵcmp: ie }),
        Ga = ie({ ɵdir: ie }),
        Wa = ie({ ɵpipe: ie }),
        Gd = ie({ ɵmod: ie }),
        nn = ie({ ɵfac: ie }),
        go = ie({ __NG_ELEMENT_ID__: ie });
      let eC = 0;
      function En(e) {
        return en(() => {
          const n = qd(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === jt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || Vt.Emulated,
              id: "c" + eC++,
              styles: e.styles || ee,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Qd(t);
          const r = e.dependencies;
          return (t.directiveDefs = Fi(r, !1)), (t.pipeDefs = Fi(r, !0)), t;
        });
      }
      function nC(e) {
        return re(e) || $e(e);
      }
      function rC(e) {
        return null !== e;
      }
      function Vn(e) {
        return en(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ee,
          declarations: e.declarations || ee,
          imports: e.imports || ee,
          exports: e.exports || ee,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Wd(e, n) {
        if (null == e) return tn;
        const t = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (t[o] = r),
              n && (n[o] = i);
          }
        return t;
      }
      function qe(e) {
        return en(() => {
          const n = qd(e);
          return Qd(n), n;
        });
      }
      function re(e) {
        return e[Pi] || null;
      }
      function $e(e) {
        return e[Ga] || null;
      }
      function tt(e) {
        return e[Wa] || null;
      }
      function ut(e, n) {
        const t = e[Gd] || null;
        if (!t && !0 === n)
          throw new Error(`Type ${ae(e)} does not have '\u0275mod' property.`);
        return t;
      }
      function qd(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || ee,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Wd(e.inputs, n),
          outputs: Wd(e.outputs),
        };
      }
      function Qd(e) {
        e.features?.forEach((n) => n(e));
      }
      function Fi(e, n) {
        if (!e) return null;
        const t = n ? tt : nC;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => t(r)).filter(rC);
      }
      const rn = 0,
        S = 1,
        G = 2,
        pe = 3,
        Mt = 4,
        Un = 5,
        je = 6,
        fr = 7,
        me = 8,
        Oi = 9,
        ki = 10,
        q = 11,
        qa = 12,
        mo = 13,
        Zd = 14,
        hr = 15,
        Ve = 16,
        yo = 17,
        pr = 18,
        Ut = 19,
        vo = 20,
        Yd = 21,
        ce = 22,
        Qa = 1,
        Kd = 2,
        Li = 7,
        $i = 8,
        gr = 9,
        Qe = 10;
      function lt(e) {
        return Array.isArray(e) && "object" == typeof e[Qa];
      }
      function Tt(e) {
        return Array.isArray(e) && !0 === e[Qa];
      }
      function Za(e) {
        return 0 != (4 & e.flags);
      }
      function Do(e) {
        return e.componentOffset > -1;
      }
      function ji(e) {
        return 1 == (1 & e.flags);
      }
      function At(e) {
        return !!e.template;
      }
      function iC(e) {
        return 0 != (256 & e[G]);
      }
      function Bn(e, n) {
        return e.hasOwnProperty(nn) ? e[nn] : null;
      }
      class uC {
        constructor(n, t, r) {
          (this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Hn() {
        return ef;
      }
      function ef(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = cC), lC;
      }
      function lC() {
        const e = nf(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === tn) e.previous = n;
          else for (let r in n) t[r] = n[r];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function cC(e, n, t, r) {
        const o = this.declaredInputs[t],
          i =
            nf(e) ||
            (function dC(e, n) {
              return (e[tf] = n);
            })(e, { previous: tn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new uC(u && u.currentValue, n, a === tn)), (e[r] = n);
      }
      Hn.ngInherit = !0;
      const tf = "__ngSimpleChanges__";
      function nf(e) {
        return e[tf] || null;
      }
      const vt = function (e, n, t) {};
      function Oe(e) {
        for (; Array.isArray(e); ) e = e[rn];
        return e;
      }
      function Vi(e, n) {
        return Oe(n[e]);
      }
      function ct(e, n) {
        return Oe(n[e.index]);
      }
      function af(e, n) {
        return e.data[n];
      }
      function nt(e, n) {
        const t = n[e];
        return lt(t) ? t : t[rn];
      }
      function Ui(e) {
        return 64 == (64 & e[G]);
      }
      function bn(e, n) {
        return null == n ? null : e[n];
      }
      function uf(e) {
        e[pr] = 0;
      }
      function Ka(e, n) {
        e[Un] += n;
        let t = e,
          r = e[pe];
        for (
          ;
          null !== r && ((1 === n && 1 === t[Un]) || (-1 === n && 0 === t[Un]));

        )
          (r[Un] += n), (t = r), (r = r[pe]);
      }
      const V = { lFrame: vf(null), bindingsEnabled: !0 };
      function cf() {
        return V.bindingsEnabled;
      }
      function _() {
        return V.lFrame.lView;
      }
      function X() {
        return V.lFrame.tView;
      }
      function ye(e) {
        return (V.lFrame.contextLView = e), e[me];
      }
      function ve(e) {
        return (V.lFrame.contextLView = null), e;
      }
      function ke() {
        let e = df();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function df() {
        return V.lFrame.currentTNode;
      }
      function Bt(e, n) {
        const t = V.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function Xa() {
        return V.lFrame.isParent;
      }
      function Ja() {
        V.lFrame.isParent = !1;
      }
      function yr() {
        return V.lFrame.bindingIndex++;
      }
      function sn(e) {
        const n = V.lFrame,
          t = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + e), t;
      }
      function bC(e, n) {
        const t = V.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), eu(n);
      }
      function eu(e) {
        V.lFrame.currentDirectiveIndex = e;
      }
      function gf() {
        return V.lFrame.currentQueryIndex;
      }
      function nu(e) {
        V.lFrame.currentQueryIndex = e;
      }
      function SC(e) {
        const n = e[S];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[je] : null;
      }
      function mf(e, n, t) {
        if (t & O.SkipSelf) {
          let o = n,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              t & O.Host ||
              ((o = SC(i)), null === o || ((i = i[hr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (n = o), (e = i);
        }
        const r = (V.lFrame = yf());
        return (r.currentTNode = n), (r.lView = e), !0;
      }
      function ru(e) {
        const n = yf(),
          t = e[S];
        (V.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function yf() {
        const e = V.lFrame,
          n = null === e ? null : e.child;
        return null === n ? vf(e) : n;
      }
      function vf(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function Df() {
        const e = V.lFrame;
        return (
          (V.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const _f = Df;
      function ou() {
        const e = Df();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ye() {
        return V.lFrame.selectedIndex;
      }
      function zn(e) {
        V.lFrame.selectedIndex = e;
      }
      function de() {
        const e = V.lFrame;
        return af(e.tView, e.selectedIndex);
      }
      function Bi(e, n) {
        for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
          const i = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-t, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(t, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(t, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-t, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(t, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(t, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(t, c);
        }
      }
      function Hi(e, n, t) {
        Cf(e, n, 3, t);
      }
      function zi(e, n, t, r) {
        (3 & e[G]) === t && Cf(e, n, t, r);
      }
      function iu(e, n) {
        let t = e[G];
        (3 & t) === n && ((t &= 2047), (t += 1), (e[G] = t));
      }
      function Cf(e, n, t, r) {
        const i = r ?? -1,
          s = n.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[pr] : 0; u < s; u++)
          if ("number" == typeof n[u + 1]) {
            if (((a = n[u]), null != r && a >= r)) break;
          } else
            n[u] < 0 && (e[pr] += 65536),
              (a < i || -1 == i) &&
                (OC(e, t, n, u), (e[pr] = (4294901760 & e[pr]) + u + 2)),
              u++;
      }
      function OC(e, n, t, r) {
        const o = t[r] < 0,
          i = t[r + 1],
          a = e[o ? -t[r] : t[r]];
        if (o) {
          if (e[G] >> 11 < e[pr] >> 16 && (3 & e[G]) === n) {
            (e[G] += 2048), vt(4, a, i);
            try {
              i.call(a);
            } finally {
              vt(5, a, i);
            }
          }
        } else {
          vt(4, a, i);
          try {
            i.call(a);
          } finally {
            vt(5, a, i);
          }
        }
      }
      const vr = -1;
      class Co {
        constructor(n, t, r) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function au(e, n, t) {
        let r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = t[r++],
              s = t[r++],
              a = t[r++];
            e.setAttribute(n, s, a, i);
          } else {
            const i = o,
              s = t[++r];
            Ef(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++;
          }
        }
        return r;
      }
      function wf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Ef(e) {
        return 64 === e.charCodeAt(0);
      }
      function wo(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let r = 0; r < n.length; r++) {
              const o = n[r];
              "number" == typeof o
                ? (t = o)
                : 0 === t ||
                  bf(e, t, o, null, -1 === t || 2 === t ? n[++r] : null);
            }
          }
        return e;
      }
      function bf(e, n, t, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === n) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, n), (i = s + 1)),
          e.splice(i++, 0, t),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function If(e) {
        return e !== vr;
      }
      function Gi(e) {
        return 32767 & e;
      }
      function Wi(e, n) {
        let t = (function jC(e) {
            return e >> 16;
          })(e),
          r = n;
        for (; t > 0; ) (r = r[hr]), t--;
        return r;
      }
      let uu = !0;
      function qi(e) {
        const n = uu;
        return (uu = e), n;
      }
      const Sf = 255,
        Mf = 5;
      let VC = 0;
      const Ht = {};
      function Qi(e, n) {
        const t = Tf(e, n);
        if (-1 !== t) return t;
        const r = n[S];
        r.firstCreatePass &&
          ((e.injectorIndex = n.length),
          lu(r.data, e),
          lu(n, null),
          lu(r.blueprint, null));
        const o = cu(e, n),
          i = e.injectorIndex;
        if (If(o)) {
          const s = Gi(o),
            a = Wi(o, n),
            u = a[S].data;
          for (let l = 0; l < 8; l++) n[i + l] = a[s + l] | u[s + l];
        }
        return (n[i + 8] = o), i;
      }
      function lu(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function Tf(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function cu(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let t = 0,
          r = null,
          o = n;
        for (; null !== o; ) {
          if (((r = kf(o)), null === r)) return vr;
          if ((t++, (o = o[hr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return vr;
      }
      function du(e, n, t) {
        !(function UC(e, n, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(go) && (r = t[go]),
            null == r && (r = t[go] = VC++);
          const o = r & Sf;
          n.data[e + (o >> Mf)] |= 1 << o;
        })(e, n, t);
      }
      function Af(e, n, t) {
        if (t & O.Optional || void 0 !== e) return e;
        Ti();
      }
      function Rf(e, n, t, r) {
        if (
          (t & O.Optional && void 0 === r && (r = null),
          !(t & (O.Self | O.Host)))
        ) {
          const o = e[Oi],
            i = yt(void 0);
          try {
            return o ? o.get(n, r, t & O.Optional) : Bd(n, r, t & O.Optional);
          } finally {
            yt(i);
          }
        }
        return Af(r, 0, t);
      }
      function xf(e, n, t, r = O.Default, o) {
        if (null !== e) {
          if (1024 & n[G]) {
            const s = (function WC(e, n, t, r, o) {
              let i = e,
                s = n;
              for (
                ;
                null !== i && null !== s && 1024 & s[G] && !(256 & s[G]);

              ) {
                const a = Nf(i, s, t, r | O.Self, Ht);
                if (a !== Ht) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[Yd];
                  if (l) {
                    const c = l.get(t, Ht, r);
                    if (c !== Ht) return c;
                  }
                  (u = kf(s)), (s = s[hr]);
                }
                i = u;
              }
              return o;
            })(e, n, t, r, Ht);
            if (s !== Ht) return s;
          }
          const i = Nf(e, n, t, r, Ht);
          if (i !== Ht) return i;
        }
        return Rf(n, t, r, o);
      }
      function Nf(e, n, t, r, o) {
        const i = (function zC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(go) ? e[go] : void 0;
          return "number" == typeof n ? (n >= 0 ? n & Sf : GC) : n;
        })(t);
        if ("function" == typeof i) {
          if (!mf(n, e, r)) return r & O.Host ? Af(o, 0, r) : Rf(n, t, r, o);
          try {
            const s = i(r);
            if (null != s || r & O.Optional) return s;
            Ti();
          } finally {
            _f();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Tf(e, n),
            u = vr,
            l = r & O.Host ? n[Ve][je] : null;
          for (
            (-1 === a || r & O.SkipSelf) &&
            ((u = -1 === a ? cu(e, n) : n[a + 8]),
            u !== vr && Ff(r, !1)
              ? ((s = n[S]), (a = Gi(u)), (n = Wi(u, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = n[S];
            if (Pf(i, a, c.data)) {
              const d = HC(a, n, t, s, r, l);
              if (d !== Ht) return d;
            }
            (u = n[a + 8]),
              u !== vr && Ff(r, n[S].data[a + 8] === l) && Pf(i, a, n)
                ? ((s = c), (a = Gi(u)), (n = Wi(u, n)))
                : (a = -1);
          }
        }
        return o;
      }
      function HC(e, n, t, r, o, i) {
        const s = n[S],
          a = s.data[e + 8],
          c = Zi(
            a,
            s,
            t,
            null == r ? Do(a) && uu : r != s && 0 != (3 & a.type),
            o & O.Host && i === a
          );
        return null !== c ? Gn(n, s, c, a) : Ht;
      }
      function Zi(e, n, t, r, o) {
        const i = e.providerIndexes,
          s = n.data,
          a = 1048575 & i,
          u = e.directiveStart,
          c = i >> 20,
          h = o ? a + c : e.directiveEnd;
        for (let f = r ? a : a + c; f < h; f++) {
          const g = s[f];
          if ((f < u && t === g) || (f >= u && g.type === t)) return f;
        }
        if (o) {
          const f = s[u];
          if (f && At(f) && f.type === t) return u;
        }
        return null;
      }
      function Gn(e, n, t, r) {
        let o = e[t];
        const i = n.data;
        if (
          (function kC(e) {
            return e instanceof Co;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function $_(e, n) {
              const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              );
            })(
              (function te(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : j(e);
              })(i[t])
            );
          const a = qi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? yt(s.injectImpl) : null;
          mf(e, r, O.Default);
          try {
            (o = e[t] = s.factory(void 0, i, e, r)),
              n.firstCreatePass &&
                t >= r.directiveStart &&
                (function FC(e, n, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = n.type.prototype;
                  if (r) {
                    const s = ef(n);
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, s),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, i),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, i));
                })(t, i[t], n);
          } finally {
            null !== u && yt(u), qi(a), (s.resolving = !1), _f();
          }
        }
        return o;
      }
      function Pf(e, n, t) {
        return !!(t[n + (e >> Mf)] & (1 << e));
      }
      function Ff(e, n) {
        return !(e & O.Self || (e & O.Host && n));
      }
      class Dr {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, r) {
          return xf(this._tNode, this._lView, n, Ni(r), t);
        }
      }
      function GC() {
        return new Dr(ke(), _());
      }
      function fu(e) {
        return ja(e)
          ? () => {
              const n = fu(P(e));
              return n && n();
            }
          : Bn(e);
      }
      function kf(e) {
        const n = e[S],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[je] : null;
      }
      const Cr = "__parameters__";
      function Er(e, n, t) {
        return en(() => {
          const r = (function hu(e) {
            return function (...t) {
              if (e) {
                const r = e(...t);
                for (const o in r) this[o] = r[o];
              }
            };
          })(n);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Cr)
                ? u[Cr]
                : Object.defineProperty(u, Cr, { value: [] })[Cr];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            t && (o.prototype = Object.create(t.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class k {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = F({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Wn(e, n) {
        e.forEach((t) => (Array.isArray(t) ? Wn(t, n) : n(t)));
      }
      function $f(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function Ki(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function dt(e, n, t) {
        let r = br(e, n);
        return (
          r >= 0
            ? (e[1 | r] = t)
            : ((r = ~r),
              (function YC(e, n, t, r) {
                let o = e.length;
                if (o == n) e.push(t, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = t);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > n; )
                    (e[o] = e[o - 2]), o--;
                  (e[n] = t), (e[n + 1] = r);
                }
              })(e, r, n, t)),
          r
        );
      }
      function gu(e, n) {
        const t = br(e, n);
        if (t >= 0) return e[1 | t];
      }
      function br(e, n) {
        return (function jf(e, n, t) {
          let r = 0,
            o = e.length >> t;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << t];
            if (n === s) return i << t;
            s > n ? (o = i) : (r = i + 1);
          }
          return ~(o << t);
        })(e, n, 1);
      }
      const So = po(Er("Optional"), 8),
        Mo = po(Er("SkipSelf"), 4);
      var rt = (() => (
        ((rt = rt || {})[(rt.Important = 1)] = "Important"),
        (rt[(rt.DashCase = 2)] = "DashCase"),
        rt
      ))();
      const Cu = new Map();
      let vw = 0;
      const Eu = "__ngContext__";
      function Ue(e, n) {
        lt(n)
          ? ((e[Eu] = n[vo]),
            (function _w(e) {
              Cu.set(e[vo], e);
            })(n))
          : (e[Eu] = n);
      }
      let bu;
      function Iu(e, n) {
        return bu(e, n);
      }
      function xo(e) {
        const n = e[pe];
        return Tt(n) ? n[pe] : n;
      }
      function Su(e) {
        return ih(e[mo]);
      }
      function Mu(e) {
        return ih(e[Mt]);
      }
      function ih(e) {
        for (; null !== e && !Tt(e); ) e = e[Mt];
        return e;
      }
      function Sr(e, n, t, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Tt(r) ? (i = r) : lt(r) && ((s = !0), (r = r[rn]));
          const a = Oe(r);
          0 === e && null !== t
            ? null == o
              ? dh(n, t, a)
              : qn(n, t, a, o || null, !0)
            : 1 === e && null !== t
            ? qn(n, t, a, o || null, !0)
            : 2 === e
            ? (function Fu(e, n, t) {
                const r = ts(e, n);
                r &&
                  (function Vw(e, n, t, r) {
                    e.removeChild(n, t, r);
                  })(e, r, n, t);
              })(n, a, s)
            : 3 === e && n.destroyNode(a),
            null != i &&
              (function Hw(e, n, t, r, o) {
                const i = t[Li];
                i !== Oe(t) && Sr(n, e, r, i, o);
                for (let a = Qe; a < t.length; a++) {
                  const u = t[a];
                  No(u[S], u, e, n, r, i);
                }
              })(n, e, i, t, o);
        }
      }
      function Au(e, n, t) {
        return e.createElement(n, t);
      }
      function ah(e, n) {
        const t = e[gr],
          r = t.indexOf(n),
          o = n[pe];
        512 & n[G] && ((n[G] &= -513), Ka(o, -1)), t.splice(r, 1);
      }
      function Ru(e, n) {
        if (e.length <= Qe) return;
        const t = Qe + n,
          r = e[t];
        if (r) {
          const o = r[yo];
          null !== o && o !== e && ah(o, r), n > 0 && (e[t - 1][Mt] = r[Mt]);
          const i = Ki(e, Qe + n);
          !(function Nw(e, n) {
            No(e, n, n[q], 2, null, null), (n[rn] = null), (n[je] = null);
          })(r[S], r);
          const s = i[Ut];
          null !== s && s.detachView(i[S]),
            (r[pe] = null),
            (r[Mt] = null),
            (r[G] &= -65);
        }
        return r;
      }
      function uh(e, n) {
        if (!(128 & n[G])) {
          const t = n[q];
          t.destroyNode && No(e, n, t, 3, null, null),
            (function Ow(e) {
              let n = e[mo];
              if (!n) return xu(e[S], e);
              for (; n; ) {
                let t = null;
                if (lt(n)) t = n[mo];
                else {
                  const r = n[Qe];
                  r && (t = r);
                }
                if (!t) {
                  for (; n && !n[Mt] && n !== e; )
                    lt(n) && xu(n[S], n), (n = n[pe]);
                  null === n && (n = e), lt(n) && xu(n[S], n), (t = n && n[Mt]);
                }
                n = t;
              }
            })(n);
        }
      }
      function xu(e, n) {
        if (!(128 & n[G])) {
          (n[G] &= -65),
            (n[G] |= 128),
            (function jw(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const o = n[t[r]];
                  if (!(o instanceof Co)) {
                    const i = t[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        vt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          vt(5, a, u);
                        }
                      }
                    else {
                      vt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        vt(5, o, i);
                      }
                    }
                  }
                }
            })(e, n),
            (function $w(e, n) {
              const t = e.cleanup,
                r = n[fr];
              let o = -1;
              if (null !== t)
                for (let i = 0; i < t.length - 1; i += 2)
                  if ("string" == typeof t[i]) {
                    const s = t[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = t[i + 1])];
                    t[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                n[fr] = null;
              }
            })(e, n),
            1 === n[S].type && n[q].destroy();
          const t = n[yo];
          if (null !== t && Tt(n[pe])) {
            t !== n[pe] && ah(t, n);
            const r = n[Ut];
            null !== r && r.detachView(e);
          }
          !(function Cw(e) {
            Cu.delete(e[vo]);
          })(n);
        }
      }
      function lh(e, n, t) {
        return (function ch(e, n, t) {
          let r = n;
          for (; null !== r && 40 & r.type; ) r = (n = r).parent;
          if (null === r) return t[rn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === Vt.None || i === Vt.Emulated) return null;
            }
            return ct(r, t);
          }
        })(e, n.parent, t);
      }
      function qn(e, n, t, r, o) {
        e.insertBefore(n, t, r, o);
      }
      function dh(e, n, t) {
        e.appendChild(n, t);
      }
      function fh(e, n, t, r, o) {
        null !== r ? qn(e, n, t, r, o) : dh(e, n, t);
      }
      function ts(e, n) {
        return e.parentNode(n);
      }
      let Nu,
        Lu,
        is,
        gh = function ph(e, n, t) {
          return 40 & e.type ? ct(e, t) : null;
        };
      function ns(e, n, t, r) {
        const o = lh(e, r, n),
          i = n[q],
          a = (function hh(e, n, t) {
            return gh(e, n, t);
          })(r.parent || n[je], r, n);
        if (null != o)
          if (Array.isArray(t))
            for (let u = 0; u < t.length; u++) fh(i, o, t[u], a, !1);
          else fh(i, o, t, a, !1);
        void 0 !== Nu && Nu(i, r, n, t, o);
      }
      function rs(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return ct(n, e);
          if (4 & t) return Pu(-1, e[n.index]);
          if (8 & t) {
            const r = n.child;
            if (null !== r) return rs(e, r);
            {
              const o = e[n.index];
              return Tt(o) ? Pu(-1, o) : Oe(o);
            }
          }
          if (32 & t) return Iu(n, e)() || Oe(e[n.index]);
          {
            const r = yh(e, n);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : rs(xo(e[Ve]), r)
              : rs(e, n.next);
          }
        }
        return null;
      }
      function yh(e, n) {
        return null !== n ? e[Ve][je].projection[n.projection] : null;
      }
      function Pu(e, n) {
        const t = Qe + e + 1;
        if (t < n.length) {
          const r = n[t],
            o = r[S].firstChild;
          if (null !== o) return rs(r, o);
        }
        return n[Li];
      }
      function Ou(e, n, t, r, o, i, s) {
        for (; null != t; ) {
          const a = r[t.index],
            u = t.type;
          if (
            (s && 0 === n && (a && Ue(Oe(a), r), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & u) Ou(e, n, t.child, r, o, i, !1), Sr(n, e, o, a, i);
            else if (32 & u) {
              const l = Iu(t, r);
              let c;
              for (; (c = l()); ) Sr(n, e, o, c, i);
              Sr(n, e, o, a, i);
            } else 16 & u ? vh(e, n, r, t, o, i) : Sr(n, e, o, a, i);
          t = s ? t.projectionNext : t.next;
        }
      }
      function No(e, n, t, r, o, i) {
        Ou(t, r, e.firstChild, n, o, i, !1);
      }
      function vh(e, n, t, r, o, i) {
        const s = t[Ve],
          u = s[je].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Sr(n, e, o, u[l], i);
        else Ou(e, n, u, s[pe], o, i, !0);
      }
      function Dh(e, n, t) {
        "" === t
          ? e.removeAttribute(n, "class")
          : e.setAttribute(n, "class", t);
      }
      function _h(e, n, t) {
        const { mergedAttrs: r, classes: o, styles: i } = t;
        null !== r && au(e, n, r),
          null !== o && Dh(e, n, o),
          null !== i &&
            (function Gw(e, n, t) {
              e.setAttribute(n, "style", t);
            })(e, n, i);
      }
      function bh(e) {
        return (
          (function $u() {
            if (void 0 === is && ((is = null), le.trustedTypes))
              try {
                is = le.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return is;
          })()?.createScriptURL(e) || e
        );
      }
      class Ih {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${$d})`;
        }
      }
      function In(e) {
        return e instanceof Ih ? e.changingThisBreaksApplicationSecurity : e;
      }
      function Po(e, n) {
        const t = (function tE(e) {
          return (e instanceof Ih && e.getTypeName()) || null;
        })(e);
        if (null != t && t !== n) {
          if ("ResourceURL" === t && "URL" === n) return !0;
          throw new Error(`Required a safe ${n}, got a ${t} (see ${$d})`);
        }
        return t === n;
      }
      const iE = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Ee = (() => (
        ((Ee = Ee || {})[(Ee.NONE = 0)] = "NONE"),
        (Ee[(Ee.HTML = 1)] = "HTML"),
        (Ee[(Ee.STYLE = 2)] = "STYLE"),
        (Ee[(Ee.SCRIPT = 3)] = "SCRIPT"),
        (Ee[(Ee.URL = 4)] = "URL"),
        (Ee[(Ee.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        Ee
      ))();
      function Nh(e) {
        const n = Oo();
        return n
          ? n.sanitize(Ee.URL, e) || ""
          : Po(e, "URL")
          ? In(e)
          : (function ju(e) {
              return (e = String(e)).match(iE) ? e : "unsafe:" + e;
            })(j(e));
      }
      function Ph(e) {
        const n = Oo();
        if (n) return bh(n.sanitize(Ee.RESOURCE_URL, e) || "");
        if (Po(e, "ResourceURL")) return bh(In(e));
        throw new C(904, !1);
      }
      function Oo() {
        const e = _();
        return e && e[qa];
      }
      const as = new k("ENVIRONMENT_INITIALIZER"),
        Oh = new k("INJECTOR", -1),
        kh = new k("INJECTOR_DEF_TYPES");
      class Lh {
        get(n, t = fo) {
          if (t === fo) {
            const r = new Error(`NullInjectorError: No provider for ${ae(n)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      function vE(...e) {
        return { ɵproviders: $h(0, e), ɵfromNgModule: !0 };
      }
      function $h(e, ...n) {
        const t = [],
          r = new Set();
        let o;
        return (
          Wn(n, (i) => {
            const s = i;
            Hu(s, t, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && jh(o, t),
          t
        );
      }
      function jh(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { providers: o } = e[t];
          zu(o, (i) => {
            n.push(i);
          });
        }
      }
      function Hu(e, n, t, r) {
        if (!(e = P(e))) return !1;
        let o = null,
          i = Vd(e);
        const s = !i && re(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Vd(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Hu(l, n, t, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Wn(i.imports, (c) => {
                  Hu(c, n, t, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && jh(l, n);
            }
            if (!a) {
              const l = Bn(o) || (() => new o());
              n.push(
                { provide: o, useFactory: l, deps: ee },
                { provide: kh, useValue: o, multi: !0 },
                { provide: as, useValue: () => R(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              zu(u, (c) => {
                n.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function zu(e, n) {
        for (let t of e)
          Va(t) && (t = t.ɵproviders), Array.isArray(t) ? zu(t, n) : n(t);
      }
      const DE = ie({ provide: String, useValue: ie });
      function Gu(e) {
        return null !== e && "object" == typeof e && DE in e;
      }
      function Qn(e) {
        return "function" == typeof e;
      }
      const Wu = new k("Set Injector scope."),
        us = {},
        CE = {};
      let qu;
      function ls() {
        return void 0 === qu && (qu = new Lh()), qu;
      }
      class un {}
      class Bh extends un {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, r, o) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Zu(n, (s) => this.processProvider(s)),
            this.records.set(Oh, Tr(void 0, this)),
            o.has("environment") && this.records.set(un, Tr(void 0, this));
          const i = this.records.get(Wu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(kh.multi, ee, O.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            for (const n of this._onDestroyHooks) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(n) {
          this._onDestroyHooks.push(n);
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = cr(this),
            r = yt(void 0);
          try {
            return n();
          } finally {
            cr(t), yt(r);
          }
        }
        get(n, t = fo, r = O.Default) {
          this.assertNotDestroyed(), (r = Ni(r));
          const o = cr(this),
            i = yt(void 0);
          try {
            if (!(r & O.SkipSelf)) {
              let a = this.records.get(n);
              if (void 0 === a) {
                const u =
                  (function SE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof k)
                    );
                  })(n) && Ai(n);
                (a = u && this.injectableDefInScope(u) ? Tr(Qu(n), us) : null),
                  this.records.set(n, a);
              }
              if (null != a) return this.hydrate(n, a);
            }
            return (r & O.Self ? ls() : this.parent).get(
              n,
              (t = r & O.Optional && t === fo ? null : t)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[xi] = s[xi] || []).unshift(ae(n)), o)) throw s;
              return (function X_(e, n, t, r) {
                const o = e[xi];
                throw (
                  (n[Hd] && o.unshift(n[Hd]),
                  (e.message = (function J_(e, n, t, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Z_
                        ? e.slice(2)
                        : e;
                    let o = ae(n);
                    if (Array.isArray(n)) o = n.map(ae).join(" -> ");
                    else if ("object" == typeof n) {
                      let i = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ae(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${t}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Q_,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, t, r)),
                  (e[q_] = o),
                  (e[xi] = null),
                  e)
                );
              })(s, n, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            yt(i), cr(o);
          }
        }
        resolveInjectorInitializers() {
          const n = cr(this),
            t = yt(void 0);
          try {
            const r = this.get(as.multi, ee, O.Self);
            for (const o of r) o();
          } finally {
            cr(n), yt(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const r of t.keys()) n.push(ae(r));
          return `R3Injector[${n.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(n) {
          let t = Qn((n = P(n))) ? n : P(n && n.provide);
          const r = (function EE(e) {
            return Gu(e)
              ? Tr(void 0, e.useValue)
              : Tr(
                  (function Hh(e, n, t) {
                    let r;
                    if (Qn(e)) {
                      const o = P(e);
                      return Bn(o) || Qu(o);
                    }
                    if (Gu(e)) r = () => P(e.useValue);
                    else if (
                      (function Uh(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...za(e.deps || []));
                    else if (
                      (function Vh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => R(P(e.useExisting));
                    else {
                      const o = P(e && (e.useClass || e.provide));
                      if (
                        !(function bE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Bn(o) || Qu(o);
                      r = () => new o(...za(e.deps));
                    }
                    return r;
                  })(e),
                  us
                );
          })(n);
          if (Qn(n) || !0 !== n.multi) this.records.get(t);
          else {
            let o = this.records.get(t);
            o ||
              ((o = Tr(void 0, us, !0)),
              (o.factory = () => za(o.multi)),
              this.records.set(t, o)),
              (t = n),
              o.multi.push(n);
          }
          this.records.set(t, r);
        }
        hydrate(n, t) {
          return (
            t.value === us && ((t.value = CE), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function IE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = P(n.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
      }
      function Qu(e) {
        const n = Ai(e),
          t = null !== n ? n.factory : Bn(e);
        if (null !== t) return t;
        if (e instanceof k) throw new C(204, !1);
        if (e instanceof Function)
          return (function wE(e) {
            const n = e.length;
            if (n > 0)
              throw (
                ((function Io(e, n) {
                  const t = [];
                  for (let r = 0; r < e; r++) t.push(n);
                  return t;
                })(n, "?"),
                new C(204, !1))
              );
            const t = (function z_(e) {
              return (e && (e[Ri] || e[Ud])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function Tr(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function Zu(e, n) {
        for (const t of e)
          Array.isArray(t) ? Zu(t, n) : t && Va(t) ? Zu(t.ɵproviders, n) : n(t);
      }
      class ME {}
      class zh {}
      class AE {
        resolveComponentFactory(n) {
          throw (function TE(e) {
            const n = Error(
              `No component factory found for ${ae(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let ko = (() => {
        class e {}
        return (e.NULL = new AE()), e;
      })();
      function RE() {
        return Ar(ke(), _());
      }
      function Ar(e, n) {
        return new Sn(ct(e, n));
      }
      let Sn = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (e.__NG_ELEMENT_ID__ = RE), e;
      })();
      function xE(e) {
        return e instanceof Sn ? e.nativeElement : e;
      }
      class Wh {}
      let cs = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function NE() {
                const e = _(),
                  t = nt(ke().index, e);
                return (lt(t) ? t : e)[q];
              })()),
            e
          );
        })(),
        PE = (() => {
          class e {}
          return (
            (e.ɵprov = F({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class ds {
        constructor(n) {
          (this.full = n),
            (this.major = n.split(".")[0]),
            (this.minor = n.split(".")[1]),
            (this.patch = n.split(".").slice(2).join("."));
        }
      }
      const FE = new ds("15.2.10"),
        Yu = {},
        Ku = "ngOriginalError";
      function Xu(e) {
        return e[Ku];
      }
      class Rr {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error("ERROR", n),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(n) {
          let t = n && Xu(n);
          for (; t && Xu(t); ) t = Xu(t);
          return t || null;
        }
      }
      function ln(e) {
        return e instanceof Function ? e() : e;
      }
      function Qh(e, n, t) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(n, t);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = n.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          t = o + 1;
        }
      }
      const Zh = "ng-template";
      function GE(e, n, t) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (t && "class" === i && -1 !== Qh(s.toLowerCase(), n, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === n) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Yh(e) {
        return 4 === e.type && e.value !== Zh;
      }
      function WE(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Zh);
      }
      function qE(e, n, t) {
        let r = 4;
        const o = e.attrs || [],
          i = (function YE(e) {
            for (let n = 0; n < e.length; n++) if (wf(e[n])) return n;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const u = n[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !WE(e, u, t)) || ("" === u && 1 === n.length))
                ) {
                  if (Rt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : n[++a];
                if (8 & r && null !== e.attrs) {
                  if (!GE(e.attrs, l, t)) {
                    if (Rt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = QE(8 & r ? "class" : u, o, Yh(e), t);
                if (-1 === d) {
                  if (Rt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let h;
                  h = d > i ? "" : o[d + 1].toLowerCase();
                  const f = 8 & r ? h : null;
                  if ((f && -1 !== Qh(f, l, 0)) || (2 & r && l !== h)) {
                    if (Rt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Rt(r) && !Rt(u)) return !1;
            if (s && Rt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Rt(r) || s;
      }
      function Rt(e) {
        return 0 == (1 & e);
      }
      function QE(e, n, t, r) {
        if (null === n) return -1;
        let o = 0;
        if (r || !t) {
          let i = !1;
          for (; o < n.length; ) {
            const s = n[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++o];
                for (; "string" == typeof a; ) a = n[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function KE(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const r = e[t];
              if ("number" == typeof r) return -1;
              if (r === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function Kh(e, n, t = !1) {
        for (let r = 0; r < n.length; r++) if (qE(e, n[r], t)) return !0;
        return !1;
      }
      function Xh(e, n) {
        return e ? ":not(" + n.trim() + ")" : n;
      }
      function JE(e) {
        let n = e[0],
          t = 1,
          r = 2,
          o = "",
          i = !1;
        for (; t < e.length; ) {
          let s = e[t];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++t];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Rt(s) && ((n += Xh(i, o)), (o = "")),
              (r = s),
              (i = i || !Rt(r));
          t++;
        }
        return "" !== o && (n += Xh(i, o)), n;
      }
      const U = {};
      function b(e) {
        Jh(X(), _(), Ye() + e, !1);
      }
      function Jh(e, n, t, r) {
        if (!r)
          if (3 == (3 & n[G])) {
            const i = e.preOrderCheckHooks;
            null !== i && Hi(n, i, t);
          } else {
            const i = e.preOrderHooks;
            null !== i && zi(n, i, 0, t);
          }
        zn(t);
      }
      function rp(e, n = null, t = null, r) {
        const o = op(e, n, t, r);
        return o.resolveInjectorInitializers(), o;
      }
      function op(e, n = null, t = null, r, o = new Set()) {
        const i = [t || ee, vE(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ae(e))),
          new Bh(i, n || ls(), r || null, o)
        );
      }
      let cn = (() => {
        class e {
          static create(t, r) {
            if (Array.isArray(t)) return rp({ name: "" }, r, t, "");
            {
              const o = t.name ?? "";
              return rp({ name: o }, t.parent, t.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = fo),
          (e.NULL = new Lh()),
          (e.ɵprov = F({ token: e, providedIn: "any", factory: () => R(Oh) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function T(e, n = O.Default) {
        const t = _();
        return null === t ? R(e, n) : xf(ke(), t, P(e), n);
      }
      function fp(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const i = t[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              nu(t[r]), s.contentQueries(2, n[i], i);
            }
          }
      }
      function hs(e, n, t, r, o, i, s, a, u, l, c) {
        const d = n.blueprint.slice();
        return (
          (d[rn] = o),
          (d[G] = 76 | r),
          (null !== c || (e && 1024 & e[G])) && (d[G] |= 1024),
          uf(d),
          (d[pe] = d[hr] = e),
          (d[me] = t),
          (d[ki] = s || (e && e[ki])),
          (d[q] = a || (e && e[q])),
          (d[qa] = u || (e && e[qa]) || null),
          (d[Oi] = l || (e && e[Oi]) || null),
          (d[je] = i),
          (d[vo] = (function Dw() {
            return vw++;
          })()),
          (d[Yd] = c),
          (d[Ve] = 2 == n.type ? e[Ve] : d),
          d
        );
      }
      function Pr(e, n, t, r, o) {
        let i = e.data[n];
        if (null === i)
          (i = (function rl(e, n, t, r, o) {
            const i = df(),
              s = Xa(),
              u = (e.data[n] = (function S0(e, n, t, r, o, i) {
                return {
                  type: t,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: n ? n.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: n,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, t, n, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, n, t, r, o)),
            (function EC() {
              return V.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = t), (i.value = r), (i.attrs = o);
          const s = (function _o() {
            const e = V.lFrame,
              n = e.currentTNode;
            return e.isParent ? n : n.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Bt(i, !0), i;
      }
      function Lo(e, n, t, r) {
        if (0 === t) return -1;
        const o = n.length;
        for (let i = 0; i < t; i++)
          n.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function ol(e, n, t) {
        ru(n);
        try {
          const r = e.viewQuery;
          null !== r && hl(1, r, t);
          const o = e.template;
          null !== o && hp(e, n, o, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && fp(e, n),
            e.staticViewQueries && hl(2, e.viewQuery, t);
          const i = e.components;
          null !== i &&
            (function E0(e, n) {
              for (let t = 0; t < n.length; t++) W0(e, n[t]);
            })(n, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (n[G] &= -5), ou();
        }
      }
      function ps(e, n, t, r) {
        const o = n[G];
        if (128 != (128 & o)) {
          ru(n);
          try {
            uf(n),
              (function hf(e) {
                return (V.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && hp(e, n, t, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Hi(n, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && zi(n, l, 0, null), iu(n, 0);
            }
            if (
              ((function z0(e) {
                for (let n = Su(e); null !== n; n = Mu(n)) {
                  if (!n[Kd]) continue;
                  const t = n[gr];
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    512 & o[G] || Ka(o[pe], 1), (o[G] |= 512);
                  }
                }
              })(n),
              (function H0(e) {
                for (let n = Su(e); null !== n; n = Mu(n))
                  for (let t = Qe; t < n.length; t++) {
                    const r = n[t],
                      o = r[S];
                    Ui(r) && ps(o, r, o.template, r[me]);
                  }
              })(n),
              null !== e.contentQueries && fp(e, n),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Hi(n, l);
            } else {
              const l = e.contentHooks;
              null !== l && zi(n, l, 1), iu(n, 1);
            }
            !(function C0(e, n) {
              const t = e.hostBindingOpCodes;
              if (null !== t)
                try {
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    if (o < 0) zn(~o);
                    else {
                      const i = o,
                        s = t[++r],
                        a = t[++r];
                      bC(s, i), a(2, n[i]);
                    }
                  }
                } finally {
                  zn(-1);
                }
            })(e, n);
            const a = e.components;
            null !== a &&
              (function w0(e, n) {
                for (let t = 0; t < n.length; t++) G0(e, n[t]);
              })(n, a);
            const u = e.viewQuery;
            if ((null !== u && hl(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Hi(n, l);
            } else {
              const l = e.viewHooks;
              null !== l && zi(n, l, 2), iu(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[G] &= -41),
              512 & n[G] && ((n[G] &= -513), Ka(n[pe], -1));
          } finally {
            ou();
          }
        }
      }
      function hp(e, n, t, r, o) {
        const i = Ye(),
          s = 2 & r;
        try {
          zn(-1),
            s && n.length > ce && Jh(e, n, ce, !1),
            vt(s ? 2 : 0, o),
            t(r, o);
        } finally {
          zn(i), vt(s ? 3 : 1, o);
        }
      }
      function il(e, n, t) {
        if (Za(n)) {
          const o = n.directiveEnd;
          for (let i = n.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, t[i], i);
          }
        }
      }
      function sl(e, n, t) {
        cf() &&
          ((function P0(e, n, t, r) {
            const o = t.directiveStart,
              i = t.directiveEnd;
            Do(t) &&
              (function V0(e, n, t) {
                const r = ct(n, e),
                  o = pp(t),
                  i = e[ki],
                  s = gs(
                    e,
                    hs(
                      e,
                      o,
                      null,
                      t.onPush ? 32 : 16,
                      r,
                      n,
                      i,
                      i.createRenderer(r, t),
                      null,
                      null,
                      null
                    )
                  );
                e[n.index] = s;
              })(n, t, e.data[o + t.componentOffset]),
              e.firstCreatePass || Qi(t, n),
              Ue(r, n);
            const s = t.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Gn(n, e, a, t);
              Ue(l, n),
                null !== s && U0(0, a - o, l, u, 0, s),
                At(u) && (nt(t.index, n)[me] = Gn(n, e, a, t));
            }
          })(e, n, t, ct(t, n)),
          64 == (64 & t.flags) && Dp(e, n, t));
      }
      function al(e, n, t = ct) {
        const r = n.localNames;
        if (null !== r) {
          let o = n.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? t(n, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function pp(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = ul(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : n;
      }
      function ul(e, n, t, r, o, i, s, a, u, l) {
        const c = ce + r,
          d = c + o,
          h = (function b0(e, n) {
            const t = [];
            for (let r = 0; r < n; r++) t.push(r < e ? null : U);
            return t;
          })(c, d),
          f = "function" == typeof l ? l() : l;
        return (h[S] = {
          type: e,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function gp(e, n, t, r) {
        const o = Cp(n);
        null === t
          ? o.push(r)
          : (o.push(t), e.firstCreatePass && wp(e).push(r, o.length - 1));
      }
      function mp(e, n, t, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            t = null === t ? {} : t;
            const i = e[o];
            null === r
              ? yp(t, n, o, i)
              : r.hasOwnProperty(o) && yp(t, n, r[o], i);
          }
        return t;
      }
      function yp(e, n, t, r) {
        e.hasOwnProperty(t) ? e[t].push(n, r) : (e[t] = [n, r]);
      }
      function ll(e, n, t, r) {
        if (cf()) {
          const o = null === r ? null : { "": -1 },
            i = (function O0(e, n) {
              const t = e.directiveRegistry;
              let r = null,
                o = null;
              if (t)
                for (let i = 0; i < t.length; i++) {
                  const s = t[i];
                  if (Kh(n, s.selectors, !1))
                    if ((r || (r = []), At(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          cl(e, n, a.length);
                      } else r.unshift(s), cl(e, n, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, t);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && vp(e, n, t, s, o, a),
            o &&
              (function k0(e, n, t) {
                if (n) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < n.length; o += 2) {
                    const i = t[n[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(n[o], i);
                  }
                }
              })(t, r, o);
        }
        t.mergedAttrs = wo(t.mergedAttrs, t.attrs);
      }
      function vp(e, n, t, r, o, i) {
        for (let l = 0; l < r.length; l++) du(Qi(t, n), e, r[l].type);
        !(function $0(e, n, t) {
          (e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n);
        })(t, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = Lo(e, n, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (t.mergedAttrs = wo(t.mergedAttrs, c.hostAttrs)),
            j0(e, t, n, u, c),
            L0(u, c, o),
            null !== c.contentQueries && (t.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (t.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(t.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                t.index
              ),
              (a = !0)),
            u++;
        }
        !(function M0(e, n, t) {
          const o = n.directiveEnd,
            i = e.data,
            s = n.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = n.directiveStart; c < o; c++) {
            const d = i[c],
              h = t ? t.get(d) : null,
              g = h ? h.outputs : null;
            (u = mp(d.inputs, c, u, h ? h.inputs : null)),
              (l = mp(d.outputs, c, l, g));
            const p = null === u || null === s || Yh(n) ? null : B0(u, c, s);
            a.push(p);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (n.flags |= 8),
            u.hasOwnProperty("style") && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = u),
            (n.outputs = l);
        })(e, t, i);
      }
      function Dp(e, n, t) {
        const r = t.directiveStart,
          o = t.directiveEnd,
          i = t.index,
          s = (function IC() {
            return V.lFrame.currentDirectiveIndex;
          })();
        try {
          zn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = n[a];
            eu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                F0(u, l);
          }
        } finally {
          zn(-1), eu(s);
        }
      }
      function F0(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function cl(e, n, t) {
        (n.componentOffset = t),
          (e.components ?? (e.components = [])).push(n.index);
      }
      function L0(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
          At(n) && (t[""] = e);
        }
      }
      function j0(e, n, t, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Bn(o.type)),
          s = new Co(i, At(o), T);
        (e.blueprint[r] = s),
          (t[r] = s),
          (function x0(e, n, t, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function N0(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ("number" == typeof t && t < 0) return t;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(t, r, i);
            }
          })(e, n, r, Lo(e, t, o.hostVars, U), o);
      }
      function zt(e, n, t, r, o, i) {
        const s = ct(e, n);
        !(function dl(e, n, t, r, o, i, s) {
          if (null == i) e.removeAttribute(n, o, t);
          else {
            const a = null == s ? j(i) : s(i, r || "", o);
            e.setAttribute(n, o, a, t);
          }
        })(n[q], s, i, e.value, t, r, o);
      }
      function U0(e, n, t, r, o, i) {
        const s = i[n];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(t, d, l, c) : (t[c] = d);
          }
        }
      }
      function B0(e, n, t) {
        let r = null,
          o = 0;
        for (; o < t.length; ) {
          const i = t[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    r.push(i, s[a + 1], t[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function _p(e, n, t, r) {
        return [e, !0, !1, n, null, 0, r, t, null, null];
      }
      function G0(e, n) {
        const t = nt(n, e);
        if (Ui(t)) {
          const r = t[S];
          48 & t[G] ? ps(r, t, r.template, t[me]) : t[Un] > 0 && fl(t);
        }
      }
      function fl(e) {
        for (let r = Su(e); null !== r; r = Mu(r))
          for (let o = Qe; o < r.length; o++) {
            const i = r[o];
            if (Ui(i))
              if (512 & i[G]) {
                const s = i[S];
                ps(s, i, s.template, i[me]);
              } else i[Un] > 0 && fl(i);
          }
        const t = e[S].components;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const o = nt(t[r], e);
            Ui(o) && o[Un] > 0 && fl(o);
          }
      }
      function W0(e, n) {
        const t = nt(n, e),
          r = t[S];
        (function q0(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t]);
        })(r, t),
          ol(r, t, t[me]);
      }
      function gs(e, n) {
        return e[mo] ? (e[Zd][Mt] = n) : (e[mo] = n), (e[Zd] = n), n;
      }
      function ms(e) {
        for (; e; ) {
          e[G] |= 32;
          const n = xo(e);
          if (iC(e) && !n) return e;
          e = n;
        }
        return null;
      }
      function ys(e, n, t, r = !0) {
        const o = n[ki];
        o.begin && o.begin();
        try {
          ps(e, n, e.template, t);
        } catch (s) {
          throw (r && bp(n, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function hl(e, n, t) {
        nu(0), n(e, t);
      }
      function Cp(e) {
        return e[fr] || (e[fr] = []);
      }
      function wp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function bp(e, n) {
        const t = e[Oi],
          r = t ? t.get(Rr, null) : null;
        r && r.handleError(n);
      }
      function pl(e, n, t, r, o) {
        for (let i = 0; i < t.length; ) {
          const s = t[i++],
            a = t[i++],
            u = n[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function dn(e, n, t) {
        const r = Vi(n, e);
        !(function sh(e, n, t) {
          e.setValue(n, t);
        })(e[q], r, t);
      }
      function vs(e, n, t) {
        let r = t ? e.styles : null,
          o = t ? e.classes : null,
          i = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = La(o, a))
              : 2 == i && (r = La(r, a + ": " + n[++s] + ";"));
          }
        t ? (e.styles = r) : (e.stylesWithoutHost = r),
          t ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ds(e, n, t, r, o = !1) {
        for (; null !== t; ) {
          const i = n[t.index];
          if ((null !== i && r.push(Oe(i)), Tt(i)))
            for (let a = Qe; a < i.length; a++) {
              const u = i[a],
                l = u[S].firstChild;
              null !== l && Ds(u[S], u, l, r);
            }
          const s = t.type;
          if (8 & s) Ds(e, n, t.child, r);
          else if (32 & s) {
            const a = Iu(t, n);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = yh(n, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = xo(n[Ve]);
              Ds(u[S], u, a, r, !0);
            }
          }
          t = o ? t.projectionNext : t.next;
        }
        return r;
      }
      class $o {
        get rootNodes() {
          const n = this._lView,
            t = n[S];
          return Ds(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[me];
        }
        set context(n) {
          this._lView[me] = n;
        }
        get destroyed() {
          return 128 == (128 & this._lView[G]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[pe];
            if (Tt(n)) {
              const t = n[$i],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (Ru(n, r), Ki(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          uh(this._lView[S], this._lView);
        }
        onDestroy(n) {
          gp(this._lView[S], this._lView, null, n);
        }
        markForCheck() {
          ms(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[G] &= -65;
        }
        reattach() {
          this._lView[G] |= 64;
        }
        detectChanges() {
          ys(this._lView[S], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function Fw(e, n) {
              No(e, n, n[q], 2, null, null);
            })(this._lView[S], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = n;
        }
      }
      class Q0 extends $o {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          ys(n[S], n, n[me], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ip extends ko {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = re(n);
          return new jo(t, this.ngModule);
        }
      }
      function Sp(e) {
        const n = [];
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class Y0 {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, r) {
          r = Ni(r);
          const o = this.injector.get(n, Yu, r);
          return o !== Yu || t === Yu ? o : this.parentInjector.get(n, t, r);
        }
      }
      class jo extends zh {
        get inputs() {
          return Sp(this.componentDef.inputs);
        }
        get outputs() {
          return Sp(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function e0(e) {
              return e.map(JE).join(",");
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, r, o) {
          let i = (o = o || this.ngModule) instanceof un ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new Y0(n, i) : n,
            a = s.get(Wh, null);
          if (null === a) throw new C(407, !1);
          const u = s.get(PE, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function I0(e, n, t) {
                  return e.selectRootElement(n, t === Vt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Au(
                  l,
                  c,
                  (function Z0(e) {
                    const n = e.toLowerCase();
                    return "svg" === n ? "svg" : "math" === n ? "math" : null;
                  })(c)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            f = ul(0, null, null, 1, 0, null, null, null, null, null),
            g = hs(null, f, null, h, null, null, a, l, u, s, null);
          let p, m;
          ru(g);
          try {
            const v = this.componentDef;
            let D,
              y = null;
            v.findHostDirectiveDefs
              ? ((D = []),
                (y = new Map()),
                v.findHostDirectiveDefs(v, D, y),
                D.push(v))
              : (D = [v]);
            const A = (function X0(e, n) {
                const t = e[S],
                  r = ce;
                return (e[r] = n), Pr(t, r, 2, "#host", null);
              })(g, d),
              J = (function J0(e, n, t, r, o, i, s, a) {
                const u = o[S];
                !(function eb(e, n, t, r) {
                  for (const o of e)
                    n.mergedAttrs = wo(n.mergedAttrs, o.hostAttrs);
                  null !== n.mergedAttrs &&
                    (vs(n, n.mergedAttrs, !0), null !== t && _h(r, t, n));
                })(r, e, n, s);
                const l = i.createRenderer(n, t),
                  c = hs(
                    o,
                    pp(t),
                    null,
                    t.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && cl(u, e, r.length - 1),
                  gs(o, c),
                  (o[e.index] = c)
                );
              })(A, d, v, D, g, a, l);
            (m = af(f, ce)),
              d &&
                (function nb(e, n, t, r) {
                  if (r) au(e, t, ["ng-version", FE.full]);
                  else {
                    const { attrs: o, classes: i } = (function t0(e) {
                      const n = [],
                        t = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && n.push(i, e[++r])
                            : 8 === o && t.push(i);
                        else {
                          if (!Rt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    o && au(e, t, o),
                      i && i.length > 0 && Dh(e, t, i.join(" "));
                  }
                })(l, v, d, r),
              void 0 !== t &&
                (function rb(e, n, t) {
                  const r = (e.projection = []);
                  for (let o = 0; o < n.length; o++) {
                    const i = t[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(m, this.ngContentSelectors, t),
              (p = (function tb(e, n, t, r, o, i) {
                const s = ke(),
                  a = o[S],
                  u = ct(s, o);
                vp(a, o, s, t, null, r);
                for (let c = 0; c < t.length; c++)
                  Ue(Gn(o, a, s.directiveStart + c, s), o);
                Dp(a, o, s), u && Ue(u, o);
                const l = Gn(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[me] = o[me] = l), null !== i))
                  for (const c of i) c(l, n);
                return il(a, s, e), l;
              })(J, v, D, y, g, [ob])),
              ol(f, g, null);
          } finally {
            ou();
          }
          return new K0(this.componentType, p, Ar(m, g), g, m);
        }
      }
      class K0 extends ME {
        constructor(n, t, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new Q0(o)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[n])) {
            const i = this._rootLView;
            pl(i[S], i, o, n, t), ms(nt(this._tNode.index, i));
          }
        }
        get injector() {
          return new Dr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function ob() {
        const e = ke();
        Bi(_()[S], e);
      }
      function _s(e) {
        return (
          !!(function ml(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Be(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function Wt(e, n, t, r) {
        const o = _();
        return Be(o, yr(), n) && (X(), zt(de(), o, e, n, t, r)), Wt;
      }
      function kr(e, n, t, r, o, i) {
        const a = (function Zn(e, n, t, r) {
          const o = Be(e, n, t);
          return Be(e, n + 1, r) || o;
        })(
          e,
          (function on() {
            return V.lFrame.bindingIndex;
          })(),
          t,
          o
        );
        return sn(2), a ? n + j(t) + r + j(o) + i : U;
      }
      function B(e, n, t, r, o, i, s, a) {
        const u = _(),
          l = X(),
          c = e + ce,
          d = l.firstCreatePass
            ? (function vb(e, n, t, r, o, i, s, a, u) {
                const l = n.consts,
                  c = Pr(n, e, 4, s || null, bn(l, a));
                ll(n, t, c, bn(l, u)), Bi(n, c);
                const d = (c.tView = ul(
                  2,
                  c,
                  r,
                  o,
                  i,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  l
                ));
                return (
                  null !== n.queries &&
                    (n.queries.template(n, c),
                    (d.queries = n.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, n, t, r, o, i, s)
            : l.data[c];
        Bt(d, !1);
        const h = u[q].createComment("");
        ns(l, u, h, d),
          Ue(h, u),
          gs(u, (u[c] = _p(h, u, h, d))),
          ji(d) && sl(l, u, d),
          null != s && al(u, d, a);
      }
      function M(e, n, t) {
        const r = _();
        return (
          Be(r, yr(), n) &&
            (function ft(e, n, t, r, o, i, s, a) {
              const u = ct(n, t);
              let c,
                l = n.inputs;
              !a && null != l && (c = l[r])
                ? (pl(e, t, c, r, o),
                  Do(n) &&
                    (function A0(e, n) {
                      const t = nt(n, e);
                      16 & t[G] || (t[G] |= 32);
                    })(t, n.index))
                : 3 & n.type &&
                  ((r = (function T0(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, n.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(X(), de(), r, e, n, r[q], t, !1),
          M
        );
      }
      function yl(e, n, t, r, o) {
        const s = o ? "class" : "style";
        pl(e, t, n.inputs[s], s, r);
      }
      function E(e, n, t, r) {
        const o = _(),
          i = X(),
          s = ce + e,
          a = o[q],
          u = i.firstCreatePass
            ? (function _b(e, n, t, r, o, i) {
                const s = n.consts,
                  u = Pr(n, e, 2, r, bn(s, o));
                return (
                  ll(n, t, u, bn(s, i)),
                  null !== u.attrs && vs(u, u.attrs, !1),
                  null !== u.mergedAttrs && vs(u, u.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, u),
                  u
                );
              })(s, i, o, n, t, r)
            : i.data[s],
          l = (o[s] = Au(
            a,
            n,
            (function PC() {
              return V.lFrame.currentNamespace;
            })()
          )),
          c = ji(u);
        return (
          Bt(u, !0),
          _h(a, l, u),
          32 != (32 & u.flags) && ns(i, o, l, u),
          0 ===
            (function yC() {
              return V.lFrame.elementDepthCount;
            })() && Ue(l, o),
          (function vC() {
            V.lFrame.elementDepthCount++;
          })(),
          c && (sl(i, o, u), il(i, u, o)),
          null !== r && al(o, u),
          E
        );
      }
      function w() {
        let e = ke();
        Xa() ? Ja() : ((e = e.parent), Bt(e, !1));
        const n = e;
        !(function DC() {
          V.lFrame.elementDepthCount--;
        })();
        const t = X();
        return (
          t.firstCreatePass && (Bi(t, e), Za(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function LC(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            yl(t, n, _(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function $C(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            yl(t, n, _(), n.stylesWithoutHost, !1),
          w
        );
      }
      function De(e, n, t, r) {
        return E(e, n, t, r), w(), De;
      }
      function Yn(e, n, t) {
        const r = _(),
          o = X(),
          i = e + ce,
          s = o.firstCreatePass
            ? (function Cb(e, n, t, r, o) {
                const i = n.consts,
                  s = bn(i, r),
                  a = Pr(n, e, 8, "ng-container", s);
                return (
                  null !== s && vs(a, s, !0),
                  ll(n, t, a, bn(i, o)),
                  null !== n.queries && n.queries.elementStart(n, a),
                  a
                );
              })(i, o, r, n, t)
            : o.data[i];
        Bt(s, !0);
        const a = (r[i] = r[q].createComment(""));
        return (
          ns(o, r, a, s),
          Ue(a, r),
          ji(s) && (sl(o, r, s), il(o, s, r)),
          null != t && al(r, s),
          Yn
        );
      }
      function Kn() {
        let e = ke();
        const n = X();
        return (
          Xa() ? Ja() : ((e = e.parent), Bt(e, !1)),
          n.firstCreatePass && (Bi(n, e), Za(e) && n.queries.elementEnd(e)),
          Kn
        );
      }
      function He() {
        return _();
      }
      function ws(e) {
        return !!e && "function" == typeof e.then;
      }
      const zp = function Hp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function oe(e, n, t, r) {
        const o = _(),
          i = X(),
          s = ke();
        return (
          (function Wp(e, n, t, r, o, i, s) {
            const a = ji(r),
              l = e.firstCreatePass && wp(e),
              c = n[me],
              d = Cp(n);
            let h = !0;
            if (3 & r.type || s) {
              const p = ct(r, n),
                m = s ? s(p) : p,
                v = d.length,
                D = s ? (A) => s(Oe(A[r.index])) : r.index;
              let y = null;
              if (
                (!s &&
                  a &&
                  (y = (function wb(e, n, t, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === t && o[i + 1] === r) {
                          const a = n[fr],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, n, o, r.index)),
                null !== y)
              )
                ((y.__ngLastListenerFn__ || y).__ngNextListenerFn__ = i),
                  (y.__ngLastListenerFn__ = i),
                  (h = !1);
              else {
                i = Qp(r, n, c, i, !1);
                const A = t.listen(m, o, i);
                d.push(i, A), l && l.push(o, D, v, v + 1);
              }
            } else i = Qp(r, n, c, i, !1);
            const f = r.outputs;
            let g;
            if (h && null !== f && (g = f[o])) {
              const p = g.length;
              if (p)
                for (let m = 0; m < p; m += 2) {
                  const J = n[g[m]][g[m + 1]].subscribe(i),
                    he = d.length;
                  d.push(i, J), l && l.push(o, r.index, he, -(he + 1));
                }
            }
          })(i, o, o[q], s, e, n, r),
          oe
        );
      }
      function qp(e, n, t, r) {
        try {
          return vt(6, n, t), !1 !== t(r);
        } catch (o) {
          return bp(e, o), !1;
        } finally {
          vt(7, n, t);
        }
      }
      function Qp(e, n, t, r, o) {
        return function i(s) {
          if (s === Function) return r;
          ms(e.componentOffset > -1 ? nt(e.index, n) : n);
          let u = qp(n, t, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = qp(n, t, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function $(e = 1) {
        return (function MC(e) {
          return (V.lFrame.contextLView = (function TC(e, n) {
            for (; e > 0; ) (n = n[hr]), e--;
            return n;
          })(e, V.lFrame.contextLView))[me];
        })(e);
      }
      function Es(e, n) {
        return (e << 17) | (n << 2);
      }
      function Mn(e) {
        return (e >> 17) & 32767;
      }
      function Dl(e) {
        return 2 | e;
      }
      function Xn(e) {
        return (131068 & e) >> 2;
      }
      function _l(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function Cl(e) {
        return 1 | e;
      }
      function og(e, n, t, r, o) {
        const i = e[t + 1],
          s = null === n;
        let a = r ? Mn(i) : Xn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          xb(e[a], n) && ((u = !0), (e[a + 1] = r ? Cl(c) : Dl(c))),
            (a = r ? Mn(c) : Xn(c));
        }
        u && (e[t + 1] = r ? Dl(i) : Cl(i));
      }
      function xb(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || "string" != typeof n) && br(e, n) >= 0)
        );
      }
      function wl(e, n) {
        return (
          (function xt(e, n, t, r) {
            const o = _(),
              i = X(),
              s = sn(2);
            i.firstUpdatePass &&
              (function hg(e, n, t, r) {
                const o = e.data;
                if (null === o[t + 1]) {
                  const i = o[Ye()],
                    s = (function fg(e, n) {
                      return n >= e.expandoStartIndex;
                    })(e, t);
                  (function yg(e, n) {
                    return 0 != (e.flags & (n ? 8 : 16));
                  })(i, r) &&
                    null === n &&
                    !s &&
                    (n = !1),
                    (n = (function Vb(e, n, t, r) {
                      const o = (function tu(e) {
                        const n = V.lFrame.currentDirectiveIndex;
                        return -1 === n ? null : e[n];
                      })(e);
                      let i = r ? n.residualClasses : n.residualStyles;
                      if (null === o)
                        0 === (r ? n.classBindings : n.styleBindings) &&
                          ((t = Uo((t = El(null, e, n, t, r)), n.attrs, r)),
                          (i = null));
                      else {
                        const s = n.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((t = El(o, e, n, t, r)), null === i)) {
                            let u = (function Ub(e, n, t) {
                              const r = t ? n.classBindings : n.styleBindings;
                              if (0 !== Xn(r)) return e[Mn(r)];
                            })(e, n, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = El(null, e, n, u[1], r)),
                              (u = Uo(u, n.attrs, r)),
                              (function Bb(e, n, t, r) {
                                e[Mn(t ? n.classBindings : n.styleBindings)] =
                                  r;
                              })(e, n, r, u));
                          } else
                            i = (function Hb(e, n, t) {
                              let r;
                              const o = n.directiveEnd;
                              for (
                                let i = 1 + n.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Uo(r, e[i].hostAttrs, t);
                              return Uo(r, n.attrs, t);
                            })(e, n, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (n.residualClasses = i)
                            : (n.residualStyles = i)),
                        t
                      );
                    })(o, i, n, r)),
                    (function Ab(e, n, t, r, o, i) {
                      let s = i ? n.classBindings : n.styleBindings,
                        a = Mn(s),
                        u = Xn(s);
                      e[r] = t;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(t)
                          ? ((c = t[1]),
                            (null === c || br(t, c) > 0) && (l = !0))
                          : (c = t),
                        o)
                      )
                        if (0 !== u) {
                          const h = Mn(e[a + 1]);
                          (e[r + 1] = Es(h, a)),
                            0 !== h && (e[h + 1] = _l(e[h + 1], r)),
                            (e[a + 1] = (function Mb(e, n) {
                              return (131071 & e) | (n << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Es(a, 0)),
                            0 !== a && (e[a + 1] = _l(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Es(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = _l(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = Dl(e[r + 1])),
                        og(e, c, r, !0),
                        og(e, c, r, !1),
                        (function Rb(e, n, t, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof n &&
                            br(i, n) >= 0 &&
                            (t[r + 1] = Cl(t[r + 1]));
                        })(n, c, e, r, i),
                        (s = Es(a, u)),
                        i ? (n.classBindings = s) : (n.styleBindings = s);
                    })(o, i, n, t, s, r);
                }
              })(i, e, s, r),
              n !== U &&
                Be(o, s, n) &&
                (function gg(e, n, t, r, o, i, s, a) {
                  if (!(3 & n.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function Tb(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? mg(u, n, t, o, Xn(l), s)
                      : void 0;
                  bs(c) ||
                    (bs(i) ||
                      ((function Sb(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = mg(u, null, t, o, a, s))),
                    (function zw(e, n, t, r, o) {
                      if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : rt.DashCase;
                        null == o
                          ? e.removeStyle(t, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= rt.Important)),
                            e.setStyle(t, r, o, i));
                      }
                    })(r, s, Vi(Ye(), t), o, i));
                })(
                  i,
                  i.data[Ye()],
                  o,
                  o[q],
                  e,
                  (o[s + 1] = (function qb(e, n) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof n
                          ? (e += n)
                          : "object" == typeof e && (e = ae(In(e)))),
                      e
                    );
                  })(n, t)),
                  r,
                  s
                );
          })(e, n, null, !0),
          wl
        );
      }
      function El(e, n, t, r, o) {
        let i = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((i = n[a]), (r = Uo(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), r;
      }
      function Uo(e, n, t) {
        const r = t ? 1 : 2;
        let o = -1;
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const s = n[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                dt(e, s, !!t || n[++i]));
          }
        return void 0 === e ? null : e;
      }
      function mg(e, n, t, r, o, i) {
        const s = null === n;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let h = t[o + 1];
          h === U && (h = d ? ee : void 0);
          let f = d ? gu(h, r) : c === r ? h : void 0;
          if ((l && !bs(f) && (f = gu(u, r)), bs(f) && ((a = f), s))) return a;
          const g = e[o + 1];
          o = s ? Mn(g) : Xn(g);
        }
        if (null !== n) {
          let u = i ? n.residualClasses : n.residualStyles;
          null != u && (a = gu(u, r));
        }
        return a;
      }
      function bs(e) {
        return void 0 !== e;
      }
      function H(e, n = "") {
        const t = _(),
          r = X(),
          o = e + ce,
          i = r.firstCreatePass ? Pr(r, o, 1, n, null) : r.data[o],
          s = (t[o] = (function Tu(e, n) {
            return e.createText(n);
          })(t[q], n));
        ns(r, t, s, i), Bt(i, !1);
      }
      function Ct(e) {
        return Jn("", e, ""), Ct;
      }
      function Jn(e, n, t) {
        const r = _(),
          o = (function Or(e, n, t, r) {
            return Be(e, yr(), t) ? n + j(t) + r : U;
          })(r, e, n, t);
        return o !== U && dn(r, Ye(), o), Jn;
      }
      function bl(e, n, t, r, o) {
        const i = _(),
          s = kr(i, e, n, t, r, o);
        return s !== U && dn(i, Ye(), s), bl;
      }
      const Gr = "en-US";
      let $g = Gr;
      class Wr {}
      class cm {}
      class dm extends Wr {
        constructor(n, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ip(this));
          const r = ut(n);
          (this._bootstrapComponents = ln(r.bootstrap)),
            (this._r3Injector = op(
              n,
              t,
              [
                { provide: Wr, useValue: this },
                { provide: ko, useValue: this.componentFactoryResolver },
              ],
              ae(n),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class xl extends cm {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new dm(this.moduleType, n);
        }
      }
      class pS extends Wr {
        constructor(n, t, r) {
          super(),
            (this.componentFactoryResolver = new Ip(this)),
            (this.instance = null);
          const o = new Bh(
            [
              ...n,
              { provide: Wr, useValue: this },
              { provide: ko, useValue: this.componentFactoryResolver },
            ],
            t || ls(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function As(e, n, t = null) {
        return new pS(e, n, t).injector;
      }
      let gS = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t.id)) {
              const r = $h(0, t.type),
                o =
                  r.length > 0
                    ? As([r], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t.id, o);
            }
            return this.cachedInjectors.get(t.id);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "environment",
            factory: () => new e(R(un)),
          })),
          e
        );
      })();
      function fm(e) {
        e.getStandaloneInjector = (n) =>
          n.get(gS).getOrCreateStandaloneInjector(e);
      }
      function qo(e, n, t) {
        const r =
            (function Ze() {
              const e = V.lFrame;
              let n = e.bindingRootIndex;
              return (
                -1 === n &&
                  (n = e.bindingRootIndex = e.tView.bindingStartIndex),
                n
              );
            })() + e,
          o = _();
        return o[r] === U
          ? (function Gt(e, n, t) {
              return (e[n] = t);
            })(o, r, t ? n.call(t) : n())
          : (function Vo(e, n) {
              return e[n];
            })(o, r);
      }
      function Pl(e) {
        return (n) => {
          setTimeout(e, void 0, n);
        };
      }
      const Xe = class VS extends Xt {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, r) {
          let o = n,
            i = t || (() => null),
            s = r;
          if (n && "object" == typeof n) {
            const u = n;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Pl(i)), o && (o = Pl(o)), s && (s = Pl(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return n instanceof gt && n.add(a), a;
        }
      };
      function US() {
        return this._results[Symbol.iterator]();
      }
      class Fl {
        get changes() {
          return this._changes || (this._changes = new Xe());
        }
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = Fl.prototype;
          t[Symbol.iterator] || (t[Symbol.iterator] = US);
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, t) {
          return this._results.reduce(n, t);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, t) {
          const r = this;
          r.dirty = !1;
          const o = (function Dt(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(n);
          (this._changesDetected = !(function QC(e, n, t) {
            if (e.length !== n.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = n[r];
              if ((t && ((o = t(o)), (i = t(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, t)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let fn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = zS), e;
      })();
      const BS = fn,
        HS = class extends BS {
          constructor(n, t, r) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          createEmbeddedView(n, t) {
            const r = this._declarationTContainer.tView,
              o = hs(
                this._declarationLView,
                r,
                n,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                t || null
              );
            o[yo] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Ut];
            return (
              null !== s && (o[Ut] = s.createEmbeddedView(r)),
              ol(r, o, n),
              new $o(o)
            );
          }
        };
      function zS() {
        return Rs(ke(), _());
      }
      function Rs(e, n) {
        return 4 & e.type ? new HS(n, e, Ar(e, n)) : null;
      }
      let Pt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = GS), e;
      })();
      function GS() {
        return Sm(ke(), _());
      }
      const WS = Pt,
        bm = class extends WS {
          constructor(n, t, r) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return Ar(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Dr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = cu(this._hostTNode, this._hostLView);
            if (If(n)) {
              const t = Wi(n, this._hostLView),
                r = Gi(n);
              return new Dr(t[S].data[r + 8], t);
            }
            return new Dr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = Im(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - Qe;
          }
          createEmbeddedView(n, t, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = n.createEmbeddedView(t || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(n, t, r, o, i) {
            const s =
              n &&
              !(function bo(e) {
                return "function" == typeof e;
              })(n);
            let a;
            if (s) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? n : new jo(re(n)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const h = (s ? l : this.parentInjector).get(un, null);
              h && (i = h);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(n, t) {
            const r = n._lView,
              o = r[S];
            if (
              (function mC(e) {
                return Tt(e[pe]);
              })(r)
            ) {
              const c = this.indexOf(n);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[pe],
                  h = new bm(d, d[je], d[pe]);
                h.detach(h.indexOf(n));
              }
            }
            const i = this._adjustIndex(t),
              s = this._lContainer;
            !(function kw(e, n, t, r) {
              const o = Qe + r,
                i = t.length;
              r > 0 && (t[o - 1][Mt] = n),
                r < i - Qe
                  ? ((n[Mt] = t[o]), $f(t, Qe + r, n))
                  : (t.push(n), (n[Mt] = null)),
                (n[pe] = t);
              const s = n[yo];
              null !== s &&
                t !== s &&
                (function Lw(e, n) {
                  const t = e[gr];
                  n[Ve] !== n[pe][pe][Ve] && (e[Kd] = !0),
                    null === t ? (e[gr] = [n]) : t.push(n);
                })(s, n);
              const a = n[Ut];
              null !== a && a.insertView(e), (n[G] |= 64);
            })(o, r, s, i);
            const a = Pu(i, s),
              u = r[q],
              l = ts(u, s[Li]);
            return (
              null !== l &&
                (function Pw(e, n, t, r, o, i) {
                  (r[rn] = o), (r[je] = n), No(e, r, t, 1, o, i);
                })(o, s[je], u, r, l, a),
              n.attachToViewContainerRef(),
              $f(Ol(s), i, n),
              n
            );
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = Im(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              r = Ru(this._lContainer, t);
            r && (Ki(Ol(this._lContainer), t), uh(r[S], r));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              r = Ru(this._lContainer, t);
            return r && null != Ki(Ol(this._lContainer), t) ? new $o(r) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function Im(e) {
        return e[$i];
      }
      function Ol(e) {
        return e[$i] || (e[$i] = []);
      }
      function Sm(e, n) {
        let t;
        const r = n[e.index];
        if (Tt(r)) t = r;
        else {
          let o;
          if (8 & e.type) o = Oe(r);
          else {
            const i = n[q];
            o = i.createComment("");
            const s = ct(e, n);
            qn(
              i,
              ts(i, s),
              o,
              (function Uw(e, n) {
                return e.nextSibling(n);
              })(i, s),
              !1
            );
          }
          (n[e.index] = t = _p(r, n, o, e)), gs(n, t);
        }
        return new bm(t, e, n);
      }
      class kl {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new kl(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Ll {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const t = n.queries;
          if (null !== t) {
            const r =
                null !== n.contentQueries ? n.contentQueries[0] : t.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = t.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Ll(o);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== Nm(n, t).matches && this.queries[t].setDirty();
        }
      }
      class Mm {
        constructor(n, t, r = null) {
          (this.predicate = n), (this.flags = t), (this.read = r);
        }
      }
      class $l {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(n, t);
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(n);
        }
        embeddedTView(n) {
          let t = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== t ? t.length : 0,
              i = this.getByIndex(r).embeddedTView(n, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== t ? t.push(i) : (t = [i]));
          }
          return null !== t ? new $l(t) : null;
        }
        template(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(n, t);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class jl {
        constructor(n, t = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index &&
            (this._appliesToNextNode = !1);
        }
        template(n, t) {
          this.elementStart(n, t);
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-n.index, t),
              new jl(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let r = n.parent;
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
            return t === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, t) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(n, t, qS(t, i)),
                this.matchTNodeWithReadOption(n, t, Zi(t, n, i, !1, !1));
            }
          else
            r === fn
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, Zi(t, n, r, !1, !1));
        }
        matchTNodeWithReadOption(n, t, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Sn || o === Pt || (o === fn && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const i = Zi(t, n, o, !1, !1);
                null !== i && this.addMatch(t.index, i);
              }
            else this.addMatch(t.index, r);
          }
        }
        addMatch(n, t) {
          null === this.matches
            ? (this.matches = [n, t])
            : this.matches.push(n, t);
        }
      }
      function qS(e, n) {
        const t = e.localNames;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === n) return t[r + 1];
        return null;
      }
      function ZS(e, n, t, r) {
        return -1 === t
          ? (function QS(e, n) {
              return 11 & e.type ? Ar(e, n) : 4 & e.type ? Rs(e, n) : null;
            })(n, e)
          : -2 === t
          ? (function YS(e, n, t) {
              return t === Sn
                ? Ar(n, e)
                : t === fn
                ? Rs(n, e)
                : t === Pt
                ? Sm(n, e)
                : void 0;
            })(e, n, r)
          : Gn(e, e[S], t, n);
      }
      function Tm(e, n, t, r) {
        const o = n[Ut].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = t.matches,
            a = [];
          for (let u = 0; u < s.length; u += 2) {
            const l = s[u];
            a.push(l < 0 ? null : ZS(n, i[l], s[u + 1], t.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Vl(e, n, t, r) {
        const o = e.queries.getByIndex(t),
          i = o.matches;
        if (null !== i) {
          const s = Tm(e, n, o, t);
          for (let a = 0; a < i.length; a += 2) {
            const u = i[a];
            if (u > 0) r.push(s[a / 2]);
            else {
              const l = i[a + 1],
                c = n[-u];
              for (let d = Qe; d < c.length; d++) {
                const h = c[d];
                h[yo] === h[pe] && Vl(h[S], h, l, r);
              }
              if (null !== c[gr]) {
                const d = c[gr];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  Vl(f[S], f, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function hn(e) {
        const n = _(),
          t = X(),
          r = gf();
        nu(r + 1);
        const o = Nm(t, r);
        if (
          e.dirty &&
          (function gC(e) {
            return 4 == (4 & e[G]);
          })(n) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? Vl(t, n, r, []) : Tm(t, n, o, r);
            e.reset(i, xE), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Tn(e, n, t) {
        const r = X();
        r.firstCreatePass &&
          ((function xm(e, n, t) {
            null === e.queries && (e.queries = new $l()),
              e.queries.track(new jl(n, t));
          })(r, new Mm(e, n, t), -1),
          2 == (2 & n) && (r.staticViewQueries = !0)),
          (function Rm(e, n, t) {
            const r = new Fl(4 == (4 & t));
            gp(e, n, r, r.destroy),
              null === n[Ut] && (n[Ut] = new Ll()),
              n[Ut].queries.push(new kl(r));
          })(r, _(), n);
      }
      function pn() {
        return (function KS(e, n) {
          return e[Ut].queries[n].queryList;
        })(_(), gf());
      }
      function Nm(e, n) {
        return e.queries.getByIndex(n);
      }
      function Ns(...e) {}
      const Ps = new k("Application Initializer");
      let Fs = (() => {
        class e {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = Ns),
              (this.reject = Ns),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ws(i)) t.push(i);
                else if (zp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  t.push(s);
                }
              }
            Promise.all(t)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === t.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(Ps, 8));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ko = new k("AppId", {
        providedIn: "root",
        factory: function Ym() {
          return `${Wl()}${Wl()}${Wl()}`;
        },
      });
      function Wl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Km = new k("Platform Initializer"),
        Xm = new k("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let D1 = (() => {
        class e {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const gn = new k("LocaleId", {
        providedIn: "root",
        factory: () =>
          K(gn, O.Optional | O.SkipSelf) ||
          (function _1() {
            return (typeof $localize < "u" && $localize.locale) || Gr;
          })(),
      });
      class w1 {
        constructor(n, t) {
          (this.ngModuleFactory = n), (this.componentFactories = t);
        }
      }
      let Jm = (() => {
        class e {
          compileModuleSync(t) {
            return new xl(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              i = ln(ut(t).declarations).reduce((s, a) => {
                const u = re(a);
                return u && s.push(new jo(u)), s;
              }, []);
            return new w1(r, i);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const I1 = (() => Promise.resolve(0))();
      function ql(e) {
        typeof Zone > "u"
          ? I1.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class _e {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Xe(!1)),
            (this.onMicrotaskEmpty = new Xe(!1)),
            (this.onStable = new Xe(!1)),
            (this.onError = new Xe(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && t),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function S1() {
              let e = le.requestAnimationFrame,
                n = le.cancelAnimationFrame;
              if (typeof Zone < "u" && e && n) {
                const t = e[Zone.__symbol__("OriginalDelegate")];
                t && (e = t);
                const r = n[Zone.__symbol__("OriginalDelegate")];
                r && (n = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function A1(e) {
              const n = () => {
                !(function T1(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(le, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Zl(e),
                                (e.isCheckStableRunning = !0),
                                Ql(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Zl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, o, i, s, a) => {
                  try {
                    return ny(e), t.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      ry(e);
                  }
                },
                onInvoke: (t, r, o, i, s, a, u) => {
                  try {
                    return ny(e), t.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), ry(e);
                  }
                },
                onHasTask: (t, r, o, i) => {
                  t.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Zl(e),
                          Ql(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (t, r, o, i) => (
                  t.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!_e.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (_e.isInAngularZone()) throw new C(909, !1);
        }
        run(n, t, r) {
          return this._inner.run(n, t, r);
        }
        runTask(n, t, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, n, M1, Ns, Ns);
          try {
            return i.runTask(s, t, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(n, t, r) {
          return this._inner.runGuarded(n, t, r);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const M1 = {};
      function Ql(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Zl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function ny(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function ry(e) {
        e._nesting--, Ql(e);
      }
      class R1 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Xe()),
            (this.onMicrotaskEmpty = new Xe()),
            (this.onStable = new Xe()),
            (this.onError = new Xe());
        }
        run(n, t, r) {
          return n.apply(t, r);
        }
        runGuarded(n, t, r) {
          return n.apply(t, r);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, r, o) {
          return n.apply(t, r);
        }
      }
      const oy = new k(""),
        Os = new k("");
      let Xl,
        Yl = (() => {
          class e {
            constructor(t, r, o) {
              (this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Xl ||
                  ((function x1(e) {
                    Xl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      _e.assertNotInAngularZone(),
                        ql(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ql(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: o });
            }
            whenStable(t, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(_e), R(Kl), R(Os));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Kl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return Xl?.findTestabilityInTree(this, t, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const mn = !1;
      let An = null;
      const iy = new k("AllowMultipleToken"),
        Jl = new k("PlatformDestroyListeners"),
        sy = new k("appBootstrapListener");
      class ay {
        constructor(n, t) {
          (this.name = n), (this.token = t);
        }
      }
      function ly(e, n, t = []) {
        const r = `Platform: ${n}`,
          o = new k(r);
        return (i = []) => {
          let s = ec();
          if (!s || s.injector.get(iy, !1)) {
            const a = [...t, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function F1(e) {
                  if (An && !An.get(iy, !1)) throw new C(400, !1);
                  An = e;
                  const n = e.get(dy);
                  (function uy(e) {
                    const n = e.get(Km, null);
                    n && n.forEach((t) => t());
                  })(e);
                })(
                  (function cy(e = [], n) {
                    return cn.create({
                      name: n,
                      providers: [
                        { provide: Wu, useValue: "platform" },
                        { provide: Jl, useValue: new Set([() => (An = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function k1(e) {
            const n = ec();
            if (!n) throw new C(401, !1);
            return n;
          })();
        };
      }
      function ec() {
        return An?.get(dy) ?? null;
      }
      let dy = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const o = (function hy(e, n) {
                let t;
                return (
                  (t =
                    "noop" === e
                      ? new R1()
                      : ("zone.js" === e ? void 0 : e) || new _e(n)),
                  t
                );
              })(
                r?.ngZone,
                (function fy(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: _e, useValue: o }];
            return o.run(() => {
              const s = cn.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                a = t.create(s),
                u = a.injector.get(Rr, null);
              if (!u) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Ls(this._modules, a), l.unsubscribe();
                  });
                }),
                (function py(e, n, t) {
                  try {
                    const r = t();
                    return ws(r)
                      ? r.catch((o) => {
                          throw (
                            (n.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (n.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(Fs);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function jg(e) {
                          mt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              ($g = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(gn, Gr) || Gr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const o = gy({}, r);
            return (function N1(e, n, t) {
              const r = new xl(t);
              return Promise.resolve(r);
            })(0, 0, t).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(ks);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!t.instance.ngDoBootstrap) throw new C(-403, !1);
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const t = this._injector.get(Jl, null);
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(cn));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function gy(e, n) {
        return Array.isArray(n) ? n.reduce(gy, e) : { ...e, ...n };
      }
      let ks = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(t, r, o) {
            (this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new Se((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Se((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    _e.assertNotInAngularZone(),
                      ql(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  _e.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function O_(...e) {
              const n = co(e),
                t = (function T_(e, n) {
                  return "number" == typeof Fa(e) ? e.pop() : n;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? St(r[0])
                  : lr(t)(Me(r, n))
                : $t;
            })(
              i,
              s.pipe(
                (function k_(e = {}) {
                  const {
                    connector: n = () => new Xt(),
                    resetOnError: t = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const h = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      f = () => {
                        h(), (s = u = void 0), (c = d = !1);
                      },
                      g = () => {
                        const p = s;
                        f(), p?.unsubscribe();
                      };
                    return xe((p, m) => {
                      l++, !d && !c && h();
                      const v = (u = u ?? n());
                      m.add(() => {
                        l--, 0 === l && !d && !c && (a = Oa(g, o));
                      }),
                        v.subscribe(m),
                        !s &&
                          l > 0 &&
                          ((s = new lo({
                            next: (D) => v.next(D),
                            error: (D) => {
                              (d = !0), h(), (a = Oa(f, t, D)), v.error(D);
                            },
                            complete: () => {
                              (c = !0), h(), (a = Oa(f, r)), v.complete();
                            },
                          })),
                          St(p).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(t, r) {
            const o = t instanceof zh;
            if (!this._injector.get(Fs).done) {
              !o &&
                (function dr(e) {
                  const n = re(e) || $e(e) || tt(e);
                  return null !== n && n.standalone;
                })(t);
              throw new C(405, mn);
            }
            let s;
            (s = o ? t : this._injector.get(ko).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function P1(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Wr),
              l = s.create(cn.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(oy, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Ls(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            Ls(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const r = this._injector.get(sy, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => Ls(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(_e), R(un), R(Rr));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Ls(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      let tc = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $1), e;
      })();
      function $1(e) {
        return (function j1(e, n, t) {
          if (Do(e) && !t) {
            const r = nt(e.index, n);
            return new $o(r, r);
          }
          return 47 & e.type ? new $o(n[Ve], n) : null;
        })(ke(), _(), 16 == (16 & e));
      }
      class _y {
        constructor() {}
        supports(n) {
          return _s(n);
        }
        create(n) {
          return new G1(n);
        }
      }
      const z1 = (e, n) => n;
      class G1 {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || z1);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; t || r; ) {
            const s = !r || (t && t.currentIndex < wy(r, o, i)) ? t : r,
              a = wy(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let h = 0; h < l; h++) {
                  const f = h < i.length ? i[h] : (i[h] = 0),
                    g = f + h;
                  c <= g && g < l && (i[h] = f + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && n(s, a, u);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !_s(n))) throw new C(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let o,
            i,
            s,
            t = this._itHead,
            r = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (i = n[a]),
                (s = this._trackByFn(a, i)),
                null !== t && Object.is(t.trackById, s)
                  ? (r && (t = this._verifyReinsertion(t, i, s, a)),
                    Object.is(t.item, i) || this._addIdentityChange(t, i))
                  : ((t = this._mismatch(t, i, s, a)), (r = !0)),
                (t = t._next);
          } else
            (o = 0),
              (function gb(e, n) {
                if (Array.isArray(e))
                  for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let r;
                  for (; !(r = t.next()).done; ) n(r.value);
                }
              })(n, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (r && (t = this._verifyReinsertion(t, a, s, o)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, o)), (r = !0)),
                  (t = t._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, r, o) {
          let i;
          return (
            null === n ? (i = this._itTail) : ((i = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, i, o))
              : null !==
                (n =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, i, o))
              : (n = this._addAfter(new W1(t, r), i, o)),
            n
          );
        }
        _verifyReinsertion(n, t, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (n = this._reinsertAfter(i, n._prev, o))
              : n.currentIndex != o &&
                ((n.currentIndex = o), this._addToMoves(n, o)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const o = n._prevRemoved,
            i = n._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _moveAfter(n, t, r) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _addAfter(n, t, r) {
          return (
            this._insertAfter(n, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, r) {
          const o = null === t ? this._itHead : t._next;
          return (
            (n._next = o),
            (n._prev = t),
            null === o ? (this._itTail = n) : (o._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new Cy()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            r = n._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Cy()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class W1 {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class q1 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, n)
            )
              return r;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            r = n._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class Cy {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let r = this.map.get(t);
          r || ((r = new q1()), this.map.set(t, r)), r.add(n);
        }
        get(n, t) {
          const o = this.map.get(n);
          return o ? o.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function wy(e, n, t) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return t && r < t.length && (o = t[r]), r + n + o;
      }
      function by() {
        return new Vs([new _y()]);
      }
      let Vs = (() => {
        class e {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || by()),
              deps: [[e, new Mo(), new So()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = F({ token: e, providedIn: "root", factory: by })), e;
      })();
      const X1 = ly(null, "core", []);
      let J1 = (() => {
        class e {
          constructor(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(ks));
          }),
          (e.ɵmod = Vn({ type: e })),
          (e.ɵinj = wn({})),
          e
        );
      })();
      function sc(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      /**
       * @license Angular v15.2.10
       * (c) 2010-2022 Google LLC. https://angular.io/
       * License: MIT
       */
      let ac = null;
      function nr() {
        return ac;
      }
      class nM {}
      const it = new k("DocumentToken");
      let uc = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function rM() {
                return R(Sy);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const oM = new k("Location Initialized");
      let Sy = (() => {
        class e extends uc {
          constructor(t) {
            super(),
              (this._doc = t),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return nr().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = nr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = nr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(t) {
            this._location.pathname = t;
          }
          pushState(t, r, o) {
            My() ? this._history.pushState(t, r, o) : (this._location.hash = o);
          }
          replaceState(t, r, o) {
            My()
              ? this._history.replaceState(t, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(it));
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return (function iM() {
                return new Sy(R(it));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function My() {
        return !!window.history.pushState;
      }
      function lc(e, n) {
        if (0 == e.length) return n;
        if (0 == n.length) return e;
        let t = 0;
        return (
          e.endsWith("/") && t++,
          n.startsWith("/") && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
        );
      }
      function Ty(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length;
        return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t);
      }
      function yn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let rr = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return K(Ry);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Ay = new k("appBaseHref");
      let Ry = (() => {
          class e extends rr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  K(it).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return lc(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  yn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && t ? `${r}${o}` : r;
            }
            pushState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + yn(i));
              this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + yn(i));
              this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(uc), R(Ay, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        sM = (() => {
          class e extends rr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = lc(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(uc), R(Ay, 8));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        cc = (() => {
          class e {
            constructor(t) {
              (this._subject = new Xe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function lM(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/);
                  return t;
                }
                return e;
              })(Ty(xy(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + yn(r));
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function uM(e, n) {
                  if (!e || !n.startsWith(e)) return n;
                  const t = n.substring(e.length);
                  return "" === t || ["/", ";", "?", "#"].includes(t[0])
                    ? t
                    : n;
                })(this._basePath, xy(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", o = null) {
              this._locationStrategy.pushState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + yn(r)),
                  o
                );
            }
            replaceState(t, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + yn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((o) => o(t, r));
            }
            subscribe(t, r, o) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = yn),
            (e.joinWithSlash = lc),
            (e.stripTrailingSlash = Ty),
            (e.ɵfac = function (t) {
              return new (t || e)(R(rr));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return (function aM() {
                  return new cc(R(rr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function xy(e) {
        return e.replace(/\/index.html$/, "");
      }
      class ZM {
        constructor(n, t, r, o) {
          (this.$implicit = n),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let ti = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, r, o) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer;
            t.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new ZM(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), Hy(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((o) => {
              Hy(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(T(Pt), T(fn), T(Vs));
          }),
          (e.ɵdir = qe({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function Hy(e, n) {
        e.context.$implicit = n.item;
      }
      let ni = (() => {
        class e {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new KM()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            zy("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            zy("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(T(Pt), T(fn));
          }),
          (e.ɵdir = qe({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class KM {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function zy(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ae(n)}'.`
          );
      }
      class Cc {
        constructor(n, t) {
          (this._viewContainerRef = n),
            (this._templateRef = t),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(n) {
          n && !this._created
            ? this.create()
            : !n && this._created && this.destroy();
        }
      }
      let Ys = (() => {
          class e {
            constructor() {
              (this._defaultViews = []),
                (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(t) {
              (this._ngSwitch = t),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(t) {
              this._defaultViews.push(t);
            }
            _matchCase(t) {
              const r = t == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              );
            }
            _updateDefaultCases(t) {
              if (this._defaultViews.length > 0 && t !== this._defaultUsed) {
                this._defaultUsed = t;
                for (const r of this._defaultViews) r.enforceState(t);
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵdir = qe({
              type: e,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
              standalone: !0,
            })),
            e
          );
        })(),
        Gy = (() => {
          class e {
            constructor(t, r, o) {
              (this.ngSwitch = o), o._addCase(), (this._view = new Cc(t, r));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(T(Pt), T(fn), T(Ys, 9));
            }),
            (e.ɵdir = qe({
              type: e,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
              standalone: !0,
            })),
            e
          );
        })(),
        Wy = (() => {
          class e {
            constructor(t, r, o) {
              o._addDefault(new Cc(t, r));
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(T(Pt), T(fn), T(Ys, 9));
            }),
            (e.ɵdir = qe({
              type: e,
              selectors: [["", "ngSwitchDefault", ""]],
              standalone: !0,
            })),
            e
          );
        })(),
        _T = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = Vn({ type: e })),
            (e.ɵinj = wn({})),
            e
          );
        })();
      let bT = (() => {
        class e {}
        return (
          (e.ɵprov = F({
            token: e,
            providedIn: "root",
            factory: () => new IT(R(it), window),
          })),
          e
        );
      })();
      class IT {
        constructor(n, t) {
          (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const t = (function ST(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0];
            if (t) return t;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, n);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(n) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = n);
          }
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            o = t.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const n =
              Yy(this.window.history) ||
              Yy(Object.getPrototypeOf(this.window.history));
            return !(!n || (!n.writable && !n.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Yy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      /**
       * @license Angular v15.2.10
       * (c) 2010-2022 Google LLC. https://angular.io/
       * License: MIT
       */
      class eA extends nM {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Sc extends eA {
        static makeCurrent() {
          !(function tM(e) {
            ac || (ac = e);
          })(new Sc());
        }
        onAndCancel(n, t, r) {
          return (
            n.addEventListener(t, r, !1),
            () => {
              n.removeEventListener(t, r, !1);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return "window" === t
            ? window
            : "document" === t
            ? n
            : "body" === t
            ? n.body
            : null;
        }
        getBaseHref(n) {
          const t = (function tA() {
            return (
              (oi = oi || document.querySelector("base")),
              oi ? oi.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function nA(e) {
                (Js = Js || document.createElement("a")),
                  Js.setAttribute("href", e);
                const n = Js.pathname;
                return "/" === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          oi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return (function WM(e, n) {
            n = encodeURIComponent(n);
            for (const t of e.split(";")) {
              const r = t.indexOf("="),
                [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
              if (o.trim() === n) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, n);
        }
      }
      let Js,
        oi = null;
      const tv = new k("TRANSITION_ID"),
        oA = [
          {
            provide: Ps,
            useFactory: function rA(e, n, t) {
              return () => {
                t.get(Fs).donePromise.then(() => {
                  const r = nr(),
                    o = n.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [tv, it, cn],
            multi: !0,
          },
        ];
      let sA = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ea = new k("EventManagerPlugins");
      let ta = (() => {
        class e {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, o) {
            return this._findPluginFor(r).addEventListener(t, r, o);
          }
          addGlobalEventListener(t, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const r = this._eventNameToPlugin.get(t);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(ea), R(_e));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class nv {
        constructor(n) {
          this._doc = n;
        }
        addGlobalEventListener(n, t, r) {
          const o = nr().getGlobalEventTarget(this._doc, n);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${t}`);
          return this.addEventListener(o, t, r);
        }
      }
      let rv = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(t) {
              for (const r of t)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(t) {
              for (const r of t)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(t) {}
            onStyleAdded(t) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(t, r) {
              const o = this.usageCount;
              let i = o.get(t) ?? 0;
              return (i += r), i > 0 ? o.set(t, i) : o.delete(t), i;
            }
            ngOnDestroy() {
              for (const t of this.getAllStyles()) this.onStyleRemoved(t);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ii = (() => {
          class e extends rv {
            constructor(t) {
              super(),
                (this.doc = t),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(t) {
              for (const r of this.hostNodes) this.addStyleToHost(r, t);
            }
            onStyleRemoved(t) {
              const r = this.styleRef;
              r.get(t)?.forEach((i) => i.remove()), r.delete(t);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(t) {
              this.hostNodes.add(t);
              for (const r of this.getAllStyles()) this.addStyleToHost(t, r);
            }
            removeHost(t) {
              this.hostNodes.delete(t);
            }
            addStyleToHost(t, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), t.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const t = this.hostNodes;
              t.clear(), t.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(it));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Mc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Tc = /%COMP%/g,
        sv = new k("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function av(e, n) {
        return n.flat(100).map((t) => t.replace(Tc, e));
      }
      function uv(e) {
        return (n) => {
          if ("__ngUnwrap__" === n) return e;
          !1 === e(n) && (n.preventDefault(), (n.returnValue = !1));
        };
      }
      let Ac = (() => {
        class e {
          constructor(t, r, o, i) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Rc(t));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(t, r);
            return (
              o instanceof dv
                ? o.applyToHost(t)
                : o instanceof xc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(t, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case Vt.Emulated:
                  i = new dv(s, a, r, this.appId, u);
                  break;
                case Vt.ShadowDom:
                  return new hA(s, a, t, r);
                default:
                  i = new xc(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(ta), R(ii), R(Ko), R(sv));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Rc {
        constructor(n) {
          (this.eventManager = n),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? document.createElementNS(Mc[t] || t, n)
            : document.createElement(n);
        }
        createComment(n) {
          return document.createComment(n);
        }
        createText(n) {
          return document.createTextNode(n);
        }
        appendChild(n, t) {
          (cv(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, r) {
          n && (cv(n) ? n.content : n).insertBefore(t, r);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let r = "string" == typeof n ? document.querySelector(n) : n;
          if (!r)
            throw new Error(`The selector "${n}" did not match any elements`);
          return t || (r.textContent = ""), r;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, r, o) {
          if (o) {
            t = o + ":" + t;
            const i = Mc[o];
            i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r);
          } else n.setAttribute(t, r);
        }
        removeAttribute(n, t, r) {
          if (r) {
            const o = Mc[r];
            o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, r, o) {
          o & (rt.DashCase | rt.Important)
            ? n.style.setProperty(t, r, o & rt.Important ? "important" : "")
            : (n.style[t] = r);
        }
        removeStyle(n, t, r) {
          r & rt.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
        }
        setProperty(n, t, r) {
          n[t] = r;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, r) {
          return "string" == typeof n
            ? this.eventManager.addGlobalEventListener(n, t, uv(r))
            : this.eventManager.addEventListener(n, t, uv(r));
        }
      }
      function cv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class hA extends Rc {
        constructor(n, t, r, o) {
          super(n),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = av(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class xc extends Rc {
        constructor(n, t, r, o, i = r.id) {
          super(n),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = av(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class dv extends xc {
        constructor(n, t, r, o, i) {
          const s = o + "-" + r.id;
          super(n, t, r, i, s),
            (this.contentAttr = (function cA(e) {
              return "_ngcontent-%COMP%".replace(Tc, e);
            })(s)),
            (this.hostAttr = (function dA(e) {
              return "_nghost-%COMP%".replace(Tc, e);
            })(s));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
        }
        createElement(n, t) {
          const r = super.createElement(n, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let pA = (() => {
        class e extends nv {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, o) {
            return (
              t.addEventListener(r, o, !1),
              () => this.removeEventListener(t, r, o)
            );
          }
          removeEventListener(t, r, o) {
            return t.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(it));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fv = ["alt", "control", "meta", "shift"],
        gA = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        mA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let yA = (() => {
        class e extends nv {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => nr().onAndCancel(t, i.domEventName, s));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              fv.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(t, r) {
            let o = gA[t.key] || t.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = t.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                fv.forEach((s) => {
                  s !== o && (0, mA[s])(t) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(t, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(it));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const CA = ly(X1, "browser", [
          { provide: Xm, useValue: "browser" },
          {
            provide: Km,
            useValue: function vA() {
              Sc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: it,
            useFactory: function _A() {
              return (
                (function Zw(e) {
                  Lu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        gv = new k(""),
        mv = [
          {
            provide: Os,
            useClass: class iA {
              addToWindow(n) {
                (le.getAngularTestability = (r, o = !0) => {
                  const i = n.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (le.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (le.getAllAngularRootElements = () => n.getAllRootElements()),
                  le.frameworkStabilizers || (le.frameworkStabilizers = []),
                  le.frameworkStabilizers.push((r) => {
                    const o = le.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, r) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (r
                        ? nr().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: oy, useClass: Yl, deps: [_e, Kl, Os] },
          { provide: Yl, useClass: Yl, deps: [_e, Kl, Os] },
        ],
        yv = [
          { provide: Wu, useValue: "root" },
          {
            provide: Rr,
            useFactory: function DA() {
              return new Rr();
            },
            deps: [],
          },
          { provide: ea, useClass: pA, multi: !0, deps: [it, _e, Xm] },
          { provide: ea, useClass: yA, multi: !0, deps: [it] },
          { provide: Ac, useClass: Ac, deps: [ta, ii, Ko, sv] },
          { provide: Wh, useExisting: Ac },
          { provide: rv, useExisting: ii },
          { provide: ii, useClass: ii, deps: [it] },
          { provide: ta, useClass: ta, deps: [ea, _e] },
          { provide: class MT {}, useClass: sA, deps: [] },
          [],
        ];
      let wA = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ko, useValue: t.appId },
                  { provide: tv, useExisting: Ko },
                  oA,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(gv, 12));
            }),
            (e.ɵmod = Vn({ type: e })),
            (e.ɵinj = wn({ providers: [...yv, ...mv], imports: [_T, J1] })),
            e
          );
        })(),
        vv = (() => {
          class e {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || "";
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(it));
            }),
            (e.ɵprov = F({
              token: e,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function bA() {
                        return new vv(R(it));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function N(...e) {
        return Me(e, co(e));
      }
      typeof window < "u" && window;
      class Lt extends Xt {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: r } = this;
          if (n) throw t;
          return this._throwIfClosed(), r;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      const na = ao(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: RA } = Array,
        { getPrototypeOf: xA, prototype: NA, keys: PA } = Object;
      const { isArray: kA } = Array;
      function Cv(...e) {
        const n = co(e),
          t = (function M_(e) {
            return se(Fa(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function FA(e) {
            if (1 === e.length) {
              const n = e[0];
              if (RA(n)) return { args: n, keys: null };
              if (
                (function OA(e) {
                  return e && "object" == typeof e && xA(e) === NA;
                })(n)
              ) {
                const t = PA(n);
                return { args: t.map((r) => n[r]), keys: t };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Me([], n);
        const i = new Se(
          (function VA(e, n, t = jn) {
            return (r) => {
              wv(
                n,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    wv(
                      n,
                      () => {
                        const l = Me(e[u], n);
                        let c = !1;
                        l.subscribe(
                          Ne(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(t(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            n,
            o
              ? (s) =>
                  (function jA(e, n) {
                    return e.reduce((t, r, o) => ((t[r] = n[o]), t), {});
                  })(o, s)
              : jn
          )
        );
        return t
          ? i.pipe(
              (function $A(e) {
                return Y((n) =>
                  (function LA(e, n) {
                    return kA(n) ? e(...n) : e(n);
                  })(e, n)
                );
              })(t)
            )
          : i;
      }
      function wv(e, n, t) {
        e ? Jt(t, e, n) : n();
      }
      function Fc(...e) {
        return (function UA() {
          return lr(1);
        })()(Me(e, co(e)));
      }
      function Ev(e) {
        return new Se((n) => {
          St(e()).subscribe(n);
        });
      }
      function si(e, n) {
        const t = se(e) ? e : () => e,
          r = (o) => o.error(t());
        return new Se(n ? (o) => n.schedule(r, 0, o) : r);
      }
      function Oc() {
        return xe((e, n) => {
          let t = null;
          e._refCount++;
          const r = Ne(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null);
            const o = e._connection,
              i = t;
            (t = null),
              o && (!i || o === i) && o.unsubscribe(),
              n.unsubscribe();
          });
          e.subscribe(r), r.closed || (t = e.connect());
        });
      }
      class bv extends Se {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            _d(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), n?.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new gt();
            const t = this.getSubject();
            n.add(
              this.source.subscribe(
                Ne(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (r) => {
                    this._teardown(), t.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = gt.EMPTY));
          }
          return n;
        }
        refCount() {
          return Oc()(this);
        }
      }
      function Zt(e, n) {
        return xe((t, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          t.subscribe(
            Ne(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                St(e(u, c)).subscribe(
                  (o = Ne(
                    r,
                    (d) => r.next(n ? n(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Zr(e) {
        return e <= 0
          ? () => $t
          : xe((n, t) => {
              let r = 0;
              n.subscribe(
                Ne(t, (o) => {
                  ++r <= e && (t.next(o), e <= r && t.complete());
                })
              );
            });
      }
      function xn(e, n) {
        return xe((t, r) => {
          let o = 0;
          t.subscribe(Ne(r, (i) => e.call(n, i, o++) && r.next(i)));
        });
      }
      function ra(e) {
        return xe((n, t) => {
          let r = !1;
          n.subscribe(
            Ne(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => {
                r || t.next(e), t.complete();
              }
            )
          );
        });
      }
      function Iv(e = HA) {
        return xe((n, t) => {
          let r = !1;
          n.subscribe(
            Ne(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => (r ? t.complete() : t.error(e()))
            )
          );
        });
      }
      function HA() {
        return new na();
      }
      function Nn(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? xn((o, i) => e(o, i, r)) : jn,
            Zr(1),
            t ? ra(n) : Iv(() => new na())
          );
      }
      function or(e, n) {
        return se(n) ? Fe(e, n, 1) : Fe(e, 1);
      }
      function ze(e, n, t) {
        const r = se(e) || n || t ? { next: e, error: n, complete: t } : e;
        return r
          ? xe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Ne(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : jn;
      }
      function Pn(e) {
        return xe((n, t) => {
          let i,
            r = null,
            o = !1;
          (r = n.subscribe(
            Ne(t, void 0, void 0, (s) => {
              (i = St(e(s, Pn(e)(n)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(t)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(t));
        });
      }
      function Sv(e, n) {
        return xe(
          (function zA(e, n, t, r, o) {
            return (i, s) => {
              let a = t,
                u = n,
                l = 0;
              i.subscribe(
                Ne(
                  s,
                  (c) => {
                    const d = l++;
                    (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, n, arguments.length >= 2, !0)
        );
      }
      function kc(e) {
        return e <= 0
          ? () => $t
          : xe((n, t) => {
              let r = [];
              n.subscribe(
                Ne(
                  t,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) t.next(o);
                    t.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Mv(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? xn((o, i) => e(o, i, r)) : jn,
            kc(1),
            t ? ra(n) : Iv(() => new na())
          );
      }
      function Lc(e) {
        return xe((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      /**
       * @license Angular v15.2.10
       * (c) 2010-2022 Google LLC. https://angular.io/
       * License: MIT
       */ const z = "primary",
        ai = Symbol("RouteTitle");
      class qA {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Yr(e) {
        return new qA(e);
      }
      function QA(e, n, t) {
        const r = t.path.split("/");
        if (
          r.length > e.length ||
          ("full" === t.pathMatch && (n.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Yt(e, n) {
        const t = e ? Object.keys(e) : void 0,
          r = n ? Object.keys(n) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let o;
        for (let i = 0; i < t.length; i++)
          if (((o = t[i]), !Tv(e[o], n[o]))) return !1;
        return !0;
      }
      function Tv(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1;
          const t = [...e].sort(),
            r = [...n].sort();
          return t.every((o, i) => r[i] === o);
        }
        return e === n;
      }
      function Av(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Rv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Le(e, n) {
        for (const t in e) e.hasOwnProperty(t) && n(e[t], t);
      }
      function Fn(e) {
        return zp(e) ? e : ws(e) ? Me(Promise.resolve(e)) : N(e);
      }
      const oa = !1,
        YA = {
          exact: function Pv(e, n, t) {
            if (
              !ir(e.segments, n.segments) ||
              !ia(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const r in n.children)
              if (!e.children[r] || !Pv(e.children[r], n.children[r], t))
                return !1;
            return !0;
          },
          subset: Fv,
        },
        xv = {
          exact: function KA(e, n) {
            return Yt(e, n);
          },
          subset: function XA(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every((t) => Tv(e[t], n[t]))
            );
          },
          ignored: () => !0,
        };
      function Nv(e, n, t) {
        return (
          YA[t.paths](e.root, n.root, t.matrixParams) &&
          xv[t.queryParams](e.queryParams, n.queryParams) &&
          !("exact" === t.fragment && e.fragment !== n.fragment)
        );
      }
      function Fv(e, n, t) {
        return Ov(e, n, n.segments, t);
      }
      function Ov(e, n, t, r) {
        if (e.segments.length > t.length) {
          const o = e.segments.slice(0, t.length);
          return !(!ir(o, t) || n.hasChildren() || !ia(o, t, r));
        }
        if (e.segments.length === t.length) {
          if (!ir(e.segments, t) || !ia(e.segments, t, r)) return !1;
          for (const o in n.children)
            if (!e.children[o] || !Fv(e.children[o], n.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = t.slice(0, e.segments.length),
            i = t.slice(e.segments.length);
          return (
            !!(ir(e.segments, o) && ia(e.segments, o, r) && e.children[z]) &&
            Ov(e.children[z], n, i, r)
          );
        }
      }
      function ia(e, n, t) {
        return n.every((r, o) => xv[t](e[o].parameters, r.parameters));
      }
      class On {
        constructor(n = new Q([], {}), t = {}, r = null) {
          (this.root = n), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return tR.serialize(this);
        }
      }
      class Q {
        constructor(n, t) {
          (this.segments = n),
            (this.children = t),
            (this.parent = null),
            Le(t, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return sa(this);
        }
      }
      class ui {
        constructor(n, t) {
          (this.path = n), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Yr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return $v(this);
        }
      }
      function ir(e, n) {
        return e.length === n.length && e.every((t, r) => t.path === n[r].path);
      }
      let li = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({
            token: e,
            factory: function () {
              return new $c();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class $c {
        parse(n) {
          const t = new cR(n);
          return new On(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(n) {
          const t = `/${ci(n.root, !0)}`,
            r = (function oR(e) {
              const n = Object.keys(e)
                .map((t) => {
                  const r = e[t];
                  return Array.isArray(r)
                    ? r.map((o) => `${aa(t)}=${aa(o)}`).join("&")
                    : `${aa(t)}=${aa(r)}`;
                })
                .filter((t) => !!t);
              return n.length ? `?${n.join("&")}` : "";
            })(n.queryParams);
          return `${t}${r}${
            "string" == typeof n.fragment
              ? `#${(function nR(e) {
                  return encodeURI(e);
                })(n.fragment)}`
              : ""
          }`;
        }
      }
      const tR = new $c();
      function sa(e) {
        return e.segments.map((n) => $v(n)).join("/");
      }
      function ci(e, n) {
        if (!e.hasChildren()) return sa(e);
        if (n) {
          const t = e.children[z] ? ci(e.children[z], !1) : "",
            r = [];
          return (
            Le(e.children, (o, i) => {
              i !== z && r.push(`${i}:${ci(o, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function eR(e, n) {
            let t = [];
            return (
              Le(e.children, (r, o) => {
                o === z && (t = t.concat(n(r, o)));
              }),
              Le(e.children, (r, o) => {
                o !== z && (t = t.concat(n(r, o)));
              }),
              t
            );
          })(e, (r, o) =>
            o === z ? [ci(e.children[z], !1)] : [`${o}:${ci(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[z]
            ? `${sa(e)}/${t[0]}`
            : `${sa(e)}/(${t.join("//")})`;
        }
      }
      function kv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function aa(e) {
        return kv(e).replace(/%3B/gi, ";");
      }
      function jc(e) {
        return kv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ua(e) {
        return decodeURIComponent(e);
      }
      function Lv(e) {
        return ua(e.replace(/\+/g, "%20"));
      }
      function $v(e) {
        return `${jc(e.path)}${(function rR(e) {
          return Object.keys(e)
            .map((n) => `;${jc(n)}=${jc(e[n])}`)
            .join("");
        })(e.parameters)}`;
      }
      const iR = /^[^\/()?;=#]+/;
      function la(e) {
        const n = e.match(iR);
        return n ? n[0] : "";
      }
      const sR = /^[^=?&#]+/,
        uR = /^[^&#]+/;
      class cR {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Q([], {})
              : new Q([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional("&"));
          return n;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const n = [];
          for (
            this.peekStartsWith("(") || n.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), n.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) && (r[z] = new Q(n, t)),
            r
          );
        }
        parseSegment() {
          const n = la(this.remaining);
          if ("" === n && this.peekStartsWith(";")) throw new C(4009, oa);
          return this.capture(n), new ui(ua(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(";"); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const t = la(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = la(this.remaining);
            o && ((r = o), this.capture(r));
          }
          n[ua(t)] = ua(r);
        }
        parseQueryParam(n) {
          const t = (function aR(e) {
            const n = e.match(sR);
            return n ? n[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function lR(e) {
              const n = e.match(uR);
              return n ? n[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = Lv(t),
            i = Lv(r);
          if (n.hasOwnProperty(o)) {
            let s = n[o];
            Array.isArray(s) || ((s = [s]), (n[o] = s)), s.push(i);
          } else n[o] = i;
        }
        parseParens(n) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = la(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, oa);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : n && (i = z);
            const s = this.parseChildren();
            (t[i] = 1 === Object.keys(s).length ? s[z] : new Q([], s)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          );
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new C(4011, oa);
        }
      }
      function Vc(e) {
        return e.segments.length > 0 ? new Q([], { [z]: e }) : e;
      }
      function ca(e) {
        const n = {};
        for (const r of Object.keys(e.children)) {
          const i = ca(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (n[r] = i);
        }
        return (function dR(e) {
          if (1 === e.numberOfChildren && e.children[z]) {
            const n = e.children[z];
            return new Q(e.segments.concat(n.segments), n.children);
          }
          return e;
        })(new Q(e.segments, n));
      }
      function sr(e) {
        return e instanceof On;
      }
      const Uc = !1;
      function fR(e, n, t, r, o) {
        if (0 === t.length) return Kr(n.root, n.root, n.root, r, o);
        const i = (function Hv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Bv(!0, 0, e);
          let n = 0,
            t = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Le(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (t = !0)
                      : ".." === a
                      ? n++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Bv(t, n, r);
        })(t);
        return i.toRoot()
          ? Kr(n.root, n.root, new Q([], {}), r, o)
          : (function s(u) {
              const l = (function pR(e, n, t, r) {
                  if (e.isAbsolute) return new Xr(n.root, !0, 0);
                  if (-1 === r) return new Xr(t, t === n.root, 0);
                  return (function zv(e, n, t) {
                    let r = e,
                      o = n,
                      i = t;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new C(4005, Uc && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new Xr(r, !1, o - i);
                  })(t, r + (di(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, n, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Jr(l.segmentGroup, l.index, i.commands)
                  : Bc(l.segmentGroup, l.index, i.commands);
              return Kr(n.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function di(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function fi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Kr(e, n, t, r, o) {
        let s,
          i = {};
        r &&
          Le(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === n ? t : Uv(e, n, t));
        const a = Vc(ca(s));
        return new On(a, i, o);
      }
      function Uv(e, n, t) {
        const r = {};
        return (
          Le(e.children, (o, i) => {
            r[i] = o === n ? t : Uv(o, n, t);
          }),
          new Q(e.segments, r)
        );
      }
      class Bv {
        constructor(n, t, r) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            n && r.length > 0 && di(r[0]))
          )
            throw new C(
              4003,
              Uc && "Root segment cannot have matrix parameters"
            );
          const o = r.find(fi);
          if (o && o !== Rv(r))
            throw new C(4004, Uc && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Xr {
        constructor(n, t, r) {
          (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
        }
      }
      function Bc(e, n, t) {
        if (
          (e || (e = new Q([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Jr(e, n, t);
        const r = (function mR(e, n, t) {
            let r = 0,
              o = n;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= t.length) return i;
              const s = e.segments[o],
                a = t[r];
              if (fi(a)) break;
              const u = `${a}`,
                l = r < t.length - 1 ? t[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Wv(u, l, s)) return i;
                r += 2;
              } else {
                if (!Wv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, n, t),
          o = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new Q(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[z] = new Q(e.segments.slice(r.pathIndex), e.children)),
            Jr(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new Q(e.segments, {})
          : r.match && !e.hasChildren()
          ? Hc(e, n, t)
          : r.match
          ? Jr(e, 0, o)
          : Hc(e, n, t);
      }
      function Jr(e, n, t) {
        if (0 === t.length) return new Q(e.segments, {});
        {
          const r = (function gR(e) {
              return fi(e[0]) ? e[0].outlets : { [z]: e };
            })(t),
            o = {};
          if (
            !r[z] &&
            e.children[z] &&
            1 === e.numberOfChildren &&
            0 === e.children[z].segments.length
          ) {
            const i = Jr(e.children[z], n, t);
            return new Q(e.segments, i.children);
          }
          return (
            Le(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Bc(e.children[s], n, i));
            }),
            Le(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new Q(e.segments, o)
          );
        }
      }
      function Hc(e, n, t) {
        const r = e.segments.slice(0, n);
        let o = 0;
        for (; o < t.length; ) {
          const i = t[o];
          if (fi(i)) {
            const u = yR(i.outlets);
            return new Q(r, u);
          }
          if (0 === o && di(t[0])) {
            r.push(new ui(e.segments[n].path, Gv(t[0]))), o++;
            continue;
          }
          const s = fi(i) ? i.outlets[z] : `${i}`,
            a = o < t.length - 1 ? t[o + 1] : null;
          s && a && di(a)
            ? (r.push(new ui(s, Gv(a))), (o += 2))
            : (r.push(new ui(s, {})), o++);
        }
        return new Q(r, {});
      }
      function yR(e) {
        const n = {};
        return (
          Le(e, (t, r) => {
            "string" == typeof t && (t = [t]),
              null !== t && (n[r] = Hc(new Q([], {}), 0, t));
          }),
          n
        );
      }
      function Gv(e) {
        const n = {};
        return Le(e, (t, r) => (n[r] = `${t}`)), n;
      }
      function Wv(e, n, t) {
        return e == t.path && Yt(n, t.parameters);
      }
      const hi = "imperative";
      class Kt {
        constructor(n, t) {
          (this.id = n), (this.url = t);
        }
      }
      class zc extends Kt {
        constructor(n, t, r = "imperative", o = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ar extends Kt {
        constructor(n, t, r) {
          super(n, t), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class da extends Kt {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class fa extends Kt {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Gc extends Kt {
        constructor(n, t, r, o) {
          super(n, t), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class vR extends Kt {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class DR extends Kt {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _R extends Kt {
        constructor(n, t, r, o, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class CR extends Kt {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class wR extends Kt {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ER {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class bR {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class IR {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class SR {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class MR {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class TR {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class qv {
        constructor(n, t, r) {
          (this.routerEvent = n),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let xR = (() => {
          class e {
            createUrlTree(t, r, o, i, s, a) {
              return fR(t || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        PR = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function (n) {
                return xR.ɵfac(n);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Qv {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const t = this.pathFromRoot(n);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(n) {
          const t = Wc(n, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(n) {
          const t = Wc(n, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(n) {
          const t = qc(n, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== n);
        }
        pathFromRoot(n) {
          return qc(n, this._root).map((t) => t.value);
        }
      }
      function Wc(e, n) {
        if (e === n.value) return n;
        for (const t of n.children) {
          const r = Wc(e, t);
          if (r) return r;
        }
        return null;
      }
      function qc(e, n) {
        if (e === n.value) return [n];
        for (const t of n.children) {
          const r = qc(e, t);
          if (r.length) return r.unshift(n), r;
        }
        return [];
      }
      class Dn {
        constructor(n, t) {
          (this.value = n), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function eo(e) {
        const n = {};
        return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
      }
      class Zv extends Qv {
        constructor(n, t) {
          super(n), (this.snapshot = t), Qc(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Yv(e, n) {
        const t = (function FR(e, n) {
            const s = new ha([], {}, {}, "", {}, z, n, null, e.root, -1, {});
            return new Xv("", new Dn(s, []));
          })(e, n),
          r = new Lt([new ui("", {})]),
          o = new Lt({}),
          i = new Lt({}),
          s = new Lt({}),
          a = new Lt(""),
          u = new to(r, o, s, a, i, z, n, t.root);
        return (u.snapshot = t.root), new Zv(new Dn(u, []), t);
      }
      class to {
        constructor(n, t, r, o, i, s, a, u) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(Y((l) => l[ai])) ?? N(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Y((n) => Yr(n)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Y((n) => Yr(n)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Kv(e, n = "emptyOnly") {
        const t = e.pathFromRoot;
        let r = 0;
        if ("always" !== n)
          for (r = t.length - 1; r >= 1; ) {
            const o = t[r],
              i = t[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function OR(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(r));
      }
      class ha {
        get title() {
          return this.data?.[ai];
        }
        constructor(n, t, r, o, i, s, a, u, l, c, d) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Yr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Yr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Xv extends Qv {
        constructor(n, t) {
          super(t), (this.url = n), Qc(this, t);
        }
        toString() {
          return Jv(this._root);
        }
      }
      function Qc(e, n) {
        (n.value._routerState = e), n.children.forEach((t) => Qc(e, t));
      }
      function Jv(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(Jv).join(", ")} } ` : "";
        return `${e.value}${n}`;
      }
      function Zc(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot;
          (e.snapshot = t),
            Yt(n.queryParams, t.queryParams) ||
              e.queryParams.next(t.queryParams),
            n.fragment !== t.fragment && e.fragment.next(t.fragment),
            Yt(n.params, t.params) || e.params.next(t.params),
            (function ZA(e, n) {
              if (e.length !== n.length) return !1;
              for (let t = 0; t < e.length; ++t) if (!Yt(e[t], n[t])) return !1;
              return !0;
            })(n.url, t.url) || e.url.next(t.url),
            Yt(n.data, t.data) || e.data.next(t.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Yc(e, n) {
        const t =
          Yt(e.params, n.params) &&
          (function JA(e, n) {
            return (
              ir(e, n) && e.every((t, r) => Yt(t.parameters, n[r].parameters))
            );
          })(e.url, n.url);
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || Yc(e.parent, n.parent))
        );
      }
      function pi(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = n.value;
          const o = (function LR(e, n, t) {
            return n.children.map((r) => {
              for (const o of t.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return pi(e, r, o);
              return pi(e, r);
            });
          })(e, n, t);
          return new Dn(r, o);
        }
        {
          if (e.shouldAttach(n.value)) {
            const i = e.retrieve(n.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = n.value),
                (s.children = n.children.map((a) => pi(e, a))),
                s
              );
            }
          }
          const r = (function $R(e) {
              return new to(
                new Lt(e.url),
                new Lt(e.params),
                new Lt(e.queryParams),
                new Lt(e.fragment),
                new Lt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(n.value),
            o = n.children.map((i) => pi(e, i));
          return new Dn(r, o);
        }
      }
      const Kc = "ngNavigationCancelingError";
      function eD(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: r } = sr(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          o = tD(!1, 0, n);
        return (o.url = t), (o.navigationBehaviorOptions = r), o;
      }
      function tD(e, n, t) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Kc] = !0), (r.cancellationCode = n), t && (r.url = t), r;
      }
      function nD(e) {
        return rD(e) && sr(e.url);
      }
      function rD(e) {
        return e && e[Kc];
      }
      class jR {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new gi()),
            (this.attachRef = null);
        }
      }
      let gi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, r) {
            const o = this.getOrCreateContext(t);
            (o.outlet = r), this.contexts.set(t, o);
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let r = this.getContext(t);
            return r || ((r = new jR()), this.contexts.set(t, r)), r;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const pa = !1;
      let Xc = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = z),
              (this.activateEvents = new Xe()),
              (this.deactivateEvents = new Xe()),
              (this.attachEvents = new Xe()),
              (this.detachEvents = new Xe()),
              (this.parentContexts = K(gi)),
              (this.location = K(Pt)),
              (this.changeDetector = K(tc)),
              (this.environmentInjector = K(un));
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: r, previousValue: o } = t.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const t = this.parentContexts.getContext(this.name);
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new C(4012, pa);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new C(4012, pa);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new C(4012, pa);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new C(4013, pa);
            this._activatedRoute = t;
            const o = this.location,
              s = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new VR(t, a, o.injector);
            if (
              r &&
              (function UR(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵdir = qe({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Hn],
          })),
          e
        );
      })();
      class VR {
        constructor(n, t, r) {
          (this.route = n), (this.childContexts = t), (this.parent = r);
        }
        get(n, t) {
          return n === to
            ? this.route
            : n === gi
            ? this.childContexts
            : this.parent.get(n, t);
        }
      }
      let Jc = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵcmp = En({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [fm],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && De(0, "router-outlet");
            },
            dependencies: [Xc],
            encapsulation: 2,
          })),
          e
        );
      })();
      function oD(e, n) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = As(e.providers, n, `Route: ${e.path}`)),
          e._injector ?? n
        );
      }
      function td(e) {
        const n = e.children && e.children.map(td),
          t = n ? { ...e, children: n } : { ...e };
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== z &&
            (t.component = Jc),
          t
        );
      }
      function bt(e) {
        return e.outlet || z;
      }
      function iD(e, n) {
        const t = e.filter((r) => bt(r) === n);
        return t.push(...e.filter((r) => bt(r) !== n)), t;
      }
      function mi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class WR {
        constructor(n, t, r, o) {
          (this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(n) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, n),
            Zc(this.futureState.root),
            this.activateChildRoutes(t, r, n);
        }
        deactivateChildRoutes(n, t, r) {
          const o = eo(t);
          n.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Le(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(n, t, s.children);
            } else this.deactivateChildRoutes(n, t, r);
          else i && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t);
        }
        detachAndStoreRouteSubtree(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = eo(n);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: s,
              route: n,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = eo(n);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(n, t, r) {
          const o = eo(t);
          n.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new TR(i.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new SR(n.value.snapshot));
        }
        activateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null;
          if ((Zc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(n, t, s.children);
            } else this.activateChildRoutes(n, t, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Zc(a.route.value),
                this.activateChildRoutes(n, null, s.children);
            } else {
              const a = mi(o.snapshot),
                u = a?.get(ko) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(n, null, s.children);
            }
          } else this.activateChildRoutes(n, null, r);
        }
      }
      class sD {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ga {
        constructor(n, t) {
          (this.component = n), (this.route = t);
        }
      }
      function qR(e, n, t) {
        const r = e._root;
        return yi(r, n ? n._root : null, t, [r.value]);
      }
      function no(e, n) {
        const t = Symbol(),
          r = n.get(e, t);
        return r === t
          ? "function" != typeof e ||
            (function H_(e) {
              return null !== Ai(e);
            })(e)
            ? n.get(e)
            : e
          : r;
      }
      function yi(
        e,
        n,
        t,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = eo(n);
        return (
          e.children.forEach((s) => {
            (function ZR(
              e,
              n,
              t,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function YR(e, n, t) {
                  if ("function" == typeof t) return t(e, n);
                  switch (t) {
                    case "pathParamsChange":
                      return !ir(e.url, n.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !ir(e.url, n.url) || !Yt(e.queryParams, n.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Yc(e, n) || !Yt(e.queryParams, n.queryParams);
                    default:
                      return !Yc(e, n);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new sD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  yi(e, n, i.component ? (a ? a.children : null) : t, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ga(a.outlet.component, s));
              } else
                s && vi(n, a, o),
                  o.canActivateChecks.push(new sD(r)),
                  yi(e, null, i.component ? (a ? a.children : null) : t, r, o);
            })(s, i[s.value.outlet], t, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Le(i, (s, a) => vi(s, t.getContext(a), o)),
          o
        );
      }
      function vi(e, n, t) {
        const r = eo(e),
          o = e.value;
        Le(r, (i, s) => {
          vi(i, o.component ? (n ? n.children.getContext(s) : null) : n, t);
        }),
          t.canDeactivateChecks.push(
            new ga(
              o.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              o
            )
          );
      }
      function Di(e) {
        return "function" == typeof e;
      }
      function nd(e) {
        return e instanceof na || "EmptyError" === e?.name;
      }
      const ma = Symbol("INITIAL_VALUE");
      function ro() {
        return Zt((e) =>
          Cv(
            e.map((n) =>
              n.pipe(
                Zr(1),
                (function BA(...e) {
                  const n = co(e);
                  return xe((t, r) => {
                    (n ? Fc(e, t, n) : Fc(e, t)).subscribe(r);
                  });
                })(ma)
              )
            )
          ).pipe(
            Y((n) => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === ma) return ma;
                  if (!1 === t || t instanceof On) return t;
                }
              return !0;
            }),
            xn((n) => n !== ma),
            Zr(1)
          )
        );
      }
      function aD(e) {
        return (function GD(...e) {
          return yd(e);
        })(
          ze((n) => {
            if (sr(n)) throw eD(0, n);
          }),
          Y((n) => !0 === n)
        );
      }
      const rd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function uD(e, n, t, r, o) {
        const i = od(e, n, t);
        return i.matched
          ? (function hx(e, n, t, r) {
              const o = n.canMatch;
              return o && 0 !== o.length
                ? N(
                    o.map((s) => {
                      const a = no(s, e);
                      return Fn(
                        (function nx(e) {
                          return e && Di(e.canMatch);
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t))
                      );
                    })
                  ).pipe(ro(), aD())
                : N(!0);
            })((r = oD(n, r)), n, t).pipe(Y((s) => (!0 === s ? i : { ...rd })))
          : N(i);
      }
      function od(e, n, t) {
        if ("" === n.path)
          return "full" === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...rd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (n.matcher || QA)(t, e, n);
        if (!o) return { ...rd };
        const i = {};
        Le(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: t.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function ya(e, n, t, r) {
        if (
          t.length > 0 &&
          (function mx(e, n, t) {
            return t.some((r) => va(e, n, r) && bt(r) !== z);
          })(e, t, r)
        ) {
          const i = new Q(
            n,
            (function gx(e, n, t, r) {
              const o = {};
              (o[z] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = n.length);
              for (const i of t)
                if ("" === i.path && bt(i) !== z) {
                  const s = new Q([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = n.length),
                    (o[bt(i)] = s);
                }
              return o;
            })(e, n, r, new Q(t, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = n.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function yx(e, n, t) {
            return t.some((r) => va(e, n, r));
          })(e, t, r)
        ) {
          const i = new Q(
            e.segments,
            (function px(e, n, t, r, o) {
              const i = {};
              for (const s of r)
                if (va(e, t, s) && !o[bt(s)]) {
                  const a = new Q([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = n.length),
                    (i[bt(s)] = a);
                }
              return { ...o, ...i };
            })(e, n, t, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = n.length),
            { segmentGroup: i, slicedSegments: t }
          );
        }
        const o = new Q(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = n.length),
          { segmentGroup: o, slicedSegments: t }
        );
      }
      function va(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function lD(e, n, t, r) {
        return (
          !!(bt(e) === r || (r !== z && va(n, t, e))) &&
          ("**" === e.path || od(n, e, t).matched)
        );
      }
      function cD(e, n, t) {
        return 0 === n.length && !e.children[t];
      }
      const Da = !1;
      class _a {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class dD {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function _i(e) {
        return si(new _a(e));
      }
      function fD(e) {
        return si(new dD(e));
      }
      class Cx {
        constructor(n, t, r, o, i) {
          (this.injector = n),
            (this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const n = ya(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new Q(n.segments, n.children);
          return this.expandSegmentGroup(this.injector, this.config, t, z)
            .pipe(
              Y((i) =>
                this.createUrlTree(
                  ca(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Pn((i) => {
                if (i instanceof dD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof _a ? this.noMatchError(i) : i;
              })
            );
        }
        match(n) {
          return this.expandSegmentGroup(this.injector, this.config, n.root, z)
            .pipe(
              Y((o) => this.createUrlTree(ca(o), n.queryParams, n.fragment))
            )
            .pipe(
              Pn((o) => {
                throw o instanceof _a ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(n) {
          return new C(4002, Da);
        }
        createUrlTree(n, t, r) {
          const o = Vc(n);
          return new On(o, t, r);
        }
        expandSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(n, t, r).pipe(Y((i) => new Q([], i)))
            : this.expandSegment(n, r, t, r.segments, o, !0);
        }
        expandChildren(n, t, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Me(o).pipe(
            or((i) => {
              const s = r.children[i],
                a = iD(t, i);
              return this.expandSegmentGroup(n, a, s, i).pipe(
                Y((u) => ({ segment: u, outlet: i }))
              );
            }),
            Sv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            Mv()
          );
        }
        expandSegment(n, t, r, o, i, s) {
          return Me(r).pipe(
            or((a) =>
              this.expandSegmentAgainstRoute(n, t, r, a, o, i, s).pipe(
                Pn((l) => {
                  if (l instanceof _a) return N(null);
                  throw l;
                })
              )
            ),
            Nn((a) => !!a),
            Pn((a, u) => {
              if (nd(a)) return cD(t, o, i) ? N(new Q([], {})) : _i(t);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(n, t, r, o, i, s, a) {
          return lD(o, t, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(n, t, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s)
              : _i(t)
            : _i(t);
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? fD(i)
            : this.lineralizeSegments(r, i).pipe(
                Fe((s) => {
                  const a = new Q(s, {});
                  return this.expandSegment(n, a, t, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = od(t, o, i);
          if (!a) return _i(t);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? fD(d)
            : this.lineralizeSegments(o, d).pipe(
                Fe((h) => this.expandSegment(n, t, r, h.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(n, t, r, o, i) {
          return "**" === r.path
            ? ((n = oD(r, n)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? N({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(n, r)
                  ).pipe(
                    Y(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new Q(o, {})
                      )
                    )
                  )
                : N(new Q(o, {})))
            : uD(t, r, o, n).pipe(
                Zt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((n = r._injector ?? n), r, o).pipe(
                          Fe((c) => {
                            const d = c.injector ?? n,
                              h = c.routes,
                              { segmentGroup: f, slicedSegments: g } = ya(
                                t,
                                a,
                                u,
                                h
                              ),
                              p = new Q(f.segments, f.children);
                            if (0 === g.length && p.hasChildren())
                              return this.expandChildren(d, h, p).pipe(
                                Y((y) => new Q(a, y))
                              );
                            if (0 === h.length && 0 === g.length)
                              return N(new Q(a, {}));
                            const m = bt(r) === i;
                            return this.expandSegment(
                              d,
                              p,
                              h,
                              g,
                              m ? z : i,
                              !0
                            ).pipe(
                              Y((D) => new Q(a.concat(D.segments), D.children))
                            );
                          })
                        )
                      : _i(t)
                )
              );
        }
        getChildConfig(n, t, r) {
          return t.children
            ? N({ routes: t.children, injector: n })
            : t.loadChildren
            ? void 0 !== t._loadedRoutes
              ? N({ routes: t._loadedRoutes, injector: t._loadedInjector })
              : (function fx(e, n, t, r) {
                  const o = n.canLoad;
                  return void 0 === o || 0 === o.length
                    ? N(!0)
                    : N(
                        o.map((s) => {
                          const a = no(s, e);
                          return Fn(
                            (function XR(e) {
                              return e && Di(e.canLoad);
                            })(a)
                              ? a.canLoad(n, t)
                              : e.runInContext(() => a(n, t))
                          );
                        })
                      ).pipe(ro(), aD());
                })(n, t, r).pipe(
                  Fe((o) =>
                    o
                      ? this.configLoader.loadChildren(n, t).pipe(
                          ze((i) => {
                            (t._loadedRoutes = i.routes),
                              (t._loadedInjector = i.injector);
                          })
                        )
                      : (function Dx(e) {
                          return si(tD(Da, 3));
                        })()
                  )
                )
            : N({ routes: [], injector: n });
        }
        lineralizeSegments(n, t) {
          let r = [],
            o = t.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return N(r);
            if (o.numberOfChildren > 1 || !o.children[z])
              return n.redirectTo, si(new C(4e3, Da));
            o = o.children[z];
          }
        }
        applyRedirectCommands(n, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            r
          );
        }
        applyRedirectCreateUrlTree(n, t, r, o) {
          const i = this.createSegmentGroup(n, t.root, r, o);
          return new On(
            i,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(n, t) {
          const r = {};
          return (
            Le(n, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = t[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(n, t, r, o) {
          const i = this.createSegments(n, t.segments, r, o);
          let s = {};
          return (
            Le(t.children, (a, u) => {
              s[u] = this.createSegmentGroup(n, a, r, o);
            }),
            new Q(i, s)
          );
        }
        createSegments(n, t, r, o) {
          return t.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(n, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(n, t, r) {
          const o = r[t.path.substring(1)];
          if (!o) throw new C(4001, Da);
          return o;
        }
        findOrReturn(n, t) {
          let r = 0;
          for (const o of t) {
            if (o.path === n.path) return t.splice(r), o;
            r++;
          }
          return n;
        }
      }
      class Ex {}
      class Sx {
        constructor(n, t, r, o, i, s, a) {
          (this.injector = n),
            (this.rootComponentType = t),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const n = ya(
            this.urlTree.root,
            [],
            [],
            this.config.filter((t) => void 0 === t.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            z
          ).pipe(
            Y((t) => {
              if (null === t) return null;
              const r = new ha(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  z,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Dn(r, t),
                i = new Xv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(n) {
          const t = n.value,
            r = Kv(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            n.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, t, r)
            : this.processSegment(n, t, r, r.segments, o);
        }
        processChildren(n, t, r) {
          return Me(Object.keys(r.children)).pipe(
            or((o) => {
              const i = r.children[o],
                s = iD(t, o);
              return this.processSegmentGroup(n, s, i, o);
            }),
            Sv((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function GA(e, n = !1) {
              return xe((t, r) => {
                let o = 0;
                t.subscribe(
                  Ne(r, (i) => {
                    const s = e(i, o++);
                    (s || n) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            ra(null),
            Mv(),
            Y((o) => {
              if (null === o) return null;
              const i = pD(o);
              return (
                (function Mx(e) {
                  e.sort((n, t) =>
                    n.value.outlet === z
                      ? -1
                      : t.value.outlet === z
                      ? 1
                      : n.value.outlet.localeCompare(t.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(n, t, r, o, i) {
          return Me(t).pipe(
            or((s) =>
              this.processSegmentAgainstRoute(s._injector ?? n, s, r, o, i)
            ),
            Nn((s) => !!s),
            Pn((s) => {
              if (nd(s)) return cD(r, o, i) ? N([]) : N(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(n, t, r, o, i) {
          if (t.redirectTo || !lD(t, r, o, i)) return N(null);
          let s;
          if ("**" === t.path) {
            const a = o.length > 0 ? Rv(o).parameters : {},
              u = mD(r) + o.length;
            s = N({
              snapshot: new ha(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                yD(t),
                bt(t),
                t.component ?? t._loadedComponent ?? null,
                t,
                gD(r),
                u,
                vD(t)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = uD(r, t, o, n).pipe(
              Y(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = mD(r) + u.length;
                  return {
                    snapshot: new ha(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      yD(t),
                      bt(t),
                      t.component ?? t._loadedComponent ?? null,
                      t,
                      gD(r),
                      d,
                      vD(t)
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Zt((a) => {
              if (null === a) return N(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              n = t._injector ?? n;
              const d = t._loadedInjector ?? n,
                h = (function Tx(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(t),
                { segmentGroup: f, slicedSegments: g } = ya(
                  r,
                  l,
                  c,
                  h.filter((m) => void 0 === m.redirectTo)
                );
              if (0 === g.length && f.hasChildren())
                return this.processChildren(d, h, f).pipe(
                  Y((m) => (null === m ? null : [new Dn(u, m)]))
                );
              if (0 === h.length && 0 === g.length) return N([new Dn(u, [])]);
              const p = bt(t) === i;
              return this.processSegment(d, h, f, g, p ? z : i).pipe(
                Y((m) => (null === m ? null : [new Dn(u, m)]))
              );
            })
          );
        }
      }
      function Ax(e) {
        const n = e.value.routeConfig;
        return n && "" === n.path && void 0 === n.redirectTo;
      }
      function pD(e) {
        const n = [],
          t = new Set();
        for (const r of e) {
          if (!Ax(r)) {
            n.push(r);
            continue;
          }
          const o = n.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r);
        }
        for (const r of t) {
          const o = pD(r.children);
          n.push(new Dn(r.value, o));
        }
        return n.filter((r) => !t.has(r));
      }
      function gD(e) {
        let n = e;
        for (; n._sourceSegment; ) n = n._sourceSegment;
        return n;
      }
      function mD(e) {
        let n = e,
          t = n._segmentIndexShift ?? 0;
        for (; n._sourceSegment; )
          (n = n._sourceSegment), (t += n._segmentIndexShift ?? 0);
        return t - 1;
      }
      function yD(e) {
        return e.data || {};
      }
      function vD(e) {
        return e.resolve || {};
      }
      function DD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function id(e) {
        return Zt((n) => {
          const t = e(n);
          return t ? Me(t).pipe(Y(() => n)) : N(n);
        });
      }
      const oo = new k("ROUTES");
      let sd = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = K(Jm));
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return N(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const r = Fn(t.loadComponent()).pipe(
                Y(CD),
                ze((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = i);
                }),
                Lc(() => {
                  this.componentLoaders.delete(t);
                })
              ),
              o = new bv(r, () => new Xt()).pipe(Oc());
            return this.componentLoaders.set(t, o), o;
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return N({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                Y((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(t).injector),
                      (l = Av(u.get(oo, [], O.Self | O.Optional))));
                  return { routes: l.map(td), injector: u };
                }),
                Lc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new bv(i, () => new Xt()).pipe(Oc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(t) {
            return Fn(t()).pipe(
              Y(CD),
              Fe((r) =>
                r instanceof cm || Array.isArray(r)
                  ? N(r)
                  : Me(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function CD(e) {
        return (function Lx(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let wa = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Xt()),
              (this.configLoader = K(sd)),
              (this.environmentInjector = K(un)),
              (this.urlSerializer = K(li)),
              (this.rootContexts = K(gi)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => N(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new bR(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new ER(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(t) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...t, id: r });
          }
          setupNavigations(t) {
            return (
              (this.transitions = new Lt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: t.currentUrlTree,
                currentRawUrl: t.currentUrlTree,
                extractedUrl: t.urlHandlingStrategy.extract(t.currentUrlTree),
                urlAfterRedirects: t.urlHandlingStrategy.extract(
                  t.currentUrlTree
                ),
                rawUrl: t.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: hi,
                restoredState: null,
                currentSnapshot: t.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: t.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                xn((r) => 0 !== r.id),
                Y((r) => ({
                  ...r,
                  extractedUrl: t.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Zt((r) => {
                  let o = !1,
                    i = !1;
                  return N(r).pipe(
                    ze((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Zt((s) => {
                      const a = t.browserUrlTree.toString(),
                        u =
                          !t.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== t.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new fa(s.id, t.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          wD(s.source) && (t.browserUrlTree = s.extractedUrl),
                          N(s).pipe(
                            Zt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new zc(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? $t
                                  : Promise.resolve(c)
                              );
                            }),
                            (function wx(e, n, t, r) {
                              return Zt((o) =>
                                (function _x(e, n, t, r, o) {
                                  return new Cx(e, n, t, r, o).apply();
                                })(e, n, t, o.extractedUrl, r).pipe(
                                  Y((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              t.config
                            ),
                            ze((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function xx(e, n, t, r, o) {
                              return Fe((i) =>
                                (function Ix(
                                  e,
                                  n,
                                  t,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new Sx(e, n, t, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Zt((a) =>
                                        null === a
                                          ? (function bx(e) {
                                              return new Se((n) => n.error(e));
                                            })(new Ex())
                                          : N(a)
                                      )
                                    );
                                })(
                                  e,
                                  n,
                                  t,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(Y((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              t.config,
                              this.urlSerializer,
                              t.paramsInheritanceStrategy
                            ),
                            ze((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === t.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const h = t.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  t.setBrowserUrl(h, c);
                                }
                                t.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new vR(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        t.urlHandlingStrategy.shouldProcessUrl(t.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: h,
                            restoredState: f,
                            extras: g,
                          } = s,
                          p = new zc(c, this.urlSerializer.serialize(d), h, f);
                        this.events.next(p);
                        const m = Yv(d, this.rootComponentType).snapshot;
                        return N(
                          (r = {
                            ...s,
                            targetSnapshot: m,
                            urlAfterRedirects: d,
                            extras: {
                              ...g,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new fa(s.id, t.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          $t
                        );
                      }
                    }),
                    ze((s) => {
                      const a = new DR(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    Y(
                      (s) =>
                        (r = {
                          ...s,
                          guards: qR(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function ox(e, n) {
                      return Fe((t) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = t;
                        return 0 === s.length && 0 === i.length
                          ? N({ ...t, guardsResult: !0 })
                          : (function ix(e, n, t, r) {
                              return Me(e).pipe(
                                Fe((o) =>
                                  (function dx(e, n, t, r, o) {
                                    const i =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? N(
                                          i.map((a) => {
                                            const u = mi(n) ?? o,
                                              l = no(a, u);
                                            return Fn(
                                              (function tx(e) {
                                                return e && Di(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, n, t, r)
                                                : u.runInContext(() =>
                                                    l(e, n, t, r)
                                                  )
                                            ).pipe(Nn());
                                          })
                                        ).pipe(ro())
                                      : N(!0);
                                  })(o.component, o.route, t, n, r)
                                ),
                                Nn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Fe((a) =>
                                a &&
                                (function KR(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function sx(e, n, t, r) {
                                      return Me(n).pipe(
                                        or((o) =>
                                          Fc(
                                            (function ux(e, n) {
                                              return (
                                                null !== e && n && n(new IR(e)),
                                                N(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function ax(e, n) {
                                              return (
                                                null !== e && n && n(new MR(e)),
                                                N(!0)
                                              );
                                            })(o.route, r),
                                            (function cx(e, n, t) {
                                              const r = n[n.length - 1],
                                                i = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function QR(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    Ev(() =>
                                                      N(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              mi(s.node) ?? t,
                                                            c = no(u, l);
                                                          return Fn(
                                                            (function ex(e) {
                                                              return (
                                                                e &&
                                                                Di(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(Nn());
                                                        })
                                                      ).pipe(ro())
                                                    )
                                                  );
                                              return N(i).pipe(ro());
                                            })(e, o.path, t),
                                            (function lx(e, n, t) {
                                              const r = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return N(!0);
                                              const o = r.map((i) =>
                                                Ev(() => {
                                                  const s = mi(n) ?? t,
                                                    a = no(i, s);
                                                  return Fn(
                                                    (function JR(e) {
                                                      return (
                                                        e && Di(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : s.runInContext(() =>
                                                          a(n, e)
                                                        )
                                                  ).pipe(Nn());
                                                })
                                              );
                                              return N(o).pipe(ro());
                                            })(e, o.route, t)
                                          )
                                        ),
                                        Nn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, n)
                                  : N(a)
                              ),
                              Y((a) => ({ ...t, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    ze((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), sr(s.guardsResult))
                      )
                        throw eD(0, s.guardsResult);
                      const a = new _R(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    xn(
                      (s) =>
                        !!s.guardsResult ||
                        (t.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    id((s) => {
                      if (s.guards.canActivateChecks.length)
                        return N(s).pipe(
                          ze((a) => {
                            const u = new CR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Zt((a) => {
                            let u = !1;
                            return N(a).pipe(
                              (function Nx(e, n) {
                                return Fe((t) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = t;
                                  if (!o.length) return N(t);
                                  let i = 0;
                                  return Me(o).pipe(
                                    or((s) =>
                                      (function Px(e, n, t, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !DD(o) &&
                                            (i[ai] = o.title),
                                          (function Fx(e, n, t, r) {
                                            const o = (function Ox(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return N({});
                                            const i = {};
                                            return Me(o).pipe(
                                              Fe((s) =>
                                                (function kx(e, n, t, r) {
                                                  const o = mi(n) ?? r,
                                                    i = no(e, o);
                                                  return Fn(
                                                    i.resolve
                                                      ? i.resolve(n, t)
                                                      : o.runInContext(() =>
                                                          i(n, t)
                                                        )
                                                  );
                                                })(e[s], n, t, r).pipe(
                                                  Nn(),
                                                  ze((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              kc(1),
                                              (function WA(e) {
                                                return Y(() => e);
                                              })(i),
                                              Pn((s) => (nd(s) ? $t : si(s)))
                                            );
                                          })(i, e, n, r).pipe(
                                            Y(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Kv(e, t).resolve),
                                                o &&
                                                  DD(o) &&
                                                  (e.data[ai] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, n)
                                    ),
                                    ze(() => i++),
                                    kc(1),
                                    Fe((s) => (i === o.length ? N(t) : $t))
                                  );
                                });
                              })(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              ze({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (t.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          ze((a) => {
                            const u = new wR(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    id((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              ze((c) => {
                                u.component = c;
                              }),
                              Y(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return Cv(a(s.targetSnapshot.root)).pipe(ra(), Zr(1));
                    }),
                    id(() => this.afterPreactivation()),
                    Y((s) => {
                      const a = (function kR(e, n, t) {
                        const r = pi(e, n._root, t ? t._root : void 0);
                        return new Zv(r, n);
                      })(
                        t.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    ze((s) => {
                      (t.currentUrlTree = s.urlAfterRedirects),
                        (t.rawUrlTree = t.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (t.routerState = s.targetRouterState),
                        "deferred" === t.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            t.setBrowserUrl(t.rawUrlTree, s),
                          (t.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, n, t) =>
                      Y(
                        (r) => (
                          new WR(
                            n,
                            r.targetRouterState,
                            r.currentRouterState,
                            t
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, t.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Zr(1),
                    ze({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (t.navigated = !0),
                          this.events.next(
                            new ar(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(t.currentUrlTree)
                            )
                          ),
                          t.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    Lc(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    Pn((s) => {
                      if (((i = !0), rD(s))) {
                        nD(s) || ((t.navigated = !0), t.restoreHistory(r, !0));
                        const a = new da(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), nD(s))) {
                          const u = t.urlHandlingStrategy.merge(
                              s.url,
                              t.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === t.urlUpdateStrategy || wD(r.source),
                            };
                          t.scheduleNavigation(u, hi, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        t.restoreHistory(r, !0);
                        const a = new Gc(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(t.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return $t;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(t, r, o) {
            const i = new da(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              r,
              o
            );
            this.events.next(i), t.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function wD(e) {
        return e !== hi;
      }
      let ED = (() => {
          class e {
            buildTitle(t) {
              let r,
                o = t.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === z));
              return r;
            }
            getResolvedTitleForRoute(t) {
              return t.data[ai];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return K($x);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        $x = (() => {
          class e extends ED {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const r = this.buildTitle(t);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(R(vv));
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        jx = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return K(Ux);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Vx {
        shouldDetach(n) {
          return !1;
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig;
        }
      }
      let Ux = (() => {
        class e extends Vx {}
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (
                n ||
                (n = (function Of(e) {
                  return en(() => {
                    const n = e.prototype.constructor,
                      t = n[nn] || fu(n),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[nn] || fu(o);
                      if (i && i !== t) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ea = new k("", { providedIn: "root", factory: () => ({}) });
      let Hx = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({
              token: e,
              factory: function () {
                return K(zx);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        zx = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0;
            }
            extract(t) {
              return t;
            }
            merge(t, r) {
              return t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function Gx(e) {
        throw e;
      }
      function Wx(e, n, t) {
        return n.parse("/");
      }
      const qx = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        Qx = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let ht = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = K(D1)),
                (this.isNgZoneEnabled = !1),
                (this.options = K(Ea, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || Gx),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || Wx),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = K(Hx)),
                (this.routeReuseStrategy = K(jx)),
                (this.urlCreationStrategy = K(PR)),
                (this.titleStrategy = K(ED)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = Av(K(oo, { optional: !0 }) ?? [])),
                (this.navigationTransitions = K(wa)),
                (this.urlSerializer = K(li)),
                (this.location = K(cc)),
                (this.isNgZoneEnabled =
                  K(_e) instanceof _e && _e.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new On()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = Yv(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (t) => {
                    (this.lastSuccessfulId = t.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (t) => {
                    this.console.warn(`Unhandled Navigation Error: ${t}`);
                  }
                );
            }
            resetRootComponentType(t) {
              (this.routerState.root.component = t),
                (this.navigationTransitions.rootComponentType = t);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const t = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), hi, t);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const r = "popstate" === t.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(t.url, r, t.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(t, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const u = { ...o };
                delete u.navigationId,
                  delete u.ɵrouterPageId,
                  0 !== Object.keys(u).length && (i.state = u);
              }
              const a = this.parseUrl(t);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(t) {
              (this.config = t.map(td)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(t, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: u,
                } = r,
                l = u ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = i || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  t,
                  c,
                  l ?? null
                )
              );
            }
            navigateByUrl(t, r = { skipLocationChange: !1 }) {
              const o = sr(t) ? t : this.parseUrl(t),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, hi, null, r);
            }
            navigate(t, r = { skipLocationChange: !1 }) {
              return (
                (function Zx(e) {
                  for (let n = 0; n < e.length; n++) {
                    const t = e[n];
                    if (null == t) throw new C(4008, false);
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, r), r)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let r;
              try {
                r = this.urlSerializer.parse(t);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, t);
              }
              return r;
            }
            isActive(t, r) {
              let o;
              if (
                ((o = !0 === r ? { ...qx } : !1 === r ? { ...Qx } : r), sr(t))
              )
                return Nv(this.currentUrlTree, t, o);
              const i = this.parseUrl(t);
              return Nv(this.currentUrlTree, i, o);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((r, o) => {
                const i = t[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(t, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, u, l, c;
              return (
                s
                  ? ((a = s.resolve), (u = s.reject), (l = s.promise))
                  : (l = new Promise((d, h) => {
                      (a = d), (u = h);
                    })),
                (c =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: c,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: t,
                  extras: i,
                  resolve: a,
                  reject: u,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(t, r) {
              const o = this.urlSerializer.serialize(t);
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(o, "", s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
                this.location.go(o, "", i);
              }
            }
            restoreHistory(t, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const i =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === i &&
                    (this.resetState(t),
                    (this.browserUrlTree = t.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
            }
            resetState(t) {
              (this.routerState = t.currentRouterState),
                (this.currentUrlTree = t.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  t.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(t, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: t, ɵrouterPageId: r }
                : { navigationId: t };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        ba = (() => {
          class e {
            constructor(t, r, o, i, s, a) {
              (this.router = t),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new Xt());
              const u = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === u || "area" === u),
                this.isAnchorElement
                  ? (this.subscription = t.events.subscribe((l) => {
                      l instanceof ar && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(t) {
              this._preserveFragment = sc(t);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(t) {
              this._skipLocationChange = sc(t);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(t) {
              this._replaceUrl = sc(t);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(t) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", t);
            }
            ngOnChanges(t) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(t) {
              null != t
                ? ((this.commands = Array.isArray(t) ? t : [t]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(t, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== t ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const t =
                null === this.href
                  ? null
                  : (function Fh(e, n, t) {
                      return (function yE(e, n) {
                        return ("src" === n &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === n && ("base" === e || "link" === e))
                          ? Ph
                          : Nh;
                      })(
                        n,
                        t
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", t);
            }
            applyAttributeValue(t, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, t, r) : o.removeAttribute(i, t);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                T(ht),
                T(to),
                (function Yi(e) {
                  return (function BC(e, n) {
                    if ("class" === n) return e.classes;
                    if ("style" === n) return e.styles;
                    const t = e.attrs;
                    if (t) {
                      const r = t.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = t[o];
                        if (wf(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof t[o]; ) o++;
                        else {
                          if (i === n) return t[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(ke(), e);
                })("tabindex"),
                T(cs),
                T(Sn),
                T(rr)
              );
            }),
            (e.ɵdir = qe({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (t, r) {
                1 & t &&
                  oe("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & t && Wt("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Hn],
            })),
            e
          );
        })();
      class bD {}
      let Xx = (() => {
        class e {
          constructor(t, r, o, i, s) {
            (this.router = t),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                xn((t) => t instanceof ar),
                or(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = As(i.providers, t, `Route: ${i.path}`));
              const s = i._injector ?? t,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Me(o).pipe(lr());
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : N(null);
              const i = o.pipe(
                Fe((s) =>
                  null === s
                    ? N(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Me([i, this.loader.loadComponent(r)]).pipe(lr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(ht), R(Jm), R(un), R(bD), R(sd));
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ud = new k("");
      let ID = (() => {
        class e {
          constructor(t, r, o, i, s = {}) {
            (this.urlSerializer = t),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof zc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof ar &&
                  ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof qv &&
                (t.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(t.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new qv(
                      t,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (t) {
            !(function dp() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = F({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var pt = (() => (
        ((pt = pt || {})[(pt.COMPLETE = 0)] = "COMPLETE"),
        (pt[(pt.FAILED = 1)] = "FAILED"),
        (pt[(pt.REDIRECTING = 2)] = "REDIRECTING"),
        pt
      ))();
      const io = !1;
      function kn(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      const ld = new k("", { providedIn: "root", factory: () => !1 });
      function MD() {
        const e = K(cn);
        return (n) => {
          const t = e.get(ks);
          if (n !== t.components[0]) return;
          const r = e.get(ht),
            o = e.get(TD);
          1 === e.get(cd) && r.initialNavigation(),
            e.get(AD, null, O.Optional)?.setUpPreloading(),
            e.get(ud, null, O.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const TD = new k(io ? "bootstrap done indicator" : "", {
          factory: () => new Xt(),
        }),
        cd = new k(io ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function rN() {
        let e = [];
        return (
          (e = io
            ? [
                {
                  provide: as,
                  multi: !0,
                  useFactory: () => {
                    const n = K(ht);
                    return () =>
                      n.events.subscribe((t) => {
                        console.group?.(`Router Event: ${t.constructor.name}`),
                          console.log(
                            (function AR(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(t)
                          ),
                          console.log(t),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          kn(1, e)
        );
      }
      const AD = new k(io ? "router preloader" : "");
      function oN(e) {
        return kn(0, [
          { provide: AD, useExisting: Xx },
          { provide: bD, useExisting: e },
        ]);
      }
      const Ci = !1,
        RD = new k(
          Ci ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        iN = [
          cc,
          { provide: li, useClass: $c },
          ht,
          gi,
          {
            provide: to,
            useFactory: function SD(e) {
              return e.routerState.root;
            },
            deps: [ht],
          },
          sd,
          Ci ? { provide: ld, useValue: !0 } : [],
        ];
      function sN() {
        return new ay("Router", ht);
      }
      let xD = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: e,
              providers: [
                iN,
                Ci && r?.enableTracing ? rN().ɵproviders : [],
                { provide: oo, multi: !0, useValue: t },
                {
                  provide: RD,
                  useFactory: cN,
                  deps: [[ht, new So(), new Mo()]],
                },
                { provide: Ea, useValue: r || {} },
                r?.useHash
                  ? { provide: rr, useClass: sM }
                  : { provide: rr, useClass: Ry },
                {
                  provide: ud,
                  useFactory: () => {
                    const e = K(bT),
                      n = K(_e),
                      t = K(Ea),
                      r = K(wa),
                      o = K(li);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new ID(o, r, e, n, t)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? oN(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: ay, multi: !0, useFactory: sN },
                r?.initialNavigation ? dN(r) : [],
                [
                  { provide: ND, useFactory: MD },
                  { provide: sy, multi: !0, useExisting: ND },
                ],
              ],
            };
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: oo, multi: !0, useValue: t }],
            };
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(R(RD, 8));
          }),
          (e.ɵmod = Vn({ type: e })),
          (e.ɵinj = wn({ imports: [Jc] })),
          e
        );
      })();
      function cN(e) {
        if (Ci && e)
          throw new C(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function dN(e) {
        return [
          "disabled" === e.initialNavigation
            ? kn(3, [
                {
                  provide: Ps,
                  multi: !0,
                  useFactory: () => {
                    const n = K(ht);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: cd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? kn(2, [
                { provide: cd, useValue: 0 },
                {
                  provide: Ps,
                  multi: !0,
                  deps: [cn],
                  useFactory: (n) => {
                    const t = n.get(oM, Promise.resolve());
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const o = n.get(ht),
                              i = n.get(TD);
                            (function Jx(e, n) {
                              e.events
                                .pipe(
                                  xn(
                                    (t) =>
                                      t instanceof ar ||
                                      t instanceof da ||
                                      t instanceof Gc ||
                                      t instanceof fa
                                  ),
                                  Y((t) =>
                                    t instanceof ar || t instanceof fa
                                      ? pt.COMPLETE
                                      : t instanceof da &&
                                        (0 === t.code || 1 === t.code)
                                      ? pt.REDIRECTING
                                      : pt.FAILED
                                  ),
                                  xn((t) => t !== pt.REDIRECTING),
                                  Zr(1)
                                )
                                .subscribe(() => {
                                  n();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (n.get(wa).afterPreactivation = () => (
                                r(!0), i.closed ? N(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const ND = new k(Ci ? "Router Initializer" : "");
      function PD(e) {
        var f;
        function s(f, g, p, m, v, D) {
          return d(
            (function h(f, g) {
              return (f << g) | (f >>> (32 - g));
            })(d(d(g, f), d(m, D)), v),
            p
          );
        }
        function a(f, g, p, m, v, D, y) {
          return s((g & p) | (~g & m), f, g, v, D, y);
        }
        function u(f, g, p, m, v, D, y) {
          return s((g & m) | (p & ~m), f, g, v, D, y);
        }
        function l(f, g, p, m, v, D, y) {
          return s(g ^ p ^ m, f, g, v, D, y);
        }
        function c(f, g, p, m, v, D, y) {
          return s(p ^ (g | ~m), f, g, v, D, y);
        }
        function d(f, g) {
          var p = (65535 & f) + (65535 & g);
          return (((f >> 16) + (g >> 16) + (p >> 16)) << 16) | (65535 & p);
        }
        return (function t(f) {
          for (var g, p = "0123456789ABCDEF", m = "", v = 0; v < f.length; v++)
            (g = f.charCodeAt(v)),
              (m += p.charAt((g >>> 4) & 15) + p.charAt(15 & g));
          return m;
        })(
          (function o(f) {
            for (var g = "", p = 0; p < 32 * f.length; p += 8)
              g += String.fromCharCode((f[p >> 5] >>> p % 32) & 255);
            return g;
          })(
            (function i(f, g) {
              (f[g >> 5] |= 128 << g % 32),
                (f[14 + (((g + 64) >>> 9) << 4)] = g);
              for (
                var p = 1732584193,
                  m = -271733879,
                  v = -1732584194,
                  D = 271733878,
                  y = 0;
                y < f.length;
                y += 16
              ) {
                var A = p,
                  J = m,
                  he = v,
                  kD = D;
                (m = c(
                  (m = c(
                    (m = c(
                      (m = c(
                        (m = l(
                          (m = l(
                            (m = l(
                              (m = l(
                                (m = u(
                                  (m = u(
                                    (m = u(
                                      (m = u(
                                        (m = a(
                                          (m = a(
                                            (m = a(
                                              (m = a(
                                                m,
                                                (v = a(
                                                  v,
                                                  (D = a(
                                                    D,
                                                    (p = a(
                                                      p,
                                                      m,
                                                      v,
                                                      D,
                                                      f[y + 0],
                                                      7,
                                                      -680876936
                                                    )),
                                                    m,
                                                    v,
                                                    f[y + 1],
                                                    12,
                                                    -389564586
                                                  )),
                                                  p,
                                                  m,
                                                  f[y + 2],
                                                  17,
                                                  606105819
                                                )),
                                                D,
                                                p,
                                                f[y + 3],
                                                22,
                                                -1044525330
                                              )),
                                              (v = a(
                                                v,
                                                (D = a(
                                                  D,
                                                  (p = a(
                                                    p,
                                                    m,
                                                    v,
                                                    D,
                                                    f[y + 4],
                                                    7,
                                                    -176418897
                                                  )),
                                                  m,
                                                  v,
                                                  f[y + 5],
                                                  12,
                                                  1200080426
                                                )),
                                                p,
                                                m,
                                                f[y + 6],
                                                17,
                                                -1473231341
                                              )),
                                              D,
                                              p,
                                              f[y + 7],
                                              22,
                                              -45705983
                                            )),
                                            (v = a(
                                              v,
                                              (D = a(
                                                D,
                                                (p = a(
                                                  p,
                                                  m,
                                                  v,
                                                  D,
                                                  f[y + 8],
                                                  7,
                                                  1770035416
                                                )),
                                                m,
                                                v,
                                                f[y + 9],
                                                12,
                                                -1958414417
                                              )),
                                              p,
                                              m,
                                              f[y + 10],
                                              17,
                                              -42063
                                            )),
                                            D,
                                            p,
                                            f[y + 11],
                                            22,
                                            -1990404162
                                          )),
                                          (v = a(
                                            v,
                                            (D = a(
                                              D,
                                              (p = a(
                                                p,
                                                m,
                                                v,
                                                D,
                                                f[y + 12],
                                                7,
                                                1804603682
                                              )),
                                              m,
                                              v,
                                              f[y + 13],
                                              12,
                                              -40341101
                                            )),
                                            p,
                                            m,
                                            f[y + 14],
                                            17,
                                            -1502002290
                                          )),
                                          D,
                                          p,
                                          f[y + 15],
                                          22,
                                          1236535329
                                        )),
                                        (v = u(
                                          v,
                                          (D = u(
                                            D,
                                            (p = u(
                                              p,
                                              m,
                                              v,
                                              D,
                                              f[y + 1],
                                              5,
                                              -165796510
                                            )),
                                            m,
                                            v,
                                            f[y + 6],
                                            9,
                                            -1069501632
                                          )),
                                          p,
                                          m,
                                          f[y + 11],
                                          14,
                                          643717713
                                        )),
                                        D,
                                        p,
                                        f[y + 0],
                                        20,
                                        -373897302
                                      )),
                                      (v = u(
                                        v,
                                        (D = u(
                                          D,
                                          (p = u(
                                            p,
                                            m,
                                            v,
                                            D,
                                            f[y + 5],
                                            5,
                                            -701558691
                                          )),
                                          m,
                                          v,
                                          f[y + 10],
                                          9,
                                          38016083
                                        )),
                                        p,
                                        m,
                                        f[y + 15],
                                        14,
                                        -660478335
                                      )),
                                      D,
                                      p,
                                      f[y + 4],
                                      20,
                                      -405537848
                                    )),
                                    (v = u(
                                      v,
                                      (D = u(
                                        D,
                                        (p = u(
                                          p,
                                          m,
                                          v,
                                          D,
                                          f[y + 9],
                                          5,
                                          568446438
                                        )),
                                        m,
                                        v,
                                        f[y + 14],
                                        9,
                                        -1019803690
                                      )),
                                      p,
                                      m,
                                      f[y + 3],
                                      14,
                                      -187363961
                                    )),
                                    D,
                                    p,
                                    f[y + 8],
                                    20,
                                    1163531501
                                  )),
                                  (v = u(
                                    v,
                                    (D = u(
                                      D,
                                      (p = u(
                                        p,
                                        m,
                                        v,
                                        D,
                                        f[y + 13],
                                        5,
                                        -1444681467
                                      )),
                                      m,
                                      v,
                                      f[y + 2],
                                      9,
                                      -51403784
                                    )),
                                    p,
                                    m,
                                    f[y + 7],
                                    14,
                                    1735328473
                                  )),
                                  D,
                                  p,
                                  f[y + 12],
                                  20,
                                  -1926607734
                                )),
                                (v = l(
                                  v,
                                  (D = l(
                                    D,
                                    (p = l(p, m, v, D, f[y + 5], 4, -378558)),
                                    m,
                                    v,
                                    f[y + 8],
                                    11,
                                    -2022574463
                                  )),
                                  p,
                                  m,
                                  f[y + 11],
                                  16,
                                  1839030562
                                )),
                                D,
                                p,
                                f[y + 14],
                                23,
                                -35309556
                              )),
                              (v = l(
                                v,
                                (D = l(
                                  D,
                                  (p = l(p, m, v, D, f[y + 1], 4, -1530992060)),
                                  m,
                                  v,
                                  f[y + 4],
                                  11,
                                  1272893353
                                )),
                                p,
                                m,
                                f[y + 7],
                                16,
                                -155497632
                              )),
                              D,
                              p,
                              f[y + 10],
                              23,
                              -1094730640
                            )),
                            (v = l(
                              v,
                              (D = l(
                                D,
                                (p = l(p, m, v, D, f[y + 13], 4, 681279174)),
                                m,
                                v,
                                f[y + 0],
                                11,
                                -358537222
                              )),
                              p,
                              m,
                              f[y + 3],
                              16,
                              -722521979
                            )),
                            D,
                            p,
                            f[y + 6],
                            23,
                            76029189
                          )),
                          (v = l(
                            v,
                            (D = l(
                              D,
                              (p = l(p, m, v, D, f[y + 9], 4, -640364487)),
                              m,
                              v,
                              f[y + 12],
                              11,
                              -421815835
                            )),
                            p,
                            m,
                            f[y + 15],
                            16,
                            530742520
                          )),
                          D,
                          p,
                          f[y + 2],
                          23,
                          -995338651
                        )),
                        (v = c(
                          v,
                          (D = c(
                            D,
                            (p = c(p, m, v, D, f[y + 0], 6, -198630844)),
                            m,
                            v,
                            f[y + 7],
                            10,
                            1126891415
                          )),
                          p,
                          m,
                          f[y + 14],
                          15,
                          -1416354905
                        )),
                        D,
                        p,
                        f[y + 5],
                        21,
                        -57434055
                      )),
                      (v = c(
                        v,
                        (D = c(
                          D,
                          (p = c(p, m, v, D, f[y + 12], 6, 1700485571)),
                          m,
                          v,
                          f[y + 3],
                          10,
                          -1894986606
                        )),
                        p,
                        m,
                        f[y + 10],
                        15,
                        -1051523
                      )),
                      D,
                      p,
                      f[y + 1],
                      21,
                      -2054922799
                    )),
                    (v = c(
                      v,
                      (D = c(
                        D,
                        (p = c(p, m, v, D, f[y + 8], 6, 1873313359)),
                        m,
                        v,
                        f[y + 15],
                        10,
                        -30611744
                      )),
                      p,
                      m,
                      f[y + 6],
                      15,
                      -1560198380
                    )),
                    D,
                    p,
                    f[y + 13],
                    21,
                    1309151649
                  )),
                  (v = c(
                    v,
                    (D = c(
                      D,
                      (p = c(p, m, v, D, f[y + 4], 6, -145523070)),
                      m,
                      v,
                      f[y + 11],
                      10,
                      -1120210379
                    )),
                    p,
                    m,
                    f[y + 2],
                    15,
                    718787259
                  )),
                  D,
                  p,
                  f[y + 9],
                  21,
                  -343485551
                )),
                  (p = d(p, A)),
                  (m = d(m, J)),
                  (v = d(v, he)),
                  (D = d(D, kD));
              }
              return Array(p, m, v, D);
            })(
              (function r(f) {
                for (var g = Array(f.length >> 2), p = 0; p < g.length; p++)
                  g[p] = 0;
                for (p = 0; p < 8 * f.length; p += 8)
                  g[p >> 5] |= (255 & f.charCodeAt(p / 8)) << p % 32;
                return g;
              })((f = e)),
              8 * f.length
            )
          )
        ).toLowerCase();
      }
      function FD(e, n, t, r, o, i, s) {
        try {
          var a = e[i](s),
            u = a.value;
        } catch (l) {
          return void t(l);
        }
        a.done ? n(u) : Promise.resolve(u).then(r, o);
      }
      function Pe(e) {
        return function () {
          var n = this,
            t = arguments;
          return new Promise(function (r, o) {
            var i = e.apply(n, t);
            function s(u) {
              FD(i, r, o, s, a, "next", u);
            }
            function a(u) {
              FD(i, r, o, s, a, "throw", u);
            }
            s(void 0);
          });
        };
      }
      const ur_api_mock = !1,
        ur_api_endpoint =
          window.location.protocol + "//" + window.location.host;
      class Ge {
        constructor(n, t) {
          (this.name = n), (this.value = t);
        }
      }
      class wi {
        constructor(n, t) {
          (this.name = n), (this.keys = t);
        }
      }
      var We = (() => {
        return (
          ((e = We || (We = {})).STRING = "S"),
          (e.PASSWORD = "P"),
          (e.DROPDOWN = "d"),
          (e.ULONG = "L"),
          (e.INT = "I"),
          (e.SHORT = "i"),
          (e.RGB = "R"),
          (e.BOOL = "C"),
          (e.DOUBLE = "D"),
          (e.FLOAT = "F"),
          We
        );
        var e;
      })();
      class It {
        constructor(n, t, r, o, i, s = !1) {
          (this.id = n),
            (this.type = t),
            (this.label = r),
            (this.help = o),
            (this.value = i),
            (this.syncing = s);
        }
        get checked() {
          return "true" === this.value;
        }
      }
      let so = (() => {
        class e {
          get hasToken() {
            return this._hasToken;
          }
          get getExpectedApiVersion() {
            return this.expectedApiVersion;
          }
          get getRemoteApiVersion() {
            return this.remoteApiVersion;
          }
          constructor() {
            (this.expectedApiVersion = 1),
              (this.remoteApiVersion = this.expectedApiVersion),
              (this.token = null),
              (this._hasToken = !1);
            const t = sessionStorage.getItem("token");
            null !== t && this.setToken(t);
          }
          delay(t) {
            setTimeout(t, 1e3);
          }
          setAuthentication(t, r) {
            var o = this;
            return Pe(function* () {
              yield o.setToken(btoa(t + ":" + r));
            })();
          }
          setToken(t) {
            var r = this;
            return Pe(function* () {
              r.token = t;
              try {
                (r._hasToken = null), yield r.getBuildFlags();
              } catch {
                return;
              }
              sessionStorage.setItem("token", r.token), (r._hasToken = !0);
            })();
          }
          clearToken(t = !0) {
            (this.token = null),
              (this._hasToken = !1),
              t && sessionStorage.removeItem("token");
          }
          makePath(t) {
            return ur_api_endpoint + t;
          }
          getAuthenticatedFetch(t, r, o = null, i = null) {
            var s = {};
            return (
              null !== this.token && (s.Authorization = `Basic ${this.token}`),
              null !== o && (s["Content-Type"] = o),
              fetch(this.makePath(t), { method: r, headers: s, body: i }).then(
                (a) => {
                  if ((401 === a.status && this.clearToken(!1), !a.ok))
                    throw new Error("HTTP error, status = " + a.status);
                  return a;
                }
              )
            );
          }
          authenticateXhr(t) {
            if (null === this.token) throw new Error("No token available");
            t.setRequestHeader("Authorization", `Basic ${this.token}`);
          }
          getBuildFlags() {
            return new Promise((t, r) => {
              const o = [];
              ur_api_mock
                ? ((this.remoteApiVersion = this.expectedApiVersion),
                  o.push(
                    new Ge("API Version", this.expectedApiVersion.toString())
                  ),
                  o.push(new Ge("Boot Count", "1")),
                  o.push(new Ge("Build Timestamp", "2020-01-01 00:00:00")),
                  o.push(new Ge("Compiler Version", "1.0.0")),
                  o.push(new Ge("Git Branch Name", "master")),
                  o.push(new Ge("Git Commit Hash", "00000000")),
                  o.push(new Ge("Git Commit Timestamp", "2020-01-01 00:00:00")),
                  o.push(new Ge("PlatformIO Environment", "dev")),
                  this.delay(() => t(o)))
                : this.getAuthenticatedFetch("/api/info", "GET")
                    .then((i) => i.json())
                    .then((i) => {
                      (this.remoteApiVersion = i.X),
                        o.push(new Ge("API Version", i.X)),
                        o.push(new Ge("Boot Count", i.bc)),
                        o.push(new Ge("Build Timestamp", i.t)),
                        o.push(new Ge("Compiler Version", i.v)),
                        o.push(new Ge("Git Branch Name", i.gb)),
                        o.push(new Ge("Git Commit Hash", i.gh)),
                        o.push(
                          new Ge(
                            "Git Commit Timestamp",
                            new Date(i.gt).toLocaleString()
                          )
                        ),
                        o.push(new Ge("PlatformIO Environment", i.pe)),
                        t(o);
                    })
                    .catch((i) => r);
            });
          }
          getConfigCategories() {
            return new Promise((t, r) => {
              const o = [];
              ur_api_mock
                ? (o.push(new wi("General", ["a", "b", "c"])),
                  o.push(new wi("Display", ["d", "e", "f"])),
                  o.push(new wi("Design", ["g", "h"])),
                  o.push(new wi("Other", ["i"])),
                  this.delay(() => t(o)))
                : this.getAuthenticatedFetch("/api/config/categories", "GET")
                    .then((i) => i.json())
                    .then((i) => {
                      for (const s in i.categories)
                        o.push(new wi(s, i.categories[s]));
                      t(o);
                    })
                    .catch((i) => r);
            });
          }
          getConfigCategoryField(t) {
            return new Promise((r, o) => {
              if (ur_api_mock) {
                var i = {
                  a: new It("a", We.STRING, "Label_a", null, "string"),
                  b: new It("b", We.PASSWORD, "Label_b", "Help_b", "password"),
                  c: new It("c", We.DROPDOWN, "Label_c", "1,2,3,4,5", "3"),
                  d: new It("d", We.ULONG, "Label_d", "Help_d", "1000000"),
                  e: new It("e", We.INT, "Label_e", "Help_e", "10000"),
                  f: new It("f", We.SHORT, "Label_f", "Help_f", "32000"),
                  g: new It("g", We.RGB, "Label_g", "Help_g", "#ffee00"),
                  h: new It("h", We.BOOL, "Label_h", "Help_h", "false"),
                  i: new It("i", We.DOUBLE, "Label_i", "Help_i", "0.0042"),
                  j: new It("j", We.FLOAT, "Label_j", "Help_j", "0.42"),
                };
                this.delay(() =>
                  r(
                    t in i
                      ? i[t]
                      : new It(
                          t,
                          We.STRING,
                          "Label_" + t,
                          "Help_" + t,
                          "value_" + t
                        )
                  )
                );
              } else
                this.getAuthenticatedFetch("/api/config/field?id=" + t, "GET")
                  .then((s) => s.json())
                  .then((s) => {
                    r(new It(t, s.type, s.label, s.help, s.value));
                  })
                  .catch((s) => o);
            });
          }
          setConfigCategoryField(t) {
            return (
              (t.syncing = !0),
              new Promise((r, o) => {
                ur_api_mock
                  ? ("c" == t.id && Math.random() < 0.5
                      ? o("random failure to mock you")
                      : this.delay(r),
                    (t.syncing = !1))
                  : this.getAuthenticatedFetch(
                      "/api/config/field?id=" +
                        t.id +
                        "&value=" +
                        encodeURIComponent(t.value),
                      "PUT"
                    )
                      .then((i) => {
                        i.ok ? r() : o();
                      })
                      .catch((i) => o)
                      .finally(() => (t.syncing = !1));
              })
            );
          }
          triggerReboot() {
            return new Promise((t, r) => {
              ur_api_mock
                ? this.delay(t)
                : this.getAuthenticatedFetch("/api/reboot", "GET")
                    .then((o) => {
                      o.ok ? t() : r();
                    })
                    .catch((o) => r);
            });
          }
          triggerReset(t) {
            return new Promise((r, o) => {
              ur_api_mock
                ? this.delay(r)
                : this.getAuthenticatedFetch(
                    "/api/config/reset" + (t ? "?clearNVS" : ""),
                    "GET"
                  )
                    .then((i) => {
                      i.ok ? r() : o();
                    })
                    .catch((i) => o);
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = F({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const hN = ["upFile"],
        pN = ["modalMD5Confirm"],
        gN = ["modalMD5OK"];
      let mN = (() => {
          class e {
            constructor(t) {
              (this.apiService = t),
                (this.upName = "firmware.bin"),
                (this.uploadProgress = 0),
                (this.uriProgress = 0),
                (this.locked = !1),
                (this.md5value = "");
            }
            updateUploadName() {
              this.upFile.nativeElement.files.length > 0 &&
                (this.upName = this.upFile.nativeElement.files[0].name);
            }
            openModal() {
              this.modalMD5Confirm.nativeElement.classList.add("is-active");
            }
            closeModal() {
              this.modalMD5Confirm.nativeElement.classList.remove("is-active");
            }
            resetForms() {
              (this.locked = !1),
                (this.uriProgress = 0),
                (this.uploadProgress = 0),
                this.closeModal();
            }
            lockForms() {
              this.locked = !0;
            }
            finalize(t) {
              200 == t.status
                ? alert("Firmware updated.")
                : alert("Error " + t.status + ": " + t.responseText),
                this.resetForms();
            }
            submitFile(t) {
              t.preventDefault();
              var r = new FormData(t.target);
              this.lockForms();
              var o = new FileReader(),
                i = this;
              (o.onload = (s) => {
                var a = new XMLHttpRequest();
                a.upload.addEventListener(
                  "progress",
                  (u) => {
                    u.lengthComputable &&
                      (this.uploadProgress = u.loaded / u.total);
                  },
                  !1
                ),
                  (a.onload = i.finalize.bind(i, a)),
                  a.open(
                    "POST",
                    this.apiService.makePath("/api/ota/passive"),
                    !0
                  ),
                  i.apiService.authenticateXhr(a),
                  a.setRequestHeader("x-UpdateHash", PD(s.target.result)),
                  a.send(r);
              }),
                o.readAsBinaryString(r.get("upload"));
            }
            submitURI(t) {
              t.preventDefault();
              var o = new FormData(t.target).get("uri");
              this.uriProgress = null;
              var i = new window.XMLHttpRequest();
              i.overrideMimeType("text/plain; charset=x-user-defined");
              var s = this;
              (i.onload = function () {
                if (200 == this.status) {
                  s.lockForms();
                  const a = PD(this.response);
                  (s.md5value = a),
                    (s.modalMD5OK.nativeElement.onclick = () => {
                      s.closeModal();
                      var u = new window.XMLHttpRequest();
                      (u.onload = s.finalize.bind(s, u)),
                        u.open(
                          "POST",
                          s.apiService.makePath("/api/ota/active"),
                          !0
                        ),
                        s.apiService.authenticateXhr(u),
                        u.send(a + ";" + o);
                    }),
                    s.openModal();
                } else alert("Error " + this.status + ": " + this.responseText);
              }),
                i.open("GET", o, !0),
                i.send(null);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(so));
            });
            static #t = (this.ɵcmp = En({
              type: e,
              selectors: [["app-update"]],
              viewQuery: function (r, o) {
                if ((1 & r && (Tn(hN, 5), Tn(pN, 5), Tn(gN, 5)), 2 & r)) {
                  let i;
                  hn((i = pn())) && (o.upFile = i.first),
                    hn((i = pn())) && (o.modalMD5Confirm = i.first),
                    hn((i = pn())) && (o.modalMD5OK = i.first);
                }
              },
              decls: 52,
              vars: 8,
              consts: [
                [1, "section"],
                [1, "container"],
                [1, "columns"],
                [1, "column", "is-half"],
                [1, "card"],
                [1, "card-header"],
                [1, "card-header-title"],
                [1, "card-content"],
                [3, "submit"],
                [1, "file", "has-name"],
                [1, "file-label"],
                [
                  "type",
                  "file",
                  "name",
                  "upload",
                  "required",
                  "",
                  1,
                  "file-input",
                  3,
                  "change",
                ],
                ["upFile", ""],
                [1, "file-cta"],
                [1, "file-name"],
                ["max", "1", 1, "progress", "is-danger", 3, "value"],
                [
                  "type",
                  "submit",
                  "value",
                  "Install Firmware",
                  1,
                  "button",
                  "is-danger",
                  "is-fullwidth",
                ],
                [
                  "type",
                  "text",
                  "name",
                  "uri",
                  "required",
                  "",
                  "placeholder",
                  "http://192.168.0.42/firmware.bin",
                  1,
                  "input",
                ],
                [1, "modal"],
                ["modalMD5Confirm", ""],
                [1, "modal-background"],
                [1, "modal-card"],
                [1, "modal-card-head"],
                [1, "modal-card-title"],
                [1, "modal-card-body"],
                [1, "is-family-code"],
                [1, "modal-card-foot"],
                ["type", "button", 1, "button", "is-danger"],
                ["modalMD5OK", ""],
                [
                  "aria-label",
                  "close",
                  1,
                  "modal-close",
                  "is-large",
                  3,
                  "click",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (E(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                    4,
                    "div",
                    4
                  )(5, "header", 5)(6, "p", 6),
                  H(7, "Update by Upload"),
                  w()(),
                  E(8, "div", 7)(9, "form", 8),
                  oe("submit", function (s) {
                    return o.submitFile(s);
                  }),
                  E(10, "div", 9)(11, "label", 10)(12, "input", 11, 12),
                  oe("change", function () {
                    return o.updateUploadName();
                  }),
                  w(),
                  E(14, "span", 13)(15, "span", 10),
                  H(16, " Choose a file... "),
                  w()(),
                  E(17, "span", 14),
                  H(18),
                  w()()(),
                  De(19, "br")(20, "progress", 15)(21, "input", 16),
                  w()()()(),
                  E(22, "div", 3)(23, "div", 4)(24, "header", 5)(25, "p", 6),
                  H(26, "Update by URI"),
                  w()(),
                  E(27, "div", 7)(28, "form", 8),
                  oe("submit", function (s) {
                    return o.submitURI(s);
                  }),
                  De(29, "input", 17)(30, "br")(31, "br")(32, "progress", 15)(
                    33,
                    "input",
                    16
                  ),
                  w()()()()()()(),
                  E(34, "div", 18, 19),
                  De(36, "div", 20),
                  E(37, "div", 21)(38, "header", 22)(39, "p", 23),
                  H(40, "Verify MD5-Checksum"),
                  w()(),
                  E(41, "section", 24),
                  H(
                    42,
                    " The MD5-Checksum of the firmware file is as follows: "
                  ),
                  E(43, "b", 25),
                  H(44),
                  w(),
                  De(45, "br"),
                  H(
                    46,
                    " In case this is not correct or when you are not sure, please abort the update now and upload the firmware manually. "
                  ),
                  w(),
                  E(47, "footer", 26)(48, "button", 27, 28),
                  H(50, "Continue"),
                  w()()(),
                  E(51, "button", 29),
                  oe("click", function () {
                    return o.resetForms();
                  }),
                  w()()),
                  2 & r &&
                    (b(12),
                    Wt("disabled", !!o.locked || null),
                    b(6),
                    Jn(" ", o.upName, " "),
                    b(2),
                    M("value", o.uploadProgress),
                    b(1),
                    Wt("disabled", !!o.locked || null),
                    b(8),
                    Wt("disabled", !!o.locked || null),
                    b(3),
                    M("value", o.uriProgress),
                    b(1),
                    Wt("disabled", !!o.locked || null),
                    b(11),
                    Ct(o.md5value));
              },
            }));
          }
          return e;
        })(),
        OD = (() => {
          class e {
            constructor(t) {
              (this.apiService = t),
                (this.cacheFields = new Map()),
                (this.cacheFieldsTTL = new Map());
            }
            getCachedFields() {
              return this.cacheFields;
            }
            getConfigCategories() {
              var t = this;
              return Pe(function* () {
                return (
                  (t.cacheCategories =
                    t.cacheCategories ||
                    (yield t.apiService.getConfigCategories())),
                  t.cacheCategories
                );
              })();
            }
            getConfigCategoryField(t) {
              var r = this;
              return Pe(function* () {
                return (
                  r.cacheFields.has(t) ||
                    (r.cacheFields.set(
                      t,
                      yield r.apiService.getConfigCategoryField(t)
                    ),
                    r.cacheFieldsTTL.set(t, Date.now() + 6e4)),
                  r.cacheFieldsTTL.get(t) < Date.now() &&
                    r.apiService.getConfigCategoryField(t).then((o) => {
                      r.cacheFields.get(t).value = o.value;
                    }),
                  r.cacheFields.get(t)
                );
              })();
            }
            clear() {
              this.cacheFields.clear(),
                this.cacheFieldsTTL.clear(),
                (this.cacheCategories = void 0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(R(so));
            });
            static #t = (this.ɵprov = F({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      const yN = ["control"],
        vN = ["app-config-category-field", ""];
      function DN(e, n) {
        1 & e && De(0, "progress", 3);
      }
      function _N(e, n) {
        if ((1 & e && (E(0, "article", 4)(1, "div", 5), H(2), w()()), 2 & e)) {
          const t = $();
          b(2), Jn("Error: ", t.error, "");
        }
      }
      function CN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 21),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function wN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 22),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function EN(e, n) {
        if ((1 & e && (E(0, "option", 27), H(1), w()), 2 & e)) {
          const t = n.$implicit;
          M("selected", $(4).field.value == t), b(1), Ct(t);
        }
      }
      function bN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "select", 25),
            oe("change", function (o) {
              return ye(t), ve($(3).onChange(o));
            }),
            B(1, EN, 2, 2, "option", 26),
            w();
        }
        if (2 & e) {
          const t = $(3);
          M("disabled", t.field.syncing ? 1 : null),
            b(1),
            M("ngForOf", t.field.help.split(","));
        }
      }
      function IN(e, n) {
        if (
          (1 & e && (E(0, "div", 23), B(1, bN, 2, 2, "select", 24), w()), 2 & e)
        ) {
          const t = $(2);
          b(1), M("ngIf", t.field.help);
        }
      }
      function SN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 28),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function MN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 29),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function TN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 30),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function AN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 31),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function RN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 32),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("checked", t.field.checked)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function xN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 33),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function NN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 33),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function PN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "input", 34),
            oe("change", function (o) {
              return ye(t), ve($(2).onChange(o));
            }),
            w();
        }
        if (2 & e) {
          const t = $(2);
          M("value", t.field.value)("disabled", t.field.syncing ? 1 : null);
        }
      }
      function FN(e, n) {
        if ((1 & e && (E(0, "p", 35), H(1), w()), 2 & e)) {
          const t = $(2);
          b(1), Ct(t.field.help);
        }
      }
      function ON(e, n) {
        if (
          (1 & e &&
            (Yn(0),
            E(1, "label", 6),
            H(2),
            w(),
            E(3, "div", 7, 8),
            Yn(5, 9),
            B(6, CN, 1, 2, "input", 10),
            B(7, wN, 1, 2, "input", 11),
            B(8, IN, 2, 1, "div", 12),
            B(9, SN, 1, 2, "input", 13),
            B(10, MN, 1, 2, "input", 14),
            B(11, TN, 1, 2, "input", 15),
            B(12, AN, 1, 2, "input", 16),
            B(13, RN, 1, 2, "input", 17),
            B(14, xN, 1, 2, "input", 18),
            B(15, NN, 1, 2, "input", 18),
            B(16, PN, 1, 2, "input", 19),
            Kn(),
            B(17, FN, 2, 1, "p", 20),
            w(),
            Kn()),
          2 & e)
        ) {
          const t = $();
          b(2),
            bl("", t.field.label, "", t.syncState, ""),
            b(1),
            wl("is-loading", t.field.syncing),
            b(2),
            M("ngSwitch", t.field.type),
            b(1),
            M("ngSwitchCase", t.types.STRING),
            b(1),
            M("ngSwitchCase", t.types.PASSWORD),
            b(1),
            M("ngSwitchCase", t.types.DROPDOWN),
            b(1),
            M("ngSwitchCase", t.types.ULONG),
            b(1),
            M("ngSwitchCase", t.types.INT),
            b(1),
            M("ngSwitchCase", t.types.SHORT),
            b(1),
            M("ngSwitchCase", t.types.RGB),
            b(1),
            M("ngSwitchCase", t.types.BOOL),
            b(1),
            M("ngSwitchCase", t.types.DOUBLE),
            b(1),
            M("ngSwitchCase", t.types.FLOAT),
            b(2),
            M("ngIf", t.field.help && t.field.type !== t.types.DROPDOWN);
        }
      }
      let kN = (() => {
        class e {
          constructor(t, r) {
            (this.apiService = t),
              (this.configCache = r),
              (this.types = We),
              (this.id = ""),
              (this.loading = !0),
              (this.error = ""),
              (this.syncState = ""),
              (this.syncStateClearTimeout = null),
              (this.control = null);
          }
          ngOnInit() {
            var t = this;
            return Pe(function* () {
              try {
                t.field = yield t.configCache.getConfigCategoryField(t.id);
              } catch (r) {
                t.error = `${r}`;
              }
              t.loading = !1;
            })();
          }
          onChange(t) {
            var r = this;
            return Pe(function* () {
              const o = t.target;
              if (o.value !== r.field.value) {
                r.syncStateClearTimeout &&
                  (window.clearTimeout(r.syncStateClearTimeout),
                  (r.syncStateClearTimeout = null)),
                  (r.syncState = ""),
                  (r.error = ""),
                  (r.field.value =
                    r.field.type === We.BOOL
                      ? o.checked
                        ? "true"
                        : "false"
                      : o.value);
                try {
                  yield r.sync(),
                    (r.syncState = " \u2705"),
                    (r.syncStateClearTimeout = window.setTimeout(() => {
                      (r.syncState = ""), (r.syncStateClearTimeout = null);
                    }, 3e3));
                } catch (i) {
                  console.error(
                    "Failed to sync field",
                    r.field.id,
                    "to value",
                    r.field.value,
                    "with error",
                    i
                  ),
                    (r.syncState = " \u274c"),
                    (r.error = `${i}`);
                }
              }
            })();
          }
          sync() {
            var t = this;
            return Pe(function* () {
              yield t.apiService.setConfigCategoryField(t.field);
            })();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(T(so), T(OD));
          });
          static #t = (this.ɵcmp = En({
            type: e,
            selectors: [["div", "app-config-category-field", ""]],
            viewQuery: function (r, o) {
              if ((1 & r && Tn(yN, 5), 2 & r)) {
                let i;
                hn((i = pn())) && (o.control = i.first);
              }
            },
            inputs: { id: "id" },
            attrs: vN,
            decls: 3,
            vars: 3,
            consts: [
              ["class", "progress is-primary", 4, "ngIf"],
              ["class", "message is-danger", 4, "ngIf"],
              [4, "ngIf"],
              [1, "progress", "is-primary"],
              [1, "message", "is-danger"],
              [1, "message-body"],
              [1, "label"],
              [1, "control"],
              ["control", ""],
              [3, "ngSwitch"],
              [
                "class",
                "input",
                "type",
                "text",
                "autocomplete",
                "off",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "password",
                "autocomplete",
                "off",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              ["class", "select", 4, "ngSwitchCase"],
              [
                "class",
                "input",
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "0",
                "max",
                "4294967295",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "-2147483647",
                "max",
                "2147483647",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "-32767",
                "max",
                "32767",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "color",
                "autocomplete",
                "off",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "checkbox",
                "type",
                "checkbox",
                "autocomplete",
                "off",
                3,
                "checked",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "number",
                "autocomplete",
                "off",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchCase",
              ],
              [
                "class",
                "input",
                "type",
                "text",
                "autocomplete",
                "off",
                "placeholder",
                "Unsupported type!",
                3,
                "value",
                "disabled",
                "change",
                4,
                "ngSwitchDefault",
              ],
              ["class", "help", 4, "ngIf"],
              [
                "type",
                "text",
                "autocomplete",
                "off",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "password",
                "autocomplete",
                "off",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [1, "select"],
              ["class", "is-fullwidth", 3, "disabled", "change", 4, "ngIf"],
              [1, "is-fullwidth", 3, "disabled", "change"],
              [3, "selected", 4, "ngFor", "ngForOf"],
              [3, "selected"],
              [
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "0",
                "max",
                "4294967295",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "-2147483647",
                "max",
                "2147483647",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "number",
                "autocomplete",
                "off",
                "min",
                "-32767",
                "max",
                "32767",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "color",
                "autocomplete",
                "off",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "checkbox",
                "autocomplete",
                "off",
                1,
                "checkbox",
                3,
                "checked",
                "disabled",
                "change",
              ],
              [
                "type",
                "number",
                "autocomplete",
                "off",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [
                "type",
                "text",
                "autocomplete",
                "off",
                "placeholder",
                "Unsupported type!",
                1,
                "input",
                3,
                "value",
                "disabled",
                "change",
              ],
              [1, "help"],
            ],
            template: function (r, o) {
              1 & r &&
                (B(0, DN, 1, 0, "progress", 0),
                B(1, _N, 3, 1, "article", 1),
                B(2, ON, 18, 16, "ng-container", 2)),
                2 & r &&
                  (M("ngIf", o.loading),
                  b(1),
                  M("ngIf", o.error),
                  b(1),
                  M("ngIf", o.field));
            },
            dependencies: [ti, ni, Ys, Gy, Wy],
          }));
        }
        return e;
      })();
      const LN = ["category", ""];
      function $N(e, n) {
        1 & e && De(0, "div", 6), 2 & e && M("id", n.$implicit);
      }
      let jN = (() => {
        class e {
          constructor() {
            (this.category = null), (this.name = ""), (this.fieldIds = []);
          }
          ngOnInit() {
            var t = this;
            return Pe(function* () {
              (t.name = t.category.name), (t.fieldIds = t.category.keys);
            })();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = En({
            type: e,
            selectors: [["app-config-category", "category", ""]],
            inputs: { category: "category" },
            attrs: LN,
            decls: 7,
            vars: 2,
            consts: [
              [1, "card"],
              [1, "card-header"],
              [1, "card-header-title"],
              [1, "card-content"],
              [1, "content"],
              [
                "class",
                "field",
                "app-config-category-field",
                "",
                3,
                "id",
                4,
                "ngFor",
                "ngForOf",
              ],
              ["app-config-category-field", "", 1, "field", 3, "id"],
            ],
            template: function (r, o) {
              1 & r &&
                (E(0, "div", 0)(1, "header", 1)(2, "div", 2),
                H(3),
                w()(),
                E(4, "div", 3)(5, "div", 4),
                B(6, $N, 1, 1, "div", 5),
                w()()()),
                2 & r && (b(3), Ct(o.name), b(3), M("ngForOf", o.fieldIds));
            },
            dependencies: [ti, kN],
          }));
        }
        return e;
      })();
      function VN(e, n) {
        1 & e && De(0, "progress", 8);
      }
      function UN(e, n) {
        if ((1 & e && (E(0, "article", 9)(1, "div", 10), H(2), w()()), 2 & e)) {
          const t = $();
          b(2), Jn("Error: ", t.error, "");
        }
      }
      function BN(e, n) {
        if (
          (1 & e && (E(0, "div", 15), De(1, "app-config-category", 16), w()),
          2 & e)
        ) {
          const t = $().$implicit;
          b(1), M("category", t);
        }
      }
      function HN(e, n) {
        if ((1 & e && (Yn(0), B(1, BN, 2, 1, "div", 14), Kn()), 2 & e)) {
          const t = n.index,
            r = $(2).index;
          b(1), M("ngIf", t >= r && t < r + 3);
        }
      }
      function zN(e, n) {
        if (
          (1 & e && (E(0, "div", 13), B(1, HN, 2, 1, "ng-container", 11), w()),
          2 & e)
        ) {
          const t = $(3);
          b(1), M("ngForOf", t.categories);
        }
      }
      function GN(e, n) {
        if ((1 & e && (Yn(0), B(1, zN, 2, 1, "div", 12), Kn()), 2 & e)) {
          const t = n.index;
          b(1), M("ngIf", t % 3 == 0);
        }
      }
      function WN(e, n) {
        if (
          (1 & e && (E(0, "div"), B(1, GN, 2, 1, "ng-container", 11), w()),
          2 & e)
        ) {
          const t = $();
          b(1), M("ngForOf", t.categories);
        }
      }
      function qN(e, n) {
        1 & e && De(0, "progress", 17), 2 & e && M("value", $().importProgress);
      }
      function QN(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "div", 18)(1, "input", 19, 20),
            oe("change", function (o) {
              return ye(t), ve($().import(o));
            }),
            w(),
            E(3, "button", 21),
            oe("click", function () {
              return (
                ye(t),
                ve(
                  (function Up(e) {
                    return (function mr(e, n) {
                      return e[n];
                    })(
                      (function wC() {
                        return V.lFrame.contextLView;
                      })(),
                      ce + e
                    );
                  })(2).click()
                )
              );
            }),
            H(4, "Import"),
            w(),
            E(5, "button", 21),
            oe("click", function () {
              return ye(t), ve($().export());
            }),
            H(6, "Export"),
            w(),
            E(7, "button", 22),
            oe("click", function () {
              return ye(t), ve($().reset());
            }),
            H(8, "Reset Configuration"),
            w()();
        }
        if (2 & e) {
          const t = $();
          b(3),
            Wt("disabled", t.importProgress),
            b(2),
            Wt("disabled", t.importProgress),
            b(2),
            Wt("disabled", t.importProgress);
        }
      }
      function YN(e, n) {
        1 & e && De(0, "progress", 9);
      }
      function KN(e, n) {
        if (
          (1 & e && (E(0, "article", 10)(1, "div", 11), H(2), w()()), 2 & e)
        ) {
          const t = $();
          b(2), Jn("Error: ", t.error, "");
        }
      }
      function XN(e, n) {
        if (
          (1 & e &&
            (E(0, "div", 12)(1, "div", 13)(2, "span", 14),
            H(3),
            w(),
            E(4, "span", 15),
            H(5),
            w()()()),
          2 & e)
        ) {
          const t = n.$implicit;
          b(3), Ct(t.name), b(2), Ct(t.value);
        }
      }
      function JN(e, n) {
        if ((1 & e && (E(0, "div", 6), B(1, XN, 6, 2, "div", 7), w()), 2 & e)) {
          const t = $();
          b(1), M("ngForOf", t.tagsApi);
        }
      }
      function eP(e, n) {
        if (
          (1 & e &&
            (E(0, "div", 12)(1, "div", 13)(2, "span", 14),
            H(3),
            w(),
            E(4, "span", 15),
            H(5),
            w()()()),
          2 & e)
        ) {
          const t = n.$implicit;
          b(3), Ct(t.name), b(2), Ct(t.value);
        }
      }
      function tP(e, n) {
        1 & e && De(0, "progress", 9);
      }
      function nP(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "div", 16)(1, "button", 17),
            oe("click", function () {
              return ye(t), ve($().reboot());
            }),
            H(2, "Reboot Watch"),
            w(),
            E(3, "button", 18),
            oe("click", function () {
              return ye(t), ve($().reset(!1));
            }),
            H(4, "Reset Configuration"),
            w(),
            E(5, "button", 18),
            oe("click", function () {
              return ye(t), ve($().reset(!0));
            }),
            H(6, "Reset NVS"),
            w()();
        }
      }
      const rP = [
        { path: "", redirectTo: "/config", pathMatch: "full" },
        {
          path: "config",
          component: (() => {
            class e {
              constructor(t, r) {
                (this.apiService = t),
                  (this.configCache = r),
                  (this.error = ""),
                  (this.loading = !0),
                  (this.importProgress = null);
              }
              ngOnInit() {
                var t = this;
                return Pe(function* () {
                  yield t.update();
                })();
              }
              update() {
                var t = this;
                return Pe(function* () {
                  t.loading = !0;
                  try {
                    t.categories = yield t.configCache.getConfigCategories();
                  } catch (r) {
                    t.error = `${r}`;
                  }
                  t.loading = !1;
                })();
              }
              reset() {
                var t = this;
                return Pe(function* () {
                  yield t.apiService.triggerReset(!1),
                    t.configCache.clear(),
                    yield t.update();
                })();
              }
              export() {
                var t = this;
                return Pe(function* () {
                  let r = {};
                  for (let [a, u] of t.configCache.getCachedFields())
                    r[a] = u.value;
                  let o = new Blob([JSON.stringify(r, null, 2)], {
                      type: "application/json",
                    }),
                    i = window.URL.createObjectURL(o),
                    s = document.createElement("a");
                  (s.href = i),
                    (s.download = "config.json"),
                    s.click(),
                    window.URL.revokeObjectURL(i);
                })();
              }
              import(t) {
                var r = this;
                return Pe(function* () {
                  let o = t.target;
                  if (null === o.files || 0 === o.files.length) return;
                  let i = o.files[0],
                    s = new FileReader();
                  (s.onload = (function () {
                    var a = Pe(function* (u) {
                      let l = JSON.parse(u.target.result);
                      r.importProgress = 0;
                      let c = 0,
                        d = (function () {
                          var f = Pe(function* (g) {
                            let p = yield r.configCache.getConfigCategoryField(
                              g
                            );
                            (p.value = l[g]),
                              yield r.apiService.setConfigCategoryField(p),
                              c++,
                              (r.importProgress = c / Object.keys(l).length);
                          });
                          return function (p) {
                            return f.apply(this, arguments);
                          };
                        })(),
                        h = [];
                      for (let f in l) h.push(d(f));
                      yield Promise.all(h), (r.importProgress = null);
                    });
                    return function (u) {
                      return a.apply(this, arguments);
                    };
                  })()),
                    s.readAsText(i);
                })();
              }
              static #e = (this.ɵfac = function (r) {
                return new (r || e)(T(so), T(OD));
              });
              static #t = (this.ɵcmp = En({
                type: e,
                selectors: [["app-config"]],
                decls: 11,
                vars: 5,
                consts: [
                  [1, "section"],
                  [1, "container"],
                  [1, "heading"],
                  ["class", "progress is-large is-primary", 4, "ngIf"],
                  ["class", "message is-danger", 4, "ngIf"],
                  [4, "ngIf"],
                  [
                    "class",
                    "progress is-primary",
                    "min",
                    "0",
                    "max",
                    "1",
                    3,
                    "value",
                    4,
                    "ngIf",
                  ],
                  ["class", "buttons", 4, "ngIf"],
                  [1, "progress", "is-large", "is-primary"],
                  [1, "message", "is-danger"],
                  [1, "message-body"],
                  [4, "ngFor", "ngForOf"],
                  ["class", "columns", 4, "ngIf"],
                  [1, "columns"],
                  ["class", "column is-one-third", 4, "ngIf"],
                  [1, "column", "is-one-third"],
                  [3, "category"],
                  [
                    "min",
                    "0",
                    "max",
                    "1",
                    1,
                    "progress",
                    "is-primary",
                    3,
                    "value",
                  ],
                  [1, "buttons"],
                  ["id", "importInput", "type", "file", 3, "change"],
                  ["importInput", ""],
                  [1, "button", 3, "click"],
                  [1, "button", "is-danger", 3, "click"],
                ],
                template: function (r, o) {
                  1 & r &&
                    (E(0, "section", 0)(1, "div", 1)(2, "p", 2),
                    H(3, "Configuration"),
                    w(),
                    B(4, VN, 1, 0, "progress", 3),
                    B(5, UN, 3, 1, "article", 4),
                    B(6, WN, 2, 1, "div", 5),
                    w(),
                    De(7, "br"),
                    E(8, "div", 1),
                    B(9, qN, 1, 1, "progress", 6),
                    B(10, QN, 9, 3, "div", 7),
                    w()()),
                    2 & r &&
                      (b(4),
                      M("ngIf", o.loading),
                      b(1),
                      M("ngIf", o.error),
                      b(1),
                      M("ngIf", o.categories),
                      b(3),
                      M("ngIf", null !== o.importProgress),
                      b(1),
                      M("ngIf", !o.loading));
                },
                dependencies: [ti, ni, jN],
                styles: ["#importInput[_ngcontent-%COMP%]{display:none}"],
              }));
            }
            return e;
          })(),
        },
        { path: "update", component: mN },
        {
          path: "info",
          component: (() => {
            class e {
              constructor(t) {
                (this.apiService = t),
                  (this.tagsUI = []),
                  (this.tagsLoading = !0),
                  (this.actionLoading = !1),
                  (this.error = "");
              }
              ngOnInit() {
                var t = this;
                return Pe(function* () {
                  t.tagsUI.push({ name: "Version", value: "1.0.2" }),
                    t.tagsUI.push({
                      name: "Git Commit Hash",
                      value: "gbf563c5-dirty",
                    });
                  try {
                    t.tagsApi = yield t.apiService.getBuildFlags();
                  } catch (r) {
                    t.error = `${r}`;
                  }
                  t.tagsLoading = !1;
                })();
              }
              reboot() {
                var t = this;
                return Pe(function* () {
                  (t.actionLoading = !0),
                    yield t.apiService.triggerReboot(),
                    (t.actionLoading = !1);
                })();
              }
              reset(t) {
                var r = this;
                return Pe(function* () {
                  (r.actionLoading = !0),
                    yield r.apiService.triggerReset(t),
                    (r.actionLoading = !1);
                })();
              }
              static #e = (this.ɵfac = function (r) {
                return new (r || e)(T(so));
              });
              static #t = (this.ɵcmp = En({
                type: e,
                selectors: [["app-info"]],
                decls: 19,
                vars: 6,
                consts: [
                  [1, "section"],
                  [1, "container"],
                  [1, "heading"],
                  ["class", "progress is-large is-primary", 4, "ngIf"],
                  ["class", "message is-danger", 4, "ngIf"],
                  [
                    "id",
                    "mtags",
                    "class",
                    "field is-grouped is-grouped-multiline",
                    4,
                    "ngIf",
                  ],
                  [
                    "id",
                    "mtags",
                    1,
                    "field",
                    "is-grouped",
                    "is-grouped-multiline",
                  ],
                  ["class", "control", 4, "ngFor", "ngForOf"],
                  ["class", "buttons", 4, "ngIf"],
                  [1, "progress", "is-large", "is-primary"],
                  [1, "message", "is-danger"],
                  [1, "message-body"],
                  [1, "control"],
                  [1, "tags", "has-addons"],
                  [1, "tag", "is-dark"],
                  [1, "tag", "is-primary"],
                  [1, "buttons"],
                  [1, "button", "is-warning", 3, "click"],
                  [1, "button", "is-danger", 3, "click"],
                ],
                template: function (r, o) {
                  1 & r &&
                    (E(0, "section", 0)(1, "div", 1)(2, "p", 2),
                    H(3, "OSW-API Information"),
                    w(),
                    B(4, YN, 1, 0, "progress", 3),
                    B(5, KN, 3, 1, "article", 4),
                    B(6, JN, 2, 1, "div", 5),
                    w(),
                    De(7, "br"),
                    E(8, "div", 1)(9, "p", 2),
                    H(10, "OSW-UI Information"),
                    w(),
                    E(11, "div", 6),
                    B(12, eP, 6, 2, "div", 7),
                    w()(),
                    De(13, "br"),
                    E(14, "div", 1)(15, "p", 2),
                    H(16, "OSW Actions"),
                    w(),
                    B(17, tP, 1, 0, "progress", 3),
                    B(18, nP, 7, 0, "div", 8),
                    w()()),
                    2 & r &&
                      (b(4),
                      M("ngIf", o.tagsLoading),
                      b(1),
                      M("ngIf", o.error),
                      b(1),
                      M("ngIf", o.tagsApi),
                      b(6),
                      M("ngForOf", o.tagsUI),
                      b(5),
                      M("ngIf", o.actionLoading),
                      b(1),
                      M("ngIf", !o.actionLoading));
                },
                dependencies: [ti, ni],
              }));
            }
            return e;
          })(),
        },
      ];
      let oP = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Vn({ type: e }));
          static #n = (this.ɵinj = wn({ imports: [xD.forRoot(rP), xD] }));
        }
        return e;
      })();
      const iP = ["password"],
        sP = ["menuBurger"],
        aP = ["menuMain"];
      function uP(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "a", 17),
            oe("click", function () {
              return ye(t), ve($().logout());
            }),
            H(1, "Logout"),
            w();
        }
      }
      function lP(e, n) {
        if (
          (1 & e &&
            (E(0, "article", 18)(1, "div", 19),
            H(
              2,
              "Whoops, this interface was developed for an api endpoint with version "
            ),
            E(3, "b"),
            H(4),
            w(),
            H(
              5,
              " but the currently connected watch provides an api endpoint with version "
            ),
            E(6, "b"),
            H(7),
            w(),
            H(
              8,
              ". Expect some features not working or information being unavailable! Try to update the firmware or to clear your browsers cache to resolve this issue."
            ),
            w()()),
          2 & e)
        ) {
          const t = $();
          b(4), Ct(t.expectedApiVersion), b(3), Ct(t.remoteApiVersion);
        }
      }
      function cP(e, n) {
        1 & e && De(0, "router-outlet");
      }
      function dP(e, n) {
        1 & e && (E(0, "p", 27), H(1, "Authentication"), w());
      }
      function fP(e, n) {
        1 & e && (E(0, "p", 27), H(1, "Logging in..."), w());
      }
      function hP(e, n) {
        1 & e && De(0, "progress", 28);
      }
      function pP(e, n) {
        if (1 & e) {
          const t = He();
          E(0, "div", 29)(1, "form", 30),
            oe("submit", function (o) {
              return ye(t), ve($(2).loginEvent(o));
            }),
            De(2, "input", 31)(3, "br")(4, "input", 32)(5, "br")(6, "br")(
              7,
              "input",
              33
            ),
            w()();
        }
      }
      function gP(e, n) {
        if (
          (1 & e &&
            (E(0, "div", 20)(1, "header", 21),
            B(2, dP, 2, 0, "p", 22),
            B(3, fP, 2, 0, "p", 22),
            w(),
            E(4, "div", 23)(5, "div", 24),
            B(6, hP, 1, 0, "progress", 25),
            B(7, pP, 8, 0, "div", 26),
            w()()()),
          2 & e)
        ) {
          const t = $();
          b(2),
            M("ngIf", !1 === t.isAuthenticated),
            b(1),
            M("ngIf", null === t.isAuthenticated),
            b(3),
            M("ngIf", null === t.isAuthenticated),
            b(1),
            M("ngIf", !1 === t.isAuthenticated);
        }
      }
      const mP = function () {
          return ["/"];
        },
        yP = function () {
          return ["/config"];
        },
        vP = function () {
          return ["/update"];
        },
        DP = function () {
          return ["/info"];
        };
      let _P = (() => {
          class e {
            constructor(t) {
              this.api = t;
            }
            get isAuthenticated() {
              return this.api.hasToken;
            }
            get expectedApiVersion() {
              return this.api.getExpectedApiVersion;
            }
            get remoteApiVersion() {
              return this.api.getRemoteApiVersion;
            }
            loginEvent(t) {
              t.preventDefault();
              var r = new FormData(t.target);
              this.api.setAuthentication(r.get("username"), r.get("password"));
            }
            logout() {
              this.api.clearToken();
            }
            toggleMenu() {
              this.menuBurger.nativeElement.classList.toggle("is-active"),
                this.menuMain.nativeElement.classList.toggle("is-active");
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(T(so));
            });
            static #t = (this.ɵcmp = En({
              type: e,
              selectors: [["app-root"]],
              viewQuery: function (r, o) {
                if ((1 & r && (Tn(iP, 5), Tn(sP, 5), Tn(aP, 5)), 2 & r)) {
                  let i;
                  hn((i = pn())) && (o.password = i.first),
                    hn((i = pn())) && (o.menuBurger = i.first),
                    hn((i = pn())) && (o.menuMain = i.first);
                }
              },
              decls: 26,
              vars: 12,
              consts: [
                ["role", "navigation", 1, "navbar"],
                [1, "navbar-brand"],
                [1, "navbar-item", 3, "routerLink"],
                [
                  1,
                  "is-unselectable",
                  "is-family-monospace",
                  "has-text-weight-semibold",
                ],
                ["role", "button", 1, "navbar-burger", 3, "click"],
                ["menuBurger", ""],
                ["aria-hidden", "true"],
                [1, "navbar-menu"],
                ["menuMain", ""],
                [1, "navbar-start"],
                [1, "navbar-end"],
                [1, "navbar-item"],
                [1, "buttons"],
                ["class", "button is-light", 3, "click", 4, "ngIf"],
                ["class", "message is-warning", 4, "ngIf"],
                [4, "ngIf"],
                ["class", "centeralign card", 4, "ngIf"],
                [1, "button", "is-light", 3, "click"],
                [1, "message", "is-warning"],
                [1, "message-body"],
                [1, "centeralign", "card"],
                [1, "card-header"],
                ["class", "card-header-title", 4, "ngIf"],
                [1, "card-content"],
                [1, "content"],
                ["class", "progress is-small is-primary", 4, "ngIf"],
                ["class", "control", 4, "ngIf"],
                [1, "card-header-title"],
                [1, "progress", "is-small", "is-primary"],
                [1, "control"],
                [3, "submit"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "username",
                  "name",
                  "username",
                  "required",
                  "",
                  "autocomplete",
                  "off",
                  1,
                  "input",
                ],
                [
                  "type",
                  "password",
                  "placeholder",
                  "password",
                  "name",
                  "password",
                  "required",
                  "",
                  "autocomplete",
                  "off",
                  1,
                  "input",
                ],
                [
                  "type",
                  "submit",
                  "value",
                  "Login",
                  1,
                  "button",
                  "is-primary",
                  "is-fullwidth",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (E(0, "nav", 0)(1, "div", 1)(2, "a", 2)(3, "span", 3),
                  H(4, "Open-Smartwatch Web"),
                  w()(),
                  E(5, "a", 4, 5),
                  oe("click", function () {
                    return o.toggleMenu();
                  }),
                  De(7, "span", 6)(8, "span", 6)(9, "span", 6),
                  w()(),
                  E(10, "div", 7, 8)(12, "div", 9)(13, "a", 2),
                  H(14, "Config"),
                  w(),
                  E(15, "a", 2),
                  H(16, "Update"),
                  w(),
                  E(17, "a", 2),
                  H(18, "Info"),
                  w()(),
                  E(19, "div", 10)(20, "div", 11)(21, "div", 12),
                  B(22, uP, 2, 0, "a", 13),
                  w()()()()(),
                  B(23, lP, 9, 2, "article", 14),
                  B(24, cP, 1, 0, "router-outlet", 15),
                  B(25, gP, 8, 4, "div", 16)),
                  2 & r &&
                    (b(2),
                    M("routerLink", qo(8, mP)),
                    b(11),
                    M("routerLink", qo(9, yP)),
                    b(2),
                    M("routerLink", qo(10, vP)),
                    b(2),
                    M("routerLink", qo(11, DP)),
                    b(5),
                    M("ngIf", !0 === o.isAuthenticated),
                    b(1),
                    M("ngIf", o.expectedApiVersion != o.remoteApiVersion),
                    b(1),
                    M("ngIf", !0 === o.isAuthenticated),
                    b(1),
                    M("ngIf", !0 !== o.isAuthenticated));
              },
              dependencies: [ni, Xc, ba],
              styles: [
                "div.centeralign[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}",
              ],
            }));
          }
          return e;
        })(),
        CP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Vn({ type: e, bootstrap: [_P] }));
            static #n = (this.ɵinj = wn({ imports: [wA, oP] }));
          }
          return e;
        })();
      CA()
        .bootstrapModule(CP)
        .catch((e) => console.error(e));
    },
  },
  (se) => {
    se((se.s = 179));
  },
]);
