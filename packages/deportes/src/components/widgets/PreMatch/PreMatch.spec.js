import React from 'react';
import { shallow, mount } from 'enzyme';

import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';

import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import data from '../../../utils/mocks/prematch.json';
import PreMatch from '.';

jest.mock('../../utils/SportApiProvider', () => jest.fn());

const getPr = jest.fn();
let prematchData;
let propsError;

describe('PreMatch tests', () => {
  beforeEach(() => {
    prematchData = preMatchExtractor(data);
    propsError = {
      getPreMatch: () => {},
      data: { error: true },
    };
  });
  it('should renders as expected', () => {
    const wrapper = shallow(<PreMatch getPreMatch={() => {}} data={prematchData} />);
    expect(wrapper.find('.prematch')).toHaveLength(1);
  });
  it('should renders ad type from widget settings', () => {
    const settings = {
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(
      <PreMatch
        data={prematchData}
        getPreMatch={getPr}
        settings={settings}
      />
    );
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });
  it('should calls getPreMatch in when it mounts', () => {
    const wrapper = shallow(<PreMatch getPreMatch={getPr} data={prematchData} />);
    wrapper.instance().componentDidMount();
    expect(getPr).toHaveBeenCalled();
  });
  it('should not call getPrematch if it does not exist', () => {
    const wrapper = shallow(<PreMatch data={prematchData} />);
    expect(wrapper.instance().props.getPreMatch).toEqual(undefined);
  });
  it('renders error message if error received', () => {
    const wrapper = shallow(<PreMatch {...propsError} />);
    expect(wrapper.html()).toBeNull();
  });
  it('should register nav item if have context and available data', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <PreMatch data={prematchData} getPreMatch={getPr} />
      </SoccerMatchNavContext.Provider>
    );
    expect(wrapper.find('.prematch')).toHaveLength(1);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });
});
