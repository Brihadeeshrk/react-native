import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../../utils/styles";

const Button = ({ children, onPress, type, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primary200 }}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={[styles.button, styles[type]]}>
          <Text style={[styles.buttonText, styles[type]]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
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
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 5,
  },
});

export default Button;
