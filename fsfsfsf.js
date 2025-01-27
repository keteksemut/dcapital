function T(e) {
    let { Component: Cmp, pageProps: n } = e
        , r = (0,
            p.useRef)()
        , [i] = (0,
            g.o)(e => [e.setOverflow], _.X)
        , [s, a] = (0,
            p.useState)([])
        , o = (0,
            p.useRef)()
        , u = (0,
            p.useRef)();
    function l() {
        i(!0),
            window.scrollTo(0, 0),
            o.current = null,
            u.current = null,
            a(e => e.length > 1 ? e.slice(1) : e)
    }
    useEffect(() => {
        // Initialize a state variable (likely a boolean)
        i(false);

        // Update the 'a' state with a new function 
        a((e) => {
            // Get the last route from the previous routes array
            const lastRoute = e.at(-1);

            // Check if the last route exists, has the correct Component, 
            // and has the same key as the current route
            if (
                lastRoute &&
                lastRoute.Component === Cmp &&
                lastRoute.pageProps?.key === (n?.key)
            ) {
                // If the route is the same, return the previous routes array
                return e;
            } else {
                // If the route is different, add the new route to the array
                return [...e, { Component: Cmp, pageProps: n }];
            }
        });
    }, [Cmp, n]);

    const c = useMediaQuery("(max-width: 800px)");
    
    useEffect(() => {
        if (c) {
            l();
            if (s.length < 2) {
                return;
            }
        }

        const p = s[0]?.Component?.render?.displayName;
        const m = s[1]?.Component?.render?.displayName;
        const g = o.current;
        const _ = u.current;
        const y = g?.props;
        const T = g?.animateOut;
        const x = _?.animateIn;

        if (x) {
            if (T) {
                if (p !== m) {
                    Promise.all([
                        g?.animateOut({
                            from: p,
                            to: m,
                        }),
                        _?.animateIn({
                            from: p,
                            to: m,
                            props: y,
                        }),
                    ]).then(() => {
                        l();
                    });
                } else {
                    let e = s[1]?.pageProps?.theme;
                    r.current.className = `${st.curtain} theme-${e}`;
                    new gsap.timeline()
                        .to(r.current, {
                            scaleY: 1,
                            transformOrigin: "bottom",
                            duration: 1.2,
                            ease: "expo.out",
                        })
                        .call(() => {
                            l();
                        })
                        .set(
                            r.current,
                            {
                                scaleY: 0,
                            },
                            "+=0.25"
                        );
                }
            }
        }
    }, [s, c]);
        (0, h.jsxs)(h.Fragment, {
            children: [
                (0, h.jsx)("div", {
                    className: b().curtain,
                    ref: r,
                }),
                (0, h.jsx)(m, {
                    children: (0, h.jsx)(Cmp, {
                        ...n,
                    }),
                }),
                s.map((e, t) => {
                    var n;
                    let { Component: r, pageProps: i } = e;
                    return (0, h.jsx)(
                        "div",
                        {
                            style:
                                1 === t
                                    ? {
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        zIndex: 1,
                                        width: "100%",
                                    }
                                    : {
                                        position: "relative",
                                        zIndex: 2,
                                    },
                            children: (0, h.jsx)(r, {
                                ...i,
                                visible: s.length <= 1,
                                innerRef: (e) => (0 === t ? (o.current = e) : (u.current = e)),
                            }),
                        },
                        (null == r
                            ? void 0
                            : null === (n = r.render) || void 0 === n
                                ? void 0
                                : n.displayName) + (null == i ? void 0 : i.key) || t,
                    );
                }),
            ],
        });
}