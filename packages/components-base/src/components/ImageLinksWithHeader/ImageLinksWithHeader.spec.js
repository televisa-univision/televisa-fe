import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import ImageLinksWithHeader from '.';
import TvShowsData from '../Navigation/data/tvShows';

describe('ImageLinksWithHeader', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ImageLinksWithHeader content={TvShowsData} />, div);
  });

  it('should render a link with itemProp undefined if no href available', () => {
    const wrapper = shallow(<ImageLinksWithHeader content={{ children: [{ name: 'blah' }] }} />);

    expect(wrapper.find('Link').props()).toEqual(
      expect.objectContaining({
        itemProp: undefined,
      })
    );
  });

  it('should not render any link if there is no content', () => {
    const wrapper = shallow(<ImageLinksWithHeader />);

    expect(wrapper.find('Link').length).toBe(0);
  });

  it('should render a separator if prop is provided', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<ImageLinksWithHeader withSeparator />);
    expect(wrapper.find('ImageLinksWithHeader__StyledTopicBar').props()).toEqual(expect.objectContaining({
      separator: 'bottom',
      separatorSpace: 6,
    }));
  });
});
