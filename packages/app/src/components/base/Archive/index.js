import React from 'react';
import PropTypes from 'prop-types';

import archiveTypes from '@univision/fe-commons/dist/constants/archiveTypes';
import ArchiveTracker from '@univision/fe-commons/dist/utils/tracking/tealium/archive/ArchiveTracker';

import styled from 'styled-components';
import archiveTypeMap from './archiveTypeMap';
import Styles from './Archive.styles';

/**
 * Click tracking method
 */
const clickTracking = () => {
  ArchiveTracker.track(
    ArchiveTracker.events.click,
  );
};

const Wrapper = styled.div`${Styles.wrapper}`;
/**
 * Archives main layout component
 * @param {Object} props - props of the component
 * @property {string} type - type of archive to be loaded
 * @returns {JSX}
 */
const Archive = (props) => {
  const { type, ...componentProps } = props;
  const ArchiveContent = archiveTypeMap[type] || archiveTypeMap[archiveTypes.MAIN];

  return (
    <Wrapper>
      <ArchiveContent
        {...componentProps}
        clickTracking={clickTracking}
      />
    </Wrapper>
  );
};

Archive.propTypes = {
  type: PropTypes.oneOf([
    archiveTypes.MAIN,
    archiveTypes.MONTH,
    archiveTypes.YEAR,
  ]),
};

export default Archive;
