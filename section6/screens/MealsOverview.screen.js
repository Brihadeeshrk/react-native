import React, { useLayoutEffect } from "react";
import MealsList from "../components/MealsList";
import { CATEGORIES, MEALS } from "../data/dummy-data";

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

  return <MealsList navigation={navigation} items={filteredMeals} />;
};

export default MealsOverview;
