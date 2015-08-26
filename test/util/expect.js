'use strict';

var chai = require('chai');

// setup Chai and plugins
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// export the "expect" function
module.exports = chai.expect;
