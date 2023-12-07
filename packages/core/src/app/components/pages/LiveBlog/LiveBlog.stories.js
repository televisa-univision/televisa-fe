import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import liveBlogData from './LiveBlogData.json';
import LiveBlog from './LiveBlog';

/**
 * Shuffle array
 * https://stackoverflow.com/a/6274398/4231849
 * @param {array} arr the input array
 * @returns {array}
 */
const shuffleArray = (arr) => {
  const array = arr;
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter -= 1;

    const temp = arr[counter];
    array[counter] = arr[index];
    array[index] = temp;
  }

  return array;
};

/**
 * DataManager component to control liveblog data for story
 * and add support for active liveblog simulation
 */
class DataManager extends Component {
  /**
   * Constructor
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);

    this.state = {
      data: this.getInitialData(),
    };
  }

  /**
   * Initialize data based on options
   * @returns {Object}
   */
  getInitialData = () => {
    const { options, leadType, postsOverride } = this.props;

    let initialData = {
      ...liveBlogData,
      posts: [],
    };

    if (!postsOverride) {
      const postsLength = (options && options.totalPosts) || 20;

      const randomPosts = Array.from(Array(postsLength), (_, idx) => {
        const types = ['text', 'image', 'video', 'slideshow', 'article', 'externalcontent'];
        const post = liveBlogData.postTypes[types[idx % 6]];
        return {
          ...post,
          uid: `${post.uid}${Math.random()}`,
          updateDate: '2017-12-09T18:30:46-05:00',
        };
      });

      initialData.posts = shuffleArray(randomPosts);
    } else if (postsOverride) {
      initialData.posts = postsOverride;
    }

    if (leadType !== 'default' && leadType !== 'bullets') {
      initialData = {
        ...initialData,
        leadMedia: liveBlogData.leadTypes[leadType],
      };
    } else if (leadType === 'bullets') {
      initialData = {
        ...initialData,
        linkableBulletedDescription: liveBlogData.leadTypes.bullets,
      };
    }

    if (options) {
      initialData = {
        ...initialData,
        options,
      };
    }

    return {
      ...initialData,
      options: {
        ...initialData.options,
        totalPosts: initialData.posts.length,
      },
    };
  };

  /**
   * Render function
   * @returns {JSX}
   */
  render() {
    const { props: { render }, state: { data } } = this;

    return render(data);
  }
}

DataManager.propTypes = {
  render: PropTypes.func.isRequired,
  leadType: PropTypes.oneOf(['default', 'bullets', 'image', 'video']),
  options: PropTypes.object,
  postsOverride: PropTypes.object,
};

DataManager.defaultProps = {
  leadType: 'default',
  options: null,
  postsOverride: null,
};

storiesOf('LiveBlog', module)
  .add('default', () => (
    <DataManager
      render={(data) => {
        Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

        return <LiveBlog page={data} />;
      }}
    />
  ))
  .add('Bullets opening', () => (
    <DataManager
      leadType="bullets"
      render={(data) => {
        Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

        return <LiveBlog page={data} />;
      }}
    />
  ))
  .add('Image opening', () => (
    <DataManager
      leadType="image"
      render={(data) => {
        Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

        return <LiveBlog page={data} />;
      }}
    />
  ))
  .add('Video opening', () => (
    <DataManager
      leadType="video"
      render={(data) => {
        Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

        return <LiveBlog page={data} />;
      }}
    />
  ))
  .add('Expert post', () => {
    const expertPost = liveBlogData.postTypes.expert;

    return (
      <DataManager
        postsOverride={[expertPost]}
        render={(data) => {
          Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

          return <LiveBlog page={data} />;
        }}
      />
    );
  })
  .add('Timestamp hidden', () => {
    return (
      <DataManager
        options={{
          hideTimestamp: true,
        }}
        render={(data) => {
          Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

          return <LiveBlog page={data} />;
        }}
      />
    );
  })
  .add('Expert post /w timestamp hidden', () => {
    const expertPost = liveBlogData.postTypes.expert;

    return (
      <DataManager
        postsOverride={[expertPost]}
        options={{
          hideTimestamp: true,
        }}
        render={(data) => {
          Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

          return <LiveBlog page={data} />;
        }}
      />
    );
  })
  .add('With refresh button', () => {
    const expertPost = liveBlogData.postTypes.expert;

    return (
      <DataManager
        postsOverride={[expertPost]}
        options={{
          hideTimestamp: true,
        }}
        render={(data) => {
          Store.dispatch(setPageData({ data, requestParams: { mode: 'test' } }));

          return <LiveBlog page={data} displayRefrehButton />;
        }}
      />
    );
  });
