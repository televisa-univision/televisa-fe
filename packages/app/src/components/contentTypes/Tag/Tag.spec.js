import React from 'react';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import features from '@univision/fe-commons/dist/config/features';
import { PERSON } from '@univision/fe-commons/dist/constants/contentTypes.json';
import Section from '../Section';
import Tag, { extendWidgets } from '.';

const pageData = {
  data: {
    description: 'Bio',
    type: PERSON,
    fullBio: [
      {
        type: 'text',
        value:
          '<p>Jorge Ramos es considerado uno de “los 25 hispanos más influyentes de Estados Unidos” y estuvo en una de las portadas de la revista TIME en el 2015 dedicada a las “100 personas más influyentes del mundo.” Desde el 3 de noviembre de 1986, es el conductor titular del Noticiero Univision en los Estados Unidos, el de mayor impacto en la comunidad hispana de Estados Unidos.</p>',
      },
    ],
  },
};

/** @test {Tag} */
describe('Tag content type', () => {
  beforeAll(async () => {
    await preloadAll();
    features.content.hasTagPages = jest.fn(() => false);
  });

  it('should render section component', () => {
    const wrapper = shallow(<Tag pageData={{}} />);
    expect(wrapper.find(Section)).toBeDefined();
  });
});

describe('getWidgets', () => {
  it('should return HeaderHub', () => {
    features.content.hasTagPages = jest.fn(() => true);
    const data = {
      data: {
        ...pageData.data,
        parent: {
          uuid: '123',
        },
        role: 'test',
      },
    };
    const HeaderHub = extendWidgets(data, [])[0];
    const wrapper = shallow(<div>{HeaderHub}</div>);
    expect(wrapper.find(HeaderHub)).toBeDefined();
  });
  it('should return PersonJobs', () => {
    features.content.hasTagPages = jest.fn(() => true);
    const data = {
      config: {
        graphql: 'graphql',
      },
      data: {
        ...pageData.data,
        parent: {
          uuid: '123',
        },
        role: 'test',
        enableJobsWidgets: true,
        sponsorTeamId: '30463',
      },
    };
    const widgets = extendWidgets(data, []);
    const PersonJobs = widgets[2];
    const wrapper = shallow(<div>{PersonJobs}</div>);
    expect(wrapper.find('PersonJobs')).toBeDefined();
    expect(wrapper.find('PersonJobs').props().sponsorTeamId).toBe('30463');
    expect(wrapper.find('PersonJobs').props().serverUri).toBe('graphql');
  });
  it('should return same array if data is null', () => {
    const BioWidget = extendWidgets(undefined, []);
    expect(BioWidget).toEqual([]);
  });
});
