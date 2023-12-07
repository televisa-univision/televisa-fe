/**
 * @module PrendeTV Navigation
 */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '../../constants/localization';
import PrendeTVContext from '../../context';
import { getUrlPath } from '../../utils';
import { PRENDETV_LINKS } from '../../constants';

import Styles from './Navigation.styles';

const List = styled.div`${Styles.list}`;
const Item = styled.div`${Styles.item}`;
const Link = styled.a`${Styles.link}`;

/**
 * Prende TV static Navigation.
 *
 * @param {boolean} isFooter - indicates if the the navigation will be in the footer.
 * @returns {JSX}
 */
const Navigation = ({ isFooter }) => {
  const { lang, path } = useContext(PrendeTVContext);

  const track = useCallback((eventName) => {
    window.dataLayer.push({
      event: `click_${eventName}`,
    });
  }, []);

  return (
    <List isFooter={isFooter}>
      {PRENDETV_LINKS.map(({ key, target, url }) => {
        return (
          <Item key={`item-link-${key}`} isFooter={isFooter}>
            <Link
              href={getUrlPath(lang, url)}
              isFooter={isFooter}
              onClick={() => track(key)}
              target={target}
              className={`${url === path ? 'active' : ''}`}
            >
              {localization.get(key)}
            </Link>
          </Item>
        );
      })}
    </List>
  );
};

Navigation.propTypes = {
  isFooter: PropTypes.bool,
};

export default Navigation;
