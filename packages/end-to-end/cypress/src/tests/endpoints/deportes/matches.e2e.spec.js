describe('matches', () => {
  before(() => {
    cy.fixture('endpoints').then((fixture) => {
      const { timeout, matches: { url } } = fixture;
      cy.requestInstance({ url, timeout }).as('instance');
    });
  });

  describe('Success', () => {
    it('should return 200 status code and 7 events when has seasonKey and competitionKey', function() {
      const seasonKey = 2019;
      const competitionKey = 380;
      const sort = 'start-date-time-asc';
      const limit = 50;
      const startDate = '2019-06-27T05:00:00.000Z';

      this.instance.get({
        qs: {
          seasonKey, competitionKey, sort, limit, startDate,
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
        expect(sportsEvent).to.have.length(7);
      });
    });

    it('should return 200 status code and 50 events when params are null', function() {
      const seasonKey = null;
      const competitionKey = null;
      const sort = 'start-date-time-asc';
      const limit = 50;
      const startDate = '2019-06-27T05:00:00.000Z';

      this.instance.get({
        qs: {
          seasonKey, competitionKey, sort, limit, startDate,
        },
      }).should(({ status, body }) => {
        const {
          'sports-content': {
            schedule: [{
              'sports-event': sportsEvent,
            }] = [{}],
          },
        } = body;
        expect(status).to.eq(200);
        expect(body).to.have.property('sports-content');
        // eslint-disable-next-line babel/no-unused-expressions
        expect(sportsEvent).to.exist;
        expect(sportsEvent).to.have.length(50);
      });
    });
  });
});
