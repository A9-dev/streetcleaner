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
    description: "Popular tourist destination with street cleaning needed",
    type: "high-priority",
  },
  {
    id: 2,
    position: { lat: 51.5085, lng: -0.1257 },
    title: "Westminster Bridge",
    description: "Heavy foot traffic area requiring regular maintenance",
    type: "medium-priority",
  },
  {
    id: 3,
    position: { lat: 51.5063, lng: -0.1299 },
    title: "Parliament Square",
    description: "Government area with strict cleanliness standards",
    type: "high-priority",
  },
  {
    id: 4,
    position: { lat: 51.5045, lng: -0.1285 },
    title: "Victoria Embankment",
    description: "Riverside area with moderate cleaning requirements",
    type: "low-priority",
  },
  {
    id: 5,
    position: { lat: 51.5095, lng: -0.1235 },
    title: "Covent Garden Market",
    description: "Busy market area with high cleaning demands",
    type: "high-priority",
  },
  {
    id: 6,
    position: { lat: 51.5055, lng: -0.1315 },
    title: "St. James's Park",
    description: "Park area requiring specialized cleaning services",
    type: "medium-priority",
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
