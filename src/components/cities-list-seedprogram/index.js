import { useState } from 'react';
import { ImageReveal } from '../image-reveal';
import cn from 'clsx'
import st from './cities-list-seedprogram.module.css'

export function CitiesListSeed({ cities = [] }) {
    const [t, l] = useState(0);
    return (
        <div className={cn(st.wrapper, "layout-grid")} >
            <aside className={st.sticky}>
                {cities.map((e, s) => {
                    const { cityMedia: a } = e;
                    return (
                        <div className={cn(st.image, t === s && st.show)} key={s}>
                            <ImageReveal
                                src={a.url}
                                alt={a.description || ""}
                                fill={true}
                                sizes="(max-width: 800px) 0vw, 32vw"
                            />
                        </div>)
                })
                }
            </aside>
            <ul className={cn(st["cities-lists"], "h2")}>
                {cities.map((e, s) => {
                    const { city: n, airportCode: a } = e;
                    return (
                        <li key={"city-".concat(n, "-").concat(s)}
                            onPointerEnter={e => {
                                let { } = e;
                                l(s)
                            }}
                            className={cn(st.item, t === s && st.show)}
                        >
                            <h3 className={c().city}>
                                {n}
                                <span className={cn(st.number, "h4")}>
                                    {a}
                                </span>
                            </h3>
                        </li>)
                })}
            </ul>
        </div>
    )
}




