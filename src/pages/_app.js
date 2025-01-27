import { useDebug } from "@darkroom.engineering/hamo";
import { useState, useEffect } from "react";
import FixFoucStyles from "@/lib/fixFoucStyles";
import { useStore } from "@/lib/store/useStore";
import Curtain from "@/components/curtain";
import useReadyCheck from "@/hook/useReadyCheck";
import gsap from "gsap";
import Tempus from "tempus";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";
import "@/styles/globals.css";

const Leva = dynamic(
  () =>
    import('leva').then(({ Leva }) => Leva),
  { ssr: false }
);

const Stats = dynamic(
  () =>
    import('@/components/debug/stats').then(({ Stats }) => Stats),
  { ssr: false }
);

const GridDebugger = dynamic(
  () =>
    import('@/components/debug/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
);

const RealViewport = dynamic(
  () =>
    import('@/components/realviewport').then(({ RealViewport }) => RealViewport),
  { ssr: false }
);

App.getInitialProps = async (e) => {
  // Define header data
  const headerData = {
    internalTitleReference: "Drive Capital Header",
    navigationLinks: {
      items: [
        { text: "Portfolio", url: "/portfolio" },
        { text: "Story", url: "/our-story" },
        { text: "Team", url: "/team" },
        { text: "Careers", url: "/careers" },
        { text: "Talent", url: "/talent" },
        { text: "Seed Program", url: "/seed-program" },
      ],
    },
    socialMedia: {
      items: [
        { url: "https://www.linkedin.com/company/drivecapital/" },
        { url: "https://twitter.com/drivecapital" },
        { url: "https://www.youtube.com/c/DriveCapital" },
      ],
    },
  };

  // Define footer data
  const footerData = {
    internalTitleReference: "Drive Capital Footer",
    headline: "THE GREATEST EMERGING MARKET FOR VC IS AMERICA",
    lottieAsset: {
      url: "/animationData.json",
      description: "",
      width: 1656,
      height: 865,
    },
    leftLinksColumnCollection: {
      items: [
        { text: "Portfolio", url: "/portfolio" },
        { text: "Story", url: "/our-story" },
        { text: "Team", url: "/team" },
        { text: "Careers", url: "/careers" },
        { text: "Talent", url: "/talent" },
      ],
    },
    rightLinksColumnCollection: {
      items: [
        { text: "Media Kit", url: "/media-kit" },
        { text: "Diversity Reports", url: "/diversity" },
        { text: "Contact", url: "mailto:info@drivecapital.com" },
        { text: "Investor Login", url: "https://drive-capital.lpx.fund/" },
        { text: "Seed Program", url: "/seed-program" },
      ],
    },
    socialLinksCollection: {
      items: [
        {
          url: "https://www.linkedin.com/company/drivecapital/",
          text: "LinkedIn",
        },
        { url: "https://twitter.com/drivecapital", text: "Twitter" },
        { url: "https://www.youtube.com/c/DriveCapital", text: "YouTube" },
      ],
    },
  };

  return {
    headerData,
    footerData,
  };
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);

  Tempus.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

export default function App({ Component, pageProps, headerData, footerData }) {
  // Apply FOUC fix
  // FixFoucStyles();

  // Hooks
  const debug = useDebug();
  const lenis = useStore(({ Lenis }) => Lenis);
  const overflow = useStore(({ overflow }) => overflow);
  const setHeaderData = useStore(state => state.setHeaderData);
  const setFooterData = useStore(state => state.setFooterData);
  const [initialized, setInitialized] = useState(false);
  const isReady = useReadyCheck();

  // Initialize header and footer data
  if (!initialized) {
    setHeaderData(headerData);
    setFooterData(footerData);
    setInitialized(true);
  }

  // Handle overflow changes
  useEffect(() => {
    if (overflow) {
      lenis?.start();
      document.documentElement.style.removeProperty("overflow");
    } else {
      lenis?.stop();
      document.documentElement.style.setProperty("overflow", "hidden");
    }
  }, [lenis, overflow]);

  // Refresh ScrollTrigger when lenis updates
  useEffect(() => {
    if (lenis) {
      ScrollTrigger.refresh();
    }
  }, [lenis]);

  // Add loaded class when ready
  useEffect(() => {
    if (isReady) {
      document.documentElement.classList.add("loaded");
    }
  }, [isReady]);

  // Set ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false
  });

  return (
    <>
      <Leva hidden={!debug} />
      {debug && (
        <>
          <GridDebugger />
          <Stats />
        </>
      )}
      <RealViewport />
      <Curtain
        Component={Component}
        pageProps={pageProps}
      />
      {/* <Curtain>
        <Component {...pageProps} />
      </Curtain> */}
    </>
  );
}