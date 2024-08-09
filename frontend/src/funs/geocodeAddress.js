import axios from "axios";

const API_KEY = "AIzaSyBEyVtYfG_ZR7yzXeMhUZkq-3iOlvGx27s";

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: API_KEY,
        },
      }
    );
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};

export default geocodeAddress;
