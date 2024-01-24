import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/colors";

/**
 * Render a round card component with the given item.
 *
 * @param {Object} item - The item to be displayed in the round card.
 * @return {JSX.Element} A React element representing the round card.
 */
const RoundCard = ({ item }) => {
  return (
    <View style={styles.roundContainer}>
      <Text style={styles.cardContainer}>{item}</Text>;
    </View>
  );
};

const styles = StyleSheet.create({
  roundContainer: {
    backgroundColor: Colors.secondary500,
  },
  cardContainer: {
    justifyContent: "center",
    marginTop: 15,
    color: "#FFF",
    // alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 12,
    textAlign: "center",
    elevation: 4, //This is only for Android
    // To create a shadow on iOS we need to add the following 4 properties
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.35,
  },
});

export default RoundCard;
