var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
config = require('../config');

gulp.task('js', function() {
  return gulp.src([ './app/js/vendors/jquery.js', './app/js/vendors/bootstrap.js', './app/js/vendors/modernizr.js', './app/js/vendors/detectizr.js', './app/js/vendors/chosen.js', './app/js/scripts.js'])
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('./dist/js'));
});
