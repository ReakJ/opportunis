import { useCallback, useEffect, useState } from "react";

import { useAuth } from "./useAuth";
import { OnboardingContext } from "./OnboardingContext";

import { 
  syncOnboarding as syncOnboardingService,
  updateRole as updateRoleService,
  createEmployeeProfile as createEmployeeProfileService,
  createRecruiterProfile as createRecruiterProfileService
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
      throw error;
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
      console.error("Role failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEmployeeProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);

      const result = await createEmployeeProfileService(profileData);

      setOnboarding((current) => ({
        ...current,
        onboardingStatus: "completed"
      }));

      return result.data
    } catch (error) {
      console.error("Employee profile creation failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRecruiterProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);

      const result = await createRecruiterProfileService(profileData);

      setOnboarding((current) => ({
        ...current,
        onboardingStatus: "completed"
      }));

      return result.data
    } catch (error) {
      console.error("Recruiter profile creation failed:", error);
      throw error;
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
        updateRole,
        createEmployeeProfile,
        createRecruiterProfile
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;