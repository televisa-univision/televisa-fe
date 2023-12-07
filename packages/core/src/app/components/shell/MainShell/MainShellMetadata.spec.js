import React from 'react';
import { shallow } from 'enzyme';

import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

import MainShellMetadata from './MainShellMetadata';

/** @test {MainShellMetadata} */
describe('MainShellMetadata Spec', () => {
  it('should not render metadata', () => {
    const props = {};
    const wrapper = shallow(<MainShellMetadata initialState={props} />);
    expect(wrapper.find('meta')).toHaveLength(0);
  });

  it('should render all the metadata scripts', () => {
    const props = {
      data: {
        hierarchy: [
          { name: '1' }, { name: '2' }, { name: '3' },
        ],
        seo: {
          ld_json: '{"@context":"https://schema.org","@type":"Person","address":{"@type":"PostalAddress","addressLocality":"Colorado Springs","addressRegion":"CO","postalCode":"80840","streetAddress":"100 Main Street"},"colleague":["http://www.example.com/JohnColleague.html","http://www.example.com/JameColleague.html"],"email":"info@example.com","image":"janedoe.jpg","jobTitle":"Research Assistant","name":"Jane Doe","alumniOf":"Dartmouth","birthPlace":"Philadelphia, PA","birthDate":"1979-10-12","height":"72 inches","gender":"female","memberOf":"Republican Party","nationality":"Albanian","telephone":"(123) 456-6789","url":"http://www.example.com","sameAs":["https://www.facebook.com/","https://www.linkedin.com/","http://twitter.com/","http://instagram.com/","https://plus.google.com/"]}',
        },
      },
    };
    const wrapper = shallow(<MainShellMetadata initialState={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(2);
  });

  it('should render only hierarchy script if there is not seo metadata', () => {
    const props = {
      data: {
        hierarchy: [
          { name: '1' }, { name: '2' }, { name: '3' },
        ],
        seo: {
          ld_json: null,
        },
      },
    };
    const expected = '{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":null,"name":"1"}},{"@type":"ListItem","position":2,"item":{"@id":null,"name":"2"}},{"@type":"ListItem","position":3,"item":{"@id":null,"name":"3"}}]}';
    const wrapper = shallow(<MainShellMetadata initialState={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(1);
    expect(script.first().text()).toEqual(expected);
  });

  it('should render only seo script if there is not hierarchy metadata', () => {
    const expected = '{"@context":"https://schema.org","@type":"Person","address":{"@type":"PostalAddress","addressLocality":"Colorado Springs","addressRegion":"CO","postalCode":"80840","streetAddress":"100 Main Street"},"colleague":["http://www.example.com/JohnColleague.html","http://www.example.com/JameColleague.html"],"email":"info@example.com","image":"janedoe.jpg","jobTitle":"Research Assistant","name":"Jane Doe","alumniOf":"Dartmouth","birthPlace":"Philadelphia, PA","birthDate":"1979-10-12","height":"72 inches","gender":"female","memberOf":"Republican Party","nationality":"Albanian","telephone":"(123) 456-6789","url":"http://www.example.com","sameAs":["https://www.facebook.com/","https://www.linkedin.com/","http://twitter.com/","http://instagram.com/","https://plus.google.com/"]}';
    const props = {
      data: {
        seo: {
          ld_json: expected,
        },
      },
    };
    const wrapper = shallow(<MainShellMetadata initialState={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(1);
    expect(script.first().text()).toEqual(expected);
  });

  it('should not return scripts if ld_json is an invalid string', () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
    const obj = {};
    obj.name = obj;
    const props = {
      data: {
        hierarchy: [obj],
        seo: {
          ld_json: '{',
        },
      },
    };
    const wrapper = shallow(<MainShellMetadata initialState={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(0);
    expect(clientLoggingSpy).toHaveBeenCalled();
  });
});
