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
svgSprite = require('gulp-svg-sprites'),
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

// Browser Sync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dist/'
    },
  })
})


// SVG sprites
gulp.task('svgSprite', function () {
  return gulp.src('./app/svg/*.svg')
  .pipe(svgSprite({
    cssFile: 'svg.scss'
  }))
  .pipe(gulp.dest("./app/sass/generated"))
  .pipe(filter("**/*.svg"))
  .pipe(svg2png())
  .pipe(gulp.dest("./dist"))
});

// SVG symbols, trying a new method for icons...
// Not having any luck.
// gulp.task('symbols', function () {
//   return gulp.src('./app/symbols/*.svg')
//   .pipe(svgSprite({mode: "defs"}))
//   .pipe(filter("**/*.svg"))
//   .pipe(gulp.dest("./dist"))
// });

// gulp.task('symbols', function () {
//     return gulp.src('./app/symbols/*.svg')
//         .pipe(svgSprite({mode: "defs"}))
//         .pipe(gulp.dest("./dist"));
// });


// Data places
gulp.task('data', function(){
  return JSON.parse(fs.readFileSync('./app/data/data.json'))
});


// Clean files
gulp.task('clean', function(callback){
  del(['./dist', './app/sass/generated'], callback);
});



// Consolidated dev phase task


// =======
// TESTING
// =======

// Checks for JS errors
gulp.task('lint:js', function(){
  return gulp.src('./dist/js/*.js')
  .pipe(customPlumber('JSHint Error'))
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail', {
    ignoreWarning: true,
    ignoreInfo: true
  }))
  .pipe(jscs({
    fix: true,
    configPath: '.jscsrc'
  }))
  .pipe(gulp.dest('./dist/js'))
});

// =================
// OPTIMIZING
// =================




gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// move fonts to dist
gulp.task('font', function () {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'))
});

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
