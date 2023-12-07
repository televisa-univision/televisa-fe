import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import PlayStationButton from '@univision/fe-local/dist/components/connected/PlayStationButton/PlayStationButton';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './ListRadioLogo.styles';
import Button from '../../../../Button';

const RadioLogo = styled.div`
  ${Styles.radioLogo}
`;
const RadioLogoImage = styled.img`
  ${Styles.radioLogoImage}
`;
const RadioPlayButton = styled(Button)`
  ${Styles.radioPlayButton}
`;

/**
 * List Radio Logo component
 * @param {!Object} props - Props for this component
 * @param {Object} [props.abacast] radio station information such as ID, name etc
 * @param {Object} [props.alternativeLogo] - radio station logo renditions
 * @param {image} [props.image] - main content image
 * @param {number} [props.nowPlayingId] - ID to fetch song/audio information
 * required for pip player
 * @param {string} [props.title] - content title
 * @param {string} [props.uri] - radio uri
 * @param {string} [props.uid] - item uid
 * @returns {JSX}
 */
const ListRadioLogo = ({
  abacast,
  alternativeLogo,
  image,
  nowPlayingId,
  title,
  uid,
  uri,
  ...otherProps
}) => {
  return (
    <>
      <RadioLogo>
        <RadioLogoImage
          alt={title}
          src={getKey(alternativeLogo, 'renditions.original.href', '')}
        />
      </RadioLogo>
      <PlayStationButton
        abacast={abacast}
        alternativeLogo={alternativeLogo}
        type={'plain'}
        uid={uid}
        uri={uri}
        image={image}
        stationTitle={title}
        {...otherProps}
      >
        <RadioPlayButton>
          <Icon name="playnocircleLegacy" size="xxsmall" fill={WHITE} />
        </RadioPlayButton>
      </PlayStationButton>
    </>
  );
};

ListRadioLogo.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  nowPlayingId: PropTypes.string,
  title: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
};

export default ListRadioLogo;
