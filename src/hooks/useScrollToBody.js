import {useCallback, useEffect, useRef} from "react";

export const useScrollToBody = () => {
  const scrollRef = useRef();
  const scrollToBottom = useCallback(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    return window.scrollTo({top: 0});
  });

  return [scrollRef, scrollToBottom];
};
