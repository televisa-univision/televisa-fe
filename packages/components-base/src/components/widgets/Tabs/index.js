import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getUniqKey, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Button from '../../Button';
import Styles from './Tabs.scss';

/**
 * Tabs component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
export default class Tabs extends React.Component {
  /**
   * set initial state
   * @param {Object} props the props
   */
  constructor(props) {
    super(props);
    const { startTab, children } = props;
    const activeTab = (Array.isArray(children) && startTab > children.length) ? 0 : startTab;
    this.state = {
      activeTab,
    };
  }

  /**
   * Updates active tab
   * @param {integer} index tab clicked
   * @returns {Function}
   */
  onClickTabItem = (index) => {
    return () => {
      const { onTabChange } = this.props;
      if (isValidFunction(onTabChange)) {
        onTabChange(index);
      }

      this.setState({ activeTab: index });
    };
  }

  /**
   * render method
   * @returns {JSX}
   */
  render() {
    const { activeTab } = this.state;
    const {
      children,
      className,
      hideFirstTab,
      hasGlobalWidget,
    } = this.props;

    return (
      <div className={Styles.tabs}>
        <ul
          className={classnames(
            Styles.tabList,
            { [Styles.hasGlobalWidget]: hasGlobalWidget },
          )}
        >
          {children.map((child, index) => {
            const isActive = activeTab === index;
            const label = isActive ? <h2>{ child.props.label }</h2> : child.props.label;
            return (
              <li
                key={getUniqKey(index)}
                className={classnames(
                  className,
                  Styles.tab,
                  { [Styles.activeTab]: isActive },
                  { [Styles.hideTab]: hideFirstTab && !index }
                )}
              >
                <Button onClick={this.onClickTabItem(index)}>
                  {label}
                </Button>
              </li>
            );
          })}
        </ul>
        <div className={Styles.tabContent}>
          {children.map((child, index) => (
            activeTab === index ? child.props.children : null
          ))}
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Array} children children content
 * @property {Function} onTabChange event to trigger when switching tabs
 * @property {String} className class name for styling
 * @property {Boolean} hasGlobalWidget indicates if has global widgets to modify the margin-top
 */
Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
  onTabChange: PropTypes.func,
  startTab: PropTypes.number,
  hideFirstTab: PropTypes.bool,
  hasGlobalWidget: PropTypes.bool,
};

Tabs.defaultProps = {
  startTab: 0,
  hasGlobalWidget: false,
};
