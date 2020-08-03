const path = require("path");
const webpack = require("webpack");
 
module.exports = {
  mode: "development",
  entry: {
    vendor: ["vue"]
  },
  output: {
    filename: '[name]_dll_[hash:6].js', // 产生的文件名
    path: path.resolve(__dirname, '../static/dll'),
    library: '[name]_dll_[hash:6]'
  },
  plugins: [
    new webpack.DllPlugin({
        name: '[name]_dll_[hash:6]',
        path: path.resolve(__dirname, '../static/dll', '[name].dll.manifest.json')
    })
  ]
};
 