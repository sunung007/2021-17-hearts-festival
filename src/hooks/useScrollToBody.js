import {useCallback, useEffect, useRef} from "react";

export const useScrollToBody = (offsetY) => {
  const scrollRef = useRef();
  const scrollToBottom = useCallback(() => {
    // scrollRef.current.scrollIntoView({
    //   behavior: "smooth",
    //   top: scrollRef.current.offsetTop - (offsetY || 0),
    // });
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
