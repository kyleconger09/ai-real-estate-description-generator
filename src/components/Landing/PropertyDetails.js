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
  Grid,
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

export default function PropertyDetails() {
  const [currency, setCurrency] = React.useState("USD");
  const [price, setPrice] = React.useState();
  const [lotUnit, setLotUnit] = useState("sqFeet");
  const [lotSize, setLotSize] = useState();
  const [interiorUnit, setInteriorUnit] = useState("sqFeet");
  const [interiorSize, setInteriorSize] = useState();

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleLotUnitChange = (event) => {
    setLotUnit(event.target.value);
  };

  const handleLotSizeChange = (event) => {
    setInteriorSize(event.target.value);
  };

  const handleInteriorUnitChange = (event) => {
    setInteriorUnit(event.target.value);
  };

  const handleInteriorSizeChange = (event) => {
    setLotSize(event.target.value);
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
            value={currency}
            onChange={handleCurrencyChange}
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
            value={price}
            onChange={handlePriceChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {currencies.find((cur) => cur.value === currency)?.symbol}
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
        <TextField
          fullWidth
          label="Bedrooms"
          variant="outlined"
          placeholder="Bedrooms"
          sx={{ marginTop: 2 }}
        />
        <TextField
          fullWidth
          label="Bathrooms"
          variant="outlined"
          placeholder="Bathrooms"
          sx={{ marginTop: 2 }}
        />
        <Box display="flex" alignItems="center" sx={{ marginTop: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Lot Size (optional)"
            value={lotSize}
            onChange={handleLotSizeChange}
            label="Lot Size (optional)"
            sx={{
              width: "75%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Select
            value={lotUnit}
            onChange={handleLotUnitChange}
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
            value={interiorSize}
            onChange={handleInteriorSizeChange}
            label="Interior Size (optional)"
            sx={{
              width: "75%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Select
            value={interiorUnit}
            onChange={handleInteriorUnitChange}
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
