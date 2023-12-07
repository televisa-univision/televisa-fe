import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';

import HamburgerMegaMenu from '.';
import Styles from './HamburgerMegaMenu.styles';

describe('HamburgerMegaMenu', () => {
  let setHamburgerClosedMock;
  let setHamburgerOpenMock;

  beforeEach(() => {
    setHamburgerClosedMock = jest.fn();
    setHamburgerOpenMock = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={Store}><HamburgerMegaMenu theme={{}} /></Provider>, div);
  });

  it('should render a white filled icon when branded header is black', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={{ isBrandedHeaderBlack: true }} />
      </Provider>
    );
    expect(wrapper.find('Icon').props()).toEqual(
      expect.objectContaining({
        fill: WHITE,
      })
    );
  });

  it('should render a black filled icon when branded header is white', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={{ isBrandedHeaderBlack: false }} />
      </Provider>
    );
    expect(wrapper.find('Icon').props()).toEqual(
      expect.objectContaining({
        fill: BLACK,
      })
    );
  });

  it('should call setHamburgerClosed when hamburger state is open', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu
          isHamburgerMenuOpen
          setHamburgerClosed={setHamburgerClosedMock}
          theme={{}}
        />
      </Provider>
    );

    wrapper.find('button').simulate('click');
    expect(setHamburgerClosedMock).toHaveBeenCalledTimes(1);
  });

  it('should show arrowLeft icon when MarketSelector state is open', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu
          isHamburgerMenuOpen
          isMarketSelectorOpen
          setHamburgerClosed={setHamburgerClosedMock}
          theme={{}}
        />
      </Provider>
    );
    expect(wrapper.find('Icon').props().name).toEqual('arrowLeft');
  });

  it('should call setHamburgerOpen when hamburger state is closed', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu setHamburgerOpen={setHamburgerOpenMock} theme={{}} />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(setHamburgerOpenMock).toHaveBeenCalledTimes(1);
  });

  it('should render a label when on desktop', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = mount(<Provider store={Store}><HamburgerMegaMenu theme={{}} /></Provider>);
    expect(wrapper.find('span').length).toBe(1);
  });

  it('should not render a label when on mobile', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    const wrapper = mount(<Provider store={Store}><HamburgerMegaMenu theme={{}} /></Provider>);
    expect(wrapper.find('span').length).toBe(0);
  });

  it('should render the label with close text when hamburger is open', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu isHamburgerMenuOpen theme={{}} />
      </Provider>
    );
    expect(wrapper.find('span').text()).toBe('Cerrar');
  });

  it('should render the sections text when hamburger is closed', () => {
    Store.dispatch(setPageData({ device: 'desktop' }));
    const wrapper = mount(<Provider store={Store}><HamburgerMegaMenu theme={{}} /></Provider>);
    expect(wrapper.find('span').text()).toBe('Secciones');
  });

  it('should add a left margin when disablePrendeTvButton flag is true', () => {
    const theme = {
      disablePrendeTvButton: true,
    };
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={theme} />
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu__Button')).toHaveStyleRule('margin-left', '18px');
  });

  it('should add a reduced left margin when disablePrendeTvButton flag is false', () => {
    const theme = {
      disablePrendeTvButton: false,
    };
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={theme} />
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu__Button')).toHaveStyleRule('margin-left', '5px');
  });

  it('should show menu label', () => {
    const theme = {
      disablePrendeTvButton: false,
    };
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={theme} isDesktop />
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu__Label')).toHaveLength(1);
  });
  it('should not show menu label', () => {
    const theme = {
      disablePrendeTvButton: false,
    };
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={Store}>
        <HamburgerMegaMenu theme={theme} isDesktop />
      </Provider>
    );
    expect(wrapper.find('HamburgerMegaMenu__Label')).toHaveLength(1);
  });

  describe('styles', () => {
    it('should have a white label when the variant is dark', () => {
      const styles = Styles.label({ variant: 'dark' });
      expect(styles).toContain('color:');
      expect(styles).toContain(WHITE);
    });

    it('should have a black label when the variant is white', () => {
      const styles = Styles.label({ variant: 'white' });
      expect(styles).toContain('color:');
      expect(styles).toContain(BLACK);
    });

    it('should have a black background when the variant is dark', () => {
      const styles = Styles.button({ variant: 'dark' });
      expect(styles).toContain('align-items:center;background-color:');
      expect(styles).toContain(BLACK);
    });

    it('should have a white background when the variant is white', () => {
      const styles = Styles.button({ variant: 'white' });
      expect(styles).toContain('align-items:center;background-color:');
      expect(styles).toContain(WHITE);
    });
  });
});
