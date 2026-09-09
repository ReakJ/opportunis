const EmployeeProfileSetup = () => {
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
        <div className="card-body">

          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-semibold">
              Personal Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>
                <label htmlFor="firstName" className="label">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="state" className="label">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="country" className="label">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="input input-bordered w-full"
                />
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
                <label htmlFor="headline" className="label">
                  Professional Headline
                </label>
                <input
                  id="headline"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label htmlFor="experienceLevel" className="label">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  <option value="fresher">Fresher</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
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

            <div className="mt-6 flex gap-3">
              <input
                type="text"
                placeholder="e.g. React"
                className="input input-bordered flex-1"
              />

              <button
                type="button"
                className="btn btn-primary"
              >
                Add
              </button>
            </div>

            {/* Skill chips will go here later */}

          </section>

          <div className="mt-10 flex justify-end">
            <button
              type="button"
              className="btn btn-primary px-8"
            >
              Continue →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileSetup;