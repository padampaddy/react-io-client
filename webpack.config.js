// webpack.config.js
const path = require("path");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // add |ts
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"], // add .tsx, .ts
  },
};
