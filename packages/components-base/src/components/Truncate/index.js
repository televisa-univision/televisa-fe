import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import stripHtmlSSR from '@univision/fe-utilities/helpers/html/stripHtmlSSR';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  exists,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '../Button';
import Styles from './Truncate.scss';

/**
 * truncate text and display more/less button at cutoff point
 * @type {Object}
 */
class Truncate extends React.Component {
  /**
   * set initial state
   */
  constructor() {
    super();

    this.state = {};
  }

  /**
   * toggle open state
   * @param {event} event object
   */
  toggle = (event) => {
    const {
      props: { onStateChanged },
      state: { open },
    } = this;
    event.stopPropagation();
    this.setState({ open: !open });
    if (onStateChanged && isValidFunction(onStateChanged)) {
      onStateChanged(!open);
    }
  };

  /**
   * render
   * @returns {jsx}
   */
  render() {
    const {
      className,
      closedLabel,
      device,
      ellipsis,
      expandable,
      expandPosition,
      html,
      openLabel,
      text: _text,
      theme,
      trimLength: _length,
      truncateOn,
      variant,
    } = this.props;
    let { open } = this.state;

    let text = _text;
    let trimLength = 0;

    if (exists(html) && truncateOn.indexOf(device) === -1) {
      open = true;
    } else if (exists(text) && truncateOn.indexOf(device) > -1 && text.length > _length) {
      trimLength = open ? text.length : _length;
      const newText = stripHtmlSSR(text, trimLength);
      text = ellipsis && !open ? `${newText}…` : newText.replace('…', '');
    }

    const buttonStyles = {
      /* we want the open/close label text to be themed,
        but not the descripton, which only uses the variant */
      alignSelf: expandPosition === 'left' ? 'flex-start' : 'flex-end',
      color: theme && theme.primary,
    };

    let textBlock = null;
    let TagName = 'p';
    const localClassNames = [className, Styles.content];

    // Return the html just when the state is open
    /* eslint-disable react/no-danger */
    if (html && open) {
      TagName = 'div';
      localClassNames.push(Styles.content_style_html);
      /* eslint-disable react/no-danger */
      textBlock = <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else {
      textBlock = <span dangerouslySetInnerHTML={{ __html: text }} />;
    }

    return (
      <TagName className={classNames(localClassNames)}>
        {textBlock}
        {expandable && !!trimLength && (
          <Button
            className={`${Styles.button} ${Styles[`button_variant_${variant}`]} uvs-font-a-bold`}
            onClick={this.toggle}
            plain
            style={buttonStyles}
          >
            {expandable && (open ? openLabel : closedLabel)}
            <Icon
              name={open ? 'arrowUp' : 'arrowDown'}
              size="small"
              theme={theme}
              variant={variant}
            />
          </Button>
        )}
      </TagName>
    );
  }
}

Truncate.propTypes = {
  className: PropTypes.string,
  closedLabel: PropTypes.string,
  device: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  ellipsis: PropTypes.bool,
  expandable: PropTypes.bool,
  expandPosition: PropTypes.oneOf(['left', 'right']),
  html: PropTypes.string,
  onStateChanged: PropTypes.func,
  openLabel: PropTypes.string,
  text: PropTypes.string,
  theme: PropTypes.object,
  trimLength: PropTypes.number,
  truncateOn: PropTypes.arrayOf(PropTypes.oneOf(['mobile', 'tablet', 'desktop'])),
  variant: PropTypes.oneOf(['dark', 'light']),
};

Truncate.defaultProps = {
  className: '',
  closedLabel: localization.get('readMore'),
  device: 'mobile',
  ellipsis: true,
  expandable: true,
  expandPosition: 'left',
  openLabel: localization.get('readLess'),
  trimLength: 100,
  truncateOn: ['mobile', 'tablet'],
  variant: 'light',
};

export default Truncate;
