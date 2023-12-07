import articleFragment from '../fragments/articleFragment';
import univisionTagFragment from '../fragments/univisionTagFragment';
import videoFragment from '../fragments/videoFragment';
import slideshowFragment from '../fragments/slideshowFragment';
import genericCmsContentFragment from '../fragments/genericCmsContentFragment';
import show from '../templates/show';

const query = `
  query getUser($requestingUrl: String!) {
    getUser {
      favorites {
        horoscopes {
          signIds
          daily (requestingUrl: $requestingUrl) {
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
    }
  }

  ${articleFragment}
  ${genericCmsContentFragment}
  ${univisionTagFragment}
  ${slideshowFragment}
  ${videoFragment}
  `;

export default query;
