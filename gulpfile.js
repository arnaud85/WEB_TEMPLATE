// LOCAL VARIABLES
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

// SERVER & LIVERELOAD
gulp.task('connect', function() {
	
	const connect = require('connect');
	const serveStatic = require('serve-static');
	const serveIndex = require('serve-index');

	const app = connect()
	.use(require('connect-livereload')({ port: 35729 }))
	.use(serveStatic('./'))
	.use(serveIndex('./'));

	require('http').createServer(app).listen(8080);
});


// FOLDERS
const baseFolder = {
  dev  : './',
  dist : './'
};

const devFolder = {
  sass  : baseFolder.dev + 'sass/',
  js : baseFolder.dev + 'js/',
  img  : baseFolder.dev + 'img/'
};

const distFolder = {
  css  : baseFolder.dist + 'css/',
  js : baseFolder.dist + 'js/',
  img  : baseFolder.dist + 'img/'
};


// STYLES
gulp.task('styles', function() {

	return gulp.src(devFolder.sass + '**/*.scss')
		.pipe(plugins.sass())
		.pipe(gulp.dest(distFolder.css));
});


// WATCH
gulp.task('watch', function () {

  plugins.livereload.listen();

  gulp.watch([distFolder.css + '**/*.css']).on('change', plugins.livereload.changed);
});


// MAIN
gulp.task('default', ['styles', 'connect', 'watch']);