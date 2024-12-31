import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    target: "esnext",
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      formats: ["esm"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "fs",
        "path",
        "url",
        "os",
        "puppeteer",
        "markdown-it",
        "yargs",
      ],
    },
  },
});
