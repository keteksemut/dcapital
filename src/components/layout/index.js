import { useStore } from "@/lib/store/useStore";
import { useFrame } from "@darkroom.engineering/hamo";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Header } from "../header";
import { Footer } from "../footer";
import { SeoHead } from "../seo-head";
import { Scrollbar } from "../scrollbar";
import Lenis from "@studio-freight/lenis";
import useMeasure from "react-use-measure";
import dynamic from "next/dynamic";
import st from "./layout.module.css";

const Noise = dynamic(() => import('../noise').then(({ Noise }) => Noise), { ssr: false });

export default function Layout({ metadata = {
    title: "Drive Capital",
    description: "Drive Capital Website",
    image: {
        url: ""
    },
    keywords: ""
}, children, theme = "dark", className, headerAppear = {
    use: !1,
    state: !1
}, scroll = !0, isoLogo = !1, noise = !0 }) {
    const [h, f] = useStore(a => [a.lenis, a.setLenis]),
        y = useStore(a => a.setHeaderHeight),
        u = useRouter(),
        [G, { height }] = useMeasure({ debounce: 100 }),
        [D, S] = useState(u.asPath.includes("#") ? "#" + u.asPath.split("#").pop() : void 0);

    useEffect(() => {
        let a = new Lenis({
            duration: 1.2,
            easing: a => Math.min(1, 1.001 - Math.pow(2, -10 * a)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !0
        }), i = window.location.pathname;

        return a.pathname = i,
            window.lenis = a,
            f(a),
            () => { a.destroy() }
    }, []);

    useEffect(() => {
        h && (scroll ? h.start() : setTimeout(() => { h.stop() }, 0))
    }, [h, scroll]);

    const [B] = useState(u.pathname),
        [A, V] = useState(!1);

    useEffect(() => {
        u.events.on("routeChangeStart", function (a) {
            a !== B && V(!0)
        })
    }, [u, B]);

    useEffect(() => {
        y(height)
    }, [height]);

    useEffect(() => {
        if (h && D && !A && c) {
            let a = document.querySelector(D);
            h.scrollTo(a, {
                offset: -1.1 * height
            })
        }
    }, [h, D, height, A, scroll]);

    useEffect(() => {
        function a(a) {
            a.preventDefault();
            let i = a.currentTarget
                , t = i.href.split("#").pop();
            S("#" + t),
                setTimeout(() => {
                    window.location.hash = t
                }, 0)
        }
        let i = [...document.querySelectorAll("[href]")].filter(a => a.href.includes(u.pathname + "#"));
        return i.forEach(i => {
            i.addEventListener("click", a, !1)
        }
        ),
            () => {
                i.forEach(i => {
                    i.removeEventListener("click", a, !1)
                })
            }
    }, []);

    useFrame(a => {
        null == h || h.raf(a)
    }, []);

    return (
        <>
            <SeoHead {...metadata} />
            <div className={`theme-${theme} ${st.layout} ${className}`}>
                <Scrollbar />
                <Header isoLogo={isoLogo} className={`theme-${theme}`} appear={headerAppear} ref={G} />
                <main className={st.main}>{children}</main>
                <Footer className={`theme-${theme}`} />
            </div>
            {noise && <Noise />}
        </>
    )
};