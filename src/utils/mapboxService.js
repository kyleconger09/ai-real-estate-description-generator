// utils/mapboxService.js
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiYml0Y29va2VyIiwiYSI6ImNsa3Q5emF0ajA3OXgzaHFvYmZreTczdWIifQ.Rl7UMrIUHBMMPfA6TXOm7Q",
});

const getSuggestions = async (query) => {
  const response = await geocodingClient
    .forwardGeocode({
      query,
      autocomplete: true,
      limit: 5,
    })
    .send();

  return response.body.features.map((feature) => ({
    id: feature.id,
    place_name: feature.place_name,
  }));
};

export default getSuggestions;
