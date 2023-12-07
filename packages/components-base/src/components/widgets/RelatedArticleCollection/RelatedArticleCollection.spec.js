import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import RelatedArticleCollection from '.';

const store = configureStore();

describe('SingleWidget', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RelatedArticleCollection />, div);
  });

  it('should render articles', () => {
    const props = {
      articles: [{ title: 'test 1' }, { title: 'test 2' }],
    };

    const wrapper = mount(
      <Provider store={store}>
        <RelatedArticleCollection {...props} />
      </Provider>
    );

    expect(wrapper.find('RelatedArticleCollection__RelatedLabel').text()).toBe('Relacionados');
    expect(wrapper.find('RelatedArticleCollection__ListItem')).toHaveLength(2);
    expect(wrapper.find('RelatedArticleCollection__ListItem').first().text()).toBe('test 1');
    expect(wrapper.find('RelatedArticleCollection__ListItem').last().text()).toBe('test 2');
  });
});
