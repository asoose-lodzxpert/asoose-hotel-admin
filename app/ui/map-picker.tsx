"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";

let mapsPromise: Promise<void> | null = null;

function loadGoogleMaps(key: string) {
  if (typeof window !== "undefined" && window.google?.maps) return Promise.resolve();
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-asoose-maps]");
    if (existing) { existing.addEventListener("load", () => resolve()); existing.addEventListener("error", () => reject(new Error("Google Maps failed to load."))); return; }
    const script = document.createElement("script");
    script.dataset.asooseMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=marker&v=weekly`;
    script.async = true; script.defer = true; script.onload = () => resolve(); script.onerror = () => reject(new Error("Google Maps failed to load."));
    document.head.appendChild(script);
  });
  return mapsPromise;
}

type MapPickerProps = {
  lat: number;
  lng: number;
  address: string;
  onChange: (value: { lat: number; lng: number; address?: string }) => void;
};

export default function MapPicker({ lat, lng, address, onChange }: MapPickerProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const onChangeRef = useRef(onChange);
  const initialCenter = useRef({ lat, lng });
  const suggestionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [query, setQuery] = useState(address);
  const [suggestions, setSuggestions] = useState<google.maps.places.PlacePrediction[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [ready, setReady] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  useEffect(() => {
    if (!key || !mapElement.current) return;
    let cancelled = false;
    loadGoogleMaps(key).then(async () => {
      if (cancelled || !mapElement.current) return;
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const center = { lat: initialCenter.current.lat || 9.082, lng: initialCenter.current.lng || 8.6753 };
      const map = new Map(mapElement.current, { center, zoom: initialCenter.current.lat && initialCenter.current.lng ? 16 : 6, mapId: "DEMO_MAP_ID", streetViewControl: false, mapTypeControl: false, fullscreenControl: false });
      const marker = new AdvancedMarkerElement({ map, position: center, gmpDraggable: true, title: "Property location" });
      marker.addListener("dragend", () => {
        const position = marker.position;
        const nextLat = typeof position?.lat === "number" ? position.lat : position?.lat();
        const nextLng = typeof position?.lng === "number" ? position.lng : position?.lng();
        if (nextLat != null && nextLng != null) onChangeRef.current({ lat: nextLat, lng: nextLng });
      });
      map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;
        const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        marker.position = position; onChangeRef.current(position);
      });
      mapRef.current = map; markerRef.current = marker; setReady(true);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : "Google Maps failed to load."));
    return () => { cancelled = true; if (suggestionTimer.current) clearTimeout(suggestionTimer.current); if (markerRef.current?.map) markerRef.current.map = null; };
  }, [key]);

  useEffect(() => {
    if (!ready || !lat || !lng) return;
    const position = { lat, lng }; markerRef.current!.position = position; mapRef.current?.panTo(position);
  }, [lat, lng, ready]);

  async function search() {
    if (!query.trim()) return;
    if (!window.google?.maps) { setError("Google Maps is still loading. Please try again."); return; }
    setSearching(true); setError("");
    try {
      const result = await new google.maps.Geocoder().geocode({ address: query });
      const place = result.results[0];
      if (!place) throw new Error("No matching location was found.");
      const position = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      mapRef.current?.setZoom(16); mapRef.current?.panTo(position); if (markerRef.current) markerRef.current.position = position;
      onChange({ ...position, address: place.formatted_address });
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Location search failed."); }
    finally { setSearching(false); }
  }

  function changeQuery(value: string) {
    setQuery(value); setActiveSuggestion(-1);
    if (suggestionTimer.current) clearTimeout(suggestionTimer.current);
    if (!ready || value.trim().length < 3) { setSuggestions([]); return; }
    suggestionTimer.current = setTimeout(() => { void fetchSuggestions(value); }, 280);
  }

  async function fetchSuggestions(value: string) {
    try {
      const { AutocompleteSessionToken, AutocompleteSuggestion } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      sessionToken.current ??= new AutocompleteSessionToken();
      const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: value,
        includedRegionCodes: ["ng"],
        region: "ng",
        sessionToken: sessionToken.current,
        ...(lat && lng ? { locationBias: { center: { lat, lng }, radius: 50_000 } } : {}),
      });
      setSuggestions(results.map((item) => item.placePrediction).filter((item): item is google.maps.places.PlacePrediction => item !== null).slice(0, 6));
    } catch (reason) {
      setSuggestions([]);
      setError(reason instanceof Error ? reason.message : "Unable to load location suggestions.");
    }
  }

  async function chooseSuggestion(prediction: google.maps.places.PlacePrediction) {
    setSearching(true); setSuggestions([]); setActiveSuggestion(-1); setError("");
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ["displayName", "formattedAddress", "location"] });
      if (!place.location) throw new Error("This suggestion does not have a map location.");
      const position = { lat: place.location.lat(), lng: place.location.lng() };
      const nextAddress = place.formattedAddress || prediction.text.text;
      setQuery(nextAddress); mapRef.current?.setZoom(16); mapRef.current?.panTo(position);
      if (markerRef.current) markerRef.current.position = position;
      onChange({ ...position, address: nextAddress });
      sessionToken.current = null;
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to select this location."); }
    finally { setSearching(false); }
  }

  function handleSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && suggestions.length) { event.preventDefault(); setActiveSuggestion((current) => Math.min(current + 1, suggestions.length - 1)); return; }
    if (event.key === "ArrowUp" && suggestions.length) { event.preventDefault(); setActiveSuggestion((current) => Math.max(current - 1, 0)); return; }
    if (event.key === "Escape") { setSuggestions([]); setActiveSuggestion(-1); return; }
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) void chooseSuggestion(suggestions[activeSuggestion]);
      else if (suggestions[0]) void chooseSuggestion(suggestions[0]);
      else void search();
    }
  }

  if (!key) return <div className="map-fallback"><div className="map-fallback-copy"><strong>Google Maps key required</strong><p>Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment to enable map search and pin selection.</p></div><div className="coordinate-grid"><label>Latitude<input type="number" step="any" value={lat || ""} onChange={(e) => onChange({ lat: Number(e.target.value), lng })}/></label><label>Longitude<input type="number" step="any" value={lng || ""} onChange={(e) => onChange({ lat, lng: Number(e.target.value) })}/></label></div></div>;

  return <div className="map-picker">
    <div className="map-search" role="search"><div className="map-search-input"><input role="combobox" value={query} onChange={(e) => changeQuery(e.target.value)} onKeyDown={handleSearchKey} onBlur={() => setTimeout(() => setSuggestions([]), 150)} placeholder="Search an address or landmark" aria-label="Search map location" aria-autocomplete="list" aria-expanded={suggestions.length > 0} aria-controls="map-suggestions"/>{suggestions.length > 0 && <div className="map-suggestions" id="map-suggestions" role="listbox">{suggestions.map((prediction, index) => <button type="button" role="option" aria-selected={activeSuggestion === index} className={activeSuggestion === index ? "active" : ""} key={prediction.placeId} onMouseDown={(event) => event.preventDefault()} onClick={() => void chooseSuggestion(prediction)}><IconPin/><span><strong>{prediction.mainText?.text || prediction.text.text}</strong><small>{prediction.secondaryText?.text || "Nigeria"}</small></span></button>)}</div>}</div><button type="button" onClick={() => void search()} disabled={searching || !ready}>{searching ? "Searching…" : ready ? "Search map" : "Loading map…"}</button></div>
    {error && <p className="map-error">{error}</p>}
    <div ref={mapElement} className="google-map"><span>Loading Google Maps…</span></div>
    <div className="map-coordinates"><span>Pin location</span><strong>{lat ? lat.toFixed(6) : "—"}, {lng ? lng.toFixed(6) : "—"}</strong><small>Search, click the map, or drag the pin to adjust.</small></div>
  </div>;
}

function IconPin() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
}
