var gulp   = require('gulp'),
    uglify = require('gulp-uglify'),
    pump   = require('pump'),
    rename = require('gulp-rename');

gulp.task('default', ['build','compress-js']); 


gulp.task('build', function (cb) {
  pump([
        gulp.src('src/stage/js/*.js'),
        gulp.dest('src/build/js/')
    ],
    cb
  );
});

gulp.task('compress-js', function (cb) {
  pump([
        gulp.src('src/stage/js/*.js'),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('src/build/js/')
    ],
    cb
  );
});

