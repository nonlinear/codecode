var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
config = require('../config');

gulp.task('patterns', function() {
  return gulp.src('./app/patterns/svg/*.svg')
    .pipe($.concat('bb_middle.txt'))
    .pipe(gulp.dest('./app/patterns'));
});

gulp.task('patterns2', function() {
  return gulp.src('./app/patterns/*.txt')
    .pipe($.concat('patterns.sass'))
    .pipe(gulp.dest('./app/patterns'));
});
