import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';

import Styles from './StandingGroup.styles';

const Content = styled.div`
  ${Styles.content}
`;

const ContentColumn = styled.div`
  ${Styles.contentColumn}
`;

const ContentRow = styled.div`
  ${Styles.contentRow}
`;

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const Header = styled.div`
  ${Styles.header}
`;

const HeaderColumn = styled.div`
  ${Styles.headerColumn}
`;

const TeamImg = styled.img`
  ${Styles.teamImg}
`;

const TeamName = styled.span`
  ${Styles.teamName}
`;

/**
 * StandingGroup component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const StandingGroup = ({
  className,
  data,
  title,
}) => {
  const rows = useMemo(() => {
    if (!isValidArray(data)) {
      return null;
    }

    return data.map((row, idx) => {
      const {
        team: {
          name: {
            fullName,
            imageURI,
          },
        },
        key,
        pt,
        pj,
        dg,
        ga,
      } = row;

      return (
        <ContentRow key={key} isHighlighted={idx < 2}>
          <ContentColumn>{idx + 1}</ContentColumn>
          <ContentColumn alignment="flex-start">
            <TeamImg src={imageURI} alt={fullName} />
            <TeamName>{fullName}</TeamName>
          </ContentColumn>
          <ContentColumn isColored>{pt}</ContentColumn>
          <ContentColumn>{pj}</ContentColumn>
          <ContentColumn>{ga}</ContentColumn>
          <ContentColumn>{dg}</ContentColumn>
        </ContentRow>
      );
    });
  }, [data]);

  return (
    <Wrapper className={className}>
      <Header>
        <HeaderColumn alignment="left">{localization.get(toCamelCase(title))}</HeaderColumn>
        <HeaderColumn isColored>PTS</HeaderColumn>
        <HeaderColumn>PJ</HeaderColumn>
        <HeaderColumn>GF</HeaderColumn>
        <HeaderColumn>GD</HeaderColumn>
      </Header>
      <Content>
        {rows}
      </Content>
    </Wrapper>
  );
};

StandingGroup.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  title: PropTypes.string,
};

export default StandingGroup;
