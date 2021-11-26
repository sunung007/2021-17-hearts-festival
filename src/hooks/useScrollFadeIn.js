import {useRef, useEffect, useCallback} from "react";

const ANIMATION_DELAY_VALUE = 0.1;

export const useScrollFadeIn = (direction = "up", duration = 1, delay = 0) => {
  const dom = useRef();

  const handleDirection = (name) => {
    switch (name) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return;
    }
  };

  const handleScroll = useCallback(
    ([entry]) => {
      const {current} = dom;
      if (entry.isIntersecting) {
        current.style.transitionProperty =
          "transform, opacity, margin, background";
        current.style.transitionDuration = `${duration}s, ${duration}s, 500ms, 500ms`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s, ${delay}s, 0s, 0s`;
        current.style.opacity = 1;
        current.style.transform = "translate3d(0, 0, 0)";
      }
    },
    [delay, duration]
  );

  useEffect(() => {
    let observer;
    const {current} = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: ANIMATION_DELAY_VALUE,
      });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};
