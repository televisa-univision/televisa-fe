import fs from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import styled from 'styled-components';
import Document, { Main } from 'next/document';

import {
  dedupeBunbles,
  getCssContent,
  getLinkElements,
  getCssElements,
  getCssReactNativeWeb,
  getCssStyledComponents,
  getPageStateFromNextData,
} from './renderUtils';

describe('getCssContent function', () => {
  it('should return content from provided file', () => {
    const testData = Buffer.from('This is sample Test Data');
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(testData);

    const cssContent = getCssContent('test');
    expect(cssContent).toEqual(testData);
  });

  it('should return empty object when provided file does not exist', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error('error reading file');
    });

    const cssContent = getCssContent('test');
    expect(cssContent).toEqual('');
  });
});

describe('getLinkElements function', () => {
  it('should render link elements correctly', () => {
    const div = document.createElement('div');
    const linkElements = getLinkElements({ file: 'test' });
    ReactDOM.render((
      <>
        {linkElements}
      </>
    ), div);
  });
});

describe('getCssElements function', () => {
  const cssFiles = [
    '/test/1.css',
    '/test/x/2.css',
  ];
  it('should render link elements correctly', () => {
    const div = document.createElement('div');
    const cssElements = getCssElements(cssFiles, {});
    ReactDOM.render((
      <>
        {cssElements}
      </>
    ), div);
  });

  it('should render style elements correctly', () => {
    const testData = Buffer.from('This is sample Test Data');
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(testData);

    const div = document.createElement('div');
    const cssElements = getCssElements(cssFiles, { assetPrefix: 'https://webapp-static-dev.univision.com' });
    ReactDOM.render((
      <>
        {cssElements}
      </>
    ), div);
  });

  it('should render style element when assetPrefix is passed and file is read correctly', () => {
    process.env.SERVERLESS = true;
    const testData = Buffer.from('This is sample Test Data');
    // second file will throw error, so will use link
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(testData);

    const cssElements = getCssElements(cssFiles, { assetPrefix: 'https://webapp-static-dev.univision.com', enhancedHeader: true });

    const wrapper = shallow(
      <div>
        {cssElements}
      </div>,
    );

    expect(wrapper.childAt(0).type()).toEqual('style');
    expect(wrapper.childAt(1).type()).toEqual('style');
  });

  it('should render css elements as fallback when readFileSync failed', () => {
    process.env.SERVERLESS = true;
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
      throw new Error('error reading file');
    });

    const cssElements = getCssElements(cssFiles, { assetPrefix: 'https://webapp-static-dev.univision.com', enhancedHeader: true });

    const wrapper = shallow(
      <div>
        {cssElements}
      </div>,
    );

    // 1 preload and 1 css link for each resource
    expect(wrapper.find('link')).toHaveLength(4);
    expect(wrapper.find('style')).toHaveLength(0);
  });

  it('should return null if cssFiles is not valid array', () => {
    const cssElements = getCssElements([], {});

    expect(cssElements).toEqual(null);
  });
});

describe('getCssReactNativeWeb function', () => {
  it('should return expected react-native-web css styles', () => {
    const reactNativeWebCss = getCssReactNativeWeb(Main);

    expect(reactNativeWebCss.type).toEqual('style');
    expect(reactNativeWebCss.props).toHaveProperty('id', 'react-native-stylesheet');
    expect(reactNativeWebCss.props).toHaveProperty('dangerouslySetInnerHTML.__html', expect.stringContaining('margin:0;'));
  });
});

describe('getCssStyledComponents function', () => {
  it('should return expected styled-components css styles', async () => {
    const App = styled.div`color: red`;
    const getInitialPropsMock = jest.fn((ctx) => {
      ctx.renderPage();
      return { test: true };
    });
    const renderPageMock = jest.fn((opts) => {
      opts.enhanceApp(App)({ test: true });
    });
    const context = {
      renderPage: renderPageMock,
    };
    Document.getInitialProps = getInitialPropsMock;

    const {
      initialPropsEnhanced,
      styledComponentsCss,
    } = await getCssStyledComponents(Document, context);

    expect(renderPageMock).toHaveBeenCalledTimes(1);
    expect(getInitialPropsMock).toHaveBeenCalledWith(context);
    expect(styledComponentsCss[0].type).toEqual('style');
    expect(styledComponentsCss[0].key).toContain('sc-');
    expect(styledComponentsCss[0].props).toHaveProperty('data-styled-version');
    expect(styledComponentsCss[0].props).toHaveProperty('dangerouslySetInnerHTML.__html');
    expect(initialPropsEnhanced).toEqual({ test: true });
  });
});

describe('dedupeBunbles function', () => {
  const bundles = [
    {
      id: 'Rkrg',
      file: 'static/chunks/reactSlick.53db796a.chunk.css',
    },
    {
      id: 'adc',
      file: 'static/chunks/reactSlick.53db796a.chunk.css',
    },
    {
      id: 'dfg',
      file: 'static/chunks/reactSlick.53db796a.chunk.css',
    },
  ];
  it('should return non duplicated bundles', () => {
    expect(dedupeBunbles(bundles)).toHaveLength(1);
  });
  it('should return empty array if no bundles on the list', () => {
    expect(dedupeBunbles()).toHaveLength(0);
  });
});

describe('getPageStateFromNextData test', () => {
  it('should return an empty object by default', () => {
    expect(getPageStateFromNextData()).toEqual({});
  });
  it('should return an empty object when invalid value is provided', () => {
    expect(getPageStateFromNextData('value')).toEqual({});
  });
  it('should return an empty object when no props value is available', () => {
    expect(getPageStateFromNextData({
      props: {},
    })).toEqual({});
  });
  it('should return initialState value', () => {
    const nextData = {
      props: {
        pageProps: {
          initialState: {
            page: {
              test: 'test',
            },
          },
        },
      },
    };
    expect(getPageStateFromNextData(nextData))
      .toEqual(nextData.props.pageProps.initialState.page);
  });
  it('should return page value', () => {
    const nextData = {
      props: {
        pageProps: {
          page: {
            test: 'test',
          },
        },
      },
    };
    expect(getPageStateFromNextData(nextData))
      .toEqual(nextData.props.pageProps.page);
  });
});
