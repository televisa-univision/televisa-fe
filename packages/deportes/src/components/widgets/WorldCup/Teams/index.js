import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import TeamGroup from './TeamGroup';
import Styles from './Teams.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Teams component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const Teams = ({ sections }) => {
  const groups = useMemo(() => {
    if (!isValidArray(sections)) {
      return null;
    }

    return sections.map(item => <TeamGroup {...item} />);
  }, [sections]);

  return (
    <Wrapper>
      {groups}
    </Wrapper>
  );
};

Teams.propTypes = {
  sections: PropTypes.array,
};

export default Teams;
