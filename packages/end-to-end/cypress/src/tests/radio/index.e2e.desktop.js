describe('Radio SPA', () => {
  let settings;

  before(() => {
    cy.fixture('radio').then((fixture) => {
      settings = fixture;
      cy.server();
      const requestList = [{
        url: new RegExp(`securepubads.g.doubleclick.net/gampad/ads(.)*?(${settings.ads.desktop.topAd})`),
        alias: 'topAd',
      }];
      requestList.map(cy.mapRequest);
      cy.visit(settings.url);
      requestList.map(cy.markRequest);
    });
  });

  describe('Advertising', () => {
    it('should render a local ad', function() {
      expect(this.topAd.result).to.equal(200);
    });
  });

  describe('Tracking', () => {
    it('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer.mobile);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'pageload_performance');
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
  });

  describe('player', () => {
    it('should call the request abacast APIs', function() {
      expect(this.abacastRequest.result).to.equal(200);
    });

    it('should exists player button', () => {
      cy.get(settings.selectors.playButton)
        .should('exist');
    });

    it('should display the radio sticky when the user clicks on play button', () => {
      cy.get(settings.selectors.playButton)
        .click({ force: true });

      cy.get(settings.selectors.stickyRadio)
        .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    it('should cover the full page with the radio background', () => {
      cy.get(settings.selectors.chevronUp)
        .click({ force: true });

      cy.get(settings.selectors.stickyRadio)
        .should('have.css', 'position', 'fixed');
    });

    it('should mute when the user click on volumen image', () => {
      cy.get(settings.selectors.volumeHigh)
        .click({ force: true });

      cy.get(settings.selectors.volumeOff)
        .should('exist');
    });

    it('should unmute when the user click on volumen image', () => {
      cy.get(settings.selectors.volumeOff)
        .click({ force: true });

      cy.get(settings.selectors.volumeHigh)
        .should('exist');
    });

    it('should open the share popup', () => {
      cy.get(settings.selectors.share)
        .click({ force: true });

      cy.get(settings.selectors.popup)
        .should('exist');
    });

    it('should close the share popup', () => {
      cy.get(settings.selectors.closePopup)
      .click({ force: true });

      cy.get(settings.selectors.popup)
        .should('not.exist');
    });

    it('should minimize the radio background', () => {
      cy.get(settings.selectors.chevronDown).eq(0)
        .click({ force: true });

      cy.get(settings.selectors.stickyRadio)
        .should('have.css', 'position', 'fixed');
    });

    it('should track the radio_click_exit_fullscreen event', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'radio_click_exit_fullscreen');
    });

    it('should hide the radio sticky when user clicks on close button', () => {
      cy.get(settings.selectors.stickyRadio)
        .as('sticky')
        .find('button > img[src*=close]')
        .click({ force: true });

      cy.get('@sticky')
        .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 64)');
    });

    it('should change to play button when the user clicks on pause button', () => {
      cy.get(settings.selectors.pauseSticky).eq(0)
        .click({ force: true });

      cy.get(settings.selectors.playSticky).eq(0)
        .should('exist');
    });

    it('should change to pause button when the user clicks on play button', () => {
      cy.get(settings.selectors.playSticky).eq(0)
        .click({ force: true });

      cy.get(settings.selectors.pauseSticky).eq(0)
        .should('exist');
    });
  });
});
