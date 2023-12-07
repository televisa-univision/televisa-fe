import React from 'react';
import { shallow } from 'enzyme';

import { JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';

import LabelBadge from '.';

describe('LabelBadge test', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LabelBadge />);

    expect(wrapper.find('Label')).toHaveLength(1);
  });

  it('should return an object with label props with default type', () => {
    const wrapper = shallow(<LabelBadge />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: '',
      text: '',
      type: 'default',
    }));
  });

  it('should return label for liveblog', () => {
    const props = {
      textLabel: 'liveblog',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ uri: 'url' }],
      type: 'liveblog',
      articleType: 'liveblog',
      uri: 'liveblogUrl',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'liveblogUrl',
      text: 'liveblog',
      type: 'liveblog',
    }));
  });

  it('should return label props for Futbol', () => {
    const props = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'futbol', uri: 'url', title: 'fútbol' }],
      type: 'article',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url',
      text: 'fútbol',
      type: 'futbol',
    }));
  });

  it('should return label props for shows', () => {
    const props = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'shows', uri: 'url', title: 'shows' }],
      type: 'article',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url',
      text: 'shows',
      type: 'shows',
    }));
  });

  it('should return label props for opinion', () => {
    const props = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [{ fullName: 'author', uri: 'url/author' }],
      hierarchy: [],
      type: 'article',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url/author',
      text: 'author',
      type: 'opinion',
    }));
  });

  it('should return label props for advertisement', () => {
    const props = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [],
      type: 'advertising',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: '',
      text: 'Publicidad',
      type: 'advertising',
    }));
  });

  it('should label props for advertisement for article type job listing', () => {
    const props = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'jobs', uri: 'url' }],
      type: 'advertising',
      articleType: JOB_LISTING,
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url',
      text: 'Publicidad',
      type: 'advertising',
    }));
  });

  it('should return label props for local vertical for article type', () => {
    const props = {
      textLabel: '',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'univision chicago', uri: 'url', title: 'univision chicago' }],
      type: 'article',
      articleType: 'standard',
      vertical: 'Local',
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url',
      text: 'univision chicago',
      type: 'local',
    }));
  });

  it('should return label WorldCupMVP props for local vertical for article type', () => {
    const props = {
      textLabel: '',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'univision chicago', uri: 'url', title: 'univision chicago' }],
      type: 'article',
      articleType: 'standard',
      vertical: 'Local',
      isWorldCupMVP: true,
    };
    const wrapper = shallow(<LabelBadge {...props} />);

    expect(wrapper.find('Label').props()).toEqual(expect.objectContaining({
      href: 'url',
      text: 'univision chicago',
      type: 'local',
    }));
  });
});
