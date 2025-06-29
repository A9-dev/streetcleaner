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
  LinearProgress,
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
  const [currentPage, setCurrentPage] = useState<
    "info" | "cleaned" | "validating" | "success"
  >("info");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [validationProgress, setValidationProgress] = useState<number>(0);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCleanedSubmit = () => {
    if (selectedImage) {
      console.log("Image data:", {
        file: selectedImage,
        name: selectedImage.name,
        size: selectedImage.size,
        type: selectedImage.type,
        lastModified: selectedImage.lastModified,
      });

      // Start validation process
      setCurrentPage("validating");
      setValidationProgress(0);

      // Simulate AI validation with progress updates
      const progressInterval = setInterval(() => {
        setValidationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setCurrentPage("success");
            }, 500); // Small delay before showing success
            return 100;
          }
          return prev + 10; // Increase by 10% every interval
        });
      }, 300); // Update every 300ms for a 3-second total animation
    } else {
      console.log("No image selected");
    }
  };

  const handleBackToInfo = () => {
    setCurrentPage("info");
    setSelectedImage(null);
    setValidationProgress(0);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {(currentPage === "cleaned" ||
          currentPage === "validating" ||
          currentPage === "success") && (
          <IconButton
            onClick={handleBackToInfo}
            size="small"
            aria-label="Back"
            disabled={currentPage === "validating"}
            sx={{
              color: "text.secondary",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            ←
          </IconButton>
        )}
        {currentPage === "info" && <Box />}
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close"
          disabled={currentPage === "validating"}
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

      {currentPage === "info" ? (
        // Info Page Content
        <>
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
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

          {/* Cleaned It Button */}
          <Button
            variant="outlined"
            onClick={() => setCurrentPage("cleaned")}
            sx={{
              mt: 2,
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Cleaned It? 🧹
          </Button>
        </>
      ) : currentPage === "cleaned" ? (
        // Cleaned Page Content
        <>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "text.primary",
            }}
          >
            Submit Completion
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Upload a photo showing the cleaned area to confirm completion of:{" "}
            <strong>{selectedPin.title}</strong>
          </Typography>

          <Box
            sx={{
              border: "2px dashed",
              borderColor: "grey.300",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              mb: 3,
              backgroundColor: "grey.50",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                Choose Image
              </Button>
            </label>
            {selectedImage && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedImage.name}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={handleCleanedSubmit}
            disabled={!selectedImage}
            sx={{
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Submit Completion
          </Button>
        </>
      ) : currentPage === "validating" ? (
        // Validation Page Content
        <>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "text.primary",
              textAlign: "center",
            }}
          >
            AI Validation in Progress
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 4,
              textAlign: "center",
            }}
          >
            Our AI is analyzing your submission to verify the cleanup...
          </Typography>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
              Analyzing image... {Math.round(validationProgress)}%
            </Typography>
            <LinearProgress variant="determinate" value={validationProgress} />
          </Box>

          <Box sx={{ textAlign: "center", fontSize: "3rem", mb: 2 }}>🤖</Box>
        </>
      ) : (
        // Success Page Content
        <>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "success.main",
              textAlign: "center",
            }}
          >
            Validation Successful! ✅
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 3,
              textAlign: "center",
            }}
          >
            Great job! Our AI has verified that{" "}
            <strong>{selectedPin.title}</strong> has been successfully cleaned.
          </Typography>

          <Box
            sx={{
              border: "2px solid",
              borderColor: "success.main",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              mb: 3,
              backgroundColor: "success.light",
              opacity: 0.1,
            }}
          >
            <Typography variant="h6" sx={{ color: "success.dark", mb: 1 }}>
              Bounty Awarded!
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <span role="img" aria-label="points">
                🪙
              </span>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "success.dark" }}
              >
                {selectedPin.bounty.toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ color: "success.dark" }}>
                points
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="success"
            onClick={onClose}
            sx={{
              alignSelf: "center",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Awesome! 🎉
          </Button>
        </>
      )}
    </Box>
  );
};

export default PinInfoModal;
