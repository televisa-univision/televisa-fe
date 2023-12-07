import DocumentHead from '.';

const context = {
  assetPrefix: '',
  dynamicImports: [
    {
      id: 'Rkrg',
      file: 'static/chunks/reactSlick.53db796a.chunk.css',
    },
    {
      id: 'frp7',
      file: 'static/chunks/reactSlick.53db796a.chunk.css',
    },
  ],
  devOnlyCacheBusterQueryString: '',
};

const files = {
  allFiles: [
    'test.js',
    'test.css',
    'shared.js',
    'shared.css',
    'page.js',
    'page.css',
  ],
  pageFiles: [
    'page.js',
    'page.css',
  ],
  sharedFiles: [
    'shared.js',
    'shared.css',
  ],
};

/**
 * @test {DocumentHead}
 */
describe('DocumentHead test', () => {
  it('should include app css links', () => {
    const props = { crossOrigin: false };
    const head = new DocumentHead(props);
    head.context = context;

    expect(head.getCssLinks(files)).toHaveLength(8);
    // should be re-ordered to have app styles as first items
    expect(head.getCssLinks(files)[0].key.includes('_app.js.6f94f0c0.chunk.css-preload'));
    expect(head.getCssLinks(files)[1].key.includes('_app.js.6f94f0c0.chunk.css'));
  });

  it('should not return css links if not files were passed', () => {
    const head = new DocumentHead({});
    head.context = {
      dynamicImports: [],
      assetPrefix: '',
    };
    expect(head.getCssLinks({
      allFiles: [],
    })).toBe(null);
  });

  it('should not return css from dynamic import if there is no css in them', () => {
    const head = new DocumentHead({});
    head.context = {
      dynamicImports: [
        {
          id: 'Rkrg',
          file: 'static/chunks/reactSlick.53db796a.chunk.js',
        },
        {
          id: 'frp7',
          file: 'static/chunks/reactSlick.53db796a.chunk.js',
        },
      ],
      assetPrefix: '',
    };
    expect(head.getCssLinks({
      allFiles: [],
    })).toBe(null);
  });

  it('should return null on preloading js', () => {
    const head = new DocumentHead({});
    expect(head.getPreloadDynamicChunks()).toBe(null);
    expect(head.getPreloadMainLinks()).toBe(null);
  });
});
