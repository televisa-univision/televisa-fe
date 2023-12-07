import React, { PureComponent } from 'react';
import classnames from 'classnames';
import url from 'url';

import logo from '@univision/fe-commons/dist/assets/images/logo-civic-science.svg';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { hasKey, loadExternalScript } from '@univision/fe-commons/dist/utils/helpers';
import Image from '../../Image';
import Styles from './CivicScience.scss';

/**
 * Wrapper for the Civic Science external widget
 */
class CivicScience extends PureComponent {
  /**
   * Constructor
   * @param {Object} props component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      loaded: hasKey(global, 'window.civicscience.widget'),
    };
    this.is_mounted = false;

    const pageData = getPageData(Store);

    if (hasKey(pageData, 'data.externalWidgets.civicScience')) {
      const rawScript = pageData.data.externalWidgets.civicScience;
      // Regular expression to extract the script src, we need it parse the query string
      const srcRegexp = /src="([\s\S]*?)"/i;
      if (srcRegexp.test(rawScript)) {
        const parsedSrc = url.parse(srcRegexp.exec(rawScript)[1], true);
        this.elt = parsedSrc.query.elt;
        this.tgtid = parsedSrc.query.tgtid;
      }
    }
  }

  /**
   * If CivicScience library is already loaded, then load the widget.
   * Otherwise, loads the civic science external script and the widget will be loaded
   * in the componentDidUpdate once the library is loaded.
   */
  componentDidMount() {
    this.is_mounted = true;
    const { loaded } = this.state;
    if (this.elt && this.tgtid) {
      if (loaded) {
        this.renderWidget();
      } else {
        this.loadScript(this.elt, this.tgtid, () => {
          if (this.is_mounted) {
            this.setState({
              loaded: hasKey(global, 'window.civicscience.widget'),
            });
          }
        });
      }
    }
  }

  /**
   * Load the CivicScience widget when the library is loaded.
   */
  componentDidUpdate() {
    const { loaded } = this.state;
    if (loaded) {
      this.renderWidget();
    }
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    this.is_mounted = false;
  }

  /**
   * Add the external script for the Civic Science widget
   * @param {string} elt "elt" Query string param
   * @param {string} tgtid "tgtid Query string param
   * @param {function} onLoad Callback function on load
   */
  loadScript = (elt, tgtid, onLoad) => {
    const params = {
      id: 'civicscience-script',
      src: 'https://www.civicscience.com/jspoll/4/civicscience-widget.js',
      unique: true,
      onLoad,
    };
    loadExternalScript(params);
  };

  /**
   * Render the widget using the CivicScience SDK
   */
  renderWidget() {
    window.civicscience.widget({
      target: this.tgtid,
      container: `#${this.elt}`,
    });
  }

  /**
   * Render the container for Civic Science.
   * It will return null if there is not a Civic Science widget in the Store.
   * @returns {XML}
   */
  render() {
    const { loaded } = this.state;

    if (this.elt && this.tgtid) {
      return (
        <div className={Styles.container} data-element-name="CivicScience">
          <div
            id={this.elt}
            className={classnames(Styles.externalWidget, { [Styles.loaded]: loaded })}
          />
          <div className={classnames(Styles.sponsorship, { [Styles.loaded]: loaded })}>
            En alianza con
            <Image src={logo} alt="Civic Science" />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default CivicScience;
