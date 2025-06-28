import { Container, Paper, Typography, Box, Alert } from "@mui/material";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

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
              Sorry, something went wrong.
            </Typography>
            {params?.error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                Code error: {params.error}
              </Alert>
            ) : (
              <Alert severity="error" sx={{ mt: 2 }}>
                An unspecified error occurred.
              </Alert>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
