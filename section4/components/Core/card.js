import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../utils/colors";

const Card = ({ children }) => {
  return <View style={styles.cardContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary500,
    elevation: 4, //This is only for Android
    // To create a shadow on iOS we need to add the following 4 properties
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.35,
  },
});

export default Card;
