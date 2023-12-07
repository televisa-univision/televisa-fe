import React from 'react';
import { shallow } from 'enzyme';
import Link from '../Link';
import Styles from './Author.scss';

import Author from '.';

let props;
beforeEach(() => {
  props = {
    authors: [
      {
        uid: '1365',
        uri: 'http://www.google.com',
        title: 'test',
        image: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
      {
        uid: '1365',
        title: null,
        firstName: 'first',
        lastName: 'last',
        image: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
    ],
    tempAuthors: [
      {
        uid: '22435',
        fullName: 'Temp',
        company: 'Company',
        designation: 'Publisher',
      },
      {
        uid: '22435',
        fullName: 'Temp',
        company: 'Company',
        designation: 'Publisher',
        link: {
          href: 'http://www.googe.com'
        }
      }
    ],
    publishDate: new Date().toISOString(),
    source: 'Univision'
  };
});

/** @test {Author} */
describe('Author ', () => {
  it('should render as expected', () => {
    const wrapper = shallow(<Author {...props.authors[0]} />);
    expect(wrapper.find(`span.${Styles.author}`).length).toBe(1);
  });
  it('should render name the name with title', () => {
    const wrapper = shallow(<Author />);
    expect(wrapper.find(`span.${Styles.name}`).text()).toBe('');
    expect(wrapper.find(Link).prop('href')).toBe('/equipo');

    const wrapper2 = shallow(<Author {...props.authors[0]} />);
    expect(wrapper2.find(`span.${Styles.name}`).text()).toBe('test');
  });
  it('should render link object from URI prop', () => {
    const wrapper = shallow(<Author {...props.authors[0]} />);
    expect(wrapper.find(Link).prop('href')).toBe('http://www.google.com');
  });
  it('should render a Link if provided on tempAuthor', () => {
    const wrapper = shallow(<Author {...props.tempAuthors[1]} />);
    expect(wrapper.find(Link).prop('href')).toBe('http://www.googe.com');
  });
  it('should render empty auhtor', () => {
    const wrapper = shallow(<Author {...props.tempAuthors[1]} />);
    expect(wrapper.find(`span.${Styles.author}`).length).toBe(1);
  });
  it('should render company - publisher', () => {
    const testProp = props.tempAuthors[1];
    testProp.designation = undefined;
    const wrapper = shallow(<Author {...testProp} />);
    expect(wrapper.find(`span.${Styles.company}`).text()).toBe(' (Company)');
  });
  it('should render company - publisher', () => {
    const wrapper = shallow(<Author {...props.tempAuthors[1]} />);
    expect(wrapper.find(`span.${Styles.company}`).text()).toBe(' (Company - Publisher)');
  });
});
