'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const { VueLoaderPlugin } = require('vue-loader');
// 使用多线程打包，由于HappyPack 对file-loader、url-loader 支持的不友好，所以不建议对该loader使用
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

require('./env-config.js');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  mode: 'development',
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'happyBabel', // 用id来标识 happypack处理那里类文件
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }], // 如何处理  用法和loader 的配置一样
      threadPool: happyThreadPool, // 共享进程池
      verbose: true, // 允许 HappyPack 输出日志
    })
  ],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      part: resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBabel',
        exclude: /node_modules/, // 排除不处理的目录
        include: [
          resolve('src')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  externals: { // 将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入 如果CDN不稳定，不建议使用该配置
    // vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios'
  }
};
