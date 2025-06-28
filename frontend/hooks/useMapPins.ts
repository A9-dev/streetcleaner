/**
 * Custom hook for managing map pins state and operations
 */
"use client";

import { useState, useCallback } from "react";
import { MapPinData } from "../components/map-pin";

// Sample pins around London center
const initialMapPins: MapPinData[] = [
  {
    id: 1,
    position: { lat: 51.5074, lng: -0.1278 },
    title: "London Eye Area",
    description: "Litter accumulation around tourist destination",
    job_type: "litter",
    imageUrl:
      "https://i.ibb.co/5gbSh7nb/image.png",
  },
  {
    id: 2,
    position: { lat: 51.5085, lng: -0.1257 },
    title: "Westminster Bridge",
    description: "Graffiti reported on bridge infrastructure",
    job_type: "graffiti",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661391282637-63d052b71fb5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    position: { lat: 51.5063, lng: -0.1299 },
    title: "Parliament Square",
    description: "Fly-tipping incident near government buildings",
    job_type: "flytipping",
    imageUrl:
      "https://images.unsplash.com/photo-1614158056258-d339e5e72380?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    position: { lat: 51.5045, lng: -0.1285 },
    title: "Victoria Embankment",
    description: "Damaged street infrastructure requiring attention",
    job_type: "infrastructure",
    imageUrl:
      "https://images.unsplash.com/photo-1617252820855-a829ba1babe7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    position: { lat: 51.5095, lng: -0.1235 },
    title: "Covent Garden Market",
    description: "Vandalism reported on market property",
    job_type: "vandalism",
    imageUrl:
      "https://images.unsplash.com/photo-1590962677235-26b1195bb96e?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    position: { lat: 51.5055, lng: -0.1315 },
    title: "St. James's Park",
    description: "General maintenance issue requiring classification",
    job_type: "other",
    imageUrl:
      "https://images.unsplash.com/photo-1533575988569-5d0786b24c67?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export interface UseMapPinsReturn {
  pins: MapPinData[];
  selectedPin: MapPinData | null;
  handleMarkerClick: (pin: MapPinData) => void;
  handleInfoWindowClose: () => void;
  addPin: (pin: Omit<MapPinData, "id">) => void;
  removePin: (id: number) => void;
  updatePin: (id: number, updates: Partial<MapPinData>) => void;
}

export const useMapPins = (): UseMapPinsReturn => {
  const [pins, setPins] = useState<MapPinData[]>(initialMapPins);
  const [selectedPin, setSelectedPin] = useState<MapPinData | null>(null);

  const handleMarkerClick = useCallback((pin: MapPinData) => {
    setSelectedPin(pin);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedPin(null);
  }, []);

  const addPin = useCallback((newPin: Omit<MapPinData, "id">) => {
    setPins((prevPins) => {
      const newId = Math.max(...prevPins.map((p) => p.id), 0) + 1;
      return [...prevPins, { ...newPin, id: newId }];
    });
  }, []);

  const removePin = useCallback((id: number) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));
    setSelectedPin((prevSelected) => 
      prevSelected?.id === id ? null : prevSelected
    );
  }, []);

  const updatePin = useCallback((id: number, updates: Partial<MapPinData>) => {
    setPins((prevPins) =>
      prevPins.map((pin) =>
        pin.id === id ? { ...pin, ...updates } : pin
      )
    );
    setSelectedPin((prevSelected) =>
      prevSelected?.id === id 
        ? { ...prevSelected, ...updates } 
        : prevSelected
    );
  }, []);

  return {
    pins,
    selectedPin,
    handleMarkerClick,
    handleInfoWindowClose,
    addPin,
    removePin,
    updatePin,
  };
};
