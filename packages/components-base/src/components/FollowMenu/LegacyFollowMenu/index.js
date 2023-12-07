import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import followActive from '@univision/fe-commons/dist/assets/icons/header/dots-active.svg';
import followActiveBlack from '@univision/fe-commons/dist/assets/icons/header/dots-active-black.svg';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { trackFollowUsClick } from '../helpers';
import config from '../../../config';
import Button from '../../Button';
import Image from '../../Image';
import Link from '../../Link';

import Styles from './LegacyFollowMenu.scss';

/**
 * Follow menu list
 */
class LegacyFollowMenu extends React.Component {
  /**
   * bind methods and configure initialState
   */
  constructor() {
    super();

    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      open: false,
    };
  }

  /**
   * toggle the open state of the menu
   */
  toggleMenu() {
    const { onToggle } = this.props;
    /* eslint-disable react/destructuring-assignment, react/no-access-state-in-setstate */
    const open = !this.state.open;
    this.setState({ open });
    if (isValidFunction(onToggle)) {
      onToggle(open);
    }
  }

  /**
   * render the view
   * @returns {JSX}
   */
  render() {
    const {
      networks,
      theme,
      className,
      showLabel,
      openDirection,
      addScreenOverlay,
      addGradientBackground,
      forceMobileView,
      variant,
      isTudn,
    } = this.props;
    const { open } = this.state;
    const cssForceMobileView = forceMobileView ? Styles.forceMobileView : '';
    const menuControlIconName = open ? 'dot' : 'dots';
    let menuControlIcon = <Icon name={menuControlIconName} size="xsmall" />;
    const menuClassList = [
      Styles.menu,
      Styles[`${openDirection}OpenDirection`],
      cssForceMobileView,
    ];
    const menuStyles = {};

    if (open) {
      menuClassList.push(Styles.open);
      if (addGradientBackground) {
        menuStyles.background = theme.solidGradient;
      }
      menuControlIcon = <Image src={variant === 'light' ? followActiveBlack : followActive} />;
    }

    const hasNetworks = Array.isArray(networks) && networks.length > 0;
    return (
      <div
        className={classnames(Styles.container, Styles[variant], className, {
          [Styles.open]: open,
        })}
      >
        {addScreenOverlay
          && open && (
            <div role="button" tabIndex={-1} className={Styles.screen} onClick={this.toggleMenu} />
        )}
        {hasNetworks
          && showLabel && (
            <span className={`uvs-font-a-bold ${Styles.follow} ${Styles.label} ${isTudn ? Styles.boldFont : Styles.regularFont}`}>
              {localization.get('followUs')}
            </span>
        )}
        <Button
          plain
          onClick={this.toggleMenu}
          className={`${Styles.toggleMenu} ${cssForceMobileView}`}
          style={addGradientBackground ? { background: theme.solidGradient } : null}
        >
          {menuControlIcon}
        </Button>
        <ul className={menuClassList.join(' ')} style={menuStyles}>
          {hasNetworks
            && networks.map(n => (
              <li key={n.name} className={`${Styles.item} ${cssForceMobileView}`}>
                <Link href={n.href || n.url} target="_blank" className={n.name} onClick={() => trackFollowUsClick(n.name)}>
                  <Icon
                    name={n.name.toLowerCase()}
                    className={`${Styles.socialIcon} ${cssForceMobileView}`}
                    size="xsmall"
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default LegacyFollowMenu;

LegacyFollowMenu.propTypes = {
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  theme: PropTypes.shape({
    primary: PropTypes.string,
    solidGradient: PropTypes.string,
  }),
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  openDirection: PropTypes.oneOf(['up', 'down']),
  addScreenOverlay: PropTypes.bool,
  addGradientBackground: PropTypes.bool,
  forceMobileView: PropTypes.bool,
  onToggle: PropTypes.func,
  variant: PropTypes.oneOf(['light', 'dark']),
  isTudn: PropTypes.bool,
};

LegacyFollowMenu.defaultProps = {
  theme: config.defaultTheme,
  className: '',
  showLabel: true,
  openDirection: 'down',
  addScreenOverlay: false,
  addGradientBackground: false,
  forceMobileView: false,
  isTudn: false,
};
