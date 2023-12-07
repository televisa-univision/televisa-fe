import React from 'react';
import { shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import TentpolesSubNav from '.';
import Styles from './TentpolesSubNav.scss';

const pageData = {
  data: {
    brandable: {
      uri: '/',
      show: {
        headerLogo: {
          original: {
            href: 'logo.svg',
          },
        },
      },
    },
  },
};
storeHelpers.getPageData = jest.fn();
storeHelpers.getBrandable = jest.fn();

beforeEach(() => {
  storeHelpers.getPageData.mockImplementation(() => (pageData));
});

/** @test {Progress} */
describe('DropTentpolesSubNavDown', () => {
  it('should render as expected', () => {
    const props = { subNavBackground: { } };
    const wrapper = shallow(<TentpolesSubNav {...props} />);
    expect(wrapper.find(`div.${Styles.tentpoleContentPage}`)).toHaveLength(1);
  });
  it('should add the backgroundImage if it exists', () => {
    const props = { subNavBackground: { image: 'test' } };
    const wrapper = shallow(<TentpolesSubNav {...props} />);
    expect(wrapper.find(`div.${Styles.tentpoleContentPage}`).prop('style')).toHaveProperty('backgroundImage', 'url(test)');
  });
  it('should add the backgroundColor if it exists', () => {
    const props = { subNavBackground: { color: '#fff' } };
    const wrapper = shallow(<TentpolesSubNav {...props} />);
    expect(wrapper.find(`div.${Styles.tentpoleContentPage}`).prop('style')).toHaveProperty('backgroundColor', '#fff');
  });
  it('should get brandable from props and render as expected.', () => {
    storeHelpers.getPageData.mockImplementation(() => null);
    const props = { subNavBackground: { } };
    const wrapper = shallow(<TentpolesSubNav {...props} />);
    expect(wrapper.find(`div.${Styles.tentpoleContentPage}`)).toHaveLength(1);
  });
  it('shouldnt get brandable class and render as expected.', () => {
    const customPageData = { brandable: pageData.data.brandable };
    storeHelpers.getBrandable.mockImplementation(() => ({ pageData: customPageData }));
    const props = { subNavBackground: { } };
    const wrapper = shallow(<TentpolesSubNav {...props} />);
    expect(wrapper.find(`div.${Styles.tentpoleContentPage}`)).toHaveLength(1);
  });
});
