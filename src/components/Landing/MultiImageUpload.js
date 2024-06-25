// pages/index.js
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Dropzone from "./Dropzone";
import api from "../../utils/axios";
import ImageModal from "./ImageModal";
import {
  ImageList,
  ImageListItem,
  Container,
  FormHelperText,
} from "@mui/material";

const MultiImageUpload = (props) => {
  const { uploadedImages, setUploadedImages, formErrors } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const theme = useTheme();

  // Calculate number of columns dynamically based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const columns = isSmallScreen ? 1 : 3; // Adjust as per your design needs

  const handleUpload = (formData, files) => {
    axios;
    api
      .post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
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
        title="Listing Images"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold" },
          color: "#2C4552",
        }}
      ></CardHeader>
      <Dropzone onUpload={handleUpload} />
      {formErrors.uploadedImages && (
        <FormHelperText
          sx={{ color: "red", display: "flex", justifyContent: "center" }}
        >
          Please upload Images.
        </FormHelperText>
      )}
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <ImageList
          sx={{ width: "80%", height: 212 }}
          cols={columns}
          rowHeight={100}
        >
          {uploadedImages.map((image, index) => (
            <ImageListItem
              key={index}
              onClick={() => handleImageClick(image)}
              sx={{ height: "100px", cursor: "pointer" }}
            >
              <Image
                src={image}
                alt={`uploaded ${index}`}
                layout="Fixed"
                width={100}
                height={100}
              />
            </ImageListItem>
          ))}
        </ImageList>
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          imageUrl={selectedImage}
        />
      </Container>
    </Card>
  );
};

export default MultiImageUpload;
