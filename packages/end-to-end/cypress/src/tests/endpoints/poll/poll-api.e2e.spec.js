describe('poll-api', () => {
  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      const { timeout, pollApi: { url } } = fixture;
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid id', function() {
      this.instance.get({
        qs: {
          slideshowId: '0000015e-58ab-d57d-a57f-dbab2ade0000',
          slideId: '0000015e-5897-ddd6-a9fe-7bdf95660000',
          readOnly: true,
          webAppPoll: false,
        },
      }).should(res => expect(res.status).to.eq(200));
    });
  });

  describe('Fail', () => {
    it('should return 200 status code and error object on body if we send an undefined slideshowId param', function() {
      this.instance.get({
        qs: {
          slideshowId: undefined,
          slideId: '0000015e-5897-ddd6-a9fe-7bdf95660000',
          readOnly: true,
          webAppPoll: false,
        },
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.status).to.eq('error');
      });
    });

    it('should return 200 status code and error object on body if we don´t send parameters', function() {
      this.instance.get()
        .should(({ status, body }) => {
          expect(status).to.eq(200);
          expect(body.status).to.eq('error');
        });
    });
  });
});
