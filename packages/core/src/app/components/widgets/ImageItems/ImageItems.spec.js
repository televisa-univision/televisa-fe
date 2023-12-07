import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import PageApi from 'server/proxy/api/page/__mocks__/PageApi';
import ImageItems from './ImageItems';

/**
 * Mocked content items for test with just one item
 * @type {Array}
 */
let oneContentItems = [];

/**
 * Mocked content items for test with two items
 * @type {Array}
 */
let twoContentItems = [];

/**
 * Mocked content items for test with four items
 * @type {Array}
 */
let fourContentItems = [];

/**
 * Mocked content items from Generic Widget
 * @type {Array}
 */
let fourItems = [];
let sixItems = [];

beforeAll(async (done) => {
  const payload = await PageApi.getPage('test');
  oneContentItems = payload.data.widgets[2].contents;
  twoContentItems = payload.data.widgets[1].contents;
  fourContentItems = payload.data.widgets[4].contents;
  // using GenericWidget
  sixItems = payload.data.widgets[34].contents;
  fourItems = payload.data.widgets[35].contents;
  done();
});

/** @test {ImageItems} */
describe('ImageItems Spec', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageItems key={1} content={fourContentItems} />, div);
  });

  describe('Dynamically renders columns based on number of content items', () => {
    it('should renders one content item', () => {
      const wrapper = shallow(<ImageItems key={1} content={oneContentItems} />);
      expect(wrapper.find('.row').children().length).toBe(1);
    });

    it('should renders two content items', () => {
      const settings = {
        numberOfItems: 2,
      };
      const wrapper = shallow(<ImageItems key={1} content={twoContentItems} settings={settings} />);
      expect(wrapper.find('.row').children().length).toBe(2);
    });

    it('should renders a PromoItem in each column', () => {
      const wrapper = shallow(<ImageItems key={1} content={twoContentItems} />);
      const firstCol = wrapper.childAt(0);
      const secondCol = wrapper.childAt(1);
      expect(firstCol.find('PromoItem')).toBeTruthy();
      expect(secondCol.find('PromoItem')).toBeTruthy();
    });
  });

  describe('Generic Widget Items', () => {
    it('should renders one SixItems component', () => {
      const settings = {
        genericWidget: {
          type: 'SixItems',
        },
      };
      const wrapper = shallow(<ImageItems key={1} content={sixItems} settings={settings} />);
      expect(wrapper.find('SixItems').length).toBe(1);
    });
    it('should renders one FourItems component', () => {
      const settings = {
        genericWidget: {
          type: 'FourItems',
        },
      };
      const wrapper = shallow(<ImageItems key={1} content={fourItems} settings={settings} />);
      expect(wrapper.find('FourItems').length).toBe(1);
    });
    it('should render regular PromoItems if no generic type', () => {
      const settings = {
        genericWidget: {
          type: 'test',
        },
      };
      const wrapper = shallow(<ImageItems key={1} content={fourItems} settings={settings} />);
      expect(wrapper.find('PromoItem').length).toBe(4);
    });
    it('should return null if content not array', () => {
      const wrapper = shallow(<ImageItems key={1} content="test" />);
      expect(wrapper.find('PromoItem').length).toBe(0);
    });
  });

  describe('Topic bar inside if title provided', () => {
    it('should show topicbar', () => {
      const wrapper = mount(<ImageItems key={1} content={fourContentItems} settings={{ title: 'Hello' }} />);
      expect(wrapper.find('TopicBar').length).toBe(1);
    });
  });
});
