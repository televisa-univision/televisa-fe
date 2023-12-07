describe('events', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, events: { url, errorMessage } } = fixture);
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid matchId', function() {
      const matchId = 920517;

      this.instance.get({
        url: `${url}/${matchId}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
      });
    });
  });

  describe('Fail', () => {
    it('should return 200 status code and error data when has invalid matchId', function() {
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
