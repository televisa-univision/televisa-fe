import React from 'react';
import { shallow } from 'enzyme';
import Loadable from 'react-loadable';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';

import SectionRadio from './SectionRadio';

jest.mock('@univision/fe-local/dist/components/compound/Toolbar/Toolbar', () => jest.fn());

let props;
const state = {
  data: {
    sourceStation: {
      abacast: {
        id: '123',
        mp3Stream: 'https://live.wostreaming.net/direct/univision-klvefmaac-imc2?source=webPIPplayer',
      },
      image: {
        renditions: {
          original: {
            href: '/myImage.jpg',
          },
        },
      },
      logo: {
        renditions: {
          original: {
            href: 'logo.jpg',
          },
        },
      },
    },
  },
};

beforeEach(() => {
  props = {
    widgets: [<div key="0">Hello World!</div>, <span key="1">Test</span>],
    store: Store,
  };
});

/** @test {SectionRadio} */
describe('SectionRadio Spec', () => {
  it('should render the main div', () => {
    const wrapper = shallow(<SectionRadio {...props} />);
    expect(wrapper.find('div.app-container')).toBeDefined();
  });

  it('should render StationList if there is related stations', async () => {
    const newState = {
      theme: { foo: 'bar' },
      device: 'tablet',
      data: Object.assign({}, {
        sharing: {
          options: { bat: 'baz' },
        },
        sourceStation: {
          relatedStations: [],
        },
      }),
    };
    Store.dispatch(setPageData(Object.assign(state, newState)));
    const wrapper = shallow(<SectionRadio {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.find('LoadableComponent').get(0).key).toBe('StationList');
  });

  it('should render StationList if there is related stations', async () => {
    const newState = {
      theme: { foo: 'bar' },
      device: 'tablet',
      data: Object.assign({}, {
        abacast: {
          id: '123',
          mp3Stream: 'https://live.wostreaming.net/direct/univision-klvefmaac-imc2?source=webPIPplayer',
        },
        sharing: {
          options: { bat: 'baz' },
        },
        sourceStation: {
          relatedStations: [],
        },
      }),
    };
    Store.dispatch(setPageData(Object.assign(state, newState)));
    const wrapper = shallow(<SectionRadio {...props} />);
    await Loadable.preloadAll();
    expect(wrapper.find('LoadableComponent').get(0).key).toBe('StationList');
  });

  it('returns null if no Store is passed', () => {
    props.store = null;
    const wrapper = shallow(<SectionRadio {...props} />);
    expect(wrapper.getElement()).toBe(null);
  });
});
