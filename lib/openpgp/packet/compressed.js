// Generated by IcedCoffeeScript 1.6.3-g
(function() {
  var C, Compressed, CompressionParser, Packet, asymmetric, fake_zip_inflate, fix_zip_deflate, iced, zlib, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script/lib/coffee-script/iced').runtime;
  __iced_k = __iced_k_noop = function() {};

  Packet = require('./base').Packet;

  C = require('../../const').openpgp;

  asymmetric = require('../../asymmetric');

  zlib = require('zlib');

  fake_zip_inflate = function(buf, cb) {
    var err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    buf = Buffer.concat([new Buffer([0x78, 0x9c]), buf]);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "src/openpgp/packet/compressed.iced",
        funcname: "fake_zip_inflate"
      });
      zlib.inflate(buf, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            err = arguments[0];
            return ret = arguments[1];
          };
        })(),
        lineno: 10
      }));
      __iced_deferrals._fulfill();
    })(function() {
      return cb(err, ret);
    });
  };

  fix_zip_deflate = function(buf, cb) {
    var err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "src/openpgp/packet/compressed.iced",
        funcname: "fix_zip_deflate"
      });
      zlib.deflate(buf, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            err = arguments[0];
            return ret = arguments[1];
          };
        })(),
        lineno: 14
      }));
      __iced_deferrals._fulfill();
    })(function() {
      return cb(err, ret);
    });
  };

  Compressed = (function(_super) {
    __extends(Compressed, _super);

    function Compressed(_arg) {
      this.algo = _arg.algo, this.compressed = _arg.compressed, this.inflated = _arg.inflated;
    }

    Compressed.parse = function(slice) {
      return (new CompressionParser(slice)).parse();
    };

    Compressed.prototype.inflate = function(cb) {
      var err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = ret = null;
      (function(__iced_k) {
        switch (_this.algo) {
          case C.compression.none:
            return __iced_k(ret = _this.compressed);
          case C.compression.zlib:
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/openpgp/packet/compressed.iced",
                funcname: "Compressed.inflate"
              });
              zlib.inflate(_this.compressed, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return ret = arguments[1];
                  };
                })(),
                lineno: 37
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
            break;
          case C.compression.zip:
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/openpgp/packet/compressed.iced",
                funcname: "Compressed.inflate"
              });
              fake_zip_inflate(_this.compressed, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return ret = arguments[1];
                  };
                })(),
                lineno: 39
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
            break;
          default:
            return __iced_k(err = new Error("no known inflation -- algo: " + _this.algo));
        }
      })(function() {
        return cb(err, ret);
      });
    };

    Compressed.prototype.deflate = function(cb) {
      var err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = ret = null;
      (function(__iced_k) {
        switch (_this.algo) {
          case C.compression.none:
            return __iced_k(ret = _this.inflated);
          case C.compression.zlib:
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/openpgp/packet/compressed.iced",
                funcname: "Compressed.deflate"
              });
              zlib.deflate(_this.inflated, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return ret = arguments[1];
                  };
                })(),
                lineno: 51
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
            break;
          case C.compression.zip:
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "src/openpgp/packet/compressed.iced",
                funcname: "Compressed.deflate"
              });
              fake_zip_deflate(_this.inflated, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return ret = arguments[1];
                  };
                })(),
                lineno: 53
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
            break;
          default:
            return __iced_k(err = new Error("no known deflation -- algo: " + _this.algo));
        }
      })(function() {
        return cb(err, ret);
      });
    };

    Compressed.prototype.write_unframed = function(cb) {
      var bufs, err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = ret = null;
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/openpgp/packet/compressed.iced",
          funcname: "Compressed.write_unframed"
        });
        _this.deflate(__iced_deferrals.defer({
          assign_fn: (function(__slot_1) {
            return function() {
              err = arguments[0];
              return __slot_1.compressed = arguments[1];
            };
          })(_this),
          lineno: 62
        }));
        __iced_deferrals._fulfill();
      })(function() {
        if (err == null) {
          bufs = [uint_to_buffer(8, _this.algo), _this.compressed];
          ret = Buffer.concat(bufs);
        }
        return cb(err, ret);
      });
    };

    Compressed.prototype.write = function(cb) {
      var err, ret, unframed, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = ret = null;
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "src/openpgp/packet/compressed.iced",
          funcname: "Compressed.write"
        });
        _this.write_unframed(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              return unframed = arguments[1];
            };
          })(),
          lineno: 72
        }));
        __iced_deferrals._fulfill();
      })(function() {
        if (err == null) {
          ret = _this.frame_packet(C.packet_tags.compressed, unframed);
        }
        return cb(err, ret);
      });
    };

    return Compressed;

  })(Packet);

  CompressionParser = (function() {
    function CompressionParser(slice) {
      this.slice = slice;
    }

    CompressionParser.prototype.parse = function() {
      var algo, compressed;
      algo = this.slice.read_uint8();
      compressed = this.slice.consume_rest_to_buffer();
      return new Compressed({
        algo: algo,
        compressed: compressed
      });
    };

    return CompressionParser;

  })();

  exports.Compressed = Compressed;

}).call(this);