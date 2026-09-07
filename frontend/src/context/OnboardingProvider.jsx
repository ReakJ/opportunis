import { useCallback, useEffect, useState } from "react";

import { useAuth } from "./useAuth";
import { OnboardingContext } from "./OnboardingContext";

import { 
  syncOnboarding as syncOnboardingService,
  updateRole as updateRoleService,
} from "../services/onboardingService";

const OnboardingProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();

  const [onboarding, setOnboarding] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncOnboarding = useCallback(async () => {
    try {
      setLoading(true);

      const result = await syncOnboardingService();

      setOnboarding(result.data);
    } catch (error) {
      console.error("Onboarding sync failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRole = useCallback(async (role) => {
    try {
      setLoading(true);

      const result = await updateRoleService(role);

      setOnboarding(result.data);

      return result.data
    } catch (error) {
      console.error("Onboarding sync failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user || !user.emailVerified) {
      setOnboarding(null);
      setLoading(false);
      return;
    }

    syncOnboarding();
  }, [user, authLoading, syncOnboarding]);

  return (
    <OnboardingContext.Provider
      value={{
        onboarding,
        loading,
        syncOnboarding,
        updateRole
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;