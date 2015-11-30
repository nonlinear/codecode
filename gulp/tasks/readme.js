var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
config = require('../config');

gulp.task('readme', function() {
  return gulp.src(['./INFO.md', './TODO.md'])
    .pipe($.concat('README.md'))
    .pipe(gulp.dest('./'));
});
