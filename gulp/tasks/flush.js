var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
del = require('del'),
runSequence = require('run-sequence'),
config = require('../config');

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
