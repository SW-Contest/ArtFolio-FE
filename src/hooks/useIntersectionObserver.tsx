import { useRef } from "react";
export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element: any) => {
    observer.current.observe(element);
  };

  const unObserve = (element: any) => {
    observer.current.unobserve(element);
  };

  return [observe, unObserve];
}
