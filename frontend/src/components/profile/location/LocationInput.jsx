import { useState } from "react";

import LocationSearch from "./LocationSearch";
import LocationFields from "./LocationFields";

const EMPTY_LOCATION = {
  city: "",
  state: "",
  country: "",
  countryCode: "",
  pincode: "",
}

const LocationInput = ({ onChange }) => {
  const [location, setLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState(false);

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
    onChange(newLocation);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    onChange(newLocation);
  };

  const handleSearchLocation = () => {
    setManualLocation(false);
    setLocation(null);
    onChange({ ...EMPTY_LOCATION });
  };

  const handleManualLocation = () => {
    setManualLocation(true);
    setLocation(null);
    onChange({ ...EMPTY_LOCATION });
  };

  const handleResetLocation = () => {
    setLocation(null);
    onChange({ ...EMPTY_LOCATION });
  }


  return (
    <div>
      <LocationSearch 
        onSelect={handleLocationSelect}
        disabled={manualLocation}
      />

      {!manualLocation && !location && (
        <button
          type="button"
          onClick={handleManualLocation}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Can't find your location? Enter it manually
        </button>
      )}

      {location && !manualLocation && (
        <div className="mt-5">
          <LocationFields
            value={location}
            onChange={handleLocationChange}
          />

          <button
            type="button"
            onClick={handleResetLocation}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Search another location
          </button>
        </div>
      )}

      {manualLocation && (
        <div className="mt-5">
          <LocationFields
            value={location || EMPTY_LOCATION}
            onChange={handleLocationChange}
          />

          <button
            type="button"
            onClick={handleSearchLocation}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Search for your location instead
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationInput;