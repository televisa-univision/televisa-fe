import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';

import Link from '../../Link';

/**
 * Renders a link that takes the user to a social network page
 * @returns {JSX}
 */
const SocialNetworkLink = ({
  name, onClick, target, url,
}) => {
  return (
    <Link href={url} target={target || '_blank'} onClick={onClick}>
      <Icon name={name.toLowerCase()} size={[40, 40]} />
    </Link>
  );
};

SocialNetworkLink.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
  url: PropTypes.string,
};

export default SocialNetworkLink;
