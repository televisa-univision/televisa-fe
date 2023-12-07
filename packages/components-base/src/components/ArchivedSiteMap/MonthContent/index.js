import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';

import ArchiveTitle from '../ArchiveTitle';
import Month from './Month';
import Styles from './MonthContent.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const Description = styled.div`${Styles.description}`;
const MonthWrapper = styled.div`${Styles.monthWrapper}`;
/**
 * MonthContent base component.
 * @param {Object} props - Object content attrs
 * @property {Function} props.clickTracking - Click tracking method
 * @property {number} props.year - Data of year to show in page
 * @property {string} props.numberOfPagesByMonth - Data of months to show in page
 * @returns {JSX}
 */
const MonthContent = ({
  clickTracking,
  numberOfPagesByMonth,
  site,
  year,
}) => {
  const monthValues = Object.entries(numberOfPagesByMonth);
  return (
    <Wrapper>
      <ArchiveTitle
        mainLabel={year}
        secondLabel={localization.get('archive')}
        isArrowActive
        href={'/archivo'}
      />
      <Description className="uvs-font-a-light">
        {localization.get('archiveMonthContentDesc', {
          locals: {
            year,
            brand: localization.get(site),
          },
        })}
      </Description>
      <MonthWrapper>
        {monthValues.map(([name, totalParts]) => (
          <Month
            key={`month-${name}`}
            name={name}
            year={year}
            totalParts={totalParts}
            clickTracking={clickTracking}
          />
        ))}
      </MonthWrapper>
    </Wrapper>
  );
};

MonthContent.propTypes = {
  clickTracking: PropTypes.func,
  numberOfPagesByMonth: PropTypes.object,
  site: PropTypes.string,
  year: PropTypes.string,
};

MonthContent.defaultProps = {
  numberOfPagesByMonth: {},
  site: UNIVISION_SITE,
};

export default MonthContent;
