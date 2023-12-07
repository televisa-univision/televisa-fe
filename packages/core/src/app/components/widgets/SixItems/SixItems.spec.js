import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import SixItems from './SixItems';

/** @test {SixItems} */
describe('SixItems Spec', () => {
  let contentItems;

  beforeAll(() => {
    contentItems = mockApiData.data.widgets[0].contents;
  });

  beforeEach(() => {
    jest.spyOn(storeHelpers, 'getPageData').mockReturnValue(mockApiData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={Store}><SixItems content={contentItems} /></Provider>, div);
  });
  it('should show topicbar', () => {
    const wrapper = mount(<Provider store={Store}><SixItems content={contentItems} settings={{ title: 'Hello' }} /></Provider>);
    expect(wrapper.find('TopicBar').length).toBe(1);
  });
  it('should render an empty div if content is anything other than an array', () => {
    const wrapper = shallow(<SixItems content={[]} />);
    expect(wrapper.find('.uvs-widget').exists()).toBe(false);
  });
  it('should add the class noTitle if no title is provided', () => {
    const wrapper = shallow(<SixItems content={contentItems} settings={{}} />);
    expect(wrapper.find('.noTitle').exists()).toBe(true);
  });
  it('should show default title if theres no title on the api and the page has a primary tag defined', () => {
    const wrapper = mount(
      <Provider store={Store}>
        <SixItems content={contentItems} settings={{ title: null }} />
      </Provider>
    );
    expect(wrapper.find('Title').first().text()).toBe('Noticias de Programas');
  });
});
