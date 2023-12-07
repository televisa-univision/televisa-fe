import { COMSCORE_REG_EXP, NIELSEN_REG_EXP } from '../../constants';

describe('Vertical Slideshow Without Stitching', () => {
  before(function() {
    cy.fixture('trackingEvents').as('trackingEvents');
    cy.fixture('verticalSlideshow').as('settings')
      .then(() => {
        cy.server();
        cy.registerAdRoute(this.settings.ads.withoutStitching.mobile.top, 'topAd');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.visit(this.settings.uri.withoutStitching)
          .then(() => {
            cy.window().its('__INITIAL_STATE__').as('initialState');
          })
          .wait(2000); // give some time to record call for first slideshow top ad
      });
  });

  describe('User Interface', () => {
    it('should navigate to a vertical slideshow successfully', function() {
      cy.url().should('eq', `${Cypress.config().baseUrl}${this.settings.uri.withoutStitching}`);
    });

    it('should render an image and ad per each slide', function() {
      const { data: { slides } } = this.initialState;

      cy.server();
      cy.registerAdRoute(this.settings.ads.withoutStitching.mobile.mid, 'midAd');
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.wrap(slides).each(({ uid }) => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.waitUntil(() => cy.get(`#${uid.split`-`[4]}`))
          .scrollIntoView({ duration: 500 })
          .should('exist');
      }).then(() => {
        cy.get(this.settings.selectors.adReady)
          .should('have.length', slides.length);
      });
    });

    it('should render the title of the slideshow', function() {
      const { data: { title } } = this.initialState;

      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(this.settings.selectors.headerTitle)
        .scrollIntoView()
        .should('contain.text', title);
    });

    it('should render the next slide', function() {
      const { data: { nextSlideshows: [nextSlideshow] } } = this.initialState;

      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(this.settings.selectors.nextSlideContainer)
        .scrollIntoView()
        .should('exist');
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(`a[href="${nextSlideshow.url}"]:first`)
        .scrollIntoView()
        .should('exist');
    });
  });

  describe('Advertisement', () => {
    it('should render a TOP_AD', () => {
      cy.waitForRoute('topAd');
    });

    it('should render a MID_AD', () => {
      cy.waitForRoute('midAd');
    });
  });

  describe('Tracking', () => {
    it('should track the page performance', function() {
      cy.waitUntilEventInDataLayer(
        ({ event }) => event === this.trackingEvents.pageloadPerformance
      );
    });

    it('should track each slide advance', function() {
      cy.waitUntilEventInDataLayer(({ event }) => event === this.trackingEvents.slideAdvance);
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(COMSCORE_REG_EXP);
    });

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(NIELSEN_REG_EXP);
    });
  });
});
