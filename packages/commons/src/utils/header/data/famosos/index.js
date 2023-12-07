import genericNavData from '../genericNavData';
import links from './links/home';
import { getHeaderLink, isVerticalHomeByUri } from '../../helpers';

const logo = 'https://st1.uvnimg.com/ba/4f/44b1d5214343bd80b37cae72573f/famosos-228x27.png';

export default (data = {}) => {
  const defaultNav = genericNavData(data);
  const isVertical = isVerticalHomeByUri(data.uri);
  const title = {
    ...defaultNav.title,
    link: isVertical ? getHeaderLink(data) : data.primaryTag?.uri,
    logo: isVertical ? logo : null,
    name: isVertical ? null : defaultNav.title?.name,
  };

  return {
    ...defaultNav,
    title,
    links,
  };
};
