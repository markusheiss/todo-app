const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/ts/app.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js', // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
