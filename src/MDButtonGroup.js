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
    const { activeButtons } = this.state;   //destruction
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
    const { innerHTML} = e.target; // e.target： object
    if (activeButtons.has(innerHTML)){
      activeButtons.delete(innerHTML);
    }else{
      activeButtons.add(innerHTML)
    }
    this.forceUpdate();
  }

  getButtonGroup() {
    const { buttons, type } = this.props;
    const { activeButtons } = this.state;
    if (type === 'radio') {
      return buttons.map((button, bi) => {
        const { displayName, value } = button; //???
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
      console.log('checkbox');
      return buttons.map((button, bi) => {
        const { displayName, value }  = button;
        let clicked = false;
        if (activeButtons.has(displayName)){
          clicked = true;
          console.log('has displayName');
          return(
            <button
              value={value}
              key={bi}
              className={classNames(styles.clicked)}
              onClick={this.onCheckClick}
            >
              {displayName}
            </button>
          );
        }else{
          return(
            <button
              value={value}
              key={bi}
              className={styles.button}
              onClick={this.onCheckClick}
            >
              {displayName}
            </button>

          )
        }
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

MDButtonGroup.defaultProps = {
  buttons: [
    { displayName: 'button1', value: '1' },
    { displayName: 'button2', value: '2' },
    { displayName: 'button3', value: '3' },
    { displayName: 'button4', value: '4' },
  ],
  type: 'checkbox',
}

export default MDButtonGroup;
