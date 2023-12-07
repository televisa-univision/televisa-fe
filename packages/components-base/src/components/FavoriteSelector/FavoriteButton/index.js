import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import { capFirstLetter, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import FavoriteButtonTracker from '@univision/fe-commons/dist/utils/tracking/tealium/personalization/FavoriteButtonTracker';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Link from '../../Link';

import Styles from './FavoriteButton.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Main = styled(Link)`
  ${Styles.main}
`;
const FavoriteIcon = styled(Icon)`
  ${Styles.favoriteIcon}
`;
const Title = styled.span`
  ${Styles.title}
`;
const MainIconContainer = styled.div`
  ${Styles.mainIconContainer}
`;
const IconButton = styled.div`
  ${Styles.iconButton}
`;

/**
 * Renders a card with a title, icon, and an icon button for saving a specific
 * item as a favorite.
 * @returns {JSX}
 */
const FavoriteButton = ({
  action,
  className,
  favorited,
  favoriteIconColor,
  href,
  iconColor,
  iconName,
  id,
  personalizationType,
  title,
  widgetContext,
}) => {
  /**
   * Executes the action that saves the specific item to favorites
   *
   * @returns {void}
   */
  const executeAction = () => {
    FavoriteButtonTracker.track(
      FavoriteButtonTracker.events.click,
      { favorited: !favorited, id, personalizationType }
    );

    return isValidFunction(action) && action(id);
  };

  const trackMainItemClick = useCallback(
    CardTracker.onClickHandler({ title, uid: id }, widgetContext),
    [id, title, widgetContext]
  );

  return (
    <Container className={className}>
      <Main href={href} onClick={trackMainItemClick}>
        <Title>{capFirstLetter(title)}</Title>
        <MainIconContainer>
          <Icon name={iconName} size={60} fill={iconColor} />
        </MainIconContainer>
      </Main>
      <IconButton
        tabIndex={0}
        role="button"
        onClick={executeAction}
      >
        <FavoriteIcon
          name={favorited ? 'heartWithFill' : 'heartWithBorders'}
          size={24}
          fill={favoriteIconColor}
        />
      </IconButton>
    </Container>
  );
};

FavoriteButton.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  favorited: PropTypes.bool,
  favoriteIconColor: PropTypes.string,
  href: PropTypes.string,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  id: PropTypes.string,
  personalizationType: PropTypes.string,
  title: PropTypes.string,
  widgetContext: PropTypes.object,
};

FavoriteButton.defaultProps = {
  favorited: false,
  favoriteIconColor: BLACK,
  href: '#',
  iconColor: BLACK,
  title: '',
  widgetContext: {},
};

export default memo(FavoriteButton);
