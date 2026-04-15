export const config = {
  baseUrl: import.meta.env.VITE_BASE_URL,

  /** A origem do seu frontend */
  origin: import.meta.env.VITE_ORIGIN,

  /** * O modo atual.
   * O Vite define isso automaticamente como 'development' ou 'production'.
   */
  nodeEnv: import.meta.env.MODE,

  /** Booleano: true se estivermos rodando build de produção */
  isProduction: import.meta.env.PROD,

  /** Booleano: true se estivermos rodando servidor de desenvolvimento */
  isDevelopment: import.meta.env.DEV,
};
