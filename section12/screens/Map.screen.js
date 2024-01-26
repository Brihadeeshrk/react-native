import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const MapScreen = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          color={tintColor}
          icon="save"
          size={24}
          onPress={savePickedLocation}
        />
      ),
    });
    // since we're passing a fn to the dependency array in the useEffect, we must wrap the fn in a useCallback()
    // to avoid multiple re render cycles
  }, [navigation, savePickedLocation]);

  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    // lat and lng decide the center of the map
    latitude: 37.78825,
    longitude: -122.4324,
    // latitudeDelta and longitudeDelta decide the zoom level of the map and are a mesaure of how much of the area surrounding the map you can see
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  };

  //   useCallback is used to avoid multiple re render cycles and helps us ensure that a fn defined inside
  //    of a component is not recreated unnecessarily
  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked", "you have to pick a location");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  return (
    <MapView
      style={styles.container}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
