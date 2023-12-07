import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import ProgressConnector from '@univision/fe-components-base/dist/components/Progress/ProgressConnector';

import ContentListPlaceholder from '../Placeholders/ContentListPlaceholder';
import ContentListItem from './ListItem';

import Styles from './ContentList.scss';

/**
 * Lazily renders a list of items fetched from the content API.
 * @param {Object} props the ContentList component react properties
 * @returns {JSX}
 */
class ContentList extends React.Component {
  static defaultProps = {
    infiniteScrollingEnabled: true,
    placeholderLabel: localization.get('loading'),
  };

  static propTypes = {
    contents: PropTypes.array.isRequired,
    infiniteScrollingEnabled: PropTypes.bool,
    itemComponent: PropTypes.elementType.isRequired,
    limit: PropTypes.number,
    pageData: PropTypes.object,
    placeholderLabel: PropTypes.string,
    thirdPartyAdsDisabled: PropTypes.bool,
    trackItem: PropTypes.func,
  };

  /**
   * ContentList constructor
   * @param {Object} props the ContentList component react properties
   */
  constructor(props) {
    super(props);

    const {
      contents,
      infiniteScrollingEnabled,
      limit,
    } = this.props;
    this.onNextItemFetched = this.onNextItemFetched.bind(this);
    this.updateLoader = this.updateLoader.bind(this);
    this.setItemRef = this.setItemRef.bind(this);
    this.updateInitialLoad = this.updateInitialLoad.bind(this);

    let loadedContents = [];
    if (isValidArray(contents)) {
      // Start with the first content
      loadedContents = [contents[0]];
      // Set the next item to kick off infinite scrolling if enabled
      if (infiniteScrollingEnabled && limit > 1) {
        const [, nextItem] = contents;
        loadedContents[0].nextItem = nextItem;
      }
    }

    this.state = {
      loadedContents,
      displayLoader: false,
      initialLoad: true,
    };
    // Collection of content types ie. articles, videos, V&HSS.
    this.items = [];
  }

  /**
   * Update initial load flag
   */
  updateInitialLoad() {
    this.setState({ initialLoad: false });
  }

  /**
   * Adds the next item to the loaded contents collection.
   * @param {Object} content Next content loaded
   * @param {Function} callback callback
   */
  onNextItemFetched(content, callback) {
    const { loadedContents } = this.state;
    const { contents, limit } = this.props;
    const isValidItem = content && loadedContents.indexOf(content) === -1;
    const hasFreeSpace = limit === 0 || loadedContents.length < limit;
    const isRepeatedContent = content && loadedContents.find(val => val.uid === content.uid);

    if (isValidItem && hasFreeSpace && !isRepeatedContent) {
      // eslint-disable-next-line no-underscore-dangle
      if (window._taboola !== undefined) window._taboola.push({ notify: 'newPageLoad' });
      const newItem = content;
      // Do not add next item if adding it will exceed the limit
      if (loadedContents.length + 1 < limit) {
        newItem.nextItem = contents[loadedContents.length + 1];
      }
      // avoid mutation
      this.setState((state) => {
        return {
          displayLoader: false,
          loadedContents: state.loadedContents.concat(newItem),
        };
      }, callback);
    }
  }

  /**
   * Sets an item ref so it can be passed to the Progress component
   * @param {ReactNode} node the dom ref element
   * @param {number} index the index position of the content list item
   */
  setItemRef(node) {
    if (node) {
      const index = node.getAttribute('data-index');
      this.items[index] = node;
    }
  }

  /**
   * Updates the loader visibility for infinite scrolling.
   * @param {Object} { displayLoader } shows or hides the loader placeholder
   */
  updateLoader({ displayLoader }) {
    this.setState({ displayLoader });
  }

  /**
   * Renders the contents list.
   * @returns {XML}
   */
  render() {
    const { loadedContents, displayLoader, initialLoad } = this.state;
    const {
      infiniteScrollingEnabled,
      itemComponent,
      pageData,
      placeholderLabel,
      thirdPartyAdsDisabled,
      trackItem,
    } = this.props;
    return (
      <Fragment>
        {infiniteScrollingEnabled && (
          <ProgressConnector loadedContents={loadedContents} items={this.items} />
        )}
        <div>
          {loadedContents.map((content, index) => {
            const itemProps = {
              componentLoaded: true,
              contentData: content,
              depth: index + 1,
              isLoaded: content.body,
              itemComponent,
              nextItem: content.nextItem,
              onNextItemFetched: this.onNextItemFetched,
              pageData,
              supressTracking: index === 0,
              thirdPartyAdsDisabled,
              trackItem,
              updateLoader: this.updateLoader,
            };

            return (
              <div
                ref={this.setItemRef}
                data-index={index}
                data-content-loaded={content.uid}
                className={Styles.item}
                key={content.uid}
              >
                <ContentListItem
                  {...itemProps}
                  updateInitialLoad={this.updateInitialLoad}
                  initialLoad={initialLoad}
                />
              </div>
            );
          })}
        </div>
        { displayLoader && <ContentListPlaceholder label={placeholderLabel} /> }
      </Fragment>
    );
  }
}

export default ContentList;
