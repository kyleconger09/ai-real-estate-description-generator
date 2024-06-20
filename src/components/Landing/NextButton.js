import React from "react";
import { Stack, Button } from "@mui/material";

export default function NextButton({ onClick, value }) {
  return (
    <Stack
      direction="row"
      sx={{ display: "flex", justifyContent: "center", margin: 2 }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          minWidth: "180px",
          backgroundColor: "#ff7100",
          "&:hover": {
            backgroundColor: "#2C4552", // Replace this with your desired hover color
          },
        }}
        onClick={onClick}
      >
        {value}
      </Button>
    </Stack>
  );
}
