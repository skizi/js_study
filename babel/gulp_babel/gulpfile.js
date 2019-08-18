/**
 * gulpfile
 */
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browser = require('browser-sync');
const watch = require('gulp-watch');
const pug = require('gulp-pug');

var sass = require('gulp-sass');
var packageImporter = require('node-sass-package-importer');
var nodeSass = require('node-sass');
var cssnext = require('postcss-cssnext');
var sizeOf = require("image-size");
var cleanCSS = require('gulp-clean-css');


const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const syntacsScss = require('postcss-scss');
const stylefmt = require('stylefmt');
const changedInPlace = require('gulp-changed-in-place');
const stylelint = require('gulp-stylelint');
const gulppath = require('path');
const foreach = require('gulp-foreach');
const header = require('gulp-header');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const data = require('gulp-data');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const Transform = require('stream').Transform;
const PluginError = require('gulp-util').PluginError;

const rename = require('gulp-rename');
const gulpIf = require('gulp-if');


// ポート番号
let port = 3005;
// 出力言語設定
let language = 'ja';
// 出力ドメイン
let domain = 'jp';

// gulp内で利用する各種ファイルへのパス
let path = {
	src: './src/',
	dest: './htdocs_jp/',
	server: {
		root: '',
		start: '',
	},

	pug_watch: ['./src/**/*.pug'],
	scss_watch: ['./src/**/*.scss'],
	js_watch: ['./src/**/*.{js,es6}', '!./src/**/assets/common/js/**/*.{js,es6}'],
	js_libs_watch: ['./src/**/assets/common/js/**/*.js', '!./src/**/assets/common/js/**/_*.js'],

	pug: ['./src/**/*.pug', '!./src/**/_*.pug'],
	scss: ['./src/**/sass/**.scss', '!./src/**/_*/**/sass/**.scss'],
	js: ['./src/**/*.{js,es6}', '!./src/**/_*.{js,es6}', '!./src/**/_*/**/*.{js,es6}', '!./src/**/assets/common/js/**/*.{js,es6}'],
	js_libs: ['./src/**/assets/common/js/**/*.js', '!./src/**/_*.js', '!./src/**/_*/**/*.js'],
	other: ['./src/**/*.{csv,json,css,html}', '!./src/**/_*.*']
};


/**
 * language
 */
gulp.task('language:ja', ()=> {
	port = 3005;
	language = 'ja';
	domain = 'jp';
	path.dest = './htdocs_jp/';
});

gulp.task('language:en', ()=> {
	port = 4005;
	language = 'en';
	domain = 'en';
	path.dest = './htdocs_en/';
	console.log("lanuguage:en");
});


/**
 * pug
 * /src/内のpugファイルをコンパイルし/htdocs/に出力するタスク
 *
 * @return {Stream}
 */
gulp.task('pug', ()=> {
	gulp.src(path.pug)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		//jsonをデータとして読み込むときには、こちらのコメントアウトを外す
		// .pipe(data(function(file) {
		// 	var json = {};
		// 	String(file.contents).split("\n").forEach(function(line) {
		// 		if(line.match(/^\/\/\-\s*?data\s+?((\w+)\.json)$/)) {

		// 		}
		// 	});

		// 	var json_path = './src/promotion/bleach/assets/index/json/data.json';
		// 	delete require.cache[require.resolve(json_path)]
		// 	json = require(json_path);
		// 	return { data: json };
		// }))
		.pipe(
			pug({
				locals: {
					language: language
				},
				pretty: '\t',
				basedir: './src/'
			})
		)
		.pipe(gulp.dest(path.dest))
		.pipe(
			notify({
				title: '👍  Pug is Compiled!',
				message: new Date(),
				onLast: true
				// icon: iconNotify
			}
		))
		.pipe(browser.reload({stream:true}));

});


/**
 * scssコンパイル時に利用する関数
 */
