import React from 'react';
import { shallow } from 'enzyme';

import PLAY_STATES from '@univision/fe-commons/dist/constants/radioPlayStates';
import Button from '@univision/fe-components-base/dist/components/Button';
import AbacastPlayer from './AbacastPlayer';
import Styles from './AbacastPlayer.scss';

const alternativeLogo = {
  type: 'image',
  uid: '0000016c-b41f-d083-a97d-fe9f8a600000',
  title: 'KLove107.5_NewNav_Brand',
  caption: null,
  credit: null,
  renditions: {
    original: {
      href: 'https://uvn-brightspot.s3.amazonaws.com/04/ac/ecf9fc4d441ebaee40db8382dbcb/los-angeles107.5_white.svg',
      width: 0,
      height: 0,
    },
  },
};

/** @test {AbacastPlayer} */
describe('AbacastPlayer', () => {
  it('renders the AbacastPlayer', () => {
    const wrapper = shallow(<AbacastPlayer />);
    expect(wrapper.find(`div.${Styles.container}`)).toHaveLength(1);
  });

  it('should render stream loading if stream is loading', () => {
    const wrapper = shallow(<AbacastPlayer collapsed play={PLAY_STATES.LOADING} />);
    expect(wrapper.find('StreamLoading')).toHaveLength(2);
  });

  it('should not render stream loading if stream is not loading', () => {
    const wrapper = shallow(<AbacastPlayer collapsed play={PLAY_STATES.PLAY} />);
    expect(wrapper.find('StreamLoading')).toHaveLength(0);
  });

  it('should use fallback image if no largeimage in nowPlaying', () => {
    const wrapper = shallow(
      <AbacastPlayer collapsed nowPlaying={{ artist: 'test', title: 'test' }} />
    );
    expect(wrapper.find('.fallback')).toHaveLength(2);
  });

  it('should render chevronUp if collapsed', () => {
    const wrapper = shallow(<AbacastPlayer collapsed />);
    expect(wrapper.find({ name: 'chevronUp' })).toHaveLength(1);
  });

  it('should render pause if playing', () => {
    const wrapper = shallow(<AbacastPlayer play="playing" collapsed />);
    expect(wrapper.find({ name: 'pausecircle' })).toHaveLength(2);
  });

  it('should render StationContact', () => {
    const wrapper = shallow(<AbacastPlayer stationContact />);
    expect(wrapper.find('StationContact')).toHaveLength(1);
  });

  it('should render StationShare', () => {
    const wrapper = shallow(<AbacastPlayer stationShare />);
    expect(wrapper.find('StationShare')).toHaveLength(1);
  });

  it('should fallback to the imageError', () => {
    const wrapper = shallow(<AbacastPlayer onImageError={() => 'fallback.jpg'} />);
    expect(wrapper.find('BackgroundImage[overrideImageUrl="fallback.jpg"]')).toHaveLength(1);
  });

  it('should render alternativeLogo', () => {
    const wrapper = shallow(<AbacastPlayer collapsed alternativeLogo={alternativeLogo} />);
    expect(wrapper.find(`.${Styles.alternativeLogo}`)).toHaveLength(2);
  });

  it('should render AudioProgressBar if is not collapsed and is PodcastEpisode', () => {
    const wrapper = shallow(<AbacastPlayer isPodcastEpisode />);
    expect(wrapper.find('StationMenu')).toHaveLength(0);
    expect(wrapper.find('AudioProgressBar')).toHaveLength(1);
  });

  it('should render AudioProgressBar if collapsed and is PodcastEpisode', () => {
    const wrapper = shallow(<AbacastPlayer collapsed isPodcastEpisode />);
    expect(wrapper.find('StationMenu')).toHaveLength(0);
    expect(wrapper.find('AudioProgressBar')).toHaveLength(1);
  });

  it('should call handleSeek when the control Forward button is clicked', () => {
    const handleSeek = jest.fn();
    const wrapper = shallow(<AbacastPlayer isPodcastEpisode handleSeek={handleSeek} />);
    wrapper.find(`.${Styles.controlFwd}`).simulate('click');
    expect(handleSeek).toHaveBeenCalled();
  });

  it('should call handleSeek when the control Rewind button is clicked', () => {
    const handleSeek = jest.fn();
    const wrapper = shallow(<AbacastPlayer isPodcastEpisode handleSeek={handleSeek} />);
    wrapper.find(`.${Styles.controlRwd}`).simulate('click');
    expect(handleSeek).toHaveBeenCalled();
  });

  it('should call toggleShowInfo when the information button is clicked', () => {
    const wrapper = shallow(<AbacastPlayer isPodcastEpisode />);
    wrapper.find(`.${Styles.controlInfo}`).simulate('click');
    expect(wrapper.find('AudioMoreInfo')).toHaveLength(1);
  });

  it('should call stopPropagation in given event when collapsed and the play button is clicked', () => {
    const stopPropagation = jest.fn();
    const togglePlaying = jest.fn();
    const wrapper = shallow(<AbacastPlayer isPodcastEpisode togglePlaying={togglePlaying} play="playing" collapsed />);
    wrapper.find(`.${Styles.left}`).find(Button).simulate('click', { stopPropagation });
    expect(stopPropagation).toHaveBeenCalled();
    expect(togglePlaying).toHaveBeenCalled();
  });
});
