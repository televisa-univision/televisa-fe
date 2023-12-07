import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import Features from '../../../config/features';
import BreakPoint from '../../../utils/breakpoint/breakPointMediator';
import DFPAd from './DFPAd';
import { LAS_ESTRELLAS, UNIVISION } from '../../../constants/pageCategories';

const store = {
  getState: jest.fn(() => ({
    site: UNIVISION,
    page: {
      device: 'mobile',
    },
  })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
};

/** @test {Ad} */
describe('DFPAd ', () => {
  const sizeMapping = {
    desktop: [[728, 90], [970, 90], [970, 250]],
    tablet: [[728, 90]],
    mobile: [[320, 50]],
  };
  const AdComponent = (
    <DFPAd
      sizeMapping={sizeMapping}
    />
  );

  const special = {
    isSpecialAd: true,
  };

  const WithoutSkeleton = (
    <DFPAd
      sizeMapping={{
        desktop: [[0, 0]],
        tablet: [[0, 0]],
        mobile: [[0, 0]],
      }}
    />
  );

  beforeEach(() => {
    jest.useFakeTimers();
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    BreakPoint.value = 'md';
    const div = document.createElement('div');
    ReactDOM.render(AdComponent, div);
  });

  it('should render ad wrapper after ComponentDidMount', () => {
    const wrapper = mount(AdComponent);
    expect(wrapper.find('div.wrapper')).toHaveLength(1);
  });

  it('should render label after ComponentDidMount', () => {
    const wrapper = mount(AdComponent);
    expect(wrapper.find('span.label')).toHaveLength(1);
  });

  it('should render special ads', () => {
    const wrapper = mount(<DFPAd {...special} />);
    expect(wrapper.find('div.special')).toHaveLength(1);
  });

  it('should render skeleton', () => {
    const wrapper = mount(<Provider store={store}>{AdComponent}</Provider>);
    expect(wrapper.find('div.uvs-skeleton')).toHaveLength(1);
  });

  it('should not render skeleton is sizeMapping is is invalid', () => {
    const wrongSizeMapping = {
      mobile: [],
    };
    const wrapper = mount(
      <Provider store={store}>
        <DFPAd sizeMapping={wrongSizeMapping} />
      </Provider>
    );
    expect(wrapper.find('div.uvs-skeleton')).toHaveLength(0);
  });

  it('should not render skeleton if the height it\'s 0', () => {
    const wrapper = mount(WithoutSkeleton);
    expect(wrapper.find('div.uvs-skeleton')).toHaveLength(0);
  });

  it('should return null if sensitive content', () => {
    jest.spyOn(Features.content, 'isSensitive').mockImplementation(() => true);
    const wrapper = shallow(AdComponent);
    expect(wrapper.getElement()).toBeNull();
  });

  it('should call onRegisterSlot callback', () => {
    const onRegisterSlotMock = jest.fn();
    mount(
      <Provider store={store}>
        <DFPAd onRegisterSlot={onRegisterSlotMock} sizeMapping={sizeMapping} />
      </Provider>
    );
    jest.runAllTimers();
    expect(onRegisterSlotMock).toHaveBeenCalledWith(expect.stringMatching('div-gpt-ad-*'));
  });

  it('should call idGenerator for televisa site', () => {
    const onRegisterSlotMock = jest.fn();
    const tempStore = {
      getState: jest.fn(() => ({
        page: {
          site: LAS_ESTRELLAS,
        },
      })),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };

    mount(
      <Provider store={tempStore}>
        <DFPAd onRegisterSlot={onRegisterSlotMock} sizeMapping={sizeMapping} />
      </Provider>
    );
    jest.runAllTimers();
    expect(onRegisterSlotMock).toHaveBeenCalledWith(expect.stringMatching('slot-*'));
  });

  it('should register slot if component get updated by change of props', () => {
    process.env.APP_VERSION = '2';
    const tempStore = {
      getState: jest.fn(() => ({
        page: {
          device: 'mobile',
        },
      })),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };
    const onRegisterSlotMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <DFPAd onRegisterSlot={onRegisterSlotMock} sizeMapping={sizeMapping} />
      </Provider>
    );
    jest.runAllTimers();
    expect(onRegisterSlotMock).toHaveBeenCalledTimes(1);
    wrapper.setProps({ store: tempStore });
    jest.runAllTimers();
    expect(onRegisterSlotMock).toHaveBeenCalledTimes(2);
  });

  it('should work as expected in SSR.', () => {
    const oldWindow = global.window;
    delete global.window;
    const wrapper = shallow(<DFPAd />);
    expect(wrapper.state('id')).toBeDefined();
    global.window = oldWindow;
  });
});
