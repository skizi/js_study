var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [

//javaScriptの設定
{
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './_js/main.js',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/../htdocs/assets/js`,
    // 出力ファイル名
    filename: 'main.js'
  },

  devServer: {
    contentBase: 'build',
    port: 8080
  },

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader", 
        query:{
          presets: ['es2015']
        }
      }
    ]
  }

},

//cssの設定
{
    //context: path.join(__dirname, 'src/css'),
    entry: {
        style: './_scss/style.scss'
    },
    output: {
        path: `${__dirname}/../htdocs/assets/css`,
        filename: '[name].css'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}];
