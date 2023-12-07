import articleFragment from '../fragments/articleFragment';
import univisionTagFragment from '../fragments/univisionTagFragment';
import genericCmsContentFragment from '../fragments/genericCmsContentFragment';
import videoFragment from '../fragments/videoFragment';
import slideshowFragment from '../fragments/slideshowFragment';
import show from '../templates/show';

const query = `
  mutation addFavoriteHoroscopeSign($signId: ID!, $requestingUrl: String!) {
    addFavoriteHoroscopeSign(signId: $signId, requestingUrl: $requestingUrl) {
      ids
      items {
        __typename
        ... on Article {
          ...articleFragment
        }
        ... on UnivisionTag {
          ...univisionTagFragment
        }
        ... on Show {
          ${show}
        }
        ... on Video {
          ...videoFragment
        }
        ... on Slideshow {
          ...slideshowFragment
        }
        ... on GenericCmsContent {
          ...genericCmsContentFragment
        }
      }
    }
  }

  ${articleFragment}
  ${genericCmsContentFragment}
  ${univisionTagFragment}
  ${videoFragment}
  ${slideshowFragment}
  `;

export default query;
