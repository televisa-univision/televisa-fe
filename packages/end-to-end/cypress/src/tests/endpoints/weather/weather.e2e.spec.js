describe('weather', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, weather: { url, errorMessage } } = fixture);
      cy.requestInstance({ timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid id', function() {
      const option = 'current';
      const languageCode = 'en-US';
      const code = '00725';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(res => expect(res.status).to.eq(200));
    });
  });

  describe('Fail', () => {
    it('should return 404 status code when send a invalid data', function() {
      const option = 'xxxx';
      const languageCode = 'xxxx';
      const code = 'xxxx';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(404);
        expect(body).to.eq(errorMessage);
      });
    });

    it('should return 400 status code when option param is undefined', function() {
      const option = undefined;
      const languageCode = 'en-US';
      const code = '00725';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.statusCode).to.eq(400);
      });
    });

    it('should return 400 status code when all params are null', function() {
      const option = null;
      const languageCode = null;
      const code = null;

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.statusCode).to.eq(400);
      });
    });
  });
});
