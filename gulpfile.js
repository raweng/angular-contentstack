(function(){
  'use strict';

  var gulp = require('gulp'),
      clean = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      gutil = require('gulp-util'),
      rename = require('gulp-rename'),
      path = require('path'),
      plumber = require('gulp-plumber'),
      runSequence = require('run-sequence'),
      header = require('gulp-header'),
      pkg = require('./package.json'),
      jshint = require('gulp-jshint'),
      karma = require('karma').server,
      sourceFiles = ['src/*.sdk.js','src/*.module.js','src/*.provider.js','src/*.directives.js','src/*.factory.js'],
      banner = ['/*!',
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= date %>',
                ' * <%= pkg.homepage %>',
                ' * Copyright (c) <%= year %> <%= pkg.author %>;',
                ' * Licensed',
                ' */',
                ''].join('\n');

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
      .pipe(header(banner, { pkg : pkg,  date : gutil.date("yyyy-mm-dd"), year : gutil.date("yyyy")}))
      .pipe(concat('angular-contentstack.js'))
      .pipe(gulp.dest('./dist/'))
      .pipe(uglify())
      .pipe(rename('angular-contentstack.min.js'))
      .pipe(gulp.dest('./dist'))
  });

  // gulp.task('build', function(done) {
  //   runSequence('jshintSrc', 'clean', 'makeSourceFiles', done)
  // });

  gulp.task('build', function(done) {
    runSequence('clean', 'makeSourceFiles', done)
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

  gulp.task('test-src', function (done) {
    karma.start({
      configFile: __dirname + '/karma-src.conf.js',
      singleRun: true
    }, done);
  });

})();
