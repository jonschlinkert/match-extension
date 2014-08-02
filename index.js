/*!
 * match-extension <https://github.com/jonschlinkert/match-extension>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var minimatch = require('minimatch');

var ensureDot = function(ext) {
  if (ext[0] !== '.') {
    ext = '.' + ext;
  }
  return ext;
};

module.exports = function matchExt(pattern, ext) {
  if (/\\|\/|^\w+\./.test(ext)) {
    ext = path.extname(ext);
  }

  var re;
  if (pattern instanceof RegExp) {
    return pattern.test(ext);
  } else if (typeof pattern === 'string') {
    re = minimatch.makeRe(pattern);
  } else if (Array.isArray(pattern)) {
    re = new RegExp('^\\.' + pattern.join('|'));
  } else {
    throw new Error('Extension pattern must be an array, string or regexp.');
  }
  re = new RegExp(re.source.replace(/(\\\.)/g, '$1?'));

  // Don't do this before the RegExp test, since the results should
  // be what is expected when regex is passed directly
  ext = ensureDot(ext);
  return re.test(ext);
};