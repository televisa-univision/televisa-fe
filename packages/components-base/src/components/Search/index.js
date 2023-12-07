import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Store from '@univision/fe-commons/dist/store/store';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import {
  DARKER_GREY,
  DARK_VARIANT,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import { setSearchQuery } from '@univision/fe-commons/dist/store/actions/search/search-actions';
import { proxySelector, sitesSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '../Button';
import Styles from './Search.scss';

/**
 * Tracks click search button
 * @param {string} eventAction event action to track
 * @param {Function} onToggle callback on search action
 * @returns {Function}
 */
const trackClick = (eventAction, onToggle) => () => {
  NavigationTracker.track(NavigationTracker.events.click, { eventAction });
  if (isValidFunction(onToggle)) {
    onToggle();
  }
};

/**
 * Search component
 * @returns {JSX}
 */
const Search = ({
  className,
  formStyle,
  isHamburgerMenu,
  onToggle,
  open,
  placeholder,
  searchOnRight,
  showCloseButton,
  variant,
}) => {
  const state = Store.getState();
  const uvnSite = proxySelector(state) || sitesSelector(state)[UNIVISION_SITE];

  const isDark = variant === DARK_VARIANT;
  const iconFill = isDark ? WHITE : DARKER_GREY;

  const historyContext = useContext(RouterContext);
  const queryEl = useRef(null);
  /**
   * Check point to defer request in case of SPA
   * @param {string} e Submit event
   */
  const handleSubmit = (e) => {
    // use default behaviour if not spa
    const { history } = historyContext;
    if (!shouldSkipSpa({ url: uvnSite }) && history) {
      e.preventDefault();
      const q = queryEl.current.value;
      history.push(`/search?q=${q}&d=month`); // set results to one month by default
      Store.dispatch(setSearchQuery(q));
    }
  };

  return (
    <div
      className={classnames(
        Styles.search,
        {
          [Styles.searchOpen]: !!open,
          [Styles.darkContrast]: !isDark,
        },
        className,
      )}
      data-element-name="SearchButton"
    >
      {!open && (
        <Button
          className={`${Styles.searchHandler}
          ${Styles.btnReset}`}
          onClick={trackClick('topnav-header-search icon', onToggle)}
        >
          <Icon name="search" size="small" fill={iconFill} />
        </Button>
      )}
      <form
        className={Styles.searchForm}
        data-element-name="SearchForm"
        method="get"
        action={`${uvnSite}/search`}
        style={formStyle}
        onSubmit={handleSubmit}
      >
        <span
          className={Styles.iconSpacer}
          style={{ order: searchOnRight ? 1 : 0 }}
        >
          <Icon name="search" size="small" fill={iconFill} />
        </span>
        <input
          className={`${Styles.searchInput} uvs-font-a-bold`}
          name="q"
          onClick={isHamburgerMenu ? trackClick('hamburger-search bar click', onToggle) : undefined}
          placeholder={placeholder}
          style={{ order: searchOnRight ? 0 : 1 }}
          type="search"
          ref={queryEl}
        />
      </form>

      {showCloseButton && open && (
        <Button className={`${Styles.btnReset} ${Styles.close}`} onClick={onToggle}>
          <Icon name="close" size="small" fill={iconFill} />
        </Button>
      )}
    </div>
  );
};

/**
 * @param {boolean} isHamburgerMenu if search component part of the hamburger menu
 */
Search.propTypes = {
  className: PropTypes.string,
  showCloseButton: PropTypes.bool,
  formStyle: PropTypes.object,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  isHamburgerMenu: PropTypes.bool,
  searchOnRight: PropTypes.bool,
};

Search.defaultProps = {
  placeholder: 'BUSCAR EN UNIVISION',
  showCloseButton: true,
  isHamburgerMenu: false,
  searchOnRight: false,
};

export default Search;
