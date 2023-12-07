import React from 'react';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import Link from '../../Link';
import navData from '../data';
import Styles from './SeoNav.styles';

const Nav = styled.nav`${Styles.nav}`;

/**
 * Seo navigation to render crawlable elements in the page
 * @returns {JSX}
 */
const SeoNav = () => {
  const crawlableLinks = Object.keys(navData).reduce((acc, curr) => {
    const currentNav = navData[curr];

    if (!currentNav?.crawlable) return acc;

    return [...acc, {
      ...currentNav,
      children: currentNav.children.filter(child => !!child.crawlable),
    }];
  }, []);

  return (
    <Nav>
      {
        crawlableLinks.map((rootLink) => {
          return (
            <React.Fragment key={rootLink.href}>
              <Link
                checkUserLocation
                href={rootLink.href}
                site={rootLink.site}
                target={rootLink.target}
              >
                {rootLink.name}
              </Link>
              {
                isValidArray(rootLink.children) && (
                  <ul>
                    {
                      rootLink.children.map(childLink => (
                        <li key={childLink.href}>
                          <Link
                            checkUserLocation
                            href={childLink.href}
                            site={rootLink.site}
                          >
                            {childLink.name}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </React.Fragment>
          );
        })
      }
    </Nav>
  );
};

export default SeoNav;
