/**
 * PinInfoModal component for displaying pin details in a modal
 */
"use client";

import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import { MapPinData } from "./map-pin";

interface PinInfoModalProps {
  selectedPin: MapPinData | null;
  onClose: () => void;
}

/**
 * Get priority colors for styling
 */
const getPriorityColors = (type: MapPinData["type"]) => {
  switch (type) {
    case "high-priority":
      return {
        backgroundColor: "#ffebee",
        color: "#c62828",
      };
    case "medium-priority":
      return {
        backgroundColor: "#fff8e1",
        color: "#f57c00",
      };
    case "low-priority":
      return {
        backgroundColor: "#f1f8e9",
        color: "#2e7d32",
      };
    default:
      return {
        backgroundColor: "#e3f2fd",
        color: "#1976d2",
      };
  }
};

/**
 * Format priority type for display
 */
const formatPriorityType = (type: MapPinData["type"]): string => {
  return type.replace("-", " ");
};

export const PinInfoModal: React.FC<PinInfoModalProps> = ({
  selectedPin,
  onClose,
}) => {
  if (!selectedPin) return null;

  const priorityColors = getPriorityColors(selectedPin.type);

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
          ...priorityColors,
        }}
      >
        {formatPriorityType(selectedPin.type)}
      </Box>
    </Box>
  );
};

export default PinInfoModal;
