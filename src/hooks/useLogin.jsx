import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { AuthService } from "../services/authService";
import { config } from "../utils/config";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authService = useMemo(() => new AuthService(config.baseUrl), []);

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await authService.login(credentials);

        if (!result.success) {
          throw result.error;
        }

        const tokenSet = setToken(result.token);

        if (!tokenSet) {
          throw new Error("Falha ao validar/salvar o token de autenticação");
        }

        navigate("/home", { replace: true });

        return result;
      } catch (err) {
        console.error("Login error:", err);
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authService, setToken, navigate]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    login,
    isLoading,
    error,
    resetError,
  };
};
