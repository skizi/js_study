var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var compass   =  require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var path      = require('path');
var plumber   = require('gulp-plumber');
var handlebars   = require('gulp-handlebars');
var wrap   = require('gulp-wrap');
var declare = require('gulp-declare');

var postcss = require('gulp-postcss');


//それぞれのJSファイルを結合
gulp.task('concat', function() {


  gulp.src([
    '_js/Main.js'
    ])
    .pipe(plumber())
    .pipe(concat("main.js"))
    //.pipe(uglify())
    .pipe(gulp.dest('../htdocs/assets/js'));

});




//Sassファイル(Compass)をコンパイル
gulp.task('compass', function() {

        gulp.src(['_scss/**/*.scss'])
        .pipe(plumber())
        .pipe(postcss([ require('postcss-size') ]))
        .pipe(gulp.dest('../htdocs/assets/css'));


});



// デフォルトタスク
gulp.task('default', function() {

    //JSファイルの変更を監視
    gulp.watch('_js/**', function(event) {
        gulp.run('concat');
    });

    //Sassファイルの変更を監視
    gulp.watch('_scss/**', function(event) {
        gulp.run('compass');
    });

});