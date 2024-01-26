import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getStaticMapURL } from "../../utils/getStaticMapURL";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { getAddressFromCoords } from "../../utils/getAddressFromCoords";

const LocationPicker = ({ onSelectLocation }) => {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedParams = route.params
        ? { lat: route.params.pickedLat, lng: route.params.pickedLng }
        : null;
      setPickedLocation(mapPickedParams);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddressFromCoords(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onSelectLocation({ ...pickedLocation, address });
      }
    };

    handleLocation();
  }, [pickedLocation, onSelectLocation]);

  const verifyPermissions = async () => {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const persmissionResponse = await requestPermission();

      return persmissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "Please grant camera permissions"
      );

      return false;
    }

    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;
    /**
     * The function getCurrentPositionAsync() also takes in an object of options, which may contain properties such as accuracy, timeInterval and so on,
     * which are unnecessary for this project but described in the documentation.
     */

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation)
    locationPreview = (
      <Image
        source={{
          uri: getStaticMapURL(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default LocationPicker;
