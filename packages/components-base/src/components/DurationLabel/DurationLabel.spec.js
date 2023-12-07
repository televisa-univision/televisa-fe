import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import DurationLabel from '.';

const defaultProps = {
  duration: '30:02',
  position: 'bottomRight',
};

/** @test {DurationLabel} */
describe('Duration Label Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(DurationLabel), div);
  });
  it('should render a duration', () => {
    defaultProps.durationInImage = true;
    defaultProps.showInPlaylist = false;
    const wrapper = shallow(<DurationLabel contentProps={defaultProps} />);
    expect(wrapper.text()).toContain(defaultProps.duration);
  });
  it('should render a duration', () => {
    defaultProps.durationInImage = false;
    defaultProps.showInPlaylist = true;
    const wrapper = shallow(<DurationLabel contentProps={defaultProps} />);
    expect(wrapper.text()).toContain(defaultProps.duration);
  });
  it('should return null if `duration` is empty', () => {
    const wrapper = shallow(<DurationLabel contentProps="" />);
    expect(wrapper.type()).toBeNull();
  });
  it('should return null if `duration` is not a String', () => {
    const wrapper = shallow(<DurationLabel contentProps={{}} />);
    expect(wrapper.type()).toBeNull();
  });
});
