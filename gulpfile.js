'use strict';

var path = require('path');
var gulp = require('gulp');
var layouts = require('./');

var files = {
  aaa: {path: 'aaa', contents: new Buffer('aaa before\n{% body %}\naaa after'), layout: 'bbb'},
  bbb: {path: 'bbb', contents: new Buffer('bbb before\n{% body %}\nbbb after'), layout: 'ccc'},
  ccc: {path: 'ccc', contents: new Buffer('ccc before\n{% body %}\nccc after')},
};

gulp.task('default', function() {
  return gulp.src('test/fixtures/*.txt')
    .pipe(layouts({files: files, defaultLayout: 'aaa'}))
    .pipe(gulp.dest('test/actual'));
});
