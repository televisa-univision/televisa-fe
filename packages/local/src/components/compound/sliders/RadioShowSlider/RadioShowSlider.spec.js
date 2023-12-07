import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import radioShowSliderMock from '../../../../utils/mocks/radioShowSliderMock.json';
import RadioShowSlider from './RadioShowSlider';

const content = radioShowSliderMock.data.widgets[0].contents;

/** @test {RadioShowSlider} */
describe('RadioShowSlider Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <RadioShowSlider content={content} />,
      div
    );
  });

  it('should render right amount of children', () => {
    const wrapper = shallow(<RadioShowSlider content={content} />);
    expect(wrapper.children().length).toBe(content.length);
  });

  it('should correct number of items items', () => {
    const wrapper = shallow(<RadioShowSlider content={content} />);
    expect(wrapper.find('.item')).toHaveLength(content.length);
  });
});
