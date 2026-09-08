import React from "react";

const steps = [
  { number: 1, label: "Account" },
  { number: 2, label: "Your Goal" },
  { number: 3, label: "Your Profile" },
];

const OnboardingProgress = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-4">
        {steps.map((step, index) => {
          const completed = step.number < currentStep;
          const active = step.number === currentStep;

          return (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex size-8 items-center justify-center rounded-full border text-sm font-medium ${
                    completed
                      ? "border-primary bg-primary text-primary-content"
                      : active
                        ? "border-primary text-primary"
                        : "border-base-300 text-base-content/40"
                  }`}
                >
                  {completed ? "✓" : step.number}
                </div>

                <span
                  className={`whitespace-nowrap text-sm ${
                    active
                      ? "font-medium text-base-content"
                      : completed
                        ? "text-base-content/70"
                        : "text-base-content/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`h-px w-full ${
                    step.number < currentStep
                      ? "bg-primary"
                      : "bg-base-content/50"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingProgress;