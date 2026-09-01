import { useEffect, useRef, useState } from 'react';

// Same animation as @unctad-infovis/general-tools RollingNumber, but formats the
// final text with a locale (see src/jsx/i18n.js) instead of a hardcoded 'en-US',
// so thousands separators follow each language's own convention
// (e.g. es-ES "4.000", fr-FR "4 000", en-US "4,000").
export default function RollingNumberLocalized({ target, duration = 1200, decimals = 0, inView = false, locale = 'en-US' }) {
  const [value, setValue] = useState(0);
  const firedRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!inView || firedRef.current) return;
    firedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let startTs = null;

    function tick(ts) {
      if (!startTs) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(decimals === 0 ? Math.round(eased * target) : parseFloat((eased * target).toFixed(decimals)));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration, decimals]);

  return <>{value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: true })}</>;
}
