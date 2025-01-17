import { useIntersectionObserver } from "@darkroom.engineering/hamo";
import { CustomImage } from "../custom-image";
import st from "./image-reveal.module.css";

export function ImageReveal({ once = !0, visible, delay = "0s", threshold = .2, hoverable = !1, ...m }) {
    const [u, _] = useIntersectionObserver({
        threshold: threshold,
        once: once
    });

    return (
        <div
            ref={u}
            className={`${st.wrapper} ${
                visible === undefined ? (_.isIntersecting ? st.visible : '') : (visible ? st.visible : '')
              } ${hoverable ? st.hoverable : ''}`}
            style={{ "--delay": delay }}
        >
            <CustomImage {...m} alt={m.alt} />
        </div>
    );
};