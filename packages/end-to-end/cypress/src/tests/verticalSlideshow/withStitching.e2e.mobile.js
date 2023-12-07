const FOUR_MINUTES = 60 * 1000 * 4;

/**
 * getSlideshowSelector
 * @param {Object} depth - depth
 * @returns {Object}
 */
const getSlideshowSelector = depth => `[data-element-name='vertical-slideshow-item-container-${depth}']`;

/**
 * scrollToElement
 * @param {Object} selector - selector
 * @returns {Object}
 */
const scrollToElement = (
  selector,
  { step = 100, waitPerStep = 0, timeout = FOUR_MINUTES } = {}
) => cy.scrollUntil({
    checkFn: () => cy.get('body').then(($body) => {
        if ($body.find(selector).length > 0) {
          return true;
        }

        return false;
      }),
    step,
    waitPerStep,
    timeout,
  });

 /**
  * scrollToElement
  * @param {Object} settings - settings
  * @param {Object} slideshowDepth - slideshowDepth
  * @returns {Object}
 */
const scrollIntoFifthSlide = (settings, slideshowDepth) => cy
    .get(
      `${getSlideshowSelector(slideshowDepth)} > ${
        settings.selectors.fifthSlide
      }`
    )
    .scrollIntoView({ duration: 5000 });

/**
  * waitForSlideshowSlideAdvance
  * @param {Object} trackingEvents - trackingEvents
  * @param {Object} depth - depth
  * @returns {Object}
 */
const waitForSlideshowSlideAdvance = (trackingEvents, depth) => cy.waitUntilEventInDataLayer(
  ({ event, slideshowDepth }) => {
    return event === trackingEvents.slideAdvance && slideshowDepth === depth;
  }
  );

  /**
  * waitForSlideshowPageView
  * @param {Object} trackingEvents - trackingEvents
  * @param {Object} depth - depth
  * @returns {Object}
 */
const waitForSlideshowPageView = (trackingEvents, depth) => cy.waitUntilEventInDataLayer(
  ({ event, slideshowDepth }) => {
    return (
      event === trackingEvents.slideshowPageView && slideshowDepth === depth
    );
  }
  );

describe('Vertical Slideshow With Stitching', () => {
  before(() => {
    cy.fixture('trackingEvents').as('trackingEvents');
    cy.fixture('verticalSlideshow').as('settings');
  });

  describe('Advancing slides on first slideshow', () => {
    before(function() {
      cy.server();
      cy.registerAdRoute(
        this.settings.ads.withStitching.firstSlideshow.mobile.top,
        'firstSlideshowTopAd'
      );
      cy.registerAdRoute(
        this.settings.ads.withStitching.firstSlideshow.mobile.mid1,
        'firstSlideshowMidAd1'
      );
      cy.registerAdRoute(
        this.settings.ads.withStitching.firstSlideshow.mobile.mid2,
        'firstSlideshowMidAd2'
      );
      cy.visit(this.settings.uri.withStitching);
      scrollIntoFifthSlide(this.settings, 1);
    });

    it('should track a slide advance event', function() {
      waitForSlideshowSlideAdvance(this.trackingEvents, 1);
    });

    it('should make the api call for the top ad', () => {
      cy.waitForRoute('firstSlideshowTopAd');
    });

    it('should make the api call for the first mid ad of the first slideshow', () => {
      cy.waitForRoute('firstSlideshowMidAd1');
    });

    it('should make the api call for the second mid ad of the first slideshow', () => {
      cy.waitForRoute('firstSlideshowMidAd2');
    });
  });

  describe('Advancing slides on second slideshow', () => {
    before(function() {
      cy.server();
      cy.registerAdRoute(
        this.settings.ads.withStitching.secondSlideshow.mobile.mid1,
        'secondSlideshowMidAd1'
      );
      cy.registerAdRoute(
        this.settings.ads.withStitching.secondSlideshow.mobile.mid2,
        'secondSlideshowMidAd2'
      );
      cy.visit(this.settings.uri.withStitching);
      scrollToElement(getSlideshowSelector(2));
      scrollIntoFifthSlide(this.settings, 2);
    });

    it('should track a slide advance event', function() {
      waitForSlideshowSlideAdvance(this.trackingEvents, 2);
    });

    it('should track a slideshow page view event', function() {
      waitForSlideshowPageView(this.trackingEvents, 2);
    });

    it('should make the api call for the first mid ad of the second slideshow', () => {
      cy.waitForRoute('secondSlideshowMidAd1');
    });

    it('should make the api call for the second mid ad of the second slideshow', () => {
      cy.waitForRoute('secondSlideshowMidAd2');
    });
  });

  describe('Advancing through all slideshows', () => {
    before(function() {
      cy.visit(this.settings.uri.withStitching);
      scrollToElement(this.settings.selectors.endCard, { step: 350 });
      scrollToElement('footer:last');
      cy.get('footer:last').scrollIntoView({ duration: 2500 });
    });

    beforeEach(() => {
      cy.window()
        .its('__INITIAL_STATE__')
        .as('initialState');
    });

    it('should render the title of each of the 5 slideshows', function() {
      cy.get(this.settings.selectors.headerTitle).should('have.length', 5);
    });

    it.skip('should render every slide with an ad (except for the last slide of each slideshow)', function() {
      const {
        data: { slides, nextSlideshows },
      } = this.initialState;
      const firstSlideshowSlidesCount = slides.length;
      const nextSlideshowsSlidesCount = nextSlideshows
        .slice(0, 4)
        .reduce((count, slideshow) => {
          const total = count + slideshow.slideCount;
          return (total);
        }, 0);
      const totalSlidesCount = firstSlideshowSlidesCount + nextSlideshowsSlidesCount;

      cy.get(this.settings.selectors.slide).should(
        'have.length',
        totalSlidesCount
      );
      cy.get(this.settings.selectors.adContainer).should(
        'have.length',
        totalSlidesCount - 5
      );
    });

    it('should render the end card', function() {
      cy.get(this.settings.selectors.endCard).should('have.length', 1);
    });

    it('should track a slide advance event for the end card', function() {
      cy.waitUntilEventInDataLayer(
        ({ event, slideShowDepth, slideshowImagePosition }) => {
          return (
            event === this.trackingEvents.slideAdvance
            && slideshowImagePosition === 'end_card'
            && slideShowDepth === 5
          );
        }
      );
    });
  });
});
