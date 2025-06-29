import { MapPageClient } from "../../../components/map-page-client";

export default async function MapPage() {
  // Allow both authenticated and unauthenticated users to access the map
  // Authentication check is handled on the client side for the "Add Pin" functionality
  return <MapPageClient />;
}
