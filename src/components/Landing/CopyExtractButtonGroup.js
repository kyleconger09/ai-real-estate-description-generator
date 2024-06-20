import React from "react";
import { Stack, Button } from "@mui/material";

export default function CopyExtractButtonGroup({ handleCopy, handleDownload }) {
  const handleCopyDescription = () => {
    handleCopy();
  };
  const handleDownloadDescription = () => {
    handleDownload();
  };
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
    >
      <Button
        variant="contained"
        onClick={handleCopyDescription}
        color="primary"
        size="large"
        sx={{
          minWidth: "180px",
          backgroundColor: "#2C4552",
          "&:hover": {
            backgroundColor: "#ff7100", // Replace this with your desired hover color
          },
        }}
      >
        Copy description
      </Button>
      <Button
        variant="contained"
        onClick={handleDownloadDescription}
        color="primary"
        size="large"
        sx={{
          minWidth: "180px",
          backgroundColor: "#2C4552",
          "&:hover": {
            backgroundColor: "#ff7100", // Replace this with your desired hover color
          },
        }}
      >
        Dowonload as PDF
      </Button>
    </Stack>
  );
}
