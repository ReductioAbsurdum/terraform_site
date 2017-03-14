//This is webpack2
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: "./public"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
}
