describe('brackets', () => {
  let url;
  let timeout;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, brackets: { url } } = fixture);
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid seasonKey and competitionKey', function() {
      const seasonKey = 2019;
      const competitionKey = 380;

      this.instance.get({
        url: `${url}/${seasonKey}/${competitionKey}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
      });
    });
  });

  describe('Fail', () => {
    it('should return 200 status code and empty leages array when params are null', function() {
      const seasonKey = null;
      const competitionKey = null;

      this.instance.get({
        url: `${url}/${seasonKey}/${competitionKey}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        // nested Assertions throws `TypeError: Cannot read property 'property' of undefined`
        expect(body.statusText).to.eq('Not found');
      });
    });
  });
});
