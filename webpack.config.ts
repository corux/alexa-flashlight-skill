import * as path from "path";

const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  output: {
    filename: "index.js",
    library: "handler",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ],
  },
};

export default config;
