export function debounce(fn: any, delay: number): any {
  let handler = null;
  return () => {
    if (handler) {
      clearTimeout(handler);
    }
    handler = setTimeout(fn, delay);
  };
}
