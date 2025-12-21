import { useEffect, useState } from 'react';
import { usePlannerStore } from '@/store/plannerStore';

export const useStoreHydration = () => {
  const [hydrated, setHydrated] = useState(() => usePlannerStore.persist.hasHydrated());

  useEffect(() => {
    const unsubFinishHydration = usePlannerStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubFinishHydration;
  }, []);

  return hydrated;
};
