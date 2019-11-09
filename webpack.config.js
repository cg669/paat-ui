const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const version = require(`./package.json`).version

module.exports = {
  mode: 'production',
  entry: './index.tsx',
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒询问多少次
    aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
    ignored: /node_modules/ //忽略时时监听
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: ['@babel/transform-runtime']
            },
          }
        ],
      },
      {
        test: /\.ts(x?)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"],
              plugins: ['@babel/transform-runtime']
            },
          },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.scss|.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { minimize: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer()],
            },
          },
          { loader: 'resolve-url-loader', options: { keepQuery: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: `@import './src/styles/theme.scss';`,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'res/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=100000000&mimetype=application/font-woff',
      },
      { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true
            }
            : false
        }
      })
    ]

  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: `paat-ui.min.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'nmUI',
    libraryTarget: 'umd',
  },
}
