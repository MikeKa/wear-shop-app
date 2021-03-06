/**
 * To spot diffs between dev and prod configs - some diff tool meant to be used.
 * vs code: explorer - right click on file - select for compare
 */

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: ['whatwg-fetch', './src/frontend/js/index.js'],
  devServer: {
    contentBase: false,
    port: 9000,
    proxy: {
      '/api': 'http://192.168.1.85:5858',
      '/api': 'http://localhost:5858',
    },
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          'babelrc': false,
          'presets': [
            ['react'],
          ],
          'plugins': [
            'transform-class-properties',
            'transform-object-rest-spread',
          ]
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ]
      },
      {
        test: /\.woff$/,
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]' },
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        options: { name: 'img/[name].[ext]' },
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: './src/frontend/img/content', to: 'img/content' },
      { from: './src/frontend/favicon.ico' },
      { from: './src/frontend/service-worker.js' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/frontend/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
}
