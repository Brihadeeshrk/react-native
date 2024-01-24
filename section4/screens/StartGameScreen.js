import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Core/button";
import { Colors } from "../utils/colors";
import Title from "../components/Core/title";
import Card from "../components/Core/card";

/**
 * StartGameScreen component for guessing a number.
 *
 * @param {object} storeNumber - function to store the chosen number
 * @return {JSX.Element} React component for the start game screen
 */
const StartGameScreen = ({ storeNumber }) => {
  const [number, setNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (number === "") setIsDisabled(true);
    else setIsDisabled(false);
  }, [number]);

  const onChangeText = (text) => {
    setNumber(text);
  };

  const resetNumber = () => {
    setNumber("");
  };

  const onConfirm = () => {
    const chosenNumber = parseInt(number);

    if (isNaN(chosenNumber) || chosenNumber < 0) {
      Alert.alert(
        "Invalid number",
        "The number entered has to be a number and must be between 0 and 99",
        [{ text: "Okay", style: "default", onPress: resetNumber }]
      );
    }

    storeNumber(chosenNumber);
  };

  return (
    <View style={styles.container}>
      <Title>Guess my number</Title>
      <Card>
        <Text style={styles.instructionText}>Enter a number</Text>
        <TextInput
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
          value={number}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button variant="reset" onPress={resetNumber}>
              Reset
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              variant="primary"
              isDisabled={isDisabled}
              onPress={onConfirm}
            >
              Confirm
            </Button>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.secondary500,
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
  },
  input: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 2,
    color: Colors.secondary500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StartGameScreen;
