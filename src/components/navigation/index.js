import { useStore } from "@/lib/store/useStore";
import { isItEqual } from "@/lib/store/isItEqual";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Link } from "../link";
import dynamic from "next/dynamic";
import st from "./navigation.module.css";

const Twitter = dynamic(() => import('@/icons/Twitter.svg'), { ssr: false });
const Email = dynamic(() => import('@/icons/Email.svg'), { ssr: false });
const Linkedin = dynamic(() => import('@/icons/LinkedIn.svg'), { ssr: false });
const Youtube = dynamic(() => import('@/icons/Youtube.svg'), { ssr: false });

export const Navigation = ({ data, className }) => {
    const [k, x] = useStore(a => [a.navIsOpen, a.setNavIsOpen], isItEqual);
    const s = useStore(a => a.lenis);
    const o = useRouter();

    useEffect(() => {
        s && (k ? s.stop() : s.start())
    }, [k, s]);

    useEffect(() => {
        let a = () => {
            x(!1)
        };
        return o.events.on("routeChangeStart", a),
            () => {
                o.events.off("routeChangeStart", a)
            }
    }, [k]);

    return (
        <div className={`${st.menu} ${!k && st.closed} ${className}`}>
            <div className={st.navigation}>
                {data.navigationLinks.items.map(({ text, url }, i) => {
                    return (
                        <Link
                            key={`nav-item-${i}`}
                            className={`${st.link} h5`}
                            href={url}
                        >
                            <span className="p-s">0{i + 1}</span>
                            {text}
                        </Link>
                    );
                })}
            </div>
            <div className={st.social}>
                {data.socialMedia.items.map(({ url }, i) => {
                    return (
                        <Link
                            key={`social-media-item-${i}`}
                            className={`${st.icon} h5`}
                            href={url}
                        >
                            {url.includes("twitter") && <Twitter />}
                            {url.includes("@") && <Email />}
                            {url.includes("linkedin") && <Linkedin />}
                            {url.includes("youtube") && <Youtube />}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
};