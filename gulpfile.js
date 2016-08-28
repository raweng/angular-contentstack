(function(){
  'use strict';

  var gulp = require('gulp'),
      clean = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      path = require('path'),
      plumber = require('gulp-plumber'),
      runSequence = require('run-sequence'),
      jshint = require('gulp-jshint'),
      sourceFiles = ['src/*.module.js','src/*.provider.js','src/*.directives.js','src/*.factory.js'];

  gulp.task('clean', function(cb) {
      clean("dist", cb);
  });

  gulp.task('jshintSrc', function () {
    return gulp.src(sourceFiles)
      .pipe(plumber())
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
  });

  gulp.task('makeSourceFiles',function(){
    gulp.src(sourceFiles)
      .pipe(plumber())
      .pipe(concat('angular-contentstack.js'))
      .pipe(gulp.dest('./dist/'))
      .pipe(uglify())
      .pipe(rename('angular-contentstack.min.js'))
      .pipe(gulp.dest('./dist'))
  });

  gulp.task('build', function(done) {
    runSequence('jshintSrc', 'clean', 'makeSourceFiles', done)
  });

  gulp.task('watchTask', function (done) {
    runSequence('build', done)
  });

  gulp.task('watch', function () {
    gulp.watch(sourceFiles, ['watchTask']);
  });

  gulp.task('default', function () {
    runSequence('build', 'watch')
  });

})();
