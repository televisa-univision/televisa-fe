import React from 'react';
import PropTypes from 'prop-types';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Image from '@univision/fe-components-base/dist/components/Image';
import Styles from './Team.scss';

/**
 * A sports Team made up of logo and name, and abbreviated name for mobile
 * @param {Object} props The details of the team
 * @returns {JSX}
 */
const Team = (props) => {
  const {
    alignment, name, view, logo, modifierClass,
  } = props;

  let fullTeamName = '';
  let teamAbbreviation = '';
  let viewAlignment = '';

  if (exists(name.full)) {
    fullTeamName = name.full;
  }
  if (exists(name.abbreviation)) {
    teamAbbreviation = name.abbreviation;
  }
  if (exists(alignment)) {
    viewAlignment = alignment === 'away';
  }
  if (exists(view)) {
    switch (view) {
      case 'vertical':
        viewAlignment = Styles.vertical;
        break;
      case 'horizontal':
        viewAlignment = viewAlignment ? Styles.away : '';
        break;
      default:
        viewAlignment = 'horizontal';
        break;
    }
  }
  return (
    <div
      className={`
      ${Styles.container}
      ${viewAlignment}
      ${modifierClass}
    `}
    >
      <div className={`${Styles.teamLogo} ${viewAlignment}`}>
        <Image src={logo} alt={fullTeamName} className={Styles.logo} />
      </div>
      <div className={`${Styles.teamName} ${viewAlignment}`}>
        <span className={`${Styles.name} ${Styles.mobile}`}>{teamAbbreviation}</span>
        <span className={`${Styles.name} ${Styles.desktop}`}>{fullTeamName}</span>
      </div>
    </div>
  );
};

/**
 * @property {Object} name the name of the team
 * @property {string} name.first the teams first name;
 * @property {string} name.full the teams full name
 * @property {string} name.abbreviation the teams short abbreviated name
 * @property {string} name.nickname the teams nickname
 */
Team.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    full: PropTypes.string,
    abbreviation: PropTypes.string,
    nickname: PropTypes.string,
  }),
  logo: PropTypes.string,
  alignment: PropTypes.oneOf(['home', 'away', 'none']),
  modifierClass: PropTypes.string,
  view: PropTypes.oneOf(['horizontal', 'vertical', '']),
};

Team.defaultProps = {
  name: {},
  logo: 'https://cdn3.uvnimg.com/f5/ea/21d13f0f4086b459e664e41dc6d7/generic-shield.png',
  alignment: 'none',
  modifierClass: '',
  view: 'horizontal',
};

export default Team;
