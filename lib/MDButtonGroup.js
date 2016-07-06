'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MDButtonGroup = require('./MDButtonGroup.css');

var _MDButtonGroup2 = _interopRequireDefault(_MDButtonGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MDButtonGroup = function (_Component) {
  _inherits(MDButtonGroup, _Component);

  function MDButtonGroup() {
    _classCallCheck(this, MDButtonGroup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MDButtonGroup).call(this));

    _this.state = {
      activeButtons: new Set([])
    };
    _this.onRadioClick = _this.onRadioClick.bind(_this);
    _this.onCheckClick = _this.onCheckClick.bind(_this);
    return _this;
  }

  _createClass(MDButtonGroup, [{
    key: 'onRadioClick',
    value: function onRadioClick(e) {
      e.preventDefault();
      var activeButtons = this.state.activeButtons; //destruction

      var newActiveButtons = void 0;
      if (activeButtons.size === 0) {
        newActiveButtons = new Set([e.target.innerHTML]);
      } else {
        newActiveButtons = new Set([]);
      }
      this.setState({
        activeButtons: newActiveButtons
      });
    }
  }, {
    key: 'onCheckClick',
    value: function onCheckClick(e) {
      e.preventDefault();
      var activeButtons = this.state.activeButtons;
      var innerHTML = e.target.innerHTML; // e.target： object

      if (activeButtons.has(innerHTML)) {
        activeButtons.delete(innerHTML);
      } else {
        activeButtons.add(innerHTML);
      }
      this.forceUpdate();
    }
  }, {
    key: 'getButtonGroup',
    value: function getButtonGroup() {
      var _this2 = this;

      var _props = this.props;
      var buttons = _props.buttons;
      var type = _props.type;
      var activeButtons = this.state.activeButtons;

      if (type === 'radio') {
        return buttons.map(function (button, bi) {
          var displayName = button.displayName;
          var value = button.value; //???

          var disabled = false;
          if (activeButtons.size !== 0) {
            disabled = activeButtons.has(displayName) ? false : true;
          }
          return _react2.default.createElement(
            'button',
            {
              value: value,
              key: bi,
              className: _MDButtonGroup2.default.button,
              onClick: _this2.onRadioClick,
              disabled: disabled
            },
            displayName
          );
        });
      } else if (type === 'checkbox') {
        console.log('checkbox');
        return buttons.map(function (button, bi) {
          var displayName = button.displayName;
          var value = button.value;

          var clicked = false;
          if (activeButtons.has(displayName)) {
            clicked = true;
            console.log('has displayName');
            return _react2.default.createElement(
              'button',
              {
                value: value,
                key: bi,
                className: (0, _classnames2.default)(_MDButtonGroup2.default.clicked),
                onClick: _this2.onCheckClick
              },
              displayName
            );
          } else {
            return _react2.default.createElement(
              'button',
              {
                value: value,
                key: bi,
                className: _MDButtonGroup2.default.button,
                onClick: _this2.onCheckClick
              },
              displayName
            );
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonsJSX = this.getButtonGroup();
      return _react2.default.createElement(
        'div',
        { className: _MDButtonGroup2.default.container },
        buttonsJSX
      );
    }
  }]);

  return MDButtonGroup;
}(_react.Component);

MDButtonGroup.propTypes = {
  buttons: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    displayName: _react.PropTypes.string,
    value: _react.PropTypes.string
  })),
  type: _react.PropTypes.oneOf(['radio', 'checkbox'])
};

MDButtonGroup.defaultProps = {
  buttons: [{ displayName: 'button1', value: '1' }, { displayName: 'button2', value: '2' }, { displayName: 'button3', value: '3' }, { displayName: 'button4', value: '4' }],
  type: 'checkbox'
};

exports.default = MDButtonGroup;