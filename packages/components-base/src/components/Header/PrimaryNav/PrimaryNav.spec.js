import React from 'react';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import MenuLink from '../MenuLink';
import PrimaryNav, { findActiveItem } from '.';

jest.mock('../MenuLink', () => jest.fn());
jest.mock('../MenuIcon', () => jest.fn());
jest.mock('../../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    links: [
      { link: '#', name: 'a link!' },
      { link: '#1', name: 'another link!' },
    ],
    showMore: false,
    logo: 'logo.jpg',
    onMore: jest.fn(),
    onClose: jest.fn(),
    stationLink: '/foo',
  };
  Store.dispatch(setPageData({ data: { uri: '/abc' }, pageCategory: 'entertainment' }));
});

describe('PrimaryNav', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PrimaryNav {...props} />);
    expect(wrapper.find('.nav')).toHaveLength(1);
    expect(wrapper.find(MenuLink)).toHaveLength(2);
  });

  it('renders "show more sections" button when appropriate', () => {
    props.showMore = true;
    const wrapper = shallow(<PrimaryNav {...props} />);
    expect(wrapper.find('.more')).toHaveLength(1);
  });

  it('does not fail if links is not defined', () => {
    props.links = undefined;
    const wrapper = shallow(<PrimaryNav {...props} />);
    expect(wrapper.find(MenuLink)).toHaveLength(0);
  });
});

describe('findActiveItem', () => {
  it('returns an empty array if links is not valid', () => {
    expect(findActiveItem().links).toEqual([]);
  });

  it('finds active item based on pageCategory', () => {
    expect(
      findActiveItem([
        {
          pageCategory: 'entertainment',
          link: '/abc',
        },
        {
          pageCategory: 'noticias',
          link: '/noticias',
        }]).links[0].active
    ).toBe(true);
  });

  it('doesnt highlight anything if no matches were found', () => {
    expect(findActiveItem([{ pageCategory: 'blarg', link: '/entertainment' }]).links[0].active).toBe(false);
  });

  it('finds active item based on exact match of data.uri', () => {
    expect(findActiveItem([
      { pageCategory: 'first link', link: '/123' },
      { pageCategory: 'something else', link: '/abc' },
      { pageCategory: 'another', link: '/xyz' },
    ]).links[1].active).toBe(true);
  });

  it('finds active item based on match of beginning of data.uri', () => {
    Store.dispatch(setPageData({ data: { uri: '/abc/child' }, pageCategory: 'entertainment' }));
    expect(findActiveItem([
      { pageCategory: 'first link', link: '/123' },
      { pageCategory: 'something else', link: '/abc' },
      { pageCategory: 'another', link: '/xyz' },
    ]).links[1].active).toBe(true);
  });

  it('aborts if no uri in pageData', () => {
    Store.dispatch(setPageData({ data: {}, pageCategory: 'entertainment' }));
    const links = ['links'];
    expect(findActiveItem(links).links).toEqual(links);
  });

  it('looks for an alias', () => {
    expect(findActiveItem([{ link: '/musica', aliases: ['/abc'] }]).links[0].active).toBe(true);
  });
});
