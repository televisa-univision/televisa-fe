/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import Results from '.';
import mockApiData from '../__mocks__/data.json';

jest.mock('@univision/fe-components-base/dist/components/ContentCard', () => {
  const ContentCard = ({ children }) => <div>{children}</div>;

  return ContentCard;
});

const props = {
  results: mockApiData.data.results,
  loading: false,
};

describe('Search Page Form', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Results {...props} />, div);
  });

  it('should render the river element if results has data', () => {
    const wrapper = mount(<Results {...props} />);
    expect(wrapper.find('.river')).toHaveLength(1);
  });

  it('should not render the river element if results not has valid data', () => {
    const badResults = [null, {}];
    const wrapper = mount(<Results results={badResults} />);
    expect(wrapper.find('.river')).toHaveLength(1);
  });

  it('should render emptyResults if results has not data', () => {
    let wrapper = mount(<Results loading={false} />);
    expect(wrapper.find('.emptyResults')).toHaveLength(1);
    wrapper = shallow(<Results loading />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render an ad on river of results if the UA is mobile', () => {
    const wrapper = shallow(<Results {...props} device="mobile" />);
    expect(wrapper.find('li.ADResult')).toHaveLength(2);
  });
});
