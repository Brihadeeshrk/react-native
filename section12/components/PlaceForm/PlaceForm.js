import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "../Places/ImagePicker";
import LocationPicker from "../Places/LocationPicker";
import Button from "../UI/Button";
import Place from "../../models/Place.model";

const PlaceForm = ({ onAddPlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [pickedImage, setPickedImage] = useState();

  const titleChangeHandler = (text) => {
    setEnteredTitle(text);
  };

  const savePlaceHandler = () => {
    const place = new Place(enteredTitle, pickedImage, selectedLocation);
    onAddPlace(place);
  };

  const onSelectLocation = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const onSelectImage = (imageUri) => {
    setPickedImage(imageUri);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onTakeImage={onSelectImage} />

      <LocationPicker onSelectLocation={onSelectLocation} />

      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 4,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
