import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const MealsOverview = ({ navigation, route }) => {
  const categoryID = route.params.categoryId;

  useLayoutEffect(() => {
    const currentCategory = CATEGORIES.find(
      (category) => category.id === categoryID
    );
    navigation.setOptions({ title: currentCategory.title });
  }, [categoryID, navigation]);

  const filteredMeals = MEALS.filter((meal) => {
    return meal.categoryIds.includes(categoryID);
  });

  const renderMeal = ({ item }) => {
    const onMealSelect = () => {
      navigation.navigate("MealsDetails", { mealId: item.id });
    };
    return <MealItem title={item.title} item={item} onPress={onMealSelect} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMeal}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default MealsOverview;
