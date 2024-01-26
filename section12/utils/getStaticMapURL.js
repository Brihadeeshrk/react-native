import { MAP_API_KEY } from "../config/index";
export const getStaticMapURL = (lat, lng) => {
  const mapPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAP_API_KEY}&signature=YOUR_SIGNATURE`;
  return mapPreview;
};
