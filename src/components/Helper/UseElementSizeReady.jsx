import { useEffect, useRef, useState } from 'react'

const UseElementSizeReady = () => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // Need BOTH width/height > 0 for ResponsiveContainer
      if (width > 0 && height > 0) setReady(true);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, ready };
}

export default UseElementSizeReady