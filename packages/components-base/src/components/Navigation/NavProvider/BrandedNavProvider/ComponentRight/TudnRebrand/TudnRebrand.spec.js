import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, shallow } from 'react-redux';
import { mount } from 'enzyme';

import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import TudnRebrand from '.';

const store = configureStore();

/**
 * Create a new makeTudnRebrand
 * @param {Object} props - props
 * @param {function} createType - the creation type (mount/shallow)
 * @returns {JSX}
 */
const makeTudnRebrand = (props = {}, createType = shallow) => {
  const element = (
    <Provider store={store}>
      <TudnRebrand {...props} />
    </Provider>
  );
  return createType(element);
};

describe('UniNow test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = (
      <Provider store={store}>
        <TudnRebrand />
      </Provider>
    );
    ReactDOM.render(element, div);
  });
  it('should render uninow and prendetv buttons', () => {
    const wrapper = makeTudnRebrand({}, mount);
    expect(wrapper.find('TudnRebrand__MatchesWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnRebrand__VixLogoWrapper')).toHaveLength(1);
    const linkProps = wrapper.find('Link').at(1);
    expect(linkProps.props().href).toBe(
      'https://vix.com/es/canales?utm_source=univision&utm_medium=internal_referral&utm_campaign=evergreen&utm_content=0&utm_term=top_nav&utm_keyword=0&ko_click_id=ko_mirbv8s4he6a7wwip'
    );
  });
  it('should track click on vix', () => {
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeTudnRebrand({}, mount);
    const vixLink = wrapper.find('Link').at(1);
    vixLink.simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'topnav-header-prendetv',
    }));
  });

  it('should track click on partidos', () => {
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeTudnRebrand({}, mount);
    const vixLink = wrapper.find('Link').at(0);
    vixLink.simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'topnav-header-partidos',
      destination_url: '/futbol/partidos-de-futbol-para-hoy-en-vivo'
    }));
  });

  it('should track click on partidos for mx', () => {
    jest.spyOn(pageSelectors, 'userLocationSelector').mockReturnValue('MX');
    const trackSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeTudnRebrand({}, mount);
    const vixLink = wrapper.find('Link').at(0);
    vixLink.simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'topnav-header-partidos',
      destination_url: '/mx/futbol/partidos-de-futbol-para-hoy-en-vivo'
    }));
  });

  it('should have the url hoy partidos and correct color green', () => {
    store.dispatch(setPageData({ data: { uri: '/futbol/partidos-de-futbol-para-hoy-en-vivo' } }));
    const wrapper = makeTudnRebrand({}, mount);
    const tudnrebrand = wrapper.find('TudnRebrand__PartidosText');
    expect(tudnrebrand.props().isMatchesActive).toBe(true);
    expect(wrapper.find('Icon').at(0).prop('stroke')).toBe('#00ffb0');
  });
  it('shouldn`t have the url hoy partidos and the original color', () => {
    store.dispatch(setPageData({ data: { uri: '/liveblog-sigue-en-vivo-todos-los-resultados-del-deporte-mundial' } }));
    const wrapper = makeTudnRebrand({}, mount);
    const tudnrebrand = wrapper.find('TudnRebrand__PartidosText');
    expect(tudnrebrand.props().isMatchesActive).toBe(false);
    expect(wrapper.find('Icon').at(0).prop('stroke')).toBe('#fcfcfb');
  });
});
