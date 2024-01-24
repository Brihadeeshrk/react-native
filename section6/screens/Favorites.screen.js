import React, { useContext, useLayoutEffect } from "react";
import Icon from "../components/Icon";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/Favorites.context";
import MealsList from "../components/MealsList";
import { StyleSheet, View, Text } from "react-native";

const Favorites = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      drawerIcon: ({ size, color }) => (
        <Icon size={size} color={color} name="star" />
      ),
    });
  }, [navigation]);

  const { ids } = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You don't have any favorite meals..</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Favorites;
