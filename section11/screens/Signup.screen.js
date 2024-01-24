import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const { createUser } = useAuth();
  const { authenticate } = useContext(AuthContext);

  const signUpHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      setLoading(false);
      console.error("Error while signing up", error);
      Alert.alert("Failed to create user", "Please try again later...");
    }
  };

  if (loading) return <LoadingOverlay message="Creating user..." />;

  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignupScreen;
