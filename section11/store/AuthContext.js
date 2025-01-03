const { createContext, useState, useEffect } = require("react");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      authenticate(token);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const authenticate = async (token) => {
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);
  };

  const logout = async () => {
    setAuthToken(null);
    await AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
