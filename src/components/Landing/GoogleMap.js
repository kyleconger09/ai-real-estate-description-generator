import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}`;

const GoogleMapAddress = ({ address, nearbyBuildings, setNearbyBuildings }) => {
  const [searchNearbyBuildings, setSearchNearbyBuildings] = useState([]);
  const isFirstRender = useRef(true);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(20);
  const markers = useRef([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        map.current.resize();
        setZoom(10);
      } else if (width < 900) {
        map.current.resize();
        setZoom(15);
      } else {
        map.current.resize();
        setZoom(18);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mapboxControlContainer = document.querySelector(
      ".mapboxgl-ctrl-bottom-right"
    );
    if (mapboxControlContainer) {
      mapboxControlContainer.parentNode.removeChild(mapboxControlContainer);
    }
  }, []);

  const getBoundingBox = (lng, lat, radiusInKm) => {
    const earthRadiusKm = 6371;
    const deltaLat = (radiusInKm / earthRadiusKm) * (180 / Math.PI);
    const deltaLng =
      (radiusInKm / (earthRadiusKm * Math.cos((Math.PI * lat) / 180))) *
      (180 / Math.PI);

    return [lng - deltaLng, lat - deltaLat, lng + deltaLng, lat + deltaLat];
  };

  const fetchNearbyBuildings = async (lng, lat, radiusInKm) => {
    const bbox = getBoundingBox(lng, lat, radiusInKm).join(",");

    try {
      const nearbyResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/poi.json?proximity=${lng},${lat}&bbox=${bbox}&access_token=${mapboxgl.accessToken}`
      );

      return nearbyResponse.data.features.map((feature) => feature.place_name);
    } catch (error) {
      console.error("Error fetching things near by:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      const geocodeResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxgl.accessToken}`
      );
      const [responselng, responselat] =
        geocodeResponse.data.features[0].center;

      map.current.flyTo({
        center: [responselng, responselat],
        essential: true,
      });
      setLng(responselng);
      setLat(responselat);

      // Remove existing markers
      // markers.current.forEach((marker) => marker.remove());
      // markers.current = [];

      // Fetch things near by
      const searchRadiusInKm = 2;
      const buildings = await fetchNearbyBuildings(
        responselng,
        responselat,
        searchRadiusInKm
      );
      setSearchNearbyBuildings(buildings);

      // After fetching the data, set isFirstRender to false
      isFirstRender.current = false;
    } catch (error) {
      console.error("Error fetching geocode or things near by:", error);
    }
  };

  const handleCheckboxChange = (building) => (event) => {
    if (event.target.checked) {
      setNearbyBuildings([...nearbyBuildings, building]);
    } else {
      setNearbyBuildings(nearbyBuildings.filter((b) => b !== building));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [address]);

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, padding: 4, width: "100%" }}>
      <CardHeader
        title="Google Map"
        titleTypographyProps={{
          variant: "h5",
          sx: { fontWeight: "bold", color: "#2C4552" },
        }}
      />
      <CardContent>
        <div
          ref={mapContainer}
          style={{ width: "70vw", height: "400px", margin: "0 auto" }}
        />
        <div>
          {nearbyBuildings && (
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              things near by
            </Typography>
          )}
          {!isFirstRender.current && !searchNearbyBuildings.length ? (
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              There are no notable buildings in the vicinity.
            </Typography>
          ) : (
            <FormGroup>
              {searchNearbyBuildings.map((building, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      sx={{
                        "&.MuiCheckbox-root": {
                          alignSelf: "start",
                        },
                      }}
                      onChange={handleCheckboxChange(building)}
                    />
                  }
                  label={building}
                />
              ))}
            </FormGroup>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapAddress;
