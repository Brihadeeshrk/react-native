# Section 6

This section will cover

- Navigation using the `React Navigation` package
- In this section, we'll be using the `Drawer` as well as the `Native Stack` Navigator
- You can also `Nest` Navigations as we've shown here

```jsx
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { StatusBar } from "expo-status-bar";

import CategoriesScreen from "./screens/Categories.screen";
import MealsDetails from "./screens/MealsDetails.screen";
import MealsOverview from "./screens/MealsOverview.screen";
import Favorites from "./screens/Favorites.screen";
import FavoritesContextProvider from "./store/context/Favorites.context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerStyle: {
          backgroundColor: "#351401",
        },
        drawerInactiveTintColor: "#FFF",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{ title: "All Categories" }}
      />
      <Drawer.Screen name="Favorites" component={Favorites} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MealsCategories"
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="MealsOverview"
              component={MealsOverview}
              // We can do this but, we can also do it from inside the component using the navigation prop
              // options={({ navigation, route }) => {
              //   const categoryId = route.params.categoryId;

              //   return {
              //     title: categoryId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealsDetails"
              component={MealsDetails}
              options={{ title: "About the Meal." }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}
```

- In the above example, we are nesting the Drawer Navigation Inside a Stack Navigator
- we can set styles for navigators from here, or from within screens
- Every screen that is mounted here, receives 2 props, `navigation`, and `route`
- We can navigate across multiple screens using the `navigation.navigate()` function, or we can completely replace views using the `navigation.replace()`
- The other parameter is route, we can also optionally pass data from one screen to the other while calling the navigation.navigate() function
- The way we do is that is using Key-Value pairs

```jsx
const moveToPage3 = () => {
  navigation.navigate("Page3Screen", { name: "Page3" });
};
```

- In the above, example, we're passing the data `name` to the `Page3Screen` screen which has a value of `Page3`
- We can access this value in `Page3Screen` using the route parameter

```jsx
const pageDetails = route.params.name; //Page3
```

- Now, not all screens require a `navigation` or `route` parameter to move from one screen to another
- We can use the `useNavigation()` offered by `@react-navigation/native` to move from one screen to the other

```jsx
import { useNavigation } from "@react-navigation/native";

const NewComponent = ({ children }) => {
  const navigation = useNavigation();

  const moveToPage3 = () => {
    navigation.navigate("Page3Screen", { name: "Page3" });
  };
};
```
