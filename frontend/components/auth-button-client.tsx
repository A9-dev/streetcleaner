/**
 * Client-side auth button component that uses user points context
 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { Box, Button, Typography } from "@mui/material";
import { useUserPoints } from "@/hooks/useUserPoints";
import type { User } from "@supabase/supabase-js";

export const AuthButtonClient: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userPoints } = useUserPoints();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          {userPoints.toLocaleString()}
        </Typography>
      </Box>
      <Button color="inherit" component={Link} href="/">
        Map
      </Button>
      <Button color="inherit" component={Link} href="/protected/leaderboard">
        Leaderboard
      </Button>
      <Button color="inherit" component={Link} href="/protected/store">
        Store
      </Button>
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
};
