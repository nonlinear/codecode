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
cache = require('gulp-cache'),
ghPages = require('gulp-gh-pages'),
svgSprite = require('gulp-svg-sprites'),
filter = require('gulp-filter'),
svg2png = require('gulp-svg2png'),
rename = require('gulp-rename');


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

// Compiles Sass to CSS, removes unused files, /reports
gulp.task('sass', function(){
  return gulp.src('./app/sass/style.sass')
  .pipe(customPlumber('Error Running SASS'))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

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


// Watchers files for changes
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('./app/sass/**/*.+(sass|scss)', ['sass']);
  gulp.watch('./dist/js/*.js', ['lint:js']);
  gulp.watch('./app/images/**/*.+(png|jpg|jpeg|gif|svg)', ['imagemin']);
  gulp.watch('./app/svg/**/*', ['svgSprite']);
  gulp.watch('./app/js/**/*.js', browserSync.reload);
  gulp.watch('./dist/*.html', browserSync.reload);
  gulp.watch([
    './app/templates/**/*',
    './app/pages/**/*.*'
    // ,
    // './app/data.json'
    ], ['nunjucks']);
});

// Templating
gulp.task('nunjucks', function(){
  nunjucksRender.nunjucks.configure(['./app/templates/'], {watch: false});
  return gulp.src('./app/pages/**/*.*')
  .pipe(customPlumber('Error Running Nunjucks'))
  .pipe(data(function() {
    return JSON.parse(fs.readFileSync('./app/data.json'))
  }))
  .pipe(nunjucksRender())
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

// Data places
gulp.task('data', function(){
  return JSON.parse(fs.readFileSync('./app/data.json'))
});


// Clean files
gulp.task('clean', function(callback){
  del(['./dist', './app/sass/generated'], callback);
});



// Consolidated dev phase task
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    ['svgSprite', 'lint:js'],
    ['svgfile', 'font', 'js'],
    ['sass', 'nunjucks'],
    ['browserSync', 'watch'],
    callback
    );
});

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

gulp.task('images', function(){
  return gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    progressive: true,
    optimizationLevels: 5,
    multipass: true
  })))
  .pipe(gulp.dest('./dist/images'))
});


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



// moves dist to gh-pages
gulp.task('gh-pages', function() {
  return gulp.src('./dist/**/*')
  .pipe(ghPages());
});

// =======
// PUBLISH
// =======

// Clean unused CSS rules
gulp.task('uncss', function () {
  return gulp.src('./dist/css/style.css')
  .pipe(uncss({
    html: ['./dist/**/*.html'],
    ignore: [/.chosen/]
  }))
  .pipe(gulp.dest('./dist/css'));
});


gulp.task('publish', function(callback) {
  runSequence(
    ['uncss'],
    ['gh-pages'],
    callback
    );
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
