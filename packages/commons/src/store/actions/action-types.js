import { ActionType } from 'redux-promise-middleware';

// Ads actions
/**
 * Action type for registering an ad slot
 * @type {string}
 */
export const REGISTER_SLOT = 'REGISTER_SLOT';

/**
 * Action type for resetting ad store:
 * - Set "sequenceOrder" back to 1 in all sizes
 * - Set "ads" to an empty array
 * - Set "hideAds" to an empty array
 * - Set "topAdInserted" to false and "topAdInsertedFrom" to null so it can insert a top ad again
 * - Set "nativeCalled" to false to the triple lift logic for native ad can run again
 * - Set "shouldRefresh" to false to reset the state of horizontal gallery
 * @type {string}
 */
export const RESET_SLOTS = 'RESET_SLOTS';

/**
 * Action type for display ads on a slot
 * @type {string}
 */
export const DISPLAY_AD = 'DISPLAY_AD';

/**
 * Action type for updating isNativeAdEmpty flag
 * @type {string}
 */
export const UPDATE_NATIVE_AD_EMPTY = 'UPDATE_NATIVE_AD_EMPTY';

/**
 * Action type for displaying above the fold ads
 * @type {string}
 */
export const DISPLAY_ADS_ABOVE_THE_FOLD = 'DISPLAY_ADS_ABOVE_THE_FOLD';

/**
 * Action type for hide multiple ads
 * currently being used in sideBar & AdBelowSlideshow & EndCard
 * @type {string}
 */
export const HIDE_AD_BY_IDS = 'HIDE_AD_BY_IDS';

/**
 * Action type for refreshing ads
 * currently being used in Horizontal SS
 * @type {string}
 */
export const SHOULD_AD_REFRESH = 'SHOULD_AD_REFRESH';

/**
 * Action type for increasing ad calls sequence
 * @type {string}
 */
export const INCREASE_SEQUENCE = 'INCREASE_SEQUENCE';

/**
 * Action type for native ad call to avoid multiple ads in single page
 * @type {string}
 */
export const SET_NATIVE = 'SET_NATIVE';

/**
 * Action type for inserting a top ad in a section
 * @type {string}
 */
export const INSERT_TOP_AD = 'INSERT_TOP_AD';

/**
 * Action type for revert inserting a top ad in a section flag
 * @type {string}
 */
export const REMOVE_TOP_AD = 'REMOVE_TOP_AD';

/**
 * Action type to increase id count to avoid random id
 * @type {string}
 */
export const INCREASE_AD_COUNT = 'INCREASE_AD_COUNT';

// Page state actions
/**
 * Action type for setting page data
 * @type {string}
 */
export const SET_PAGE_DATA = 'SET_PAGE_DATA';

/**
 * Action type to fetch page data
 * @type {string}
 */
export const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';

/**
 * Action type to fetch page data while loading
 * @type {string}
 */
export const FETCH_PAGE_DATA_PENDING = `${FETCH_PAGE_DATA}_${ActionType.Pending}`;

/**
 * Action type to fetch page data once fulfilled
 * @type {string}
 */
export const FETCH_PAGE_DATA_FULFILLED = `${FETCH_PAGE_DATA}_${ActionType.Fulfilled}`;

/**
 * Action type to fetch page data once rejected
 * @type {string}
 */
export const FETCH_PAGE_DATA_REJECTED = `${FETCH_PAGE_DATA}_${ActionType.Rejected}`;

/**
 * Action type for setting theme data
 * @type {string}
 */
export const SET_THEME_DATA = 'SET_THEME_DATA';

/**
 * Action type for setting amp state
 * @type {string}
 */
export const SET_AMP = 'SET_AMP';

/**
 * Action type for adding extra data to widgets
 * @type {string}
 */
export const SET_WIDGET_EXTRA_DATA = 'SET_WIDGET_EXTRA_DATA';

/**
 * Action extend the page widgets array
 * @type {string}
 */
export const ADD_WIDGETS = 'ADD_WIDGETS';

// Radio actions
/**
* Action type for play the anchor radio
 * @type {string}
 */
export const PLAYER_PLAY_RADIO = 'PLAYER_PLAY_RADIO';

/**
* Action to set all data related with the timing tracking for the audio player.
 * @type {string}
 */
export const PLAYER_RADIO_SET_HEARTBEAT = 'PLAYER_RADIO_SET_HEARTBEAT';

/**
 * Action type for setting up player url
 * @type {string}
 */
export const PLAYER_SET_RADIO_URL = 'PLAYER_SET_RADIO_URL';

/**
 * Action type for release NowPlaying Data
 * @type {string}
 */
export const PLAYER_CLOSE_NOW_PLAYING = 'PLAYER_CLOSE_NOW_PLAYING';

/**
 * Action type for close anchor radio
 */
export const PLAYER_CLOSE_RADIO = 'PLAYER_CLOSE_RADIO';

/**
 * Action type for pause anchor radio
 */
export const PLAYER_PAUSE_RADIO = 'PLAYER_PAUSE_RADIO';

/**
 * Action type for handling errors on stream api
 * @type {string}
 */
export const PLAYER_ERROR = 'PLAYER_ERROR';

/**
 * Action type for storing timer instance
 * @type {string}
 */
