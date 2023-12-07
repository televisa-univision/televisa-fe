import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  getKey,
  isValidArray,
  partitionArray,
  safeClassName,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';
import Link from '../../../../Link';

import { sections } from '../../../data/global';
import Clickable from '../../../../Clickable';
import Search from '../../../../Search';

import { sectionWithPath, trackHamburgerClick } from '../helpers';

import Styles from './AllSectionsMobile.scss';

/**
 * AllSections - Mobile display
 */
class AllSectionsMobile extends Component {
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

  buttonUniNow = features.header.buttonUniNow();

  /**
   * expandCollapseSection - store the expanded/collapsed state of a given section
   * @param   {string} _name the section name
   * @returns {function}      a function which sets expanded state of _name when called
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
        <ul className={classnames(Styles.parentSection)}>
          {parentSection.sections.map(s => this.renderSection(s))}
        </ul>
      </li>
    );
  }

  /**
   * render the search component opened.
   * @returns {?JSX} the search component
   */
  renderSearchBar = () => {
    return (
      <Search
        open
        showCloseButton={false}
        className={classnames(Styles.icon, Styles.search)}
        variant="dark"
        isHamburgerMenu
      />
    );
  }

  /**
   * render the expandable/collapsable link
   * @param   {Object} section the section to be displayed
   * @returns {JSX} the section markup
   */
  renderSection = (section) => {
    const { expandedSections } = this.state;
    const expanded = expandedSections[section.name.toLowerCase()];
    let expansionClass = Styles.collapsed;
    let expansionTextKey = 'seeMore';
    const { onClickMainLink } = this.props;

    if (expanded) {
      expansionClass = Styles.expanded;
      expansionTextKey = 'seeLess';
    }

    const children = getKey(section, 'children');
    const childrenWithPath = isValidArray(children)
      ? children.map(child => sectionWithPath(child, section))
      : null;

    return (
      <li
        key={section.href}
        className={classnames(Styles.section, expansionClass, {
          [Styles.withSpander]: isValidArray(children),
        })}
        itemProp={!section.children ? 'name' : undefined}
      >
        <Link
          itemProp={section.href ? 'url' : undefined}
          href={toAbsoluteUrl(section.href, this.sites[section.site])}
          className={classnames(Styles[safeClassName(section.name)])}
          onClick={onClickMainLink}
          target={section.target}
        >
          {section.name}
        </Link>
        {section.children && (
          <div className={Styles.expander}>
            <span className={Styles.arrowText}>{localization.get(expansionTextKey)}</span>
            <Clickable
              className={Styles.arrow}
              onClick={this.expandCollapseSection(section.name)}
              type="button"
              icon="arrow-down"
            />
          </div>
        )}
        {childrenWithPath && this.renderChildren(childrenWithPath)}
      </li>
    );
  };

  /**
   * render the first child of this.renderSection
   * @param {Array} children the children
   * @returns {JSX} the children to be rendered
   */
  renderChildren = (children) => {
    return (
      <ul className={Styles.section}>
        {children.map((child) => {
          const grandchildren = getKey(child, 'children');
          const childClass = grandchildren ? Styles.parentchild : Styles.child;
          const grandchildrenWithPath = isValidArray(grandchildren)
            ? grandchildren.map(grandchild => sectionWithPath(grandchild, child))
            : null;

          return (
            <li
              className={classnames(childClass)}
              key={child.href}
              itemProp={!child.children ? 'name' : undefined}
            >
              {child.name && (
                <Link
                  href={toAbsoluteUrl(child.href, this.sites[child.site])}
                  itemProp={!child.children ? 'url' : undefined}
                  onClick={() => trackHamburgerClick(child.path)}
                >
                  {child.name}
                </Link>
              )}
              {grandchildrenWithPath && this.renderGrandchildren({
                children: grandchildrenWithPath,
                columnCount: child.columnCount,
              })}
            </li>
          );
        })}
      </ul>
    );
  };

  /**
   * render the child of this.children
   * @param   {Array} grandchildren the grandchild links
   * @returns {JSX} the grandchildren to render
   */
  renderGrandchildren = ({ children: grandchildren, columnCount }) => {
    return (
      <div className={classnames(Styles.column)}>
        {partitionArray(grandchildren, columnCount).map(({ key, contents }) => (
          <ul key={key}>
            {contents.map(grandchild => (
              <li key={grandchild.href} className={Styles.child} itemProp="name">
                <Link
                  href={toAbsoluteUrl(grandchild.href, this.sites[grandchild.site])}
                  itemProp="url"
                  onClick={
                    // istanbul ignore next
                    () => trackHamburgerClick(grandchild.path)
                  }
                  target={grandchild.target}
                >
                  {grandchild.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  };

  /**
   * Render the nav object
   * @returns {JSX} the final mobile view
   */
  render() {
    const {
      props: { open, profile },
      state: { localMarket },
    } = this;
    const sectionsArr = sections(profile);
    return (
      <nav
        className={classnames(Styles.mobileHamburger, { [Styles.open]: open })}
        data-element-name="AllSectionsMobile"
        itemScope
        itemType="http://www.schema.org/SiteNavigationElement"
      >
        {this.renderSearchBar()}
        <ul>
          {!localMarket && sectionsArr.map(s => this.renderParentSection(s))}
        </ul>
      </nav>
    );
  }
}

AllSectionsMobile.propTypes = {
  open: PropTypes.bool,
  onClickMainLink: PropTypes.func,
  profile: PropTypes.string,
};

export default AllSectionsMobile;
