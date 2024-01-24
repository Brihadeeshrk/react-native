# Section 4

This section will cover:

- Adding Gradient Background in React Native using ImageBackground and Expo Linear Gradient
- Navigating between screens purely based on state
- Shadows in Android and iOS
  - In Android, we can simply use the `elevation` property
  - In iOS, we can use 4 properties, namely `shadowColor`, `shadowOffset`, `shadowOpacity` and `shadowRadius`
    - shadowColor is the a color of the shadow
    - shadowOffset is an object with two properties, namely `width` and `height`
    - shadowOpacity is the opacity of the shadow
    - shadowRadius is the radius of the shadow
- Also learnt how we can use custom fonts in the application
  - we must install the expo-font package
  - store the fonts in the assets folder
  - To use custom fonts, OR you could optionally use the Expo Google Fonts package to load fonts from there

```jsx
const [fontsLoaded] = useFonts({
  "open-sans": require("./assets/fonts/path-to-ttf-file.ttf"),
  "open-sans-bold": require("./assets/fonts/path-to-ttf-file.ttf"),
});
```

The useFonts hook returns an array similar to useState, and the first variable dictates whether the fonts have been loaded or not,
based on this value, we can render the Splash Screen

```jsx
if (!fontsLoaded) return <AppLoading />;
```

To use these custom fonts in your project, go to the style object associated to that component and use the 'fontFamily' property
and for the value, use the key you mentioned above eg: 'open-sans' or 'open-sans-bold'
