import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import data from '../../__mocks__/squareCard';
import ScoreCardBadge from '.';

describe('ScoreCardBadge', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <ScoreCardBadge />,
      div
    );
  });
  it('renders correctly with valid props for large', () => {
    const wrapper = mount(
      <ScoreCardBadge
        {...data[10]}
        size={LARGE}
      />
    );
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveLength(1);
    expect(wrapper.find('Label')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge').prop('size')).toBe(LARGE);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('left', '24px');
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('top', '52%');
  });
  it('renders correctly with valid props for large with flag mvp', () => {
    const wrapper = mount(
      <ScoreCardBadge
        {...data[10]}
        size={LARGE}
        isWorldCupMVP
      />
    );
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <ScoreCardBadge
        {...data[10]}
        size={MEDIUM}
      />
    );
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveLength(1);
    expect(wrapper.find('Label')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('left', '16px');
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('top', '48%');
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(
      <ScoreCardBadge
        {...data[10]}
        size={SMALL}
      />
    );
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveLength(1);
    expect(wrapper.find('Label')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge').prop('size')).toBe(SMALL);
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('left', '8px');
    expect(wrapper.find('ScoreCardBadge__Badge')).toHaveStyleRule('top', '35%');
  });
});
