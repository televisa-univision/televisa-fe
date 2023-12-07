import image from '../templates/image';
import socialNetwork from '../templates/socialNetwork';

const fragment = `
  fragment univisionTagFragment on UnivisionTag {
    type
    uid
    uri
    vertical
    title
    description
    updateDate
    publishDate
    expirationDate
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
  }
`;

export default fragment;
