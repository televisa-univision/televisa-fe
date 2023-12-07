import React from 'react';

import PropTypes from 'prop-types';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import GradientBox from 'components/layout/GradientBox/GradientBox';
import Styles from './PromoCard.scss';
/**
 * Promo Card Widget.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const PromoCard = ({ content }) => {
  if (exists(content) && Array.isArray(content)) {
    const promoCards = content.map(contentData => (
      <div key={contentData.uid} className={Styles.promoCardWidget}>
        <GradientBox {...contentData} className={Styles.promoCard} useOriginal />
      </div>
    ));

    return (
      <div className={`uvs-widget ${Styles.promoCardList}`}>
        { promoCards }
      </div>
    );
  }
  return null;
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 */
PromoCard.propTypes = {
  content: PropTypes.array.isRequired,
};

export default PromoCard;
