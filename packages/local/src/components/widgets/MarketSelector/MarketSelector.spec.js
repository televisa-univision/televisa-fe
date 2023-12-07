import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import { CURRENT_LOCAL_MARKET } from '@univision/fe-commons/dist/constants/personalization';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import { trackNavigationClick } from '@univision/fe-components-base/dist/components/Navigation/MegaMenu/helpers';
import { fetchLocalMarketContent, setCurrentMarketByLocation } from '@univision/fe-commons/dist/store/actions/local/local-actions';
import MarketSelector from '.';
import Styles from './MarketSelector.styles';

jest.mock('@univision/fe-components-base/dist/components/Navigation/MegaMenu/helpers', () => ({
  trackNavigationClick: jest.fn(),
}));

describe('MarketSelector', () => {
  let setMarketSelectorOpenMock;
  let setMarketSelectorClosedMock;

  beforeEach(() => {
    setMarketSelectorOpenMock = jest.fn();
    setMarketSelectorClosedMock = jest.fn();
  });

  const linksMock = [
    {
      href: '/local/san-francisco-kdtv',
      name: 'Área de la Bahía',
      parent: 'Tu ciudad',
      site: 'univision',
      target: '_self',
    },
    {
      href: '/local/arizona-ktvw',
      name: 'Arizona',
      parent: 'Tu ciudad',
      site: 'univision',
      target: '_self',
    },
  ];

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarketSelector
      links={linksMock}
    />, div);
  });

  it('should call setMarketSelectorOpen when MarketSelector state is closed', () => {
    const wrapper = mount(
      <MarketSelector
        links={linksMock}
        isMarketSelectorOpen={false}
        setMarketSelectorClosed={setMarketSelectorClosedMock}
        setMarketSelectorOpen={setMarketSelectorOpenMock}
        fetchLocalMarketContent={fetchLocalMarketContent}
        setCurrentMarketByLocation={setCurrentMarketByLocation}
      />
    );
    wrapper.find('MarketSelector__MarketButton').simulate('click');
    expect(setMarketSelectorOpenMock).toHaveBeenCalledTimes(1);
  });

  it('should call setMarketSelectorClosed width AnimatedModalBackground when MarketSelector state is open (Desktop)', () => {
    const wrapper = shallow(<MarketSelector
      links={linksMock}
      setMarketSelectorClosed={setMarketSelectorClosedMock}
      setCurrentMarketByLocation={setCurrentMarketByLocation}
      fetchLocalMarketContent={fetchLocalMarketContent}
      isMarketSelectorOpen
      isDesktop
    />);
    wrapper.find('AnimatedModalBackground').simulate('click');
    expect(setMarketSelectorClosedMock).toHaveBeenCalledTimes(1);
  });

  it('should get marketCurrent for the each link', () => {
    const mockFN = jest.fn();
    const wrapper = mount(<MarketSelector
      links={linksMock}
      setCurrentMarketByLocation={mockFN}
      setMarketSelectorClosed={setMarketSelectorClosedMock}
      fetchLocalMarketContent={fetchLocalMarketContent}
      isMarketSelectorOpen
    />);
    wrapper.find('MarketSelector__LinkMenu').first().simulate('click');
    expect(mockFN).toBeCalledWith('KDTV');
  });

  describe('selecting MarketTopicBar', () => {
    describe('when there is no market', () => {
      it('calls tracker with local-list', () => {
        LocalStorage.set(CURRENT_LOCAL_MARKET, null);
        const wrapper = mount(<MarketSelector
          fetchLocalMarketContent={fetchLocalMarketContent}
          links={linksMock}
          isMarketSelectorOpen
          setMarketSelectorClosed={setMarketSelectorClosedMock}
          setMarketSelectorOpen={setMarketSelectorOpenMock}
        />);
        wrapper.find('.uvs-font-c-bold').at(0).simulate('click');
        expect(trackNavigationClick).toBeCalledWith('local-list');
      });
    });

    describe('when there is a market', () => {
      it('calls tracker with local-list-change', () => {
        LocalStorage.set(CURRENT_LOCAL_MARKET, 'KTVW');
        const wrapper = mount(<MarketSelector
          fetchLocalMarketContent={fetchLocalMarketContent}
          links={linksMock}
          isMarketSelectorOpen
          setMarketSelectorClosed={setMarketSelectorClosedMock}
          setMarketSelectorOpen={setMarketSelectorOpenMock}
        />);
        wrapper.find('.uvs-font-c-bold').at(0).simulate('click');
        expect(trackNavigationClick).toBeCalledWith('local-list-change');
      });
    });
  });

  describe('styles', () => {
    it('should return css by default', () => {
      const styles = Styles.marketTopicBar({ open: false });
      expect(styles).toEqual(expect.any(Array));
      expect(styles).toContain('rotate(90deg)');
    });
    it('should return css with svg of TopicBar rotate', () => {
      const styles = Styles.marketTopicBar({ open: true });
      expect(styles).toContain('rotate(-90deg)');
    });
    it('should return css when AdSkin is active', () => {
      const styles = Styles.container({ hasAdSkin: true });
      expect(styles).toContain('max-width:500px;');
    });
  });
});
