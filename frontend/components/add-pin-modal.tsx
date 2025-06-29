/**
 * AddPinModal component for adding new map pins
 */
"use client";

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import { useUserPoints } from "@/hooks/useUserPoints";

export type JobType =
  | "flytipping"
  | "graffiti"
  | "vandalism"
  | "infrastructure"
  | "litter"
  | "other";

interface AddPinModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (pinData: NewPinData) => void;
  reporterId: string;
}

export interface NewPinData {
  image: File | null;
  latitude: number;
  longitude: number;
  description: string;
  jobType: JobType;
  reporterId: string;
  bounty: number;
}

export const AddPinModal: React.FC<AddPinModalProps> = ({
  open,
  onClose,
  onSubmit,
  reporterId,
}) => {
  const { userPoints, addPointsToBounty } = useUserPoints();
  const [formData, setFormData] = useState<NewPinData>({
    image: null,
    latitude: 0,
    longitude: 0,
    description: "",
    jobType: "litter",
    reporterId,
    bounty: 0,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof NewPinData, string>>
  >({});
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (
    field: keyof NewPinData,
    value: string | number | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      handleInputChange("image", file);
    } else {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file",
      }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewPinData, string>> = {};

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    if (formData.latitude === 0) {
      newErrors.latitude = "Latitude is required";
    }

    if (formData.longitude === 0) {
      newErrors.longitude = "Longitude is required";
    }

    if (Math.abs(formData.latitude) > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }

    if (Math.abs(formData.longitude) > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }

    if (formData.bounty < 0) {
      newErrors.bounty = "Bounty cannot be negative";
    }

    if (formData.bounty > userPoints) {
      newErrors.bounty = `Insufficient points. You have ${userPoints} points available.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Deduct bounty points from user if bounty > 0
      if (formData.bounty > 0) {
        if (!addPointsToBounty(formData.bounty)) {
          setErrors({ bounty: "Failed to deduct points" });
          return;
        }
      }

      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      image: null,
      latitude: 0,
      longitude: 0,
      description: "",
      jobType: "litter",
      reporterId,
      bounty: 0,
    });
    setErrors({});
    setDragActive(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-pin-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", sm: 500 },
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              id="add-pin-modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              Add New Pin
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Image Upload */}
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  fontWeight="medium"
                >
                  Image *
                </Typography>
                <Box
                  sx={{
                    border: 2,
                    borderColor: dragActive
                      ? "primary.main"
                      : errors.image
                      ? "error.main"
                      : "grey.300",
                    borderStyle: "dashed",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    bgcolor: dragActive ? "primary.50" : "grey.50",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "primary.50",
                    },
                  }}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                  <CloudUpload
                    sx={{ fontSize: 48, color: "grey.400", mb: 1 }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {formData.image
                      ? formData.image.name
                      : "Drag & drop an image here, or click to select"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supports: JPG, PNG, GIF
                  </Typography>
                </Box>
                {errors.image && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.image}
                  </Alert>
                )}
              </Box>

              {/* Location Inputs */}
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  fontWeight="medium"
                >
                  Location *
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Latitude"
                    type="number"
                    value={formData.latitude || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "latitude",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    error={!!errors.latitude}
                    helperText={errors.latitude || "e.g., 51.5074"}
                    inputProps={{
                      step: "any",
                      min: -90,
                      max: 90,
                    }}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Longitude"
                    type="number"
                    value={formData.longitude || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "longitude",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    error={!!errors.longitude}
                    helperText={errors.longitude || "e.g., -0.1278"}
                    inputProps={{
                      step: "any",
                      min: -180,
                      max: 180,
                    }}
                    fullWidth
                    required
                  />
                </Stack>
              </Box>

              {/* Job Type Dropdown */}
              <FormControl fullWidth required>
                <InputLabel id="job-type-label">Job Type *</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="job-type-select"
                  value={formData.jobType}
                  label="Job Type *"
                  onChange={(e) =>
                    handleInputChange("jobType", e.target.value as JobType)
                  }
                >
                  <MenuItem value="litter">Litter</MenuItem>
                  <MenuItem value="flytipping">Fly-tipping</MenuItem>
                  <MenuItem value="graffiti">Graffiti</MenuItem>
                  <MenuItem value="vandalism">Vandalism</MenuItem>
                  <MenuItem value="infrastructure">Infrastructure</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              {/* Initial Bounty */}
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  fontWeight="medium"
                >
                  Initial Bounty
                </Typography>
                <TextField
                  label="Points to add as bounty"
                  type="number"
                  value={formData.bounty || ""}
                  onChange={(e) =>
                    handleInputChange("bounty", parseInt(e.target.value) || 0)
                  }
                  error={!!errors.bounty}
                  helperText={
                    errors.bounty ||
                    `Available points: ${userPoints.toLocaleString()}`
                  }
                  inputProps={{
                    min: 0,
                    max: userPoints,
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{ mr: 1, display: "flex", alignItems: "center" }}
                      >
                        <span role="img" aria-label="points">
                          🪙
                        </span>
                      </Box>
                    ),
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Optional: Add an initial bounty to attract more attention to
                  this job
                </Typography>
              </Box>

              {/* Description */}
              <TextField
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Optional description for this location..."
                fullWidth
              />

              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                sx={{ mt: 4 }}
              >
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" size="large">
                  Add Pin
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default AddPinModal;
