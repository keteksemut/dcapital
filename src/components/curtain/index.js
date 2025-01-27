import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import { useStore } from "@/lib/store/useStore";
import { isItEqual } from "@/lib/store/isItEqual";
import { ServerOnly, ClientOnly } from "@/components/isomorphic";
import gsap from "gsap";
import styles from "./curtain.module.css";

export default function Curtain({ Component, pageProps }) {
  const curtainRef = useRef();
  const currentRef = useRef();
  const nextRef = useRef();
  const [setOverflow] = useStore((state) => [state.setOverflow], isItEqual);
  const [pageStack, setPageStack] = useState([]);

  // Reset transitions and clean up stack
  const resetTransitions = () => {
    setOverflow(true);
    window.scrollTo(0, 0);
    currentRef.current = null;
    nextRef.current = null;
    setPageStack((stack) => (stack.length > 1 ? stack.slice(1) : stack));
  };

  // Handle stack updates when Component or pageProps change
  useEffect(() => {
    setOverflow(false);
    setPageStack((stack) => {
      const lastPage = stack.at(-1);

      if (
        lastPage?.Component === Component &&
        lastPage?.pageProps?.key === pageProps?.key
      ) {
        return stack;
      } else {
        return [...stack, { Component, pageProps }];
      }
    });
  }, [Component, pageProps]);

  const isMobile = useMediaQuery("(max-width: 800px)");

  useEffect(() => {
    if (isMobile && resetTransitions(),
    pageStack.length <= 1)
    return;

    const currentDisplayName = pageStack[0]?.Component?.render?.displayName;
    const nextDisplayName = pageStack[1]?.Component?.render?.displayName;

    const currentElement = currentRef.current;
    const nextElement = nextRef.current;

    const currentProps = currentElement?.props;
    const animateOut = currentElement?.animateOut;
    const animateIn = nextElement?.animateIn;

    if (animateIn && animateOut && currentDisplayName !== nextDisplayName) {
      Promise.all([
        animateOut({ from: currentDisplayName, to: nextDisplayName }),
        animateIn({ from: currentDisplayName, to: nextDisplayName, props: currentProps }),
      ]).then(() => {
        resetTransitions();
      });
    } else {
      const theme = pageStack[1]?.pageProps?.theme;
      curtainRef.current.className = "".concat(styles.curtain, " theme-").concat(theme);

      new gsap.timeline().to(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 1.2,
        ease: "expo.out",
      }).call(() => {
        resetTransitions();
      }).set(curtainRef.current, {
        scaleY: 0,
      }, "+=0.25");
    }
  }, [pageStack, isMobile]);

  return (
    <>
      <div className={styles.curtain} ref={curtainRef} />
      <ServerOnly>
        <Component {...pageProps} />
      </ServerOnly>
      {pageStack.map((page, index) => {
        const { Component: PageComponent, pageProps: PageProps } = page;

        return (
          <div
            key={`${PageComponent?.render?.displayName || index}-${PageProps?.key || index}`}
            style={
              index === 1
                ? { position: "fixed", top: 0, left: 0, zIndex: 1, width: "100%" }
                : { position: "relative", zIndex: 2 }
            }
          >
            <PageComponent
              {...PageProps}
              visible={pageStack.length <= 1}
              innerRef={(el) => index === 0 ? currentRef.current = el : nextRef.current = el}
            />
          </div>
        );
      })}
    </>
  );
}