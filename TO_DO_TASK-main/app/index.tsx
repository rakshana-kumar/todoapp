import React, { useEffect } from 'react';
import { router, useRootNavigationState } from 'expo-router';

export default function Index() {
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Only navigate after the root navigation state is ready
    if (rootNavigationState?.key) {
      router.replace('/onboarding');
    }
  }, [rootNavigationState]);

  return null;
}