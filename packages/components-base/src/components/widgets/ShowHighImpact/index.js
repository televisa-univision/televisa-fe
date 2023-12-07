import React from 'react';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { globalComponents } from '@univision/fe-commons/dist/config';
import { getKey, truncateString } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { generateVideoPlayerId } from '@univision/fe-video/dist/helpers';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import PropTypes from 'prop-types';
import Logo from '../../Logo';
import Clickable from '../../Clickable';

import Styles from './ShowHighImpact.styles';

const Description = styled.div`
  ${Styles.description}
`;
const MoreEpisodesButton = styled.div`
  ${Styles.moreEpisodesButton}
`;
const FullWrapper = styled.div`
  ${Styles.fullWrapper}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const Gradient = styled.span`
  ${Styles.gradient}
`;
const Container = styled.div`
  ${Styles.container}
`;
const LogoContainer = styled.div`
  ${Styles.logoContainer}
`;
const Airtime = styled.div`
  ${Styles.airtime}
`;
const BottomContent = styled.div`
  ${Styles.bottomContent}
`;

/**
 * Show High Impact Widget
 * @param {Object} { props } current props
 */
class ShowHighImpact extends React.Component {
  /**
   * Constructor
   * @param {Object} props current props
   */
  constructor(props) {
    super(props);

    this.content = getKey(props, 'content.0');
    this.isMobile = getDevice(Store) === 'mobile';
    this.link = getKey(this.content, 'uri', '');
    const bgType = this.isMobile ? 'mobile' : 'desktop';
    this.bgImage = getKey(this.content, `highImpactImages.${bgType}.renditions.original.href`, '');
    this.logo = getKey(this.content, 'headerLogo.renditions.original.href', {});
    this.description = getKey(this.content, 'description', '');
    this.nodeId = generateVideoPlayerId();
    this.isDesktop = getDevice(Store) === 'desktop';
    this.title = getKey(this.content, 'title', '');
    this.uid = getKey(this.content, 'uid', '');

    if (this.isMobile) {
      this.description = truncateString(this.description, globalComponents.truncate.description, '…', true, false);
    }
  }

  /**
   * Track click on button logo
   * @param {string} trackEvent - for name tracker
   */
  handleClick = (trackEvent) => {
    const { widgetContext } = this.props;
    VideoTracker.track(VideoTracker.events.trackClickOnVideoWidgets, {
      title: this.title.toLowerCase(),
      trackEvent,
      uid: this.uid,
      widgetContext,
    });
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const descriptionElem = (
      <Description>
        {this.description}
      </Description>
    );

    const buttonElem = (
      <MoreEpisodesButton>
        <div>
          <Clickable
            type="link"
            appearance="secondary"
            size="medium"
            align="center"
            variant="dark"
            href={this.link}
            onClick={() => this.handleClick('ver_mas_click')}
            label={localization.get('seeMore')}
            className="moreEpisodes"
          />
        </div>
      </MoreEpisodesButton>
    );

    return (
      <FullWrapper>
        <Wrapper bgImage={this.bgImage}>
          <Gradient />
          <div>
            <Container>
              { this.logo && (
                <LogoContainer>
                  <Logo onClick={() => this.handleClick('content_click')} uri={this.link} src={this.logo} className="logo" />
                </LogoContainer>
              )}
              <Airtime>
                {getKey(this.content, 'airTime', '')}
              </Airtime>
              {!this.isMobile && descriptionElem}
            </Container>
          </div>
          {!this.isMobile && buttonElem}
        </Wrapper>
        {this.isMobile && (
          <BottomContent>
            {descriptionElem}
            {buttonElem}
          </BottomContent>
        )}
      </FullWrapper>
    );
  }
}

ShowHighImpact.propTypes = {
  widgetContext: PropTypes.object,
};

export default ShowHighImpact;
