/**
 * goToOpenCard
 * @param {Object} settings - ad tag
 * @returns {Object}
 */
const goToOpenCard = (settings) => {
  const { prevSlideArrow } = settings.selectors;
  return Cypress.Promise.try(() => {
    return Cypress.$('body').find(prevSlideArrow);
  }).then(($prevSlideArrow) => {
    if ($prevSlideArrow && $prevSlideArrow.length) {
      Cypress.$(prevSlideArrow).click();
      goToOpenCard(settings);
    }
  });
};

/**
 * goToLastSlide
 * @param {Object} settings - ad tag
 */
const goToLastSlide = (settings) => {
  const { nextSlideArrow, currentSlideNumber, finalSlideNumber } = settings.selectors;

  const $nextSlideArrow = Cypress.$('body').find(nextSlideArrow);
  const $currentSlideNumber = Cypress.$('body').find(currentSlideNumber);
  const $finalSlideNumber = Cypress.$('body').find(finalSlideNumber);
  const currentSlideNumberText = $currentSlideNumber.get(0).innerText;
  const finalSlideNumberText = $finalSlideNumber.text();

  if (
    ($nextSlideArrow && $nextSlideArrow.length)
    && ($currentSlideNumber && $currentSlideNumber.length)
    && ($finalSlideNumber && $finalSlideNumber.length)
    && (currentSlideNumberText !== finalSlideNumberText)
  ) {
    Cypress.$(nextSlideArrow).click();
    goToLastSlide(settings);
  }
};

/**
 * setAutoplay
 * @param {Object} shouldAutoPlay - shouldAutoPlay
 * @param {Object} settings - settings
 * @returns {Object}
 */
const setAutoplay = (shouldAutoPlay, settings) => {
  return Cypress.Promise.try(() => {
    return Cypress.$(settings.autoPlay.desktop.autoPlayStatus);
  }).then((element) => {
    const hasAutoPlay = element.text().trim() === 'Detener';

    if (hasAutoPlay !== shouldAutoPlay) {
      element.click();
    }
  });
};

