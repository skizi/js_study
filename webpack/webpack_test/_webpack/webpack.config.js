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
    open : true, //サーバー起動時にブラウザを開くか
    contentBase: `${__dirname}/../htdocs`, //サーバーの起点ディレクトリ
    // watchContentBase:true, //HTML ファイルなどに変更があった時にもリロード
    inline : true, //ライブリロードを行うか
    // port: 8080,
  },

};
