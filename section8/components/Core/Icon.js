import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import GlobalStyles from "../../utils/styles";

const Icon = ({ name, size, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.buttonContainer,
      ]}
    >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    marginHorizontal: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default Icon;
