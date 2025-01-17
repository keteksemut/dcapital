import dynamic from "next/dynamic";
import st from "./section-header.module.css";

const Arrow = dynamic(() => import('@/components/arrow').then((module) => module.Button), { ssr: false });
const Label = dynamic(() => import('@/icons/Label.svg'), { ssr: false });

export const SectionHeader = ({ headline, cta, icon, description, annotation, firstSubtext, secondSubtext, className, notLine }) => {

        return (
            <div className={`${st['section-header']} ${className}`}>
                <div className={`${st.heading} layout-grid ${notLine ? st.notLine : ''}`}>
                    <div className={st.left}>
                        {headline && <h5 className="h5">{headline}</h5>}
                        {cta?.text && (
                            <Arrow
                                icon={!!icon}
                                href={cta.url}
                                className="cta hide-on-mobile"
                            >
                                {cta.text}
                            </Arrow>
                        )}
                    </div>

                    {description && (
                        <aside className={`${st.description} p-l`}>
                            {description}
                        </aside>
                    )}

                    {cta && (
                        <Arrow
                            iconDirection={true}
                            href={cta.url}
                            className={`${st.cta} cta hide-on-desktop`}
                        >
                            {cta.text}
                        </Arrow>
                    )}
                </div>

                <div className={`${st['bottom-columns-text']} layout-grid`}>
                    {annotation && (
                        <p className={`${st.eyebrow} p-s`}>
                            <Label /> {annotation}
                        </p>
                    )}

                    {firstSubtext && (
                        <p className={`${st.left} p`}>
                            {firstSubtext}
                        </p>
                    )}

                    {secondSubtext && (
                        <p className={`${st.right} p`}>
                            {secondSubtext}
                        </p>
                    )}
                </div>
            </div>
        )
    };