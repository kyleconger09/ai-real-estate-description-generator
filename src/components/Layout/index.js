"use client";

import { useEffect, useState, useRef } from "react";
import { Container, Box, Grid, Snackbar } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/Styles/custom.css";

import Header from "@/components/Layout/Header";
import ListingDetails from "@/components/Landing/ListingDetails";
import PropertyDetails from "@/components/Landing/PropertyDetails";
import PropertyHighlight from "@/components/Landing/PropertyHighlight";
import MultiImageUpload from "@/components/Landing/MultiImageUpload";
import NextButton from "@/components/Landing/NextButton";
import DescriptionParameters from "@/components/Landing/DescriptionParameters";
import DescriptionArea from "@/components/Landing/DescriptionArea";
import GoogleMap from "@/components/Landing/GoogleMap";

import DescriptionPrompot from "@/data/DesriptionPropmpt";

export default function HomeClient() {
  const isFirstRender = useRef(true);
  const [address, setAddress] = useState("");
  const [addressForm, setAddressForm] = useState("");
  const [unitNumber, setUnitNumber] = useState(undefined);
  const [listingTarget, setListingTarget] = useState("for_sale");
  const [listingStatus, setListingStatus] = useState("new listing");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState();
  const [countBedroom, setCountBedroom] = useState(undefined);
  const [countBathroom, setCountBathroom] = useState(undefined);
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
  const [description, setDescription] = useState("");

  const [showDescriptionComponent, setshowDescriptionComponent] =
    useState(false);
  const [buttonString, setButtonString] = useState("Generate");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    address: false,
    listingTarget: false,
    uploadedImages: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploadImageloading, setUploadImageloading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleInitialListing = () => {
    setshowDescriptionComponent(false);
    setFormErrors({
      address: false,
      listingTarget: false,
      uploadedImages: false,
    });
    setButtonString("Generate");
    setLoading(false);
    setSnackbarOpen(false);

    // Use functional updates for setting initial states
    setAddress("");
    setAddressForm("");
    setUnitNumber(1);
    setListingTarget("for_sale");
    setListingStatus("new listing");
    setUploadedImages([]);
    setCurrency("USD");
    setPrice(undefined);
    setCountBedroom(null);
    setCountBathroom(null);
    setLotUnit("sqFeet");
    setLotSize(undefined);
    setInteriorUnit("sqFeet");
    setInteriorSize(undefined);
    setPropertyType("house");
    setSelectedHightlights([]);
    setNearbyBuildings([]);
    setLanguage("EN-US");
    setDescriptionLength(150);
    setDescriptionUnit("word");
    setDescriptionWritingStyle("traditional");
    setDescription("");

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
      default:
        return true;
    }
  };

  const checkAllValuesTrue = (obj) => {
    return Object.values(obj).every((value) => value === false);
  };

  const handleNextStep = () => {
    if (buttonString === "Generate") {
      if (!validateField("address", address)) {
        toast("Please insert address");
      }
      if (!validateField("uploadedImages", uploadedImages)) {
        toast("Please insert images");
      }
      const newFormErrors = {
        address: !validateField("address", address),
        listingTarget: !validateField("listingTarget", listingTarget),
        uploadedImages: !validateField("uploadedImages", uploadedImages),
      };

      setFormErrors(newFormErrors);

      if (checkAllValuesTrue(newFormErrors)) {
        setshowDescriptionComponent(true);
        setButtonString("Create New");
        getDescription();
      } else {
        console.log("Form has errors", newFormErrors);
      }
    } else if (buttonString === "Create New") {
      // handleInitialListing();
      window.location.reload();
    }
  };

  const getDescription = () => {
    setLoading(true);
    const response = getAIResponse().then(() => {
      setLoading(false);
    });
    setDescription(response.content);
  };

  const getAIResponse = async () => {
    const prompt = `
      Address : ${address},
      things near by : ${nearbyBuildings.toString()},
      unit number: ${unitNumber},
      listing target: ${listingTarget},
      listing status: ${listingStatus},
      ${price ? `Price: ${price}` : ""},
      ${countBedroom ? `bedroom number: ${countBedroom}` : ""},
      ${countBathroom ? `bedroom number: ${countBathroom}` : ""},
      ${lotSize ? `lot size: ${lotSize}${lotUnit}` : ""},
      ${interiorSize ? `interior size: ${interiorSize}${interiorUnit}` : ""},
      ${
        selectedHighlights ? `highligts: ${selectedHighlights.toString()}` : ""
      },
      ${propertyType ? `building type: ${propertyType}` : ""},

      Please write description about this buildings. The description must be written by ${language}, in ${descriptionLength} ${descriptionUnit}. And it's style is ${descriptionWritingStyle}
    `;

    // const toBase64 = (url) =>
    //   fetch(url.replace('http://', 'https://'))  // Replace HTTP with HTTPS
    //     .then((response) => response.blob())
    //     .then(
    //       (blob) =>
    //         new Promise((resolve, reject) => {
    //           const reader = new FileReader();
    //           reader.onloadend = () => resolve(reader.result);
    //           reader.onerror = reject;
    //           reader.readAsDataURL(blob);
    //         })
    //     );

    const imageUrls = [];
    for (const image of uploadedImages) {
      imageUrls.push({
        type: "image_url",
        image_url: {
          url: image.replace("http://", "https://"),
        },
      });
    }

    const requestMessage = [
      {
        role: "system",
        content: DescriptionPrompot,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          ...imageUrls,
        ],
      },
    ];

    try {
      const response = await getOpenAIResponse(requestMessage);
      setDescription(response.content);
    } catch (error) {
      console.error("Failed to get response from OpenAI:", error);
    }
  };

  const getOpenAIResponse = async (messages) => {
    try {
      // Make API request to OpenAI
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();

      // Return the output from the response
      return data.output;
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      throw error; // Re-throw the error to be handled by the caller if needed
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "#f2f2f2",
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
                addressForm={addressForm}
                unitNumber={unitNumber}
                listingTarget={listingTarget}
                listingStatus={listingStatus}
                setAddress={setAddress}
                setAddressForm={setAddressForm}
                setUnitNumber={setUnitNumber}
                setListingTarget={setListingTarget}
                setListingStatus={setListingStatus}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <MultiImageUpload
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                formErrors={formErrors}
                loading={uploadImageloading}
                setLoading={setUploadImageloading}
                setFormErrors={setFormErrors}
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
            <Grid item sx={{ width: "100%" }} sm={12}>
              <GoogleMap
                address={addressForm}
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
                  description={description}
                  setDescription={setDescription}
                  snackbarOpen={snackbarOpen}
                  setSnackbarOpen={setSnackbarOpen}
                  loading={loading}
                  setLoading={setLoading}
                  getDescription={getDescription}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
