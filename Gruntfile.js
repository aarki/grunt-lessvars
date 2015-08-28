/*
 * grunt-lessvars
 * https://github.com/aarki/grunt-lessvars
 *
 * Copyright (c) 2015 Igor Raush
 * Licensed under the MIT license.
 */

'use strict';

require('babel/register');
module.exports = function (grunt) {
    require('load-grunt-config')(grunt, { jitGrunt: { customTasksDir: 'src' } });
};
