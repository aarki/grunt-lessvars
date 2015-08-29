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
Type: `String|Function`
Default value: `"json"`

Format of the output file. Can be one of `"json"`, `"angular"`, or a custom function. The function signature should be
`format(vars:Object, options:Object)`.

#### options.indent
Type: `Number`
Default value: `0`

Control the identation level of the output for both `"json"` and `"angular"` formatters. Pass `2` to pretty-print the
output file.

#### options.module
Type: `String`
Default value: `"less"`

Only relevant for the `"angular"` formatter. Controls the angular module to which the variable constant is attached.
 
#### options.constant
Type: `String`
Default value: `"vars"`

Only relevant for the `"angular"` formatter. Controls the exported constant name.

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

#### `input.less`
```less
@x: 2;
@y: 3;
```

#### `vars.json`
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

#### `input.less`
```less
@x: 2;
@y: 3;
```

#### `vars.json`
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
developer tools, and we would like to keep it this way.

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
