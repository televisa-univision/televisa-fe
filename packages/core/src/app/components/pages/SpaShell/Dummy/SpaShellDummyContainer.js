import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Container to handle the dummy spa shell
 */
class SpaShellDummyContainer extends PureComponent {
  /**
   * Allow to dispatch actions after component mount on client
   */
  componentDidMount() {
    const { fetchPageData, uri } = this.props;
    fetchPageData(uri);
  }

  /**
   * Dispatch action on click
   * @param {string} uri for page to fetch
   * @returns {Function}
   */
  clickHandler = uri => () => {
    const { fetchPageData } = this.props;
    fetchPageData(uri);
  }

  /**
   * Render menu item
   * @param {string} uri for menu item
   * @returns {JSX}
   */
  renderMenuItem(uri) {
    return (
      <li>
        <button onClick={this.clickHandler(uri)}>
          <u>{`Fetch "${uri}" content`}</u>
        </button>
      </li>
    );
  }

  /**
   * Render menu
   * @returns {JSX}
   */
  renderMenu() {
    return (
      <ul>
        {this.renderMenuItem('/')}
        {this.renderMenuItem('/shows')}
        {this.renderMenuItem('/famosos')}
        {this.renderMenuItem('/noticias')}
        {this.renderMenuItem('/noticias/inmigracion')}
        {this.renderMenuItem('/deportes')}
        {this.renderMenuItem('/radio')}
        {this.renderMenuItem('/delicioso')}
        {this.renderMenuItem('/wrongurl')}
      </ul>
    );
  }

  /**
   * Render component
   * @returns {JSX}
   */
  render() {
    const { page } = this.props;
    return (
      <div>
        {this.renderMenu()}
        <p>{page.loading ? '⧖ Loading...' : '✓ Loaded'}</p>
        <p>{page.error ? `✘ Error: ${page.error.message}` : null}</p>
        <hr />
        <h1>{page.data?.title}</h1>
        <h4>{page.data?.description}</h4>
      </div>
    );
  }
}

SpaShellDummyContainer.propTypes = {
  page: PropTypes.object,
  fetchPageData: PropTypes.func,
  uri: PropTypes.string,
};

export default SpaShellDummyContainer;
