import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/colors";

/**
 * Renders a Guess component with the provided children.
 *
 * @param {Object} children - The content to be rendered within the Guess component.
 * @return {JSX.Element} A Guess component with the provided children.
 */
const Guess = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.secondary500,
    padding: 24,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.secondary500,
  },
});

export default Guess;
