const configuration = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/dist/, /node_modules/, /\.spec.js$/],
      loader: 'babel-loader',
    }],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: [".js", ".json"]
  },
};

module.exports = configuration;
