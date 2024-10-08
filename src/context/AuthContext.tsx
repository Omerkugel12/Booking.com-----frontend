import api from "../services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  username: string;
  email: string;
  country: string;
  city: string;
  phone: string;
  password: string;
  isAdmin: boolean;
}

export interface UserToRegister {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface UserCradantial {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface childrenPropsType {
  children: React.ReactNode;
}

interface AuthContextTypes {
  loggedInUser: User | null | undefined;
  login: (userData: UserCradantial) => void;
  logout: () => void;
  register: (userData: UserToRegister) => void;
  handleGoogleSuccess: (credentialResponse: {
    credential?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: childrenPropsType) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>(
    undefined
  );
  const [token, setToken] = useLocalStorage<string | null>("jwt-taskify", null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/me");
        setLoggedInUser(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (error.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  function logout() {
    setToken(null);
    setLoggedInUser(null);
  }

  async function login(userData: UserCradantial) {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      navigate(-2);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async function register(userData: UserToRegister) {
    try {
      await api.post("/auth/register", userData);
      navigate("/auth/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  }

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }): Promise<void> => {
    const { credential } = credentialResponse;

    if (!credential) {
      console.error("Credential is undefined");
      return;
    }

    try {
      const response = await api.post("/auth/google", { credential });
      setToken(response.data.token);
      setLoggedInUser(response.data.user);
      navigate(-1);
    } catch (error: unknown) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, login, register, logout, handleGoogleSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}
