import React, { useState } from "react";
import { Card, CardHeader, Box, TextField, Typography } from "@mui/material";
import CopyExtractButtonGroup from "./CopyExtractButtonGroup";
import jsPDF from "jspdf";
import CircleLoader from "react-spinners/CircleLoader";

export default function DescriptionArea(props) {
  const {
    setSnackbarOpen,
    description,
    setDesrciption,
    loading,
    getDescription,
  } = props;
  const handleChangeDescription = (event) => {
    setDesrciption(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(description)
      .then(() => {
        setSnackbarOpen(true);
        console.log("copy success!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const textWidth = pageWidth - 2 * margin;
    const textHeight = pageHeight - 2 * margin;

    // Split the text into lines that fit the page width
    const textLines = doc.splitTextToSize(description, textWidth);

    let cursorY = margin;

    // Iterate through the lines and add pages as necessary
    textLines.forEach((line) => {
      if (cursorY + 10 > textHeight) {
        // Check if we need to add a new page
        doc.addPage();
        cursorY = margin; // Reset cursor position
      }
      doc.text(line, margin, cursorY);
      cursorY += 10; // Move cursor down for the next line
    });

    doc.save("description.pdf");
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, padding: 2 }}>
      <CardHeader
        title="Description"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold", color: "#2C4552" },
        }}
      />
      {loading ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleLoader color="#ff7100" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#ff7100" }}>
              Our AI is currently analyzing the images. This process may take up
              to 1 minute. Please wait while the description is generated.
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box component="form" noValidate autoComplete="off" margin={2}>
          <TextField
            fullWidth
            id="description"
            value={description}
            onChange={handleChangeDescription}
            variant="outlined"
            multiline
            minRows={10}
          />
          <CopyExtractButtonGroup
            handleCopy={handleCopy}
            handleDownload={handleDownload}
            getDescription={getDescription}
          />
        </Box>
      )}
    </Card>
  );
}
