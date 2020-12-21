import 'core-js/modules/es.symbol.js';
import 'core-js/modules/es.symbol.description.js';
import 'core-js/modules/es.array.filter.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/es.parse-int.js';
import _sortBy from 'lodash/sortBy';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var groupsSymbol = Symbol("groups");
var sortSymbol = Symbol("sort");
var itemsSymbol = Symbol("items");

var Callback = /*#__PURE__*/function () {
  function Callback() {
    _classCallCheck(this, Callback);

    this[itemsSymbol] = [];
    this[groupsSymbol] = {};
  }

  _createClass(Callback, [{
    key: "configGroup",
    value: function configGroup(name) {
      var defaultOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      var defaultExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
      this.groups[name] = [parseInt(defaultOrder, 10), parseInt(defaultExtra, 10)];
      return this;
    }
  }, {
    key: "getGroupConfig",
    value: function getGroupConfig() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var groups = this.groups;

      if (groups[name]) {
        return groups[name];
      }

      return [1000, 1000];
    }
  }, {
    key: "add",
    value: function add(_ref) {
      var method = _ref.method,
          _ref$group = _ref.group,
          group = _ref$group === void 0 ? "default" : _ref$group,
          extra = _ref.extra,
          id = _ref.id,
          other = _objectWithoutProperties(_ref, ["method", "group", "extra", "id"]);

      var item = _objectSpread2(_objectSpread2({}, other), {}, {
        group: group,
        extra: extra,
        id: id
      });

      var config = this.getGroupConfig(group);

      if (!item.extra) {
        if (item.extra !== 0) {
          item.extra = config[1];
        }
      } else {
        item.extra = parseInt(item.extra);
      }

      item.method = method || function () {};

      this[itemsSymbol].push(item);
      return this;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this[sortSymbol](this[itemsSymbol]);
    }
  }, {
    key: "getItems",
    value: function getItems(filter) {
      return this[itemsSymbol].filter(filter);
    }
  }, {
    key: "getById",
    value: function getById(id, group) {
      var filter = group ? function (item) {
        return item.group === group && item.id === id;
      } : function (item) {
        return item.id === id;
      };
      var arr = this[itemsSymbol].filter(filter);
      return arr[0];
    }
  }, {
    key: "getByGroup",
    value: function getByGroup(name, extra) {
      var filter = typeof extra === "undefined" ? function (item) {
        return item.group === name;
      } : function (item) {
        return item.group === name && item.extra === parseInt(extra, 10);
      };
      var arr = this[itemsSymbol].filter(filter);
      return this[sortSymbol](arr);
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this[itemsSymbol] = [];
      return this;
    }
  }, {
    key: "removeItems",
    value: function removeItems(filter) {
      this[itemsSymbol] = this[itemsSymbol].filter(function (item) {
        return !filter(item);
      });
      return this;
    }
  }, {
    key: "removeByGroup",
    value: function removeByGroup(name, extra) {
      var filter = typeof extra === "undefined" ? function (item) {
        return item.group !== name;
      } : function (item) {
        return !(item.group === name && item.extra === parseInt(extra, 10));
      };
      this[itemsSymbol] = this[itemsSymbol].filter(filter);
      return this;
    }
  }, {
    key: "removeById",
    value: function removeById(id, group) {
      var filter = group ? function (item) {
        return !(item.group === group && item.id === id);
      } : function (item) {
        return item.id !== id;
      };
      this[itemsSymbol] = this[itemsSymbol].filter(filter);
      return this;
    }
  }, {
    key: sortSymbol,
    value: function value() {
      var _this = this;

      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _sortBy(arr, [function (item) {
        var group = item.group;

        var _this$getGroupConfig = _this.getGroupConfig(group),
            _this$getGroupConfig2 = _slicedToArray(_this$getGroupConfig, 1),
            order = _this$getGroupConfig2[0];

        return order;
      }, function (item) {
        return item.extra;
      }]);
    }
  }, {
    key: "groups",
    get: function get() {
      return this[groupsSymbol];
    }
  }]);

  return Callback;
}();

export default Callback;
