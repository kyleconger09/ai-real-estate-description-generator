// pages/index.js
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Box, Card, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircleLoader from "react-spinners/CircleLoader";

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
  const {
    uploadedImages,
    setUploadedImages,
    formErrors,
    loading,
    setLoading,
    setFormErrors,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const theme = useTheme();

  // Calculate number of columns dynamically based on screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const columns = isSmallScreen ? 1 : 3; // Adjust as per your design needs
  const imageSize = isSmallScreen ? 150 : 200;

  const handleUpload = (formData, files) => {
    // axios;
    // api
    //   .post("/upload/", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     const imageUrls = files.map((file) => URL.createObjectURL(file));
    //     setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
    //   })
    //   .catch((error) => {
    //     console.error("Upload error", error);
    //   });

    const image_urls = [];

    // Push all the axios request promise into a single array
    const uploaders = files.map(async (file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME); // Replace the preset name with your own
      formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          formData
        );
        //setUploadedImages([...uploadedImages, response.data.url]);
        image_urls.push(response.data.url);
        console.log("Image uploaded successfully:", response.data.url);
      } catch (error) {
        console.error("Error uploading PDF:", error);
      }
    });
    setLoading(true);
    axios.all(uploaders).then(() => {
      setUploadedImages([...image_urls]);
      setFormErrors((prev) => ({ ...prev, uploadedImages: false }));
      setLoading(false);
    });
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < uploadedImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : uploadedImages.length - 1
    );
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
        {loading ? (
          <Box
            sx={{
              width: "80%",
              height: 212,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleLoader color="#ff7100" />
          </Box>
        ) : (
          <>
            <ImageList
              sx={{ width: "80%", height: 212 }}
              cols={columns}
            >
              {uploadedImages.map((image, index) => (
                <ImageListItem
                  key={index}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={image}
                    alt={`uploaded ${index}`}
                    layout="Fixed"
                    width={imageSize}
                    height={imageSize}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <ImageModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              imageUrl={uploadedImages[selectedImageIndex]}
              onNext={handleNextImage}
              onPrevious={handlePreviousImage}
            />
          </>
        )}
      </Container>
    </Card>
  );
};

export default MultiImageUpload;
