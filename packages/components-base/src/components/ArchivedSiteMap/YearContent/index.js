import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import localization from '@univision/fe-utilities/localization';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import Link from '../../Link';
import Title from '../../Title';
import Styles from './YearContent.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const Description = styled.div`${Styles.description}`;
const TitleWrapper = styled(Title).attrs({ element: 'h1' })`${Styles.titleWrapper}`;
const YearTitle = styled(Title).attrs({
  element: 'h2',
})`${Styles.year}`;
const YearWrapper = styled.div`${Styles.yearWrapper}`;

/**
 * YearContent base component.
 * @param {Object} props - Object content attrs
 * @property {Function} props.clickTracking - click tracking method
 * @property {string} props.yearsAvailable - Data of year to show in page
 * @returns {JSX}
 */
const YearContent = ({ clickTracking, site, yearsAvailable }) => {
  return (
    <Wrapper>
      <TitleWrapper className="uvs-font-a-black">{localization.get('archive')}</TitleWrapper>
      <Description className="uvs-font-a-light">
        {localization.get('archiveYearContentDesc', {
          locals: { brand: localization.get(site) },
        })}
      </Description>
      <YearWrapper>
        {Array.isArray(yearsAvailable) && yearsAvailable.map(year => (
          <YearTitle className="uvs-font-a-black">
            <Link
              href={`/archivo/${year}`}
              onClick={isValidFunction(clickTracking) ? clickTracking : undefined}
            >
              {year}
            </Link>
          </YearTitle>
        ))}
      </YearWrapper>
    </Wrapper>
  );
};

YearContent.propTypes = {
  clickTracking: PropTypes.func,
  site: PropTypes.string,
  yearsAvailable: PropTypes.array,
};

YearContent.defaultProps = {
  site: UNIVISION_SITE,
};

export default YearContent;
