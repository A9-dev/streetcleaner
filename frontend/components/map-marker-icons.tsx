/**
 * MapMarkerIcon utility for creating custom marker icons
 */
import { JobType } from "./map-pin";

/**
 * Creates a custom marker icon based on job type
 */
export const createMarkerIcon = (jobType: JobType): google.maps.Symbol => {
  const baseIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeWeight: 2,
    fillOpacity: 0.8,
  };

  const colorConfig = getColorConfig(jobType);

  return {
    ...baseIcon,
    ...colorConfig,
  };
};

/**
 * Get color configuration for different job types
 */
const getColorConfig = (jobType: JobType) => {
  switch (jobType) {
    case "litter":
      return {
        fillColor: "#4CAF50", // Green for litter
        strokeColor: "#2E7D32",
      };
    case "flytipping":
      return {
        fillColor: "#F44336", // Red for fly-tipping (most serious)
        strokeColor: "#C62828",
      };
    case "graffiti":
      return {
        fillColor: "#9C27B0", // Purple for graffiti
        strokeColor: "#6A1B9A",
      };
    case "vandalism":
      return {
        fillColor: "#FF5722", // Deep orange for vandalism
        strokeColor: "#D84315",
      };
    case "infrastructure":
      return {
        fillColor: "#2196F3", // Blue for infrastructure
        strokeColor: "#1565C0",
      };
    case "other":
      return {
        fillColor: "#607D8B", // Blue grey for other
        strokeColor: "#37474F",
      };
    default:
      return {
        fillColor: "#9E9E9E", // Grey for unknown
        strokeColor: "#424242",
      };
  }
};
