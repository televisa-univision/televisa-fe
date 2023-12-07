import image from '../templates/image';
import socialNetwork from '../templates/socialNetwork';

const fragment = `
  fragment slideshowFragment on Slideshow {
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
    cardLabel
    contentPriority
    cardImages {
      ${image}
    }
    description
    expirationDate
    hierarchy {
      uuid
      uri
      name
      title
    }
    image {
      ${image}
    }
    jwRecommendationChannel
    parent {
      uuid
      uri
      name
      title
    }
    publishDate
    slideCount
    slideshowType
    title
    type
    uid
    updateDate
    uri
    vertical
  }
`;

export default fragment;
