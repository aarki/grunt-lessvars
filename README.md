# grunt-lessvars

> Parse a set of LESS files, extract variables, and write to a JavaScript file.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a
[Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lessvars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lessvars');
```

## The "lessvars" task

### Overview
In your project's Gruntfile, add a section named `lessvars` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    lessvars: {
        options: {
            // Task-specific options go here.
        },
        target: {
            // Target-specific file lists and/or options go here
        }
    }
});
```

### Options

#### options.format
Type: `String|Function(vars:Object, options:Object):String`
Default value: `"json"`

How to format the output. Can be one of `"json"`, `"angular"`, or a custom formatter function. The function is given
an object containing the variables, and the processed task options.

#### options.indent
Type: `Number`
Default value: `0`

The identation level of the output for the `"json"` and `"angular"` formatters. Pass `2` or `4` for a more readable
output file.

#### options.module
Type: `String`
Default value: `"less"`

The module name used by the `"angular"` formatter. This is the module to which the exported variables are attached.
 
#### options.constant
Type: `String`
Default value: `"vars"`

The name of the exported constant used by the `"angular"` formatter.

#### options.units
Type: `Boolean|Array<String>`
Default value: `true`

A boolean value indicating whether to drop or keep units in dimensions, or an array containing units to preserve.

### Usage Examples

#### Default Options
```js
grunt.initConfig({
    lessvars: {
        myTarget: {
            files {
                'vars.json': 'input.less'
            }
        }
    }
});
```

Then, given the following `input.less`,
```less
@x: 2;
@y: 3;
```
the output `vars.json` will be
```json
{"x":2,"y":3}
```

#### Custom Options
```js
grunt.initConfig({
    lessvars: {
        myTarget: {
            options: {
                format: 'angular',
                module: 'myModule',
                constant: 'myLessVars',
                indent: 2
            },
            files: {
                'vars.js': 'input.less'
            }
        }
    }
})
```

Then, given the following `input.less`,
```less
@x: 2;
@y: 3;
```
the output `vars.js` will be
```js
angular.module("myModule").constant("myLessVars", {
  x: 2,
  y: 3
});
```

## Contributing

All source code, tests, and meta-code (build tools and configuration) are written in EcmaScript 6 and transpiled using
[Babel](http://babeljs.io/). The command `grunt babel` will transpile the `src` directory into the `tasks` directory
which allows this module to be dropped in as a Grunt plugin. The Babel runtime/polyfill is **not** used outside of
developer tools, and I would like to keep it this way.

### Code style `grunt style`
Code style is enforced using [JSCS](http://jscs.info/). The style guide is located in `.jscsrc`.

### Lint `grunt lint`
Linting is performed using [JSHint](http://jshint.com/), configured in `.jshintrc`.

### Testing `grunt test`
Integration tests are configured in `grunt/lessvars.js` and `test/lessvars.js`. Please look at existing examples of how
to add integration tests.

All of the above above can be run with the `grunt` command (no arguments).

## Release History
_(Nothing yet)_
