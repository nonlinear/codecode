var gulp = require('gulp'),
replace = require('gulp-regex-replace'),
$ = require('gulp-load-plugins')(),
config = require('../config');

gulp.task('patterns', function() {
  return gulp.src('./app/patterns/*.svg')
    .pipe($.concat('all.sass'))
    .pipe(gulp.dest('./app/patterns'));
});

gulp.task('regex', function () {
    return gulp.src('./app/patterns/all.sass')
        .pipe(replace({regex:'aaa', replace:'height'}));
});
