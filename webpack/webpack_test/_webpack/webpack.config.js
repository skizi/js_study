module.exports = {
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

};
