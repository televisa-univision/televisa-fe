const query = `
  query getReactions($contentIds: [ID!]!) {
    getReactions(contentIds: $contentIds) {
      reactions {
        contentId
        userReaction
        counts {
          reaction
          count
        }
      }
    }
  }
  `;

export default query;
