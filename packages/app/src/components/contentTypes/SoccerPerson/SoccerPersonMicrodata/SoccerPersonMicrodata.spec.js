import React from 'react';
import { shallow } from 'enzyme';

import SoccerPersonMicrodata from '.';

describe('SoccerPersonMicrodata', () => {
  const playerProfile = {
    age: 28,
    dateOfBirth: '1992-09-10',
    name: 'Matt Bersano',
    height: 185,
    id: '173614',
    nationality: 'USA',
    positionRegular: 'goalkeeper',
    team: {
      id: '1131',
      name: 'SJ Earthquakes',
      abbreviation: 'SJ',
      logo: 'https://uvn-brightspot.s3.amazonaws.com/e2/58/64dd8fdf48a19edb8803899ce44f/san-jose-earthquakes-2014-2x.png',
      url: 'https://uat.tudn.com/futbol/mls/sj-earthquakes',
    },
    picture: 'https://uvn-brightspot.s3.amazonaws.com/eb/10/6d4ab9224254a3f27e44f9184535/paco-memo.png',
    uniformNumber: 12,
    weight: 84,
    url: 'https://int.tudn.com/jugadores/guillermo-ochoa',
  };
  const expectedJson = `
    "@context": "https://schema.org",
    "@type": "Person",
    "height": "185 cm",
    "weight": "84 kg",
    "birthDate": "1992-09-10",
    "image": "https://uvn-brightspot.s3.amazonaws.com/eb/10/6d4ab9224254a3f27e44f9184535/paco-memo.png",
    "name": "Matt Bersano",
    "nationality": "USA",
    "url": "https://int.tudn.com/jugadores/guillermo-ochoa"`.replace(/\n\s+/g, '\n  ');

  it('should render correctly in CSR', () => {
    const wrapper = shallow(<SoccerPersonMicrodata profile={playerProfile} />);

    expect(wrapper.find('script')).toHaveLength(1);
    expect(wrapper.find('script').html()).toContain(expectedJson);
  });

  it('should render correctly is SSR', () => {
    delete global.window;
    const wrapper = shallow(<SoccerPersonMicrodata profile={playerProfile} />);

    expect(wrapper.find('script')).toHaveLength(1);
    expect(wrapper.find('script').html()).toContain(expectedJson);
  });

  it('should not render in SSR if have empty data', () => {
    delete global.window;
    const emptyData = null;
    const wrapper = shallow(<SoccerPersonMicrodata profile={emptyData} />);

    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should not render in SSR if have wrong data', () => {
    delete global.window;
    const wrongData = {
      dateOfBirth: null,
    };
    const stringifySpy = jest.spyOn(JSON, 'stringify').mockImplementation(() => throw 'cyclic object value');
    const wrapper = shallow(<SoccerPersonMicrodata profile={wrongData} />);

    expect(wrapper.find('script')).toHaveLength(0);
    expect(stringifySpy).toHaveBeenCalledTimes(1);
    stringifySpy.mockRestore();
  });
});
