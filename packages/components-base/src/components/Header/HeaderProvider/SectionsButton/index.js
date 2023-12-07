import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import brandableTypes from '@univision/fe-commons/dist/utils/brandable/types.json';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Button from '../../../Button';

import AllSections from '../AllSections';

import Styles from './SectionsButton.scss';

/**
 * SectionsButton
 * @param       {function} onClick what to do when the button is clicked
 * @param       {string} label   text to display (hidden on mobile)
 * @constructor
 */
export default function SectionsButton ({
  onClick,
  label: openLabel,
  icon: openIcon,
  closeLabel,
  closeIcon,
  variant,
  className,
  open,
  primaryControl,
  isTudn,
}) {
  let icon = openIcon;
  let label = openLabel;
  const isLocalMarket = getKey(getBrandable(Store), 'type') === brandableTypes.tv;

  if (open) {
    label = closeLabel;
    icon = closeIcon;
  }
  return (
    <div className={classnames(Styles.container, className)}>
      <Button
        plain
        onClick={onClick}
        className={classnames(
          Styles.sectionsBtn,
          !!label && Styles.hasLabel,
          isLocalMarket && Styles.dark,
          !isLocalMarket && Styles[variant],
          'uvs-font-a-bold',
        )}
      >
        {icon && <Icon className={Styles.icon} name={icon} size="small" />}
        {label && (
        <span className={classnames(`${isTudn ? Styles.labelExtraMargin : Styles.sectionsLabel}`)}>
          {label}
        </span>
        )}
      </Button>
      {primaryControl && <AllSections open={open} toggleMenu={onClick} />}
    </div>
  );
}

SectionsButton.defaultProps = {
  label: localization.get('sections'),
  closeLabel: localization.get('close'),
  closeIcon: 'close',
  icon: 'hamburger',
  isTudn: false,
};

SectionsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  closeIcon: PropTypes.string,
  closeLabel: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  open: PropTypes.bool,
  primaryControl: PropTypes.bool,
  isTudn: PropTypes.bool,
};
