var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
var PrettierPlugin = require("prettier-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const globule = require('globule'); //ファイル検索用モジュール

//__dirnameはconfigファイルのある場所のディレクトリが入ってる
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'htdocs');


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



const app = [
  {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
      main : './src/_js/Main.js',
      // libs : [
      //   './common/js/libs/jquery-3.1.1.js',
      //   './common/js/libs/pixi.js',
      //   './common/js/tween.js',
      //   './common/js/libs/pixi-projection.js',
      //   './common/js/libs/howler.min.js'
      // ]
    },

    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/htdocs/assets/js`,
      filename: '[name].js'
    },

    //https://nogson2.hatenablog.com/entry/2018/02/01/005525
    devServer: {
      open : true, //サーバー起動時にブラウザを開くか
      contentBase: path.join(__dirname, "htdocs"), //サーバーの起点ディレクトリ
      inline : true, //ライブリロードを行うか
      port: 8080
    },

    module: {
      loaders: [
        {
          test: /\.js$/, // ローダーの処理対象ファイル
          exclude: /(node_modules|common)/, // ローダーの処理対象から外すディレクトリ
          loader: "babel-loader", //使用するloader名
          query:{ //loader に渡したいクエリパラメータ
            presets: ['es2015']
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|common)/,
          loader: "eslint-loader",
          enforce: 'pre' //実行タイミングの指定。この場合'pre'がついていないローダーより早く処理が実行される
        }
      ],
    },


  },


  //pugの設定
  {
    // entry: {
    //   index: glob.sync('./**/*.pug', /*{ cwd: src }*/),
    // },
    entry : getEntriesList(targetTypes),
    output: {
      path: `${__dirname}/htdocs`,
      filename: '[name]'
    },
    module: {
      rules: [
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
      ]
    },
    plugins : [] //後でjsで中身を代入するので必要
  },


  //cssの設定
  {
    entry: {
        style: './src/_scss/style.scss'
    },
    output: {
        path: `${__dirname}/htdocs/assets/css`,
        filename: '[name].css'
    },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              //loader: ExtractTextPlugin.extract('css-loader!sass-loader')
              loader: ExtractTextPlugin.extract('font-family-unescape-loader!css-loader!sass-loader') //文字化け対策にfont-family-unescape-loaderを使用
            },
            // {
            //   test: /\.otf$/,
            //   loader: 'url?mimetype=application/font-otf&name=[path][name].[ext]'
            //   test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            //   loader: 'file-loader?name=../htdocs/assets/common/font/[name].[ext]'
            // },
        ]
    },
    devtool: 'source-map', //ソースマップを出力するように
    plugins: [
        new ExtractTextPlugin('[name].css') //文字化け対策の対象ファイルを指定する
    ]
  }

];



//pugの設定のplugins配列に、new HtmlWebpackPluginを入れていく
for(const [ targetName, srcName ] of Object.entries(getEntriesList({ pug : 'html' }))) {
  app[1].plugins.push(new HtmlWebpackPlugin({
    filename : targetName,
    template : srcName
  }));
}

module.exports = app;

