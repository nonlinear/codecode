var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
del = require('del'),
runSequence = require('run-sequence'),
config = require('../config');

gulp.task('start1', function(callback){
  del([
    config.main.src + 'fonts/dense.*',
    config.main.src + 'fontgen/dense.*',
    config.main.src + 'pages',
    config.main.src + 'templates/layout.html',
    config.main.src + 'data/categories.json',
    config.main.src + 'templates/partials/*.*',
    '!' + config.main.src + 'templates/partials/datepicker.html',
    config.main.src + 'sass/project',
    config.main.src + 'sass/style.sass'
    ], callback);
});
gulp.task('start2', function(){
  return gulp.src(config.main.src + config.main.internal + 'start/index.html')
  .pipe(gulp.dest(config.main.src + 'pages/'))
});
gulp.task('start3', function(){
  return gulp.src(config.main.src + config.main.internal + 'start/layout.html')
  .pipe(gulp.dest(config.main.src + 'templates'))
});
gulp.task('start4', function(){
  return gulp.src(config.main.src + config.main.internal + 'start/layout.sass')
  .pipe(gulp.dest(config.main.src + 'sass'))
});
gulp.task('start5', function(){
  return gulp.src(config.main.src + config.main.internal + 'start/style.sass')
  .pipe(gulp.dest(config.main.src + 'sass'))
});
gulp.task('start6', function(callback){
  return gulp.src(config.main.src + config.main.internal + 'start/head.html')
  .pipe(gulp.dest(config.main.src + 'templates/partials'))
});
gulp.task('start7', function(callback){
  del(['./gulp/tasks/start.js'], callback);
});


gulp.task('start', function(callback) {
  runSequence(
    ['start1'],
    ['start2', 'start3', 'start4', 'start5'],
    ['no-fa'],
    ['no-animate'],
    ['no-loaders'],
    ['no-flexslider'],
    ['no-clipboard'],
    ['start6', 'start7'],
    callback
    );
});
