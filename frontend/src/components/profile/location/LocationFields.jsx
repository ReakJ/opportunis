import { getNames, getCode } from "country-list";

const LocationFields = ({ value, onChange }) => {
  const handleChange = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label htmlFor="location-city" className="label mb-0.5">
          City
        </label>

        <input 
          id="location-city"
          type="text" 
          value={value.city}
          onChange={(event) => 
            handleChange("city", event.target.value)
          }
          className="input input-bordered w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="location-state" className="label mb-0.5">
          State / Province
        </label>

        <input 
          id="location-state"
          type="text" 
          value={value.state}
          onChange={(event) => 
            handleChange("state", event.target.value)
          }
          className="input input-bordered w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="location-country" className="label mb-0.5">
          Country
        </label>

        <select
          id="location-country"
          value={value.country}
          onChange={(event) => {
            const country = event.target.value;

            onChange({
              ...value,
              country,
              countryCode: getCode(country) || "",
            });
          }}

          className="select w-full h-12 rounded-lg"
        >
          <option value="" disabled>Select country</option>

          {getNames().map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location-pincode" className="label mb-0.5">
          Pincode / Postal Code
        </label>

        <input 
          id="location-pincode"
          type="text" 
          value={value.pincode}
          onChange={(event) => 
            handleChange("pincode", event.target.value)
          }
          className="input input-bordered w-full h-12 rounded-lg transition focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}

export default LocationFields;