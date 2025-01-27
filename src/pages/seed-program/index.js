import { useWindowSize } from "react-use";
import { renderParagraphWithLink } from "@/components/renderers";
import dynamic from "next/dynamic";
import Layout from "@/components/layout";
import Hero from "@/components/hero";
import { DoubleImage } from "@/components/double-image";
import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-header";
import { ImageReveal } from "@/components/image-reveal";
import { Testimonials } from "@/components/testimonials";
import { CitiesListSeed } from "@/components/cities-list-seed";
import { GmTeamGrid } from "@/components/gm-team-grid";
import cn from "clsx";
import st from "./seed-program.module.css";

const Arrow = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export default function SeedProgram({ seedFundData, managers, theme, visible = !0 }) {
    const c = useWindowSize({
        condition: visible
    });

    return (
        <Layout theme={theme} metadata={seedFundData.metadata} scroll={c}>
            <div className={st.main}>
                <section className={st.hero}>
                    <Hero data={seedFundData.hero} appear={c}>
                        <Hero.Title>
                            <h1 className="h2 font-fix">
                                <span>{seedFundData.heroTitle}</span>
                            </h1>
                        </Hero.Title>
                        <Hero.Cta>
                            {seedFundData.heroCta && (
                                <Arrow
                                    className={cn(st.cta, "cta")}
                                    href={seedFundData.heroCta.url}
                                    icon
                                    iconDirection="north"
                                >
                                    {seedFundData.heroCta.text}
                                </Arrow>
                            )}
                        </Hero.Cta>
                        <Hero.Description>
                            <div className={st.description}>
                                {renderParagraphWithLink(seedFundData.heroDescription)}
                            </div>
                        </Hero.Description>
                    </Hero>
                    <div className={cn(st["first-fold"], c && st.appear)}>
                        {seedFundData.heroMarquee.length > 0 && (
                            <Marquee
                                duration={10 * seedFundData.heroMarquee.length}
                                className={cn(st.marquee, "layout-block")}
                                repeat={3}
                            >
                                {seedFundData.heroMarquee.map((e, s) => (
                                    <h2 className="h6" key={s}>
                                        {e}
                                    </h2>
                                ))}
                            </Marquee>
                        )}
                        <div className={st["hero-media"]}>
                            <DoubleImage images={seedFundData.heroMedia.items} />
                        </div>
                    </div>
                </section>
                <section className={cn(st.overview, "layout-block")}>
                    <SectionHeader
                        notLine
                        className={st.heading}
                        headline={seedFundData.overviewHeadline}
                        description={seedFundData.overviewDescription}
                    />
                    <div className={st.image}>
                        <ImageReveal
                            src={seedFundData.overviewMedia.url}
                            alt={seedFundData.overviewMedia.description || ""}
                            fill
                            sizes="(max-width: 800px) 87vw, 96vw"
                        />
                    </div>
                </section>
                <section className={cn(st.cities, "layout-block")}
                >
                    <SectionHeader
                        className={st.heading}
                        headline={seedFundData.citiesHeadline}
                        description={seedFundData.citiesDescription}
                        cta={seedFundData.citiesCta}
                        icon
                    />
                    <div className={st["cities-list"]}>
                        <CitiesListSeed cities={seedFundData.cities.items} />
                    </div>
                </section>
                <section id="team" className={st.team}>
                    <GmTeamGrid title="General Managers" data={managers} />
                </section>
                <section className={st.testimonials}>
                    <Testimonials
                        appear={c}
                        items={seedFundData.quotesItems.items}
                        title={seedFundData.quotesTitle}
                    />
                </section>
                <section
                    className={cn(st.prefooter, "layout-block")}
                >
                    <div className={st.image}>
                        <ImageReveal
                            src={seedFundData.prefooterMedia.url}
                            alt={seedFundData.prefooterMedia.description || ""}
                            fill
                            sizes="(max-width: 800px) 87vw, 96vw"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
};

export async function getStaticProps() {
    const pageProps = {
        seedFundData: {
            heroDescription: {
                json: {
                    data: {},
                    content: [
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "The Drive Capital Seed Program invests in founders at the pre-seed and seed stage.",
                                    nodeType: "text"
                                }
                            ],
                            nodeType: "paragraph"
                        },
                        {
                            data: {},
                            content: [
                                {
                                    data: {},
                                    marks: [],
                                    value: "$80M allocated   •   $500k safe",
                                    nodeType: "text"
                                }
                            ],
                            nodeType: "paragraph"
                        }
                    ],
                    nodeType: "document"
                }
            },
            heroTitle: "Seed Program",
            heroMarquee: [
                "Forge",
                "Olive",
                "Beam",
                "Tandem",
                "Forge ",
                "Beam",
                "Olive",
                "Tandem"
            ],
            overviewHeadline: "OVERVIEW",
            overviewDescription: "We’re looking for founders who are solving hard problems in large markets.  With $2.2B in AUM, Drive is built to support founders from seed to IPO. Our favorite time to partner with founders is when the vision is still being shaped.",
            citiesHeadline: "Cities",
            citiesDescription: "Our Seed Fund General Managers are on-location in five growing markets. Working on an idea outside of these five markets? We’d still love to hear about it.",
            quotesTitle: "DRIVE KNOWS SEED INVESTING ",
            overviewMedia: {
                __typename: "Asset",
                description: "",
                url: "/images/seed-program/DriveCapital-TalentTeam-Summer2024-31_websize.jpg"
            },
            prefooterMedia: {
                __typename: "Asset",
                description: "",
                url: "/images/seed-program/DriveCapital-TalentTeam-Summer2024-31_websize.jpg"
            },
            heroMedia: {
                items: [
                    {
                        __typename: "Asset",
                        description: "Drive Seed Program",
                        url: "/images/seed-program/DriveCapital-Lifestyle-2022-PROOFS-2_websize.jpg"
                    },
                    {
                        __typename: "Asset",
                        description: "Brmrwermwemrpwcn",
                        url: "/images/seed-program/josh-hild-PaahVcW9WAs-unsplash_1.jpg"
                    }
                ]
            },
            heroCta: {
                __typename: "Link",
                text: "Meet The Team",
                url: "#team"
            },
            citiesCta: {
                __typename: "Link",
                text: "Get in Touch",
                url: "mailto:info@drivecapital.com"
            },
            "quotesItems": {
                "items": [
                    {
                        "text": "\"Drive demonstrated adaptability and doubled down on their support through lean times pre-product market fit to help guide our company through this expansion to the other side, providing capital, talent acquisition resources, and strategy support along the way. Drive has been an incredible partner to us since 2014.\" - Alex Frommeyer, Co-Founder and CEO, Beam Benefits"
                    },
                    {
                        "text": "\"We couldn't ask for a better seed investor and long-term partner than Drive Captial. Drive knew our opportunity inside and out and took significant measures to ensure our long-term success.\" - Tim Miller, Co-Founder and CEO, Forge Biologics"
                    },
                    {
                        "text": "\"Drive was immediately ready to jump in and help. From finding a legal team to obtaining insurance to learning how to hire our first employee, their team's diverse knowledge, experience, and network acted as a team of mentors as we built out our MVP.\" - Olive Weinstock, Co-Founder and CEO, Tandem"
                    }
                ]
            },
            metadata: {
                title: "Seed Program",
                description: "Seed Program",
                keywords: null,
                bg: {
                    __typename: "Asset",
                    description: "",
                    url: "/images/seed-program/DRIVE-OG-Images-Portfolio.jpg"
                },
                image: {
                    url: "/images/seed-program/DRIVE-OG-Images-Portfolio.jpg"
                }
            },
            cities: {
                items: [
                    {
                        city: "Austin",
                        airportCode: "AUS",
                        cityMedia: {
                            __typename: "Asset",
                            description: "",
                            url: "/images/seed-program/Drive_Cities_Austin.jpg"
                        }
                    },
                    {
                        city: "Atlanta",
                        airportCode: "ATL",
                        cityMedia: {
                            __typename: "Asset",
                            description: "",
                            url: "/images/seed-program/Drive_Cities_Atlanta.jpg"
                        }
                    },
                    {
                        city: "Boulder",
                        airportCode: "DEN",
                        cityMedia: {
                            __typename: "Asset",
                            description: "boulder",
                            url: "/images/seed-program/caption-0.jpg"
                        }
                    },
                    {
                        city: "Chicago",
                        airportCode: "ORD",
                        cityMedia: {
                            __typename: "Asset",
                            description: "",
                            url: "/images/seed-program/Drive_Cities_Chicago.jpg"
                        }
                    },
                    {
                        city: "Columbus",
                        airportCode: "CMH",
                        cityMedia: {
                            __typename: "Asset",
                            description: "",
                            url: "/images/seed-program/Drive_Cities_Columbus.jpg"
                        }
                    },
                    {
                        city: "Toronto",
                        airportCode: "YYZ",
                        cityMedia: {
                            __typename: "Asset",
                            description: "",
                            url: "/images/seed-program/Drive_Cities_Toronto.jpg"
                        }
                    }
                ]
            },
            generalManagers: {
                items: [
                    {
                        slug: "alanna-souza",
                        linkedTitle: "Alanna Souza",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Toronto Seed GM"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "Email",
                                        url: "mailto:alanna@drivecapital.com"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "LinkedIn",
                                        url: "https://www.linkedin.com/in/alannalopessouza/"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/DriveCapital-Headshots-Jan2023-1_websize.jpg",
                                    description: "Alanna Souza"
                                }
                            }
                        }
                    },
                    {
                        slug: "anish-zute",
                        linkedTitle: "Anish Zuté",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Austin Seed GM"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "email",
                                        url: "mailto:anish@drivecapital.com"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "linkedin",
                                        url: "https://www.linkedin.com/in/anishzute/"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/DriveCapital-Headshot-May2024-4_websize-2.jpg",
                                    description: "Anish Zuté"
                                }
                            }
                        }
                    },
                    {
                        slug: "Avoilan-Bingham",
                        linkedTitle: "Avoilan Bingham",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Atlanta Seed GM"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "LinkedIn",
                                        url: "https://www.linkedin.com/in/avoilanbingham/"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "Twitter",
                                        url: "https://twitter.com/AVisRich"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "Email",
                                        url: "mailto:avoilan@drivecapital.com"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/DriveCapital-Headshots-Dec2022-2.jpg",
                                    description: ""
                                }
                            }
                        }
                    },
                    {
                        slug: "landon-campbell",
                        linkedTitle: "Landon Campbell",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Chicago Seed GM"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "Email",
                                        url: "mailto:landon@drivecapital.com"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "Twitter",
                                        url: "https://twitter.com/landon20s"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "LinkedIn",
                                        url: "https://www.linkedin.com/in/landon-w-campbell/"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/DriveCapital-Fall2022-11-2.jpg",
                                    description: "Landon Campbell"
                                }
                            }
                        }
                    },
                    {
                        slug: "nick-solaro",
                        linkedTitle: "Nick Solaro",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Partner"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "Linkedin",
                                        url: "https://www.linkedin.com/in/solaro"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "Twitter",
                                        url: "https://twitter.com/nsolaro"
                                    },
                                    {
                                        __typename: "Link",
                                        text: "Email",
                                        url: "mailto:nick@drivecapital.com"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/Nick_Solaro.jpg",
                                    description: "description"
                                }
                            }
                        }
                    },
                    {
                        slug: "tim-morrissey",
                        linkedTitle: "Tim Morrissey, PhD",
                        hero: {
                            filtersCollection: {
                                items: [
                                    {
                                        filterValue: "Boulder Seed GM"
                                    }
                                ]
                            },
                            ctas: {
                                items: [
                                    {
                                        __typename: "Link",
                                        text: "Email",
                                        url: "mailto:tim@drivecapital.com"
                                    }
                                ]
                            },
                            mediaAnnotation: {
                                media: {
                                    url: "/images/seed-program/DriveCapital-Headshots-Spring2024-1_websize.jpg",
                                    description: "Tim Morrissey"
                                }
                            }
                        }
                    }
                ]
            }
        },
        managers: {
            items: [
                {
                    title: "Alanna Souza",
                    link: "/team/alanna-souza",
                    image: {
                        url: "/images/seed-program/DriveCapital-Headshots-Jan2023-1_websize.jpg",
                        description: "Alanna Souza"
                    },
                    position: "Toronto Seed GM",
                    email: {
                        __typename: "Link",
                        text: "Email",
                        url: "mailto:alanna@drivecapital.com"
                    }
                },
                {
                    title: "Anish Zuté",
                    link: "/team/anish-zute",
                    image: {
                        url: "/images/seed-program/DriveCapital-Headshot-May2024-4_websize-2.jpg",
                        description: "Anish Zuté"
                    },
                    position: "Austin Seed GM",
                    email: {
                        __typename: "Link",
                        text: "email",
                        url: "mailto:anish@drivecapital.com"
                    }
                },
                {
                    title: "Avoilan Bingham",
                    link: "/team/Avoilan-Bingham",
                    image: {
                        url: "/images/seed-program/DriveCapital-Headshots-Dec2022-2.jpg",
                        description: ""
                    },
                    position: "Atlanta Seed GM",
                    email: {
                        __typename: "Link",
                        text: "Email",
                        url: "mailto:avoilan@drivecapital.com"
                    }
                },
                {
                    title: "Landon Campbell",
                    link: "/team/landon-campbell",
                    image: {
                        url: "/images/seed-program/DriveCapital-Fall2022-11-2.jpg",
                        description: "Landon Campbell"
                    },
                    position: "Chicago Seed GM",
                    email: {
                        __typename: "Link",
                        text: "Email",
                        url: "mailto:landon@drivecapital.com"
                    }
                },
                {
                    title: "Nick Solaro",
                    link: "/team/nick-solaro",
                    image: {
                        url: "/images/seed-program/Nick_Solaro.jpg",
                        description: "description"
                    },
                    position: "Partner",
                    email: {
                        __typename: "Link",
                        text: "Email",
                        url: "mailto:nick@drivecapital.com"
                    }
                },
                {
                    title: "Tim Morrissey, PhD",
                    link: "/team/tim-morrissey",
                    image: {
                        url: "/images/seed-program/DriveCapital-Headshots-Spring2024-1_websize.jpg",
                        description: "Tim Morrissey"
                    },
                    position: "Boulder Seed GM",
                    email: {
                        __typename: "Link",
                        text: "Email",
                        url: "mailto:tim@drivecapital.com"
                    }
                }
            ]
        },
        key: "seed-fund",
        theme: "dark"
    }

    return {
        props: pageProps
    }
}