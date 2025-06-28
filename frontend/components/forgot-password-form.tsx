"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Link,
} from "@mui/material";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          {success ? (
            <>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
              >
                Check Your Email
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 2 }}
              >
                Password reset instructions sent
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                If you registered using your email and password, you will
                receive a password reset email.
              </Typography>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
              >
                Reset Your Password
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mb: 3 }}
              >
                Type in your email and we&apos;ll send you a link to reset your
                password
              </Typography>

              <Box
                component="form"
                onSubmit={handleForgotPassword}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                />

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>

                <Box textAlign="center">
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link href="/auth/login" underline="hover">
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
