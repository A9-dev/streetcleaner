import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { MapPageClient } from "@/components/map-page-client";
import { UserPointsProvider } from "@/hooks/useUserPoints";
export default function Home() {
  return (
    <UserPointsProvider>
      <Box
        component="main"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                href={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Upkeep
              </Link>
            </Typography>
            <AuthButton />
          </Toolbar>
        </AppBar>

        <Container sx={{ flex: 1, py: 4 }}>
          <MapPageClient />
        </Container>
      </Box>
    </UserPointsProvider>
  );
}
