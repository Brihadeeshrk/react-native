import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../utils/colors";

/**
 * Renders a title component with the specified children.
 *
 * @param {Object} children - The children to be rendered within the title component.
 * @return {ReactElement} The rendered title component.
 */
const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.white,
    padding: 12,
  },
});

export default Title;
