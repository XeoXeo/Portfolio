// Gulp.js configuration
var
	// Modules
	gulp = require('gulp'),

	// Images modules
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),

	// HTML modules
	htmlclean = require('gulp-htmlclean'),

	// JS modules
	concat = require('gulp-concat'),
	deporder = require('gulp-deporder'),
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),

	// CSS modules
	path = require('path'),
	less = require('gulp-less'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	//concat = require('gulp-concat-css'),

	// Dev mode
	devBuild = (process.env.NODE_ENV !== "Production"),

	// Folders
	folder = {
		src: 'app/',
		build: 'build/'
	}
;

// Image processing
gulp.task('images', function() {
	var out = folder.build + 'img/';
	return gulp.src(folder.src + 'img/**/*')
		.pipe(newer(out))
		.pipe(imagemin({ optimizationLevel: 5 }))
		.pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', ['images'], function() {
  	var
	    out = folder.build + 'html/',
	    page = gulp.src(folder.src + 'html/**/*')
	      .pipe(newer(out));

	// minify production code
	if (!devBuild) {
		page = page.pipe(htmlclean());
	}

	return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {

	var jsbuild = gulp.src(folder.src + 'js/**/*')
		.pipe(deporder())
		.pipe(concat('main.js'));

	if (!devBuild) {
		jsbuild = jsbuild
		  .pipe(stripdebug())
		  .pipe(uglify());
	}

	return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

// CSS processing
gulp.task('css', ['images'], function() {

	var postCssOpts = [
		assets({ loadPaths: ['images/'] }),
		autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
		mqpacker
	];

	if (!devBuild) {
		postCssOpts.push(cssnano);
	}

	return gulp.src(folder.src + 'css/main.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(postcss(postCssOpts))
		.pipe(gulp.dest(folder.build + 'css/'));

});

// Copy CSS dependencies
//gulp.task('copyCSS', function() {
//	return gulp.src(folder.src + 'css/**/*')
//		.pipe(gulp.dest(folder.build + 'css/'));
//});
//

// run all tasks
gulp.task('run', ['html', 'css', 'js']);

// watch for changes
gulp.task('watch', function() {

	// image changes
	gulp.watch(folder.src + 'images/**/*', ['images']);

	// html changes
	gulp.watch(folder.src + 'html/**/*', ['html']);

	// javascript changes
	gulp.watch(folder.src + 'js/**/*', ['js']);

	// css changes
	gulp.watch(folder.src + 'css/**/*', ['css']);

});

// default task
gulp.task('default', ['run', 'watch']);
