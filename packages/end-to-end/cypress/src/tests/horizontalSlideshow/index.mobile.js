/**
 * goToOpenCard
 * @param {Object} settings - settings
 * @returns {Object}
 */
const goToOpenCard = (settings) => {
  const { prevSlide } = settings.selectors;
  return Cypress.Promise.try(() => {
    return Cypress.$('body').find(prevSlide);
  }).then((prevArrow) => {
    if (prevArrow && prevArrow.length) {
      Cypress.$(prevSlide).click();
      goToOpenCard(settings);
    }
  });
};

/**
 * setAutoplay
 * @param {Object} shouldAutoPlay - shouldAutoPlay
 * @param {Object} settings - settings
 * @returns {Object}
 */
const setAutoplay = (shouldAutoPlay, settings) => {
  return Cypress.Promise.try(() => {
    return Cypress.$('body');
  }).then((body) => {
    const {
      icon, playIcon, pauseIcon, button,
    } = settings.autoPlay.mobile;

    const autoPlaySVG = body.find(icon).html();

    if (autoPlaySVG === playIcon && shouldAutoPlay) {
      body.find(button).click();
    }

    if (autoPlaySVG === pauseIcon && !shouldAutoPlay) {
      body.find(button).click();
    }
  });
};

describe('Horizontal Slideshow', () => {
  before(function() {
    cy.fixture('horizontalSlideshow').as('settings')
      .then(() => {
        cy.server();
        cy.registerAdRoute(this.settings.ads.mobile.firstSlideshow.bot, 'firstSlideshowBotAd');
        cy.registerAdRoute(this.settings.ads.mobile.firstSlideshow.int, 'firstSlideshowIntAd');
        cy.visit(this.settings.uri).then(() => {
          cy.get(this.settings.autoPlay.mobile.button).as('autoPlayButton');
          cy.get(this.settings.selectors.currentSlideNumber).as('currentSlideNumber');
          cy.get(this.settings.selectors.nextSlideArrow).as('nextSlideArrow');
          setAutoplay(false, this.settings);
        });
      });
  });

  describe('Advertisement', () => {
    it('should have an INT ad after three slides', function() {
      // eslint-disable-next-line cypress/no-unnecessary-waiting, cypress/unsafe-to-chain-command
      cy.get(this.settings.selectors.nextSlideArrow)
        .click()
        .click()
        .click()
        .wait(1000);
      cy.waitForRoute('firstSlideshowIntAd');
    });

    it('should have an ad in the first slide', () => {
      cy.waitForRoute('firstSlideshowBotAd');
    });
  });

  describe('Tracking', () => {
    it('should populate the data layer', function() {
      cy.waitUntilDataInDataLayer(this.settings.tracking.firstSlideshowDataLayer);
      cy.waitUntilEventInDataLayer(
        ({ event }) => event === this.settings.tracking.pageLoadPerformance
        );
    });
    it('should track each slide advance', function() {
      this.nextSlideArrow.click();
      cy.waitUntilEventInDataLayer(({ event }) => event === this.settings.tracking.advance);
    });
    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });
  });

  describe('User Interface', () => {
    describe('Autoplay', () => {
      it('should change to next slide after 8 seconds', function() {
        setAutoplay(true, this.settings).then(() => {
          cy.wrap(this.currentSlideNumber).contains('1');
          cy.clock().then(() => {
            cy.tick(8000);
          });
          cy.wrap(this.currentSlideNumber).contains('2');
        });
      });

      it('should pause the autoplay when an arrow is clicked', function() {
        setAutoplay(true, this.settings).then(() => {
          const { icon, pauseIcon, playIcon } = this.settings.autoPlay.mobile;
          cy.get(icon).should('have.html', pauseIcon);
          this.nextSlideArrow.click();
          cy.get(icon).should('have.html', playIcon);
        });
      });

      it('should change icons from Pause to Play when the pause/play button is clicked', function() {
        setAutoplay(true, this.settings).then(() => {
          const { icon, pauseIcon, playIcon } = this.settings.autoPlay.mobile;
          cy.get(icon).should('have.html', pauseIcon);
          this.autoPlayButton.click();
          cy.get(icon).should('have.html', playIcon);
        });
      });
    });

    describe('Arrows', () => {
      it('should have only a next arrow in the first slide', function() {
        goToOpenCard(this.settings).then(() => {
          // eslint-disable-next-line babel/no-unused-expressions
          expect(this.nextSlideArrow).to.be.visible;
          cy.get(this.settings.selectors.prevSlide)
            .should('not.be.visible');
        });
      });

      it('should have both arrows in the second slide', function() {
        goToOpenCard(this.settings).then(() => {
          this.nextSlideArrow.click();
          // eslint-disable-next-line babel/no-unused-expressions
          expect(this.nextSlideArrow).to.be.visible;
          cy.get(this.settings.selectors.prevSlide)
            .should('be.visible');
        });
      });
    });

    describe('Page elements', () => {
      it('should have main elements', function() {
        this.nextSlideArrow.click();
        cy.elementShouldExist(this.settings.selectors);
      });
    });

    describe('Stitching', () => {
      it('should have the correct url for the first slide', function() {
        goToOpenCard(this.settings).then(() => {
          const { uri, url: { firstSlide } } = this.settings;
          cy.url().should('eq', `${Cypress.config().baseUrl}${uri}${firstSlide}`);
        });
      });

      it('should have the correct url for the second slide', function() {
        goToOpenCard(this.settings).then(() => {
          const { uri, url: { secondSlide } } = this.settings;
          this.nextSlideArrow.click();
          cy.url().should('eq', `${Cypress.config().baseUrl}${uri}${secondSlide}`);
        });
      });
    });
  });
});
