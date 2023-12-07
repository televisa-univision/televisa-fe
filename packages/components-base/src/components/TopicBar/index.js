import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { isValidFunction, toAbsoluteUrl } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import features from '@univision/fe-commons/dist/config/features';
import { SIROCCO } from '@univision/fe-utilities/styled/constants';

import config from '../../config';

import Link from '../Link';
import Title from '../Title';

import Styles from './TopicBar.scss';

/**
 * Renders separator for topic bar
 * @param {string} type top, bottom, left
 * @param {string} options the options for the separator element
 * @param {string} options.separation the number of pixels for the separation space
 * @param {string} options.size the width size of the separator
 * @param {Object} options.theme given theme
 * @returns {JSX}
 */
const renderSeparator = (type, { separation, size, theme }) => (
  <div
    className={classnames(
      Styles.separator,
      Styles[`separator-${size}`],
      Styles[`separator-${type}`]
    )}
    style={{
      borderColor: features.deportes.isWorldCupMVP() ? SIROCCO : theme.primary,
      borderSize: features.deportes.isWorldCupMVP() ? 2 : 1,
      marginTop: separation,
    }}
  />
);

/**
 * Renders an optional call to action on the right side of a title link
 * @param {Object} cta the cta config
 * @param {string} cta.href the link for the cta
 * @param {string} cta.onClick the cta click handler
 * @param {string} cta.site the site of the link, defaults to univision
 * @param {string} cta.target defaults to _self
 * @param {string} cta.text the actual text to show
 * @returns {JSX}
 */
const renderCta = cta => (
  <Link
    className={classnames({
      'uvs-font-c-bold': !features.deportes.isWorldCupMVP(),
      'uvs-font-a-bold': features.deportes.isWorldCupMVP(),
    }, Styles.cta)}
    href={toAbsoluteUrl(cta.href, getSites(Store)[cta.site])}
    onClick={cta.onClick}
    target={cta.target}
    checkUserLocation
  >
    <span>{cta.text}</span>
    <Icon name="arrowRight" size="small" />
  </Link>
);

/**
 * Gets either a link or plain text for the header
 * @param {string} title the header text
 * @param {string} options the options for the title element
 * @param {function} options.onLinkClick the link on click handler
 * @param {Object} options.titleLink the link data
 * @returns {JSX}
 */
const getTitleElement = (title, { onClickLink, titleLink }) => {
  return titleLink ? (
    <Link
      checkUserLocation
      className={Styles.titleLink}
      href={toAbsoluteUrl(titleLink.href, getSites(Store)[titleLink.site])}
      target={titleLink.target}
      site={titleLink.site}
      onClick={onClickLink}
    >
      {title}
    </Link>
  ) : (
    <span className={Styles.titleLink}>{title}</span>
  );
};

/**
 * Gets either a link or plain text for the header
 * @param {string} image the header image
 * @param {string} title the header text
 * @param {string} options the options for the title element
 * @param {function} options.onLinkClick the link on click handler
 * @param {Object} options.titleLink the link data
 * @returns {JSX}
 */
const getImageElement = (image, title, { onClickImageLink, imageLink }) => {
  return imageLink ? (
    <Link
      className={Styles.titleLink}
      href={toAbsoluteUrl(imageLink.href, getSites(Store)[imageLink.site])}
      target={imageLink.target}
      onClick={onClickImageLink}
    >
      <img src={image} alt={title} />
    </Link>
  ) : (
    <img src={image} alt={title} />
  );
};

/**
 * Renders the main text header for the topic bar
 * @param {string} title the header main text
 * @param {string} options the header options
 * @param {function} options.onClickLink the link on click handler
 * @param {string} options.separatorType top, bottom, left
 * @param {Object} options.titleLink the link data
 * @param {Object} options.cta the cta config
 * @param {string} options.cta.href the link for the cta
 * @param {string} options.cta.onClick the cta on click handler
 * @returns {JSX}
 */
