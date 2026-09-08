import { Outlet, useLocation } from "react-router-dom";
import OnboardingProgress from "./OnboardingProgress";

const getCurrentStep = (pathname) => {
  if (pathname === "/verify-email") {
    return 1;
  }

  if (pathname === "/choose-role") {
    return 2;
  }

  if (
    pathname === "/employee/profile-setup" ||
    pathname === "/recruiter/profile-setup"
  ) {
    return 3;
  }

  return 1;
};

const OnboardingLayout = () => {
  const { pathname } = useLocation();

  const currentStep = getCurrentStep(pathname);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="mx-auto w-full max-w-5xl px-6 py-8">

        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-xl font-bold text-base-content">
            Opportunis
          </h1>

          <span className="text-sm text-base-content/50">
            Step {currentStep} of 3
          </span>
        </div>
        
        <OnboardingProgress currentStep={currentStep} />

        <main className="mx-auto w-full max-w-4xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OnboardingLayout;