let getImageSize = function(filePath) {
	filePath = "./htdocs_" + domain + "/" + filePath;
	let dimensions;
	try {
	  dimensions = sizeOf(filePath);
	} catch (err) {
	  console.error(err);
	}
	return dimensions;
};
//Sass用メソッド；width
let sassFuncGetImageSizeWidth = function(filePath) {
	filePath = filePath.getValue();
	return nodeSass.types.Number(getImageSize(filePath).width, "px");
}
//Sass用メソッド；height
let sassFuncGetImageSizeHeight = function(filePath) {
	filePath = filePath.getValue();
	return nodeSass.types.Number(getImageSize(filePath).height, "px");
}
//Sass用メソッド；横を１としたときの縦の比率
let sassFuncGetImageVerticalRatio = function(filePath) {
	filePath = filePath.getValue();
	let _ratio = (getImageSize(filePath).height / getImageSize(filePath).width) * 100;
	return nodeSass.types.Number(_ratio);
}


/**
 * sassのコンパイルタスク
 *
 * @return {Stream}
 */
gulp.task('scss', () => {

	// let isProduction = false;
	// if (process.env.NODE_ENV === 'production'){
	// 	isProduction = true;
	// }

	gulp.src(path.scss)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		// .pipe(sourcemaps.init())
		.pipe(header('$language: '+language+';'))
		.pipe(sass({
			importer: packageImporter({
				extensions: ['.scss']
			}),
			functions: {
				'image-width($path)': sassFuncGetImageSizeWidth,
				'image-height($path)': sassFuncGetImageSizeHeight,
				'image-vertical-ratio($path)': sassFuncGetImageVerticalRatio
			}
			//outputStyle: outputStyle
		}))
		// .pipe(postcss(processors))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'iOS >= 8.0', 'Android >= 4.0.3'],
			cascade: false
		}))
		.pipe(cleanCSS())
		//.pipe($.sourcemaps.write('./maps'))
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace( /sass/ , "css" );
		}))
		.pipe(gulp.dest(path.dest))
		.pipe(
			notify({
				title: '🎨  Scss is Compiled!',
				message: new Date(),
				onLast: true
			})
		)
		.pipe(browser.reload({stream:true}));
});



/**
 * stylefmt
 * stylelintのルールに従ってcss,scssをフォーマットするタスク
 *
 * @return {Stream}
 */
gulp.task('stylefmt', function () {
	const processors = [
		stylefmt({
			configFile: '.stylelintrc'
		})
	];
	gulp.src('./src/**/*.scss')
		.pipe(changedInPlace({firstPass: true}))
		.pipe(postcss(processors, {syntax: syntacsScss}))
		.pipe(gulp.dest(path.src));
});


/**
 * stylelint
 * 対象のcssがスタイル規約に従っているかをチェックするタスク
 *
 * @return {Stream}
 */
gulp.task('stylelint',  ()=> {
	// stylelintの対象をプロジェクト全体の .scssにする場合
	gulp.src('./src/**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError({
				title: '😱  Stylelint Error!',
				message: '\nスタイル規約違反の記述があります！\nターミナルで内容を確認してね！\n\nもし、\n\n essage:\n     Subject parameter value width cannot be greater than the container width.\n\nという文言がこの赤いエリアのちょっと下に出ている場合は、\ngulpを一旦停止した後、\n\n stty cols 1000 \n\nというコマンドを実行してみてください。\n\n特に何も見た目の変化はありませんが、\nそのまま再度gulpコマンドを実行すると\nスタイル規約違反箇所が一覧で表示されると思います！\n\n'
			})
		}))
		.pipe(stylelint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});


/**
 * srcディレクトリのjsをhtdocsに移動
 */
