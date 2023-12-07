describe.skip('AMP Article', () => {
  let settings;
  before(() => {
    cy.fixture('ampArticle')
      .then((fixture) => {
        settings = fixture;
      });
  });

  it('should render a valid AMP page for each URL', () => {
    for (let i = 0; i < settings.uris.length; i += 1) {
      const uri = settings.uris[i];
      cy.validateAmpPage(uri, (res) => {
        expect(res, `AMP page: ${uri}`).to.eq('PASS');
      });
    }
  });
});
