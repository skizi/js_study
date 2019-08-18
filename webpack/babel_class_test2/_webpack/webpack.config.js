module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './_js/Main.js',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/../htdocs/assets/js`,
    // 出力ファイル名
    filename: 'main.js'
  },
 
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase: 'build'
  }

}
