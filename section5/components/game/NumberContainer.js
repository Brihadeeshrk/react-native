import { View, Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

/**
 * on iOS, 'screen' and 'window' give the same result, but on android they vary.
 * screen gives the dimensions of the entire screen including the status bar
 * where as, window gives the dimensions of the app
 */
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
console.log(deviceHeight, deviceWidth);

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 12,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    maxWidth: "75%",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    // fontWeight: 'bold',
    fontFamily: "open-sans-bold",
  },
});
