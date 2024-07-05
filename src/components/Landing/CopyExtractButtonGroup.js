import React from "react";
import { Stack, Button } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';

export default function CopyExtractButtonGroup({
  handleCopy,
  handleDownload,
  getDescription,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCopyDescription = () => {
    handleCopy();
  };
  const handleDownloadDescription = () => {
    handleDownload();
  };
  return (
    <Stack
      spacing={2}
      direction={isSmallScreen ? "column" : "row"}
      sm={12}
      sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
    >
      <Button
        variant="contained"
        onClick={handleCopyDescription}
        color="primary"
        size="large"
        sx={{
          minWidth: "140px",
          backgroundColor: "#2C4552",
          "&:hover": {
            backgroundColor: "#ff7100", // Replace this with your desired hover color
          },
        }}
      >
        Copy
      </Button>
      <Button
        variant="contained"
        onClick={handleDownloadDescription}
        color="primary"
        size="large"
        sx={{
          minWidth: "140px",
          backgroundColor: "#2C4552",
          "&:hover": {
            backgroundColor: "#ff7100", // Replace this with your desired hover color
          },
        }}
      >
        Dowonload
      </Button>
      <Button
        variant="contained"
        onClick={getDescription}
        color="primary"
        size="large"
        sx={{
          minWidth: "140px",
          backgroundColor: "#2C4552",
          "&:hover": {
            backgroundColor: "#ff7100", // Replace this with your desired hover color
          },
        }}
      >
        Regenerate
      </Button>
    </Stack>
  );
}
