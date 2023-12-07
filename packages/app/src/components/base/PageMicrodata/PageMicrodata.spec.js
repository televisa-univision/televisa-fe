import React from 'react';
import { shallow } from 'enzyme';

import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

import PageMicrodata from '.';

/**
 * @test {PageMicrodata}
 */
describe('PageMicrodata test', () => {
  it('should not render metadata', () => {
    const wrapper = shallow(<PageMicrodata />);
    expect(wrapper.find('script')).toHaveLength(0);
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
    const wrapper = shallow(<PageMicrodata pageData={props} />);
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
    const expectedJson = JSON.stringify(JSON.parse(expected), null, 2);
    const wrapper = shallow(<PageMicrodata pageData={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(1);
    expect(script.first().prop('dangerouslySetInnerHTML')).toHaveProperty('__html', expectedJson);
  });

  it('should render only seo script if there is not hierarchy metadata', () => {
    const expected = '{"@context":"https://schema.org","@type":"Person","address":{"@type":"PostalAddress","addressLocality":"Colorado Springs","addressRegion":"CO","postalCode":"80840","streetAddress":"100 Main Street"},"colleague":["http://www.example.com/JohnColleague.html","http://www.example.com/JameColleague.html"],"email":"info@example.com","image":"janedoe.jpg","jobTitle":"Research Assistant","name":"Jane Doe","alumniOf":"Dartmouth","birthPlace":"Philadelphia, PA","birthDate":"1979-10-12","height":"72 inches","gender":"female","memberOf":"Republican Party","nationality":"Albanian","telephone":"(123) 456-6789","url":"http://www.example.com","sameAs":["https://www.facebook.com/","https://www.linkedin.com/","http://twitter.com/","http://instagram.com/","https://plus.google.com/"]}';
    const expectedJson = JSON.stringify(JSON.parse(expected), null, 2);
    const props = {
      data: {
        seo: {
          ld_json: expected,
        },
      },
    };
    const wrapper = shallow(<PageMicrodata pageData={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(1);
    expect(script.first().prop('dangerouslySetInnerHTML')).toHaveProperty('__html', expectedJson);
  });

  it('should not return scripts if ld_json is an invalid string', () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
    const props = {
      data: {
        hierarchy: [null],
        seo: {
          ld_json: '{',
        },
      },
    };
    const wrapper = shallow(<PageMicrodata pageData={props} />);
    const script = wrapper.find('script');
    expect(script).toHaveLength(0);
    expect(clientLoggingSpy).toHaveBeenCalled();
  });
});
