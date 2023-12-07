import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import {
  exists,
  getUniqKey,
  isValidArray,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import TooltipButton from '@univision/fe-components-base/dist/components/TooltipButton';

import Styles from './ArticleRecipe.scss';

/**
 * ArticleRecipe component
 * @returns {JSX}
 */
class ArticleRecipe extends React.Component {
  /**
   * Component constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.setVisible = this.setVisible.bind(this);
    if (props.isInViewportCallback && typeof props.isInViewportCallback === 'function') {
      props.isInViewportCallback(this.setVisible);
    }
    this.state = {
      isVisible: false,
    };
  }

  /**
   * Component constructor
   * @param {boolean} isVisible true if articleRecipe is visible in viewport
   */
  setVisible(isVisible) {
    this.setState({
      isVisible,
    });
  }

  /**
   * Generic items list to ingredients, steps etc.
   * @param {array} items - the list to be rendered
   * @param {string} title - a list name/title
   * @param {string} TypeList - element list type ul/ol
   * @returns {JSX}
   */
  itemsList = (items, title, TypeList = 'ul') => {
    return (
      isValidArray(items) && (
        <Fragment key={getUniqKey(title)}>
          <p>
            <b>{title}:</b>
          </p>
          <TypeList>
            {items.map((item, idx) => (
              <li key={getUniqKey(idx)}>{item}</li>
            ))}
          </TypeList>
        </Fragment>
      )
    );
  };

  /**
   * Render view
   * @returns {JSX}
   */
  render() {
    const {
      calories,
      cookMinutes,
      ingredients,
      preparationMinutes,
      steps,
      sections,
      tipDelicioso,
      totalMinutes,
      yield: portion,
    } = this.props;
    const { isVisible } = this.state;

    const hasPortion = exists(portion);
    const hasPreparationTime = exists(preparationMinutes);
    const hasCookMinutes = exists(cookMinutes);
    const hasTotalMinutes = exists(totalMinutes);
    const hasCalories = exists(calories);

    const portionAndTime = (hasPortion || hasPreparationTime) && (
      <p>
        {hasPortion && (
          <Fragment>
            <b>{localization.get('servings')}:</b> {portion}
            {(hasPreparationTime || hasCookMinutes || hasTotalMinutes) && <br />}
          </Fragment>
        )}
        {hasPreparationTime && (
          <Fragment>
            <b>{localization.get('preparationTime')}:</b>{' '}
            {localization.get('preparationTimeValue', { locals: { preparationMinutes } })}
            {(hasCookMinutes || hasTotalMinutes) && <br />}
          </Fragment>
        )}
        {hasCookMinutes && (
          <Fragment>
            <b>{localization.get('cookingTime')}:</b>{' '}
            {localization.get('cookingTimeValue', { locals: { cookMinutes } })}
            {hasTotalMinutes && <br />}
          </Fragment>
        )}
        {hasTotalMinutes && (
          <Fragment>
            <b>{localization.get('totalMinutes')}:</b>{' '}
            {localization.get('totalMinutesValue', { locals: { totalMinutes } })}
            {hasCalories && <br />}
          </Fragment>
        )}
        {hasCalories && (
          <Fragment>
            <b>{localization.get('calories')}:</b>{' '}
            {localization.get('caloriesValue', { locals: { calories } })}
          </Fragment>
        )}
      </p>
    );

    const ingredientsList = this.itemsList(ingredients, localization.get('ingredients'));
    const stepsList = this.itemsList(steps, localization.get('preparation'), 'ol');
    const sectionsList = isValidArray(sections) && (
      <Fragment>
        <p>
          <b>{localization.get('preparation')}:</b>
        </p>
        {sections.map(
          section => isValidObject(section) && this.itemsList(section.steps, section.name, 'ol')
        )}
      </Fragment>
    );

    const ingredientsBox = isValidArray(ingredients) && (
      <div className={classnames(Styles.ingredientsBox, { [Styles.visible]: isVisible })}>
        <TooltipButton
          cta="Ingredientes"
          align="right"
          placement="top-right"
          theme={getTheme(Store)}
          icon="ingredients"
          overlay
        >
          <div className={Styles.ingredients}>
            {ingredients.map((item, idx) => (
              <p className="uvs-font-a-bold" key={getUniqKey(idx)}>
                {item}
              </p>
            ))}
          </div>
        </TooltipButton>
      </div>
    );

    const tip = exists(tipDelicioso) && (
      <p>
        <b>{localization.get('tipDelicioso')}:</b>
        <br />
        {tipDelicioso}
      </p>
    );

    const recipeAd = (
      <div className="uvs-ad-full-width">{adHelper.getAd(AdTypes.RECIPE_INLINE_AD)}</div>
    );

    return (
      <Fragment>
        {portionAndTime}
        {ingredientsList}
        {recipeAd}
        {stepsList}
        {sectionsList}
        {tip}
        {ingredientsBox}
      </Fragment>
    );
  }
}

/**
 * propTypes
 * @property {number} calories - recipe calories
 * @property {number} cookMinutes - recipe cooking duration
 * @property {array} ingredients - recipe ingredients
 * @property {number} preparationMinutes - preparation time of recipe
 * @property {array} steps - steps to prepare the recipe
 * @property {array} section - the deep steps to prepare the recipe
 * @property {string} tipDelicioso - delicioso's tips
 * @property {number} totalMinutes - total time of recipe
 * @property {string} yield - portions of recipe
 * @property {function} isInViewportCallback - set the statec when article is visible
 */
ArticleRecipe.propTypes = {
  calories: PropTypes.number,
  cookMinutes: PropTypes.number,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  preparationMinutes: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
  sections: PropTypes.arrayOf(PropTypes.string),
  tipDelicioso: PropTypes.string,
  totalMinutes: PropTypes.number,
  yield: PropTypes.string,
  isInViewportCallback: PropTypes.func,
};

export default ArticleRecipe;
