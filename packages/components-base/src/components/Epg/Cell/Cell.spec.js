import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Cell from '.';

jest.useFakeTimers('modern');

const props = {
  startTime: '06 Dec 2021 17:00:00 EST',
  endTime: '06 Dec 2021 17:01:00 EST',
  title: 'foo',
};

/** @test {Cell} */
describe('Cell Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(Cell), div);
  });
  it('should render correctly', () => {
    const wrapper = mount(<Cell {...props} />);
    expect(wrapper.find('Cell__Wrapper')).toHaveLength(1);
  });
  it('should render correctly for live cells', () => {
    const wrapper = mount(<Cell {...props} isLive isFirstCard />);

    act(() => {
      jest.runTimersToTime(61000);
    });
    wrapper.update();

    expect(wrapper.find('Cell__LiveDot')).toHaveLength(1);
  });
});
