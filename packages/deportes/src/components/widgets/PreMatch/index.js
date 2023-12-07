import React from 'react';
import PropTypes from 'prop-types';

import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import PreGame from './PreGame';

/**
 * A Widget displaying PreMatch for web view
 */
class PreMatch extends React.PureComponent {
  /**
   * Update component to show when is mounted
   */
  componentDidMount() {
    const { getPreMatch } = this.props;
    if (getPreMatch) {
      getPreMatch();
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { props: { data, settings }, context } = this;
    const hasData = hasKey(data, 'infoCards');

    if (!hasData || data?.error) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.PREMATCH);
    }

    return (
      <>
        <div className="uvs-widget prematch row">
          <PreGame {...data} />
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

/**
 * @property {object} settings - widget settings from definition/factory
 * @property {bool} [settings.widgetAd] - ad options/settings to render inside widget
 * @property {string} [settings.widgetAd.type] - ad type that should be render
 * @property {Object} data  - pre match data objects retrieved from extractor
 * @property {Function} getPreMatch - redux action to get pre-match data
 */
PreMatch.propTypes = {
  settings: PropTypes.shape({
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  // props from redux
  data: PropTypes.object,
  getPreMatch: PropTypes.func,
};

PreMatch.defaultProps = {
  data: {
    error: false,
  },
};

PreMatch.contextType = SoccerMatchNavContext;

export default PreMatch;
