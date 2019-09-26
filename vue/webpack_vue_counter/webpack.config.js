
const VueLoaderPlugin = require('vue-loader/lib/plugin');


//画像圧縮用
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const ImageminGifsicle = require('imagemin-gifsicle');
const ImageminSvgo = require('imagemin-svgo');




module.exports = {

  mode : 'development', //production
  
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
          {
            loader: 'css-loader',
            options: {
              url: false, //srcを起点としたパスで背景画像を読み込まないようにする
              sourceMap: true
            }
          },
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

  plugins: [

    //vue-loaderのv15以上を扱う場合は必要
    new VueLoaderPlugin(),

    //画像圧縮
    new CopyWebpackPlugin([{
      from: './src/_img',
      to: 'assets/img'
    }]),
    
    new Imagemin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({ quality: 80 }),
        ImageminPngquant({ quality: [0.5, 1] }),
        ImageminGifsicle(),
        ImageminSvgo()
      ]
    })
  ],
}