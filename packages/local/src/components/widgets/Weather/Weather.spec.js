import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import LayerNavigation from '@univision/shared-components/dist/components/LayerNavigation';

import Weather from '.';
import mockData from './mockData.json';

import {
  NoticiasCardWeatherMaps,
  NoticiasCardWeatherGraphics,
  NoticiasCardWeatherConditions,
  NoticiasCardTropicalWeatherConditions,
} from './data';

let pageData;

beforeEach(() => {
  pageData = {
    data: {
      brandable: mockData.data.brandable,
      feedGeneratedAt: mockData.data.feedGeneratedAt,
    },
  };
  Store.dispatch(setPageData(pageData));
});

/** @test {Weather} */

/**
 * Weather Maps
 */
describe('Weather Maps', () => {
  let weatherMapsProps;

  beforeEach(() => {
    weatherMapsProps = {
      type: NoticiasCardWeatherMaps,
      sponsor: {
        name: 'Honda',
        link: '#',
        logo: 'https://cdn2.uvnimg.com/2b/36/ed77ba9d4399a153eb9b637c3fe9/image1.jpeg',
      },
      withLayerNav: true,
    };
  });

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...weatherMapsProps} />, div);
  });

  it('should render the component with layer navigation', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    expect(wrapper.find(LayerNavigation).length).toBe(1);
  });

  it('should render the component w/o layer nav if "withLayerNav" is not passed', () => {
    const { withLayerNav, ...props } = weatherMapsProps;

    const wrapper = shallow(<Weather {...props} />);
    expect(wrapper.find(LayerNavigation).length).toBe(0);
  });

  // Render Null Checks
  it('should render nothing if brandable does not exist', () => {
    pageData = {
      data: {
        ...pageData.data,
        brandable: null,
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should still render if feedGeneratedAt does not exist', () => {
    pageData = {
      data: {
        ...pageData.data,
        feedGeneratedAt: null,
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    expect(wrapper.find(LayerNavigation).length).toBe(1);
  });

  it('should render nothing if type does not exist', () => {
    const invalidProps = {
      type: {},
    };
    const wrapper = shallow(<Weather {...invalidProps} />);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should render nothing if uri is not a string', () => {
    pageData = {
      data: {
        ...pageData.data,
        brandable: {
          tvStation: {
            uri: '',
            call: 'WLTV',
          },
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should update the state when the layer nav menu is opened', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    const layerNavigationWrapper = wrapper.find(LayerNavigation).dive();

    layerNavigationWrapper
      .find('LayerNavigation__BottomBarContainer')
      .at(0)
      .props()
      .onPress();

    expect(wrapper.instance().state.menuOpen).toBe(true);
  });

  it('should update state if no layer nav is present and an option is selected', () => {
    const { withLayerNav, ...props } = weatherMapsProps;
    const wrapper = shallow(<Weather {...props} />);

    wrapper
      .find('.no-gutters Clickable')
      .at(1)
      .simulate('click');
    expect(wrapper.instance().state.activeOption).toEqual(NoticiasCardWeatherMaps.options[1]);
  });

  // Options
  it('should render all available options when nav is open', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    wrapper.setState({ menuOpen: true });
    const layerNavigationWrapper = wrapper.find(LayerNavigation).dive();

    expect(layerNavigationWrapper.find('LayerNavigation__OptionIcon').length).toBe(6);
  });

  it('should update state when an option is selected', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    wrapper.setState({ menuOpen: true });
    const layerNavigationWrapper = wrapper.find(LayerNavigation).dive();

    // Simulate click on third widget option
    layerNavigationWrapper
      .find('LayerNavigation__Option')
      .at(3)
      .props()
      .onPress();

    expect(wrapper.instance().state.activeOption).toEqual(NoticiasCardWeatherMaps.options[3]);
  });

  it('should close the layer nav when an option is clicked', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    wrapper.setState({ menuOpen: true });
    const layerNavigationWrapper = wrapper.find(LayerNavigation).dive();

    // Simulate click on third widget option
    layerNavigationWrapper
      .find('LayerNavigation__Option')
      .at(3)
      .props()
      .onPress();

    expect(wrapper.instance().state.menuOpen).toBe(false);
  });

  it('should close the layer nav even when the active option is clicked', () => {
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    wrapper.setState({ menuOpen: true });
    const layerNavigationWrapper = wrapper.find(LayerNavigation).dive();

    // Simulate click on third widget option
    layerNavigationWrapper
      .find('LayerNavigation__Option')
      .at(0)
      .props()
      .onPress();

    expect(wrapper.instance().state.menuOpen).toBe(false);
  });

  // Temporary Exceptions
  it('should render if city is listed in the exceptions list', () => {
    const uri = '/san-francisco/kdtv';
    const result = { city: 'AreadelaBahia', call: 'KDTV' };

    pageData = {
      data: {
        ...pageData.data,
        brandable: {
          tvStation: {
            uri,
          },
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    const getLocalMarket = wrapper.instance().getLocalMarketFromUri;
    wrapper.instance().getLocalMarketFromUri(uri);
    expect(getLocalMarket(uri)).toEqual(result);
  });

  it('should render if call is listed in the exceptions list', () => {
    const uri = '/atlanta/wuvg';
    const result = { city: 'Atlanta', call: 'WUGV' };

    pageData = {
      data: {
        ...pageData.data,
        brandable: {
          tvStation: {
            uri,
          },
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    const getLocalMarket = wrapper.instance().getLocalMarketFromUri;
    wrapper.instance().getLocalMarketFromUri(uri);
    expect(getLocalMarket(uri)).toEqual(result);
  });

  it('should render for BEX stations', () => {
    const uri = '/local/atlanta-wuvg/';
    const result = { city: 'Atlanta', call: 'WUGV' };

    pageData = {
      data: {
        ...pageData.data,
        brandable: {
          tvStation: {
            uri,
          },
        },
      },
    };
    Store.dispatch(setPageData(pageData));
    const wrapper = shallow(<Weather {...weatherMapsProps} />);
    const getLocalMarket = wrapper.instance().getLocalMarketFromUri;
    wrapper.instance().getLocalMarketFromUri(uri);
    expect(getLocalMarket(uri)).toEqual(result);
  });
});

/**
 * Weather Graphics
 */
describe('Weather Graphics', () => {
  const props = {
    type: NoticiasCardWeatherGraphics,
    withLayerNav: true,
  };

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...props} />, div);
  });

  it('should render the component w/o layer nav without crashing', () => {
    const { withLayerNav, ...restProps } = props;
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...restProps} />, div);
  });
});

/**
 * Weather Conditions
 */
describe('Weather Conditions', () => {
  const props = {
    type: NoticiasCardWeatherConditions,
    withLayerNav: true,
  };

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...props} />, div);
  });

  it('should render the component w/o layer nav without crashing', () => {
    const { withLayerNav, ...restProps } = props;
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...restProps} />, div);
  });
});

/**
 * Tropical Weather Conditions
 */
describe('Tropical Weather Conditions', () => {
  const props = {
    type: NoticiasCardTropicalWeatherConditions,
    withLayerNav: true,
  };

  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...props} />, div);
  });

  it('should render the component w/o layer nav without crashing', () => {
    const { withLayerNav, ...restProps } = props;
    const div = document.createElement('div');
    ReactDOM.render(<Weather {...restProps} />, div);
  });
});
