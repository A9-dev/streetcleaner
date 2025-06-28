import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import { MapPageClient } from "@/components/map-page-client";
export default function Home() {
  return (
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
              Next.js Supabase Starter
            </Link>
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>

      <Container sx={{ flex: 1, py: 4 }}>
        <MapPageClient />
      </Container>

      <Paper component="footer" sx={{ mt: "auto", py: 2 }}>
        <Container>
          <Typography variant="body2" align="center">
            Footer
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
}
