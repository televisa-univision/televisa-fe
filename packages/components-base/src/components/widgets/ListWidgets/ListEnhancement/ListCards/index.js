import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { ConnectedWithNativeContent } from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeContent';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import ListCard from '../../../../cards/SquareCards/ListCard';
import { attachSquareCardMetaData } from '../../../../cards/helpers';
import Styles from './ListCards.styles';

const CardWrapper = styled.div`
  ${Styles.cardWrapper}
`;
const ListColumn = styled.div`
  ${Styles.listColumn}
`;

/**
 * List Cards component
 * @param {Object} props of the component
 * @param {array} [props.cardElements] - the widgets content
 * @param {string} [props.device] - the device currently on
 * @param {Object} [props.enhancedWidgetContext] - the widgets context object
 * @param {string} [props.flavor] - widget flavor
 * @param {Object} [props.theme] - widget theme
 * @returns {array}
 */
const ListCards = ({
  cardElements,
  device,
  enhancedWidgetContext,
  flavor,
  theme,
}) => {
  return cardElements.map((card, index) => {
    const cardContent = attachSquareCardMetaData(card, 'List');
    const { widgetContext: cardWidgetContext } = cardContent;
    cardContent.position = index + 1;
    // When flavor is present, the loop will make fit 3 cards in one row
    const listColumnClassName = classnames({
      'col-12': true,
      'col-sm-6': !flavor,
      'col-sm-4': flavor,
    });

    let cardTheme = theme;

    // Let the widget theme carry over if there is a flavor set in the widget
    if (!flavor) {
      const cardThemeData = isValidArray(cardContent?.hierarchy)
        ? cardContent.hierarchy[0]?.uri : cardContent?.uri;
      const verticalTheme = getThemeFromVertical(cardThemeData);
      // Fallback to the widget theme if there is no verticalTheme available
      cardTheme = isValidObject(verticalTheme) ? verticalTheme : theme;
    }
    return (
      <ListColumn key={cardContent.uid} className={listColumnClassName}>
        <CardWrapper>
          <ConnectedWithNativeContent
            {...cardContent}
            actualDevice={device}
            adType={AdTypes.TRIPLELIFT_NATIVE_AD}
            device={device}
            flavor={flavor}
            isDark={cardTheme?.isDark}
            onDevice={device}
            widgetContext={{ ...enhancedWidgetContext, ...cardWidgetContext }}
            WrappedComponent={ListCard}
            theme={cardTheme}
          />
        </CardWrapper>
      </ListColumn>
    );
  });
};

ListCards.propTypes = {
  cardElements: PropTypes.array,
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  enhancedWidgetContext: PropTypes.object,
  flavor: PropTypes.string,
  theme: PropTypes.object,
};

export default ListCards;
