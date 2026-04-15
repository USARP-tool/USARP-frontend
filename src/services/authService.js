import axios from "axios";

export const AuthErrorTypes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};

export class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("@AccessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.handleError(error))
    );
  }

  handleError(error) {
    if (error.code === "ERR_NETWORK") {
      return {
        type: AuthErrorTypes.NETWORK_ERROR,
        message: "Erro de conexão. Verifique sua internet.",
        originalError: error,
      };
    }

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 401:
          return {
            type: AuthErrorTypes.INVALID_CREDENTIALS,
            message: data?.message || "Credenciais inválidas.",
            originalError: error,
          };
        case 500:
          return {
            type: AuthErrorTypes.SERVER_ERROR,
            message: "Erro interno do servidor. Tente novamente.",
            originalError: error,
          };
        default:
          return {
            type: AuthErrorTypes.UNKNOWN_ERROR,
            message: data?.message || "Erro desconhecido.",
            originalError: error,
          };
      }
    }

    return {
      type: AuthErrorTypes.UNKNOWN_ERROR,
      message: "Erro inesperado.",
      originalError: error,
    };
  }

  async login(credentials) {
    try {
      const response = await this.api.post("/auth/signin", credentials);

      if (!response.data.token) {
        throw new Error("Token não recebido do servidor");
      }

      return {
        success: true,
        data: response.data,
        token: response.data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.type ? error : this.handleError(error),
      };
    }
  }
}
