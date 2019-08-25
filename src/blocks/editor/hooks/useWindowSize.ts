import { useEffect, useState } from "react";
import { debounce } from "utils/debounce";

export function useWindowSize(): [number, number] {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handler = debounce(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, 50);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return [width, height];
}
