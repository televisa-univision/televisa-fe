import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getScrollTop } from '@univision/fe-commons/dist/utils/helpers';
import config from '../config';

import Styles from './Sidebar.scss';

/**
 * Search Sidebar
 */
class Sidebar extends Component {
  sidebar = React.createRef();

  /**
   * Setup the scroll event.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScrolling);
  }

  /**
   * Clean up the scroll event on unmount
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrolling);
  }

  /**
   * Handles the scroll event to add sticky class to sidebar
   */
  handleScrolling = () => {
    const { parent: { current: parent }, container: { current: container } } = this.props;
    if (this.sidebar.current && parent && container) {
      const { settings } = config;
      const rect = this.sidebar.current.getBoundingClientRect();
      const elementHeight = parent.clientHeight;
      const elementOffset = parent.offsetTop;
      const parentElement = this.sidebar.current.children[0];
      const stickyElement = this.sidebar.current.children[0].children[0];
      const stickyElementHeight = this.sidebar.current.children[0].children[0].clientHeight;
      const contentHeight = container.clientHeight;
      const scrollPos = getScrollTop();
      if (contentHeight > stickyElementHeight) {
        if (rect.top <= settings.stickyOffset) {
          const parentWidth = parentElement.clientWidth;
          stickyElement.style.width = `${parentWidth}px`;
          this.sidebar.current.classList.add(Styles.sticky);
        } else {
          stickyElement.style.width = 'auto';
          this.sidebar.current.classList.remove(Styles.sticky);
        }
        if (scrollPos
          >= ((elementHeight + elementOffset) - (stickyElementHeight + settings.stickyOffset))
          && rect.top <= settings.stickyOffset
        ) {
          this.sidebar.current.classList.add(Styles.absolute);
        } else {
          this.sidebar.current.classList.remove(Styles.absolute);
        }
      }
    }
  };

  /**
   * Render a Search Sidebar
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    return (
      <aside
        ref={this.sidebar}
        className={classnames('col-md-5', 'col-lg-4', Styles.sidebar)}
        data-element-name="search-page-sidebar"
      >
        <div className={Styles.sidebarWrapper}>
          <div className={Styles.content}>
            {children}
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
  parent: PropTypes.any,
  container: PropTypes.any,
};

export default Sidebar;
