
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  
  // エントリポイントのファイル
  entry: './src/vue/app.js',

  output: {
    path: `${__dirname}/htdocs`,
    filename: 'assets/js/app.js'
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
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { //画像読み込み用
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        loader: "file-loader"
      },
    ]
  },

  resolve: {
    // import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
    extensions: ['.js', '.vue'],
  },

  //vue-loaderのv15以上を扱う場合は必要
  plugins: [new VueLoaderPlugin()],
}