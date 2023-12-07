import { combineReducers } from 'redux';
import adsReducer from './ads-reducer';
// eslint-disable-next-line import/no-cycle
import pageReducer from './page-reducer';
import playerReducer from './player-reducer';
import videoReducer from './video-reducer';
// eslint-disable-next-line import/no-cycle
import popupsReducer from './popups-reducer';
// eslint-disable-next-line import/no-cycle
import horizontalSlideshowReducer from './slideshow/horizontal-slideshow-reducer';
import liveBlog from './liveblog/liveblog-reducer';
// eslint-disable-next-line import/no-cycle
import search from './search/search-reducer';
import mediaPlayer from './mediaplayer/mediaplayer-reducer';
import headerConfReducer from './header/header-reducer';
import localReducer from './local/local-reducer';
// eslint-disable-next-line import/no-cycle
import userReducer from '../slices/user/user-slice';
// eslint-disable-next-line import/no-cycle
import reactionsReducer from '../slices/reactions/reactions-slice';
import registrationReducer from '../slices/registration/registrationSlice';
import soccerPersonReducer from '../slices/tudn/soccerPerson/soccerPersonSlice';

export default combineReducers({
  dfpAds: adsReducer,
  page: pageReducer,
  player: playerReducer,
  video: videoReducer,
  popups: popupsReducer,
  headerConf: headerConfReducer,
  horizontalSlideshow: horizontalSlideshowReducer,
  sports: soccerPersonReducer,
  liveBlog,
  search,
  mediaPlayer,
  local: localReducer,
  user: userReducer,
  reactions: reactionsReducer,
  registration: registrationReducer,
});
