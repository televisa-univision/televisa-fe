import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import data from '../__mocks__/squareCard';
import SquareSoccerPerson, { areEqualProps } from '.';

const mockEvent = {
  preventDefault: jest.fn(),
};
jest.useFakeTimers();

describe('SquareSoccerPerson', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <SquareSoccerPerson />,
      div
    );
  });
  it('renders correctly with valid props for Medium size', () => {
    const wrapper = mount(
      <SquareSoccerPerson
        size={MEDIUM}
        {...data[25]}
        position="Delantero"
        positionNumber={10}
      />
    );
    expect(wrapper.find('SquareSoccerPerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerContent')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPicture')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPosition')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareSoccerPerson__PlayerPictureWrapper Link').prop('href')).toBe('https://uat.tudn.com/temas/leo-fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName Link').prop('href')).toBe('https://uat.tudn.com/temas/leo-fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName').text()).toBe('Leo Fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveStyleRule('color', '#181818');
    expect(wrapper.find('SquareSoccerPerson__Position').text()).toBe('Delantero');
    expect(wrapper.find('SquareSoccerPerson__PositionNumber').text()).toBe('10');
  });
  it('renders correctly with valid props for small and is dark and no position props', () => {
    const wrapper = mount(
      <SquareSoccerPerson
        size={SMALL}
        isDark
        {...data[25]}
        image={null}
      />
    );
    expect(wrapper.find('SquareSoccerPerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerContent')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPicture')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPosition')).toHaveLength(0);
    expect(wrapper.find('SquareSoccerPerson__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareSoccerPerson__PlayerName').prop('isDark')).toBe(true);
    expect(wrapper.find('SquareSoccerPerson__PlayerName').text()).toBe('Leo Fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveStyleRule('color', '#ffffff');
  });
  it('renders correctly with valid props for Medium size and is dark with position props', () => {
    const wrapper = mount(
      <SquareSoccerPerson
        size={MEDIUM}
        {...data[25]}
        position="Delantero"
        positionNumber={10}
        isDark
      />
    );
    expect(wrapper.find('SquareSoccerPerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerContent')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPicture')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPosition')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('SquareSoccerPerson__PlayerPictureWrapper Link').prop('href')).toBe('https://uat.tudn.com/temas/leo-fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName Link').prop('href')).toBe('https://uat.tudn.com/temas/leo-fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName').text()).toBe('Leo Fenga');
    expect(wrapper.find('SquareSoccerPerson__PlayerName')).toHaveStyleRule('color', '#ffffff');
    expect(wrapper.find('SquareSoccerPerson__Position').text()).toBe('Delantero');
    expect(wrapper.find('SquareSoccerPerson__PositionNumber').text()).toBe('10');
  });
  it('should not re-render if uri not changes', () => {
    expect(areEqualProps(data[25], { ...data[25], title: 'Leo Messi' })).toBe(true);
    expect(areEqualProps(data[25], { ...data[25], uri: 'newUri' })).toBe(false);
  });
  it('should call tracker with correct event for team logo', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<SquareSoccerPerson {...data[25]} />);
    wrapper.find('SquareSoccerPerson__LogoContainer Link').first().simulate('click', mockEvent);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      event_action: 'Playercard_team',
    }));

    trackerSpy.mockRestore();
  });
  it('should call tracker with correct event for league logo', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<SquareSoccerPerson {...data[25]} />);
    wrapper.find('SquareSoccerPerson__LogoContainer Link').last().simulate('click', mockEvent);
    jest.runOnlyPendingTimers();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      event_action: 'Playercard_league',
    }));

    trackerSpy.mockRestore();
  });
  it('renders fallback image for soccer person avatar if has fallback image on props', () => {
    const wrapper = mount(
      <SquareSoccerPerson
        size={MEDIUM}
        {...data[25]}
        position="Delantero"
        positionNumber={10}
        isDark
        image={{
          type: 'image',
          uid: '00000179-c712-d65a-ad7d-e7b3e7650000',
          title: 'TUDN_FallbackImage.png',
          caption: 'TUDN Fallback Image',
          credit: 'TUDN Fallback Image',
        }}
      />
    );
    expect(wrapper.find('SquareSoccerPerson__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerContent')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPicture')).toHaveLength(1);
    expect(wrapper.find('SquareSoccerPerson__PlayerPicture').prop('overrideImageUrl')).toEqual({});
  });
});
