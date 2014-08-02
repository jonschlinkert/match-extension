# match-extension [![NPM version](https://badge.fury.io/js/match-extension.png)](http://badge.fury.io/js/match-extension)

> Return `true` if a file extension matches the given string, array of strings, or RegExp pattern.

## Install
Install with [npm](npmjs.org):

```bash
npm i match-extension --save-dev
```

## Usage

```js
var matchExt = require('match-extension');
```

## Examples

### RegExp patterns

```js
matchExt(/a/, 'a/b/c.a');
//=> true
matchExt(/\.a/, '.a');
//=> true

matchExt(/a/, '.b');
//=> false
```

### String patterns

```js
matchExt('a', 'a/b/c.a');
//=> true
matchExt('.a', 'c.a');
//=> true

matchExt('.b', '.bb');
//=> false
matchExt('a', 'a/b.b');
//=> false
```

### Glob patterns

```js
matchExt('*', '.b');
//=> true
matchExt('.*', 'b');
//=> true
matchExt('{a,b}', 'a/b.b');
//=> true
matchExt('*.{a,b}', '.b');
//=> true

matchExt('*.b', '.c');
//=> false
matchExt('*.b', 'foo.c');
//=> false
matchExt('*.b', 'a/b.c');
//=> false
```

### Arrays of string patterns

```js
matchExt(['a', 'b'], 'a/b/c.a');
//=> true
matchExt(['b', 'a'], 'a');
//=> true
matchExt(['a', 'b'], '.b');
//=> true
matchExt(['a', 'b'], 'a/b/c.a');
//=> true
matchExt(['b', 'a'], 'a.a');
//=> true
matchExt(['b', 'a'], 'b');
//=> true

matchExt(['a', 'b'], 'a/b/c.d');
//=> false
```

## API
### match(pattern, ext)

Return `true` if `ext` matches the given `pattern`.

**Example:**

```js
matchExt(/\.md/, 'foo.md');
//=> true
```

* `pattern` {String|Array|RegExp}: Can be a string, RegExp, or array of string patterns. Glob patterns can be passed as a string. 
* `ext` {String}: The extension to match against.  
* `return` {Boolean} `true` if the extension matches. 


### .normalizeExt()

Normalize file extension format to always have a
leading dot.

* `ext` {String}  
* `return` {String} 


### .normalizeArray()

Convert arrays of strings to minimatch sets.

* `pattern` {Array}  
* `return` {String} 


### .normalizeString()

Normalize string patterns to ensure that they
lead with a dot, and if they end with a dot,
add a trailing star.

* `pattern` {String}  
* `return` {String}

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 02, 2014._