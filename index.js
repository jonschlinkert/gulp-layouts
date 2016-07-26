'use strict';

var extend = require('extend-shallow');
var through = require('through2');
var layouts = require('layouts');

module.exports = function(options) {
  var opts = extend({}, options);

  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    if (!layouts.getLayoutName(file, opts.defaultLayout)) {
      next(null, file);
      return;
    }

    layouts(file, opts.files, opts);
    next(null, file);
  });
};
