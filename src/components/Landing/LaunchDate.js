import React from "react";
import {
  Card,
  CardHeader,
  FormControlLabel,
  Typography,
  Box,
  TextField,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enUS } from "date-fns/locale";

export default function LaunchDate() {
  const [checked, setChecked] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        title="Launch Date"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold" },
          color: "#2C4552",
        }}
      ></CardHeader>
      <Typography sx={{ margin: 2 }}>
        The date that you want the listing to be visible to the public.
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
        <Box display="flex" alignItems="center" gap={2} sx={{ margin: 2 }}>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleCheckboxChange} />
            }
            label="Today"
          />
        </Box>
        <Box mt={2} sx={{ margin: 2 }}>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            )}
          />
        </Box>
      </LocalizationProvider>
    </Card>
  );
}
