/**
 * MapPin component for rendering individual markers on the map
 */
"use client";

import React from "react";
import { Marker } from "@react-google-maps/api";

export type JobType =
  | "litter"
  | "flytipping"
  | "graffiti"
  | "vandalism"
  | "infrastructure"
  | "other";

export interface MapPinData {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
  job_type: JobType;
  imageUrl?: string; // Optional image URL for the pin
}

interface MapPinProps {
  pin: MapPinData;
  onMarkerClick: (pin: MapPinData) => void;
  getMarkerIcon: (jobType: JobType) => google.maps.Symbol;
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
      icon={getMarkerIcon(pin.job_type)}
      onClick={handleClick}
      cursor="pointer"
    />
  );
};

export default MapPin;
