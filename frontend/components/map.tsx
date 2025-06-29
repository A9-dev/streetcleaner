/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import { GoogleMap } from "@react-google-maps/api";
import { Box } from "@mui/material";
import { MapPin } from "./map-pin";
import { PinInfoModal } from "./pin-info-modal";
import { createMarkerIcon } from "./map-marker-icons";
import { useMapPins } from "../hooks/useMapPins";

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

  // Map styles to hide points of interest
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const MapComponent = () => {
  const {
    pins,
    selectedPin,
    handleMarkerClick,
    handleInfoWindowClose,
    updatePin,
  } = useMapPins();

  return (
    <Box sx={{ width: "100%" }}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {pins.map((pin) => (
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
          onUpdatePin={updatePin}
        />
      </GoogleMap>
    </Box>
  );
};

export { MapComponent };