export const PLAYER_STORE_TIMER = 'PLAYER_STORE_TIMER';

/**
 * Action type for setting loadable components that must be pre-loaded before rendering
 * @type {string}
 */
export const SET_PRE_LOADABLE_COMPONENTS = 'SET_PRE_LOADABLE_COMPONENTS';

/**
 * Action type for setting current playing instance, for anchor video tracking
 * @type {string}
 */
export const STORE_PLAYING_DATA = 'STORE_PLAYING_DATA';

/**
 * Action type for setting Video SDK state
 * @type {string}
 */
export const STORE_VIDEO_SDK_STATE = 'STORE_VIDEO_SDK_STATE';

/**
 * Action type for setting Video SDK state
 * @type {string}
 */
export const STORE_FIRST_VIDEO_READY = 'STORE_FIRST_VIDEO_READY';

// Page Category Actions
/**
 * Action type for extending page object
 * @type {string}
 */
export const EXTEND_SOCCER_COMPETITION_POSITIONS = 'EXTEND_SOCCER_COMPETITION_POSITIONS';

/**
 * Action type for extending page object
 * @type {string}
 */
export const EXTEND_SOCCER_COMPETITION_RESULTS = 'EXTEND_SOCCER_COMPETITION_RESULTS';

/**
 * Action type for adding a brandable show
 * @type {string}
 */
export const EXTEND_BRANDABLE_SHOW = 'EXTEND_BRANDABLE_SHOW';

/**
 * Action type for setting a flag to indicate if there is a Ad Skin on the page
 * @type {string}
 */
export const SET_AD_SKIN = 'SET_AD_SKIN';

/**
 * Action type for setting a flag to indicate there is no Ad Skin on the page
 * @type {string}
 */
export const REMOVE_AD_SKIN = 'REMOVE_AD_SKIN';

/**
 * Action type for setting the current header's title
 * @type {string}
 */
export const SET_HEADER_DATA = 'SET_HEADER_DATA';

/**
 * Action to register a popups
 * @type {string}
 */
export const REGISTER_POPUPS = 'REGISTER_POPUPS';

/**
 * Action to remove all popups
 * @type {string}
 */
export const REMOVE_POPUPS = 'REMOVE_POPUPS';

/**
 * Action to show popup
 * @type {string}
 */
export const SHOW_POPUP = 'SHOW_POPUP';

/**
 * Action to close particular popup
 * @type {string}
 */
export const CLOSE_POPUP = 'CLOSE_POPUP';

/**
 * Action to set preferences (UEAFA or core)
 * @type {string}
 */
export const SET_PROFILE = 'SET_PROFILE';

/**
 * Action to clear preferences (UEAFA or core)
 * @type {string}
 */
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

/**
 * Action trigger after fetching new profile content
 * @type {string}
 */
export const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

/**
 * Action to set breakPoint values
 * @type {string}
 */
export const SET_BREAKPOINT_VALUES = 'SET_BREAKPOINT_VALUES';

/**
 * Action to get page content from API
 * @type {string}
 */
export const GET_PAGE_API_CONTENT = 'GET_PAGE_API_CONTENT';

/**
 * Action to get page content from API when the promise is resolved
 * @type {string}
 */
export const GET_PAGE_API_CONTENT_FULFILLED = 'GET_PAGE_API_CONTENT_FULFILLED';

/**
 * Action type for handling errors on page content
 * @type {string}
 */
export const GET_PAGE_API_CONTENT_ERROR = 'GET_PAGE_API_CONTENT_ERROR';

/**
 * Action type for update the global store
 * @type {string}
 */
export const SYNC_STORE = 'SYNC_STORE';

/**
 * Action trigger after fetching video recommendations
 * @type {string}
 */
export const FETCH_RECOMMENDED_VIDEOS = 'FETCH_RECOMMENDED_VIDEOS';

/**
 * Action trigger when fetching video recommendations is completed
 * @type {string}
 */
export const FETCH_RECOMMENDED_VIDEOS_FULFILLED = 'FETCH_RECOMMENDED_VIDEOS_FULFILLED';

/**
 * Action type for setting video playlist clicked
 * @type {string}
 */
export const SET_PLAYLIST_CLICKED = 'SET_PLAYLIST_CLICKED';

/**
 * Action type to trigger hooks before SPA transition.
 * @type {string}
 */
export const TRIGGER_BEFORE_SPA_TRANSITION = 'TRIGGER_BEFORE_SPA_TRANSITION';

/**
 * Action type for setting current language
 * @type {string}
 */
export const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE';

/**
 * Action type for enabling casting
 * @type {string}
 */
export const CASTING_ENABLE = 'CASTING_ENABLE';

/**
 * Action type for disabling casting
 * @type {string}
 */
export const CASTING_DISABLE = 'CASTING_DISABLE';

/**
 * Action type for ad break start
 * @type {string}
 */
export const CASTING_AD_BREAK_START = 'CASTING_AD_BREAK_START';

/**
 * Action type for ad break end
 * @type {string}
 */
export const CASTING_AD_BREAK_END = 'CASTING_AD_BREAK_END';

/**
 * Action type for ad break start
 * @type {string}
 */
export const CASTING_AD_POD = 'CASTING_AD_POD';
