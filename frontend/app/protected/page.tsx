import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Box, Typography, Alert, Paper } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Alert severity="info" icon={<InfoOutlined />}>
        This is a protected page that you can only see as an authenticated user
      </Alert>

      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          Your user details
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: "grey.100" }}>
          <Typography
            component="pre"
            variant="body2"
            sx={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              maxHeight: 200,
              overflow: "auto",
              margin: 0,
            }}
          >
            {JSON.stringify(data.user, null, 2)}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
