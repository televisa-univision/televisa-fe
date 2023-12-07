import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
// eslint-disable-next-line
import LiveIcon from '@univision/fe-components-base/dist/components/LiveIcon';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { pageUriSelector, themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';

import Link from '../../../../../Link';
import Styles from './Navigation.styles';
import SubNavigation from './SubNavigation';

const Wrapper = styled.nav`${Styles.wrapper}`;
const MainList = styled.ul`${Styles.mainList}`;
const MainMenuItem = styled.li`${Styles.mainMenuItem}`;
const SubmenuWrapper = styled.div`${Styles.submenuWrapper}`;
const Arrow = styled(Icon)`${Styles.arrow}`;
const LinkWrapper = styled(Link)`${Styles.linkWrapper}`;
const Placeholder = styled.div`${Styles.wrapper}`;
const IconWrapper = styled.div`${Styles.iconWrapper}`;

const MX_PATH = '/mx';

/**
 * Renders navigation for VIX sites
 * @param {string} className css class
 * @param {[]} links list of links
 * @param {boolean} uppercase with uppercase style
 * @returns {JSX}
 */
const Navigation = ({
  className,
  links,
  uppercase,
  renderOnServer,
  isTelevisaSite,
}) => {
  // feature flag
  const isLiveBlogFeatureFlag = features.liveblog.liveBlogPerformance();
  const [activeMenu, setActiveMenu] = useState(null);
  const theme = useSelector(themeSelector);
  const pageUri = useSelector(pageUriSelector);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const [shouldRender, setShouldRender] = useState(renderOnServer);

  useEffect(() => {
    if (!renderOnServer) {
      setShouldRender(true);
    }
  }, [renderOnServer]);

  /**
   * Defines active menu
   * @param {string} item current item
   * @returns {function}
   */
  const onMenuClick = useCallback(item => () => {
    if (activeMenu === item) {
      setActiveMenu(null);
    } else {
      setActiveMenu(item);
    }
  }, [activeMenu]);

  if (!isValidArray(links)) {
    return null;
  }

  if (!shouldRender) {
    return <Placeholder isWorldCupMVP={isWorldCupMVP} />;
  }

  const currentUri = toRelativeUrl(pageUri?.replace(MX_PATH, ''));

  return (
    <Wrapper
      uppercase={uppercase}
      className={className}
      theme={theme}
      isWorldCupMVP={isWorldCupMVP}
      isTelevisaSite={isTelevisaSite}
    >
      <MainList
        className="uvs-font-c-bold"
        isWorldCupMVP={isWorldCupMVP}
        isTelevisaSite={isTelevisaSite}
      >
        {links?.map((linkItem) => {
          const hasSubmenu = linkItem.dropDownOptions;
          const isActive = activeMenu === linkItem.name;
          const isCurrentPage = currentUri === toRelativeUrl(linkItem?.link?.replace(MX_PATH, ''))
            && !!linkItem?.site;
          const { icon } = linkItem;

          return (
            <MainMenuItem
              isCurrentPage={isCurrentPage}
              active={isActive}
              key={linkItem.name}
              onClick={
                (hasSubmenu || isTelevisaSite) && onMenuClick(linkItem.name)
              }
              isWorldCupMVP={isWorldCupMVP}
              isTelevisaSite={isTelevisaSite}
            >
              <LinkWrapper
                {...(isLiveBlogFeatureFlag && {
                  'aria-label': `${linkItem.name}, menu item`,
                })}
                href={linkItem.link}
                preventFollowClick={!!hasSubmenu}
                site={linkItem.site}
                target={linkItem?.target}
                checkUserLocation
              >
                {icon && isValidObject(icon) && (
                  <IconWrapper>
                    {icon.name === 'live' ? (
                      <LiveIcon {...icon.props} />
                    ) : (
                      <Icon name={icon.name} {...icon.props} />
                    )}
                  </IconWrapper>
                )}
                {linkItem.name}
              </LinkWrapper>
              {hasSubmenu && (
                <>
                  <Arrow name={isActive ? 'arrowUp' : 'arrowDown'} />
                  <SubmenuWrapper
                    active={isActive}
                    isWorldCupMVP={isWorldCupMVP}
                  >
                    <SubNavigation
                      linkList={linkItem.dropDownOptions}
                      isWorldCupMVP={isWorldCupMVP}
                    />
                  </SubmenuWrapper>
                </>
              )}
            </MainMenuItem>
          );
        })}
      </MainList>
    </Wrapper>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  links: PropTypes.array,
  renderOnServer: PropTypes.bool,
  uppercase: PropTypes.bool,
  isTelevisaSite: PropTypes.bool,
};

Navigation.defaultProps = {
  renderOnServer: true,
};

export default React.memo(Navigation);
