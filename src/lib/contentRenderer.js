export const renderParagraphWithStyle = ({ json }) => {
    const t = {
        renderNode: {
            [n.BLOCKS.PARAGRAPH]: function (e, s) {
                return <p className="p-l">{s}</p>
            },
            [n.INLINES.HYPERLINK]: function (e, s) {
                return (
                    <l.r
                        href={e.data.uri}
                        className={`${st.link} link`}>
                        {s}
                    </l.r>
                )
            }
        }
    };
    return r.h(json, t)
};

export const renderParagraphWithLink = ({ json }) => {
    const t = {
        renderNode: {
            [n.BLOCKS.PARAGRAPH]: function (e, s) {
                return <p className="p">{s}</p>
            },
            [n.INLINES.HYPERLINK]: function (e, s) {
                return (
                    <l.r
                        href={e.data.uri}
                        className="link underlined">
                        {s}
                    </l.r>
                )
            }
        }
    };
    return r.h(json, t)
};

export const renderContentWithHeadingAndLink = ({ json }) => {
    const t = {
        renderNode: {
            [n.BLOCKS.HEADING_3]: function (e, s) {
                return <h1 className="h3">{s}</h1>
            },
            [n.BLOCKS.HEADING_6]: function (e, s) {
                return <h6 className="p-l">{s}</h6>
            },
            [n.BLOCKS.PARAGRAPH]: function (e, s) {
                return <p className="p">{s}</p>
            },
            [n.INLINES.HYPERLINK]: function (e, s) {
                return (
                    <l.r
                        href={e.data.uri}
                        className={`${st.link} link`}>
                        {s}
                    </l.r>
                )
            }
        }
    };
    return r.h(json, t)
};