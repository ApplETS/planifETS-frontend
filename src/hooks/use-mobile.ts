import * as React from 'react';

export function useIsMobile(mobileBreakpoint = 850) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(globalThis.innerWidth < mobileBreakpoint);
    };
    mql.addEventListener('change', onChange);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIsMobile(globalThis.innerWidth < mobileBreakpoint);
    return () => mql.removeEventListener('change', onChange);
  }, [mobileBreakpoint]);

  return !!isMobile;
}
