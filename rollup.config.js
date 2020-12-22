import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
const input = "src/callback.js";
export default [
  {
    input,
    output: {
      name: "HookCallback",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      terser({ ie8: true }),
      filesize()
    ]
  },
  {
    input,
    output: [
      {
        file: pkg.module,
        format: "es",
        exports: "default"
      },
      {
        file: pkg.main,
        format: "cjs",
        exports: "auto"
      }
    ],
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      })
    ],
    external: (id) => /lodash|core-js/.test(id)
  }
];
