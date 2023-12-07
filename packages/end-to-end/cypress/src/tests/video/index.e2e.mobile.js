import { brandedHeader } from '../../selectors';

let settings;
describe('Video', () => {
  before(() => {
    cy.fixture('video').then((fixture) => {
      settings = fixture;
      cy.visit(settings.uri);
    });
  });

  describe('Tracking', () => {
    it.skip('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'pageload_performance');
    });

    it.skip('should track the video start', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'video_player_load');
      cy.waitUntilEventInDataLayer(({ event }) => event === 'video_ready');
      cy.waitUntilEventInDataLayer(({ event }) => event === 'video_start', { timeout: 30000 });
    });
  });

  describe('User Interface', () => {
    it.skip('should render a video player', () => {
      cy.get(settings.selectors.videoPlayer).scrollIntoView();
    });

    it.skip('should pause the video when the user clicks on the pause button', () => {
      cy.get(settings.selectors.playButton).click();
      cy.waitUntilEventInDataLayer(({ event }) => event === 'video_pause');
    });

    it.skip('should resume the video when the user clicks on the play button', () => {
      cy.get(settings.selectors.playButton).click({ force: true });
      cy.waitUntilEventInDataLayer(({ event }) => event === 'video_resume');
    });

    it.skip('should play a video from the play list when an user clicks on the button', () => {
      cy.get(settings.selectors.nextVideoButton).click({ force: true });
      // eslint-disable-next-line camelcase
      cy.waitUntilEventInDataLayer(({ play_type }) => play_type === 'related click to play');
    });

    it('should add the anchor behaviour when the user scrolls down', () => {
      cy.get(settings.selectors.anchorVideo);
    });

    it('should share the video on facebook', () => {
      cy.get(brandedHeader).scrollIntoView({ duration: 500 });
      cy.get(settings.selectors.facebookShare).click({ force: true });
      cy.waitUntilEventInDataLayer(({ event }) => event === 'social_share');
    });
  });
});
