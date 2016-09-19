var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
inject = require('gulp-inject'),
runSequence = require('run-sequence'),
config = require('../config');


gulp.task('semanticcss', function () {
gulp.src('./app/sass/style.sass')
  .pipe(inject(gulp.src(['./inject/semantic-css.txt']), {
    starttag: '// inject:framework',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest('./app/sass/'));
});

gulp.task('semanticjs', function () {
gulp.src('./gulp/config.js')
  .pipe(inject(gulp.src(['./inject/semantic-js.txt']), {
    starttag: '// inject:framework',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest('./gulp/'));
});


gulp.task('semantic', function(callback) {
  runSequence(
    ['semanticcss'],
    ['semanticjs'],
    callback
    );
});

