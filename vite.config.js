import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: "/",
    plugins: [svgr(), react()],

    server: {
      port: parseInt(env.PORT) || 3000,
      strictPort: true,
      host: true,
      origin: env.ORIGIN || "http://localhost:3000",
    },
    preview: {
      port: parseInt(env.PREVIEW_PORT) || 3000,
      strictPort: true,
    },
    define: {
      "process.env.BASE_URL": JSON.stringify(env.BASE_URL || "/"),
    },
    test: {
      global: true,
      environment: "jsdom",
      setupFiles: "./.storybook/vitest.setup.js",
    },
  });
};
