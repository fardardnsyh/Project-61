import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { cities } from "@/lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const citiesList = useMemo(() => {
      if (!locationSearchInput.trim())
        return cities.map(
          (city) => `${city.name}, ${city.state}, ${city.country}`,
        );

      const searchWords = locationSearchInput.split(" ");

      return cities
        .map((city) => `${city.name}, ${city.state}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a city..."
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          {...props}
          autoComplete="off"
          ref={ref}
        />
        {hasFocus && (
          <div className="absolute top-[calc(100%_+_5px)] z-20 max-h-[250px] w-full overflow-y-scroll rounded-b-lg border-x border-b bg-background shadow-xl">
            {!citiesList.length && <p className="p-3">No results found.</p>}
            {citiesList.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-start hover:bg-secondary"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
