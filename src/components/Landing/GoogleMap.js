import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_KEY}`;

const GoogleMapAddress = (props) => {
  const { address, nearbyBuildings, setNearbyBuildings } = props;
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
  }, []);

  useEffect(() => {
    const mapboxControlContainer = document.querySelector(
      ".mapboxgl-ctrl-bottom-right"
    );
    if (mapboxControlContainer) {
      mapboxControlContainer.parentNode.removeChild(mapboxControlContainer);
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  const handleSearch = useCallback(async () => {
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
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];

      // Add marker for the searched address
      // const redMarker = new mapboxgl.Marker({ color: "red" })
      //   .setLngLat([lng, lat])
      //   .addTo(map.current);
      // markers.current.push(redMarker);

      // Fetch nearby buildings
      const nearbyResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/poi.json?proximity=${responselng},${responselat}&access_token=${mapboxgl.accessToken}`
      );
      const responseBuildings = [];
      nearbyResponse.data.features.map((feature) => {
        responseBuildings.push(feature.place_name);
      });
      setNearbyBuildings(responseBuildings);

      // Add markers for nearby buildings
      nearbyBuildings.forEach((building) => {
        const blueMarker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat(building.coordinates)
          .addTo(map.current);
        markers.current.push(blueMarker);
      });
    } catch (error) {
      console.error("Error fetching geocode or nearby buildings:", error);
    }
  }, [address]);

  useEffect(() => {
    handleSearch();
  }, [address]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 600) {
        map.current.resize();
        setZoom(10);
      } else if (width < 900) {
        map.current.resize();
        setZoom(15);
      } else {
        map.current.resize();
        setZoom(20);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, padding: 2, width: "100%" }}>
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
              Nearby Buildings
            </Typography>
          )}
          <ul>
            {nearbyBuildings?.map((building, index) => (
              <li key={index}>
                <Typography>{building}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMapAddress;
