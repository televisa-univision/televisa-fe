describe('stats', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, stats: { url, errorMessage } } = fixture);
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code and sport data when has a valid matchId', function() {
      const matchId = 1036474;

      this.instance.get({
        url: `${url}/${matchId}`,
      }).should(({ status, body }) => {
        const {
          'sports-content': {
            'sports-event': {
              team,
            } = {},
          } = {},
        } = body;
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
        // eslint-disable-next-line babel/no-unused-expressions
        expect(team).to.exist;
      });
    });

    it('should return 200 status code and error data when has a invalid matchId', function() {
      const matchId = 0;

      this.instance.get({
        url: `${url}/${matchId}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.statusText).to.eq(errorMessage);
      });
    });
  });
});
