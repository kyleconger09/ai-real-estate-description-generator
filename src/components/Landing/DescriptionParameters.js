import React, { useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const lanugages = [
  { value: "EN-US", label: "English (US)" },
  { value: "EN-CA", label: "English (Canada)" },
  { value: "EN-AU", label: "English (Australia)" },
  { value: "EN-UK", label: "English (UK)" },
  { value: "FR-FR", label: "French (France)" },
  { value: "FR-CA", label: "French (Canada)" },
  { value: "ES-MX", label: "Spanish (Mexico)" },
  { value: "ES-ES", label: "Spanish (Spain)" },
  { value: "ES-US", label: "Spanish (US)" },
  { value: "AF-ZA", label: "Afrikaans (South Africa)" },
  { value: "ZH-CN", label: "Chinese (China)" },
  { value: "ZH-TW", label: "Chinese (Taiwan)" },
  { value: "JA-JP", label: "Japanese (Japan)" },
  { value: "KO-KR", label: "Korean (Korea)" },
  { value: "DE-DE", label: "German (Germany)" },
  { value: "IT-IT", label: "Italian (Italy)" },
  { value: "PT-PT", label: "Portuguese (Portugal)" },
  { value: "PT-BR", label: "Portuguese (Brazil)" },
  { value: "RU-RU", label: "Russian (Russia)" },
  { value: "AR-SA", label: "Arabic (Saudi Arabia)" },
  { value: "UK-UA", label: "Ukrainian (Ukraine)" },
  { value: "TR-TR", label: "Turkish (Turkey)" },
];

const writingStyleList = [
  { value: "traditional", label: "Standard/Traditional" },
  { value: "imaginative", label: "Creatvie/Imaginative" },
];

export default function DescriptionParameters(props) {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, padding: 4 }}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} md={3} sm={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#2C4552", marginTop: 2 }}
          >
            Language
          </Typography>
          <Select
            value={props.language}
            onChange={(e) => props.setLanguage(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              borderRadius: 1,
            }}
          >
            {lanugages.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#2C4552", marginTop: 2 }}
          >
            Ideal Description Length
          </Typography>
          <Grid container sx={{ marginTop: 2 }} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={6} sx={{ marginTop: 0.2 }}>
              <TextField
                value={props.descriptionLength}
                onChange={(e) => props.setDescriptionLength(e.target.value)}
                fullWidth
                label="Length"
                variant="outlined"
                placeholder="Enter a Description Length"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ marginTop: -1 }}>
              <Select
                value={props.descriptionUnit}
                onChange={(e) => props.setDescriptionUnit(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                }}
              >
                <MenuItem value="word">Word</MenuItem>
                <MenuItem value="character">Charecter</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} sm={12}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#2C4552", marginTop: 2 }}
          >
            AI Writing Style
          </Typography>
          <Select
            value={props.descriptionWritingStyle}
            onChange={(e) => props.setDescriptionWritingStyle(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              borderRadius: 1,
            }}
          >
            {writingStyleList.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Card>
  );
}
