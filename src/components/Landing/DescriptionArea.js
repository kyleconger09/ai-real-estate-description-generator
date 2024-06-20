import React, { useState } from "react";
import { Card, CardHeader, Box, TextField } from "@mui/material";
import CopyExtractButtonGroup from "./CopyExtractButtonGroup";
import jsPDF from "jspdf";

var sample_description = `Welcome to this stunning contemporary home, an epitome of modern elegance nestled in a serene neighborhood in the United States. This exquisite residence combines sleek architectural design with luxurious comfort, offering an unparalleled living experience.

As you approach, you'll be captivated by the home's striking facade. The combination of gray siding, natural stone accents, and a chic black garage door creates a perfect blend of sophistication and charm. The well-maintained front lawn and inviting porch add to the curb appeal, setting the tone for the elegance that awaits inside.

Step into the spacious living room, where large windows allow natural light to flood the space, highlighting the beautiful hardwood floors. The centerpiece of this room is the stunning fireplace, framed with elegant stonework and flanked by custom cabinetry. Whether it's a cozy night in or entertaining guests, this space is designed for both relaxation and style.

The master bedroom is a tranquil retreat, featuring expansive windows that offer picturesque views of the surrounding greenery. The vaulted ceiling adds to the sense of space, while the modern ceiling fan provides both comfort and a touch of contemporary flair. The neutral color palette and plush carpeting create a serene ambiance, perfect for unwinding after a long day.`;

export default function DescriptionArea(props) {
  const { setSnackbarOpen } = props;
  const [description, setDesrciption] = useState(sample_description);
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
    const textWidth = pageWidth - 2 * margin;
    const textLines = doc.splitTextToSize(description, textWidth);

    doc.text(textLines, margin, margin);
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
        />
      </Box>
    </Card>
  );
}
