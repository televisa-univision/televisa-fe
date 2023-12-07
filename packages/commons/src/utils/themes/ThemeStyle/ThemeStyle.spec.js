import React from 'react';
import { shallow } from 'enzyme';

import ThemeStyle from '.';
import Styles from './ThemeStyle.scss';
import features from '../../../config/features';

const storeHelpers = jest.requireActual('../../../store/storeHelpers');
storeHelpers.getTheme = jest.fn();
storeHelpers.isAmp = jest.fn();

describe('ThemeStyle', () => {
  it('returns null if missing `theme` prop', () => {
    const wrapper = shallow(<ThemeStyle />);
    expect(wrapper.type()).toBe(null);
  });

  it('renders inline style if custom css available', () => {
    const theme = {
      primary: 'black',
      secondary: 'white',
      custom: {
        a: 'pink',
      },
    };
    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle />);
    expect(wrapper.find('style')).toHaveLength(1);
  });

  it('renders inline style w/ properly formatted string', () => {
    const theme = {
      primary: 'black',
      secondary: 'white',
    };

    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle />);

    const style = `.${Styles.container}  a { color: black; } .${Styles.container}  a:hover { color: white; } `;
    expect(wrapper.find('style')).toHaveLength(1);
    expect(wrapper.find('style').props().dangerouslySetInnerHTML.__html).toEqual(style); /* eslint-disable-line no-underscore-dangle */
  });

  it('renders inline style w/ custom styles w/ properly formatted string', () => {
    const theme = {
      primary: 'black',
      secondary: 'white',
      custom: {
        a: 'pink',
      },
    };

    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle />);

    const style = `.${Styles.container}  a { color: pink; } .${Styles.container}  a:hover { color: white; } `;
    expect(wrapper.find('style')).toHaveLength(1);
    expect(wrapper.find('style').props().dangerouslySetInnerHTML.__html).toEqual(style); /* eslint-disable-line no-underscore-dangle */
  });

  it('does NOT renders inline style if missing `primary` or `secondary` prop', () => {
    const theme = {};
    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle />);
    expect(wrapper.find('style')).toHaveLength(0);
  });

  it('should render with a parent CSS specifed in the styles', () => {
    const theme = {
      primary: 'black',
      secondary: 'white',
      custom: {
        a: 'pink',
      },
    };
    const style = `.${Styles.container} .captionWrap a { color: pink; } .${Styles.container} .captionWrap a:hover { color: white; } `;
    const children = <span />;
    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle parentCssElement=".captionWrap">{ children }</ThemeStyle>);

    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('style').props().dangerouslySetInnerHTML.__html).toEqual(style); /* eslint-disable-line no-underscore-dangle */
  });

  it('should render children and custom styles if available', () => {
    const theme = {
      primary: 'black',
      secondary: 'white',
      custom: {
        a: 'pink',
      },
    };
    const style = `.${Styles.container}  a { color: pink; } .${Styles.container}  a:hover { color: white; } `;
    const children = <span />;
    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle>{ children }</ThemeStyle>);

    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('style').props().dangerouslySetInnerHTML.__html).toEqual(style); /* eslint-disable-line no-underscore-dangle */
  });

  it('should render children if available, even if no custom styles present', () => {
    const theme = {};
    const children = <div />;
    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle>{ children }</ThemeStyle>);
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should not add styles in AMP pages.', () => {
    storeHelpers.isAmp.mockReturnValueOnce(true);
    const children = <div />;
    expect(shallow(<ThemeStyle>{ children }</ThemeStyle>).find('style')).toHaveLength(0);
  });
  it('should render secondary if isWorldCupMVP is true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const theme = {
      primary: 'black',
      secondary: 'white',
      custom: {
        a: 'pink',
      },
    };

    storeHelpers.getTheme.mockReturnValueOnce(theme);
    const wrapper = shallow(<ThemeStyle />);

    expect(wrapper.find('style')).toHaveLength(1);
  });
});
