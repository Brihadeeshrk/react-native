# Section 5

This section will cover

- Finding the Dimensions of the Window of the application to make the screen more responsive
- There are 2 way to find the dimensions of the window
- To use the `Dimensions` API
- This is how we use the Dimensions API, imported from the `react-native` package
- We can `get` the dimensions of the window as well as the screen using this API, but we are more concerned with the Window and not the entire Screen
- On Android, these values will differ
- But on iOS, Screen and Window will have the same value

```jsx
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
```

- To use the `useWindowDimensions` hook
- If you'd like the responsiveness to change in real time on the screen
- You can use the `useWindowDimensions` hook
- This hook will return the dimensions of the window

```jsx
const { width, height } = useWindowDimensions();
```

- We can also make Platform specific styles by importing the `Platform` from the `react-native` package
- We can use the `Platform` to check if we are on Android or iOS using the 'OS' property
- And, we can style the App accordingly

```jsx
if (Platform.OS === "android") {
  return <Text style={{ color: "red" }}>Android</Text>;
} else {
  return <Text style={{ color: "blue" }}>iOS</Text>;
}
```
