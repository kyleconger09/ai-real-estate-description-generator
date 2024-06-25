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
import GoogleMap from "@/components/Landing/GoogleMap";
import { add } from "date-fns";

export default function HomeClient() {
  const [address, setAddress] = useState("");
  const [unitNumber, setUnitNumber] = useState(1);
  const [listingTarget, setListingTarget] = useState("for_sale");
  const [listingStatus, setListingStatus] = useState("new listing");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState();
  const [countBedroom, setCountBedroom] = useState(null);
  const [countBathroom, setCountBathroom] = useState(null);
  const [lotUnit, setLotUnit] = useState("sqFeet");
  const [lotSize, setLotSize] = useState();
  const [interiorUnit, setInteriorUnit] = useState("sqFeet");
  const [interiorSize, setInteriorSize] = useState();
  const [propertyType, setPropertyType] = useState("house");
  const [selectedHighlights, setSelectedHightlights] = useState([]);
  const [nearbyBuildings, setNearbyBuildings] = useState([]);
  const [language, setLanguage] = useState("EN-US");
  const [descriptionLength, setDescriptionLength] = useState(150);
  const [descriptionUnit, setDescriptionUnit] = useState("word");
  const [descriptionWritingStyle, setDescriptionWritingStyle] =
    useState("traditional");

  const [showDescriptionComponent, setshowDescriptionComponent] =
    useState(false);
  const [buttonString, setButtonString] = useState("Generate");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    address: false,
    listingTarget: false,
    uploadedImages: false,
    countBedroom: false,
    countBathroom: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleInitialListing = async () => {
    setshowDescriptionComponent(false);
    setAddress("");
    setUnitNumber(1);
    setListingTarget("for_sale");
    setListingStatus("new listing");
    setUploadedImages([]);
    setCurrency("USD");
    setPrice();
    setCountBedroom(null);
    setCountBathroom(null);
    setLotUnit("sqFeet");
    setLotSize();
    setInteriorUnit("sqFeet");
    setInteriorSize();
    setPropertyType("house");
    setSelectedHightlights([]);
    setNearbyBuildings([]);
    setLanguage("EN-US");
    setDescriptionLength(150);
    setDescriptionUnit("word");
    setDescriptionWritingStyle("traditional");

    setButtonString("Generate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateField = (field, value) => {
    switch (field) {
      case "address":
        return value.trim() !== "";
      case "listingTarget":
        return value.trim() !== "";
      case "uploadedImages":
        return value.length !== 0;
      case "countBedroom":
        return /^[0-9]+$/.test(value);
      case "countBathroom":
        return /^[0-9]+$/.test(value);
      default:
        return true;
    }
  };

  const allValuesTrue = (obj) => {
    return Object.values(obj).every((value) => value === false);
  };

  const handleNextStep = () => {
    if (buttonString == "Generate") {
      const newFormErrors = {
        address: !validateField("address", address),
        listingTarget: !validateField("listingTarget", listingTarget),
        uploadedImages: !validateField("uploadedImages", uploadedImages),
        countBedroom: !validateField("countBathroom", countBathroom),
        countBathroom: !validateField("countBathroom", countBathroom),
      };

      setFormErrors(newFormErrors);

      if (allValuesTrue(newFormErrors)) {
        setshowDescriptionComponent(true);
        setButtonString("Create New");
        console.log("Form submitted successfully");
      } else {
        console.log("Form has errors", newFormErrors);
      }
    } else if (buttonString == "Create New") {
      newFormErrors = {
        address: false,
        listingTarget: false,
        uploadedImages: false,
        countBedroom: false,
        countBathroom: false,
      };
      setFormErrors(newFormErrors);
      console.log("ddd");
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
          paddingTop: 4,
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
                formErrors={formErrors}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <MultiImageUpload
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                formErrors={formErrors}
              />
            </Grid>
          </Grid>
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ marginTop: 2 }}
          >
            <Grid item md={6} sm={12}>
              <PropertyDetails
                currency={currency}
                price={price}
                lotUnit={lotUnit}
                lotSize={lotSize}
                interiorUnit={interiorUnit}
                interiorSize={interiorSize}
                countBedroom={countBedroom}
                countBathroom={countBathroom}
                setCurrency={setCurrency}
                setPrice={setPrice}
                setCountBedroom={setCountBedroom}
                setCountBathroom={setCountBathroom}
                setLotUnit={setLotUnit}
                setLotSize={setLotSize}
                setInteriorUnit={setInteriorUnit}
                setInteriorSize={setInteriorSize}
                formErrors={formErrors}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <PropertyHighlight
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                selectedHighlights={selectedHighlights}
                setSelectedHightlights={setSelectedHightlights}
              />
            </Grid>
            <Grid item sm={12}>
              <GoogleMap
                address={address}
                nearbyBuildings={nearbyBuildings}
                setNearbyBuildings={setNearbyBuildings}
              />
            </Grid>
            <Grid item sm={12}>
              <DescriptionParameters
                language={language}
                setLanguage={setLanguage}
                descriptionLength={descriptionLength}
                setDescriptionLength={setDescriptionLength}
                descriptionUnit={descriptionUnit}
                setDescriptionUnit={setDescriptionUnit}
                descriptionWritingStyle={descriptionWritingStyle}
                setDescriptionWritingStyle={setDescriptionWritingStyle}
              />
            </Grid>
          </Grid>
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
