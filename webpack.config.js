const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: {
    mainPage: './js/mainPage.js',
    expensesPage: './js/expenses.js',

  },
  output: {
    path: path.resolve(__dirname, 'public/webpack'),
    filename: "[name].js",
    library: "[name]Export"
  },
};