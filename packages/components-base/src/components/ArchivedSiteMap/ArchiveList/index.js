import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import localization from '@univision/fe-utilities/localization';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';

import ArchiveTitle from '../ArchiveTitle';
import Link from '../../Link';
import Title from '../../Title';
import Styles from './ArchiveList.styles';

const Archive = styled(Title).attrs({
  element: 'h2',
})`${Styles.archive}`;
const Description = styled.div`${Styles.description}`;
const ListWrapper = styled.ul`${Styles.listWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * ArchiveList base component.
 * To show up all the archive content found inside UNV and TUDN ref to a specific year and month
 * @param {Object} props - Object content attrs
 * @property {Function} props.clickTracking - Click tracking method
 * @property {string} props.contents - Archives to show to the user
 * @property {string} props.month - Year the user is navigating
 * @property {string} props.page - Part the user is navigating
 * @property {string} props.year - Year the user is navigating
 * @returns {JSX}
 */
const ArchiveList = ({
  clickTracking,
  contents,
  month,
  page,
  site,
  year,
}) => {
  return (
    <Wrapper>
      <ArchiveTitle
        mainLabel={localization.get(month)}
        secondLabel={year}
        thirdLabel={localization.get('archiveMonthPart',
          {
            locals: {
              part: page,
            },
          })}
        isArrowActive
        href={`/archivo/${year}`}
      />
      <Description className="uvs-font-a-light">
        {localization.get('archiveListContentDesc', {
          locals: {
            brand: localization.get(site),
            year,
            month: localization.get(month),
          },
        })}
      </Description>
      <ListWrapper>
        {Array.isArray(contents)
        && contents.map(({ title, url }, index) => {
          const key = `archive-${index}`;
          return (
            <li key={key}>
              <Archive>
                <Link
                  href={url}
                  onClick={isValidFunction(clickTracking) ? clickTracking : undefined}
                >
                  {title}
                </Link>
              </Archive>
            </li>
          );
        })}
      </ListWrapper>
    </Wrapper>
  );
};

ArchiveList.propTypes = {
  clickTracking: PropTypes.func,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  month: PropTypes.string,
  page: PropTypes.number,
  site: PropTypes.string,
  year: PropTypes.string,
};

ArchiveList.defaultProps = {
  contents: [],
  site: UNIVISION_SITE,
};

export default ArchiveList;
