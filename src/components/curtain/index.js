import { useStore } from "@/lib/store/useStore";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import { ServerOnly } from "../isomorphic";
import { isItEqual } from "@/lib/store/isItEqual";
import gsap from 'gsap';
import st from './curtain.module.css'

export function Curtain({ Component, pageProps }) {
    const r = useRef();
    const [i] = useStore((state) => [state.setOverflow], isItEqual);
    const [s, a] = useState([]);
    const o = useRef();
    const u = useRef();
    const c = useMediaQuery("(max-width: 800px)");

    function l() {
        window.scrollTo(0, 0);
        o.current = null;
        u.current = null;
        a(e => e.length > 1 ? e.slice(-(e.length - 1)) : e)
    };

    useEffect(() => {
        i(false);
        a(e => {
            return e[e.length - 1]?.Component === Component && e[e.length - 1]?.pageProps?.key === pageProps?.key
                ? e : [...e, {
                    Component: Component,
                    pageProps: pageProps
                }];
        });
    }, [Component, pageProps]);

    useEffect(() => {
        if (c && l(), s.length <= 1) return;

        let p = s[0]?.Component?.render?.displayName,
            m = s[1]?.Component?.render?.displayName,
            g = o.current,
            _ = u.current,
            y = g?.props,
            T = g?.animateOut,
            x = _?.animateIn;

        if (x && T && p !== m) {
            Promise.all([
                g?.animateOut({ from: p, to: m }),
                _?.animateIn({ from: p, to: m, props: y })
            ]).then(() => {
                l();
            });
        } else {
            let e = s[1]?.pageProps?.theme;
            r.current.className = `${st.curtain} theme-${e}`;
            new gsap.timeline().to(r.current, {
                scaleY: 1,
                transformOrigin: "bottom",
                duration: 1.2,
                ease: "expo.out"
            }).call(() => {
                l();
            }).set(r.current, {
                scaleY: 0
            }, "+=0.25");
        }
    }, [s, c]);

    return (
        <>
            <div className={st.curtain} ref={r} />
            <ServerOnly>
                <Component {...pageProps} />
            </ServerOnly>
            {s.map((e, t) => {
                const { Component: R, pageProps: i } = e;
                return (
                    <div
                        key={(R?.render?.displayName ?? "") + (i?.key ?? t)}
                        style={
                            t === 1
                                ? {
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                    width: "100%"
                                }
                                : {
                                    position: "relative",
                                    zIndex: 2
                                }
                        }
                    >
                        <R
                            {...i}
                            visible={s.length <= 1}
                            innerRef={e => (t === 0 ? (o.current = e) : (u.current = e))}
                        />
                    </div>
                );
            })}
        </>
    );
}