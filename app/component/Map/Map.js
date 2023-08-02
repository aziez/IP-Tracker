// import "/leaflet/dist/leaflet.css";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const MapView = ({ latLang }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const customIcon = L.icon({
    iconUrl: "/images/icon-location.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  useEffect(() => {
    if (latLang && latLang?.lat && latLang?.lang) {
      mapRef.current.setView([latLang?.lat, latLang?.lang], 15);
      markerRef.current.setLatLng([latLang?.lat, latLang?.lang]);
    }
  }, [latLang]);

  return (
    <MapContainer
      ref={mapRef}
      className="h-[400px] w-full relative z-0"
      center={[latLang?.lat || 0, latLang?.lang || 0]}
      zoom={15}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Aziz'
      />
      <Marker
        position={[latLang.lat || 0, latLang.lang || 0]}
        icon={customIcon}
        ref={markerRef}
      ></Marker>
    </MapContainer>
  );
};

export default MapView;
