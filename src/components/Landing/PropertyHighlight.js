import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Chip,
  TextField,
  IconButton,
  Box,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  Grid,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PropertyHighlight(props) {
  const [highlights, setHighlights] = useState([
    "Renovation potential",
    "Lot size",
    "Neighbourhood",
    "Outdoor space",
    "Price point",
    "Parking",
    "Quality of build",
    "Nearby attractions",
    "Environment",
    "Basement",
    "Rental income",
  ]);

  const [adding, setAdding] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleInputChange = (event) => {
    setNewHighlight(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      if (newHighlight.trim() !== "") {
        setHighlights([...highlights, newHighlight]);
        props.setSelectedHightlights([
          ...props.selectedHighlights,
          newHighlight,
        ]);
        setNewHighlight("");
        setAdding(false);
      }
    }
  };

  const handleHighlightClick = (highlight) => {
    props.setSelectedHightlights((prev) =>
      prev.includes(highlight)
        ? prev.filter((item) => item !== highlight)
        : [...prev, highlight]
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardHeader
        title="Property Highlight"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold", color: "#2C4552" },
        }}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {highlights.map((highlight, index) => (
            <Chip
              key={index}
              label={highlight}
              onClick={() => handleHighlightClick(highlight)}
              sx={{
                backgroundColor: props.selectedHighlights.includes(highlight)
                  ? "#ff7100"
                  : "white",
                color: props.selectedHighlights.includes(highlight)
                  ? "#2C4552"
                  : "default",
                border: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: props.selectedHighlights.includes(highlight)
                    ? "#ff7100"
                    : "white",
                },
              }}
            />
          ))}
          {adding ? (
            <TextField
              value={newHighlight}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              autoFocus
              size="small"
              placeholder="Type and press enter"
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />
          ) : (
            <Chip
              sx={{ width: 150, border: "1px dotted #2C4552" }}
              label="Add your own"
              onClick={handleAddClick}
              icon={
                <IconButton color="#2C4552">
                  <AddIcon />
                </IconButton>
              }
            />
          )}
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2C4552", marginTop: 2 }}
        >
          Property Type
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="property-type"
            name="property-type"
            value={props.propertyType}
            onChange={(e) => props.setPropertyType(e.target.value)}
          >
            <Grid container rowSpacing={0} columnSpacing={2}>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  id="house"
                  value="house"
                  control={<Radio />}
                  label="House"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="condo"
                  id="condo"
                  control={<Radio />}
                  label="Condo"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="commercial"
                  id="commercial"
                  control={<Radio />}
                  label="Commercial"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="vacant_land"
                  id="vacant_land"
                  control={<Radio />}
                  label="Vacant land"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="multi_family"
                  id="multi_family"
                  control={<Radio />}
                  label="Multi-family"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="townhouse"
                  id="townhouse"
                  control={<Radio />}
                  label="Townhouse"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="industrial"
                  id="industrial"
                  control={<Radio />}
                  label="Industrial"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value="other"
                  id="other"
                  control={<Radio />}
                  label="Other"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
