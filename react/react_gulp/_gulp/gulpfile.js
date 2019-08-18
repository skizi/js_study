var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var compass =  require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var react = require('gulp-react');

 
//それぞれのJSファイルを結合
gulp.task('concat', function() {
  gulp.src([
    '_jsx/**'
    ])
    .pipe(concat("main.js"))
    .pipe(react())
    .pipe(gulp.dest('../htdocs/assets/js'));
});
 
//Sassファイル(Compass)をコンパイル
gulp.task('compass', function() {
    gulp.src('_scss/*.scss')
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
    gulp.watch('_jsx/**', function(event) {
        gulp.run('concat');
    });
    
    //Sassファイルの変更を監視
    gulp.watch('_scss/**', function(event) {
        gulp.run('compass');
    });
    
});