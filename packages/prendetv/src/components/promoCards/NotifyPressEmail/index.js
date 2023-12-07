/**
 * @module PrendeTV Notify Press Email
 */
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PrendeTVContext from '../../../context';
import { SALESFORCE_EVENT_TYPE } from '../../../constants';
import ContactSupport from '../../ContactSupport';

import Styles from './NotifyPressEmail.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const Title = styled.h3`${Styles.title}`;
const IframeContainer = styled.iframe`${Styles.iframeContainer}`;

/**
 * Prende TV Notify Press Email promo card type.
 *
 * @param {boolean} disabledForm - indicates if the the form shoyld be rendered.
 * @param {string} formPlaceholder - email or placeholder text.
 * @param {string} headLine - message title
 * @param {number} index - position in the landing page.
 * @returns {JSX}
 */
const NotifyPressEmail = ({
  disabledForm,
  formPlaceholder,
  headLine,
  index,
}) => {
  const { lang } = useContext(PrendeTVContext);
  const iframeRef = useRef();
  const positionId = `subscribe-ifr-${index}`;

  useEffect(() => {
    window.addEventListener('message', ({ data }) => {
      if (data.type === SALESFORCE_EVENT_TYPE && iframeRef.current.id === data.positionId) {
        window.dataLayer.push({
          event: 'newsletter_subscribe',
        });
      }
    }, false);
  }, [iframeRef]);

  return (
    <Wrapper>
      {!disabledForm
        ? (
          <>
            <InnerWrapper>
              <Title>
                {headLine}
              </Title>
            </InnerWrapper>
            <IframeContainer id={positionId} ref={iframeRef} scrolling="no" src={`https://pub.s7.exacttarget.com/q5foqphqxf0?rev=8&lang=${lang}&positionId=${positionId}&placeholder=${formPlaceholder}`} />
          </>
        )
        : (<ContactSupport headLine={headLine} formPlaceholder={formPlaceholder} />)}
    </Wrapper>
  );
};

NotifyPressEmail.propTypes = {
  disabledForm: PropTypes.bool,
  formPlaceholder: PropTypes.string,
  headLine: PropTypes.string,
  index: PropTypes.number,
};

export default NotifyPressEmail;
