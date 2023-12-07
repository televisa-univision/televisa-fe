import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getKey, getScrollTop } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './StickyWrapper.scss';

const MAX_MENU_HEIGHT = 345;

/**
 * Wrap children to be sticky on the page
 * @param {*} children the children be rendered
 * @returns {jsx}
 */
class StickyWrapper extends React.Component {
  /**
   * Set the init state and bind methods
   * @param {Object} props - The react props for this component
   */
  constructor(props) {
    super(props);

    this.onScrollChangeHandler = this.onScrollChangeHandler.bind(this);
    this.childrenRefHandler = this.childrenRefHandler.bind(this);
    this.state = {
      apply: false,
    };
  }

  /**
   * Add scroll event listener
   */
  componentDidMount() {
    window.addEventListener('scroll', this.onScrollChangeHandler);
  }

  /**
   * Remove scroll event listener
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollChangeHandler);
  }

  /**
   * Validate the rules to show/hide the sticky header
   */
  onScrollChangeHandler() {
    const { apply } = this.state;
    const { shouldApply, onChange } = this.props;
    const scrollTop = getScrollTop();
    let result;

    if (shouldApply) {
      result = shouldApply(scrollTop);
    } else if (this.childrenRef) {
      const bottom = getKey(this.childrenRef.getBoundingClientRect(), 'bottom');
      const offsetHeight = bottom > 0 && !apply ? bottom + scrollTop : MAX_MENU_HEIGHT;

      if (scrollTop <= offsetHeight) {
        result = false;
      } else if (scrollTop > offsetHeight && !apply) {
        result = true;
      }
    }

    if (typeof result !== 'undefined' && result !== apply) {
      this.setState({ apply: result }, () => {
        if (onChange) {
          onChange(result);
        }
      });
    }
  }

  /**
   * Set the sticky node reference
   * @param {Object} node - the sticky node element
   */
  childrenRefHandler(node) {
    this.childrenRef = node;
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const { apply } = this.state;
    const { children, className } = this.props;

    return (
      <div
        className={classnames(Styles.animated, {
          [className]: apply,
          [Styles.stickyWrapper]: apply,
          [Styles.fadeInDown]: apply,
        })}
        ref={this.childrenRefHandler}
      >
        {children}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {node} children react children
 * @property {string} className additional className
 * @property {function} shouldApply callback function for custom logic
 * @property {function} onChange callback when apply or not the sticky
 */
StickyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shouldApply: PropTypes.func,
  onChange: PropTypes.func,
};

export default StickyWrapper;
