export const isItEqual = function(e, t) {
    if (Object.is(e, t))
        return !0;
    if ("object" != typeof e || null === e || "object" != typeof t || null === t)
        return !1;
    if (e instanceof Map && t instanceof Map) {
        if (e.size !== t.size)
            return !1;
        for (let[n,r] of e)
            if (!Object.is(r, t.get(n)))
                return !1;
        return !0
    }
    if (e instanceof Set && t instanceof Set) {
        if (e.size !== t.size)
            return !1;
        for (let n of e)
            if (!t.has(n))
                return !1;
        return !0
    }
    let n = Object.keys(e);
    if (n.length !== Object.keys(t).length)
        return !1;
    for (let r = 0; r < n.length; r++)
        if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Object.is(e[n[r]], t[n[r]]))
        return !1;
    return !0
  }