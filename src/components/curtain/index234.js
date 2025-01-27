import { useStore } from "@/lib/store/useStore";
import { useRef, useState, useEffect } from "react";
import { ServerOnly } from "@/components/isomorphic";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import gsap from "gsap";
import { isItEqual } from "@/lib/store/isItEqual";
import cn from "clsx";
import st from "./curtain.module.css";

export function Curtain({ Component, pageProps }) {
  const curtainRef = useRef(null);
  const [setOverflow] = useStore(state => [state.setOverflow], isItEqual);
  const [components, setComponents] = useState([]);
  
  const prevComponentRef = useRef(null);
  const nextComponentRef = useRef(null);
  
  const isMobile = useMediaQuery("(max-width: 800px)");

  const resetTransition = () => {
    setOverflow(true);
    window.scrollTo(0, 0);
    prevComponentRef.current = null;
    nextComponentRef.current = null;
    setComponents(prev => prev.length > 1 ? prev.slice(-(prev.length - 1)) : prev);
  };

  const handleCurtainAnimation = (theme) => {
    if (!curtainRef.current) return;

    curtainRef.current.className = cn(st.curtain, `theme-${theme}`);
    
    const timeline = gsap.timeline();
    timeline
      .to(curtainRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 1.2,
        ease: "expo.out"
      })
      .call(resetTransition)
      .set(curtainRef.current, {
        scaleY: 0
      }, "+=0.25");
  };

  const handleCustomTransition = (prevDisplayName, nextDisplayName, prevProps) => {
    const prev = prevComponentRef.current;
    const next = nextComponentRef.current;

    const transitionProps = {
      from: prevDisplayName,
      to: nextDisplayName,
    };

    return Promise.all([
      prev.animateOut(transitionProps),
      next.animateIn({ ...transitionProps, props: prevProps })
    ]).then(resetTransition);
  };

  // Update components when Component or pageProps change
  useEffect(() => {
    setOverflow(false);
    setComponents(prev => {
      const lastComponent = prev[prev.length - 1];
      const isSameComponent = 
        lastComponent?.Component === Component && 
        lastComponent?.pageProps?.key === pageProps?.key;
      
      return isSameComponent ? prev : [...prev, { Component, pageProps }];
    });
  }, [Component, pageProps, setOverflow]);

  // Handle transitions
  useEffect(() => {
    if (isMobile) {
      resetTransition();
      return;
    }

    if (components.length <= 1) return;

    const [prevComponent, nextComponent] = components;
    const prevDisplayName = prevComponent?.Component?.render?.displayName;
    const nextDisplayName = nextComponent?.Component?.render?.displayName;
    
    const prev = prevComponentRef.current;
    const next = nextComponentRef.current;
    
    const canAnimateTransition = 
      next?.animateIn && 
      prev?.animateOut && 
      prevDisplayName !== nextDisplayName;

    if (canAnimateTransition) {
      handleCustomTransition(prevDisplayName, nextDisplayName, prev?.props);
    } else {
      handleCurtainAnimation(nextComponent?.pageProps?.theme);
    }
  }, [components, isMobile]);

  const getComponentStyle = (index) => {
    return index === 1 
      ? {
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%"
        }
      : {
          position: "relative",
          zIndex: 2
        };
  };

  const setComponentRef = (index, element) => {
    if (index === 0) {
      prevComponentRef.current = element;
    } else {
      nextComponentRef.current = element;
    }
  };

  return (
    <>
      <div className={st.curtain} ref={curtainRef} />
      <ServerOnly>
        <Component {...pageProps} />
      </ServerOnly>
      {components.map((item, index) => {
        const { Component: ItemComponent, pageProps: itemProps } = item;
        const displayName = ItemComponent?.render?.displayName;
        const key = `${displayName}${itemProps?.key || index}`;

        return (
          <div key={key} style={getComponentStyle(index)}>
            <ItemComponent 
              {...itemProps}
              visible={components.length <= 1}
              innerRef={(element) => setComponentRef(index, element)}
            />
          </div>
        );
      })}
    </>
  );
}