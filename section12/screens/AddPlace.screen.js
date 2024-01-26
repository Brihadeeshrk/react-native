import React from "react";
import PlaceForm from "../components/PlaceForm/PlaceForm";

const AddPlaceScreen = ({ navigation, route }) => {
  const createFavPlaceHandler = (place) => {
    console.log("This is a new place", place);
    navigation.navigate("AllPlaces", { place });
  };

  return <PlaceForm onAddPlace={createFavPlaceHandler} />;
};

export default AddPlaceScreen;
