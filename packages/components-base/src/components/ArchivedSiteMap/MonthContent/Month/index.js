import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '@univision/fe-utilities/localization';
import {
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import Link from '../../../Link';
import Title from '../../../Title';
import Styles from './Month.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const PartsWrapper = styled.div`${Styles.partsWrapper}`;
const MonthName = styled(Title).attrs({
  element: 'h2',
})`
${Styles.monthName}`;
const Part = styled(Title).attrs({
  element: 'h3',
})`${Styles.part}`;

/**
 * Func to create all the parts for specific month
 * @param {Function} clickTracking - click tracking method
 * @param {string} name - props of the component
 * @param {number} year - props of the component
 * @param {number} totalParts - props of the component
 * @returns {JSX}
 */
const generatePartsContent = ({
  clickTracking,
  name,
  year,
  totalParts,
}) => {
  const contents = [...Array(totalParts).keys()].map(idx => (
    <Link
      key={`link-${name}-part-${idx}`}
      href={`/archivo/${year}/${localization.get(`${name}`).toLowerCase()}-${idx + 1}`}
      onClick={isValidFunction(clickTracking) ? clickTracking : undefined}
    >
      <Part className="uvs-font-a-light">
        {localization.get('archiveMonthPart',
          {
            locals: {
              part: idx + 1,
            },
          })}
        <Icon name="arrowRight" size="small" fill={GREY_BLACK} />
      </Part>
    </Link>
  ));
  return contents;
};

/**
 * MonthContent base component.
 * @param {Object} props - Object content attrs
 * @property {Function} props.clickTracking - Click tracking method
 * @property {string} props.name - Month name
 * @property {number} props.totalParts - Numbers of parts inside month
 * @property {number} props.year - Year selected
 * @returns {JSX}
 */
const Month = ({
  clickTracking,
  name,
  totalParts,
  year,
}) => {
  return (
    <Wrapper>
      <MonthName className="uvs-font-a-black">{localization.get(`${name}Abbreviated`)}</MonthName>
      <PartsWrapper>
        {generatePartsContent({
          clickTracking,
          name,
          totalParts,
          year,
        })}
      </PartsWrapper>
    </Wrapper>
  );
};

Month.propTypes = {
  clickTracking: PropTypes.func,
  name: PropTypes.string,
  totalParts: PropTypes.number,
  year: PropTypes.number,
};

export default Month;
