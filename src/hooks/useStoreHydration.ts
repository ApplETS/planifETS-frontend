import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';

export const useStoreHydration = () => {
  const isHydrated = () =>
    usePlannerStore.persist.hasHydrated() && useOnboardingStore.persist.hasHydrated();

  const [hydrated, setHydrated] = useState(isHydrated);

  useEffect(() => {
    const syncHydration = () => {
      setHydrated(isHydrated());
    };

    const unsubPlannerHydration = usePlannerStore.persist.onFinishHydration(syncHydration);
    const unsubOnboardingHydration = useOnboardingStore.persist.onFinishHydration(syncHydration);

    return () => {
      unsubPlannerHydration();
      unsubOnboardingHydration();
    };
  }, []);

  return hydrated;
};
