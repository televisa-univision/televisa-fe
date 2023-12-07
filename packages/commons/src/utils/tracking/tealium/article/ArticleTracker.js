import * as contentTypes from '../../../../constants/contentTypes.json';

import Store from '../../../../store/store';
import { getContentSpecificTracking } from '../../../../store/storeHelpers';
import Tracker from '../Tracker';

const ARTICLE_PREFIX = 'article.';
const LIST_ITEM_PREFIX = 'list.';

/**
 * Tracks article events
 */
class ArticleTracker extends Tracker {
  /**
   * Sets the events for this tracker
   */
  constructor() {
    super({
      halfScroll: `${ARTICLE_PREFIX}halfScroll`,
      fullScroll: `${ARTICLE_PREFIX}fullScroll`,
      articleRead: `${ARTICLE_PREFIX}read`,
      enhancementClick: `${ARTICLE_PREFIX}enhancementClick`,
      newArticle: `${ARTICLE_PREFIX}newArticle`,
      applyBtnClick: `${ARTICLE_PREFIX}applyBtnClick`,
      callExpertBtnClick: `${ARTICLE_PREFIX}callExpertBtnClick`,
      callExpertBtnCardClick: `${ARTICLE_PREFIX}callExpertBtnCardClick`,
      callActionCTAClick: `${LIST_ITEM_PREFIX}callActionCTAClick`,
    });
  }

  /**
   * Tracks each time the slide is changed.
   * @param {Object} data Context data
   */
  trackListItemChange = (data) => {
    const eventName = data.list_type === contentTypes.LIST_TYPE_VIDEO ? 'list_advance_video' : 'list_advance';

    const trackingData = {
      ...data,
      event: eventName,
    };

    if (data.list_type === contentTypes.LIST_TYPE_VIDEO) {
      delete trackingData.list_sponsor;
    } else {
      delete trackingData.list_video_id;
    }
    Tracker.fireEvent(trackingData);
  }

  /**
   * Handles events for slideshows
   * @param {string} event Name of the event
   * @param {Object} data Additional parameters for the handler
   */
  track(event, data = {}) {
    let userAction = '';
    const extraParam = getContentSpecificTracking(Store);
    const utagData = {
      event: 'article_engagement',
      title: data.title,
      content_type: 'article',
      content_id: data.uid,
      article_action: '',
      ...data,
    };

    switch (event) {
      case this.events.halfScroll:
        userAction = 'article_50_percent';
        utagData.article_depth = data.articleDepth;
        break;
      case this.events.fullScroll:
        userAction = 'article_complete';
        utagData.article_depth = data.articleDepth;
        break;
      case this.events.articleRead:
        userAction = 'article_read';
        utagData.article_depth = data.articleDepth;
        break;
      case this.events.newArticle:
        userAction = 'article_load';
        utagData.article_depth = data.articleDepth;
        break;
      case this.events.enhancementClick:
        userAction = 'article_enh_click';
        utagData.enh_type = data.enhancementType === 'article' ? 'link_in _article' : data.enhancementType;
        break;
      case this.events.applyBtnClick: {
        const jobApplyBtnData = {
          event: 'engagement_jobs',
          event_action: 'jobs_aplicar',
          company_ID: extraParam.company_id,
        };
        Tracker.fireEvent(jobApplyBtnData);
      }
        break;
      case this.events.callExpertBtnClick: {
        const callBtnData = {
          event: 'engagement_experts',
          event_action: 'ask_an_expert_call',
          company_ID: extraParam.company_id,
        };
        Tracker.fireEvent(callBtnData);
      }
        break;
      case this.events.callExpertBtnCardClick:
        userAction = 'ask_an_expert_call';
        utagData.event = 'engagement_experts';
        utagData.event_action = 'ask_an_expert_call';
        break;
      case this.events.callActionCTAClick:
        Tracker.fireEvent(utagData.dataTrackingButtons);
        break;
      default:
        userAction = '';
        break;
    }

    if (userAction !== '') {
      utagData.user_action = userAction;
      Tracker.fireEvent(utagData);
    }
  }
}

export default new ArticleTracker();
