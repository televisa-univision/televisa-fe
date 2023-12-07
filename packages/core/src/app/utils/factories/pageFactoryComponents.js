import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';

/**
 * Private helper to get a loadable component options object
 * @param {string} path the current page type
 * @returns {{ loading, modules, webpack  }}
 */
function getLoadableComponentOptions() {
  return {
    loading: () => null,
  };
}

const Article = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Article/Article'),
  ...getLoadableComponentOptions(),
};

const EmbeddedVideo = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/EmbeddedVideo/EmbeddedVideo'),
  ...getLoadableComponentOptions(),
};

export const ErrorPage = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/ErrorPage/ErrorPage'),
  ...getLoadableComponentOptions(),
};

const HorizontalSlideshow = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/HorizontalSlideshow/HorizontalSlideshow'),
  ...getLoadableComponentOptions(),
};

const LiveBlog = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/LiveBlog/LiveBlog'),
  ...getLoadableComponentOptions(),
};

const LiveStream = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/LiveStream/LiveStreamPage'),
  ...getLoadableComponentOptions(),
};

const Search = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Search/Search'),
  ...getLoadableComponentOptions(),
};

const Section = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Section/Section'),
  ...getLoadableComponentOptions(),
};

const SectionRadio = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/SectionRadio/SectionRadio'),
  ...getLoadableComponentOptions(),
};

const Show = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Show/Show'),
  ...getLoadableComponentOptions(),
};

const Tag = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Tag/TagPage'),
  ...getLoadableComponentOptions(),
};

const VerticalSlideshow = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/VerticalSlideshow/VerticalSlideshow'),
  ...getLoadableComponentOptions(),
};

const Video = {
  loader: () => import(/* webpackChunkName: "spaContent" */ /* webpackMode: "eager" */ 'components/pages/Video/VideoPage'),
  ...getLoadableComponentOptions(),
};

/**
 * See comments on "mapPageTypeToBundleName" in "pageFactory.js" for why this
 * is needed.
 */
export const bundleNameMapping = {
  [contentTypes.LIVE_BLOG]: 'liveBlog',
  [contentTypes.LIVE_STREAM]: 'liveStream',
  [contentTypes.SOCCER_MATCH]: 'soccerMatch',
};

export default {
  [contentTypes.ARTICLE]: Article,
  [contentTypes.VIDEO_EMBEDDED]: EmbeddedVideo,
  [contentTypes.ERROR_PAGE]: ErrorPage,
  [contentTypes.SLIDESHOW_HORIZONTAL]: HorizontalSlideshow,
  [bundleNameMapping[contentTypes.LIVE_BLOG]]: LiveBlog,
  [bundleNameMapping[contentTypes.LIVE_STREAM]]: LiveStream,
  [contentTypes.SEARCH]: Search,
  [contentTypes.SECTION]: Section,
  [contentTypes.SECTION_RADIO]: SectionRadio,
  [contentTypes.SHOW]: Show,
  [contentTypes.TAG]: Tag,
  [contentTypes.SLIDESHOW_VERTICAL]: VerticalSlideshow,
  [contentTypes.VIDEO]: Video,
  [undefined]: ErrorPage,
};
