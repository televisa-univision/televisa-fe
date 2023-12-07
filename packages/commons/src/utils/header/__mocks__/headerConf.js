const headerConfModule = jest.genMockFromModule('../headerConf');

const getClientHeaderConf = jest.fn(() => ({
  activePath: null,
  brandedNavLogoUri: '/',
  contentType: 'test Mock',
  links: [],
  shouldRenderMVPD: false,
  slideshowType: undefined,
  subNavType: 'contentSubNav',
  title: {
    link: null,
    logo: null,
    name: undefined,
    target: '_self',
  },
}));

headerConfModule.default = getClientHeaderConf;

export default headerConfModule.default;
