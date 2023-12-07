describe('weather location', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, weatherLocation: { url, errorMessage } } = fixture);
      cy.requestInstance({ timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid id', function() {
      const filter = 'cityname';
      const value = 'chicago';
      const languageCode = 'en-US';

      this.instance.get({
        url: `${url}/${filter}/${value}/${languageCode}`,
      }).should(res => expect(res.status).to.eq(200));
    });
  });

  describe('Fail', () => {
    it('should return 404 status code when send a invalid data', function() {
      const filter = 'xxxx';
      const value = 'xxxx';
      const languageCode = 'xxxx';

      this.instance.get({
        url: `${url}/${filter}/${value}/${languageCode}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body).to.eq(errorMessage);
      });
    });

    it('should return 400 status code when filter param is undefined', function() {
      const filter = undefined;
      const value = 'chicago';
      const languageCode = 'en-US';

      this.instance.get({
        url: `${url}/${filter}/${value}/${languageCode}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body).to.eq(errorMessage);
      });
    });

    it('should return 400 status code when all params are null', function() {
      const filter = null;
      const value = null;
      const languageCode = null;

      this.instance.get({
        url: `${url}/${filter}/${value}/${languageCode}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body).to.eq(errorMessage);
      });
    });
  });
});
