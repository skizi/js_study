const gulp = require("gulp");
const path = require('path');
const cache = require("gulp-cache");
const sass = require("gulp-sass");
// const pleeease = require("gulp-pleeease");
const postcss = require("gulp-postcss");
// const autoprefixer = require("gulp-autoprefixer");
const autoprefixer = require("autoprefixer");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const changed = require("gulp-changed");
const browserSync = require("browser-sync");
const plumber = require("gulp-plumber");
const runSequence = require("run-sequence");

const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const stripDebug = require('gulp-strip-debug');

const eslint = require('gulp-eslint');

const _ = require("underscore");

jsEntities = {
	src: 'src/vue',
	dest: 'htdocs/js',
	files: [
	  'app.js'
	]
};

var options = {
	outputStyle: "expanded",
	sourceMap: true,
	sourceComments: false
};

var autoprefixerOptions = {
	browsers: ["last 3 version", "ie >= 10", "Android >= 4.0"]
};

// vueify.compiler.applyConfig(require('./vue.config.js'));


// キャッシュをクリア
gulp.task('clear', function (done) {
	return cache.clearAll(done);
});

//sassコンバート
gulp.task("sass", function() {
	gulp.src("src/sass/**/*.+(scss|sass)")
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(sass(options))
		.pipe(postcss([autoprefixer({autoprefixerOptions})]))
		// .pipe(pleeease({
		// 	minifier: false,
		// 	fallbacks: {
		// 		autoprefixer: autoprefixerOptions
		// 	}
		// }))
		.pipe(gulp.dest("htdocs/css"))
		.pipe(browserSync.stream())
});


// js
gulp.task("js", function() {
	gulp.src(["src/js/*.js","!src/js/*.min.js"])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(stripDebug())
        .pipe(uglify({output:{comments: 'some'}}))
        .pipe(rename({extname: ".min.js"}))
		.pipe(gulp.dest("htdocs/js"))
});

var envify = require('envify/custom');
gulp.task('vue', () => {
    jsEntities.files.forEach(entry => {
        browserify(path.join(jsEntities.src, entry), {
            debug: false,
            extensions: ['.js', '.vue'],
            transform: [
                [vueify, {
	            	sass: {
						includePaths: ["./src/sass/import/_vars.scss"]
					}
				}],
                babelify.configure({ 'presets': ['es2015'] })
            ],
        })
        .transform(
	    	{ global: true },
	        envify({ NODE_ENV: 'production' })
	    )
        .bundle()
        .on('error', err => {
            console.log(err.message);
            console.log(err.stack);
        })
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(gulp.dest(jsEntities.dest))
		.pipe(browserSync.reload({stream:true}));
    });
});


//監視開始
gulp.task("watch", function() {
	browserSync.init({
		online: true,
		ui: false,
		// proxy: {
		//     target: "http://test.dev",
		// }
        server: {
            baseDir: "./htdocs",
        },
		port: 3597
	});
	gulp.watch("src/sass/**/*.+(scss|sass)",["sass"]);
	gulp.watch(["src/js/*.js","!src/js/*.min.js"],["js"]);
	gulp.watch(path.join(jsEntities.src, '**/*.*'), ['vue']);
	
});

gulp.task('default', function(callback){
	return runSequence('clear', 'watch', callback);
});

