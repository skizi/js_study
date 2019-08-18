import { ROOT, JS_SRC, JS_TEST, PORT } from './env'
const polyfills = [ `${ROOT}/node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js` ]
const entries = [ `${JS_TEST}/common/main.js` ]
const preprocessors = {}
const files = entries.map(file => {
  preprocessors[file] = ['webpack', 'sourcemap']
  return { pattern: file }  
})

export default function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    reporters:  ['mocha'],
    browsers:   ['PhantomJS'],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    files: [ ...polyfills, ...files ],
    preprocessors,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: [ 'es2015', 'stage-0', 'react' ]}
          },
          { test: /\.json$/, loader: 'json' },
        ],
        noParse: [ /sinon/ ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
        extensions: [ '.js' ],
        alias: { '~': JS_SRC, sinon: 'sinon/pkg/sinon' }
      }
    },
    webpackMiddleware: { stats: 'errors-only' },
    port: PORT.karma,
    autoWatch: true,
    logLevel: config.LOG_INFO
  })
}