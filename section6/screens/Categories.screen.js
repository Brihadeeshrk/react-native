import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import Icon from "../components/Icon";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      drawerIcon: ({ size, color }) => (
        <Icon size={size} color={color} name="list" />
      ),
    });
  }, [navigation]);

  const renderCategory = ({ item }) => {
    const onPressHandler = () => {
      navigation.navigate("MealsOverview", {
        categoryId: item.id,
      });
    };

    return (
      <CategoryGridTile
        color={item.color}
        title={item.title}
        onPress={onPressHandler}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
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

export default CategoriesScreen;
