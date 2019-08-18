import { ROOT, JS_SRC, JS_TEST, PORT } from './env'
const polyfills = [ `${ROOT}/node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js` ]
const entries = [ `${JS_TEST}/_js/Main.js` ]
const preprocessors = {}
const files = entries.map(file => {
  preprocessors[file] = ['webpack', 'sourcemap']
  return { pattern: file }  
})


//sinonとはSinon.jsというテスト用のライブラリ
export default function(config) {
  config.set({
    basePath: '', //filesで読み込むファイルのベースパスを指定
    frameworks: ['mocha'], //mocha（テスト（BDDやTDD）をするための枠組み）を設定
    reporters:  ['mocha'], //テスト結果を見やすく表示する為にkarma-mocha-reporterを設定
    browsers:   ['PhantomJS'], //ランチャー：自動でアクセスするブラウザを指定
    plugins: [ //karma-*でマッチする必要なnode_moduleを読み込む
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    files: [ ...polyfills, ...files ], //アプリファイル、テストファイル読み込み
    preprocessors: preprocessors, //Karmaに読み込ませる前にAltJSなどをJavaScriptに変換する設定
    webpack: { //webpackの設定
      devtool: 'inline-source-map',
      module: {
        loaders: [ //対象のファイルを変換するための loader を指定
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: [ 'es2015', 'stage-0', 'react' ]}
          },
          { test: /\.json$/, loader: 'json' },
        ],
        noParse: [ /sinon/ ] //webpackによるパースを無効にし、依存関係を解除
      },
      externals: { //ライブラリ系のファイルを外部依存とすることでコンパイル高速化
        //外部依存させない場合は　_: false　か、lodash: false
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },

      //http://dackdive.hateblo.jp/entry/2016/04/13/123000#resolve
      resolve: {//foo.js を require('foo') というように拡張子なしで読み込みたい場合は '.js' を指定する
        extensions: [ '.js' ], //たとえば Reactファイルの拡張子を .jsx で作っていた場合 .jsxを記載する
        alias: {// 個別に外部ライブラリを読み込む設定
          '~': JS_SRC, // JS_SRCを ~ で記述できるように
          sinon: 'sinon/pkg/sinon' // 'sinon/pkg/sinon' を sinonで記述できるように
        }
      }
    },

    //https://webpack.github.io/docs/usage-with-karma.html
    webpackMiddleware: {
      stats: 'errors-only' //エラーのみの出力にする //'none', 'errors-only', 'minimal', 'normal', 'verbose'
      //noInfo: true //不要なテキスト出力を回避します
    },
    port: PORT.karma, //デフォルトは9876
    autoWatch: true, //ファイルの変更を監視
    logLevel: config.LOG_INFO //Karmaがブラウザから取得するログのレベル(全出力・エラーのみ出力等)
    //possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  })
}