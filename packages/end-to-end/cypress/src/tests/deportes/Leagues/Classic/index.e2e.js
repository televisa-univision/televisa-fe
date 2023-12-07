describe('Deportes League Page Classic - Inicio', () => {
  let settings;

  before(() => {
    cy.task('fixture', 'deportes/leaguesClassic').then((fixture) => {
      settings = fixture.inicio;
      cy.visit(settings.uri).then(() => {
        cy.scrollFullPage({ legacy: true });
      });
    });
  });

  describe('Advertising', () => {
    it('should check that all ads are rendered.', () => {
      cy.get(settings.ads).its('length').should('be.gte', 2);
    });
  });

  describe('Tracking', () => {
    it.skip('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer);
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
  });

  describe('User Interface', () => {
    it('should check that page widgets are present', () => {
      cy.elementShouldExist(settings.selectors);
    });
  });
});
