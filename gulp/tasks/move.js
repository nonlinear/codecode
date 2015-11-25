var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
config = require('../config');

gulp.task('font', function () {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('svgfile', function () {
  return gulp.src('./app/sass/generated/svg/*')
  .pipe(gulp.dest('./dist/svg'))
});

gulp.task('js', function () {
  return gulp.src('./app/js/**/*')
  .pipe(gulp.dest('./dist/js'))
});
