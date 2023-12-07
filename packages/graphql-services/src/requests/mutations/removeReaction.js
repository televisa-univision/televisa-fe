const mutation = `
mutation removeReaction($contentId: ID!) {
  removeReaction(contentId: $contentId) {
    contentId
  }
}
`;

export default mutation;
