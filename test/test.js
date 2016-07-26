'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var assert = require('assert');
var layouts = require('..');
var vfs = require('vinyl-fs');

var fixtures = path.join.bind(path, __dirname, 'fixtures');

var nested = new File({
  path: fixtures('layouts/nested.txt'),
  contents: fs.readFileSync(fixtures('layouts/nested.txt'))
});
nested.layout = 'default';

var files = {
  'default.txt': new File({
    path: fixtures('layouts/default.txt'),
    contents: fs.readFileSync(fixtures('layouts/default.txt'))
  }),
  'nested.txt': nested
};

describe('gulp-layouts', function() {
  it('should export a function', function() {
    assert.equal(typeof layouts, 'function');
  });

  it('should use a default layout when the file.stem is used', function(cb) {
    var arr = [];
    vfs.src('fixtures/alpha.txt', {cwd: __dirname})
      .pipe(layouts({files: files, defaultLayout: 'default'}))
      .on('data', function(file) {
        arr.push(file);
      })
      .on('end', function() {
        assert.equal(arr[0].contents.toString(), 'before\nThis is the alpha file!\nafter');
        cb();
      });
  });

  it('should use a default layout when the file.basename is used', function(cb) {
    var arr = [];
    vfs.src('fixtures/alpha.txt', {cwd: __dirname})
      .pipe(layouts({files: files, defaultLayout: 'default.txt'}))
      .on('data', function(file) {
        arr.push(file);
      })
      .on('end', function() {
        assert.equal(arr[0].contents.toString(), 'before\nThis is the alpha file!\nafter');
        cb();
      });
  });

  it('should use a default layout when the file.path is used', function(cb) {
    var arr = [];
    vfs.src('fixtures/alpha.txt', {cwd: __dirname})
      .pipe(layouts({files: files, defaultLayout: fixtures('layouts/default.txt')}))
      .on('data', function(file) {
        arr.push(file);
      })
      .on('end', function() {
        assert.equal(arr[0].contents.toString(), 'before\nThis is the alpha file!\nafter');
        cb();
      });
  });

  it('should apply nested layouts', function(cb) {
    var arr = [];
    vfs.src('fixtures/alpha.txt', {cwd: __dirname})
      .pipe(layouts({files: files, defaultLayout: 'nested'}))
      .on('data', function(file) {
        arr.push(file);
      })
      .on('end', function() {
        assert.equal(arr[0].contents.toString(), 'before\nnested before\nThis is the alpha file!\nnested after\nafter');
        cb();
      });
  });
});
