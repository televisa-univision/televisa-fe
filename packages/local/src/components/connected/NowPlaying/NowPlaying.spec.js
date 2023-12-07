import React from 'react';
import { shallow } from 'enzyme';

import RadioPerformance from '../../widgets/abacast/RadioPerformance/RadioPerformance';
import { NowPlayingComponent } from './NowPlaying';

jest.mock('../../widgets/abacast/RadioPerformance/RadioPerformance', () => jest.fn());
jest.mock('@univision/fe-commons/dist/store/actions/player-actions', () => ({}));

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getBrandable: jest.fn(),
}));

let props;
beforeEach(() => {
  props = {
    initRadio: jest.fn(),
    playStream: jest.fn(),
    pauseStream: jest.fn(),
    playing: true,
  };
});
/** @test {NowPlayingComponent} */
describe('NowPlayingComponent Spec', () => {
  it('makes request to Store after mount', () => {
    const wrapper = shallow(<NowPlayingComponent {...props} />);

    wrapper.instance().componentDidMount();
    expect(props.initRadio).toBeCalledWith();
  });

  it('makes request to Store after mount', () => {
    const wrapper = shallow(<NowPlayingComponent {...props} />);

    wrapper.instance().componentDidMount();
    expect(props.initRadio).toBeCalledWith();
  });

  it('renders <AbacastPerformance />', () => {
    const wrapper = shallow(<NowPlayingComponent {...props} />);
    expect(wrapper.find(RadioPerformance)).toHaveLength(1);
  });
});
