var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
inject = require('gulp-inject'),
runSequence = require('run-sequence'),
config = require('../config');


gulp.task('chosencss', function () {
gulp.src(config.main.src + config.frameworkSass.src)
  .pipe(inject(gulp.src([config.main.internal + 'inject/chosencss.txt']), {
    starttag: '// inject:chosen',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.main.src + config.frameworkSass.dest));
});

gulp.task('chosenjs', function () {
gulp.src(config.frameworkJs.src)
  .pipe(inject(gulp.src([config.main.internal + 'inject/chosenjs.txt']), {
    starttag: '// inject:chosen',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.frameworkJs.dest));
});

gulp.task('chosenvar', function () {
gulp.src(config.main.src + config.frameworkJs.var)
  .pipe(inject(gulp.src([config.main.internal + 'inject/chosenvar.txt']), {
    starttag: '// inject:chosen',
    endtag: '// endinject',
    transform: function (filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8')
    }
  }))
  .pipe(gulp.dest(config.main.src + config.frameworkVar.dest));
});


gulp.task('chosen', function(callback) {
  runSequence(
    ['chosencss'],
    ['chosenjs'],
    // ['chosenvar'],
    callback
    );
});

