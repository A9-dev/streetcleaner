import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Box, Button, Typography } from "@mui/material";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2" color="inherit">
        Hey, {user.email}!
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          bgcolor: "grey.100",
          px: 1,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        {/* Replace with your preferred icon */}
        <span role="img" aria-label="points">
          🪙
        </span>
        <Typography variant="body2" color="text.primary" fontWeight="bold">
          8000
        </Typography>
      </Box>
      <LogoutButton />
    </Box>
  ) : (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button color="inherit" component={Link} href="/auth/login">
        Sign in
      </Button>
      <Button color="inherit" component={Link} href="/auth/sign-up">
        Sign up
      </Button>
    </Box>
  );
}
