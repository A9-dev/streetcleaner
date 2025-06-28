/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Box } from "@mui/material";
import { MapPin, type MapPinData } from "./map-pin";
import { PinInfoModal } from "./pin-info-modal";
import { createMarkerIcon } from "./map-marker-icons";

// Map styling configuration
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
};

// Map center coordinates (London)
const defaultMapCenter = {
  lat: 51.5074,
  lng: -0.1278,
};

// Map configuration - optimized for street cleaning reporting
const defaultMapZoom = 15;
const defaultMapOptions = {
  // Essential controls
  zoomControl: true,

  // Disabled features for cleaner interface
  mapTypeControl: false, // Remove map/satellite switcher
  streetViewControl: false, // Remove street view control
  fullscreenControl: false, // Remove fullscreen button
  rotateControl: false, // Remove rotate control

  // Map behavior
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap", // Standard road map view only
};

// Sample pins around London center
const mapPins: MapPinData[] = [
  {
    id: 1,
    position: { lat: 51.5074, lng: -0.1278 },
    title: "London Eye Area",
    description: "Litter accumulation around tourist destination",
    job_type: "litter",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 2,
    position: { lat: 51.5085, lng: -0.1257 },
    title: "Westminster Bridge",
    description: "Graffiti reported on bridge infrastructure",
    job_type: "graffiti",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 3,
    position: { lat: 51.5063, lng: -0.1299 },
    title: "Parliament Square",
    description: "Fly-tipping incident near government buildings",
    job_type: "flytipping",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 4,
    position: { lat: 51.5045, lng: -0.1285 },
    title: "Victoria Embankment",
    description: "Damaged street infrastructure requiring attention",
    job_type: "infrastructure",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 5,
    position: { lat: 51.5095, lng: -0.1235 },
    title: "Covent Garden Market",
    description: "Vandalism reported on market property",
    job_type: "vandalism",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 6,
    position: { lat: 51.5055, lng: -0.1315 },
    title: "St. James's Park",
    description: "General maintenance issue requiring classification",
    job_type: "other",
    imageUrl: "https://i.ibb.co/5gbSh7nb/image.png",
  },
];

const MapComponent = () => {
  const [selectedPin, setSelectedPin] = useState<MapPinData | null>(null);

  const handleMarkerClick = useCallback((pin: MapPinData) => {
    setSelectedPin(pin);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedPin(null);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {mapPins.map((pin) => (
          <MapPin
            key={pin.id}
            pin={pin}
            onMarkerClick={handleMarkerClick}
            getMarkerIcon={createMarkerIcon}
          />
        ))}

        <PinInfoModal
          selectedPin={selectedPin}
          onClose={handleInfoWindowClose}
        />
      </GoogleMap>
    </Box>
  );
};

export { MapComponent };
