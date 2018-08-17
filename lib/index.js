(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('immer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'immer'], factory) :
  (factory((global.sudux = {}),global.React,global.produce));
}(this, (function (exports,React,produce) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  produce = produce && produce.hasOwnProperty('default') ? produce['default'] : produce;

  var asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function createProvider(reducer, actions, context) {
    return function (_React$PureComponent) {
      inherits(_class, _React$PureComponent);

      function _class(props) {
        var _this2 = this;

        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        var initState = reducer.initState,
            reduce = reducer.reduce;

        _this.state = _extends({}, initState);

        var dispatch = function () {
          var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(actionModel) {
            var newState;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    newState = produce(_this.state, function (draft) {
                      reduce(draft, actionModel);
                    }, function (patches, inversePatches) {
                      //console.log("patches:",patches);
                      //console.log("inversePatches:",inversePatches);
                    });

                    _this.setState(newState);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function dispatch(_x) {
            return _ref.apply(this, arguments);
          };
        }();

        var getState = function getState() {
          return _this.state;
        };

        //bind action
        _this.actions = {};
        Object.entries(actions).forEach(function (_ref2) {
          var _ref3 = slicedToArray(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          _this.actions[k] = v(dispatch, getState);
        });
        return _this;
      }

      createClass(_class, [{
        key: "render",
        value: function render() {
          var Provider = context.Provider;

          var store = _extends({}, this.state, this.actions);
          return React.createElement(
            Provider,
            { value: store },
            this.props.children
          );
        }
      }]);
      return _class;
    }(React.PureComponent);
  }

  //消费单个Provider
  var map = function map(context) {
    var mapState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function (Component) {
      return function (_React$Component) {
        inherits(_class2, _React$Component);

        function _class2() {
          classCallCheck(this, _class2);
          return possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
        }

        createClass(_class2, [{
          key: "render",
          value: function render() {
            var Consumer = context.Consumer;

            return React.createElement(
              Consumer,
              null,
              function (store) {
                var props = mapState.reduce(function (o, e) {
                  o[e] = store[e];
                  return o;
                }, {});
                return React.createElement(Component, props);
              }
            );
          }
        }]);
        return _class2;
      }(React.Component);
    };
  };

  //同时消费多个Provider
  var multiMap = function multiMap() {
    var multiCtx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (Component) {
      return function (_React$Component2) {
        inherits(_class3, _React$Component2);

        function _class3() {
          classCallCheck(this, _class3);
          return possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
        }

        createClass(_class3, [{
          key: "render",
          value: function render() {
            var len = multiCtx.length,
                index = 0,
                allProps = {};
            return function compose(item) {
              var mapState = item.mapState,
                  Consumer = item.context.Consumer;

              if (index < len - 1) {
                index++;
                return React.createElement(
                  Consumer,
                  null,
                  function (store) {
                    mapState.forEach(function (e) {
                      return allProps[e] = store[e];
                    });
                    return compose(multiCtx[index]);
                  }
                );
              } else if (index === len - 1) {
                return React.createElement(
                  Consumer,
                  null,
                  function (store) {
                    mapState.forEach(function (e) {
                      return allProps[e] = store[e];
                    });
                    return React.createElement(Component, allProps);
                  }
                );
              }
            }(multiCtx[index]);
          }
        }]);
        return _class3;
      }(React.Component);
    };
  };

  exports.createProvider = createProvider;
  exports.map = map;
  exports.multiMap = multiMap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
