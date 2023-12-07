import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Styles from './ArticleLead.styles';

export const InlineImagePlaceholder = styled.div`${Styles.inlineImagePlaceholder}`;

export default {
  image: dynamic(() => import(/* webpackChunkName: "articleEnhancements-image" */ '@univision/fe-components-base/dist/components/enhancements/InlineImage'), {
    loading: InlineImagePlaceholder,
  }),
  video: dynamic(() => import(/* webpackChunkName: "articleLead-video" */ '@univision/fe-video/dist/components/VideoPlayer')),
  videoPlaylist: dynamic(() => import(/* webpackChunkName: "articleLead-video-playlist" */ '@univision/fe-video/dist/components/widgets/VideoWithPlaylist/VideoWithPlaylistConnector')),
  livestream: dynamic(() => import(/* webpackChunkName: "articleEnhancements-livestream" */ '@univision/fe-video/dist/components/enhancements/LiveStream')),
  slideshow: dynamic(() => import(/* webpackChunkName: "articleEnhancements-slideshow" */ '../../HorizontalSlideshow/SlideshowWrapper')),
};
