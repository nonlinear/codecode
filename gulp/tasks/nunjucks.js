var gulp = require('gulp'),
browserSync = require('browser-sync'),
$ = require('gulp-load-plugins')(),
fs = require('fs'),
customPlumber = require('../custom-modules/plumber'),
config = require('../config');

gulp.task('nunjucks', function(){
  $.nunjucksRender.nunjucks.configure(['./app/templates/'], {watch: false});
  return gulp.src('./app/pages/**/*.*')
  .pipe(customPlumber('Error Running Nunjucks'))
  .pipe($.data(function() {
    return JSON.parse(fs.readFileSync('./app/data/data.json'))
  }))
  .pipe($.nunjucksRender())
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({
    stream:true
  }));
});
