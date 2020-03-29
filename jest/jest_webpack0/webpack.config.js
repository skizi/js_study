module.exports = {
  
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    'main' : './src/_js/Main.js',
  },

  // ファイルの出力設定
  output: {
    path: `${__dirname}/htdocs`,
    filename: 'assets/js/[name].js'
  },

  devServer: {
    open : true, //サーバー起動時にブラウザを開くか
    contentBase: `${__dirname}/htdocs`, //サーバーの起点ディレクトリ
    watchContentBase:true, //HTMLファイルなどもウォッチ対象にする場合はtrue
    inline : true, //ライブリロードを行うか
    port: 8080
  },

  module: {
    rules: [

      //js
      {
        test: /\.js$/, // ローダーの処理対象ファイル
        exclude: /(node_modules|common)/, // ローダーの処理対象から外すディレクトリ
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
      },

    ]
  }

};
