import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import SoccerPersonStats from '@univision/fe-components-base/dist/components/SoccerPersonStats';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import * as redux from 'react-redux';
import mock from './__mocks__/content.json';
import HeaderHub from '.';

const { results } = mock;

const theme = { isDark: false };

describe('HeaderHub', () => {
  jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
  jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeaderHub label="test" />, div);
  });
  it('renders type Person', () => {
    const wrapper = mount(<HeaderHub {...results[0].data} device="mobile" />);
    expect(wrapper.find('BodyChunk').length).toBe(4);
  });
  it('renders Hub with Image', () => {
    const wrapper = mount(<HeaderHub {...results[1].data} />);
    expect(wrapper.find('HeaderHub__PictureWrapper')).toBeDefined();
  });
  it('renders Hub Without Image', () => {
    const wrapper = mount(<HeaderHub {...results[0].data} image={null} />);
    expect(wrapper.find('HeaderHub__PictureWrapper').length).toBe(0);
  });
  it('renders only title', () => {
    const wrapper = mount(<HeaderHub {...results[1].data} hubTag={false} />);
    expect(wrapper.find('HeaderHub__Title')).toBeDefined();
    expect(wrapper.find('HeaderHub__PictureWrapper').length).toBe(0);
    expect(wrapper.find('ChunkContainer').length).toBe(0);
  });
  it('has to open and close Bio', () => {
    const wrapper = mount(<HeaderHub {...results[0].data} />);
    expect(wrapper.find('HeaderHub__BioContainer').props().isOpen).toBe(true);
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('HeaderHub__BioContainer').props().isOpen).toBe(false);
  });
  it('renders type Soccer Person with bio', () => {
    const wrapper = mount(
      <HeaderHub
        {...results[0].data}
        type={contentTypes.SOCCER_PERSON}
        showFullBio
        showFullHeader
        alignTop
      >
        <SoccerPersonStats
          profile="172cm / 80kg"
        />
      </HeaderHub>,
    );
    expect(wrapper.find('BodyChunk').length).toBe(4);
    expect(wrapper.find(SoccerPersonStats).length).toBe(1);
    expect(wrapper.find(SoccerPersonStats).first().props().layout).toBe('vertical');
    expect(wrapper.find('HeaderHub__StatsWrapper').last().props().hasFullBio).toBe(true);
  });
  it('renders type Soccer Person with no bio', () => {
    const wrapper = mount(
      <HeaderHub
        {...results[0].data}
        type={contentTypes.SOCCER_PERSON}
        image={null}
        fullBio={[]}
        showFullBio
        showFullHeader
        alignTop
      >
        <SoccerPersonStats
          profile="172cm / 80kg"
        />
      </HeaderHub>,
    );
    expect(wrapper.find('BodyChunk').length).toBe(0);
    expect(wrapper.find(SoccerPersonStats).length).toBe(1);
    expect(wrapper.find('HeaderHub__StatsWrapper').first().props().hasFullBio).toBe(false);
  });
  it('should not render Related Tags', () => {
    const wrapper = mount(
      <HeaderHub {...results[0].data} showRelatedTags={false} />,
    );
    expect(wrapper.find('BodyChunk').length).toBe(4);
    expect(wrapper.find('HeaderHub__RelatedTagsContainer')).toHaveLength(0);
  });
  it('should render Related Tags', () => {
    const wrapper = mount(
      <HeaderHub
        {...results[0].data}
        showRelatedTags
        hubTag
        image={null}
        showFullHeader={false}
      />,
    );
    expect(wrapper.find('BodyChunk').length).toBe(4);
    expect(wrapper.find('HeaderHub__RelatedTagsContainer')).toHaveLength(1);
  });
  it('should not render picture overlay if person avatar is present', () => {
    const wrapper = mount(
      <HeaderHub
        {...results[0].data}
        showRelatedTags
        hubTag
        image={null}
        showFullHeader
        personAvatar={'test.png'}
      />,
    );
    expect(wrapper.find('HeaderHub__PictureOverlay')).toHaveLength(0);
  });
  it('renders type Soccer Person with bio in dark theme', () => {
    const darkTheme = { isDark: true };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(darkTheme);

    const wrapper = mount(
      <HeaderHub
        {...results[0].data}
        type={contentTypes.SOCCER_PERSON}
        showFullBio
        showFullHeader
        alignTop
      >
        <SoccerPersonStats
          profile="172cm / 80kg"
        />
      </HeaderHub>,
    );
    expect(wrapper.find('BodyChunk').length).toBe(4);
    expect(wrapper.find(SoccerPersonStats).length).toBe(1);
    expect(wrapper.find(SoccerPersonStats).first().props().layout).toBe('vertical');
    expect(wrapper.find('HeaderHub__StatsWrapper').last().props().hasFullBio).toBe(true);
  });
});
