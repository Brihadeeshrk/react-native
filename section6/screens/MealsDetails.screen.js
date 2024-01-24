import React, { useContext, useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../components/Icon";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/Favorites.context";

const MealsDetails = ({ navigation, route }) => {
  const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const mealId = route.params.mealId;

  const isFavorite = ids.includes(mealId);

  const toggleFavoriteMeal = () => {
    if (isFavorite) {
      removeFavorite(mealId);
      return;
    }
    addFavorite(mealId);
    return;
  };

  useLayoutEffect(() => {
    const meal = MEALS.find((meal) => meal.id === mealId);

    navigation.setOptions({
      title: meal.title,
      headerRight: () => {
        return (
          <Icon
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color="white"
            onPress={toggleFavoriteMeal}
          />
        );
      },
    });
  }, [mealId, navigation, isFavorite]);

  const meal = MEALS.find((meal) => meal.id === mealId);

  const renderDietaryInfo = () => {
    const isGlutenFree = meal.isGlutenFree;
    const isVegan = meal.isVegan;
    const isVegetarian = meal.isVegetarian;
    const isLactoseFree = meal.isLactoseFree;

    return (
      <View>
        {isGlutenFree ? (
          <Text style={styles.detailsText}>Gluten Free</Text>
        ) : (
          <Text style={styles.detailsText}>Not Gluten Free</Text>
        )}
        {isVegan ? (
          <Text style={styles.detailsText}>Vegan</Text>
        ) : (
          <Text style={styles.detailsText}>Not Vegan</Text>
        )}
        {isVegetarian ? (
          <Text style={styles.detailsText}>Vegetarian</Text>
        ) : (
          <Text style={styles.detailsText}>Non Vegetarian</Text>
        )}
        {isLactoseFree ? (
          <Text style={styles.detailsText}>Lactose Free</Text>
        ) : (
          <Text style={styles.detailsText}>Not Lactose Free</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{meal.title}</Text>

        <View style={styles.details}>
          <Text style={styles.detailsText}>{meal.duration}min</Text>
          <Text style={styles.detailsText}>
            {meal.complexity.toUpperCase()}
          </Text>
          <Text style={styles.detailsText}>
            {meal.affordability.toUpperCase()}
          </Text>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.infoTitle}>INGREDIENTS</Text>
          <View>
            {meal.ingredients.map((item, index) => (
              <Text style={styles.info} key={index}>
                • {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.informationContainer}>
          <Text style={styles.infoTitle}>STEPS</Text>
          <View>
            {meal.steps.map((item, index) => (
              <Text style={styles.info} key={index}>
                • {item}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.dietaryContainer}>
          <Text style={styles.infoTitle}>DIETARY INFORMATION</Text>
          {renderDietaryInfo()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
    color: "#fff",
  },
  informationContainer: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    marginTop: 30,
    padding: 10,
  },
  infoTitle: {
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    color: "#fff",
    fontSize: 16,
    margin: 5,
  },
  dietaryContainer: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    marginVertical: 30,
    padding: 5,
  },
});

export default MealsDetails;
