
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  
  mode: 'development',
  
  entry:{
    'main' : './src/_js/Main.ts',
    'style.css' : './src/_scss/style.scss',    
  }, // './src/_js/Main.ts', //ファイルをまとめる際のエントリーポイント
  
  output: {
    path: `${__dirname}/htdocs`,
    filename: 'assets/js/[name].js'
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
        exclude: /(node_modules|common)/, // ローダーの処理対象から外すディレクトリ
        loader: 'ts-loader' //ts-loader使うよ
      },

      //css
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          'sass-loader',
        ]
      },
    ]
  },


  plugins: [

    //cssファイルをjsに含めいないようにする（webpackはデフォルトではcssをjsに含めようとする）
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]',
      ignoreOrder: false
    }),

    //style.css.jsみたいなゴミファイルを生成しないようにする
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'css']
    }),

  ]
}