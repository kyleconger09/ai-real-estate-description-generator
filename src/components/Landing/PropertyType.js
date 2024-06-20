"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";

const PropertyTypeCard = () => {
  const [propertyType, setPropertyType] = React.useState("");

  const handleChange = (event) => {
    setPropertyType(event.target.value);
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, padding: 2, height: 390 }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#2C4552" }}
        >
          Property Type
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="property-type"
            name="property-type"
            value={propertyType}
            onChange={handleChange}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControlLabel
                  value="house"
                  control={<Radio />}
                  label="House"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="condo"
                  control={<Radio />}
                  label="Condo"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="commercial"
                  control={<Radio />}
                  label="Commercial"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="vacant_land"
                  control={<Radio />}
                  label="Vacant land"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="multi_family"
                  control={<Radio />}
                  label="Multi-family"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="townhouse"
                  control={<Radio />}
                  label="Townhouse"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="industrial"
                  control={<Radio />}
                  label="Industrial"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="other"
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
};

export default PropertyTypeCard;
