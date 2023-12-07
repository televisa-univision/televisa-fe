import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../Link';
import Button from '../Button';
import IconWrapper from '../IconWrapper';

import Styles from './Clickable.scss';

/**
 * A styled clickable element - either a link or button
 */
class Clickable extends React.Component {
  /**
   * get inline style for appearance from theme
   * @returns {Object} the style object
   */
  getStyle() {
    const { theme, appearance } = this.props;
    const style = {};
    if (!theme) return style;

    switch (appearance) {
      case 'primary': {
        style.background = theme.primary;
        style.color = 'white';
        break;
      }
      case 'plain': {
        style.color = theme.primary;
        break;
      }
      default:
    }

    return style;
  }

  /**
   * add icon to element children if exists
   * and reverse order if necessary
   * @returns {Array} The button's children
   */
  appendIcon() {
    const {
      icon, iconSize, reverse, label, appearance, theme, valign,
    } = this.props;

    const buttonChildren = [<span key="clickableLabe">{label}</span>];
    let iconFill;
    if (theme && ['plain', 'secondary'].indexOf(appearance) > -1) {
      iconFill = theme.primary;
    }

    if (icon) {
      const iconEl = valign ? (
        <div
          className={classnames(Styles.valign, Styles[`valign-${valign}`])}
          key={`${label}-icon`}
        >
          <Icon name={icon} size={iconSize} key={icon} fill={iconFill} />
        </div>
      ) : (
        <Icon name={icon} size={iconSize} key={icon} fill={iconFill} />
      );
      buttonChildren.push(iconEl);
      if (reverse || valign === 'top') buttonChildren.reverse();
    }

    return buttonChildren;
  }

  /**
   * render
   * @returns {JSX} the element to be clicked
   */
  render() {
    const {
      type,
      appearance,
      href,
      className,
      target,
      disabled,
      onClick,
      size,
      align,
      reverse,
      round,
      authRequired,
      variant,
      iconSize,
      ...otherProps
    } = this.props;

    let ClickableElement = Button;
    if (type === 'link') ClickableElement = Link;

    return (
      <ClickableElement
        {...otherProps}
        className={classnames(
          'uvs-font-c-bold',
          Styles[`align-${align}`],
          Styles[size],
          Styles.clickable,
          Styles[appearance],
          Styles[variant],
          { [Styles.reverse]: reverse },
          { [Styles.round]: round },
          className,
        )}
        href={href}
        style={this.getStyle()}
        target={target}
        onClick={onClick}
        disabled={disabled}
      >
        {this.appendIcon()}
        {authRequired && (
          <IconWrapper iconName="key" iconSize={iconSize} className={Styles.icon} />
        )}
      </ClickableElement>
    );
  }
}

/**
 * propTypes
 * @property {boolean} authRequired Boolean value to show auth icon
 * @property {string} appearance specific features:
 * plain: without font Roboto Condensed
 * primary and secondary: especific styles
 * auth: clickable type authentication (Longform)
 */

Clickable.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.oneOf(['link', 'button']).isRequired,
  appearance: PropTypes.oneOf(['plain', 'primary', 'secondary', 'auth']),
  authRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'bars']),
  reverse: PropTypes.bool,
  round: PropTypes.bool,
  theme: PropTypes.object,
  className: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valign: PropTypes.oneOf(['bottom', 'top']),
  variant: PropTypes.oneOf(['light', 'dark']),
};

Clickable.defaultProps = {
  size: 'medium',
  appearance: 'plain',
  iconSize: 'xsmall',
  round: false,
  authRequired: false,
  variant: 'light',
};

export default Clickable;
