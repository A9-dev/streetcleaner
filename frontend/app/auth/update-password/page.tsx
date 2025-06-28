import { UpdatePasswordForm } from "@/components/update-password-form";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <UpdatePasswordForm />
    </Box>
  );
}
