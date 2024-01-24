import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import useAuth from "../hooks/useAuth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);

  const { authenticate } = useContext(AuthContext);

  const { loginUser } = useAuth();

  const loginHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const token = await loginUser(email, password);
      authenticate(token);
    } catch (error) {
      setLoading(false);
      Alert.alert("Authentication failed", "Please check your credentials");
      console.error("Error while logging in ..", error);
    }
  };

  if (loading) return <LoadingOverlay message="Logging in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
