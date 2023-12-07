import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LabelBadge from '@univision/fe-components-base/dist/components/LabelBadge';
import ScoreCardBadge from '@univision/fe-components-base/dist/components/cards/SquareCards/SquareCard/SquareScoreCard/ScoreCardBadge';
import Title from '@univision/fe-components-base/dist/components/Title';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './VideoContent.styles';

const WrapperStyled = styled.div`${Styles.wrapper}`;
const ContentStyled = styled.div`${Styles.content}`;
const SpecialBranding = styled.div.attrs({ className: 'uvs-font-b-bold' })`${Styles.branding}`;
const LabelWrapperStyled = styled.div`${Styles.labelWrapper}`;
const LabelBadgeStyled = styled(LabelBadge)`${Styles.label}`;
const ScoreBadgeStyled = styled(ScoreCardBadge)`${Styles.label}`;
const TitleStyled = styled(Title).attrs({
  element: 'h3',
})`${Styles.title}`;

/**
 * Content card for video with playlist
 * @param {Object} props - react component props
 * @param {Object} [props.actionBarType] - the type of action bar
 * @param {string} props.brandTitle - the main title for special branding
 * @param {string} [props.className] - modifier class name
 * @param {Object} props.contentItem - content item from widget data
 * @param {string} props.device - current device name
 * @param {boolean} props.hasFavorite - true if have favorite enabled
 * @param {Object[]} props.reactions - reaction data for action bar
 * @param {Object} props.pageData - the page data for match
 * @param {string} props.variant - name of theme variant
 * @returns {JSX}
 */
function VideoContent({
  brandTitle,
  className,
  contentItem,
  pageData,
  variant,
}) {
  if (!isValidObject(contentItem)) {
    return null;
  }

  const {
    authors,
    cardLabel,
    contentPriority,
    hierarchy,
    type,
    title,
    uri,
    vertical,
  } = contentItem;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const scoreBadgeData = pageData?.soccerMatchStatus ? {
    hasLiveStream: true,
    status: pageData?.soccerMatchStatus,
  } : {};

  return (
    <WrapperStyled className={className}>
      <ContentStyled>
        <LabelWrapperStyled>
          {!brandTitle
            && (
              <>
                {isValidObject(scoreBadgeData) ? (
                  <ScoreBadgeStyled
                    scoreData={scoreBadgeData}
                    matchUrl={uri}
                    matchTime={pageData?.matchTime}
                    matchId={pageData?.matchId}
                    isWorldCupMVP={isWorldCupMVP}
                  />
                ) : (
                  <LabelBadgeStyled
                    authors={authors}
                    textLabel={cardLabel}
                    contentPriority={contentPriority}
                    hierarchy={hierarchy}
                    type={type}
                    uri={uri}
                    vertical={vertical}
                    isWorldCupMVP={isWorldCupMVP}
                  />
                )}
              </>
            )
          }
          {brandTitle && (
            <SpecialBranding>
              {brandTitle}
            </SpecialBranding>
          )}
        </LabelWrapperStyled>
        <TitleStyled variant={variant} isWorldCupMVP={isWorldCupMVP}>
          {title}
        </TitleStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}

VideoContent.propTypes = {
  brandTitle: PropTypes.string,
  className: PropTypes.string,
  contentItem: PropTypes.shape({
    authors: PropTypes.array,
    cardLabel: PropTypes.string,
    contentPriority: PropTypes.string,
    hierarchy: PropTypes.array,
    uid: PropTypes.string,
    uri: PropTypes.string,
    sharing: PropTypes.shape({
      options: PropTypes.object,
    }),
    type: PropTypes.string,
    title: PropTypes.string,
    vertical: PropTypes.string,
  }),
  pageData: PropTypes.object,
  variant: PropTypes.string,
};

export default VideoContent;
