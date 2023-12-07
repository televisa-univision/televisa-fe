import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  safeClassName,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../../../Link';

import { sections } from '../../../data/global';

import { sectionWithPath, trackHamburgerClick } from '../helpers';

import Styles from './AllSectionsDesktop.scss';

/**
 * AllSections - Desktop display
 */
export default class AllSectionsDesktop extends Component {
  /**
   * initial state
   */
  state = {
    expandedSections: {},
    localMarket: false,
  };

  /**
   * Available sites
   */
  sites = getSites(Store);

  /**
   * expandCollapseSection - store the expanded/collapsed state of a given section
   * @param {string} _name the section name
   * @returns {function} a function which sets expanded state of _name when called
   */
  expandCollapseSection = _name => (e) => {
    e.stopPropagation();
    const name = _name.toLowerCase();
    const { expandedSections } = this.state;
    expandedSections[name] = !expandedSections[name];
    this.setState({ expandedSections });
  };

  /**
   * render the parent section
   * @param   {Object} parentSection the parentSection to be displayed
   * @returns {JSX} the section markup
   */
  renderParentSection(parentSection) {
    return (
      <li key={parentSection.name}>
        <ul
          className={Styles.parentSection}
        >
          {parentSection.sections.map(s => this.renderSection(s))}
        </ul>
      </li>
    );
  }

  /**
   * render the top-level expandable/collapsable link
   * @param {Object} section the section to be displayed
   * @returns {JSX} the section markup
   */
  renderSection = (section) => {
    const { expandedSections } = this.state;
    const expanded = expandedSections[section.name.toLowerCase()];
    const { onClickMainLink } = this.props;
    let expansionClass = Styles.collapsed;
    if (expanded) {
      expansionClass = Styles.expanded;
    }
    return (
      <li
        key={section.href}
        className={Styles.section}
        onMouseEnter={this.expandCollapseSection(section.name)}
        onMouseLeave={this.expandCollapseSection(section.name)}
        itemProp={!section.children ? 'name' : undefined}
      >
        <Link
          href={toAbsoluteUrl(section.href, this.sites[section.site])}
          checkUserLocation
          site={section.site}
          className={classnames({ [Styles.active]: expanded }, Styles[safeClassName(section.name)])}
          itemProp={section.href ? 'url' : undefined}
          onClick={onClickMainLink}
          target={section.target}
        >
          {section.name}
        </Link>
        {section.children && (
          <Fragment>
            <span className={Styles.arrow}>
              <Icon name="arrow-right" size="xsmall" key="arrow-right" />
            </span>
            {section.children && (
              <ul
                className={classnames(
                  Styles.child,
                  expansionClass,
                  { [Styles.hasGrandChildren]: section.children }
                )}
              >
                {section.children.map((child) => {
                  const childWithPath = sectionWithPath(child, section);
                  return this.renderChild(childWithPath);
                })}
              </ul>
            )}
          </Fragment>
        )}
      </li>
    );
  };

  /**
   * render the expandable/collapsible link
   * @param   {Object} section the section to be displayed
   * @returns {JSX} the section markup
   */
  renderChild = (section) => {
    return (
      <li
        key={section.href}
        className={classnames(
          Styles.childItem,
        )}
        itemProp={!section.children ? 'name' : undefined}
      >
        <Link
          href={toAbsoluteUrl(section.href, this.sites[section.site])}
          checkUserLocation
          className={section.className}
          itemProp={!section.children ? 'url' : undefined}
          target={section.target}
          onClick={
            // istanbul ignore next
            () => trackHamburgerClick(section.path)
          }
          site={section.site}
        >
          {section.name}
        </Link>
      </li>
    );
  };

  /**
   * Render the nav object
   * @returns {JSX}
   */
  render() {
    const {
      props: { open, profile },
      state: { localMarket },
    } = this;
    const sectionsArr = sections(profile);

    return (
      <nav
        className={classnames(Styles.desktopHamburger, {
          [Styles.open]: open,
        })}
        data-element-name="AllSectionsDesktop"
        itemScope
        itemType="http://www.schema.org/SiteNavigationElement"
      >
        <ul>
          {!localMarket
            && sectionsArr.map(parentSection => this.renderParentSection(parentSection))}
        </ul>
      </nav>
    );
  }
}

AllSectionsDesktop.propTypes = {
  open: PropTypes.bool,
  onClickMainLink: PropTypes.func,
  profile: PropTypes.string,
};
