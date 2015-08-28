'use strict';

import chai from 'chai';

// setup Chai and plugins
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

// export the "expect" function
export default chai.expect;
