import { useState, useEffect, useRef } from "react";
import {
  GoogleMapProvider,
  useGoogleMap,
} from "@ubilabs/google-maps-react-hooks";

const mapOptions = {
  zoom: 12,
  center: {
    lat: 43.68,
    lng: -79.43,
  },
};

export default function Index() {
  const [mapContainer, setMapContainer] = useState(null);

  return (
    <GoogleMapProvider
      googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
      options={mapOptions}
      mapContainer={mapContainer}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
      <Location />
    </GoogleMapProvider>
  );
}

function Location() {
  const [lat, setLat] = useState(43.68);
  const [lng, setLng] = useState(-79.43);
  const { map } = useGoogleMap();
  const markerRef = useRef();

  useEffect(() => {
    if (!map || markerRef.current) return;
    markerRef.current = new google.maps.Marker({ map });
  }, [map]);

  useEffect(() => {
    if (!markerRef.current) return;
    if (isNaN(lat) || isNaN(lng)) return;
    markerRef.current.setPosition({ lat, lng });
    map.panTo({ lat, lng });
  }, [lat, lng, map]);

  return (
    <div className="lat-lng">
      <input
        type="number"
        value={lat}
        onChange={(event) => setLat(parseFloat(event.target.value))}
        step={0.01}
      />
      <input
        type="number"
        value={lng}
        onChange={(event) => setLng(parseFloat(event.target.value))}
        step={0.01}
      />
    </div>
  );
}
