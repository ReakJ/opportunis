import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { syncOnboarding } from "../services/onboardingService";

const OnboardingGuard = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const [onboarding, setOnboarding] = useState(null)
  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    const sync = async () => {
      if (!user || !user.emailVerified) {
        setSyncLoading(false);
        return;
      }

      try {
        const result = await syncOnboarding();

        setOnboarding(result.data);
      } catch (error) {
        console.error("Onboarding sync failed:", error);
      } finally {
        setSyncLoading(false);
      }
    };

    sync();
  }, [user, location.pathname])
  
  if (!user) {
    return <Navigate to="/sign-in" replace />
  }

  if (loading || syncLoading || (user?.emailVerified && !onboarding)) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="text-sm text-base-content/60">
          Loading...
        </p>
      </div>
    );
  }

  if (!user.emailVerified) {
    if (location.pathname === "/verify-email") {
      return <Outlet />;
    }

    return <Navigate to="/verify-email" replace />;
  }

  if (!onboarding) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <p className="text-error">
          Unable to load onboarding status.
        </p>
      </div>
    );
  }

  const { role, onboardingStatus } = onboarding;

  if (onboardingStatus === "role_selection") {
    if (location.pathname !== "/choose-role") {
      return <Navigate to="/choose-role" replace/>
    }
  }

  if (onboardingStatus === "profile_setup") {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <p>
          Profile setup coming next...
        </p>
      </div>
    );
  }

  if (onboardingStatus === "completed") {
    if (location.pathname !== "/dashboard") {
      return <Navigate to="/dashboard" replace/>
    }
  }

  return <Outlet />
};

export default OnboardingGuard;