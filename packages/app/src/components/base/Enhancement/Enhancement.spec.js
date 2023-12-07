import React from 'react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Enhancement from '.';

jest.mock('react-lazyload', () => jest.fn(orgProps => <div>{orgProps.children}</div>));

const store = configureStore();

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

describe('getEnhancement tests', () => {
  it('returns null if no type', () => {
    const wrapper = shallow(<Enhancement />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('returns null for unknown types', () => {
    const data = {
      objectData: {
        type: 'unknown',
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('sets fullImage for InlineImage', () => {
    const data = {
      objectData: { type: 'image' },
      enhancementData: { alignment: 'left' },
    };
    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.find('[data-type]').prop('fullWidth')).toBe(true);
  });

  it('should return a Slideshow with server-side lazy loading', () => {
    const data = {
      objectData: {
        slides: null,
        type: 'slideshow',
        primaryTag: { foo: 'bar' },
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.dive().prop('fetchMode')).toBe('lazy');
  });

  it('should return a Slideshow with client-side lazy loading', () => {
    const data = {
      objectData: {
        slides: [{ image: {} }],
        type: 'slideshow',
        primaryTag: { foo: 'bar' },
        credit: 'The Grosby Group / The Grosby Group',
        caption: null,
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.find('FullWidth')).toHaveLength(1);
    expect(wrapper.children().prop('breakpoints')).toEqual(['xxs', 'xs']);
  });

  it('returns a fullWidth Video', async () => {
    const data = {
      objectData: {
        type: 'video',
      },
      enhancementData: {
        mcpid: 'KGUEKGK4456',
        primaryTag: {},
        uid: '74HGDG673',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );
    await actions(wrapper);
    expect(wrapper.find('VideoEnhancement')).toHaveLength(1);
    expect(wrapper.find('VideoEnhancement').prop('fullWidth')).toBe(true);
  });

  it('should return a fullWidth LiveStream', async () => {
    const data = {
      objectData: {
        type: 'livestream',
      },
      enhancementData: {
        streamId: 'KGUEKGK4456',
        livestreamId: 'KGUEKGK4456',
        primaryTag: {},
        tvssUrl: 'www.dummy.com',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );
    await actions(wrapper);
    expect(wrapper.find('LiveStreamEnhancement')).toHaveLength(1);
    expect(wrapper.find('LiveStreamEnhancement').prop('fullWidth')).toBe(true);
  });

  it('returns a RelatedArticle', () => {
    const data = {
      objectData: {
        type: 'article',
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.find('[data-type]')).toHaveLength(1);
  });

  it('returns a Quote', async () => {
    const data = {
      objectData: {
        type: 'quoteenhancement',
      },
      enhancementData: {
        text: 'a quote',
        quoteType: {
          name: 'PULLQUOTE',
        },
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );

    await actions(wrapper);

    expect(wrapper.find('Quote')).toBeDefined();
    expect(wrapper.find('Quote').prop('text')).toBe('a quote');
  });

  it('returns raw content for rawhtml enhancements', () => {
    const data = {
      objectData: {
        type: 'rawhtml',
        html: '<div>hello</div>',
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });

  it('returns raw content for rawhtml enhancements', () => {
    const data = {
      objectData: {
        type: 'rawhtml',
        html: null,
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('returns raw content for externalcontent enhancements', () => {
    const html = '<div>external</div>';
    const data = {
      objectData: {
        type: 'externalcontent',
        responseData: {
          html,
        },
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);

    expect(wrapper.props()).toEqual({
      html,
      settingsExternalContent: { html },
    });
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });

  it('returns raw content for externalcontent enhancements', () => {
    const data = {
      objectData: {
        type: 'externalcontent',
        responseData: {
          html: '',
        },
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);

    expect(wrapper.props()).toEqual({
      html: '',
      settingsExternalContent: { html: '' },
    });
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });

  it('returns raw content for externalcontent enhancements when empty', () => {
    const data = {
      objectData: {
        type: 'externalcontent',
        responseData: {},
      },
    };

    const wrapper = shallow(<Enhancement data={data} />);

    expect(wrapper.props()).toEqual({
      html: '',
      settingsExternalContent: {},
    });
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });

  it('does not use Loadable for non-lazy-loaded externalcontent', () => {
    const html = '<div>external</div>';
    const data = {
      objectData: {
        lazyLoad: false,
        type: 'externalcontent',
        responseData: {
          html,
        },
      },
    };
    const wrapper = shallow(<div><Enhancement data={data} /></div>);
    expect(wrapper.type()).toBe('div');
  });

  it('renders a full-width externalcontent', () => {
    const html = '<div>external</div>';
    const data = {
      objectData: {
        lazyLoad: false,
        type: 'externalcontent',
        responseData: {
          html,
          fullWidth: true,
        },
      },
    };
    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.props().breakpoints).toEqual(['xxs', 'xs', 'sm', 'md', 'lg', 'xl']);
  });

  it('sets fullImage for InlineImage', async () => {
    const data = {
      objectData: {
        type: 'image',
        renditions: {},
        uri: 'uri',
        title: 'title',
      },
      enhancementData: { alignment: 'left' },
    };
    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );
    await actions(wrapper);

    expect(wrapper.find('[data-type]').first().prop('fullWidth')).toBe(true);
    expect(wrapper.find('[data-type]').first().prop('enhancementData')).toEqual({
      alignment: 'left',
    });
  });

  it('returns a RelatedArticle', async () => {
    const data = {
      objectData: {
        type: 'article',
        title: 'title',
        uri: 'uri',
        primaryTag: 'primary',
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );
    await actions(wrapper);
    expect(wrapper.find('[data-type]').first().prop('data-type')).toBe('article');
  });

  it('should return a Slideshow', async () => {
    const data = {
      objectData: {
        slides: [{ image: {} }],
        type: 'slideshow',
        primaryTag: { foo: 'bar' },
      },
      pageData: {
        theme: {},
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement data={data} />
      </Provider>,
    );
    await actions(wrapper);

    expect(wrapper.find('[data-type]').first().prop('data-type')).toBe('slideshow');
  });

  it('returns a listitem', async () => {
    const data = {
      objectData: {
        title: 'FC Barcelona - 2877 puntos',
        description: 'El Fútbol Club Barcelona, conocido popularmente como Barça, es una entidad polideportiva con sede en Barcelona, España. Fue fundado como club de fútbol el 29 de noviembre de 1899 y registrado oficialmente el 5 de enero de 1903',
        authorComments: null,
        price: 'Precio estimado 2000 millones $',
        type: 'listitem',
        sponsor: {
          name: 'Barbie Sponsor logo',
          leadText: null,
          link: null,
          image: {
            type: 'image',
            uid: '00000178-fb20-da74-adfe-ff671a1f0000',
            title: 'Barbie sponsor logo',
            caption: null,
            credit: null,
            renditions: {
              original: {
                href: 'https://uvn-brightspot.s3.amazonaws.com/0e/61/70ec40ed4cb3b7b61810e91b3a4a/bb-ycb20-lockup-primary.png',
                width: 1521,
                height: 783,
              },
            },
          },
        },
        media: {
          type: 'image',
          uid: '00000175-15a0-de40-a9f7-d7a3cc3d0000',
          title: 'image.png',
          caption: null,
          credit: null,
          renditions: {
            original: {
              href: 'https://uvn-brightspot.s3.amazonaws.com/30/ac/01a0ea464b3591711bb07cd474cd/image.png',
              width: 1281,
              height: 720,
            },
          },
        },
        eCommerceCtas: [
          {
            title: 'Mas informacion',
            link: {
              href: 'https://www.youtube.com/',
              target: '_blank',
              text: 'Youtube',
              uid: '0000017b-74a4-d138-af7b-f7fe88200000',
            },
          },
        ],
      },
    };

    const wrapper = mount(
      <Provider store={store}>
        <Enhancement
          data={data}
          listNumber={1}
          device="desktop"
        />
      </Provider>,
    );
    await actions(wrapper);
    expect(wrapper.find('[data-type]').first().prop('data-type')).toBe('listitem');
  });

  it('should return empty render if no type', () => {
    const data = {
      objectData: null,
    };

    const wrapper = shallow(<Enhancement data={data} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
