import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";

const currencies = [
  { value: "USD", symbol: "$" },
  { value: "GBP", symbol: "£" },
  { value: "EUR", symbol: "€" },
  { value: "JPY", symbol: "¥" },
  { value: "INR", symbol: "₹" },
];

const lotUints = [
  { value: "feet", label: "Feet" },
  { value: "meters", label: "Meters" },
  { value: "acres", label: "Acres" },
  { value: "hectares", label: "Hectares" },
  { value: "sqFeet", label: "Sq Feet" },
  { value: "sqMeters", label: "Sq Meters" },
];

const interiorUnits = [
  { value: "sqFeet", label: "Sq Feet" },
  { value: "sqMeters", label: "Sq Meters" },
];

export default function PropertyDetails(props) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardHeader
        title="Property Details"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold", color: "#2C4552" },
        }}
      />
      <CardContent>
        <Box display="flex" alignItems="center">
          <Select
            sx={{ borderRadius: 0, width: "25%" }}
            value={props.currency}
            onChange={(e) => props.setCurrency(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select currency</em>;
              }
              const selectedCurrency = currencies.find(
                (cur) => cur.value === selected
              );
              return selectedCurrency ? selectedCurrency.symbol : "";
            }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.symbol}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="number"
            placeholder="Price (optional)"
            value={props.price}
            onChange={(e) => props.setPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {
                    currencies.find((cur) => cur.value === props.currency)
                      ?.symbol
                  }
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
              width: "75%",
            }}
          />
        </Box>
        <FormControl fullWidth>
          <TextField
            type="number"
            fullWidth
            label="Bedrooms(optional)"
            variant="outlined"
            placeholder="Please input bedroom number"
            sx={{ marginTop: 2 }}
            value={props.countBedroom}
            onChange={(e) => props.setCountBedroom(e.target.value)}
          />
          {props.formErrors.countBedroom && (
            <FormHelperText sx={{ color: "red" }}>
              Please enter an bedroom number.
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            type="number"
            fullWidth
            label="Bathrooms(optional)"
            variant="outlined"
            placeholder="Please input bathroom number"
            sx={{ marginTop: 2 }}
            value={props.countBathroom}
            onChange={(e) => props.setCountBathroom(e.target.value)}
          />
          {props.formErrors.countBathroom && (
            <FormHelperText sx={{ color: "red" }}>
              Please enter an bathroom number.
            </FormHelperText>
          )}
        </FormControl>
        <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Lot Size (optional)"
            value={props.lotSize}
            onChange={(e) => props.setLotSize(e.target.value)}
            label="Lot Size (optional)"
            sx={{
              width: "75%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Select
            value={props.lotUnit}
            onChange={(e) => props.setLotUnit(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "25%",
              borderRadius: 0,
            }}
          >
            {lotUints.map((unit) => (
              <MenuItem key={unit.value} value={unit.value}>
                {unit.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Interior Size (optional)"
            value={props.interiorSize}
            onChange={(e) => props.setInteriorSize(e.target.value)}
            label="Interior Size (optional)"
            sx={{
              width: "75%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Select
            value={props.interiorUnit}
            onChange={(e) => props.setInteriorUnit(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "25%",
              borderRadius: 0,
            }}
          >
            {interiorUnits.map((unit) => (
              <MenuItem key={unit.value} value={unit.value}>
                {unit.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </CardContent>
    </Card>
  );
}
