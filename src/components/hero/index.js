import { useSlots } from "@darkroom.engineering/hamo";
import st from "./hero.module.css";

function Title() {
    return null;
}

function Description() {
    return null;
}

function Cta() {
    return null;
}

function Hero({ className, inverted = false, appear, children }) {
    const [cta] = useSlots([Cta], children);
    const [description] = useSlots([Description], children);
    const [title] = useSlots([Title], children);

    return (
        <div
            className={[
                st.hero,
                'layout-grid',
                className,
                inverted && st.inverted,
                appear && st.appear
            ].filter(Boolean).join(' ')}
        >
            <div className={`${st.border} ${st.top}`} />
            <div className={`${st.border} ${st.bottom}`} />

            <div className={`${st.title} h1`}>
                {title}
            </div>

            <aside className={st.content}>
                <div className={st.cta}>
                    {cta}
                </div>
                <div className={`${st.description} p`}>
                    {description}
                </div>
            </aside>
        </div>
    );
}

// Attach sub-components
Hero.Cta = Cta;
Hero.Title = Title;
Hero.Description = Description;

export default Hero;