describe('Horizontal Slideshow', () => {
  before(function() {
    cy.fixture('horizontalSlideshow').as('settings')
      .then(() => {
        cy.server();
        cy.registerAdRoute(this.settings.ads.desktop.firstSlideshow.bot, 'firstSlideshowBotAd');
        cy.registerAdRoute(this.settings.ads.desktop.firstSlideshow.mid, 'firstSlideshowMidAd');
        cy.visit(this.settings.uri)
          .then(() => {
            cy.get(this.settings.autoPlay.desktop.autoPlayStatus).as('autoPlayStatus');
            cy.get(this.settings.autoPlay.desktop.autoPlayButton).as('autoPlayButton');
            cy.get(this.settings.selectors.currentSlideNumber).as('currentSlideNumber');
            cy.get(this.settings.selectors.finalSlideNumber).as('finalSlideNumber');
            cy.get(this.settings.selectors.nextSlideArrow).as('nextSlideArrow');
            setAutoplay(false, this.settings);
          });
      });
  });

  describe('First Slideshow', () => {
    describe('Anchor Tag Change', () => {
      it('should have the correct url for the first slide', function() {
        const { uri, url: { firstSlide } } = this.settings;

        cy.url().should('eq', `${Cypress.config().baseUrl}${uri}${firstSlide}`);
      });

      it('should have the correct url for the second slide', function() {
        const { uri, url: { secondSlide } } = this.settings;

        this.nextSlideArrow.click();
        cy.url().should('eq', `${Cypress.config().baseUrl}${uri}${secondSlide}`);
      });
    });

    describe('Ads', () => {
      it('should make ad calls for the bottom and sidebar ads', () => {
        cy.waitForRoute('firstSlideshowBotAd');
        cy.waitForRoute('firstSlideshowMidAd');
      });

      it('should make ad call for the ad rendered every 3 slides', function() {
        cy.server();
        cy.registerAdRoute(this.settings.ads.desktop.firstSlideshow.int, 'firstSlideshowIntAd');
        // eslint-disable-next-line cypress/no-unnecessary-waiting, cypress/unsafe-to-chain-command
        cy.get(this.settings.selectors.nextSlideArrow)
          .click()
          .click()
          .click()
          .wait(2000); // give time to record ad call
        cy.waitForRoute('firstSlideshowIntAd');
      });
    });

    describe('Tracking', () => {
      it('should populate the data layer with the first slideshow data', function() {
        cy.waitUntilDataInDataLayer(this.settings.tracking.firstSlideshowDataLayer);
        cy.waitUntilEventInDataLayer(
          ({ event }) => event === this.settings.tracking.pageLoadPerformance
        );
      });

      it('should track each slide advance', function() {
        this.nextSlideArrow.click();
        cy.waitUntilEventInDataLayer(({ event }) => event === this.settings.tracking.slideAdvance);
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
          goToOpenCard(this.settings).then(() => {
            setAutoplay(true, this.settings).then(() => {
              cy.wrap(this.currentSlideNumber).contains('1');
              cy.clock().then(() => {
                cy.tick(8000);
              });
              cy.wrap(this.currentSlideNumber).contains('2');
            });
          });
        });

        it('should pause the autoplay when an arrow is clicked', function() {
          setAutoplay(true, this.settings).then(() => {
            this.nextSlideArrow.click();
            cy.wrap(this.autoPlayStatus).contains('Autoplay');
          });
        });

        it('should change from Detener to Autoplay when the pause button is clicked', function() {
          setAutoplay(true, this.settings).then(() => {
            cy.wrap(this.autoPlayStatus).contains('Detener');
            this.autoPlayButton.click();
            cy.wrap(this.autoPlayStatus).contains('Autoplay');
          });
        });
      });

      describe('Arrows', () => {
        it('should have only a next arrow in the first slide', function() {
          goToOpenCard(this.settings).then(() => {
            // eslint-disable-next-line babel/no-unused-expressions
            expect(this.nextSlideArrow).to.be.visible;
            cy.get(this.settings.selectors.prevSlideArrow)
              .should('not.be.visible');
          });
        });

        it('should have both arrows in the second slide', function() {
          goToOpenCard(this.settings).then(() => {
            this.nextSlideArrow.click();
            // eslint-disable-next-line babel/no-unused-expressions
            expect(this.nextSlideArrow).to.be.visible;
            cy.get(this.settings.selectors.prevSlideArrow)
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
    });
  });

  describe('Second Slideshow', () => {
    before(function() {
      goToLastSlide(this.settings);
    });

    it('should fetch the next slideshow and advance to it', function() {
      const { secondUri, selectors } = this.settings;
      cy.server();
      cy.route(new RegExp(/web-api\/content\?url=.*/)).as('fetchSlideshow');
      cy.registerAdRoute(this.settings.ads.desktop.secondSlideshow.bot, 'secondSlideshowBotAd');
      cy.registerAdRoute(this.settings.ads.desktop.secondSlideshow.mid, 'secondSlideshowMidAd');
      cy.get(selectors.nextGalleryButton).click();
      cy.wait('@fetchSlideshow', { timeout: 60000 });
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.url().should('eq', `${Cypress.config().baseUrl}${secondUri}`)
        .wait(2000); // give time to record ad call
    });

    it('should make ad calls for the bottom and sidebar ads', () => {
      cy.waitForRoute('secondSlideshowBotAd');
      cy.waitForRoute('secondSlideshowMidAd');
    });

    it('should make ad call for the ad rendered every 3 slides', function() {
      cy.server();
      cy.registerAdRoute(this.settings.ads.desktop.secondSlideshow.int, 'secondSlideshowIntAd');
      // eslint-disable-next-line cypress/no-unnecessary-waiting, cypress/unsafe-to-chain-command
      cy.get(this.settings.selectors.nextSlideArrow)
        .click()
        .click()
        .click()
        .wait(2000); // give time to record ad call
      cy.waitForRoute('secondSlideshowIntAd');
    });

    it('should populate the data layer with the second slideshow data', function() {
      cy.waitUntilDataInDataLayer(this.settings.tracking.secondSlideshowDataLayer);
    });

    it('should track a slideshow page view for the second slideshow', function() {
      cy.waitUntilEventInDataLayer(({ event, permalink }) => {
        return event === this.settings.tracking.viewSlideshow
          && permalink === this.settings.tracking.secondSlideshowDataLayer.permalink;
      });
    });

    it('should be able to go back to the previous slideshow', function() {
      const { uri, url: { lastSlide }, selectors } = this.settings;

      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(selectors.prevSlideArrow)
        .click()
        .click()
        .click()
        .click();
      cy.url().should('eq', `${Cypress.config().baseUrl}${uri}${lastSlide}`);
    });

    it('should track a slideshow page view for the first slideshow after going back to it', function() {
      cy.get(this.settings.selectors.prevSlideArrow).click();
      cy.waitUntilEventInDataLayer(({ event, permalink }) => {
        return event === this.settings.tracking.viewSlideshow
          && permalink === this.settings.tracking.firstSlideshowDataLayer.canonical_url;
      });
    });
  });
});
