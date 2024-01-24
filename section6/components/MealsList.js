import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealsList = ({ navigation, items }) => {
  const renderMeal = ({ item }) => {
    const onMealSelect = () => {
      navigation.navigate("MealsDetails", { mealId: item.id });
    };
    return <MealItem title={item.title} item={item} onPress={onMealSelect} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
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

export default MealsList;
