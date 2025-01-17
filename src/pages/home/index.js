import useReadyCheck from "@/hook/useReadyCheck";
import Layout from "@/components/layout";
import { LetterVideo } from "@/components/letter-video";
import { Marquee } from "@/components/marquee";
import { ImageReveal } from "@/components/image-reveal";
import { SectionHeader } from "@/components/section-header";
import { CitiesList } from "@/components/cities-lists";
import { DoubleImage } from "@/components/double-image";
import { DoubleMarquee, DoubleMarqueeMedia } from "@/components/double-marquee";
import dynamic from "next/dynamic";
import st from "./home.module.css";

const Label = dynamic(() => import('@/icons/Label.svg'), { ssr: false });
const ArrowIcons = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export default function Home({ homeData, theme, companiesByCity, visibe = true }) {
    const c = useReadyCheck({
        condition: visibe
    });

    return (
        <Layout
            theme={theme}
            headerAppear={{ use: true, state: c }}
            metadata={homeData.metadata}
            scroll={c}
        >

            <section className={`${st.hero} layout-block-inner ${c && st.appear}`}>
                {homeData.heroHeadline.length > 0 && (
                    <h2 className={st.headline}>
                        {homeData.heroHeadline.map((e, t) => (
                            <span key={t} className="h6">
                                {e}
                            </span>
                        ))}
                    </h2>
                )}
                <div className={`${st['letter-video']} ${c && st.intro}`}>
                    <LetterVideo title="Drive" video={homeData.heroBackgroundVideo.url} />
                </div>
                {homeData.heroMarquee.length > 0 && (
                    <Marquee duration={6 * homeData.heroMarquee.length} className={st.marquee}>
                        {homeData.heroMarquee.map((e, t) => (
                            <p key={t} className="p-s">
                                {e}
                            </p>
                        ))}
                    </Marquee>
                )}
                {homeData.heroMedia.items.length > 0 && (
                    <div className={`${st['image-gallery']} layout-grid`}>
                        {homeData.heroMedia.items.map((e, t) => {
                            let { url: i, description: a } = e;
                            return (
                                <div key={`image-gallery-${t}`} className={st.image}>
                                    <ImageReveal
                                        src={i}
                                        alt={a || ''}
                                        fill
                                        sizes="(max-width: 800px) 43vw, 32vw"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className={st['story-block']}>
                <SectionHeader
                    className={st.heading}
                    headline={homeData.porfolioHeadline}
                    cta={homeData.portfolioCta}
                    description={homeData.portfolioDescription}
                />
                <CitiesList
                    cities={companiesByCity}
                    media={[homeData.portfolioMediaTop, homeData.portfolioMediaBottom]}
                    cta={homeData.cityListCta}
                />
            </section>

            <section className={st['team-block']}>
                <div className={st['team-image']}>
                    <DoubleImage images={homeData.teamMedia.items} />
                </div>
                <SectionHeader
                    headline={homeData.teamHeadline}
                    cta={homeData.teamCta}
                    description={homeData.teamDescription}
                    annotation={homeData.teamAnnotation}
                    firstSubtext={homeData.teamFirstSubtext}
                    secondSubtext={homeData.teamSecondSubtext}
                />
            </section>

            <DoubleMarquee
                topText={homeData.marqueeTopText}
                bottomText={homeData.marqueeBottomText}
                className={st['double-marquee']}
            >
                <DoubleMarqueeMedia
                    media={homeData.marqueeMedia.items[0]}
                    className={st['top-marquee-media']}
                />
                <DoubleMarqueeMedia
                    media={homeData.marqueeMedia.items[1]}
                    className={st['bottom-marquee-media']}
                />
            </DoubleMarquee>

            <section className={`${st.portfolio} layout-block`}>
                <div className={`${st.heading} layout-grid`}>
                    {homeData.storyAnnotation && (
                        <p className={`${st.label} p-s`}>
                            <Label /> {homeData.storyAnnotation}
                        </p>
                    )}
                    {homeData.storyHeadline && (
                        <h5 className={`${st.title} h5`}>{homeData.storyHeadline}</h5>
                    )}
                    {homeData.storyDescription && (
                        <p className={`${st.description} p-l`}>
                            {homeData.storyDescription}
                        </p>
                    )}
                    {homeData.storyCta.text && (
                        <ArrowIcons
                            href={homeData.storyCta.url}
                            className={`${st.cta} cta`}
                        >
                            {homeData.storyCta.text}
                        </ArrowIcons>
                    )}
                    <div className={st.line} />
                    <div className={st.line} />
                </div>
            </section>

            {homeData.storyMedia.items.length > 0 && (
                <section className={`${st.prefooter} layout-grid`}>
                    {homeData.storyMedia.items[0].url && (
                        <div className={st.image}>
                            <ImageReveal
                                src={homeData.storyMedia.items[0].url}
                                alt={homeData.storyMedia.items[1].description || ''}
                                fill
                                sizes="(max-width: 800px) 43vw, 31vw"
                            />
                        </div>
                    )}
                    {homeData.storyMedia.items[1].url && (
                        <div className={st.image}>
                            <ImageReveal
                                src={homeData.storyMedia.items[1].url}
                                alt={homeData.storyMedia.items[0].description || ''}
                                fill
                                sizes="(max-width: 800px) 43vw, 63vw"
                            />
                        </div>
                    )}
                </section>
            )}
        </Layout>
    );
};

export async function getStaticProps() {
    const pageProps = {
        homeData: {
            heroHeadline: [
                "GREATNESS IS IN",
                "OUR BACKYARD"
            ],
            heroMarquee: [
                "ATL",
                "Capital that comes to you",
                "AUS",
                "True partners",
                "BNA",
                "Idea to IPO",
                "CLT",
                "Capital that comes to you",
                "CMH",
                "True partners",
                "DEN",
                "Idea to IPO",
                "IND",
                "Capital that comes to you",
                "MSP",
                "True partners",
                "ORD",
                "PGH",
                "Idea to IPO",
                "SDF",
                "Capital that comes to you",
                "YYZ",
                "True Partners"
            ],
            porfolioHeadline: "Our Story",
            portfolioDescription: "Today, technology cuts horizontally through every business and industry. There are more billion-dollar opportunities east of the Rockies and west of the Hudson River than everywhere else in North America combined — we’re documenting the stories of building in-between and beyond.",
            teamHeadline: "Our Team",
            teamDescription: "We’re a diverse and collaborative team from unlikely backgrounds. We love a challenge, and we invest on behalf of our Limited Partners who believe that, with the right partners and a relentless work ethic,  entrepreneurs can build market-defining companies anywhere.",
            teamAnnotation: "CANDID conviction",
            teamFirstSubtext: "We’re relentless because we have to be. Entrepreneurs choose to partner with Drive because they want convicted investors who will push them to be great.",
            teamSecondSubtext: "Great founders don’t want cheerleaders or cheap platitudes. They want honesty about what works and what doesn’t. They want the best tools available for doing their life’s work.",
            marqueeTopText: [
                "87 companies",
                "$2B AUM",
                "87 companies",
                "$2B AUM"
            ],
            marqueeBottomText: [
                "24 cities",
                "16 partners",
                "24 cities",
                "16 partners"
            ],
            storyAnnotation: "BUILDING GREATNESS ",
            storyHeadline: "OUR PORTFOLIO",
            storyDescription: "Our companies are proving that you can build a world-class technology company anywhere. We believe the best advantages are the ones you already have. Build where your talent is. Build where your customers are. Build where you’re strongeshomeData.",
            portfolioCta: {
                __typename: "Link",
                text: "View Our Story",
                url: "/our-story"
            },
            teamCta: {
                __typename: "Link",
                text: "View Our Team",
                url: "/team"
            },
            storyCta: {
                __typename: "Link",
                text: "View Our Portfolio",
                url: "/portfolio"
            },
            cityListCta: {
                __typename: "Link",
                text: "& More",
                url: "/portfolio"
            },
            metadata: {
                title: "Home",
                description: "Drive Capital is a venture capital firm in Columbus that invests in world-class founders building the next generation of market-defining companies.",
                keywords: null,
                bg: {
                    __typename: "Asset",
                    description: "",
                    url: "/images/DRIVE-OG-Images-Home.jpg"
                },
                image: {
                    url: "/images/og.jpg"
                }
            },
            heroBackgroundVideo: {
                url: "/header_vid_-_1080_v3.m4v"
            },
            portfolioMediaTop: {
                __typename: "Asset",
                description: "",
                url: "/images/Drive_Home_02a.jpg"
            },
            portfolioMediaBottom: {
                __typename: "Asset",
                description: "",
                url: "/images/Drive_Home_02b.jpg"
            },
            heroMedia: {
                items: [
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_01a.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_01b.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_01c.jpg"
                    }
                ]
            },
            teamMedia: {
                items: [
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_03a.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_03b.jpg"
                    }
                ]
            },
            marqueeMedia: {
                items: [
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_04b.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_04a.jpg"
                    }
                ]
            },
            storyMedia: {
                items: [
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_05a.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "",
                        url: "/images/Drive_Home_05b.jpg"
                    }
                ]
            },
            cities: {
                items: [
                    {
                        city: "Atlanta",
                        airportCode: "ATL",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Greenlight"
                                    },
                                    {
                                        linkedTitle: "Scout"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Austin",
                        airportCode: "AUS",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Molecula"
                                    },
                                    {
                                        linkedTitle: "Telnyx"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Denver",
                        airportCode: " DEN",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "CirrusMD"
                                    },
                                    {
                                        linkedTitle: "SonderMind"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Chicago",
                        airportCode: "ORD",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Hologram"
                                    },
                                    {
                                        linkedTitle: "Channel IQ"
                                    },
                                    {
                                        linkedTitle: "Ascent"
                                    },
                                    {
                                        linkedTitle: "Civis Analytics"
                                    },
                                    {
                                        linkedTitle: "Thoughtful Automation"
                                    },
                                    {
                                        linkedTitle: "Triggr Health"
                                    },
                                    {
                                        linkedTitle: "Fast Radius"
                                    },
                                    {
                                        linkedTitle: "Hallow"
                                    },
                                    {
                                        linkedTitle: "Sample 6"
                                    },
                                    {
                                        linkedTitle: "Cofactor AI"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Columbus",
                        airportCode: "CMH",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Circulo"
                                    },
                                    {
                                        linkedTitle: "Ready Robotics"
                                    },
                                    {
                                        linkedTitle: "Path Robotics"
                                    },
                                    {
                                        linkedTitle: "Beam Benefits"
                                    },
                                    {
                                        linkedTitle: "Mantium"
                                    },
                                    {
                                        linkedTitle: "Forge Biologics"
                                    },
                                    {
                                        linkedTitle: "Olive"
                                    },
                                    {
                                        linkedTitle: "Enlace Health"
                                    },
                                    {
                                        linkedTitle: "Immuta"
                                    },
                                    {
                                        linkedTitle: "Tandem"
                                    },
                                    {
                                        linkedTitle: "Root Inc"
                                    },
                                    {
                                        linkedTitle: "Battleface"
                                    },
                                    {
                                        linkedTitle: "Finite State"
                                    },
                                    {
                                        linkedTitle: "Tokr Labs"
                                    },
                                    {
                                        linkedTitle: "Vironexis"
                                    },
                                    {
                                        linkedTitle: "Physna"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Pittsburgh",
                        airportCode: "PGH",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Gecko Robotics"
                                    },
                                    {
                                        linkedTitle: "Duolingo"
                                    },
                                    {
                                        linkedTitle: "Fifth Season"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        city: "Toronto",
                        airportCode: "YYZ",
                        linkedFrom: {
                            companies: {
                                items: [
                                    {
                                        linkedTitle: "Passage"
                                    },
                                    {
                                        linkedTitle: "ApplyBoard"
                                    },
                                    {
                                        linkedTitle: "Cyclica"
                                    },
                                    {
                                        linkedTitle: "KOHO"
                                    },
                                    {
                                        linkedTitle: "Relay Platform"
                                    },
                                    {
                                        linkedTitle: "Birdseye"
                                    },
                                    {
                                        linkedTitle: "Alexi"
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        },
        companiesByCity: [
            {
                city: "Atlanta",
                airportCode: "ATL",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "Greenlight"
                            },
                            {
                                linkedTitle: "Scout"
                            }
                        ]
                    }
                }
            },
            {
                city: "Austin",
                airportCode: "AUS",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "Molecula"
                            },
                            {
                                linkedTitle: "Telnyx"
                            }
                        ]
                    }
                }
            },
            {
                city: "Denver",
                airportCode: " DEN",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "CirrusMD"
                            },
                            {
                                linkedTitle: "SonderMind"
                            }
                        ]
                    }
                }
            },
            {
                city: "Chicago",
                airportCode: "ORD",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "Hologram"
                            },
                            {
                                linkedTitle: "Channel IQ"
                            },
                            {
                                linkedTitle: "Ascent"
                            },
                            {
                                linkedTitle: "Civis Analytics"
                            },
                            {
                                linkedTitle: "Thoughtful Automation"
                            },
                            {
                                linkedTitle: "Triggr Health"
                            },
                            {
                                linkedTitle: "Fast Radius"
                            },
                            {
                                linkedTitle: "Hallow"
                            },
                            {
                                linkedTitle: "Sample 6"
                            },
                            {
                                linkedTitle: "Cofactor AI"
                            }
                        ]
                    }
                }
            },
            {
                city: "Columbus",
                airportCode: "CMH",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                "linkedTitle": "Circulo"
                            },
                            {
                                "linkedTitle": "Ready Robotics"
                            },
                            {
                                "linkedTitle": "Path Robotics"
                            },
                            {
                                "linkedTitle": "Beam Benefits"
                            },
                            {
                                "linkedTitle": "Mantium"
                            },
                            {
                                "linkedTitle": "Forge Biologics"
                            },
                            {
                                "linkedTitle": "Olive"
                            },
                            {
                                "linkedTitle": "Enlace Health"
                            },
                            {
                                "linkedTitle": "Immuta"
                            },
                            {
                                "linkedTitle": "Tandem"
                            },
                            {
                                "linkedTitle": "Root Inc"
                            },
                            {
                                "linkedTitle": "Battleface"
                            },
                            {
                                "linkedTitle": "Finite State"
                            },
                            {
                                "linkedTitle": "Tokr Labs"
                            },
                            {
                                "linkedTitle": "Vironexis"
                            },
                            {
                                "linkedTitle": "Physna"
                            }
                        ]
                    }
                }
            },
            {
                city: "Pittsburgh",
                airportCode: "PGH",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "Gecko Robotics"
                            },
                            {
                                linkedTitle: "Duolingo"
                            },
                            {
                                linkedTitle: "Fifth Season"
                            }
                        ]
                    }
                }
            },
            {
                city: "Toronto",
                airportCode: "YYZ",
                linkedFrom: {
                    companies: {
                        items: [
                            {
                                linkedTitle: "Passage"
                            },
                            {
                                linkedTitle: "ApplyBoard"
                            },
                            {
                                linkedTitle: "Cyclica"
                            },
                            {
                                linkedTitle: "KOHO"
                            },
                            {
                                linkedTitle: "Relay Platform"
                            },
                            {
                                linkedTitle: "Birdseye"
                            },
                            {
                                linkedTitle: "Alexi"
                            }
                        ]
                    }
                }
            }
        ],
        theme: "dark"
    }

    return {
        props: pageProps
    }
};