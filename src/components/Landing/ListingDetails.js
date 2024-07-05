"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  FormControl,
  Grid,
  CardContent,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Container,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import getSuggestions from "@/utils/mapboxService";

const listing_status_list = [
  { value: "coming soon", label: "Coming Soon" },
  { value: "exclusive listing", label: "Exclusive Listing" },
  { value: "new listing", label: "New Listing" },
  { value: "price update", label: "Price Update" },
  { value: "under contract", label: "Under Contract" },
  { value: "sold", label: "Sold" },
  { value: "de-listed", label: "De-listed" },
];

const ListingDetails = (props) => {
  const {
    address,
    unitNumber,
    listingTarget,
    listingStatus,
    setAddress,
    setUnitNumber,
    setListingTarget,
    setListingStatus,
    formErrors,
    setFormErrors,
  } = props;
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (address) {
      const fetchSuggestions = async () => {
        const result = await getSuggestions(address);
        setSuggestions(result);
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [address]);

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardHeader
        title="Listing Details"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold", color: "#2C4552" },
        }}
      />
      <CardContent>
        <FormControl fullWidth>
          <Autocomplete
            freeSolo
            options={suggestions}
            getOptionLabel={(option) => option.place_name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setFormErrors((prev) => ({ ...prev, address: false }));
                }}
                variant="outlined"
                placeholder="Enter a location"
              />
            )}
            onInputChange={(event, newInputValue) => {
              setAddress(newInputValue);
            }}
          />
          {formErrors.address && (
            <FormHelperText sx={{ color: "red" }}>
              Please enter an address.
            </FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          label="Unit number (optional)"
          variant="outlined"
          margin="normal"
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mt: 2, fontWeight: "bold", color: "#2C4552" }}
        >
          Listing Status
        </Typography>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  sx={{ display: "flex" }}
                  value={listingTarget}
                  onChange={(e) => setListingTarget(e.target.value)}
                >
                  <FormControlLabel
                    value="for_sale"
                    id="for_sale"
                    control={<Radio />}
                    label="For sale"
                  />
                  <FormControlLabel
                    value="for_rent"
                    id="for_rent"
                    control={<Radio />}
                    label="For rent"
                  />
                </RadioGroup>
                {formErrors.listingTarget && (
                  <FormHelperText sx={{ color: "red" }}>
                    Please enter an address.
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  labelId="status-listing"
                  id="status_listing"
                  value={listingStatus}
                  onChange={(e) => setListingStatus(e.target.value)}
                >
                  {listing_status_list.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.value}
                      id={`status_listing_${index}`}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
    </Card>
  );
};

export default ListingDetails;
