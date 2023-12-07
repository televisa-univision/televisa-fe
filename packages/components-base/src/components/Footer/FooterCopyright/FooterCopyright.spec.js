import React from 'react';
import { shallow } from 'enzyme';

import FooterCopyright from './FooterCopyright';
import Styles from './FooterCopyright.scss';

describe('FooterCopyright tests', () => {
  it('renders a div container', () => {
    const wrapper = shallow(<FooterCopyright />);
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find(`div.${Styles.footerCopyright}`)).toHaveLength(1);
    expect(wrapper.find('div.col-sm')).toHaveLength(1);
  });

  it('renders a div container with footer copyright message prop', () => {
    const wrapper = shallow(<FooterCopyright footerCopyright="Test" />);
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find(`div.${Styles.footerCopyright}`)).toHaveLength(1);
    expect(wrapper.find('div.col-sm')).toHaveLength(1);
  });

  it('renders a div container with footer copyright MX', () => {
    const wrapper = shallow(<FooterCopyright isUSLocation={false} />);
    expect(wrapper.find('div')).toHaveLength(2);
    expect(wrapper.find(`div.${Styles.footerCopyright}`)).toHaveLength(1);
    expect(wrapper.find('div.col-sm')).toHaveLength(1);
  });
});
