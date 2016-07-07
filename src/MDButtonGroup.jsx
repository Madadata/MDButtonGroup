import React, { PropTypes, Component } from 'react';
import styles from './MDButtonGroup.css';
import classNames from 'classnames';
import clone from 'lodash/clone';

class MDButtonGroup extends Component {

  constructor() {
    super();
    this.state = {
      activeButtons: new Set([]),
    }
    this.onRadioClick = this.onRadioClick.bind(this);
    this.onCheckClick = this.onCheckClick.bind(this);
  }

  onRadioClick(e) {
    e.preventDefault();
    const { activeButtons } = this.state;
    let newActiveButtons;
    if (activeButtons.size === 0) {
      newActiveButtons = new Set([e.target.innerHTML]);
    } else {
      newActiveButtons = new Set([]);
    }
    this.setState({
      activeButtons: newActiveButtons
    });
  }

  onCheckClick(e) {
    e.preventDefault();
    const { activeButtons } = this.state;
    const { innerHTML } = e.target;
    if (activeButtons.has(innerHTML)){
      activeButtons.delete(innerHTML);
    } else {
      activeButtons.add(innerHTML)
    }
    this.forceUpdate();
  }

  getButtonGroup() {
    const { buttons, type } = this.props;
    const { activeButtons } = this.state;
    if (type === 'radio') {
      return buttons.map((button, bi) => {
        const { displayName, value } = button;
        let disabled = false;
        if (activeButtons.size !== 0) {
          disabled = activeButtons.has(displayName) ? false : true;
        }
        return (
          <button
            value={value}
            key={bi}
            className={styles.button}
            onClick={this.onRadioClick}
            disabled={disabled}
          >
            {displayName}

          </button>
        );
      })
    } else if (type === 'checkbox') {
      return buttons.map((button, bi) => {
        const { displayName, value }  = button;
        let clicked = false;
        let class_Names;
        if (activeButtons.has(displayName)) {
          console.log("haha");
          class_Names = classNames(styles.clicked);
          clicked = true;
        } else {
          console.log("v");
          class_Names = classNames(styles.button);
        }
        return (
          <button
            value={value}
            key={bi}
            className={class_Names}
            onClick={this.onCheckClick}
          >
            {displayName}
          </button>
        )
      })
    }
  }

  render() {
    const buttonsJSX = this.getButtonGroup();
    return (
      <div className={styles.container}>
        {buttonsJSX}
      </div>
    );
  }

}

MDButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    displayName: PropTypes.string,
    value: PropTypes.string,
  })),
  type: PropTypes.oneOf(['radio', 'checkbox']),
}


export default MDButtonGroup;
