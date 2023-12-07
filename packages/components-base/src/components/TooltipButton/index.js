import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import Styles from './TooltipButton.scss';

import Clickable from '../Clickable';

/**
 * TooltipButton creates a sticky banner that
 */
class TooltipButton extends React.Component {
  /**
   * Set the init state and bind methods
   * @param {Object} props - The react props for this component
   */
  constructor(props) {
    super(props);

    this.toggleBox = this.toggleBox.bind(this);
    this.state = {
      open: false,
    };
  }

  /**
   * sets open state
   */
  toggleBox() {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const {
      theme,
      align,
      placement,
      overlay,
      cta,
      icon,
      children,
    } = this.props;

    const { open } = this.state;

    return (
      <div
        className={classnames(
          Styles.wrapper,
          {
            [Styles.open]: open,
            [Styles.overlay]: overlay,
          },
          Styles[align],
        )}
      >
        <div className={Styles.content}>
          <Clickable
            className={Styles.openBox}
            appearance="primary"
            onClick={this.toggleBox}
            size="small"
            label={cta}
            type="button"
            theme={theme}
            icon={icon}
            round={!open}
            iconSize="small"
            reverse
          />
          <div
            className={classnames(
              Styles.box,
              Styles[placement]
            )}
          >
            <Clickable
              className={Styles.closeBox}
              appearance="primary"
              onClick={this.toggleBox}
              size="small"
              type="button"
              theme={theme}
              icon="close"
              round={!open}
              reverse
            />
            <div className={Styles.boxContent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TooltipButton.propTypes = {
  cta: PropTypes.string,
  theme: PropTypes.object,
  align: PropTypes.string,
  placement: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string,
  overlay: PropTypes.bool,
};

TooltipButton.defaultProps = {
  cta: 'Abrir',
  theme: themes.themes.blue,
  align: 'left',
  placement: 'bottom-left',
  overlay: false,
};

export default TooltipButton;
