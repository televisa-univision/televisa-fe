import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import ListItem from '.';
import dataTestListItem from './__mocks__/dataTestListItem.json';

const newDataMain = {
  ...dataTestListItem.data,
};
const store = configureStore();

describe('ListItem component tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('should render without crashing when props are not set', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ListItem />
      </Provider>,
      div
    );
  });

  it('should renders with image and listItem', () => {
    const wrapper = mount(
      <ListItem {...newDataMain.body[0].objectData} listNumber={1} />,
    );
    expect(wrapper.find('Picture')).toHaveLength(1);
  });

  it('should renders with image and listItem - desktop', () => {
    const wrapper = mount(
      <ListItem
        {...newDataMain.body[0].objectData}
        listNumber={1}
        device="desktop"
      />,
    );
    expect(wrapper.find('Picture')).toHaveLength(1);
  });

  it('should renders with image and listItem - mobile', () => {
    const wrapper = mount(
      <ListItem
        {...newDataMain.body[0].objectData}
        listNumber={1}
        device="mobile"
      />,
    );
    expect(wrapper.find('Picture')).toHaveLength(1);
  });

  it('should renders with video and listItem', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListItem {...newDataMain.body[1].objectData} listNumber={2} />,
      </Provider>
    );
    expect(wrapper.find('VideoEnhancement')).toHaveLength(1);
  });

  it('should renders with externalcontent and listItem', () => {
    const wrapper = mount(
      <ListItem {...newDataMain.body[2].objectData} listNumber={3} />,
    );
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });

  it('should renders with type no found in listItem', () => {
    const wrapper = mount(
      <ListItem {...newDataMain.body[3].objectData} listNumber={4} />,
    );
    expect(wrapper.find('ShowMedia').isEmptyRender()).toBeTruthy();
  });

  it('should renders with click button trackingListActionsBtnCTA', () => {
    const trackerSpy = jest.spyOn(ArticleTracker, 'track');
    const wrapper = mount(
      <Provider store={configureStore()}>
        <ListItem {...newDataMain.body[3].objectData} listNumber={4} />
      </Provider>
    );
    wrapper.find('ListItem')
      .find('ListCTA__ButtonWrapper')
      .first()
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });

  it('should renders with click trackListItemChange', () => {
    const trackerSpy = jest.spyOn(ArticleTracker, 'trackListItemChange');

    const ListItemCpmnt = (
      <Provider store={configureStore()}>
        <ListItem {...newDataMain.body[3].objectData} listNumber={1} />
      </Provider>
    );
    const wrapper = mount(ListItemCpmnt);
    const visibilitySensor = wrapper.find('VisibilitySensor');
    visibilitySensor.get(0).props.onChange(true);
    expect(trackerSpy).toHaveBeenCalled();
  });

  it('should render Author name with other name', () => {
    const wrapper = mount(
      <Provider store={configureStore()}>
        <ListItem {...newDataMain.body[2].objectData} authorName={'Chef'} listNumber={3} />,
      </Provider>
    );
    expect(wrapper.find('ListItem').text().includes('Chef')).toBe(true);
  });
});
