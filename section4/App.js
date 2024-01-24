import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { Colors } from "./utils/colors";

/**
 * Generates the main application component, responsible for handling the game logic and rendering different screens based on the game state.
 *
 * @return {JSX.Element} The main application component
 */
export default function App() {
  const [chosenNumber, setChosenNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState([]);

  /**
  To use custom fonts, OR you could optionally use the Expo Google Fonts package to load fonts from there
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/path-to-ttf-file.ttf"),
    "open-sans-bold": require("./assets/fonts/path-to-ttf-file.ttf"),
  });

  The useFonts hook returns an array similar to useState, and the first variable dictates whether the fonts have been loaded or not,
  based on this value, we can render the Splash Screen

  if(!fontsLoaded) return <AppLoading />

  To use these custom fonts in your project, go to the style object associated to that component and use the 'fontFamily' property
  and for the value, use the key you mentioned above eg: 'open-sans' or 'open-sans-bold'
  */

  const updateGuessRounds = (round) => {
    setGuessRounds((prev) => [...prev, round]);
  };

  const storeNumber = (number) => {
    setChosenNumber(number);
    setGameOver(false);
  };

  const rightChoiceHandler = () => {
    setGameOver(true);
  };

  const resetGameHandler = () => {
    setGameOver(true);
    setChosenNumber();
    setGuessRounds([]);
  };

  let currentScreen = <StartGameScreen storeNumber={storeNumber} />;

  if (chosenNumber)
    currentScreen = (
      <GameScreen
        chosenNumber={chosenNumber}
        rightChoiceHandler={rightChoiceHandler}
        updateGuessRounds={updateGuessRounds}
        rounds={guessRounds}
      />
    );

  if (gameOver && chosenNumber)
    currentScreen = (
      <GameOverScreen
        resetGameHandler={resetGameHandler}
        chosenNumber={chosenNumber}
        guessRounds={guessRounds}
      />
    );

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary800, Colors.secondary500]}
        style={styles.container}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.container}
          imageStyle={{ opacity: 0.3 }}
        >
          <SafeAreaView style={styles.container}>{currentScreen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
