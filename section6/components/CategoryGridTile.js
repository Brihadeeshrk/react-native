import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const CategoryGridTile = ({ title, color, onPress }) => {
  return (
    <View style={[styles.item, { backgroundColor: color }]}>
      <Pressable
        style={({ pressed }) => [pressed ? styles.iOSPressedState : null]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: height > 700 ? 150 : 100,
    width: width > 350 ? 150 : 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "gray",
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  iOSPressedState: {
    opacity: 0.5,
  },
  title: {
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryGridTile;
