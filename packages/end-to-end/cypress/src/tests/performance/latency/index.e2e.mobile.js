describe('Performance', () => {
  describe('Latency', () => {
    it.skip('should have a latency < 3 seconds', () => {
      cy.fixture('latency').then((settings) => {
        settings.uris.forEach((url) => {
          cy.request({
            url,
            timeout: 3000,
          }).then((res) => {
            expect(res.status).to.eq(200);
          });
        });
      });
    });
  });
});
