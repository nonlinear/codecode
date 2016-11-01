var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
inject = require('gulp-inject'),
runSequence = require('run-sequence'),
config = require('../config');


gulp.task('semanticcss', function () {
gulp.src(config.main.src + config.frameworkSass.src)
  .pipe(inject(gulp.src([config.main.internal + 'inject/semanticcss.txt']), {
    starttag: '// inject:framework',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.main.src + config.frameworkSass.dest));
});

gulp.task('semanticjs', function () {
gulp.src(config.frameworkJs.src)
  .pipe(inject(gulp.src([config.main.internal + 'inject/semanticjs.txt']), {
    starttag: '// inject:framework',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.frameworkJs.dest));
});

gulp.task('semanticvar', function () {
gulp.src(config.main.src + config.frameworkJs.var)
  .pipe(inject(gulp.src([config.main.internal + 'inject/blank.txt']), {
    starttag: '// inject:framework',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.main.src + config.frameworkVar.dest));
});


gulp.task('semantic', function(callback) {
  runSequence(
    ['semanticcss'],
    ['semanticjs'],
    // ['semanticvar'],
    callback
    );
});

