import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useOnboarding } from "../../context/useOnboarding";
import { recruiterProfileSchema } from "../../validation/recruiterProfileSchema";

import PhoneInput from "../../components/profile/PhoneInput";
import LocationInput from "../../components/profile/location/LocationInput";


const RecruiterProfileSetup = () => {
  const { createRecruiterProfile } = useOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recruiterProfileSchema),
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
          pincode: ""
        },
      },

      professional: {
        designation: "",
      },

      company: {
        name: "",
        industry: "",
        size: "",
        location: {
          city: "",
          state: "",
          country: "",
          countryCode: "",
          pincode: ""
        },
      },
    },
  });

  const handlePhoneNumberChange = (value) => {
    setValue("personal.phone", value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleLocationChange = (newLocation) => {
    setValue("personal.location", newLocation, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleCompanyLocationChange = (newCompanyLocation) => {
    setValue("company.location", newCompanyLocation, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmit = async (data) => {
    try {
      await createRecruiterProfile(data);
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full pt-20">
      <div className="text-center">
        <p className="text-sm font-medium text-primary">
          Almost there
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Set up your recruiter profile
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-base text-base-content/60">
          Tell us a little about yourself and your company to get started on Opportunis.
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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label 
                  htmlFor="firstName"
                  className="label mb-0.5"
                >
                  First Name
                </label>

                <input 
                  type="text" 
                  id="firstName"
                  placeholder="e.g. John"
                  className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("personal.firstName")}
                />

                {errors.personal?.firstName && (
                  <p className="mt-1 text-sm text-error">
                    {errors.personal.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label 
                  htmlFor="lastName"
                  className="label mb-0.5"
                >
                  Last Name
                </label>

                <input 
                  type="text" 
                  id="lastName"
                  placeholder="e.g. Doe"
                  className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("personal.lastName")}
                />

                {errors.personal?.lastName && (
                  <p className="mt-1 text-sm text-error">
                    {errors.personal.lastName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label 
                  htmlFor="phone"
                  className="label mb-0.5"
                >
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
              
              {/* Location */}
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

          <div className="divider my-8"/>

          {/* Professional Information */}
          <section>
            <h2 className="text-xl font-semibold">
              Professional Information
            </h2>

            <div className="mt-6">
              <label 
                htmlFor="designation"
                className="label mb-0.5"
              >
                Designation
              </label>

              <input 
                type="text" 
                id="designation"
                placeholder="e.g. HR Manager"
                className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                {...register("professional.designation")}
              />

              {errors.professional?.designation && (
                <p className="mt-1 text-sm text-error">
                  {errors.professional.designation.message}
                </p>
              )}
            </div>
          </section>

          <div className="divider my-8" />

          {/* Company Information */}
          <section>
            <h2 className="text-xl font-semibold">
              Company Information
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label 
                  htmlFor="companyName"
                  className="label mb-0.5"
                >
                  Company Name
                </label>

                <input 
                  type="text"
                  id="companyName" 
                  placeholder="e.g. ABC Pvt. Ltd."
                  className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("company.name")}
                />

                {errors.company?.name && (
                  <p className="mt-1 text-sm text-error">
                    {errors.company.name.message}
                  </p>
                )}
              </div>
              
              {/* Industry */}
              <div>
                <label 
                  htmlFor="industry"
                  className="label mb-0.5"
                >
                  Industry
                </label>

                <input 
                  id="industry" 
                  type="text"
                  placeholder="e.g. Information Technology"
                  className="input w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
                  {...register("company.industry")}
                />

                {errors.company?.industry && (
                  <p className="mt-1 text-sm text-error">
                    {errors.company.industry.message}
                  </p>
                )}
              </div>

              {/* Company Size */}
              <div className="md:col-span-2">
                <label 
                  htmlFor="company-size"
                  className="label mb-0.5"
                >
                  Company Size
                </label>

                <select
                  id="company-size"
                  className="select select-bordered w-full h-12 rounded-lg"
                  {...register("company.size")}
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001-5000">1001-5000 employees</option>
                  <option value="5000+">5000+ employees</option>
                </select>

                {errors.company?.size && (
                  <p className="mt-1 text-sm text-error">
                    {errors.company.size.message}
                  </p>
                )}
              </div>

              {/* Company Location */}
              <div className="md:col-span-2">
                <label className="label mb-0.5">
                  Company Location
                </label>

                <LocationInput 
                  onChange={handleCompanyLocationChange}
                />

                {errors.company?.location && (
                  <p className="mt-1 text-sm text-error">
                    Please provide your complete location.
                  </p>
                )}
              </div>
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
                  <span className="loading loading-spinner loading-sm">
                  Saving...
                  </span>
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

export default RecruiterProfileSetup;