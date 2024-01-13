import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../components/Core/button";
import Title from "../components/Core/title";
import Guess from "../components/Game/guess";
import Card from "../components/Core/card";
import { Colors } from "../utils/colors";
import RoundCard from "../components/Core/rounds";

const generateNumberBetween = (min, max, exclude) => {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if (randomNumber === exclude) return generateNumberBetween(min, max, exclude);
  else return randomNumber;
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({
  chosenNumber,
  rightChoiceHandler,
  updateGuessRounds,
  rounds,
}) => {
  const firstGuess = generateNumberBetween(1, 100, chosenNumber);
  const [currentGuess, setCurrentGuess] = useState(firstGuess);

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      rightChoiceHandler();
    }
  }, [currentGuess, chosenNumber, rightChoiceHandler]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    // direction is a string that could be lower or higher
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "higher" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is the incorrect choice");
      return;
    }

    switch (direction) {
      case "lower":
        maxBoundary = currentGuess;
        setCurrentGuess(
          generateNumberBetween(minBoundary, maxBoundary, currentGuess)
        );
        break;

      case "higher":
        minBoundary = currentGuess + 1;
        setCurrentGuess(
          generateNumberBetween(minBoundary, maxBoundary, currentGuess)
        );
        break;
    }

    updateGuessRounds(currentGuess);
  };

  return (
    <View style={styles.container}>
      <Title>Opponent's Guess</Title>

      <Guess>{currentGuess}</Guess>
      <Card>
        <Text style={styles.instructionText}>Higher or Lower?</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              variant="secondary"
              onPress={() => nextGuessHandler("lower")}
            >
              <Ionicons name="remove-circle" size={28} color="white" />
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              variant="secondary"
              onPress={() => nextGuessHandler("higher")}
            >
              <Ionicons name="add-circle" size={28} color="white" />
            </Button>
          </View>
        </View>
      </Card>

      <View style={styles.roundsContainer}>
        <Title>Guesses so far...</Title>
        <FlatList
          data={rounds}
          renderItem={RoundCard}
          keyExtractor={(item, index) => index}
          style={styles.rounds}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 24,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  instructionText: {
    color: Colors.secondary500,
    fontSize: 24,
  },
  roundsContainer: {
    marginTop: 15,
    flex: 1,
  },
  rounds: {
    marginTop: 10,
  },
});

export default GameScreen;
