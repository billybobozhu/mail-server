'use strict';

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure('./dist/config/log4js.json'); /*
                                                          * configuration for log4js
                                                          */


var logger = _log4js2.default.getLogger();
module.exports = logger;