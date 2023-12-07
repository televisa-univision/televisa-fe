const mutation = `
mutation addReaction($contentId: ID!, $reaction: Reaction!) {
  addReaction(contentId: $contentId, reaction: $reaction) {
    reaction {
      content
    }
  }
}
`;

export default mutation;
