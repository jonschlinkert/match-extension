/*!
 * match-extension <https://github.com/jonschlinkert/match-extension>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var matchExt = require('../');

describe('match extension', function () {
  describe('when a regex pattern is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt(/a/, 'a/b/c.a').should.be.true;
      matchExt(/\.a/, '.a').should.be.true;
      matchExt(/a|b/, '.b').should.be.true;
      matchExt(/a|b/, '.b').should.be.true;
      matchExt(/\.b/, '.b').should.be.true;
      matchExt(/.*/, '.b').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt(/a/, '.b').should.be.false;
      matchExt(/\.b/, 'b').should.be.false;
    });
  });

  describe('when a string pattern is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt('a', 'a/b/c.a').should.be.true;
      matchExt('a', 'c.a').should.be.true;
      matchExt('.a', 'c.a').should.be.true;
      matchExt('b', 'c.b').should.be.true;
      matchExt('.b', '.b').should.be.true;
      matchExt('.b', 'b').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt('.b', 'bb').should.be.false;
      matchExt('.b', '.bb').should.be.false;
      matchExt('a', 'a/b.b').should.be.false;
      matchExt('a', 'b/c.b').should.be.false;
      matchExt('a', '.b').should.be.false;
      matchExt('a', 'b').should.be.false;
    });
  });

  describe('when a glob pattern is passed', function () {
    it('should match on glob stars.', function () {
      matchExt('*', '.b').should.be.true;
      matchExt('*', 'a.b').should.be.true;
      matchExt('*', 'a/b.b').should.be.true;
      matchExt('*', 'b').should.be.true;
    });

    it('should match on leading glob stars.', function () {
      matchExt('*.b', '.b').should.be.true;
      matchExt('*', '.b').should.be.true;
      matchExt('*', 'b').should.be.true;
      matchExt('*.b', 'foo.b').should.be.true;
      matchExt('*.b', 'a/b.b').should.be.true;
    });

    it('should return false when leading glob stars don\'t match.', function () {
      matchExt('*.b', '.c').should.be.false;
      matchExt('*.b', 'foo.c').should.be.false;
      matchExt('*.b', 'a/b.c').should.be.false;
    });

    it('should match on trailing glob stars.', function () {
      matchExt('.*', 'b').should.be.true;
      matchExt('.*', '.a').should.be.true;
      matchExt('.*', 'a.b').should.be.true;
      matchExt('.*', 'a/b.b').should.be.true;
    });

    it('should match on sets.', function () {
      matchExt('{a,b}', '.b').should.be.true;
      matchExt('{a,b,c}', '.a').should.be.true;
      matchExt('{a,b}', 'b').should.be.true;
      matchExt('{a,b}', 'foo.b').should.be.true;
      matchExt('{a,b}', 'a/b.b').should.be.true;
      matchExt('.{a,b}', 'a').should.be.true;
      matchExt('.{a,b}', '.b').should.be.true;
      matchExt('*.{a,b}', '.b').should.be.true;
    });

    it('should return `false` when a set does not match the ext.', function () {
      matchExt('{a,b}', '.c').should.be.false;
      matchExt('{a,b,c}', '.d').should.be.false;
      matchExt('{a,b}', 'c').should.be.false;
      matchExt('{a,b}', 'foo.c').should.be.false;
      matchExt('{a,b}', 'a/b.c').should.be.false;
      matchExt('.{a,b}', 'd').should.be.false;
      matchExt('.{a,b}', '.c').should.be.false;
      matchExt('*.{a,b}', '.c').should.be.false;
    });

    it('should fail when the pattern contains slashes.', function () {
      matchExt('**/*.b', '.b').should.be.false;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt('{a,b}', 'a/b/c.c').should.be.false;
    });
  });

  describe('when an array of string patterns is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt(['a', 'b'], 'a/b/c.a').should.be.true;
      matchExt(['b', 'a'], 'a').should.be.true;
      matchExt(['a', 'b'], '.b').should.be.true;
      matchExt(['a', 'b'], 'a/b/c.a').should.be.true;
      matchExt(['b', 'a'], 'a.a').should.be.true;
      matchExt(['b', 'a'], 'b').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt(['a', 'b'], 'a/b/c.d').should.be.false;
    });
  });

});
