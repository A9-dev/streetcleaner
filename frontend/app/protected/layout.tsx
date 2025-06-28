import { AuthButton } from "@/components/auth-button";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Protected Area
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>

      <Container sx={{ flex: 1, py: 4 }}>{children}</Container>

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
