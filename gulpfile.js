var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
requireDir = require('require-dir');

requireDir('./gulp/tasks');


gulp.task('js-concat', function() {
  return gulp.src([ './app/js/vendors/jquery.js', './app/js/vendors/bootstrap.js', './app/js/vendors/modernizr.js', './app/js/vendors/detectizr.js', './app/js/vendors/chosen.js', './app/js/scripts.js'])
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('./dist/js'));
});


