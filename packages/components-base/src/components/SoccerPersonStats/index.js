import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import localization from '@univision/fe-utilities/localization';
import formatDateWithSeparator from '@univision/fe-utilities/helpers/date/formatDateWithSeparator';
import Team from '@univision/shared-components/dist/components/v3/Team';
import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';

import Image from '../Image';
import Styles from './SoccerPersonStats.styles';

const NATIONALITY = 'nationality';
const DATE_OF_BIRTH = 'dateOfBirth';
const PROFILE = 'profile';
const TEAM_CLUB = 'club';
const POSITION = 'position';

const STATS = [
  NATIONALITY,
  DATE_OF_BIRTH,
  PROFILE,
  TEAM_CLUB,
  POSITION,
];

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const StatWrapper = styled.div`
  ${Styles.statWrapper}
`;
const Stat = styled.div`
  ${Styles.stat}
`;
const TeamStyled = styled(Team)`
  ${Styles.team}
`;
const FlagStyled = styled(Image)`
  ${Styles.flag}
`;
const Separator = styled.div`
  ${Styles.separator}
`;
const LeagueStyled = styled(Team)`
  ${Styles.league}
`;

/**
 * Soccer Person stats base component.
 * @param {Object} props React Props for this component
 * @param {number} [props.age] - the age of the person
 * @param {string} [props.className] - the modifier class
 * @param {string} [props.dateOfBirth] - date of birth of person
 * @param {number} [props.height] - height of the person
 * @param {string} [props.layout] - the type of layout
 * @param {Object} [props.league] -  the main league the person belongs to
 * @param {string} [props.nationality] - nationality of the person
 * @param {string} [props.positionRegular] - position in the club of the person
 * @param {Object} [props.team] - team the person belongs to
 * @param {number} [props.uniformNumber] - the number of the person's uniform
 * @param {number} [props.weight] - weight of the person
 * @returns {JSX}
 * @constructor
 */
const SoccerPersonStats = ({
  age,
  className,
  dateOfBirth,
  height,
  layout,
  league,
  nationality,
  positionRegular,
  team,
  uniformNumber,
  weight,
}) => {
  const { name, logo, url } = team || {};
  const teamName = {
    fullName: name,
    imageURI: logo,
  };
  const leagueName = {
    fullName: '',
    imageURI: league?.logo?.renditions?.original?.href,
  };
  const dob = formatDateWithSeparator(dateOfBirth);
  const club = team ? (
    <Stat type={TEAM_CLUB} layout={layout}>
      <TeamStyled
        name={teamName}
        layout="right"
        link={{
          href: url,
        }}
      />
      {leagueName?.imageURI && (
        <>
          <Separator />
          <LeagueStyled
            name={leagueName}
            isCompact
            link={{ href: league?.uri }}
          />
        </>
      )}
    </Stat>
  ) : null;
  const profile = height && weight ? `${height}cm / ${weight}kg` : null;
  const position = positionRegular && uniformNumber ? `${localization.get(positionRegular)} | ${uniformNumber}` : null;
  const flag = nationality && (
    <FlagStyled
      src={`https://secure.omo.akamai.opta.net/image.php?secure=true&h=secure.omo.akamai.opta.net&sport=football&entity=flags&description=countries&dimensions=150&id=${nationality}`}
    />
  );
  const values = {
    dateOfBirth,
    profile,
    nationality: flag,
    club,
    position,
  };
  return (
    <Wrapper className={className} layout={layout}>
      {STATS.map((stat) => {
        return isValidValue(values[stat]) ? (
          <StatWrapper layout={layout} key={values[stat]}>
            <Stat className="uvs-font-b-regular" layout={layout}>
              {localization.get(stat)}
            </Stat>
            {stat === TEAM_CLUB ? club
              : (
                <Stat isValue className="uvs-font-b-bold" layout={layout}>
                  {stat === DATE_OF_BIRTH
                    ? `${dob} (${age})`
                    : values[stat]
                }
                </Stat>
              )}
          </StatWrapper>
        ) : null;
      })}
    </Wrapper>
  );
};

SoccerPersonStats.propTypes = {
  age: PropTypes.number,
  className: PropTypes.string,
  team: PropTypes.object,
  dateOfBirth: PropTypes.string,
  height: PropTypes.number,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  league: PropTypes.object,
  nationality: PropTypes.string,
  positionRegular: PropTypes.string,
  uniformNumber: PropTypes.number,
  weight: PropTypes.number,
};

SoccerPersonStats.defaultProps = {
  layout: VERTICAL,
};

export default SoccerPersonStats;
