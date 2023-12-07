import image from './image';
import socialNetwork from './socialNetwork';

export default `
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
airTime
cardLabel
contentPriority
description
expirationDate
headerLogo {
  ${image}
}
hierarchy {
  uuid
  uri
  name
  title
}
highImpactImages {
  desktop {
    ${image}
  }
  mobile {
    ${image}
  }
}
image {
  ${image}
}
parent {
  uuid
  uri
  name
  title
}
publishDate
showCardArtwork {
  ${image}
}
socialNetworks {
  ${socialNetwork}
}
title
trailerMcpId
type
uid
updateDate
uri
vertical
`;
