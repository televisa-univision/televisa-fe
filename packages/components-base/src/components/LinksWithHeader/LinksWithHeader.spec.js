import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import LinksWithHeader from '.';

describe('LinksWithHeader', () => {
  const links = new Array(10).fill(null).map((item, index) => ({
    href: '/blah',
    site: 'univision',
    target: '_self',
    name: `blah-${index}`,
  }));

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LinksWithHeader title="blah" links={links} sortType="byId" isPopularTopics />, div);
  });

  it('should render links with itemProp url', () => {
    const wrapper = shallow(<LinksWithHeader title="blah" links={links} sortType="alphabetically" />);
    expect(wrapper.find('LinksWithHeader__StyledLink').first().props()).toEqual(
      expect.objectContaining({
        itemProp: 'url',
      })
    );
  });

  it('should render links with itemProp undefined if there is no link href', () => {
    const wrapper = shallow(<LinksWithHeader title="blah" links={[{ name: 'blah' }]} />);
    expect(wrapper.find('LinksWithHeader__StyledLink').props()).toEqual(
      expect.objectContaining({
        itemProp: undefined,
      })
    );
  });

  it('should not render any links if the links prop passed is invalid', () => {
    const wrapper = shallow(<LinksWithHeader title="blah" links={null} />);
    expect(wrapper.find('LinksWithHeader__StyledLink').length).toBe(0);
  });

  it('should render header with rebrand font family', () => {
    const wrapper = shallow(<LinksWithHeader title="blah" links={links} isWorldCupMVP />);
    expect(wrapper.find('LinksWithHeader__StyledLink').first().props()).toEqual(
      expect.objectContaining({
        itemProp: 'url',
      })
    );
    expect(wrapper.find('LinksWithHeader__Header')).toHaveStyleRule('font-family', '\'Roboto Flex\',sans-serif');
  });
});