gulp.task('js', ()=> {

	gulp.src(path.js)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(foreach((stream, dir)=> {

			// var dirPath = dir.path;

			// if(process.env.OS && process.env.OS.match(/windows/i) !== null) {
			// 	dirPath = dir.path.replace(/\\/g, '/');
			// }
			var sourcePath = dir.path.replace( /^.*\/src\//, "./src/" );
			var fileName = dir.path.split("/").pop();
			var destPath = sourcePath.replace( /\.\/src\//, path.dest ).split(fileName)[0];

			return browserify(sourcePath, { debug: true })
				.transform(babelify, {presets: ['env', 'stage-3'], plugins: ['transform-runtime']})
		    	.bundle()
		    	.on('error', function(err){
		        	console.log(err.message);
					console.log(err.stack);
					this.emit('end');
		    	})
				.pipe(source(fileName))
				.pipe(rename({
					extname: ".js"
				}))
		    	.pipe(gulp.dest(destPath));


	        // browserify( sourcePath, { debug:true })
	        //     .transform(babelify, {presets: ['es2015']})
	        //     .bundle()
	        //     .on("error", function (err) {
	        //         console.log("Error : " + err.message);
	        //         this.emit("end");
	        //     })
	        //     .pipe(source( fileName ))
	        //     .pipe(gulp.dest( destPath ));

		}))
		.pipe(
			notify({
				title: '🎨  js is Compiled!',
				message: new Date(),
				onLast: true
				// icon: iconNotify
			})
		)
		.pipe(browser.reload({stream:true}));
});

/**
 * サイト共通のJSファイルを連結・圧縮するタスク
 */
gulp.task('js_libs', ()=> {
	gulp.src(path.js_libs)
	.pipe(sourcemaps.init())
	.pipe(concat('libs.js'))
	// ファイルを圧縮します。
	.pipe(uglify({preserveComments: 'license'}))
	// .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(path.dest + path.server.start + 'assets/common/js/'))
	.pipe(
		notify({
			title: '👍  Js is Compiled!',
			message: new Date(),
			onLast: true
			// icon: iconNotify
		})
	)
	.pipe(browser.reload({stream:true}));
});


/**
 * srcディレクトリのjsをhtdocsに移動
 */
gulp.task('other', ()=> {
	gulp.src(path.other)
	.pipe(gulp.dest(path.dest))
	.pipe(
		notify({
			title: '👍  Other Files is Copied!',
			message: new Date(),
			onLast: true
			// icon: iconNotify
		})
	)
	.pipe(browser.reload({stream:true}));
});


/**
 * server
 * ローカルサーバをたてるタスク
 */
gulp.task('server', ()=> {
	browser(
		{
			port: port,
			server:
			{
				baseDir: path.dest,
				middleware:
				[]
			},
			startPath: path.server.start,
			ghostMode: false,
			browser: 'google chrome',
			open: 'local'
		}
	);
});



/**
 * watch
 * 対象ファイルを監視し変更があった場合に実行するタスク
 */
gulp.task('watch', ()=> {

	watch(path.pug_watch, ()=> {
		gulp.start('pug');
	});

	watch(path.scss_watch, ()=> {
		gulp.start('scss');
	});

	watch(path.js_watch, ()=> {
		gulp.start('js');
	});

	watch(path.js_libs_watch, ()=> {
		gulp.start('js_libs');
	});

	watch(path.other, ()=> {
		gulp.start('other');
	});
});






/**
 * gulp (default)
 * gulp コマンド実行時に実行する開発時に利用するタスク
 */
gulp.task('default', ()=> {
	gulp.start('jp');
});

/**
 * gulp jp
 * 日本語のファイルをビルドするタスク
 * language:jaのタスクが終了してから実行される
 */
gulp.task('jp', ['language:ja'], ()=> {
	gulp.start('pug');
	gulp.start('scss');
	gulp.start('js_libs');
	gulp.start('js');
	gulp.start('other');
	gulp.start('server');
	gulp.start('watch');
});

/**
 * gulp en
 * 台湾語のファイルをビルドするタスク
 * language:enのタスクが終了してから実行される
 */
gulp.task('en', ['language:en'], ()=> {
	console.log("en");
	gulp.start('pug');
	gulp.start('scss');
	gulp.start('js_libs');
	gulp.start('js');
	gulp.start('other');
	gulp.start('server');
	gulp.start('watch');
});

