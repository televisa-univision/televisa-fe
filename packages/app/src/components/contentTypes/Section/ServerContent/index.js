import React from 'react';
import PropTypes from 'prop-types';

import Link from '@univision/fe-components-base/dist/components/Link';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';

import { appConfig } from '../../../../config';

const SERVER_CONTENT_LIMIT = appConfig.features.section.seoContentItemsCount;

/**
 * Wrapper for Vertical Slideshow Components
 */
class ServerContent extends React.Component {
  /**
   * ServerContent generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = { hideComponent: false };
  }

  /**
   * Remove this component once mounted
   */
  componentDidMount() {
    this.setState({ hideComponent: true });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { hideComponent } = this.state;
    const { widgets } = this.props;
    let itemsCount = 0;

    if (hideComponent || !isValidArray(widgets)) return null;

    const content = widgets.map((widget) => {
      // pick 10 items from current widget
      const contents = widget.contents?.slice(0, 10).reduce((acc, item) => {
        //  if we reach limit, avoid add more server items
        if (itemsCount >= SERVER_CONTENT_LIMIT) return acc;
        const { parent } = item;
        const tagName = parent?.title;
        const tagUrl = parent?.uri;
        const itemComponent = (
          <div key={item.uid}>
            <h3>
              <Link href={item.uri}>
                {item.title}
              </Link>
              {(tagName && tagUrl) && (
              <>
                <span> - </span>
                <Link href={tagUrl}>
                  {tagName}
                </Link>
              </>
              )}
            </h3>
          </div>
        );
        itemsCount += 1;
        return [acc, itemComponent];
      }, []);

      // if there are not contents in the current widget render nothing
      if (!isValidArray(contents)) return null;

      return (
        <React.Fragment key={widget.id}>
          <h2>
            <Link href={widget.settings?.titleLink?.href || ''}>
              {widget.settings?.title}
            </Link>
          </h2>
          {contents}
        </React.Fragment>
      );
    });

    return (
      <div>{content}</div>
    );
  }
}

/**
 * propTypes
 * @property {Array} widgets - widgets from pageData
 */
ServerContent.propTypes = {
  widgets: PropTypes.array,
};

export default ServerContent;
