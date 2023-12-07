import socialNetwork from '../templates/socialNetwork';
import image from '../templates/image';

const fragment = `
  fragment articleFragment on Article {
    type
    uid
    uri
    title
    description
    vertical
    updateDate
    publishDate
    expirationDate
    body {
      __typename
      ... on TextParagraph {
        type
        value
      }
    }
    recipeData {
      totalMinutes
      difficulty
      mealTypes
    }
    jobListingData {
      cityName
      employment
      website
    }
    askExpertData {
      phoneNumber
      website
    }
    horoscopeData {
      signData {
        type
        uid
        uri
      }
      horoscopeDate
      horoscopeDescription
    }
    parent {
      uuid
      uri
      name
      title
    }
    image {
      ${image}
    }
    authors {
      fullName
      image {
        ${image}
      }
      uri
      socialNetworks {
        facebookUrl {
          ${socialNetwork}
        }
        googleUrl {
          ${socialNetwork}
        }
        instagramUrl {
          ${socialNetwork}
        }
        linkedinUrl {
          ${socialNetwork}
        }
        pinterestUrl {
          ${socialNetwork}
        }
        snapchatUrl {
          ${socialNetwork}
        }
        twitterUrl {
          ${socialNetwork}
        }
        youTubeUrl {
          ${socialNetwork}
        }
      }
      link
      mediaCompany
      designation
      description
      address
      phoneNumber
      website
    }
    hierarchy {
      uuid
      uri
      name
      title
    }
    jwRecommendationChannel
  }
`;

export default fragment;
