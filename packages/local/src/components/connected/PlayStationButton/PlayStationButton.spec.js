import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import RadioStationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/station/RadioStationTracker';
import * as actions from '@univision/fe-commons/dist/store/actions/mediaplayer/mediaplayer-actions';
import Features from '@univision/fe-commons/dist/config/features';
import { doIfPlayerExists } from '@univision/fe-commons/dist/utils/video';
import { fetchLocationApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { PODCAST_EPISODE } from '@univision/fe-commons/dist/constants/contentTypes.json';
import { isPodcastEpisode } from '../../../utils/helpers';
import { PlayStationButtonComponent } from './PlayStationButton';

const jwPlayerInstance = {
  stop: jest.fn(),
};

const abacast = {
  id: null,
  demoId: null,
  aacStreamiOS: 'https://live.wostreaming.net/playlist/univision-wkaqamaac-imc1.m3u',
  aacStreamAndroid: 'https://live.wostreaming.net/playlist/univision-wkaqamaac-imc1.m3u?source=UforiaAndroid',
  mp3Stream: 'https://live.wostreaming.net/direct/univision-wkaqamaac-imc1&source=webPIPplayer',
};

const audioMetadata = {
  mimeType: 'audio/mpeg',
  url: 'https://rss.art19.com/episodes/fd1859ec-5a1b-4b6f-ab94-6e615c9aa787.mp3',
};

jest.mock('../../../utils/helpers', () => ({
  launchRadioPlayer: jest.fn(),
  getRadioPlayerUrl: jest.fn(),
  isPodcastEpisode: jest.fn(() => false),
}));

jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchLocationApi: jest.fn(() => new Promise((resolve) => {
    resolve({});
  })),
}));

jest.mock('@univision/fe-commons/dist/config/features', () => ({
  radio: {
    isSingleVideoInstance: jest.fn(),
  },
  tracking: {},
  deportes: {
    isWorldCupMVP: jest.fn(),
  },
}));
jest.mock('@univision/fe-commons/dist/utils/video', () => ({
  closeAnchoredPlayer: jest.fn(),
  doIfPlayerExists: jest.fn(),
  changeAutoplayPlayer: jest.fn(),
}));

beforeEach(() => {
  Features.radio.isSingleVideoInstance.mockReset();
});
/** @test {PlayStationButton} */
describe('PlayStationButton Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayStationButtonComponent device="mobile" />, div);
  });

  it('should track launchRadioPlayer if not radio Pip', async () => {
    const wrapper = shallow(
      <PlayStationButtonComponent abacast={abacast} stationTitle="title" device="mobile" mediaPlayerPlayRadio={actions.mediaPlayerPlayRadio} />
    );
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => false);
    spyOn(RadioStationTracker, 'track');
    await wrapper.instance().handleStationLaunch();
    expect(RadioStationTracker.track).toHaveBeenCalled();
  });

  it('should not call mediaPlayerPlayRadio if there is no abacastId', async () => {
    const spyPlayRadio = spyOn(actions, 'mediaPlayerPlayRadio');
    const wrapper = shallow(
      <PlayStationButtonComponent stationTitle="title" device="mobile" />
    );
    await wrapper.instance().handleStationLaunch();
    expect(spyPlayRadio).not.toHaveBeenCalled();
  });

  it('should not call mediaPlayerPlayRadio if not SPA', async () => {
    const spyPlayRadio = spyOn(actions, 'mediaPlayerPlayRadio');
    const wrapper = shallow(
      <PlayStationButtonComponent abacast={abacast} stationTitle="title" device="mobile" />
    );
    await wrapper.instance().handleStationLaunch();
    expect(spyPlayRadio).not.toHaveBeenCalled();
  });

  it('should dispatch the inline video player action if in SPA mode', async () => {
    doIfPlayerExists.mockImplementationOnce((PIP_PLAYER_ID, fn) => fn(jwPlayerInstance));
    const spyPlayRadio = spyOn(actions, 'mediaPlayerPlayRadio');
    const wrapper = shallow(
      <PlayStationButtonComponent
        abacast={abacast}
        stationTitle="title"
        device="mobile"
        mediaPlayerPlayRadio={actions.mediaPlayerPlayRadio}
        contentType={PODCAST_EPISODE}
      />
    );
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => true);
    await wrapper.instance().handleStationLaunch();
    expect(spyPlayRadio).toHaveBeenCalled();
  });

  it('should dispatch the inline video player action with US Privacy String to URL Audio Streaming when the user is CA', async () => {
    document.cookie = 'doNotSellInformation=DO_NOT_SELL';
    fetchLocationApi.mockClear();
    fetchLocationApi.mockReturnValueOnce(new Promise((resolve) => {
      resolve({
        latitude: 33.9733,
        longitude: -118.2487,
        dma: 803,
        zipCode: '90001-90068+90070-90084+90086-90089+90091+90093-90096+90099+90189',
        regionCode: 'CA',
        CountryData: {
          country_code: 'US',
        },
      });
    }));
    const spyPlayRadio = spyOn(actions, 'mediaPlayerPlayRadio');
    const wrapper = shallow(
      <PlayStationButtonComponent
        abacast={abacast}
        stationTitle="title"
        device="mobile"
        mediaPlayerPlayRadio={actions.mediaPlayerPlayRadio}
      />
    );
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => true);
    await wrapper.instance().handleStationLaunch();
    expect(spyPlayRadio).toHaveBeenCalled();
  });

  it('should not add href and target if in SPA mode', () => {
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => true);
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => true);
    const wrapper = mount(
      <PlayStationButtonComponent abacast={abacast} stationTitle="title" device="mobile" />
    );
    expect(wrapper.find('PlayStationButton__Button').prop('href')).toBeUndefined();
    expect(wrapper.find('PlayStationButton__Button').prop('target')).toBeUndefined();
  });

  it('should add a background color prop if color is provided', () => {
    const wrapper = mount(
      <PlayStationButtonComponent color="test" device="mobile" />
    );
    expect(wrapper.find('PlayStationButton__ButtonLink').prop('style')).toEqual({ background: 'test' });
  });

  it('should render featuredStation', () => {
    const wrapper = mount(
      <PlayStationButtonComponent color="test" device="mobile" type="featuredStation" />
    );
    expect(wrapper.childAt(0).props().type).toBe('featuredStation');
  });
  it('should have plain type if passed as param', () => {
    const wrapper = shallow(
      <PlayStationButtonComponent color="test" device="mobile" type="plain" />
    );
    expect(wrapper.find('PlayStationButton__ButtonLink').prop('type')).toBe('plain');
  });

  it('should dispatch the inline video player action if in SPA mode (PodcastEpisode)', async () => {
    isPodcastEpisode.mockReturnValueOnce(true);
    const spyPlayRadio = spyOn(actions, 'mediaPlayerPlayRadio');
    const wrapper = shallow(
      <PlayStationButtonComponent
        abacast={audioMetadata}
        stationTitle="title"
        device="mobile"
        mediaPlayerPlayRadio={actions.mediaPlayerPlayRadio}
        contentType={PODCAST_EPISODE}
      />
    );
    Features.radio.isSingleVideoInstance.mockImplementationOnce(() => true);
    await wrapper.instance().handleStationLaunch();
    expect(spyPlayRadio).toHaveBeenCalled();
  });
});
