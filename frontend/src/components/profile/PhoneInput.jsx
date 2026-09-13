import { useEffect, useMemo, useRef, useState } from "react";
import {ChevronDown} from "lucide-react"

import * as Flags from "country-flag-icons/react/3x2";

import {
  getCountries,
  getCountryCallingCode,
  formatIncompletePhoneNumber,
} from "libphonenumber-js";

const PhoneInput = ({
  country,
  phoneNumber,
  onCountryChange,
  onPhoneNumberChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);

  const countries = useMemo(() => {
    const displayNames = new Intl.DisplayNames(["en"], {
      type: "region",
    });

    return getCountries()
      .map((countryCode) => ({
        code: countryCode,
        name: displayNames.of(countryCode) || countryCode,
        callingCode: getCountryCallingCode(countryCode),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const selectedCountry = countries.find(
    (item) => item.code === country
  );

  const filteredCountries = countries.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.code.toLowerCase().includes(searchValue) ||
      item.callingCode.includes(searchValue)
    );
  });

  const formattedNumber = phoneNumber
    ? formatIncompletePhoneNumber(phoneNumber, country)
    : "";

  const handleCountrySelect = (countryCode) => {
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearch("");
  };

  const handlePhoneChange = (event) => {
    const digits = event.target.value.replace(/\D/g, "");

    onPhoneNumberChange(digits);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full">
      <div
        ref={dropdownRef}
        className="relative shrink-0"
      >
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-12 items-center gap-2 rounded-l-lg border border-base-content/20 bg-base-100 px-3 text-sm text-base-content transition hover:bg-base-200"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {(() => {
            const Flag = Flags[selectedCountry.code];

            return (
              <Flag
                title={selectedCountry.name}
                className="h-4 w-6 shrink-0"
              />
            );
          })()}

          <span>
            +{selectedCountry.callingCode}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full z-30 mt-2 w-72 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg">
            <div className="border-b border-base-300 p-2">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search country..."
                className="input input-bordered w-full outline-base-content/20 focus:ring-0 focus:border-base-content/20 border-0"
                autoFocus
              />
            </div>

            <div className="max-h-64 overflow-y-auto p-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((item) => {
                  const Flag = Flags[item.code];

                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() =>
                        handleCountrySelect(item.code)
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-base-200 ${
                        item.code === country
                          ? "bg-primary/10 text-primary"
                          : ""
                      }`}
                    >
                      <Flag
                        title={item.name}
                        className="h-4 w-6 shrink-0"
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                      </span>

                      <span className="text-base-content/60">
                        +{item.callingCode}
                      </span>
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-4 text-center text-sm text-base-content/50">
                  No countries found
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        value={formattedNumber}
        onChange={handlePhoneChange}
        placeholder="Enter phone number"
        className="input input-bordered h-12 flex-1 rounded-l-none rounded-r-lg transition focus:outline-none focus:border-accent"
        aria-label="Phone number"
      />
    </div>
  );
};

export default PhoneInput;