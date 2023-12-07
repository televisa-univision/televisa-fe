import React, { useCallback, useMemo, useRef } from 'react';
import Timeago from 'react-timeago';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CollapsibleComponent from '@univision/fe-components-base/dist/components/Collapsible';
import { GREY, WHITE, ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons';
import ActionLink from '@univision/fe-components-base/dist/components/ActionLink';
import { getTimeAgoFormatter } from '@univision/fe-commons/dist/utils/datetime';
import RichText from '@univision/fe-components-base/dist/components/RichText';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import features from '@univision/fe-commons/dist/config/features';
import Image from '@univision/fe-components-base/dist/components/Image';
import Link from '@univision/fe-components-base/dist/components/Link';

import Styles from './ResultItem.styles';
import { applyMethods, arrows, jobTypes } from '../constants';
import QuickApply from '../QuickApply';

import companies from './companies.json';

const ApplyButton = styled(ActionLink).attrs({ className: 'uvs-font-c-bold' })`${Styles.applyButton}`;
const ArrowIcon = styled(Icon)``;
const Clock = styled(Icon).attrs({ fill: WHITE, name: 'clock', size: 13 })`${Styles.clock}`;
const CloseText = styled.span.attrs({ className: 'uvs-font-c-bold' })`${Styles.closeText}`;
const CloseButton = styled.div`${Styles.closeButton}`;
const ApplyContainer = styled.div`${Styles.applyContainer}`;
const CompanyInfoContainer = styled.div`${Styles.companyInfoContainer}`;
const Collapsible = styled(CollapsibleComponent)`${Styles.collapsible}`;
const Company = styled.span.attrs({ className: 'uvs-font-c-bold' })`${Styles.company}`;
const Details = styled.span.attrs({ className: 'uvs-font-c-regular' })`${Styles.text}`;
const DescriptionText = styled(RichText).attrs({ className: 'uvs-font-a-light' })`${Styles.descriptionText}`;
const Info = styled.div`${Styles.info}`;
const Header = styled.div`${Styles.header}`;
const Buttons = styled.div`${Styles.buttons}`;
const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;
const TitleCompany = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.titleCompany}`;
const TitleAboutCompany = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.titleAboutCompany}`;
const DetailCompany = styled.span.attrs({ className: 'uvs-font-c-regular' })`${Styles.detailCompany}`;
const LastDetails = styled.div`${Styles.lastDetails}`;
const LocationIcon = styled(Icon)`${Styles.locationIcon}`;
const LogoWrapper = styled.div`${Styles.logoWrapper}`;
const PictureOverlay = styled.div`${Styles.pictureOverlay}`;
const CompanyInfo = styled.div`${Styles.companyInfo}`;
const LinkDetail = styled(Link).attrs({ className: 'uvs-font-c-bold' })`${Styles.linkDetail}`;

/**
 * Render the Job Result Item component
 * @param {string} applyMethod - quick apply, redirect or with screening
 * @param {string} brandName - who wants a worker
 * @param {string} city - city of the job
 * @param {string} description - description about the job
 * @param {string} id - id of the selected job
 * @param {string} industry - industry of the job
 * @param {string} jobType - if full publishedDate of part publishedDate
 * @param {string} language - texts language
 * @param {string} name - title of the job
 * @param {Object} partner - information about apploi partner/job
 * @param {string} publishedDate - when the job was upload
 * @param {string} redirectApplyUrl - link to job on apploi
 * @param {string} utmSource - platform web or app
 * @returns {JSX}
 */
