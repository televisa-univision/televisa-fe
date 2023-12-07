import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';

import FullWidth from '../../FullWidth';
import Link from '../../Link';
import Styles from './TopQuickLinks.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const MainLabel = styled.div`
  ${Styles.mainLabel}
`;
const LinkList = styled.ul`
  ${Styles.linkList}
`;
const LinkListItem = styled.li`
  ${Styles.linkListItem}
`;
const Scroller = styled.div`
  ${Styles.scroller}
`;
const Container = styled.div`
  ${Styles.container}
`;

/**
 * Tracks this widgets clicks
 * @param {Object} event of the click being sent
 */
const trackClick = (event) => {
  const {
    target: {
      textContent: title,
    },
  } = event;

  WidgetTracker.track(
    WidgetTracker.events.topQuickLinks,
    { title }
  );
};

/**
 * Top Quick Links widget
 * @param {Object} props - props of the component
 * @property {Array} content - content to be displayed in the widget
 * @property {Object} settings - contains the title of the widget
 * @returns {JSX}
 */
const TopQuickLinks = ({ content, settings }) => {
  const { variant } = useSelector(themeSelector);
  const { topQuickLinksTitle } = settings;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const renderLinks = useMemo(() => {
    if (!isValidArray(content)) {
      return null;
    }

    return (
      <LinkList>
        {content.map(item => (
          <LinkListItem key={item.uid} variant={variant} isWorldCupMVP={isWorldCupMVP}>
            <Link
              target={item?.link?.target || '_self'}
              href={item.uri}
              className="uvs-font-c-regular"
              onClick={trackClick}
            >
              {item.title}
            </Link>
          </LinkListItem>
        ))}
      </LinkList>
    );
  }, [variant, content, isWorldCupMVP]);

  if (!isValidArray(content)) {
    return null;
  }

  return (
    <Container isWorldCupMVP={isWorldCupMVP} className="uvs-container">
      <div className="row">
        <div className="col">
          <FullWidth breakpoints={['xxs', 'xs']}>
            <Wrapper>
              <Scroller isWorldCupMVP={isWorldCupMVP}>
                <MainLabel isWorldCupMVP={isWorldCupMVP} className="uvs-font-c-bold">{topQuickLinksTitle}:</MainLabel>
                {renderLinks}
              </Scroller>
            </Wrapper>
          </FullWidth>
        </div>
      </div>
    </Container>
  );
};

TopQuickLinks.propTypes = {
  content: PropTypes.array,
  settings: PropTypes.object,
};

export default TopQuickLinks;
