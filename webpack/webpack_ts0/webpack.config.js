module.exports = {
  
  mode: 'development',
  
  entry: './src/index.ts', //ファイルをまとめる際のエントリーポイント
  
  output: {
    path: `${__dirname}/htdocs`,
    filename: 'bundle.js' //まとめた結果出力されるファイル名
  },
  
  resolve: {
    extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
  },

  devServer: {
    open : true, //サーバー起動時にブラウザを開くか
    contentBase: `${__dirname}/htdocs`, //サーバーの起点ディレクトリ
    // watchContentBase:true, //HTML ファイルなどに変更があった時にもリロード
    inline : true, //ライブリロードを行うか
    // port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader' //ts-loader使うよ
      }
    ]
  }
}