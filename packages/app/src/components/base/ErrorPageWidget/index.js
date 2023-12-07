import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import fetch from '@univision/fe-commons/dist/utils/fetch';

import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import Styles from './ErrorPageWidget.styles';

const ContainerStyled = styled.div`${Styles.container}`;

/**
 * Container component representing a Section page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
class ErrorPageWidget extends Component {
  /**
   * Constructor
   * @param {Object} props passed to component
   */
  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
    };
  }

  /**
   * Fetches page widgets on mount
   */
  componentDidMount() {
    this.fetchPageWidgets();
  }

  /**
   * Fetches page widgets
   * @param {array} widgets to be rendered on page
   */
  async fetchPageWidgets() {
    const { pageData } = this.props;
    try {
      const data = await fetch(pageData.config.syndicator.content, {
        params: {
          url: 'https://www.univision.com/status-404-error',
        },
      });
      const widgetsFactory = new WidgetsFactory(data);
      this.setState({
        widgets: widgetsFactory.parseWidgets(),
      });
    } catch (err) {
      // Unable to load widgets
      // TODO: add logger
    }
  }

  /**
   * Renders ErrorPageWidgets
   * @returns {JSX}
   */
  render() {
    const { widgets } = this.state;
    if (!isValidArray(widgets)) return null;

    return (
      <ContainerStyled className="col-12">
        { widgets }
      </ContainerStyled>
    );
  }
}

ErrorPageWidget.propTypes = {
  pageData: PropTypes.shape({
    config: PropTypes.shape({
      syndicator: PropTypes.shape({
        content: PropTypes.string,
      }),
    }),
  }),
};

export default ErrorPageWidget;
