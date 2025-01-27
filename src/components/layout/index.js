import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useStore } from "@/lib/store/useStore";
import { useFrame } from "@darkroom.engineering/hamo"; // Corrected import
import { Header } from "../header";
import { Footer } from "../footer";
import { SeoHead } from "../seo-head";
import { Scrollbar } from "../scrollbar";
import { useMeasure } from "react-use";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./layout.module.css";

const Noise = dynamic(() => import('@/components/noise').then(({ Noise }) => Noise), { ssr: false });

export default function Layout({
  metadata = {
    title: "Drive Capital",
    description: "Drive Capital Website",
    image: { url: "" },
    keywords: "",
  },
  children,
  theme = "light",
  className,
  headerAppear = { use: false, state: false },
  scroll = true,
  isoLogo = false,
  noise = true,
}) {
  const [h, f] = useStore((a) => [a.lenis, a.setLenis]);
  const y = useStore((a) => a.setHeaderHeight);
  const u = useRouter();
  const [G, { height }] = useMeasure({ debounce: 100 });
  const [D, S] = useState(
    u.asPath.includes("#") ? "#" + u.asPath.split("#").pop() : undefined
  );

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (a) => Math.min(1, 1.001 - Math.pow(2, -10 * a)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true
    });

    const currentPathname = window.location.pathname;
    lenisInstance.pathname = currentPathname;
    window.lenis = lenisInstance;
    f(lenisInstance);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (h) {
      if (scroll) {
        h.start();
      } else {
        setTimeout(() => {
          h.stop();
        }, 0);
      }
    }
  }, [h, scroll]);

  const [B] = useState(u.pathname);
  const [A, V] = useState(false);

  useEffect(() => {
    u.events.on("routeChangeStart", (newPath) => {
      if (newPath !== B) {
        V(true);
      }
    });
  }, [u, B]);

  useEffect(() => {
    y(height);
  }, [height]);

  useEffect(() => {
    if (h && D && !A && scroll) {
      const targetElement = document.querySelector(D);
      h.scrollTo(targetElement, {
        offset: -1.1 * height
      });
    }
  }, [h, D, height, A, scroll]);

  useEffect(() => {
    function handleClick(event) {
      event.preventDefault();
      const target = event.currentTarget;
      const hash = target.href.split("#").pop();
      S("#" + hash);

      setTimeout(() => {
        window.location.hash = hash;
      }, 0);
    }

    const links = [...document.querySelectorAll("[href]")].filter((link) =>
      link.href.includes(u.pathname + "#")
    );

    links.forEach((link) => {
      link.addEventListener("click", handleClick, false);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick, false);
      });
    };
  }, []);

  useFrame((a) => {
    h?.raf(a);
  }, []);
  
    return (
      <>
        <SeoHead {...metadata} />
        <div className={cn(`theme-${theme}`, st.layout, className)}>
          <Scrollbar />
          <Header
            ref={G}
            isoLogo={isoLogo}
            className={`theme-${theme}`}
            appear={headerAppear}
          />
          <main className={st.main}>
            {children}
          </main>
          <Footer className={`theme-${theme}`} />
        </div>
        {noise && <Noise />}
      </>
    );
}
