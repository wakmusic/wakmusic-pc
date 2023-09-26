import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
import { join } from "path";
import license from "rollup-plugin-license";
import { Plugin, defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  publicDir: "./../public",
  envDir: "./../",
  build: {
    outDir: "./../dist",
    rollupOptions: {
      output: {
        manualChunks: {
          "lottie-web": ["lottie-web"],
        },
      },
      plugins: license({
        thirdParty: {
          includePrivate: false,
          output: {
            file: join(__dirname, "dist", "license.html"),

            template(dependencies) {
              const template = readFileSync(
                join(__dirname, "build", "licenseTemplate.html")
              );

              const templateString = template.toString();

              const dependenciesHtml = dependencies
                .sort(
                  (a, b) =>
                    (a.licenseText?.length ?? 0) - (b.licenseText?.length ?? 0)
                )
                .map(
                  (d) => `
                <div class="dependency">
                  <h3>${d.name}@${d.version}</h3>
                  <p>${d.licenseText ?? ""}</p>
                </div>
                `
                );

              return templateString.replace(
                "<!-- dependencies -->",
                dependenciesHtml.join("\n")
              );
            },
          },
        },
      }) as Plugin,
    },
  },
  plugins: [react(), tsconfigPaths(), svgr(), macrosPlugin()],
  define: {
    "import.meta.env.VITE_VERSION": JSON.stringify(version),
  },
});
