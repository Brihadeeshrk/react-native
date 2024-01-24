import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

/**
 * A higher-order component representing a customizable button.
 *
 * @param {object} children - The content of the button.
 * @param {string} variant - The variant of the button (primary, secondary, reset).
 * @param {function} onPress - The function to be executed when the button is pressed.
 * @param {boolean} isDisabled - Whether the button is disabled or not.
 * @param {object} style - Additional styles for the button.
 * @return {JSX.Element} A Pressable component representing the button.
 */
const Button = ({ children, variant, onPress, isDisabled, style }) => {
  let buttonStyle;

  switch (variant) {
    case "primary":
      buttonStyle = styles.primaryButton;
      break;

    case "secondary":
      buttonStyle = styles.secondaryButton;
      break;

    case "reset":
      buttonStyle = styles.resetButton;
      break;

    default:
      buttonStyle = styles.primaryButton;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#061727" }}
      style={[({ pressed }) => pressed && styles.pressedState, style]}
      disabled={isDisabled}
    >
      <View style={isDisabled ? styles.disabledState : buttonStyle}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#0f62fe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    elevation: 4,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  secondaryButton: {
    backgroundColor: "#8a3ffc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    elevation: 4,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  resetButton: {
    backgroundColor: "#da1e28",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    elevation: 4,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  buttonText: {
    padding: 15,
    color: "white",
  },
  pressedState: {
    opacity: 0.5,
    alignItems: "center",
    // width: "100%",
  },
  disabledState: {
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    elevation: 4,
    marginHorizontal: 5,
    overflow: "hidden",
  },
});

export default Button;
