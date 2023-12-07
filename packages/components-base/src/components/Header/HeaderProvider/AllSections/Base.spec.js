import React from 'react';
import { shallow } from 'enzyme';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import Features from '@univision/fe-commons/dist/config/features';

import Search from '../../../Search';
import AllSections from './Base';
import MobileAllSections from './Mobile';
import DesktopAllSections from './Desktop';
import * as helpers from './helpers';

let props;
const sectionProps = {
  href: 'href',
  name: 'Entertainment',
  children: [
    {
      href: 'href',
      name: 'Entertainment',
      children: [
        {
          href: 'href',
          name: 'Entertainment',
        },
        {
          href: 'href',
          name: 'Entertainment',
        },
      ],
    },
    {
      href: 'href',
      name: 'Entertainment',
      children: [
        {
          href: 'href',
          name: 'Entertainment',
        },
        {
          href: 'href',
          name: 'Entertainment',
        },
      ],
    },
    {
      href: 'href',
      name: 'Entertainment',
      children: [
        {
          href: 'href',
          name: 'Entertainment',
        },
        {
          href: 'href',
          name: 'Entertainment',
        },
      ],
    },
  ],
};

jest.useFakeTimers();
jest.mock('../../../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());
jest.mock('../../../Clickable', () => jest.fn());
jest.mock('../../PrimaryNav', () => jest.fn());
jest.mock('../../SecondaryNav', () => jest.fn());

describe('Section Navigation', () => {
  let buttonUniNowSpy;

  beforeEach(() => {
    buttonUniNowSpy = jest.spyOn(Features.header, 'buttonUniNow');
  });

  describe('GlobalHeaders::AllSections', () => {
    beforeEach(() => {
      props = {
        open: false,
        onClose: jest.fn(),
        config: {
          baseUrl: '/',
          links: {
            primary: ['a', 'b', 'c'],
            secondary: [1, 2, 3],
          },
          variant: 'light',
          renderingOptions: {
            showLinks: true,
          },
        },
      };
    });

    afterAll(() => {
      jest.clearAllTimers();
    });

    it('renders as expected - desktop', () => {
      spyOn(storeHelpers, 'getDevice').and.returnValue('desktop');
      const wrapper = shallow(<AllSections {...props} />);
      expect(wrapper.find(DesktopAllSections)).toHaveLength(1);
    });

    it('renders as expected - mobile', () => {
      spyOn(storeHelpers, 'getDevice').and.returnValue('mobile');
      const wrapper = shallow(<AllSections {...props} />);
      expect(wrapper.find(MobileAllSections)).toHaveLength(1);
    });

    it('should call and track link handler', () => {
      spyOn(storeHelpers, 'getDevice').and.returnValue('desktop');

      const event = {
        target: {
          innerText: 'UNIVISION',
          getAttribute: jest.fn(() => '/univision'),
        },
        preventDefault: jest.fn(),
      };
      const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
      const wrapper = shallow(<AllSections {...props} />);
      wrapper.instance().handlerLink(event);
      jest.runOnlyPendingTimers();

      expect(trackerSpy).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          event: 'navigation_click',
          event_action: `hamburger-${event.target.innerText.toLowerCase()}`,
        })
      );

      expect(trackerSpy).toHaveBeenCalledTimes(1);
      trackerSpy.mockRestore();
    });
  });

  describe('MobileAllSections', () => {
    it('renders top-level sections as expected', () => {
      spyOn(storeHelpers, 'getDevice').and.returnValue('mobile');
      const wrapper = shallow(<MobileAllSections />);
      expect(wrapper.find('.section')).toHaveLength(21);
    });

    it('expandCollapseSection runs as expected', () => {
      const wrapper = shallow(<MobileAllSections />);
      const action = wrapper.instance().expandCollapseSection('mysection');
      action({ stopPropagation: jest.fn() });
      expect(wrapper.state('expandedSections').mysection).toBe(true);
    });

    it('adds open class when appropriate', () => {
      const wrapper = shallow(<MobileAllSections open />);
      expect(wrapper.find('.mobileHamburger.open').exists()).toBe(true);
    });

    it('should add correct itemprop when using renderSection on mobile', () => {
      const wrapper = shallow(<MobileAllSections open />);
      const section = shallow(
        wrapper.instance().renderSection({
          href: 'href',
          name: 'Entertainment',
        })
      );
      expect(section.find('Link').prop('itemProp')).toEqual('url');
    });

    it('should not add itemprop when using renderSection withou href on mobile', () => {
      const wrapper = shallow(<MobileAllSections open />);
      const section = shallow(
        wrapper.instance().renderSection({
          href: undefined,
          name: 'Entertainment',
        })
      );
      expect(section.find('Link').prop('itemProp')).toEqual(undefined);
    });

    it('should render the Search Component when the Uninow button AB test is activated.', () => {
      buttonUniNowSpy.mockReturnValue(true);
      const wrapper = shallow(<MobileAllSections open />);
      expect(wrapper.find(Search).length).toBe(1);
    });

    it('should render the Search Component when the ThemeProvider feature flag is activated', () => {
      buttonUniNowSpy.mockReturnValue(false);
      const wrapper = shallow(<MobileAllSections open />);
      expect(wrapper.find(Search).length).toBe(1);
    });

    it('renderSection adds correct expansion class', () => {
      const wrapper = shallow(<MobileAllSections open />);
      wrapper.setState({
        expandedSections: { entertainment: true },
      });
      const section = shallow(
        wrapper.instance().renderSection({
          href: 'href',
          name: 'Entertainment',
        })
      );
      expect(section.find('li.expanded').exists()).toBe(true);
      expect(section.find('li.expanded').find('.expander').exists()).toBe(false);
    });

    it('renderSection adds correct arrow text with have children and is expanded', () => {
      const wrapper = shallow(<MobileAllSections open />);
      wrapper.setState({
        expandedSections: { entertainment: true },
      });
      const section = shallow(wrapper.instance().renderSection(sectionProps));
      const expanded = section.find('li.expanded');
      expect(expanded.find('.expander').exists()).toBe(true);
      expect(expanded.find('.arrowText').text()).toBe(localization.get('seeLess'));
    });

    it('renderSection adds correct arrow text with have children and is not expanded', () => {
      const wrapper = shallow(<MobileAllSections open />);
      wrapper.setState({
        expandedSections: { entertainment: false },
      });
      const section = shallow(wrapper.instance().renderSection(sectionProps));
      const collapsed = section.find('li.collapsed');
      expect(collapsed.find('.expander').exists()).toBe(true);
      expect(collapsed.find('.arrowText').text()).toBe('Ver más');
    });

    it('should have sections track clicks', () => {
      const wrapper = shallow(<MobileAllSections />);
      const section = shallow(
        wrapper.instance().renderSection(sectionProps)
      );
      const childSections = section.find('Link');
      const trackHamburgerClickSpy = jest.spyOn(helpers, 'trackHamburgerClick');

      childSections.forEach((grandchild) => {
        grandchild.simulate('click');
      });

      expect(trackHamburgerClickSpy).toHaveBeenCalledTimes(9);
      trackHamburgerClickSpy.mockRestore();
    });
  });

  describe('DesktopAllSections', () => {
    it('renders top-level sections as expected', () => {
      const wrapper = shallow(<DesktopAllSections />);
      expect(wrapper.find('.section')).toHaveLength(16);
    });

    it('expandCollapseSection runs as expected', () => {
      const wrapper = shallow(<DesktopAllSections />);
      const action = wrapper.instance().expandCollapseSection('mysection');
      action({ stopPropagation: jest.fn() });
      expect(wrapper.state('expandedSections').mysection).toBe(true);
    });

    it('adds open class when appropriate', () => {
      const wrapper = shallow(<DesktopAllSections open />);
      expect(wrapper.find('.open').exists()).toBe(true);
    });

    it('should add correct itemprop when using renderSection on desktop', () => {
      const wrapper = shallow(<DesktopAllSections open />);
      const section = shallow(
        wrapper.instance().renderSection({
          href: 'href',
          name: 'Entertainment',
        })
      );
      expect(section.find('Link').prop('itemProp')).toEqual('url');
    });

    it('should not add itemprop when using renderSection withou href on desktop', () => {
      const wrapper = shallow(<DesktopAllSections open />);
      const section = shallow(
        wrapper.instance().renderSection({
          href: undefined,
          name: 'Entertainment',
        })
      );
      expect(section.find('Link').prop('itemProp')).toEqual(undefined);
    });

    it('renderSection adds correct expansion class', () => {
      const wrapper = shallow(<DesktopAllSections open />);
      wrapper.setState({
        expandedSections: { entertainment: true },
      });
      const section = shallow(
        wrapper.instance().renderSection(sectionProps)
      );
      expect(section.find('.expanded').exists()).toBe(true);
    });
  });
});
