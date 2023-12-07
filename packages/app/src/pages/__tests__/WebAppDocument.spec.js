import React from 'react';
import { shallow, mount } from 'enzyme';
import Document from 'next/document';

import WebAppDocument from '../_document.main';

describe('WebAppDocument custom _document test', () => {
  it('should add correctly custom document', () => {
    const wrapper = shallow(<WebAppDocument />);

    expect(wrapper.find('Html')).toHaveLength(1);
    expect(wrapper.find('Main')).toHaveLength(1);
    expect(wrapper.find('DocumentHead')).toHaveLength(1);
    expect(wrapper.find('NextScript')).toHaveLength(1);
  });

  it('should return custom styles data', async () => {
    const pageStyle = '.test { color: blue; }';
    const DocumentSpy = jest.spyOn(Document, 'getInitialProps').mockImplementation(() => ({
      pageProps: {},
      styles: (
        <style id="page-style">
          {pageStyle}
        </style>
      ),
    }));
    const renderPageMock = jest.fn((opts) => {
      const App = <div />;
      if (opts?.enhanceApp) {
        opts.enhanceApp(App)({ test: true });
      }
    });
    const context = {
      renderPage: renderPageMock,
    };
    const documentProps = await WebAppDocument.getInitialProps(context);

    expect(DocumentSpy).toHaveBeenCalledWith(context);
    expect(documentProps).toHaveProperty('pageProps');

    const stylesWrapper = mount(documentProps.styles);

    expect(stylesWrapper.find('style')).toHaveLength(3);
    expect(stylesWrapper.find('style').at(0).props()).toHaveProperty('id', 'page-style');
    expect(stylesWrapper.find('style').at(1).props()).toHaveProperty('id', 'react-native-stylesheet');
    expect(stylesWrapper.find('style').at(2).props()).toHaveProperty('data-styled');
  });
});
