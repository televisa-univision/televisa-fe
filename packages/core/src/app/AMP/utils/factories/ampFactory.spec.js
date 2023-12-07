import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import ampFactory from './ampFactory';

describe('ampFactory', () => {
  it('returns an amp-instagram for valid instagram embeds v7', () => {
    const rawHtml = '<blockquote class="instagram-media"><a href="https://www.instagram.com/p/BYUKlyP_-j9$!Fw/" />';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<amp-instagram data-shortcode="BYUKlyP_-j9$!Fw" data-default-framing="true" width="1" height="1" layout="responsive" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-instagram>');
  });

  it('returns an amp-instagram for valid instagram embeds v8', () => {
    const rawHtml = '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/BYUKlyP_-j9$!Fw/" />';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<amp-instagram data-shortcode="BYUKlyP_-j9$!Fw" data-default-framing="true" width="1" height="1" layout="responsive" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-instagram>');
  });

  it('returns a sanitized element for invalid instagram embeds', () => {
    const rawHtml = '<blockquote class="instagram-media">';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<blockquote class="instagram-media"></blockquote>');
  });

  it('returns an amp-twitter for valid twitter embeds', () => {
    const rawHtml = '<blockquote class="twitter-tweet"><a href="https://twitter.com/BarackObama/status/901946021437206528">';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<amp-twitter data-tweetid="901946021437206528" width="1" height="1" layout="responsive" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-twitter>');
  });

  it('returns an amp-facebook for valid facebook embeds', () => {
    const ampComponent = ampFactory.embedToAmp({ _url: 'https://www.facebook.com/univision/posts/123455345/' });
    expect(ampComponent).toBe('<amp-facebook width="1" height="1" layout="responsive" data-href="https://www.facebook.com/univision/posts/123455345/" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-facebook>');
  });

  it('returns a sanitized element for invalid twitter embeds', () => {
    const rawHtml = '<blockquote class="twitter-tweet">';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<blockquote class="twitter-tweet"></blockquote>');
  });

  it('returns a sandboxed amp-iframe for valid iframes - http', () => {
    const rawHtml = '<iframe test="1" data-test="2" src="http://www.facebook.com/test/etc" />';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<amp-iframe sandbox="allow-scripts allow-same-origin" height="1" width="1" layout="responsive" allowfullscreen="" frameborder="0" src="https://www.facebook.com/test/etc" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-iframe>');
  });

  it('returns a sandboxed amp-iframe for valid iframes - https', () => {
    const rawHtml = '<iframe test="1" data-test="2" src="https://www.facebook.com/test/etc" />';
    const ampComponent = ampFactory.embedToAmp({ html: rawHtml });
    expect(ampComponent).toBe('<amp-iframe sandbox="allow-scripts allow-same-origin" height="1" width="1" layout="responsive" allowfullscreen="" frameborder="0" src="https://www.facebook.com/test/etc" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div></amp-iframe>');
  });

  it('returns a sanboxed amp-iframe for External Content', () => {
    Store.dispatch(setPageData({ data: { uri: 'test/article' } }));
    const objectData = {
      fullWidth: true,
      rev: '1',
      _maximumHeight: null,
      lazyLoadUrl: 'https://static.univision.com/external-content/embed.js?path=%2Fespeciales%2Fnoticias%2Fformatos%2Festados-y-loterias-listanumerada-1213%2Findex1541873262.html&display=iframe&fullWidth=true&rev=1',
      display: 'iframe',
      _maximumWidth: null,
      html: '<script src="https://static.univision.com/external-content/embed.js?path=%2Fespeciales%2Fnoticias%2Fformatos%2Festados-y-loterias-listanumerada-1213%2Findex1541873262.html&display=iframe&fullWidth=true&rev=1"></script>',
      type: 'rich',
      _url: 'https://static.univision.com/especiales/noticias/formatos/estados-y-loterias-listanumerada-1213/index1541873262.html?fullWidth=true&amp;rev=1',
    };
    const ampComponent = ampFactory.embedToAmp(objectData, 0);
    expect(ampComponent).toBe('<amp-iframe sandbox="allow-scripts allow-same-origin allow-popups" height="1" width="1" layout="responsive" allowfullscreen="" frameborder="0" resizable="" src="https://static.univision.com/amp/amp-iframe-html.htm?url=https://static.univision.com/especiales/noticias/formatos/estados-y-loterias-listanumerada-1213/index1541873262.html?fullWidth=true&amp;amp;rev=1?&amp;" data-reactroot=""><div placeholder="">Cargando<!-- --> ...</div><div overflow="">Leer más</div></amp-iframe>');
  });

  it('returns null for invalid embeds', () => {
    expect(ampFactory.embedToAmp({})).toBe(null);
  });

  it('merges contiguous RawHtml', () => {
    const chunks = [
      {
        objectData: {
          type: 'rawhtml',
          html: 'foo',
        },
      },
      {
        objectData: {
          type: 'rawhtml',
          html: 'bar',
        },
      },
      {
        objectData: {
          type: 'text',
        },
      },
    ];

    const mergedChunks = ampFactory.mergeRawHtmls(chunks);
    expect(mergedChunks[0].skip).toBeTruthy();
    expect(mergedChunks[2].skip).toBeFalsy();
    expect(ampFactory.mergeRawHtmls(null)).toEqual([]);
  });

  it('returns null for non-supported amp content', () => {
    expect(ampFactory.getAmpHtmlLink({ data: { type: 'liveblog' } })).toBeFalsy();
  });

  it('returns the meta for supported amp content', () => {
    expect(ampFactory.getAmpHtmlLink({ data: { type: 'article', enableForGoogleAmp: true } })).toBeTruthy();
  });
});
