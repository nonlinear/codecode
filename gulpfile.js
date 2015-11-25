var gulp = require('gulp'),
sass = require('gulp-sass'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
browserSync = require('browser-sync'),
autoprefixer = require('gulp-autoprefixer'),
gulpIf = require('gulp-if'),
nunjucksRender = require('gulp-nunjucks-render'),
uncss = require('gulp-uncss'),
del = require('del'),
runSequence = require('run-sequence'),
jshint = require('gulp-jshint'),
jscs = require('gulp-jscs'),
data = require('gulp-data'),
fs = require('fs'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),
cache = require('gulp-cache'),
ghPages = require('gulp-gh-pages'),
filter = require('gulp-filter'),
svg2png = require('gulp-svg2png'),
rename = require('gulp-rename'),
todo = require('gulp-todo'),
requireDir = require('require-dir');

requireDir('./gulp/tasks');


// Custom Plumber function for catching errors
function customPlumber (errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Funk"
    })
  });
}






// =================
// OPTIMIZING
// =================






// move fonts to dist


// move resulting svg file to dist
gulp.task('svgfile', function () {
  return gulp.src('./app/sass/generated/svg/*')
  .pipe(gulp.dest('./dist/svg'))
});

// useref is not working, so it moves js straight to dist
gulp.task('js', function () {
  return gulp.src('./app/js/**/*')
  .pipe(gulp.dest('./dist/js'))
});




// ======================
// FLUSHING SPECIFIC DATA
// ======================

gulp.task('flush1', function(callback){
  del([
    './app/fonts/dense.*',
    './app/pages',
    './app/templates/layout.html',
    './app/templates/macros/nav.html',
    './app/sass/project',
    './app/sass/style.sass'
    ], callback);
});
gulp.task('flush2', function(){
  return gulp.src('app/flush/index.html')
  .pipe(gulp.dest('./app/pages/'))
});
gulp.task('flush3', function(){
  return gulp.src('app/flush/layout.html')
  .pipe(gulp.dest('./app/templates'))
});
gulp.task('flush4', function(){
  return gulp.src('app/flush/layout.sass')
  .pipe(gulp.dest('./app/sass'))
});
gulp.task('flush5', function(){
  return gulp.src('app/flush/style.sass')
  .pipe(gulp.dest('./app/sass'))
});
gulp.task('flush6', function(callback){
  del(['./app/flush'], callback);
});

gulp.task('flush', function(callback) {
  runSequence(
    ['flush1'],
    ['flush2', 'flush3', 'flush4', 'flush5'],
    ['flush6'],
    callback
    );
});
