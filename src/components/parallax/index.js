import gsap from "gsap";
import { useRef, useEffect } from "react";
import { useWindowSize } from "react-use";

export function Parallax({ className, children, speed = 1, id = "parallax", position }) {
    const s = useRef()
        , a = useRef()
        , f = useRef()
        , { width } = useWindowSize();

    useEffect(() => {
        const e = width * speed * .1
            , r = gsap.matchMedia();
        return f.current = gsap.timeline({
            scrollTrigger: {
                id: id,
                trigger: "top" === position ? document.body : s.current,
                scrub: !0,
                start: "top" === position ? "top top" : "top bottom",
                end: "top" === position ? "+=100%" : "bottom top"
            }
        }).fromTo(a.current, {
            y: "top" === position ? 0 : -e
        }, {
            y: e,
            ease: "none"
        }),
            r.add({
                reduceMotion: "(prefers-reduced-motion: reduce)"
            }, e => {
                let { reduceMotion: r } = e.conditions;
                if (r) {
                    var t, n;
                    null == f || null === (t = f.current) || void 0 === t || t.from(a.current, {
                        y: 0
                    }),
                        null == f || null === (n = f.current) || void 0 === n || n.kill()
                }
            }
            ),
            () => {
                var e;
                null == f || null === (e = f.current) || void 0 === e || e.kill()
            }
    }, [id, speed, position, width]);

    return (
        <div ref={s}>
            <div ref={a} className={className}>
                {children}
            </div>
        </div>
    )
};