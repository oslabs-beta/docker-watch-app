const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader',
          {
            loader: 'css-loader', options: {
              importLoaders: 1
            }
          },
          'postcss-loader']
      }
    ]
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist',
    },
    proxy: {
      // '/': 'http://localhost:3000',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html'
    })
  ]
}
