import { redirect } from "next/navigation";
import { Box } from "@mui/material";
import { createClient } from "@/lib/supabase/server";
import { MapProvider } from "@/components/map-provider";
import { MapComponent } from "@/components/map";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <MapProvider>
        <MapComponent />
      </MapProvider>
    </Box>
  );
}
