import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../components/Core/title";
import { Colors } from "../utils/colors";
import Button from "../components/Core/button";

const GameOverScreen = ({ resetGameHandler, chosenNumber, guessRounds }) => {
  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>

      <View style={styles.successImage}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>

      <View>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.boldText}>{guessRounds.length}</Text> rounds to
          guess the number <Text style={styles.boldText}>{chosenNumber}</Text>
        </Text>
        <Button onPress={resetGameHandler}>Start new game</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  successImage: {
    margin: 36,
    borderRadius: 150,
    width: 300,
    height: 300,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.secondary500,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 18,
  },
  boldText: {
    fontWeight: "bold",
    color: Colors.primary600,
  },
});

export default GameOverScreen;
