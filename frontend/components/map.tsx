/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import { useState, useCallback } from "react";
//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapCenter = {
  lat: 51.5074,
  lng: -0.1278,
};

const defaultMapZoom = 15;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
};

// Sample pins around London center
const mapPins = [
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

// Custom marker icons based on priority
const getMarkerIcon = (type: string) => {
  const baseIcon = {
    path: window.google?.maps?.SymbolPath?.CIRCLE,
    scale: 8,
    strokeWeight: 2,
  };

  switch (type) {
    case "high-priority":
      return {
        ...baseIcon,
        fillColor: "#ff4444",
        strokeColor: "#cc0000",
        fillOpacity: 0.8,
      };
    case "medium-priority":
      return {
        ...baseIcon,
        fillColor: "#ffaa00",
        strokeColor: "#cc8800",
        fillOpacity: 0.8,
      };
    case "low-priority":
      return {
        ...baseIcon,
        fillColor: "#44ff44",
        strokeColor: "#00cc00",
        fillOpacity: 0.8,
      };
    default:
      return {
        ...baseIcon,
        fillColor: "#4444ff",
        strokeColor: "#0000cc",
        fillOpacity: 0.8,
      };
  }
};

const MapComponent = () => {
  const [selectedPin, setSelectedPin] = useState<(typeof mapPins)[0] | null>(
    null
  );

  const handleMarkerClick = useCallback((pin: (typeof mapPins)[0]) => {
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
          <Marker
            key={pin.id}
            position={pin.position}
            title={pin.title}
            icon={getMarkerIcon(pin.type)}
            onClick={() => handleMarkerClick(pin)}
            cursor="pointer"
          />
        ))}

        {selectedPin && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              maxWidth: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              zIndex: 1000,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <button
              onClick={handleInfoWindowClose}
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                marginBottom: 8,
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {selectedPin.title}
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "1.2rem" }}>
              {selectedPin.description}
            </p>
            <div
              style={{
                fontSize: "1rem",
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor:
                  selectedPin.type === "high-priority"
                    ? "#ffebee"
                    : selectedPin.type === "medium-priority"
                    ? "#fff8e1"
                    : "#f1f8e9",
                color:
                  selectedPin.type === "high-priority"
                    ? "#c62828"
                    : selectedPin.type === "medium-priority"
                    ? "#f57c00"
                    : "#2e7d32",
                textTransform: "capitalize",
                display: "inline-block",
              }}
            >
              {selectedPin.type.replace("-", " ")}
            </div>
          </Box>
        )}
      </GoogleMap>
    </Box>
  );
};

export { MapComponent };
