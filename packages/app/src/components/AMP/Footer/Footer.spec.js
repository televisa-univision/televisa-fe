import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import AmpIcon from '../Icon';
import AmpFooter from '.';
import { Footer, FooterImageLink } from './Footer.styles';

const store = configureStore();

/**
 * WrapperComponent
 * @prop {children} component children
 * @returns {JSX}
 */
const WrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

WrapperComponent.propTypes = {
  children: PropTypes.node,
};

describe('AmpFooter', () => {
  jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
  let pageData;

  beforeEach(() => {
    pageData = {
      site: 'univision',
      pageCategory: 'famosos',
    };
  });

  afterAll(() => {
    pageData.site = 'univision';
    pageData.pageCategory = 'famosos';
  });

  it('should render as expected', () => {
    const wrapper = mount(<AmpFooter pageData={pageData} />);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(FooterImageLink)).toHaveLength(6);
  });

  it('should use the light variant', () => {
    const theme = { variant: 'light', primary: '#000' };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AmpFooter pageData={pageData} />
      </ThemeProvider>,
    );
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#000');
  });

  it('should use the dark variant', () => {
    const theme = { variant: 'dark', primary: '#fff' };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AmpFooter pageData={pageData} />
      </ThemeProvider>,
    );
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#fff');
  });
  it('should use tudn logo dark variant', () => {
    const theme = { variant: 'dark', primary: '#fff' };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);
    jest.spyOn(selectors, 'isTudnSiteSelector').mockReturnValue(true);
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <AmpFooter pageData={pageData} />
      </ThemeProvider>,
    );
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#fff');
  });

  it('should use televisa logo variant', () => {
    pageData.site = 'lasestrellas';
    pageData.pageCategory = 'lasestrellas famosos';
    const wrapper = mount(<AmpFooter pageData={pageData} />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
