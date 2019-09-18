var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
var PrettierPlugin = require("prettier-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const globule = require('globule');

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
    const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${__dirname}/src` });

    for(const srcName of filesMatched) {
      const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
      entriesList[targetName] = `${__dirname}/src/${srcName}`;
    }
  }
  return entriesList;
}



const app = [
  {
    watch:true,
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
      // publicPath: '/assets/js/',
      // path : dist,
      // 出力ファイル名
      filename: '[name].js'
    },

    devServer: {
      open : true,
      contentBase: path.join(__dirname, "htdocs"),
      // publicPath: '/assets/js/',
      inline : true,
      port: 8080
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|common)/,
          loader: "babel-loader",
          query:{
            presets: ['es2015']
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|common)/,
          loader: "eslint-loader",
          enforce: 'pre'
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
                // name: '[path][name].html'
              }
            },
          ]
        },
      ]
    },
    output: {
      path: `${__dirname}/htdocs`,
      filename: '[name]'
    },
    plugins: [],
  },


  //cssの設定
  {
    //context: path.join(__dirname, 'src/css'),
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
            {
              // test: /\.otf$/,
              // loader: 'url?mimetype=application/font-otf&name=[path][name].[ext]'
              // test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
              // loader: 'file-loader?name=../htdocs/assets/common/font/[name].[ext]'
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
  }

];

console.log("----------export htmls-----------");
// console.log(getEntriesList({ pug : 'html' }));

//pugの設定のplugins配列に、new HtmlWebpackPluginを入れていく
for(const [ targetName, srcName ] of Object.entries(getEntriesList({ pug : 'html' }))) {
  app[1].plugins.push(new HtmlWebpackPlugin({
    filename : targetName,
    template : srcName
  }));
}

module.exports = app;

