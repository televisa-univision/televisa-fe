import React from 'react';
import { shallow } from 'enzyme';

import FeatureStationsCardDesktop from './FeaturedStationsCard/FeaturedStationsCardDesktop';
import FeatureStationsCardMobile from './FeaturedStationsCard/FeaturedStationsCardMobile';

import FeaturedStations from './FeaturedStations';
import featuredStationsMock from '../../../../utils/mocks/featuredStationMock.json';

jest.mock('./FeaturedStationsCard/FeaturedStationsCardDesktop', () => jest.fn());
jest.mock('./FeaturedStationsCard/FeaturedStationsCardMobile', () => jest.fn());

const content = featuredStationsMock.data.widgets[0].contents;

/** @test {FeaturedStations} */
describe('FeaturedStations ', () => {
  it('should return an empty string when no promoImage exists', () => {
    const modifiedContent = [Object.assign({}, content[0], {
      promoImages: {},
    })];
    const wrapper = shallow(<FeaturedStations content={modifiedContent} device="desktop" />);
    expect(wrapper).toBeDefined();
  });

  it('should update the activeStationIndex in state', () => {
    const wrapper = shallow(<FeaturedStations content={content} device="desktop" />);
    wrapper.instance().updateActiveStationIndex(3);
    expect(wrapper.state('activeStationIndex')).toEqual(3);
  });

  it('should render desktop component if the device it\'s desktop', () => {
    const wrapper = shallow(<FeaturedStations device="desktop" content={content} />);
    expect(wrapper.find(FeatureStationsCardDesktop).exists()).toBe(true);
  });

  it('should render mobile component if the device it\'s a phone', () => {
    const wrapper = shallow(<FeaturedStations device="mobile" content={content} />);
    expect(wrapper.find(FeatureStationsCardMobile).exists()).toBe(true);
  });

  it('handles missing images', () => {
    content[0].radioStation.featuredStationsPromoImage.renditions.original.href = null;
    content[0].radioStation.featuredStationsPromoImage.renditions['16x9-sm'].href = null;
    const wrapper = shallow(<FeaturedStations content={content} device="mobile" />);
    expect(wrapper.find('.background').prop('style')).toBeUndefined();
  });

  it('should take card if radio station is not defined in bex', () => {
    content[0].radioStation = null;
    content[0].abacast = {};
    const wrapper = shallow(<FeaturedStations device="mobile" content={content} />);
    expect(wrapper.find(FeatureStationsCardMobile).first()).toEqual({});
  });

  it('should validate if content is null and is not a valid object, we must has 0 render cards', () => {
    const newContent = [];
    newContent[0] = null;
    const wrapper = shallow(<FeaturedStations device="mobile" content={newContent} />);
    expect(wrapper.find(FeatureStationsCardMobile).exists()).toBe(false);
  });
});
