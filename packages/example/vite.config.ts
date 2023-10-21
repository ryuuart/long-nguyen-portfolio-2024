import { defineConfig } from "vitest/config";
import { resolve } from "path";

// Typescript Configuration

// Respect tsconfig path aliases
import tsconfigPaths from "vite-tsconfig-paths";
// Generate dts files with bundle
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "example",
      // the proper extensions will be added
      fileName: "example",
    },
  },
  plugins: [
    tsconfigPaths(),
    dts({
      include: ["src"],
      exclude: ["test", "**/__test__/**/*"],
      rollupTypes: true,
    }),
  ],
  test: {},
});
