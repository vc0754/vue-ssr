const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
        // 如果需要单独抽出CSS文件，用下面这个配置
        // use: ExtractTextPlugin.extract({
        //   fallback: 'vue-style-loader',
        //   use: [
        //     'css-loader',
        //     'postcss-loader'
        //   ]
        // })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000    // 10Kb
          }
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // 如果需要单独抽出CSS文件，用下面这个配置
    // new ExtractTextPlugin("styles.css")
  ]
}
