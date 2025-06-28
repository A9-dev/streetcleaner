/**
 * MapMarkerIcon utility for creating custom marker icons
 */

export type PriorityType = "high-priority" | "medium-priority" | "low-priority";

/**
 * Creates a custom marker icon based on priority type
 */
export const createMarkerIcon = (type: string): google.maps.Symbol => {
  const baseIcon = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeWeight: 2,
    fillOpacity: 0.8,
  };

  const colorConfig = getColorConfig(type);

  return {
    ...baseIcon,
    ...colorConfig,
  };
};

/**
 * Get color configuration for different priority types
 */
const getColorConfig = (type: string) => {
  switch (type) {
    case "high-priority":
      return {
        fillColor: "#ff4444",
        strokeColor: "#cc0000",
      };
    case "medium-priority":
      return {
        fillColor: "#ffaa00",
        strokeColor: "#cc8800",
      };
    case "low-priority":
      return {
        fillColor: "#44ff44",
        strokeColor: "#00cc00",
      };
    default:
      return {
        fillColor: "#4444ff",
        strokeColor: "#0000cc",
      };
  }
};
