import React, { useState } from 'react';
import { BriefcaseBusiness, UserRound, Check } from "lucide-react";
import { useOnboarding } from '../../context/useOnboarding';
import toast from 'react-hot-toast';

const ChooseRole = () => {
  const { updateRole } = useOnboarding();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRole = async () => {
    try {
      setLoading(true);

      await updateRole(role);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  }
  
return (
    <div className="w-full pt-20">
      {/* Introduction */}
      <div className="text-center">
        <p className="mb-3 text-sm font-medium text-primary">
          Let's get started
        </p>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          How will you use Opportunis?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-base text-base-content/60">
          Choose the experience that best describes what you're
          looking for. We'll personalize Opportunis for you.
        </p>
      </div>

      {/* Role Selection */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Employee */}
        <button
          type="button"
          onClick={() => setRole("employee")}
          className={`group rounded-2xl border p-7 text-left transition-all duration-200 ${
            role === "employee"
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-md"
          }`}
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex size-12 items-center justify-center rounded-xl transition-colors ${
                role === "employee"
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content/70 group-hover:text-primary"
              }`}
            >
              <UserRound className="size-6" />
            </div>

            {role === "employee" && (
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-content">
                <Check className="size-4" />
              </div>
            )}
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            I'm looking for a job
          </h3>

          <p className="mt-2 leading-relaxed text-base-content/60">
            Discover opportunities, build your career, and manage
            your job applications.
          </p>
        </button>

        {/* Recruiter */}
        <button
          type="button"
          onClick={() => setRole("recruiter")}
          className={`group rounded-2xl border p-7 text-left transition-all duration-200 ${
            role === "recruiter"
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-md"
          }`}
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex size-12 items-center justify-center rounded-xl transition-colors ${
                role === "recruiter"
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content/70 group-hover:text-primary"
              }`}
            >
              <BriefcaseBusiness className="size-6" />
            </div>

            {role === "recruiter" && (
              <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-content">
                <Check className="size-4" />
              </div>
            )}
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            I'm hiring
          </h3>

          <p className="mt-2 leading-relaxed text-base-content/60">
            Find talented people, post jobs, and manage your
            hiring process.
          </p>
        </button>
      </div>

      {/* Continue */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!role || loading}
          onClick={handleRole}
          className="btn btn-primary w-full max-w-xs"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Processing...
            </>
          ) : (
            "Continue →"
          )}
        </button>
      </div>
    </div>
  );
}

export default ChooseRole;