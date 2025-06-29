"use client";

import { AuthButton } from "@/components/auth-button";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { UserPointsProvider } from "@/hooks/useUserPoints";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserPointsProvider>
      <Box
        component="main"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Upkeep
            </Typography>
            <AuthButton />
          </Toolbar>
        </AppBar>

        <Container sx={{ flex: 1, py: 4 }}>{children}</Container>
      </Box>
    </UserPointsProvider>
  );
}
