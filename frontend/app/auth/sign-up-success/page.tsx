import { Container, Paper, Typography, Box } from "@mui/material";

export default function Page() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Thank you for signing up!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 2 }}
            >
              Check your email to confirm
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
