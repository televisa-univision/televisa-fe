/**
 * @module Mapping promo cards components
 */
import * as promoCardTypes from '../../../constants/promoCardTypes';
import Feature from '../../../components/promoCards/Feature';
import NotifyPressEmail from '../../../components/promoCards/NotifyPressEmail';
import Hero from '../../../components/promoCards/Hero';
import Background from '../../../components/promoCards/Background';
import Shows from '../../../components/promoCards/Shows';
import PressRelease from '../../../components/promoCards/PressRelease';
import Faq from '../../../components/promoCards/Faq';
import Blog from '../../../components/promoCards/Blog';
import DownloadAsset from '../../../components/promoCards/DownloadAsset';
import ExternalEmbed from '../../../components/promoCards/ExternalEmbed';
import HeroSlider from '../../../components/promoCards/HeroSlider';
import Countdown from '../../../components/promoCards/Countdown';

export default {
  [promoCardTypes.FEATURE]: Feature,
  [promoCardTypes.NOTIFY_PRESS_EMAIL]: NotifyPressEmail,
  [promoCardTypes.HERO_ART]: Hero,
  [promoCardTypes.BACKGROUND]: Background,
  [promoCardTypes.PROMOTABLE_SHOWS]: Shows,
  [promoCardTypes.PRESS_RELEASE]: PressRelease,
  [promoCardTypes.FAQ]: Faq,
  [promoCardTypes.BLOG]: Blog,
  [promoCardTypes.DOWNLOAD_ASSET]: DownloadAsset,
  [promoCardTypes.EXTERNAL_EMBED]: ExternalEmbed,
  [promoCardTypes.HERO_SLIDER]: HeroSlider,
  [promoCardTypes.COUNTDOWN]: Countdown,
};
