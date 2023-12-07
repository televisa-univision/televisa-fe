import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Meta from './Meta';
import Styles from './Meta.scss';

let props;
let store;

beforeEach(() => {
  store = configureStore();
  props = {
    authors: [
      {
        uid: '1365',
        title: 'test',
        image: {
          renditions: {
            '16x9-sm': {
              href: 'test',
            },
          },
        },
      },
    ],
    tempAuthors: [
      {
        uid: '22435',
        fullName: 'Temp',
        company: 'Company',
        designation: 'Publisher',
      },
    ],
    publishDate: new Date().toISOString(),
    source: 'Univision'
  };
});

/** @test {Meta} */
describe('Meta ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Meta {...props} /></Provider>, div);
  });
  it('should add the hideMobile class', () => {
    const wrapper = shallow(<Meta authors={null} date=" " hideOnMobile />);
    expect(wrapper.find(`div.${Styles.hideMobile}`).length).toBe(1);
  });
});
