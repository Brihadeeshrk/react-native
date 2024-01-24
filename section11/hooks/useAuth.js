import axios from "axios";
import { API_KEY, SIGNIN_URL, SIGNUP_URL } from "../config/AuthConfig";

const useAuth = () => {
  const createUser = async (email, password) => {
    const response = await axios.post(SIGNUP_URL + API_KEY, {
      email,
      password,
      returnSecureToken: true,
    });

    return response.data.idToken;
  };

  const loginUser = async (email, password) => {
    const response = await axios.post(SIGNIN_URL + API_KEY, {
      email,
      password,
      returnSecureToken: true,
    });

    return response.data.idToken;
  };
  return { createUser, loginUser };
};

export default useAuth;
