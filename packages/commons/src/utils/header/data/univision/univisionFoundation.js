import genericNavData from '../genericNavData';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const title = {
    ...defaultNav.title,
    name: null,
    logo: 'https://st1.uvnimg.com/bb/47/088b251e4edc90f287148739f8be/univision-foundation.svg',
  };
  return {
    ...defaultNav,
    title,
    links: [
      {
        name: 'Donate',
        link: 'https://secure.givelively.org/donate/univision-org-foundation',
        target: '_blank',
      },
    ],
  };
};
