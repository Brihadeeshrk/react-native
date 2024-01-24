import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";

const WelcomeScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { logout, token } = useContext(AuthContext);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://react-native-auth-8ec53-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      );

      setMessage(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error while fetching message", error);
      Alert.alert(
        "Couldn't fetch message",
        "There was an error when fetching the message from the DB"
      );
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton color={tintColor} size={24} icon="exit" onPress={logout} />
      ),
    });

    fetchMessage();
  }, [navigation]);

  if (loading) {
    return <LoadingOverlay message="Fetching data..." />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You're authenticated successfully!</Text>
      {message && <Text>Message: {message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default WelcomeScreen;
