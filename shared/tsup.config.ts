import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "schemas/index": "src/schemas/index.ts",
    "types/index": "src/types/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
