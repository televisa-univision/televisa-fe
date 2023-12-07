import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from '@univision/fe-components-base/dist/components/Link';
import PlayStationButton from '../../connected/PlayStationButton/PlayStationButton';
import { getRadioStationProps } from '../../../utils/helpers';
import Styles from './StationList.scss';

/**
 * Link type wrapper component to be able to reuse
 * @returns {JSX}
 */
const StationLinkWrapper = ({
  children,
  station,
  device,
  abacast,
  className,
}) => (
  <Fragment>
    {station && station.uri
      ? (
        <Link className={`${Styles.stationLink} ${className}`} href={station.uri}>
          {children}
        </Link>
      )
      : (
        <PlayStationButton
          abacast={abacast}
          device={device}
          type="plain"
          className={className}
          {...getRadioStationProps(station)}
        >
          {children}
        </PlayStationButton>
      )
    }
  </Fragment>
);

StationLinkWrapper.propTypes = {
  device: PropTypes.string.isRequired,
  children: PropTypes.object,
  station: PropTypes.object,
  abacast: PropTypes.object,
  className: PropTypes.string,
};

export default StationLinkWrapper;
