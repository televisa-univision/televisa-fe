import dynamic from 'next/dynamic';

import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  TUDN_SITE,
  UNIVISION_SITE,
  MULHER_SITE,
  DELICIOSO_SITE,
  TASAUDAVEL_SITE,
  ZAPPEANDO_SITE,
  LAS_ESTRELLAS_SITE,
  CANAL5_SITE,
  ELNU9VE_SITE,
  DISTRITOCOMEDIA_SITE,
  TELEVISA_SITE,
  UNICABLE_SITE,
  TELEHIT_SITE,
  LOS_BINGERS_SITE,
  BANDAMAX_SITE,
} from '@univision/fe-commons/dist/constants/sites';

import ConnectedSlideshowWrapper from '../../../components/contentTypes/SlideshowWrapper';
import { PagePlaceholder } from '../../../components/base/Placeholders/PagePlaceholder';
import TudnLayout from '../../../components/layout/TudnLayout';
import VixLayout from '../../../components/layout/VixLayout';
import UnivisionLayout from '../../../components/layout/UvnLayout';
import VideoEmbedLayout from '../../../components/layout/VideoEmbedLayout';
import SoccerMatchLayout from '../../../components/layout/SoccerMatchLayout';
import LasEstrellasLayout from '../../../components/layout/LasEstrellasLayout';
import Canal5Layout from '../../../components/layout/Canal5Layout';
import Elnu9veLayout from '../../../components/layout/elnu9veLayout';
import DistritocomediaLayout from '../../../components/layout/DistritocomediaLayout';
import BandamaxLayout from '../../../components/layout/BandamaxLayout';
// auto-import-end
import TelevisaLayout from '../../../components/layout/TelevisaLayout';
import UnicableLayout from '../../../components/layout/UnicableLayout';
import TelehitLayout from '../../../components/layout/TelehitLayout';
import LosbingersLayout from '../../../components/layout/LosbingersLayout';
// auto-import-end

/**
 * See comments on "mapPageTypeToBundleName" in "pageFactory.js" for why this
 * is needed.
 * TODO: we should remove this
 */
export const bundleNameMapping = {
  [contentTypes.LIVE_BLOG]: 'liveBlog',
  [contentTypes.LIVE_STREAM]: 'liveStream',
};

export const contentTypeComponents = {
  [contentTypes.ARTICLE]: dynamic(() => import(/* webpackChunkName: "article-lazy-ssr-cpm" */ '../../../components/contentTypes/Article'), { loading: PagePlaceholder }),
  [bundleNameMapping[contentTypes.LIVE_BLOG]]: dynamic(() => import(/* webpackChunkName: "liveblog-lazy-ssr-cpm" */ '../../../components/contentTypes/LiveBlog'), { loading: PagePlaceholder }),
  [bundleNameMapping[contentTypes.LIVE_STREAM]]: dynamic(() => import(/* webpackChunkName: "livestream-lazy-ssr-cpm" */ '../../../components/contentTypes/LiveStream'), { loading: PagePlaceholder }),
  [contentTypes.RAWHTML]: dynamic(() => import(/* webpackChunkName: "rawhtml-lazy-ssr-cpm" */ '../../../components/contentTypes/RawHtml')),
  [contentTypes.SEARCH]: dynamic(() => import(/* webpackChunkName: "search-lazy-ssr-cpm" */ '../../../components/contentTypes/Search'), { loading: PagePlaceholder }),
  [contentTypes.SECTION]: dynamic(() => import(/* webpackChunkName: "section-tag-lazy-ssr-cpm" */ '../../../components/contentTypes/Section'), { loading: PagePlaceholder }),
  [contentTypes.SECTION_RADIO]: dynamic(() => import(/* webpackChunkName: "section-tag-lazy-ssr-cpm" */ '../../../components/contentTypes/SectionRadio'), { loading: PagePlaceholder }),
  [contentTypes.SHOW]: dynamic(() => import(/* webpackChunkName: "show-lazy-ssr-cpm" */ '../../../components/contentTypes/Show'), { loading: PagePlaceholder }),
  [contentTypes.SLIDESHOW]: ConnectedSlideshowWrapper,
  [contentTypes.SOCCER_MATCH]: dynamic(() => import(/* webpackChunkName: "soccer-match-lazy-ssr-cpm" */ '../../../components/contentTypes/SoccerMatch'), { loading: PagePlaceholder }),
  [contentTypes.TAG]: dynamic(() => import(/* webpackChunkName: "section-tag-lazy-ssr-cpm" */ '../../../components/contentTypes/Tag'), { loading: PagePlaceholder }),
  [contentTypes.VIDEO]: dynamic(() => import(/* webpackChunkName: "video-lazy-ssr-cpm" */ '../../../components/contentTypes/Video'), { loading: PagePlaceholder }),
  [contentTypes.VIDEO_EMBEDDED]: dynamic(() => import(/* webpackChunkName: "video-embedded-lazy-ssr-cpm" */ '../../../components/contentTypes/EmbeddedVideo')),
  [contentTypes.SOCCER_PERSON]: dynamic(() => import(/* webpackChunkName: "soccer-person-lazy-ssr-cpm" */ '../../../components/contentTypes/SoccerPerson'), { loading: PagePlaceholder }),
};

export const layoutsComponents = {
  [TUDN_SITE]: TudnLayout,
  [UNIVISION_SITE]: UnivisionLayout,
  [MULHER_SITE]: VixLayout,
  [DELICIOSO_SITE]: VixLayout,
  [TASAUDAVEL_SITE]: VixLayout,
  [ZAPPEANDO_SITE]: VixLayout,
  [LAS_ESTRELLAS_SITE]: LasEstrellasLayout,
  [TELEVISA_SITE]: TelevisaLayout,
  [contentTypes.SOCCER_MATCH]: SoccerMatchLayout,
  [contentTypes.VIDEO_EMBEDDED]: VideoEmbedLayout,
  [contentTypes.RAWHTML]: dynamic(() => import(/* webpackChunkName: "rawhtml-lazy-ssr-cpm" */ '../../../components/layout/RawHtmlLayout')),
  [CANAL5_SITE]: Canal5Layout,
  [ELNU9VE_SITE]: Elnu9veLayout,
  [DISTRITOCOMEDIA_SITE]: DistritocomediaLayout,
  [UNICABLE_SITE]: UnicableLayout,
  [TELEHIT_SITE]: TelehitLayout,
  [LOS_BINGERS_SITE]: LosbingersLayout,
  [BANDAMAX_SITE]: BandamaxLayout,
};
