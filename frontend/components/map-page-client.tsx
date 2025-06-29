/**
 * Client-side component for the map page with add pin functionality
 */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { MapProvider } from "@/components/map-provider";
import { MapComponent } from "@/components/map";
import { AddPinModal, type NewPinData } from "@/components/add-pin-modal";
import { createClient } from "@/lib/supabase/client";

export const MapPageClient: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    getUserId();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPin = (pinData: NewPinData) => {
    // TODO: Handle the new pin data (send to API, add to state, etc.)
    console.log("New pin data:", pinData);

    // For now, just log the data
    // In a real application, you would:
    // 1. Upload the image to a storage service
    // 2. Save the pin data to your database
    // 3. Update the map to show the new pin
  };

  return (
    <>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <MapProvider>
          <MapComponent />
        </MapProvider>

        {/* Centered Add Pin Button - Only show for authenticated users */}
        {userId && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={handleOpenModal}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Add New Pin
            </Button>
          </Box>
        )}

        {/* Floating Action Button (Alternative for mobile) - Only show for authenticated users */}
        {userId && (
          <Fab
            color="primary"
            aria-label="add pin"
            onClick={handleOpenModal}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: { xs: "flex", sm: "none" }, // Only show on mobile
              zIndex: 1000,
            }}
          >
            <Add />
          </Fab>
        )}
      </Box>

      {/* Add Pin Modal */}
      {userId && (
        <AddPinModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitPin}
          reporterId={userId}
        />
      )}
    </>
  );
};

export default MapPageClient;
