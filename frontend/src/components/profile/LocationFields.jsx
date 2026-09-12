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
        <label htmlFor="location-city" className="label">
          City
        </label>

        <input 
          id="location-city"
          type="text" 
          value={value.city}
          onChange={(event) => 
            handleChange("city", event.target.value)
          }
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label htmlFor="location-state" className="label">
          State / Province
        </label>

        <input 
          id="location-state"
          type="text" 
          value={value.state}
          onChange={(event) => 
            handleChange("state", event.target.value)
          }
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label htmlFor="location-country" className="label">
          Country
        </label>

        <input 
          id="location-country"
          type="text" 
          value={value.country}
          onChange={(event) => 
            handleChange("country", event.target.value)
          }
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label htmlFor="location-pincode" className="label">
          Pincode / Postal Code
        </label>

        <input 
          id="location-pincode"
          type="text" 
          value={value.pincode}
          onChange={(event) => 
            handleChange("pincode", event.target.value)
          }
          className="input input-bordered w-full"
        />
      </div>
    </div>
  )
}

export default LocationFields;