const ResultItem = ({
  applyMethod, brandName, city, description, id,
  industry, jobType, language, name, partner,
  publishedDate, redirectApplyUrl, utmSource, resumeRequired,
}) => {
  const company = companies.filter(
    item => item.name.toLowerCase() === brandName.toLowerCase()
      && item.city.toLowerCase() === city.toLowerCase()
  );
  const hasCompanyInfo = company.length > 0;
  const isQuickApply = applyMethod === applyMethods.QUICK && features.content.isQuickApplyActive();
  const trackEvent = useCallback((view) => {
    WidgetTracker.track(WidgetTracker.events.jobSearchEngagement, {
      view,
      industry,
      title: name[language],
    });
  }, [industry, language, name]);

  const onCollapse = useCallback((status) => {
    if (status === 'show') {
      trackEvent('view');
    }
  }, [trackEvent]);

  /**
   * Apply click handler
   * @param {Object} e - event
   * @param {Object} view - event type
   */
  const applyJob = useCallback((e, view) => {
    if (!isQuickApply) {
      e.stopPropagation();
    }
    trackEvent(view);
  }, [isQuickApply, trackEvent]);

  /**
   * Gets button's label based on apply method and language
   * @returns {string}
   */
  const buttonLabel = useMemo(() => {
    if (!isQuickApply) return `${localization.get('apply', { language })}`;

    if (language === 'en') {
      return `${localization.get('quick', { language })} ${localization.get('apply', { language })}`;
    }
    return `${localization.get('apply', { language })} ${localization.get('quick', { language })}`;
  }, [isQuickApply, language]);

  const divRef = useRef(null);
  /**
   * Adjust Head scroller
   */
  const onClickApply = useCallback(() => {
      // eslint-disable-next-line babel/no-unused-expressions
      divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [divRef]);

  return (
    <Collapsible
      onChange={onCollapse}
      header={({ status }) => (
        <Header ref={divRef}>
          <Info>
            <Title>{name[language]}</Title>
            <Company>{brandName}</Company>
            <LastDetails>
              <LocationIcon name="address" size={[12, 12]} fill={GREY} />
              <Details>{city} · <Timeago
                date={publishedDate}
                formatter={getTimeAgoFormatter(language)}
              /> · {jobTypes[language][jobType]}
              </Details>
            </LastDetails>
          </Info>
          <Buttons>
            <ApplyButton onClick={e => applyJob(e, 'applicar-header')} href={redirectApplyUrl} target="_blank" isQuick={isQuickApply}>
              {isQuickApply && <Clock />}{buttonLabel}
            </ApplyButton>
            <CloseButton>
              <CloseText>{`${status === 'show' ? localization.get('close', { language }) : localization.get('seeDetails', { language })}`}</CloseText>
              <ArrowIcon name={arrows[status]} size={22} />
            </CloseButton>
          </Buttons>
        </Header>
      )}
    >
      {({ colapse, status }) => (
        <>
          {isQuickApply && status === 'show'
            && (
              <QuickApply
                id={id}
                partner={partner}
                utmSource={utmSource}
                label={buttonLabel}
                language={language}
                resumeRequired={resumeRequired}
              />
            )}
          <DescriptionText html={description[language]} />
          {hasCompanyInfo
            ? (
              <>
                <TitleAboutCompany>{localization.get('aboutCompany', { language })}</TitleAboutCompany>
                <ApplyContainer>
                  <CompanyInfoContainer>
                    <LogoWrapper>
                      <Image src={company[0].image} height={80} />
                      <PictureOverlay />
                    </LogoWrapper>
                    <CompanyInfo>
                      <TitleCompany>{company[0].name}</TitleCompany>
                      <DetailCompany>{company[0].address}</DetailCompany>
                      <LinkDetail href={company[0].detailLink}>
                        <span>{localization.get('checkCompany', { language })}</span>
                        <Icon name="arrowRight" size={[20, 20]} fill={ASTRONAUT} />
                      </LinkDetail>
                    </CompanyInfo>
                  </CompanyInfoContainer>
                  <Buttons>
                    <ApplyButton onClick={onClickApply} href="" isQuick={isQuickApply}>
                      {isQuickApply && <Clock />}{buttonLabel}
                    </ApplyButton>
                    <CloseButton onClick={colapse}>
                      <CloseText>{localization.get('close', { language })}</CloseText>
                      <ArrowIcon name="arrowUp" size={22} />
                    </CloseButton>
                  </Buttons>
                </ApplyContainer>
              </>
            ) : (
              <>
                <Buttons>
                  <ApplyButton onClick={isQuickApply ? onClickApply : e => applyJob(e, 'applicar')} href={isQuickApply ? '' : redirectApplyUrl} target="_blank" isQuick={isQuickApply}>
                    {isQuickApply && <Clock />}{buttonLabel}
                  </ApplyButton>
                  <CloseButton onClick={colapse}>
                    <CloseText>{localization.get('close', { language })}</CloseText>
                    <ArrowIcon name="arrowUp" size={22} />
                  </CloseButton>
                </Buttons>
              </>
            )}
        </>
      )}
    </Collapsible>
  );
};

ResultItem.propTypes = {
  applyMethod: PropTypes.oneOf([applyMethods.QUICK, applyMethods.FULL, applyMethods.REDIRECT]),
  brandName: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  description: PropTypes.shape({
    en: PropTypes.string.isRequired,
    es: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  industry: PropTypes.string,
  jobType: PropTypes.string,
  language: PropTypes.string,
  partner: PropTypes.object.isRequired,
  publishedDate: PropTypes.string,
  name: PropTypes.shape({
    en: PropTypes.string.isRequired,
    es: PropTypes.string.isRequired,
  }).isRequired,
  redirectApplyUrl: PropTypes.string,
  utmSource: PropTypes.string,
  resumeRequired: PropTypes.bool,
};

export default React.memo(ResultItem);
