import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {
  NETWORK_UNIMAS,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_DIGITAL,
} from '@univision/fe-commons/dist/constants/tvGuide';
import TvGuideNav from '.';

const channels = [
  NETWORK_DIGITAL,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_UNIMAS,
];

let props;
let emptyProps;

beforeEach(() => {
  props = {
    onPress: jest.fn(),
    channels,
  };
  emptyProps = {
    channels: [],
  };
});

describe('TvGuideNav tests', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TvGuideNav />, div);
  });
  it('renders as expected', () => {
    const wrapper = shallow(<TvGuideNav {...props} />);
    expect(wrapper.find('.navWrapper')).toHaveLength(1);
    expect(wrapper.find('ChannelButton')).toHaveLength(5);
  });
  it('should render empty if filter array is empty', () => {
    const wrapper = shallow(<TvGuideNav {...emptyProps} />);
    expect(wrapper.find('.navWrapper')).toHaveLength(0);
  });
  it('should call channelCallback when ChannelButton is preseed', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(<TvGuideNav {...props} onPress={onPressMock} />);
    wrapper.find('ChannelButton').first().props().onPress();
    expect(onPressMock).toBeCalled();
  });
});
