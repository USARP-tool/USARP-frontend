import axios from "axios";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

import useModal from "./useModal";
import Modal from "../layouts/Modal/Modal";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const initialUserState = {
  id: "",
  email: "",
  fullName: "",
  role: "",
  isAuthenticated: false,
};

const validateToken = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem("@AccessToken") || "");
  const [user, setUser] = useState(initialUserState);
  const [isLoading, setIsLoading] = useState(true);

  const { openModal, modalProps, closeModal } = useModal();

  const handleLogout = useCallback(() => {
    setTokenState("");
    setUser(initialUserState);
    localStorage.removeItem("@AccessToken");
    delete axios.defaults.headers.common["Authorization"];
  }, []);

  const handleSessionExpired = useCallback(() => {
    const currentToken = localStorage.getItem("@AccessToken");
    if (!currentToken) return;

    openModal({
      type: "warning",
      title: "Sessão Expirada",
      text: "Seu tempo de acesso acabou. Por favor, faça login novamente para continuar.",
      buttonText: "Voltar para Login",
      onButtonClick: () => {
        closeModal();
        handleLogout();
      },
      onClose: () => {
        handleLogout();
      },
    });
  }, [openModal, closeModal, handleLogout]);

  const setToken = useCallback(
    (newToken) => {
      if (!newToken || !validateToken(newToken)) {
        console.warn("Token inválido ou expirado fornecido.");
        return false;
      }

      try {
        const decoded = jwtDecode(newToken);

        setTokenState(newToken);
        localStorage.setItem("@AccessToken", newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        setUser({
          id: decoded.id,
          email: decoded.email,
          fullName: decoded.fullName,
          role: decoded.role,
          isAuthenticated: true,
        });

        return true;
      } catch (error) {
        console.error("Erro ao definir token:", error);
        handleLogout();
        return false;
      }
    },
    [handleLogout]
  );

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          const isLoginRoute = error.config.url && error.config.url.includes("/auth/signin");

          if (!isLoginRoute) {
            handleSessionExpired();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [handleSessionExpired]);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("@AccessToken");

      if (storedToken && !validateToken(storedToken)) {
        handleSessionExpired();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [handleSessionExpired]);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("@AccessToken");

      if (storedToken && validateToken(storedToken)) {
        setToken(storedToken);
      } else {
        handleLogout();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [setToken, handleLogout]);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      isLoading,
      setToken,
      handleLogout,
      signed: user.isAuthenticated,
      isAuthenticated: user.isAuthenticated,
    }),
    [user, token, isLoading, setToken, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      <Modal {...modalProps} />
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
