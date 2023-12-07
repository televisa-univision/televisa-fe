import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import univisionLogoWhite from '@univision/fe-commons/dist/assets/images/logo-univision-white.svg';
import univisionLogoColor from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Logo from '../../Logo';
import Button from '../../Button';
import MenuLink from '../MenuLink';

import Styles from './SecondaryNav.scss';

/**
 * Secondary nav for radio header
 * @returns {JSX}
 */
export default function SecondaryNav({
  links, onClose, mobileOpen, open, variant, forceOpen,
}) {
  const categories = links.secondary;
  let alwaysOpen = forceOpen;
  let btnText = localization.get('moreSections');
  if (mobileOpen) btnText = localization.get('fewerSections');
  if (!links.primary || (Array.isArray(links.primary) && links.primary.length === 0)) {
    alwaysOpen = true;
  }
  return (
    <div
      className={classnames(Styles.secondaryOuterWrapper, Styles[variant], {
        [Styles.isOpen]: open,
      })}
    >
      <div className={Styles.secondaryInnerWrapper}>
        <div className={classnames('col-12', Styles.secondaryNavHeader)}>
          <Logo
            uri="https://www.univision.com"
            src={variant === 'dark' ? univisionLogoWhite : univisionLogoColor}
            className={Styles.logo}
          />
          <Button className={Styles.more} onClick={onClose}>
            {localization.get('close')}
            <Icon name="close" size="xsmall" />
          </Button>
        </div>
        <div
          className={classnames('row', Styles.subNav, {
            [Styles.mobileOpen]: mobileOpen || alwaysOpen,
          })}
        >
          {Array.isArray(categories)
            && categories.map(category => (
              <ul
                key={category.name}
                className={classnames('col-6', 'col-sm-3', Styles.subNavList)}
              >
                <MenuLink
                  item={category}
                  className={classnames(Styles.categoryNav, 'uvs-font-a-bold')}
                />
                {category.contents.map(item => (
                  <MenuLink key={item.name} item={item} className={Styles.categoryNav} />
                ))}
              </ul>
            ))}
          {links.secondary
            && !alwaysOpen && (
              <Button plain className={Styles.btnAll} onClick={onClose}>
                {btnText}
                <Icon name="arrow" size="xxsmall" />
              </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @property {Array} links The array of links to be rendered
 * @property {boolean} showMore whether or not the "more" button is rendered
 * @property {string} logo the url to the source image to display
 * @property {function} onMore function to be called when open/close secondary nav
 * @property {function} onClose function to be called when collapsing mobile primary nav
 */
SecondaryNav.propTypes = {
  links: PropTypes.shape({
    globalLinks: PropTypes.array,
    secondary: PropTypes.array,
    primary: PropTypes.array,
  }),
  onClose: PropTypes.func,
  open: PropTypes.bool,
  mobileOpen: PropTypes.bool,
  variant: PropTypes.string,
  forceOpen: PropTypes.bool,
};

SecondaryNav.defaultProps = {
  links: {},
  open: false,
  mobileOpen: false,
};
