import React, { useState } from 'react';
import { BriefcaseBusiness, UserRound, Check } from "lucide-react";

const ChooseRole = () => {
  const [role, setRole] = useState(null);
  
  return (
    <div className="min-h-screen bg-base-200 px-6 py-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Opportunis
          </h1>

          <span className="text-sm text-base-content/50">
            Step 2 of 3
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4 h-1 w-full rounded-full bg-base-300 overflow-hidden">
          <div className="h-full w-2/3 bg-primary rounded-full" />
        </div>

        {/* Introduction */}
        <div className="text-center mt-16">
          <p className="text-sm font-medium text-primary mb-3">
            Let's get started
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How will you use Opportunis?
          </h2>

          <p className="text-base-content/60 mt-4 max-w-lg mx-auto">
            Choose the experience that best describes what you're
            looking for. We'll personalize Opportunis for you.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          
          {/* Employee */}
          <button
            type="button"
            onClick={() => setRole("employee")}
            className={`group text-left rounded-2xl border p-7 transition-all duration-200 ${
              role === "employee"
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`size-12 rounded-xl flex items-center justify-center transition-colors ${
                  role === "employee"
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content/70 group-hover:text-primary"
                }`}
              >
                <UserRound className="size-6" />
              </div>

              {role === "employee" && (
                <div className="size-7 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <Check className="size-4" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold mt-6">
              I'm looking for a job
            </h3>

            <p className="text-base-content/60 mt-2 leading-relaxed">
              Discover opportunities, build your career, and manage
              your job applications.
            </p>
          </button>

          {/* Recruiter */}
          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`group text-left rounded-2xl border p-7 transition-all duration-200 ${
              role === "recruiter"
                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                : "border-base-300 bg-base-100 hover:border-primary/40 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`size-12 rounded-xl flex items-center justify-center transition-colors ${
                  role === "recruiter"
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content/70 group-hover:text-primary"
                }`}
              >
                <BriefcaseBusiness className="size-6" />
              </div>

              {role === "recruiter" && (
                <div className="size-7 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <Check className="size-4" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold mt-6">
              I'm hiring
            </h3>

            <p className="text-base-content/60 mt-2 leading-relaxed">
              Find talented people, post jobs, and manage your
              hiring process.
            </p>
          </button>
        </div>

        {/* Continue */}
        <div className="flex flex-col items-center mt-10">
          <button
            type="button"
            disabled={!role}
            onClick={() => console.log("Selected role: ", role)}
            className="btn btn-primary px-10 w-2xs"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChooseRole;