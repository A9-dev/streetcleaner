/**
 * PinInfoModal component for displaying pin details in a modal
 */
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import { MapPinData, JobType } from "./map-pin";
import { useUserPoints } from "@/hooks/useUserPoints";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface PinInfoModalProps {
  selectedPin: MapPinData | null;
  onClose: () => void;
  onUpdatePin?: (pinId: number, updates: Partial<MapPinData>) => void;
}

/**
 * Get job type colors for styling
 */
const getJobTypeColors = (jobType: JobType) => {
  switch (jobType) {
    case "litter":
      return {
        backgroundColor: "#E8F5E8",
        color: "#2E7D32",
      };
    case "flytipping":
      return {
        backgroundColor: "#FFEBEE",
        color: "#C62828",
      };
    case "graffiti":
      return {
        backgroundColor: "#F3E5F5",
        color: "#6A1B9A",
      };
    case "vandalism":
      return {
        backgroundColor: "#FFF3E0",
        color: "#D84315",
      };
    case "infrastructure":
      return {
        backgroundColor: "#E3F2FD",
        color: "#1565C0",
      };
    case "other":
      return {
        backgroundColor: "#F5F5F5",
        color: "#37474F",
      };
    default:
      return {
        backgroundColor: "#F5F5F5",
        color: "#424242",
      };
  }
};

/**
 * Format job type for display
 */
const formatJobType = (jobType: JobType): string => {
  switch (jobType) {
    case "flytipping":
      return "Fly-tipping";
    default:
      return jobType.charAt(0).toUpperCase() + jobType.slice(1);
  }
};

export const PinInfoModal: React.FC<PinInfoModalProps> = ({
  selectedPin,
  onClose,
  onUpdatePin,
}) => {
  const [bountyAmount, setBountyAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const { userPoints, addPointsToBounty } = useUserPoints();

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

  if (!selectedPin) return null;

  const jobTypeColors = getJobTypeColors(selectedPin.job_type);

  const handleAddToBounty = () => {
    const amount = parseInt(bountyAmount);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (amount > userPoints) {
      setError(`Insufficient points. You have ${userPoints} points available.`);
      return;
    }

    // Attempt to deduct points from user
    if (addPointsToBounty(amount)) {
      // Update the pin's bounty
      if (onUpdatePin) {
        onUpdatePin(selectedPin.id, {
          bounty: selectedPin.bounty + amount,
        });
      }

      setBountyAmount("");
      setError("");
    } else {
      setError("Failed to add points to bounty");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90vw",
        maxWidth: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        zIndex: 1000,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close"
          sx={{
            color: "text.secondary",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "text.primary",
        }}
      >
        {selectedPin.title}
      </Typography>

      {/* Display image if available */}
      {selectedPin.imageUrl && (
        <Box
          sx={{
            width: "100%",
            height: 200,
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            position: "relative",
          }}
        >
          <Image
            src={selectedPin.imageUrl}
            alt={selectedPin.title}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </Box>
      )}

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.6,
          mb: 2,
        }}
      >
        {selectedPin.description}
      </Typography>

      <Box
        sx={{
          display: "inline-block",
          alignSelf: "flex-start",
          px: 2,
          py: 1,
          borderRadius: 1,
          fontSize: "0.875rem",
          fontWeight: 500,
          textTransform: "capitalize",
          ...jobTypeColors,
          mb: 2,
        }}
      >
        {formatJobType(selectedPin.job_type)}
      </Box>

      {/* Bounty Section - Only show if user is authenticated */}
      {user && (
        <Box
          sx={{
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Current Bounty
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <span role="img" aria-label="points">
              🪙
            </span>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {selectedPin.bounty.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              points
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add points to increase the bounty for this job
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
            <TextField
              label="Points to add"
              type="number"
              value={bountyAmount}
              onChange={(e) => {
                setBountyAmount(e.target.value);
                if (error) setError(""); // Clear error when user starts typing
              }}
              size="small"
              sx={{ flexGrow: 1 }}
              inputProps={{ min: 1, max: userPoints }}
            />
            <Button
              variant="contained"
              onClick={handleAddToBounty}
              disabled={!bountyAmount || userPoints === 0}
              sx={{ height: "40px" }}
            >
              Add
            </Button>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            Available points: {userPoints.toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PinInfoModal;