const renderContent = (title, {
  onClickLink, separatorType, titleLink, cta, image, imageLink,
}) => (
  <div
    className={classnames('uvs-font-a-bold', Styles.contentContainer, {
      [Styles['content-stacked']]: separatorType !== 'left',
    })}
  >
    {image ? getImageElement(image, title, { cta, imageLink, onClickLink })
      : getTitleElement(title, { cta, titleLink, onClickLink })}
    {cta
      && renderCta({
        ...cta,
        href: cta.href || (titleLink && titleLink.href),
        onClick: cta.onClick || onClickLink,
        site: cta.site || (titleLink && titleLink.site),
        target: cta.target || (titleLink && titleLink.target),
      })}
  </div>
);

/**
 * Basic building block for topic bar component
 * used e.g. on {@link PromoItem}
 * @param {Object} props React Props for this component
 * @returns {jsx}
 * @constructor
 */
const TopicBar = ({
  align,
  className,
  cta,
  onClick,
  separator,
  separatorSpace,
  settings: {
    title, titleLink, image, imageLink,
  },
  size,
  theme,
  titleTagElement,
  variant,
  widgetContext,
}) => {
  if (title) {
    /**
     * Track clicks on the title link.
     * @param {Object} event the click event
     */
    const onClickLink = (event) => {
      WidgetTracker.track(WidgetTracker.events.click, { widgetContext, target: 'title' });

      if (isValidFunction(onClick)) onClick(event);
    };
    const classNames = classnames(
      Styles.wrapper,
      Styles[`align-${align}`],
      {
        [Styles['wrapper-inline']]: separator === 'left',
        [Styles['wrapper-reverse']]: separator === 'bottom',
        [Styles.dark]: variant === 'dark',
      },
      className
    );

    return (
      <Title element={titleTagElement} className={classNames}>
        {separator
          && renderSeparator(separator, {
            separation: separatorSpace,
            size,
            theme,
          })}
        {renderContent(title, {
          cta,
          separatorType: separator,
          titleLink,
          onClickLink,
          image,
          imageLink,
        })}
      </Title>
    );
  }

  return null;
};

/**
 * propTypes
 * @property {string} align Alignment of divider bar (left/center)
 * @property {string} className Text to apply additional styles (color, theming...)
 * @property {string} separator Position of divider bar (top/bottom)
 * @property {string} separatorClassName class name targeting the separator element
 * @property {string} settings.title The title to be displayed
 * @property {string} settings.titleLink The link to location of the title
 * @property {string} size the specific width size of the topic bar
 * @property {Object} theme the given theme for styles
 * @property {string} variant dark or light
 * @property {Object} widgetContext the current context of the widget
 */
TopicBar.propTypes = {
  align: PropTypes.oneOf(['left', 'center']),
  className: PropTypes.string,
  cta: PropTypes.shape({
    href: PropTypes.string,
    onClick: PropTypes.func,
    site: PropTypes.string,
    target: PropTypes.string,
    text: PropTypes.string,
  }),
  onClick: PropTypes.func,
  separator: PropTypes.oneOf(['top', 'bottom', 'left']),
  separatorSpace: PropTypes.number,
  settings: PropTypes.shape({
    title: PropTypes.string,
    titleLink: PropTypes.shape({
      href: PropTypes.string,
      site: PropTypes.string,
      target: PropTypes.string,
    }),
    image: PropTypes.string,
    imageLink: PropTypes.shape({
      href: PropTypes.string,
      site: PropTypes.string,
      target: PropTypes.string,
    }),
  }).isRequired,
  size: PropTypes.oneOf(['small', 'large']),
  theme: PropTypes.object,
  titleTagElement: PropTypes.string,
  variant: PropTypes.oneOf(['dark', 'light']),
  widgetContext: PropTypes.object,
};

/**
 * Default Prop Values
 */
TopicBar.defaultProps = {
  align: 'left',
  className: '',
  size: 'small',
  theme: config.defaultTheme,
  titleTagElement: 'h1',
  variant: 'light',
  widgetContext: {},
};

export default TopicBar;
