import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import DFPAdsProvider from '@univision/fe-commons/dist/components/ads/dfp/DFPAdsProvider';

import { pageData } from '@univision/fe-commons/dist/config/storyMocks';

import ContentCardGrid from '.';

/**
 * Ad provider wrapper
 * @param {Object} children that contains ads to be render
 * @constructor
 */
const AdWrapper = ({ children }) => (
  <div>
    <BKPIndicator />
    <DFPAdsProvider
      env={pageData.env}
      settings={pageData.data.adSettings}
      requestParams={pageData.requestParams}
      contentType={pageData.data.type}
    >
      {children}
    </DFPAdsProvider>
  </div>
);

AdWrapper.propTypes = {
  children: PropTypes.node,
};

storiesOf('Cards/Legacy/ContentCardGrid', module)
  .add('Default', () => (
    <ApiProvider
      url="https://www.univision.com/radio/los-angeles-klve-fm"
      render={data => (
        <ContentCardGrid
          device="mobile"
          content={data.widgets[1].contents}
          settings={data.widgets[1].settings}
        />
      )}
    />
  ))
  .add('With theme', () => (
    <ApiProvider
      url="https://www.univision.com/radio/los-angeles-klve-fm"
      render={data => (
        <ContentCardGrid
          theme={{ primary: 'blue' }}
          device="mobile"
          content={data.widgets[1].contents}
          settings={data.widgets[1].settings}
        />
      )}
    />
  ))
  .add('No title', () => (
    <ApiProvider
      url="https://www.univision.com/radio/los-angeles-klve-fm"
      render={(_data) => {
        const data = _data;
        data.widgets[1].settings.title = null;
        return (
          <ContentCardGrid
            device="mobile"
            content={data.widgets[1].contents}
            settings={data.widgets[1].settings}
          />
        );
      }}
    />
  ))
  .add('With ad in mobile', () => (
    <ApiProvider
      url="https://www.univision.com/radio/los-angeles-klve-fm"
      render={data => (
        <AdWrapper>
          <ContentCardGrid
            device="mobile"
            content={data.widgets[1].contents}
            settings={data.widgets[1].settings}
          />
        </AdWrapper>
      )}
    />
  ))
  .add('Passing element as overlay', () => {
    const overlay = (<span> React overlay element </span>);
    return (
      <ApiProvider
        url="https://www.univision.com/radio/los-angeles-klve-fm"
        render={data => (
          <ContentCardGrid
            theme={{ primary: 'blue' }}
            device="mobile"
            content={data.widgets[1].contents}
            settings={data.widgets[1].settings}
            overlay={overlay}
          />
        )}
      />
    );
  })
  .add('with mobileAsTabletView', () => {
    return (
      <ApiProvider
        url="https://www.univision.com/radio/los-angeles-klve-fm"
        render={data => (
          <ContentCardGrid
            theme={{ primary: 'blue' }}
            device="mobile"
            content={data.widgets[1].contents}
            settings={data.widgets[1].settings}
            mobileAsTabletView
          />
        )}
      />
    );
  });
