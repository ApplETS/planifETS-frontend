import { useEffect, useState } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import { usePlannerStore } from '@/store/plannerStore';

type StoreHydrationState = {
  onboardingHydrated: boolean;
  plannerHydrated: boolean;
  allHydrated: boolean;
};

export const useStoreHydration = () => {
  const isPlannerHydrated = () => usePlannerStore.persist.hasHydrated();
  const isOnboardingHydrated = () => useOnboardingStore.persist.hasHydrated();

  const getHydrationState = (): StoreHydrationState => {
    const plannerHydrated = isPlannerHydrated();
    const onboardingHydrated = isOnboardingHydrated();

    return {
      plannerHydrated,
      onboardingHydrated,
      allHydrated: plannerHydrated && onboardingHydrated,
    };
  };

  const [hydrationState, setHydrationState] = useState<StoreHydrationState>(getHydrationState);

  useEffect(() => {
    const syncHydration = () => {
      setHydrationState(getHydrationState());
    };

    const unsubPlannerHydration = usePlannerStore.persist.onFinishHydration(syncHydration);
    const unsubOnboardingHydration = useOnboardingStore.persist.onFinishHydration(syncHydration);

    return () => {
      unsubPlannerHydration();
      unsubOnboardingHydration();
    };
  }, []);

  return hydrationState;
};
