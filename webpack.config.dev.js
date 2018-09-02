import webpack from 'webpack';
import path from 'path';

export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    'tether',
    'font-awesome/scss/font-awesome.scss',
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  mode: 'development',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      Popper: ['popper.js', 'default'],
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    })
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000'},
      {test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: 'file-loader'},
      {test: /font-awesome\.config\.js/, use: ['style-loader', 'font-awesome-loader']},
      {test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'},
      {test: /\.less$/, use: 'less-loader'},
      {test: /(\.css|\.scss|\.sass)$/, use: ['style-loader',
          {loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
              sourceMap: true
            }
          }, {loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src', 'scss')],
              sourceMap: true
            }
          }
        ]
      },
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'url-loader',
      //     options: {limit: 10000, mimetype: 'image/svg+xml'}}]
      // },
      {test: /\.(jpe?g|png|gif|ico)$/i, use: [{loader: 'file-loader', options: {name: '[name].[ext]'}}]}
    ]
  }
};
