/**
 * PinInfoModal component for displaying pin details in a modal
 */
"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import { MapPinData, JobType } from "./map-pin";

interface PinInfoModalProps {
  selectedPin: MapPinData | null;
  onClose: () => void;
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
}) => {
  if (!selectedPin) return null;

  const jobTypeColors = getJobTypeColors(selectedPin.job_type);

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
        }}
      >
        {formatJobType(selectedPin.job_type)}
      </Box>
    </Box>
  );
};

export default PinInfoModal;
