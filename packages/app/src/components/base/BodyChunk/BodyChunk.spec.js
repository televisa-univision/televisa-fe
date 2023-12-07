import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';

import DFPAd from '@univision/fe-commons/dist/components/ads/dfp/DFPAd';
import features from '@univision/fe-commons/dist/config/features';

import BodyChunk from './index';

features.liveblog.liveBlogPerformance = jest.fn(() => true);

const mockBio = {
  text: {
    type: 'text',
    value: '<h3 class="cms-H3-H3"><b>PAGE CONTENT IS SPONSORED BY: C&amp;S Wholesale Services.</b></h3>',
  },
  quote: {
    type: 'enhancement',
    enhancementData: {
      link: null,
      text: 'Wholesale Grocery Distribution, Procurement, Merchandising y Transportation & Logistics',
      source: null,
      quoteType: {
        name: 'Blockquote',
      },
    },
    objectData: {
      type: 'quoteenhancement',
    },
  },
};

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

describe('BodyChunk test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BodyChunk />, div);
  });

  it('should render a text element', () => {
    const wrapper = mount(<BodyChunk {...mockBio.text} />);
    expect(wrapper.find('RichText')).toBeDefined();
  });

  it('should render a enhancement element', async () => {
    const wrapper = mount(<BodyChunk {...mockBio.quote} />);
    await actions(wrapper);
    expect(wrapper.find('Quote')).toBeDefined();
  });

  it('should render a EnhancementLiveBlog', async () => {
    const wrapper = mount(<BodyChunk {...mockBio.quote} isLiveBlog />);
    await actions(wrapper);
    expect(wrapper.find('Quote')).toBeDefined();
  });

  it('should return DFPAd component in value', () => {
    const props = {
      type: 'ad',
      value: <DFPAd />,
    };
    const wrapper = shallow(<BodyChunk {...props} />);
    expect(wrapper.find('DFPAd')).toBeDefined();
  });
  it('should return taboola component in value', () => {
    const props = {
      type: 'taboola',
    };
    const wrapper = shallow(<BodyChunk {...props} />);
    expect(wrapper.find('taboola-mid-article-1x1-1')).toBeDefined();
  });
});
