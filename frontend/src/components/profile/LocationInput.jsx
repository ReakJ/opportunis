import { useEffect, useRef, useState } from "react";

const LocationInput = ({ value, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const skipSearch = useRef(false);

  useEffect(() => {
    if (skipSearch.current) {
      skipSearch.current = false;
      return;
    }

    if (!query.trim()) {
      setSuggestions([])
      setLoading(false);
      return;
    }
    const controller = new AbortController();

    const timeoutId = setTimeout(async() => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          text: query,
          type: "city",
          limit: "5",
          apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY,
        });

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?${params}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to search locations");
        }

        const data = await response.json();

        setSuggestions(data.features || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Location search failed:", error)
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);
    
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query])

  const handleSelect = (feature) => {
    const properties = feature.properties;

    const location = {
      city: properties.city || "",
      state: properties.state || "",
      country: properties.country || "",
      countryCode: properties.country_code?.toUpperCase() || "",
      pincode: properties.postcode || "",
    };

    onChange(location);

    skipSearch.current = true;
    setQuery(properties.formatted || "");
    setSuggestions([]);
    setLoading(false);
  };

  return (
    <div className="relative">
      <input 
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search your city or postal code"
        className="input input-bordered w-full"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="loading loading-spinner loading-sm text-primary"/>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg">
          {suggestions.map((feature) => (
            <button
              key={feature.properties.place_id}
              type="button"
              onClick={() => handleSelect(feature)}
              className="block w-full px-4 py-3 text-left hover:bg-base-200"
            >
              <p className="font-medium text-base-content">
                {feature.properties.city || feature.properties.name}
              </p>
              
              <p className="mt-1 text-sm text-base-content/60">
                {feature.properties.formatted}
              </p>
            </button>
          ))}
        </div>
      )}

    </div>
  )
}

export default LocationInput;