import image from '../templates/image';
import socialNetwork from '../templates/socialNetwork';
import show from '../templates/show';

const fragment = `
  fragment videoFragment on Video {
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
    authRequired
    cardLabel
    contentPriority
    description
    durationString
    episodeNo
    expirationDate
    hierarchy {
      uuid
      uri
      name
      title
    }
    hasNextEpisode
    image {
      ${image}
    }
    longform
    longformPlayList
    mcpid
    parent {
      uuid
      uri
      name
      title
    }
    publishDate
    previewUrl
    sharing {
      options {
        facebook {
          appId
          description
          imageUrl
          isFeedDialog
          title
          url
        }
        mail {
          body
          subject
        }
        twitter {
          title
          url
          via
        }
        whatsapp {
          title
          url
        }
      }
    }
    show {
      ${show}
    }
    source
    title
    type
    uid
    updateDate
    uri
    vertical
  }
`;

export default fragment;
