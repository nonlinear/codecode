var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
inject = require('gulp-inject'),
runSequence = require('run-sequence'),
config = require('../config');


gulp.task('root1', function () {
gulp.src(config.root.src)
  .pipe(inject(gulp.src(['./inject/root.txt']), {
    starttag: '// inject:root',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.root.dest));
});


gulp.task('root', function(callback) {
  runSequence(
    ['clean'],
    ['root1'],
    callback
    );
});

