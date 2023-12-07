import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import ArticleRecipe from '.';

const props = {
  calories: 10,
  cookMinutes: 4,
  ingredients: ['sugar', 'spice', 'all things nice'],
  preparationMinutes: 8,
  steps: ['mix', 'shake', 'not stirred'],
  tipDelicioso: 'better served cold',
  totalMinutes: 15,
  yield: 16,
  isInViewportCallback: jest.fn(() => true),
};
let localizationSpy;

/** @test {ArticleRecipe} */
describe('ArticleRecipe ', () => {
  beforeEach(() => {
    localizationSpy = jest.spyOn(localization, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArticleRecipe />, div);
  });
  it('should render with props', () => {
    const wrapper = mount(<ArticleRecipe {...props} />);
    const firstParagraph = wrapper
      .find('p')
      .first()
      .html();
    const ingredientList = wrapper.find('ul').html();
    const stepList = wrapper.find('ol').html();
    const tipParagraph = wrapper
      .find('p')
      .at(3)
      .html();
    const ingredientesBox = wrapper.find('.ingredientsBox').html();

    expect(firstParagraph).toContain(props.yield);
    expect(firstParagraph).toContain(props.preparationMinutes);
    expect(firstParagraph).toContain(props.totalMinutes);
    expect(firstParagraph).toContain(props.cookMinutes);
    expect(localizationSpy).toHaveBeenCalledWith('caloriesValue', {
      locals: { calories: props.calories },
    });
    expect(ingredientList).toContain(props.ingredients[0]);
    expect(ingredientList).toContain(props.ingredients[1]);
    expect(ingredientList).toContain(props.ingredients[2]);
    expect(stepList).toContain(props.steps[0]);
    expect(stepList).toContain(props.steps[1]);
    expect(stepList).toContain(props.steps[2]);
    expect(tipParagraph).toContain(props.tipDelicioso);
    expect(ingredientesBox).toContain(props.ingredients[0]);
    expect(ingredientesBox).toContain(props.ingredients[1]);
    expect(ingredientesBox).toContain(props.ingredients[2]);
  });
  it('should render without calories', () => {
    const props2 = Object.assign({}, props, { calories: undefined });
    const wrapper = shallow(<ArticleRecipe {...props2} />);
    const firstParagraph = wrapper
      .find('p')
      .first()
      .html();

    expect(localizationSpy).not.toHaveBeenCalledWith('caloriesValue', {
      locals: { calories: props.calories },
    });
    expect(firstParagraph).toContain(props.yield);
    expect(firstParagraph).toContain(props.preparationMinutes);
    expect(firstParagraph).toContain(props.cookMinutes);
    expect(firstParagraph).toContain(props.totalMinutes);
  });
  it('should render without preparation time and cooking time', () => {
    const props2 = Object.assign({}, props, {
      preparationMinutes: undefined,
      cookMinutes: undefined,
    });
    const wrapper = shallow(<ArticleRecipe {...props2} />);
    const firstParagraph = wrapper
      .find('p')
      .first()
      .html();

    expect(localizationSpy).toHaveBeenCalledWith('caloriesValue', {
      locals: { calories: props.calories },
    });
    expect(firstParagraph).toContain(props.yield);
    expect(firstParagraph).not.toContain(props.preparationMinutes);
    expect(firstParagraph).not.toContain(props.cookMinutes);
    expect(firstParagraph).toContain(props.totalMinutes);
  });
  it('should render without cooking time', () => {
    const props2 = Object.assign({}, props, { cookMinutes: undefined });
    const wrapper = shallow(<ArticleRecipe {...props2} />);
    const firstParagraph = wrapper
      .find('p')
      .first()
      .html();

    expect(localizationSpy).toHaveBeenCalledWith('caloriesValue', {
      locals: { calories: props.calories },
    });
    expect(firstParagraph).toContain(props.yield);
    expect(firstParagraph).toContain(props.preparationMinutes);
    expect(firstParagraph).not.toContain(props.cookMinutes);
    expect(firstParagraph).toContain(props.totalMinutes);
  });
  it('should render with section steps', () => {
    const sectionSteps = ['mix', 'shake', 'not stirred'];
    const props2 = Object.assign({}, props, {
      steps: null,
      sections: [
        {
          name: 'Sauce',
          steps: sectionSteps,
        },
      ],
    });
    const wrapper = mount(<ArticleRecipe {...props2} />);
    const stepEl = wrapper.find('p').at(3);
    const stepListEl = wrapper.find('ol');
    const stepList = stepListEl.html();

    expect(stepEl.html()).toContain('Sauce');
    expect(stepList).toContain(sectionSteps[0]);
    expect(stepList).toContain(sectionSteps[1]);
    expect(stepList).toContain(sectionSteps[2]);
  });
  it('should set state if setVisible is called', () => {
    const wrapper = shallow(<ArticleRecipe {...props} />);
    const instance = wrapper.instance();
    instance.setVisible(true);
    expect(wrapper.state('isVisible')).toBe(true);
  });
});
