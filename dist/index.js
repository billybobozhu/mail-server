'use strict';

var _doctor = require('./doctor.api');

var _doctor2 = _interopRequireDefault(_doctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _doctor2.default();
server.run();