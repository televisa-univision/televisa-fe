import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import {
  getUniqKey, camelCase,
} from '@univision/fe-commons/dist/utils/helpers';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Button from '@univision/shared-components/dist/components/v2/Button';
import CoreSlider from '@univision/fe-components-base/dist/components/CoreSlider';

import standingsMapping from '../../Standings/StandingsLayout/StandingsMapping';
import GroupPhaseArrow from './GroupPhaseArrow';
import Styles from './GroupPhase.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const TitleStyled = styled.div`${Styles.title}`;
const CardWrapper = styled.div`${Styles.carWrapper}`;
const CardStyled = styled.div`${Styles.card}`;
const ButtonStyled = styled(Button)`${Styles.navButton}`;
const NavStyled = styled.div`${Styles.nav}`;
const OneCardStyled = styled.div`${Styles.oneCard}`;
const MobileSlider = styled(CoreSlider)`${Styles.mobileSlier}`;
const SliderStyled = styled(CoreSlider)`${Styles.slider}`;
const SliderGlobalStyled = Styles.global;

/**
 * GroupPhase component wrapper
 * @returns {?JSX}
 */
class GroupPhase extends React.PureComponent {
  /**
   * onSwipe method
   */
  static onSwipe() {
    const state = Store.getState();
    WidgetTracker.track(WidgetTracker.events.engagement, {
      target:
        deviceSelector(state) === 'mobile'
          ? 'brackets-group-phase-swipe-mobile'
          : 'brackets-group-phase-scroll-desktop',
    });
  }

  /**
   * Sets the center padding for core slider
   * @param {number} skinOffset - if there is skin
   * @returns {Object}
   */
  static slidesToShow(skinOffset) {
    const width = getKey(global, 'window.innerWidth', 0);

    let settings;
    if (width >= 1024 && width < 1280) {
      settings = 2;
    } else if (width >= 1280) {
      settings = skinOffset > 0 ? 2 : 4;
    } else {
      settings = 1;
    }

    return settings;
  }

  /**
   * bind methods and setup component
   * @param {Object} props - the component props
   * @constructor
   */
  constructor(props) {
    super(props);
    const state = Store.getState();
    this.state = {
      active: 0,
    };

    this.isMobile = deviceSelector(state) === 'mobile';
    this.timer = null;
    this.slider = React.createRef();
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.onSwipe = this.constructor.onSwipe.bind(this);
  }

  /**
   * component did update method
   */
  componentDidUpdate() {
    const { active } = this.state;
    if (this.slider.current) {
      this.slider.current.goToSlide(active);
    }
  }

  /**
   * Toggle active tab
   * @param {number} index - index number
   */
  toggleActiveTab(index) {
    const { active: newActive } = this.state;

    this.setState({
      active: index,
    });

    if (newActive === index) {
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: `Brackets-Group-Phase-${index}`,
      });
    }
  }

  /**
   * Render Method
   * @returns {JSX}
   */
  render() {
    const { active } = this.state;
    const {
      data, leagueId, skinOffset, isTudn,
    } = this.props;
    const innerWidth = getKey(global, 'window.innerWidth', 0);
    if (!isValidArray(data.sections)) {
      return null;
    }
    const isGroupStandings = isValidArray(data.sections) && data.sections.length > 1;
    const sliderProps = {
      settings: {
        dots: false,
        infinite: false,
        lazyLoad: false,
        vertical: false,
        variableWidth: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: <GroupPhaseArrow type="nav" isTudn={isTudn} />,
        nextArrow: <GroupPhaseArrow type="nav" isRight isTudn={isTudn} />,
      },
    };
    const settings = {
      dots: false,
      slidesToScroll: 1,
      variableWidth: true,
      lazyLoad: false,
      vertical: false,
      infinite: false,
      slidesToShow: this.constructor.slidesToShow(skinOffset),
      afterChange: this.toggleActiveTab,
      onSwipe: this.constructor.onSwipe,
      prevArrow: <GroupPhaseArrow />,
      nextArrow: <GroupPhaseArrow isRight />,
      arrows: !this.isMobile,
    };
    const groupName = {
      groupA: 'A',
      groupB: 'B',
      groupC: 'C',
      groupD: 'D',
      groupE: 'E',
      groupF: 'F',
      groupG: 'G',
      groupH: 'H',
      groupI: 'I',
      groupJ: 'J',
      groupK: 'K',
      groupL: 'L',
      groupEast: 'E',
      groupWest: 'W',
    };
    const navContent = data.sections.map((card, i) => (
      <ButtonStyled
        key={getUniqKey(`tab${card.title}`)}
        type="matchNav"
        onPress={() => this.toggleActiveTab(i)}
        isActive={i === active}
      >
        {groupName[camelCase(card.title)]}
      </ButtonStyled>
    ));

    const standings = standingsMapping({
      data, showMore: true, isMobile: true, hasToolTip: false, leagueId, isTudn,
    });
    const standingsWrapper = standings.map(card => (
      <CardWrapper key={getUniqKey('card')}>
        <CardStyled>
          {card}
        </CardStyled>
      </CardWrapper>
    ));
    return (
      <Wrapper>
        {isGroupStandings && (
          <TitleStyled>
            <NavStyled
              hide={navContent.length < 5 && skinOffset < 1}
            >
              {!this.isMobile && innerWidth > 768 ? (
                navContent
              ) : (
                <MobileSlider
                  {...sliderProps}
                >
                  {navContent}
                </MobileSlider>
              )}
            </NavStyled>
          </TitleStyled>
        )}

        {isGroupStandings ? (
          <>
            {!this.isMobile && <SliderGlobalStyled />}
            <SliderStyled
              settings={settings}
              ref={this.slider}
            >
              {standingsWrapper}
            </SliderStyled>
          </>
        ) : (
          <OneCardStyled>
            {standings}
          </OneCardStyled>
        )}
      </Wrapper>
    );
  }
}

/**
 * @property {Object} data - the standings data
 * @property {number} legaueId - the league id for the competition
 * @property {number} skinOffset - offset for when there is a skin on page
 * @property {bool} isTudn - tudn theme support
 */
GroupPhase.propTypes = {
  data: PropTypes.shape({
    sections: PropTypes.array,
  }),
  leagueId: PropTypes.string,
  skinOffset: PropTypes.number,
  isTudn: PropTypes.bool,
};

GroupPhase.defaultProps = {
  data: {
    sections: [],
  },
  skinOffset: 0,
  isTudn: false,
};

export default GroupPhase;
