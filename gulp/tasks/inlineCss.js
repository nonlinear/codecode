var gulp = require('gulp'),
inlineCss = require('gulp-inline-css'),
config = require('../config');

gulp.task('inlineCss', function() {
    return gulp.src(config.inlineCss.src)
        .pipe(inlineCss())
        .pipe(gulp.dest(config.inlineCss.dest));
});
