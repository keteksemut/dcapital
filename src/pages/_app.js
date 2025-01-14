import "@/styles/globals.css";
import gsap from "gsap";
import Tempus from "tempus";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);
  Tempus.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

const Noise = dynamic(() => import('../components/noise').then(({ Noise }) => Noise), {ssr: false});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Noise />
      <Component {...pageProps} />
    </>
  );
}
