import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@univision/fe-components-base/dist/components/Button';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import {
  LIGHT_VARIANT,
} from '@univision/fe-utilities/styled/constants';

import Styles from './VideoTabs.styles';

const WrapperStyled = styled.div`${Styles.wrapper}`;
const TabWrappperStyled = styled.span`${Styles.tabWrapper}`;
const ButtonStyled = styled(Button)`${Styles.tab}`;

/**
 * Tabs for video playlist component
 * @param {Object} props - react component props
 * @param {number} [props.activeTab] - 0-index based of activeTab
 * @param {string} [props.className] - modifier class name
 * @param {string} props.mainTabLabel - main tab label from API widget settings
 * @param {Object[]} [props.otherTabs] - additional tabs data, by default we
 * take just the first as secodn by default
 * @param {function} [props.onClick] - click event callback handler
 * @param {Object} props.theme - page/widget theme definition
 * @param {string} props.variant - name of theme variant
 * @returns {JSX}
 */
function VideoTabs({
  activeTab,
  className,
  mainTabLabel,
  otherTabs,
  onClick,
  theme,
  variant,
}) {
  const [secondTab] = otherTabs;
  const tabs = [mainTabLabel, secondTab?.label];

  /**
   * Tab on click handler to send tab index to parent
   * @param {Object} event - javascript click event
   */
  function onClickHandler(event) {
    const { currentTarget } = event;
    const dataTab = currentTarget?.parentNode?.getAttribute('data-tab');
    const tabIndex = parseInt(dataTab || 0, 10);

    if (isValidFunction(onClick)) {
      onClick(event.nativeEvent, tabIndex);
    }
  }

  /**
   * Tab on click handler to send tab index to parent
   * @param {string} tabLabel - name of the tab to render
   * @param {number} index - tab index position
   * @returns {JSX}
   */
  function getTab(tabLabel, index) {
    const key = `tab-${tabLabel}${index}`;
    if (!tabLabel) {
      return null;
    }
    return (
      <TabWrappperStyled data-tab={index} key={key}>
        <ButtonStyled
          isActive={activeTab === index}
          onClick={onClickHandler}
          theme={theme}
          variant={variant}
        >
          {tabLabel}
        </ButtonStyled>
      </TabWrappperStyled>
    );
  }

  return (
    <WrapperStyled className={className}>
      {tabs.map(getTab)}
    </WrapperStyled>
  );
}

VideoTabs.propTypes = {
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  mainTabLabel: PropTypes.string,
  otherTabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
  })),
  onClick: PropTypes.func,
  theme: PropTypes.object,
  variant: PropTypes.string,
};

VideoTabs.defaultProps = {
  variant: LIGHT_VARIANT,
};

export default VideoTabs;
