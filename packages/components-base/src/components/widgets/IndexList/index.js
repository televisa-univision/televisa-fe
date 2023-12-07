import React from 'react';
import PropTypes from 'prop-types';

import WidgetTitle from '../WidgetTitle';
import FullWidth from '../../FullWidth';
import IndexListContent from './IndexListContent';
import IndexListAside from './IndexListAside';

/**
 * Index Widget
 * @param {Object} props - props of the component
 * @property {Array} props.content - widget content
 * @property {string} props.device - user device
 * @property {Object} props.settings - widget settings (title, etc)
 * @property {Object} props.theme - widget theme
 * @returns {JSX}
 */
const IndexList = ({
  content,
  device,
  settings,
  theme,
  widgetContext,
}) => {
  const { title, titleLink } = settings;
  const isDesktop = device === 'desktop';

  return (
    <FullWidth breakpoints={['xxs', 'xs']}>
      <div className="uvs-container">
        <div className="row">
          <div className="col-12">
            <WidgetTitle
              title={title}
              titleLink={titleLink?.href}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <IndexListContent
              content={content}
              device={device}
              theme={theme}
              widgetContext={widgetContext}
            />
          </div>
          {
            isDesktop && (
              <div className="col-md-4">
                <IndexListAside />
              </div>
            )
          }
        </div>
      </div>
    </FullWidth>
  );
};

IndexList.propTypes = {
  content: PropTypes.array,
  device: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  settings: PropTypes.object,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

IndexList.defaultProps = {
  device: 'mobile',
  theme: {},
};

export default IndexList;
