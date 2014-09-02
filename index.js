/*!
 * match-extension <https://github.com/jonschlinkert/match-extension>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var minimatch = require('minimatch');


/**
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
 * @api public
 */

function match(pattern, ext) {
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
}


/**
 * Normalize file extension format to always have a
 * leading dot.
 *
 * @param  {String} `ext` The extension to normalize.
 * @return {String} Extension _with_ a leading dot.
 * @api public
 */

match.normalizeExt = function(ext) {
  if (/[\\\/^\w+]\./.test(ext)) {
    ext = path.extname(ext);
  }
  if (ext[0] !== '.') {
    ext = '.' + ext;
  }
  return ext;
};


/**
 * Strip the leading dot from an extension.
 *
 * @param  {String} `ext` The extension to normalize.
 * @return {String} Extenion _without_ a leading dot.
 * @api public
 */

match.stripDot = function(ext) {
  if (ext[0] === '.') {
    ext = ext.slice(1);
  }
  return ext;
};


/**
 * Normalize string patterns to ensure that they
 * lead with a dot, and if they end with a dot,
 * add a trailing star.
 *
 * @param  {String} `pattern` The string pattern to normalize.
 * @return {String} Normalized string.
 * @api public
 */

match.normalizeString = function(pattern) {
  pattern = '.' + pattern.replace(/^\*|\./g, '');
  if (/\.$/.test(pattern)) {
    pattern = pattern + '*';
  }
  return pattern;
};


/**
 * Convert arrays of strings to minimatch sets.
 *
 * @param  {Array} `pattern` Array of patterns to match.
 * @return {String} A string to pass to minimatch.
 * @api public
 */

match.normalizeArray = function(ext) {
  ext = ext.map(match.stripDot);
  if (ext.length > 1) {
    ext = '{' + ext.join(',') + '}';
  }
  return '.' + ext;
};


/**
 * Expose `match`
 */

module.exports = match;