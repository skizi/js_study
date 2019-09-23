// var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PrettierPlugin = require("prettier-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule'); //ファイル検索用モジュール

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//画像圧縮用
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');
const ImageminGifsicle = require('imagemin-gifsicle');
const ImageminSvgo = require('imagemin-svgo');


//__dirnameはconfigファイルのある場所のディレクトリが入ってる
// const src = path.resolve(__dirname, 'src');





//.pugファイルを探し、
//  {
//    'index.html': '/Users/yoshida/project/js/test/webpack_es6/src/index.pug',
//    'index2.html': '/Users/yoshida/project/js/test/webpack_es6/src/index2.pug'
//  }
//というオブジェクトで返す関数
const targetTypes = { pug : 'html' };
const getEntriesList = (targetTypes) => {
  const entriesList = {};
  for(const [ srcType, targetType ] of Object.entries(targetTypes)) {

    //srcディレクトリ内の.pugファイルを検索し、配列で返してくれる
    const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${__dirname}/src` });
    
    //filesMatchedをfor文で回す（キーは***.pug）
    for(const srcName of filesMatched) {

      //index.pugをindex.htmlに変換する
      const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);

      //オブジェクトに***.htmlをキーとして、srcファイル（.pug）のディレクトリを代入
      entriesList[targetName] = `${__dirname}/src/${srcName}`;

    }
  }
  return entriesList;
}



const app = {

  //productionでjs,cssをmini化できる。
  //cssをmini化するにはOptimizeCSSAssetsPluginが必要。
  mode: 'development',

  entry: {
    'main' : './src/_js/Main.js',
    'style.css' : './src/_scss/style.scss',
  },

  output: {
    path: `${__dirname}/htdocs`,
    filename: 'assets/js/[name].js'
  },

  //https://nogson2.hatenablog.com/entry/2018/02/01/005525
  devServer: {
    open : true, //サーバー起動時にブラウザを開くか
    contentBase: `${__dirname}/htdocs`, //サーバーの起点ディレクトリ
    watchContentBase:true, //HTMLファイルなどもウォッチ対象にする場合はtrue
    inline : true, //ライブリロードを行うか
    port: 8080
  },

  // devtool:'cheap-module-eval-source-map', //jsのソースマップ出力（バグが分かりやすくなる）
　devtool: 'eval-source-map',

  module: {
    rules: [

      //pug
      {
        test: /\.pug$/,
        use: [         
          { loader:'html-loader'},
          {
            loader:'pug-html-loader',
            options: {
              pretty: true,
            }
          },
        ]
      },

      //js
      {
        test: /\.js$/, // ローダーの処理対象ファイル
        exclude: /(node_modules|common)/, // ローダーの処理対象から外すディレクトリ
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ],
      },
      // { //eslintで構文チェックする場合。.eslintrcは設定ファイル
      //   test: /\.js$/,
      //   exclude: /(node_modules|common)/,
      //   loader: "eslint-loader",
      //   enforce: 'pre' //実行タイミングの指定。この場合'pre'がついていないローダーより早く処理が実行される
      // }

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
      { //フォントの読み込み用
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      },

    ],
  },

  //Prettierを指定
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

    //js
    new PrettierPlugin({
      useTabs: true,
      printWidth: 80,
      singleQuote: true,
    }),

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
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin() // CSS の minify を行う
    ]
  }

};



//pugの設定のplugins配列に、new HtmlWebpackPluginを入れていく
for(const [ targetName, srcName ] of Object.entries(getEntriesList({ pug : 'html' }))) {
  app.plugins.push(new HtmlWebpackPlugin({
    filename : targetName,
    template : srcName
  }));
}

module.exports = app;

