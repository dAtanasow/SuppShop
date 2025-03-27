import { createContext, useContext } from "react";

export const AuthContext = createContext({
    email: "",
    username: "",
    phone: "",
    img: "",
    accessToken: "",
    userId: "",
    isAuthenticate: false,
    changeAuthState: () => null,
    logout: () => null,
})

export const useAuthContext = () => {
    return useContext(AuthContext);
  };
  