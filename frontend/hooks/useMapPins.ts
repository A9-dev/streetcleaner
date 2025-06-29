/**
 * Custom hook for managing map pins state and operations
 */
"use client";

import { useEffect, useState, useCallback } from "react";
import { MapPinData } from "../components/map-pin";

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
  const [pins, setPins] = useState<MapPinData[]>([]);
  const [selectedPin, setSelectedPin] = useState<MapPinData | null>(null);


  useEffect(() => {
    const fetchPins = async () => {
      const res = await fetch('/api/v1/issues/jobs');
      const jobs = await res.json();
      console.log("Received jobs: ", jobs);

      const mapped = jobs.map((job: any, i: number) => ({
        id: i + 1,
        position: {
          lat: +job.location.lat,
          lng: +job.location.lon,
        },
        title: job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1),
        description: job.description,
        job_type: job.job_type,
        bounty: job.bounty ?? 100,
        imageUrl: job.image,
      }));

      setPins(mapped);
    };

    fetchPins();
  }, []);

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
