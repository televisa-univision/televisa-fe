describe('score cell', () => {
  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      const { timeout, scoreCell: { url } } = fixture;
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid param', function() {
      this.instance.get({
        qs: {
          debug: true,
        },
      }).should(({ status, body }) => {
        const {
          'sports-content': {
            schedule: [{
              'sports-event': sportsEvent,
            }] = [{}],
          } = {},
        } = body;
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
        // eslint-disable-next-line babel/no-unused-expressions
        expect(sportsEvent).to.exist;
        expect(sportsEvent).to.have.length(10);
      });
    });
  });
});
