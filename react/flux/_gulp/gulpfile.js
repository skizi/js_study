var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var stripDebug    = require('gulp-strip-debug'); // console alert
var concat    = require('gulp-concat');
var compass   =  require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var plumber   = require('gulp-plumber');
var browserify = require('browserify');
var source = require('vinyl-source-stream');// bundle の返したファイルストリームを vinyl に変換
var reactify = require('reactify');// Browserify用のJSX変換プラグイン


//それぞれのJSファイルを結合
gulp.task('browserify', function() {

  //http://tttttahiti.hatenablog.com/entry/2015/08/18/185325
  //https://www.saintsouth.net/blog/tutorial-nodejs-react-flux/
  browserify({
        entries: ['./_react/Main.js'],
        transform: [reactify]
    })
    .bundle()
    .pipe(source("main.js"))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('../htdocs/assets/js'));

});



//Sassファイル(Compass)をコンパイル
gulp.task('compass', function() {
    gulp.src([
        '_scss/**/*.scss',  //ディレクトリを保持したまま書き出し
        '!_scss/sp/*.scss' // spディレクトリ下のファイルは除外
    ])
    .pipe(plumber())
    .pipe(compass({
        config_file: '_scss/config.rb',
        css : '../htdocs/assets/css',
        sass: '_scss',
        comments: false
    }))
    //.pipe(minifyCSS())
    .pipe(gulp.dest('../htdocs/assets/css'));
});



// デフォルトタスク
gulp.task('default', function() {

    //JSファイルの変更を監視
    gulp.watch('_react/**', function(event) {
        gulp.run('browserify');
    });

    //Sassファイルの変更を監視
    gulp.watch('_scss/**', function(event) {
        gulp.run('compass');
    });

});