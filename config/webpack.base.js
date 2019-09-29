const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// console.log('ENV',process.env.NODE_ENV)
// console.log('BUILD',process.env.NODE_BUILD)

function resolve(dir) {
  return path.resolve(__dirname, '../', dir)
}

function createBase(config={}) {
  const baseConfig= {
    proxyPath: "/APISIGN"
  }
  const mergeConfig=Object.assign({},baseConfig,config)
  console.log('mergeConfig', mergeConfig)
  return {
    // mode: mergeConfig.mode
    devtool: 'source-map',
    entry: {
      'main': './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../', 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader:[
            {
              loader: 'babel-loader',
              options:{
                presets: ['@babel/preset-env','@babel/preset-react'],
                plugins:[
                  ["import", { "libraryName": "antd", "style": true }], // "css" 加载css文件`style: true` 会加载 less 文件 还要配置less-loader 如果报错降低less版本
                  ['@babel/plugin-proposal-class-properties'] // 支持直接写state
                ],
              }
            },
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // publicPath: '../', // 解决css引入图片问题
              },
            },
            // 'style-loader',
            'css-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  resolve('src/assets/common.scss')
                ]
              }
            }
          ],
        },
        {
          test: /\.css$/,
          // exclude: /node_modules/, * 如果引入antd ，必须删除这一行
          loader:[
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../', // 解决css引入图片问题
              },
            },
            // 'style-loader', * 如果选了css提取，删除这一行
            'css-loader',
          ]
        },
        {
          test: /\.less$/,
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // publicPath: '../', // 解决css引入图片问题
              },
            },
            // 'style-loader',
            'css-loader',
            {
              loader: "less-loader",
              options: { // antd 定制主题色
                modifyVars : {
                  'primary-color': '#000000',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                }
              }
            }
          ],
        },
        {
          test: /\.(jpg|jpeg|png|bmp|gif|svg|ttf|woff|woff2|eot)$/i,
          use:[{
            loader:'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 10240,
              publicPath: './images/',
              outputPath: 'images/'
            }
          }],
        }
      ]
    },
    devServer:{
      contentBase: resolve('dist'), // 静态文件跟路径
      host: '0.0.0.0',
      port: 8001,
      // open:true,
      hot: true,
      historyApiFallback: {
        index: resolve('dist'),
        // rewrites: [{ from: /./, to: '/index.html' }, { from: /\*/, to: '/index.html' }]
      },
      proxy: { // 只有本地运行才会走代理 ，打包不会走代理，需要修改请求路径
        [mergeConfig.proxyPath]: {
          target: mergeConfig.apiUrl,
          "changeOrigin": true,
          pathRewrite: {
            [`^${mergeConfig.proxyPath}`] : ''
          }
        }
      }
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: resolve('src/template.html'),
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ // 这里面的值一般用来设置环境变量，一般不修改
        "IS_DEV": JSON.stringify(process.env.NODE_ENV === 'development'),
        "IS_BUILD": JSON.stringify(!!process.env.NODE_BUILD),
        "DEV_TOKEN": JSON.stringify(mergeConfig.token), //关于token的存储 可以存到全局变量，localstorage， cookie等中
        "API_URL": JSON.stringify(mergeConfig.apiUrl),
        "PROXY_PATH": JSON.stringify(mergeConfig.proxyPath)
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            filename: 'vender.js'
          },
          default: {
            minChunks: 2,
            priority: -20,
            filename: 'common.js',
            reuseExistingChunk: true
          }
        }
      },
    },
    resolve: {
      alias: {
        '@assets': resolve('src/assets'),
        '@pages': resolve('src/pages'),
        '@utils': resolve('src/utils'),
      }
    }
  }
}

module.exports = createBase