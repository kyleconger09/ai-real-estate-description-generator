"use client";

import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const AddressAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Box
          key={place_id}
          onClick={handleSelect(suggestion)}
          sx={{ cursor: "pointer", padding: "10px" }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </Box>
      );
    });

  return (
    <div>
      <TextField
        fullWidth
        label="Address"
        variant="outlined"
        placeholder="Enter a location"
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {status === "OK" && (
        <Box
          sx={{
            border: "1px solid lightgray",
            borderRadius: "4px",
            marginTop: "5px",
          }}
        >
          {renderSuggestions()}
        </Box>
      )}
    </div>
  );
};

export default AddressAutocomplete;
