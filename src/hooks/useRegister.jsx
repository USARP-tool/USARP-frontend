import { useState, useCallback } from "react";
import axios from "axios";
import { config } from "../utils/config";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(config.baseUrl + "/auth/signup", data);

      return response;
    } catch (err) {
      console.log("Erro na requisição:", err);

      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { register, isLoading };
};
