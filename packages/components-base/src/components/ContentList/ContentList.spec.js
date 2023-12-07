import React from 'react';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import ContentList from '.';
import ContentListItem from './ContentListItem';

/**
 * Test component for ContentList tests
 * @param {Object} props component props
 * @returns {JSX}
 */
const TestItem = () => (<div>test item</div>);

beforeEach(() => {
  features.tracking.gtm = true;
  jest.spyOn(features.header, 'hideHeaderFooter').mockReturnValueOnce(false);
});

afterEach(() => {
  features.tracking.gtm = false;
  jest.restoreAllMocks();
});

describe('ContentList', () => {
  it('should not render ContentListItem if contents is not an array', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const contents = {};
    const wrapper = shallow(<ContentList contents={contents} itemComponent={TestItem} />);
    expect(wrapper.find(ContentListItem)).toHaveLength(0);
  });

  it('should render just one ContentListItem', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={5} itemComponent={TestItem} />);
    expect(wrapper.find(ContentListItem)).toHaveLength(1);
    expect(wrapper.instance().state.loadedContents[0].nextItem).toEqual({});
  });

  it('should not include a next item if the feature is disabled', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(
      <ContentList
        contents={contents}
        infiniteScrollingEnabled={false}
        itemComponent={TestItem}
        limit={5}
      />
    );
    expect(wrapper.find(ContentListItem)).toHaveLength(1);
    expect(wrapper.instance().state.loadedContents[0].nextItem).not.toBeDefined();
  });

  it('should respect the list limit', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={1} itemComponent={TestItem} />);
    expect(wrapper.find(ContentListItem)).toHaveLength(1);
    expect(wrapper.instance().state.loadedContents[0].nextItem).not.toBeDefined();
  });

  it('should add nextItem if the limit is not exceeded', () => {
    const contents = [{ uid: 1 }, { uid: 2 }, { uid: 3 }];
    const wrapper = shallow(
      <ContentList
        contents={contents}
        limit={contents.length}
        itemComponent={TestItem}
      />
    );
    wrapper.instance().onNextItemFetched(contents[1]);
    expect(wrapper.instance().state.loadedContents[1].nextItem).toBeDefined();
  });

  it('should ignore invalid next items', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={2} itemComponent={TestItem} />);
    wrapper.instance().onNextItemFetched(null);
    expect(wrapper.instance().state.loadedContents.length).toBe(1);
  });

  it('should ignore next items if the list is full', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={1} itemComponent={TestItem} />);
    wrapper.instance().onNextItemFetched({});
    expect(wrapper.instance().state.loadedContents.length).toBe(1);
  });

  it('should add valid next items if the list is not full', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={2} itemComponent={TestItem} />);
    wrapper.instance().onNextItemFetched({ uid: 45 });
    expect(wrapper.instance().state.loadedContents.length).toBe(2);
  });

  it('should update display loader placeholder', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(<ContentList contents={contents} limit={2} itemComponent={TestItem} />);
    expect(wrapper.instance().state.displayLoader).toBe(false);
    wrapper.instance().updateLoader({ displayLoader: true });
    expect(wrapper.instance().state.displayLoader).toBe(true);
  });

  it('should update initialLoad after calling handler', () => {
    const contents = [{}, {}, {}, {}];
    const wrapper = shallow(
      <ContentList contents={contents} limit={2} itemComponent={TestItem} />,
    ).instance();

    expect(wrapper.state.initialLoad).toBe(true);

    wrapper.updateInitialLoad();

    expect(wrapper.state.initialLoad).toBe(false);
  });

  describe('setItemRef', () => {
    it('should correctly set the reference in the items list', () => {
      const contents = [{}, {}, {}, {}];
      const wrapper = shallow(
        <ContentList contents={contents} limit={2} itemComponent={TestItem} />
      );
      const instance = wrapper.instance();

      instance.setItemRef('exampleNode', 3);

      expect(instance.items[3]).toBe('exampleNode');
    });
  });
});
