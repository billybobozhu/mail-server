'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _log4js = require('./log4js.config');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoConfig = function () {
    function MongoConfig() {
        _classCallCheck(this, MongoConfig);

        this.mongoose = _mongoose2.default;
        this.dotenv = _dotenv2.default;
        this.dotenv.config({ path: '.env.dev' });
    }

    _createClass(MongoConfig, [{
        key: 'connect',
        value: function connect() {
            //Set up default mongoose connection
            this.mongoose.Promise = global.Promise;
            this.mongoose.connect(process.env.MONGODB_URI, {
                useMongoClient: true
            });
            //Bind connection to error event (to get notification of connection errors)
            this.mongoose.connection.on('error', function (err) {
                if (err) throw err;
                _log4js2.default.error("Something went wrong with MongoDB connection: ", err);
                process.exit();
            });
            this.mongoose.connection.once('open', function () {
                _log4js2.default.info("Connection established successfully for MongoDB");
            });
        }
    }]);

    return MongoConfig;
}();

exports.default = MongoConfig;