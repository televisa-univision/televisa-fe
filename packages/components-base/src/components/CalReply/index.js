import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { loadExternalScript } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './CalReply.styles';

const Container = styled.div`
  ${Styles.calReply}
`;

/**
 * Wrapper for the CalReply component
 */
class CalReply extends Component {
  state = {
    isOpen: false,
  };

  /**
   * Loads the external script
   */
  componentDidMount() {
    const { code } = this.props;

    const params = {
      id: 'calreply-script',
      text: code,
    };

    if (code) {
      loadExternalScript(params);
    }
  }

  /**
   * on toggle click event
   * @param {Object} event result event
   */
  toggleTracking = (event) => {
    event.preventDefault();
    const { promoNameText } = this.props;
    NavigationTracker.track(NavigationTracker.events.link, { type: 'calreply', text: localization.get('notifyMe') + promoNameText }, null);
  }

  /**
   * Renders the button
   * @returns {JSX}
   */
  renderButton() {
    const {
      forceMobileView,
      hasBackgroundImage,
      hasCalReplyOnly,
      className,
      href,
      showTextButton,
      promoNameText,
    } = this.props;
    const { isOpen } = this.state;
    return (
      <Container
        className={className}
        isOpen={isOpen}
        forceMobileView={forceMobileView}
        hasBackgroundImage={hasBackgroundImage}
        hasCalReplyOnly={hasCalReplyOnly}
      >
        <a
          title="calReply"
          href={href}
          onClick={this.toggleTracking}
          data-popup="lightbox"
          data-type="custombutton"
          data-calreply-binding="true"
        >
          <Icon name="notifyMe" size="small" />
          {showTextButton
            && <span>{promoNameText || localization.get('notifyMe')}</span>
          }
        </a>
      </Container>
    );
  }

  /**
   * React render
   * @returns {JSX}
   */
  render() {
    const { href, code } = this.props;
    const canRender = href && code;
    // Won't render if the link and script are null
    return canRender ? this.renderButton() : null;
  }
}

CalReply.propTypes = {
  forceMobileView: PropTypes.bool,
  hasBackgroundImage: PropTypes.bool,
  hasCalReplyOnly: PropTypes.bool,
  className: PropTypes.string,
  code: PropTypes.string,
  href: PropTypes.string,
  showTextButton: PropTypes.bool,
  promoNameText: PropTypes.string,
};

CalReply.defaultProps = {
  showTextButton: true,
  promoNameText: '',
};

export default CalReply;
