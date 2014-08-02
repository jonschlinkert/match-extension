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
  describe('when a string pattern is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt('hbs', 'a/b/c.hbs').should.be.true;
      matchExt('hbs', 'c.hbs').should.be.true;
      matchExt('.hbs', 'c.hbs').should.be.true;
      matchExt('md', 'c.md').should.be.true;
      matchExt('.md', '.md').should.be.true;
      matchExt('.md', 'md').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt('hbs', 'a/b/c.md').should.be.false;
      matchExt('hbs', 'b/c.md').should.be.false;
      matchExt('hbs', '.md').should.be.false;
    });
  });

  describe('when a glob pattern is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt('*.md', '.md').should.be.true;
      matchExt('**/*.md', '.md').should.be.true;
      matchExt('{hbs,md}', '.md').should.be.true;
      matchExt('*', '.md').should.be.true;
      matchExt('*', 'md').should.be.true;
      matchExt('.*', 'md').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt('{hbs,md}', 'a/b/c.txt').should.be.false;
    });
  });

  describe('when an array of string patterns is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt(['hbs', 'md'], 'a/b/c.hbs').should.be.true;
      matchExt(['md', 'hbs'], 'hbs').should.be.true;
      matchExt(['md', 'hbs'], 'md').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt(['hbs', 'md'], 'a/b/c.hbs').should.be.true;
    });
  });

  describe('when a regex pattern is passed', function () {
    it('should return `true` when the extension matches.', function () {
      matchExt('hbs', 'a/b/c.hbs').should.be.true;
      matchExt(['hbs', 'md'], 'a/b/c.hbs').should.be.true;
      matchExt('.md', '.md').should.be.true;
      matchExt('.md', 'md').should.be.true;
      matchExt('{hbs,md}', '.md').should.be.true;
      matchExt(['md', 'hbs'], 'hbs').should.be.true;
      matchExt(['md', 'hbs'], 'md').should.be.true;
      matchExt(/\.md/, '.md').should.be.true;
      matchExt('*', '.md').should.be.true;
      matchExt('*', 'md').should.be.true;
      matchExt('.*', 'md').should.be.true;
    });

    it('should return `false` when the extension does not match.', function () {
      matchExt('hbs', 'a/b/c.md').should.be.false;
      matchExt('hbs', '.md').should.be.false;
      matchExt(/\.md/, 'md').should.be.false;
    });
  });
});
