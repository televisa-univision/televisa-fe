import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';

import TeamItem from '../TeamItem';
import Styles from './TeamGroup.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const Title = styled.h3`
  ${Styles.title}
`;

const StyledTeamItem = styled(TeamItem)`
  ${Styles.teamItem}
`;

const TeamsWrapper = styled.div`
  ${Styles.teamsWrapper}
`;

/**
 * TeamGroup component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const TeamGroup = ({
  className,
  data,
  title,
}) => {
  const teamList = useMemo(() => {
    if (!isValidArray(data)) {
      return null;
    }

    return data.map(item => (<StyledTeamItem {...item?.team?.name} key={item?.key} />));
  }, [data]);

  return (
    <Wrapper className={className}>
      <Title>{localization.get(toCamelCase(title))}</Title>
      <TeamsWrapper>
        {teamList}
      </TeamsWrapper>
    </Wrapper>
  );
};

TeamGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  title: PropTypes.string,
};

export default TeamGroup;
