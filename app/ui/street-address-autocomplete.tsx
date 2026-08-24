"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

let mapsPromise: Promise<void> | null = null;

function loadGoogleMaps(key: string) {
  if (typeof window !== "undefined" && window.google?.maps) return Promise.resolve();
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-asoose-maps]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Google Maps failed to load.")));
      return;
    }

    const script = document.createElement("script");
    script.dataset.asooseMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });

  return mapsPromise;
}

type SelectedAddress = {
  street: string;
  city?: string;
  state?: string;
  latitude: number;
  longitude: number;
};

type StreetAddressAutocompleteProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSelect: (address: SelectedAddress) => void;
};

function addressPart(components: google.maps.places.AddressComponent[] | undefined, type: string) {
  return components?.find((component) => component.types.includes(type))?.longText ?? undefined;
}

export default function StreetAddressAutocomplete({ value, disabled, onChange, onSelect }: StreetAddressAutocompleteProps) {
  const [ready, setReady] = useState(false);
  const [suggestions, setSuggestions] = useState<google.maps.places.PlacePrediction[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!key) return;
    let cancelled = false;
    loadGoogleMaps(key)
      .then(() => { if (!cancelled) setReady(true); })
      .catch((reason) => { if (!cancelled) setError(reason instanceof Error ? reason.message : "Google Maps failed to load."); });
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [key]);

  function changeValue(nextValue: string) {
    onChange(nextValue);
    setError("");
    setActiveSuggestion(-1);
    if (timer.current) clearTimeout(timer.current);
    if (!ready || nextValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    timer.current = setTimeout(() => { void fetchSuggestions(nextValue); }, 280);
  }

  async function fetchSuggestions(input: string) {
    try {
      const { AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      sessionToken.current ??= new AutocompleteSessionToken();
      const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input,
        includedRegionCodes: ["ng"],
        region: "ng",
        sessionToken: sessionToken.current,
      });
      setSuggestions(results
        .map((suggestion) => suggestion.placePrediction)
        .filter((prediction): prediction is google.maps.places.PlacePrediction => prediction !== null)
        .slice(0, 6));
    } catch (reason) {
      setSuggestions([]);
      setError(reason instanceof Error ? reason.message : "Unable to load address suggestions.");
    }
  }

  async function chooseSuggestion(prediction: google.maps.places.PlacePrediction) {
    setSuggestions([]);
    setActiveSuggestion(-1);
    setError("");
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ["addressComponents", "formattedAddress", "location"] });
      if (!place.location) throw new Error("This address does not have a map location.");

      const components = place.addressComponents;
      const streetNumber = addressPart(components, "street_number");
      const route = addressPart(components, "route");
      const premise = addressPart(components, "premise");
      const street = [streetNumber, route].filter(Boolean).join(" ") || premise || prediction.mainText?.text || prediction.text.text;
      onSelect({
        street,
        city: addressPart(components, "locality") || addressPart(components, "postal_town") || addressPart(components, "administrative_area_level_2"),
        state: addressPart(components, "administrative_area_level_1"),
        latitude: place.location.lat(),
        longitude: place.location.lng(),
      });
      sessionToken.current = null;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to select this address.");
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && suggestions.length) {
      event.preventDefault();
      setActiveSuggestion((current) => Math.min(current + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp" && suggestions.length) {
      event.preventDefault();
      setActiveSuggestion((current) => Math.max(current - 1, 0));
    } else if (event.key === "Escape") {
      setSuggestions([]);
      setActiveSuggestion(-1);
    } else if (event.key === "Enter" && suggestions.length) {
      event.preventDefault();
      void chooseSuggestion(suggestions[Math.max(activeSuggestion, 0)]);
    }
  }

  return <label className="form-field full profile-address-autocomplete">
    <span>Street address</span>
    <input
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={suggestions.length > 0}
      aria-controls="profile-address-suggestions"
      autoComplete="street-address"
      value={value ?? ""}
      disabled={disabled}
      onChange={(event) => changeValue(event.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => setTimeout(() => setSuggestions([]), 150)}
      placeholder="Start typing a Nigerian street address"
    />
    {!disabled && suggestions.length > 0 && <div className="map-suggestions" id="profile-address-suggestions" role="listbox">
      {suggestions.map((prediction, index) => <button
        type="button"
        role="option"
        aria-selected={activeSuggestion === index}
        className={activeSuggestion === index ? "active" : ""}
        key={prediction.placeId}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => void chooseSuggestion(prediction)}
      >
        <span><strong>{prediction.mainText?.text || prediction.text.text}</strong><small>{prediction.secondaryText?.text || "Nigeria"}</small></span>
      </button>)}
    </div>}
    {!disabled && !key && <small className="field-help">Google suggestions require NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</small>}
    {!disabled && error && <small className="field-error">{error}</small>}
  </label>;
}
