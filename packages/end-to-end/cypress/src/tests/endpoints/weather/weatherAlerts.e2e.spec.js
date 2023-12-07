describe('weather alerts', () => {
  let url;
  let timeout;
  let errorMessage;

  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      ({ timeout, weatherAlerts: { url, errorMessage } } = fixture);
      cy.requestInstance({ timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid id', function() {
      const option = 'details';
      const languageCode = 'en-US';
      const code = 'ded9c05d-e91f-335a-9f91-d91b9f41858c';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(res => expect(res.status).to.eq(200));
    });
  });

  describe('Fail', () => {
    it('should return 404 status code when option param is undefined', function() {
      const option = 'xxxx';
      const languageCode = 'xxxx';
      const code = 'xxx';

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
      const code = 'ded9c05d-e91f-335a-9f91-d91b9f41858c';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.statusCode).to.eq(400);
      });
    });

    it('should return 400 status code when all params are null', function() {
      const option = null;
      const languageCode = 'en-US';
      const code = 'ded9c05d-e91f-335a-9f91-d91b9f41858c';

      this.instance.get({
        url: `${url}/${option}/${languageCode}/${code}`,
      }).should(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.statusCode).to.eq(400);
      });
    });
  });
});
