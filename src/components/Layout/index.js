"use client";

import { useState } from "react";
import { Container, Box, Grid, Snackbar } from "@mui/material";

import Header from "@/components/Layout/Header";
import ListingDetails from "@/components/Landing/ListingDetails";
import PropertyDetails from "@/components/Landing/PropertyDetails";
import PropertyHighlight from "@/components/Landing/PropertyHighlight";
import MultiImageUpload from "@/components/Landing/MultiImageUpload";
import NextButton from "@/components/Landing/NextButton";
import DescriptionParameters from "@/components/Landing/DescriptionParameters";
import DescriptionArea from "@/components/Landing/DescriptionArea";

export default function HomeClient() {
  const [address, setAddress] = useState("");
  const [unitNumber, setUnitNumber] = useState(1);
  const [listingTarget, setListingTarget] = useState(null);
  const [listingStatus, setListingStatus] = useState("new listing");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showPropertyComponent, setShowPropertyComponent] = useState(false);
  const [showDescriptionComponent, setshowDescriptionComponent] =
    useState(false);
  const [buttonString, setButtonString] = useState("Next");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleInitialListing = () => {
    setShowPropertyComponent(false);
    setshowDescriptionComponent(false);
    setAddress("");
    setUnitNumber(1);
    setListingTarget(null);
    setListingStatus("new listing");
    setUploadedImages([]);
    setButtonString("Next");
  };

  const handleNextStep = () => {
    if (!showPropertyComponent) {
      setShowPropertyComponent(true);
      setButtonString("Generate Description");
    } else if (!showDescriptionComponent) {
      setshowDescriptionComponent(true);
      setButtonString("Generate New");
    } else {
      handleInitialListing();
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "lightgray",
          display: "flex",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ marginTop: 2 }}
          >
            <Grid item md={6} sm={12}>
              <ListingDetails
                address={address}
                unitNumber={unitNumber}
                listingTarget={listingTarget}
                listingStatus={listingStatus}
                setAddress={setAddress}
                setUnitNumber={setUnitNumber}
                setListingTarget={setListingTarget}
                setListingStatus={setListingStatus}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <MultiImageUpload
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />
            </Grid>
          </Grid>
          {showPropertyComponent && (
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              sx={{ marginTop: 2 }}
            >
              <Grid item md={6} sm={12}>
                <PropertyDetails />
              </Grid>
              <Grid item md={6} sm={12}>
                <PropertyHighlight />
              </Grid>
              <Grid item sm={12}>
                <DescriptionParameters />
              </Grid>
            </Grid>
          )}
          {showDescriptionComponent && (
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <DescriptionArea
                  snackbarOpen={snackbarOpen}
                  setSnackbarOpen={setSnackbarOpen}
                />
              </Grid>
            </Grid>
          )}
          <NextButton onClick={handleNextStep} value={buttonString} />
        </Container>
      </Box>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleClose}
          message="The description has been copied to your clipboard"
          key={"bottomcenter"}
          ContentProps={{
            sx: {
              backgroundColor: "white", // Set your desired background color
              color: "#ff7100", // Set your desired font color
            },
          }}
        />
      </Box>
    </>
  );
}
