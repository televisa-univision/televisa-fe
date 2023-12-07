import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { pageUriSelector, pageDataSelector, isTudnSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import { getEPGSchedule, getShowToLocalTime } from '@univision/fe-commons/dist/utils/video';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import { SECTION } from '@univision/fe-commons/dist/constants/contentTypes.json';
import { NEWS } from '@univision/fe-commons/dist/constants/pageCategories';
import features from '@univision/fe-commons/dist/config/features';

import ChannelStrip from '../../ChannelStrip/ChannelStrip';
import SingleWidget from '../SingleWidget';

// Update Interval - 1 minute
const UPDATE_INTERVAL = 60000;

/**
 * Digital Channel EPG
 * @param {Object} props - component props
 * @param {Array} props.content - component schedule
 * @param {string} props.device - device platform
 * @param {boolean} props.forceSingleWidget - it true, it will force the Single Widget
 * @param {string} props.settings - widget settings
 * @param {string} props.widgetContext - widget context
 * @returns {JSX}
 */
const DigitalChannelEPG = ({
  content,
  device,
  forceSingleWidget,
  settings,
  widgetContext,
}) => {
  const isTudn = useSelector(isTudnSiteSelector);
  const [cardData] = isValidArray(content) ? content : [];
  const { digitalChannelSchedule, ...otherData } = cardData || {};
  const pageUri = useSelector(pageUriSelector);
  const { type, vertical } = useSelector(pageDataSelector);
  const relativeUrl = toRelativeUrl(pageUri);
  const [currentShow, setCurrentShow] = useState(
    () => getEPGSchedule(digitalChannelSchedule)?.currentShow || {}
  );
  const [localTime, setLocalTime] = useState('');
  const oldId = currentShow?.easternDateStart;

  const componentToRender = useMemo(() => {
    const isShowLive = !!currentShow?.live;
    const isLocalesPage = relativeUrl?.includes('/local/');
    const isNoticiasHomePage = relativeUrl === '/noticias';
    const isUnivisionHomepage = !isTudn && relativeUrl === '/';

    if (!currentShow || (isUnivisionHomepage && !isShowLive)) {
      return null;
    }

    const title = currentShow.title || otherData.title;
    const isTudnFlavor = settings?.epgFlavor ? settings.epgFlavor === 'tudn' : isTudn;

    const ChannelStripComponent = (
      <ChannelStrip
        data={{ ...otherData }}
        title={title}
        time={localTime}
        widgetContext={widgetContext}
        isShowLive={isShowLive}
        isTudn={isTudnFlavor}
      />
    );

    // Always show channel strip on noticias sections (except homepage)
    if (
      (!isNoticiasHomePage && (type === SECTION) && (vertical?.toLowerCase() === NEWS))
      || (isTudn && !isShowLive) || (isLocalesPage && !isShowLive)
    ) {
      return ChannelStripComponent;
    }

    if (
      (isTudn && isShowLive)
      || (isNoticiasHomePage && isShowLive)
      || (isLocalesPage && isShowLive)
      || forceSingleWidget
    ) {
      return (
        <SingleWidget
          isTudn={isTudnFlavor}
          key={currentShow.easternDateStart}
          device={device}
          settings={settings}
          time={localTime}
          widgetContext={widgetContext}
          cardData={['data', { ...otherData, digitalChannelSchedule, title }]}
          isLive247
          isVixEnabled={features.widgets.isVixEnabled()}
          forceMobile={forceSingleWidget}

        />
      );
    }

    return ChannelStripComponent;
  }, [
    isTudn,
    currentShow,
    device,
    digitalChannelSchedule,
    forceSingleWidget,
    localTime,
    otherData,
    relativeUrl,
    settings,
    type,
    vertical,
    widgetContext,
  ]);

  useEffect(() => {
    const { easternDateStart, easternDateEnd } = currentShow;
    const timeFormatted = easternDateStart
      && easternDateEnd
      && `${getShowToLocalTime(easternDateStart)} - ${getShowToLocalTime(easternDateEnd)}`;

    setLocalTime(timeFormatted);
  }, [currentShow]);

  useInterval(() => {
    const newCurrentShow = getEPGSchedule(digitalChannelSchedule);
    const newID = newCurrentShow?.currentShow?.easternDateStart;

    /* istanbul ignore next */
    if (oldId !== newID) {
      /* istanbul ignore next */
      setCurrentShow(newCurrentShow?.currentShow);
    }
  }, UPDATE_INTERVAL);

  if (!componentToRender) return null;

  return componentToRender;
};

DigitalChannelEPG.propTypes = {
  content: PropTypes.array,
  device: PropTypes.string,
  forceSingleWidget: PropTypes.bool,
  settings: PropTypes.object,
  widgetContext: PropTypes.object,
};

export default DigitalChannelEPG;
