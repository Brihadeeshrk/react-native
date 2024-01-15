import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MealItem = ({ title, onPress, item }) => {
  return (
    <View style={[styles.item]}>
      <Pressable
        style={({ pressed }) => [pressed ? styles.iOSPressedState : null]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.details}>
          <Text>{item.duration}min</Text>
          <Text>{item.complexity.toUpperCase()}</Text>
          <Text>{item.affordability.toUpperCase()}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    margin: 20,
    justifyContent: "center",
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    shadowColor: "gray",
    shadowRadius: 5,
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  iOSPressedState: {
    opacity: 0.5,
  },
  image: {
    height: 200,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
});

export default MealItem;
