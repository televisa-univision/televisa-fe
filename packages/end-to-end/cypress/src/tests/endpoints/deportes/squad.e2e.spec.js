describe('squad', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, squad: { url, errorMessage } } = fixture);
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code and sport data when has competitionKey and teamKey', function() {
      const season = 2018;
      const competitionKey = 385;
      const teamKey = 1283;

      this.instance.get({
        url: `${url}/${season}`,
        qs: { competitionKey, teamKey },
      }).should(({ status, body }) => {
        const {
          'sports-content': {
            statistic: [{
              team: {
                player,
              },
            }],
          },
        } = body;
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
        // eslint-disable-next-line babel/no-unused-expressions
        expect(player).to.exist;
      });
    });

    it('should return 200 status code and error data when params are null', function() {
      const season = 2018;
      const competitionKey = null;
      const teamKey = null;

      this.instance.get({
        url: `${url}/${season}`,
        qs: { competitionKey, teamKey },
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.statusText).to.eq(errorMessage);
      });
    });
  });
});
