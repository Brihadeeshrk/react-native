import { MAP_API_KEY } from "../config";

export const getAddressFromCoords = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch address");

  const data = await response.json();
  const address = data.results[0].formatted_address;

  return address;
};
