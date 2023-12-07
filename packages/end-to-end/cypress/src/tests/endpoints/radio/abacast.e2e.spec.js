describe('abacast', () => {
  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      const { timeout, abacast: { url } } = fixture;
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code when has a valid id', function() {
      this.instance.get({
        qs: {
          abacastId: 2910,
        },
      }).should(res => expect(res.status).to.eq(200));
    });
  });

  describe('Fail', () => {
    it('should return 200 status code and empty array when id is not found', function() {
      this.instance.get({
        qs: {
          abacastId: 0,
        },
      }).should(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.performances).to.have.length(0);
      });
    });

    it('should return 500 status code when id is undefined', function() {
      this.instance.get({
        qs: {
          abacastId: undefined,
        },
      }).should(({ status, body }) => {
        expect(status).to.eq(500);
        // eslint-disable-next-line babel/no-unused-expressions
        expect(body).to.be.empty;
      });
    });

    it('should return 500 status code when doesn´t send parameters', function() {
      this.instance.get()
        .should(({ status, body }) => {
          expect(status).to.eq(500);
          // eslint-disable-next-line babel/no-unused-expressions
          expect(body).to.be.empty;
        });
    });
  });
});
