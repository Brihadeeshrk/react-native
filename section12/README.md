# section 12

in this section, we'll deal with using device features like camera, location etc

## camera

- coming to camera access, there is a package called `expo-camera`, that allows us access to the camera and stuff, but the thing is, if your app is heavily reliant on the camera, it's better to use the expo-camera package.
- for simple tasks, like taking a picture from the gallery or the camera, `expo-image-picker` is more than plenty
- this is the function to prompt the device to open up the camera

```jsx
const takeImageHandler = async () => {
  const image = await launchCameraAsync({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.5,
  });

  setImage(image.assets[0].uri);
};
```

- before you do all this, you need to edit your app.json and mention that, your app needs permission to the camera and so on, otherwise these packages and functions will not work on the device
- the app.json file is like a manifest and keeps all the info about the app, like name, version, required permissions etc
- since, the user has to open the camera, take the pic etc, this is an async fn
- we import the launchCameraAsync function from expo-image-picker package and this takes in a bunch of options, you can check a list of all the options in the documentation, but ive set a few here
- normally these days, pics taken on a phone are of very high resolution, so thats why i set the quality to 0.5 so the file size doesnt get too big
- the thing is, on android, when you tap the 'Take Image' button, you're automatically prompted with a Permissions modal asking you to grant permission to use the camera. That IS NOT the case in iOS
- you need to manually call the persmissions modal and ask for the permission, otherwise the camera just will not open
- this is the fn to ask the user for permission
- we also use the `useCameraPermissions` hook offered by expo-image-picker to get the status of the permission and ask the user
- we check the status of the permission using the PermissionStatus object imported from `expo-image-picker`

```jsx
const [cameraPermission, requestCameraPermission] = useCameraPermissions();

const verifyPermissions = async () => {
  if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
    const persmissionResponse = await requestCameraPermission();

    return persmissionResponse.granted;
  }

  if (cameraPermission.status === PermissionStatus.DENIED) {
    Alert.alert("Insufficient Permissions", "Please grant camera permissions");

    return false;
  }

  return true;
};
```

- now, the following fn would work on ios and android

```diff
const takeImageHandler = async () => {
+ const hasPermission = await verifyPermissions();
+    if (!hasPermission) return;

  const image = await launchCameraAsync({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.5,
  });

  setImage(image.assets[0].uri);
};
```

## location

- for location access, we use the `expo-location` package
- for simple tasks, like getting the current location, `expo-location` is more than plenty

```jsx
const getLocationHandler = async () => {
  /**
   * The function getCurrentPositionAsync() also takes in an object of options, which may contain properties such as accuracy, timeInterval and so on,
   * which are unnecessary for this project but described in the documentation.
   */
  const location = await getCurrentPositionAsync();
  console.log(location);
};
```

- for camera, we needn't ask for permission on android, but we had to ask on iOS
- but for location, we need to ask for persmission on both devices, otherwise we cant utilise this package
- for this we use the following fns to call for permission and fetch the location

```jsx
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
```

- and similar to expo image, we need a verifyPermissions fn to make sure we ask for permission, and only if the user accepts, we get the location

```jsx
const verifyPermissions = async () => {
  if (locationPermission.status === PermissionStatus.UNDETERMINED) {
    const persmissionResponse = await requestPermission();

    return persmissionResponse.granted;
  }

  if (cameraPermission.status === PermissionStatus.DENIED) {
    Alert.alert("Insufficient Permissions", "Please grant camera permissions");

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
  console.log(location);
};
```

- to display a google map screenshot of where we are, we use the Google Static Maps API
- (debit card wasnt working) so i just saw what needed to be done and typed it out
- we write a function that generates this image for us
- i've removed unnecessary markers from the image, but you can interpolate the lat, lng and also place a pointer at the coords like this

```js
import { MAP_API_KEY } from "../config/index";
export const getStaticMapURL = (lat, lng) => {
  const mapPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAP_API_KEY}&signature=YOUR_SIGNATURE`;
  return mapPreview;
};
```

- and, we can use state state to keep track of the lat and lng of the user, like this

```jsx
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;
    /**
     * The function getCurrentPositionAsync() also takes in an object of options, which may contain properties such as accuracy, timeInterval and so on,
     * which are unnecessary for this project but described in the documentation.
     */

    const location = await getCurrentPositionAsync();
    // saving in state
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map")
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
      {/* ...rest */}
```

- for full page maps, we use another page offered by expo, the `expo-mapview` package
- and we set that up in a separate screen

```jsx
import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const region = {
    // lat and lng decide the center of the map
    latitude: 37.78825,
    longitude: -122.4324,
    // latitudeDelta and longitudeDelta decide the zoom level of the map and are a mesaure of how much of the area surrounding the map you can see
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.container} initialRegion={region}></MapView>;
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
```

- now, the MapView also has an onPress prop, that takes an event params, this event params will contain the lat and the lng
- and we can pass these values as props to the Marker component and we can conditionally show it on the MapView if it is not null

```jsx
// ...rest
  const selectLocationHandler = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

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
// ...rest
```

- right now, even though we pick the location and tap on save, we dont see the location on the map. why?
- so when we go back to the MapScreen, the child components and that screen is not recreated
- since we're using a stack navigator, the screens are placed above one another and when we go back, we arent re rendering or recreating the screen
- to work around this, we use the `useIsFocused()` hook offered by react-navigation

```jsx
import { useIsFocused } from "@react-navigation/native";

// fn declaration
const isFocused = useIsFocused(); //true if screen is focused, false if screen is not focused
```

- and we're using a useEffect to re render the component everytime this isFocused changes
- there is a lot of prop chaining in this project, will use contextAPI for future projects
- for the address, we're using the GeoCode API from google, which takes in lat and lng, and gives a human readable address
