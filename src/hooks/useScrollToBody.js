import {useCallback, useEffect, useRef} from "react";
import smoothscroll from "smoothscroll-polyfill";

// 강제 scroll smooth 효과 (Safari)
smoothscroll.polyfill();

export const useScrollToBody = (offsetY) => {
  const scrollRef = useRef();
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      behavior: "smooth",
      top: scrollRef.current.offsetTop - (offsetY || 0),
    });
  }, [offsetY]);

  useEffect(() => {
    return window.scrollTo({top: 0});
  });

  return [scrollRef, scrollToBottom];
};
