/*!
 * match-extension <https://github.com/jonschlinkert/match-extension>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var minimatch = require('minimatch');


/**
 * ## match(pattern, ext)
 *
 * Return `true` if `ext` matches the given `pattern`.
 *
 * **Example:**
 *
 * ```js
 * matchExt(/\.md/, 'foo.md');
 * //=> true
 * ```
 *
 * @param  {String|Array|RegExp} `pattern` Can be a string, RegExp, or array of string patterns.
 *                                         Glob patterns can be passed as a string.
 * @param  {String} `ext` The extension to match against.
 * @return {Boolean} `true` if the extension matches.
 */

var match = module.exports = function (pattern, ext) {
  if (pattern instanceof RegExp) {
    return pattern.test(ext);
  } else if (Array.isArray(pattern)) {
    pattern = match.normalizeArray(pattern);
  } else if (typeof pattern === 'string') {
    pattern = match.normalizeString(pattern);
  } else {
    throw new Error('Extension pattern must be an array, string or RegExp.');
  }

  ext = match.normalizeExt(ext);
  return minimatch(ext, pattern, {
    matchBase: true
  });
};


/**
 * ## .normalizeExt()
 *
 * Normalize file extension format to always have a
 * leading dot.
 *
 * @param  {String} `ext`
 * @return {String}
 */

match.normalizeExt = function(ext) {
  if (/\\|\/|^\w+\./.test(ext)) {
    ext = path.extname(ext);
  }
  if (ext[0] !== '.') {
    ext = '.' + ext;
  }
  return ext;
};


/**
 * ## .normalizeArray()
 *
 * Convert arrays of strings to minimatch sets.
 *
 * @param  {Array} `pattern`
 * @return {String}
 */

match.normalizeArray = function(pattern) {
  return '.{' + pattern.join(',') + '}';
};


/**
 * ## .normalizeString()
 *
 * Normalize string patterns to ensure that they
 * lead with a dot, and if they end with a dot,
 * add a trailing star.
 *
 * @param  {String} `pattern`
 * @return {String}
 */

match.normalizeString = function(pattern) {
  pattern = '.' + pattern.replace(/^\*|\./g, '');
  if (/\.$/.test(pattern)) {
    pattern = pattern + '*';
  }
  return pattern;
};