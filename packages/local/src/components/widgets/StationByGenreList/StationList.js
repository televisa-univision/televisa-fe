import React from 'react';
import PropTypes from 'prop-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Title from '@univision/fe-components-base/dist/components/Title';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Description from '@univision/fe-components-base/dist/components/Description';
import localization from '../../../utils/localization';
import PlayStationButton from '../../connected/PlayStationButton/PlayStationButton';
import { getRadioStationProps } from '../../../utils/helpers';
import LinkWrapper from './StationLinkWrapper';
import Styles from './StationList.scss';

/**
 * Device Size overrides for this widget, need the smallest images for the logos here.
 * @type {{xl: string, lg: string, md: string, sm: string, xs: string}}
 */
const deviceSizeOverrides = {
  xl: sizes.XX_SMALL,
  lg: sizes.XX_SMALL,
  md: sizes.XX_SMALL,
  sm: sizes.XX_SMALL,
  xsm: sizes.XX_SMALL,
};

/**
 * check if stations data is correct
 * @param {Array} stations the array of stations to check
 * @returns {boolean}
 */
const hasStationsData = (stations) => {
  if (!stations) return false;
  if (!Array.isArray(stations)) return false;
  if (!stations.length) return false;
  if (!stations[0].uid) return false;
  return true;
};

/**
 * StationList Component
 * @param {Array} stations Array of stations to display
 * @returns {JSX}
 */
const StationList = ({ stations, device }) => (
  <div className="row no-gutters">
    {hasStationsData(stations)
      && stations.map((station) => {
        let { logo } = station;
        if (hasKey(station, 'radioStation.logo')) {
          ({ logo } = station.radioStation);
        }
        const abacast = hasKey(station, 'radioStation.abacast')
          ? station.radioStation.abacast
          : station.abacast;
        const exclusive = hasKey(station, 'radioStation.isExclusive')
          ? station.radioStation.isExclusive || false
          : false;
        return (
          <div className="col-xs-12 col-sm-4 col-md-3" key={station.uid}>
            <div className={Styles.station}>
              {exclusive && (
                <h2 className={` ${Styles.exclusive} uvs-font-a-bold`}>
                  {localization.get('exDigital')}
                </h2>
              )}
              <LinkWrapper station={station} abacast={abacast} device={device}>
                <div className={Styles.logo}>
                  <Picture
                    alt={hasKey(station, 'title') && station.title}
                    image={logo}
                    deviceSizeOverrides={deviceSizeOverrides}
                  />
                </div>
              </LinkWrapper>
              <div className={Styles.info}>
                <LinkWrapper station={station} abacast={abacast} device={device}>
                  <Title className={Styles.stationTitle}>{station.title}</Title>
                  <Description className={Styles.description}>
                    {station.shortDescription}
                  </Description>
                </LinkWrapper>
                <div className={Styles.actions}>
                  {abacast && (
                    <PlayStationButton
                      abacast={abacast}
                      device={device}
                      type="stationList"
                      {...getRadioStationProps(station)}
                    >
                      {localization.get('listen')}
                      <span className={Styles.play}>
                        <Icon name="playnocircleLegacy" size="small" />
                      </span>
                    </PlayStationButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
  </div>
);

StationList.propTypes = {
  device: PropTypes.string.isRequired,
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      uri: PropTypes.string,
      title: PropTypes.string,
      shortDescription: PropTypes.string,
      radioStation: PropTypes.shape({
        logo: PropTypes.shape({
          renditions: PropTypes.shape({
            original: PropTypes.shape({
              href: PropTypes.string,
            }),
          }),
        }),
        isExclusive: PropTypes.bool,
      }),
    })
  ),
};

export default StationList;
