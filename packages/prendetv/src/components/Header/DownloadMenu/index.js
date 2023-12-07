/**
 * @module PrendeTV DownloadMenu
 */
import React, {
  useCallback, useState, useMemo, useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DARK_GRAY } from '@univision/fe-utilities/styled/constants';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';
import Animated from '@univision/fe-components-base/dist/components/Animated';
import Icon from '@univision/fe-icons/dist/components/Icon';

import localization from '../../../constants/localization';
import { PRODUCT_LINKS } from '../../../constants';
import { setContentTracking } from '../../../utils';
import {
  DEFAULT_TRANSITION,
  DESKTOP_ANIMATION,
  HIDE_SPEED,
  MOBILE_ANIMATION,
  SHOW_SPEED,
} from './animationSettings';
import Styles from './DownloadMenu.styles';

const AppLink = styled.a`${Styles.appLink}`;
const Background = styled(Animated)`${Styles.background}`;
const CloseButton = styled.div`${Styles.closeButton}`;
const CloseIcon = styled(Icon).attrs({
  fill: DARK_GRAY,
  name: 'close',
  size: 20,
})`${Styles.closeIcon}`;
const DownloadButton = styled.div`${Styles.downloadButton}`;
const DownloadIcon = styled(Icon).attrs({
  name: 'download',
  size: 15,
})`${Styles.downloadIcon}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * DownloadMenu component
 * @param {Object} props - component props
 * @param {string} props.device - current device
 * @returns {JSX}
 */
const DownloadMenu = ({ device }) => {
  const isMobile = device === MOBILE;
  const dropDownRef = useRef();
  const buttonRef = useRef();
  const [open, setOpen] = useState(false);
  const variants = isMobile ? MOBILE_ANIMATION : DESKTOP_ANIMATION;

  /**
   * linkCallback
   *
   * handles the link callback
   * @param {Object} event - synthetic event
   * @returns {function}
   */
  const linkCallback = useCallback((event) => {
    setOpen(false);
    setContentTracking(event);
  }, []);

  useEffect(() => {
    /**
     * handle outside click
     * @param {Object} event - synthetic event
     * @returns {?null}
     */
    const handleOutsideClick = (event) => {
      // prevents button jump
      if (buttonRef.current && buttonRef.current.contains(event.target) && !isMobile) {
        return null;
      }

      if (dropDownRef.current
        && !dropDownRef.current.contains(event.target)
        && open
        && !isMobile
      ) {
        setOpen(false);
      }

      return null;
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [buttonRef, dropDownRef, isMobile, open]);

  const apps = useMemo(() => Object.keys(PRODUCT_LINKS).map((app) => {
    const {
      key, target, title, url,
    } = PRODUCT_LINKS[app];

    return (
      <AppLink
        data-app={key}
        href={url}
        key={key}
        onClick={linkCallback}
        target={target}
      >
        {title}
      </AppLink>
    );
  }), [linkCallback]);

  return (
    <Wrapper>
      <DownloadButton ref={buttonRef} onClick={() => setOpen(!open)}>
        <DownloadIcon />
        {localization.get('downloadTheApp')}
      </DownloadButton>
      <Background
        hideSpeed={isMobile ? DEFAULT_TRANSITION : HIDE_SPEED}
        isMobile={device}
        isVisible={open}
        showSpeed={isMobile ? DEFAULT_TRANSITION : SHOW_SPEED}
        ref={dropDownRef}
        {...variants}
      >
        {isMobile && (
          <CloseButton onClick={() => setOpen(!open)}>
            <CloseIcon />
          </CloseButton>
        )}
        {apps}
      </Background>
    </Wrapper>
  );
};

DownloadMenu.propTypes = {
  device: PropTypes.string,
};

export default DownloadMenu;
