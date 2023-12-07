/* eslint-disable react/no-danger */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import gtmConfig from '../../../../utils/tracking/googleTagManager/gtmConfig.json';

/**
 * AntiFlicker: inserts Google Optimize anti-flicker script to the header
 * @param {Object} props component props
 * @param {string} props.id gtm id
 * @returns {JSX}
 */
const AntiFlicker = ({ id }) => (
  <Head>
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html: '.async-hide { opacity: 0 !important }',
      }}
    />
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
      h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
      (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
      })(window,document.documentElement,'async-hide','dataLayer',4000,
      {'${id || gtmConfig.id}':true});`,
      }}
    />
  </Head>
);

AntiFlicker.propTypes = {
  id: PropTypes.string,
};

export default AntiFlicker;
