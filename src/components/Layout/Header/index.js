"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import Logo from "@/assets/logo.png";

const pages = [];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        height: 100,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ height: 100, alignContent: "center", display: "flex" }}
      >
        <Toolbar disableGutters sx={{ minHeight: 100, margin: "auto" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Box sx={{ margin: "auto" }}>
              <Image
                src={Logo}
                alt="logo"
                width={250}
                height={80}
                style={{ objectFit: "contain" }}
              ></Image>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "flex-end",
                },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#2C4552",
                    display: "block",
                    fontSize: 18,
                    "&:hover": {
                      color: "#ff7100", // Replace this with your desired hover color
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
