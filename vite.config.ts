import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({}) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      host: true,
      port: 3000,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
      },
    },
    build: {
      target: "esnext",
      outDir: "build",
    },

    publicDir: "public",
  };
});
