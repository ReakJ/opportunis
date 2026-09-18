import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LocationInput from "../../components/profile/location/LocationInput";
import PhoneInput from "../../components/profile/PhoneInput";
import SkillSelector from "../../components/profile/SkillSelector";

import { employeeProfileSchema } from "../../validation/employeeProfileSchema";
import { useOnboarding } from "../../context/useOnboarding";
import toast from "react-hot-toast";

const EmployeeProfileSetup = () => {
  const { createEmployeeProfile } = useOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(employeeProfileSchema),
    defaultValues: {
      personal: {
        firstName: "",
        lastName: "",
        phone: "",
        location: {
          city: "",
          state: "",
          country: "",
          countryCode: "",
          pincode: "",
        }
      },
      professional: {
        headline: "",
        experienceLevel: "",
      },
      skills: [],
    },
  });

  const handleLocationChange = (newLocation) => {
    setValue("personal.location", newLocation, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handlePhoneNumberChange = (value) => {
    setValue("personal.phone", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSkillsChange = (skills) => {
    setValue("skills", skills, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (profileData) => {
    try {
      await createEmployeeProfile(profileData);
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="w-full pt-20">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">
          Almost there
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Set up your profile
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-base text-base-content/60">
          Tell us a little about yourself so we can personalize your
          experience on Opportunis.
        </p>
      </div>

      <div className="card mt-10 border border-base-300 bg-base-100 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
        >

          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>
                <label htmlFor="firstName" className="label mb-0.5">
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("personal.firstName")}
                />

                {errors.personal?.firstName && (
                  <p className="mt-1 text-sm text-error">
                    {errors.personal.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="label mb-0.5">
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("personal.lastName")}
                />

                {errors.personal?.lastName && (
                  <p className="mt-1 text-sm text-error">
                    {errors.personal.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="label mb-0.5">
                  Phone Number
                </label>

                <PhoneInput 
                  defaultCountry="IN"
                  onChange={handlePhoneNumberChange}
                />

                {errors.personal?.phone && (
                  <p className="mt-1 text-sm text-error">
                    {errors.personal.phone.message}
                  </p>
                )}             
              </div>

              <div className="md:col-span-2">
                <label className="label mb-0.5">
                  Location
                </label>

                <LocationInput 
                  onChange={handleLocationChange}
                />

                {errors.personal?.location && (
                  <p className="mt-1 text-sm text-error">
                    Please provide your complete location.
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="divider my-8" />

          {/* Professional Information */}
          <section>
            <h2 className="text-xl font-semibold">
              Professional Information
            </h2>

            <div className="mt-6 space-y-6">

              <div>
                <label htmlFor="headline" className="label mb-0.5">
                  Professional Headline
                </label>
                <input
                  id="headline"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  className="input input-bordered w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("professional.headline")}
                />

                {errors.professional?.headline && (
                  <p className="mt-1 text-sm text-error">
                    {errors.professional.headline.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="experienceLevel" className="label mb-0.5">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  className="select select-bordered w-full h-12 border-base-content/20 rounded-lg transition focus:outline-none focus:border-accent"
                  defaultValue=""
                  {...register("professional.experienceLevel")}
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  <option value="fresher">Fresher</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>

                {errors.professional?.experienceLevel && (
                  <p className="mt-1 text-sm text-error">
                    {errors.professional.experienceLevel.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="divider my-8" />

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold">
              Skills
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              Add the skills you have that are relevant to your career.
            </p>

            <div className="mt-6">
              <SkillSelector 
                onChange={handleSkillsChange}
              />

              {errors.skills && (
                <p className="mt-2 text-sm text-error">
                  {errors.skills.message}
                </p>
              )}
            </div>
          </section>

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-8"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                "Continue →"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileSetup;