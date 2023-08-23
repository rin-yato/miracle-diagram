import { mirolangAtom } from '@/jotai/miro-lang-atom';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

export function useMirolang(options = { leading: false, ms: 275 }) {
  const [code, setCodeRaw] = useAtom(mirolangAtom);

  const timeoutRef = useRef<number>(0);
  const leadingRef = useRef(true);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => clearTimeout, []);

  const debouncedSetValue = (newValue: string) => {
    clearTimeout();
    if (leadingRef.current && options.leading) {
      setCodeRaw(newValue);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true;
        setCodeRaw(newValue);
      }, options.ms);
    }
    leadingRef.current = false;
  };

  return [code, debouncedSetValue] as const;
}
