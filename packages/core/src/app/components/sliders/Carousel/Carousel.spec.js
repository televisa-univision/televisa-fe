import React from 'react';
import { shallow } from 'enzyme';
import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';

import Carousel from './Carousel';

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems = [];

beforeAll(() => {
  contentItems = mockApiData.data.widgets[4].contents;
});

/** @test {Carousel} */
describe('Carousel Spec', () => {
  it('should render coreSlider', () => {
    const wrapper = shallow(
      <Carousel settings={{ type: 'ContentCarousel' }}>
        {contentItems.map(item => (
          <div key={item.uid}>
            <PromoItem key={item.uid} {...item} />
          </div>
        ))}
      </Carousel>
    );
    expect(wrapper).toBeDefined();
  });
  it('should render coreSlider with no type passed', () => {
    const comp = (
      <Carousel>
        {contentItems.map(item => (
          <div key={item.uid}>
            <PromoItem key={item.uid} {...item} />
          </div>
        ))}
      </Carousel>
    );
    const wrapper = shallow(comp);
    expect(wrapper).toBeDefined();
  });
});
