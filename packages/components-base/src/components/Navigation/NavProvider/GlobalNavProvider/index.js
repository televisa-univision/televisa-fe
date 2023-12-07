import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { tuCiudadLocalMarketSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';
import { fetchLocalMarketContent } from '@univision/fe-commons/dist/store/actions/local/local-actions';

import GlobalNav from '../../GlobalNav';

/**
 * GlobalNav Provider component, any logic related to this will be contained here
 * @param {Object} props of the component
 * @param {string} [props.activePath=#] - current page uri
 * @param {string} [props.domain] - current domain
 * @param {boolean} [props.isTudnSite] - determines if is a TUDN site
 * @param {boolean} [props.isTelevisaSite] - determines if is a Telvisa site
 * @param {boolean} [props.site] - determines current site
 * @returns {JSX}
 */
const GlobalNavProvider = ({
  activePath,
  domain,
  isTudnSite,
  isTelevisaSite,
  themeVariant,
  theme,
  site,
}) => {
  const globalNavProps = {
    activePath,
    domain,
    isTelevisaSite,
    isTudnSite,
    theme,
    themeVariant,
    site,
  };

  const dispatch = useDispatch();
  // fetch localMarket if univision site to populate Tu Ciudad menu option
  useEffect(() => {
    dispatch(fetchLocalMarketContent());
  }, [dispatch, isTudnSite]);

  const currentMarket = useSelector(tuCiudadLocalMarketSelector);

  return (
    <GlobalNav {...globalNavProps} currentMarket={currentMarket} />
  );
};

GlobalNavProvider.propTypes = {
  activePath: PropTypes.string,
  domain: PropTypes.string,
  isTudnSite: PropTypes.bool,
  isTelevisaSite: PropTypes.bool,
  site: PropTypes.string,
  theme: PropTypes.object,
  themeVariant: PropTypes.object,
};

GlobalNavProvider.defaultProps = {
  activePath: '#',
};

export default React.memo(GlobalNavProvider);
