/**
 * MapPin component for rendering individual markers on the map
 */
"use client";

import React from "react";
import { Marker } from "@react-google-maps/api";

export interface MapPinData {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
  type: "high-priority" | "medium-priority" | "low-priority";
}

interface MapPinProps {
  pin: MapPinData;
  onMarkerClick: (pin: MapPinData) => void;
  getMarkerIcon: (type: string) => google.maps.Symbol;
}

export const MapPin: React.FC<MapPinProps> = ({
  pin,
  onMarkerClick,
  getMarkerIcon,
}) => {
  const handleClick = () => {
    onMarkerClick(pin);
  };

  return (
    <Marker
      key={pin.id}
      position={pin.position}
      title={pin.title}
      icon={getMarkerIcon(pin.type)}
      onClick={handleClick}
      cursor="pointer"
    />
  );
};

export default MapPin;
