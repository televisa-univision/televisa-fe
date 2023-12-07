/**
 * graphQL query to translate a desired text to spanish
 */
const query = `
  query getSpanishTranslation($text: String!) {
    getSpanishTranslation(text: $text)
  }
`;

export default query;
