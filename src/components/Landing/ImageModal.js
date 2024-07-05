// components/ImageModal.js
import React from "react";
import { Modal, Box, Button } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageModal = ({
  isOpen,
  onRequestClose,
  imageUrl,
  onPrevious,
  onNext,
}) => {
  const theme = useTheme();
  let boxWidth = 800; // Default width for extra-large screens
  let boxpadding = 4; // Default height for extra-large screens
  // Adjust image dimensions based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <= 600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg")); // 960px <= width < 1280px
  const isLargeScreen = useMediaQuery(theme.breakpoints.between("lg", "xl")); // 1280px <= width < 1920px
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl")); // >= 1920px
  if (isSmallScreen) {
    boxWidth = 150;
    boxpadding = 1;
  } else if (isMediumScreen) {
    boxWidth = 300;
    boxpadding = 2;
  } else if (isLargeScreen) {
    boxWidth = 500;
    boxpadding = 4;
  }

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { boxWidth },
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { boxpadding },
        }}
      >
        <div className="absolute top-[calc(50%-21px)] left-[-10%] text-[40px] text-[#ff7100] border border-[#ff7100] rounded-full bg-[#2C4552] p-2 w-[42px] h-[42px] hover:cursor-pointer">
          <ArrowBackIosNewIcon sx={{ marginTop: "-42px" }} onClick={onNext} />
        </div>
        <img
          src={imageUrl}
          alt="Enlarged view"
          className={`w-[70vw] w-full h-fit`}
        />
        <div className="absolute top-[calc(50%-21px)] right-[-10%] text-[40px] text-[#ff7100] border border-[#ff7100] rounded-full bg-[#2C4552] p-2 w-[42px] h-[42px] hover:cursor-pointer">
          <ArrowForwardIosIcon sx={{ marginTop: "-42px" }} onClick={onNext} />
        </div>
      </Box>
    </Modal>
  );
};

export default ImageModal;
