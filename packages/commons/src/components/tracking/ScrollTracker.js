import React, { Component } from 'react';
import PropTypes from 'prop-types';

import throttle from 'lodash.throttle';

import { hasKey, isInArray, isValidArray } from '../../utils/helpers';

/**
 * Tracks the position of {@link ScrollTracker#node} while the user scrolls through the window.
 * This component provides two callbacks:
 * - onHalfScroll: triggered when the user has scrolled until half height of the node
 * - onFullScroll: triggered when the user has scrolled until the last element in the node
 * @access public
 * @extends {React.Component}
 */
class ScrollTracker extends Component {
  /**
   * Returns true if a milestone has been reached by the user.
   * A milestone is reached if it is in the middle of the viewport, except for the 100% milestone.
   * The 100% milestone is reached as soon as the user
   * is able to see the bottom of the tracked element.
   * @param {number} milestone Milestone to check if has been reached
   * @param {Object} bodyBounds TrackedObject.getBoundingClientRect()
   * @returns {boolean}
   */
  static milestoneHasBeenReached(milestone, bodyBounds) {
    // Milestones are reached when they are in the middle of the viewport
    // The 100% milestone is reached if the user is able to see the bottom of the page
    const offsetFactor = milestone === 100 ? 1 : 0.5;
    const offset = window.innerHeight * offsetFactor;
    const currentPosition = bodyBounds.bottom - bodyBounds.height - offset;
    const scrollingPercentage = Math.floor((currentPosition / bodyBounds.height) * 100 * -1);

    return scrollingPercentage >= milestone;
  }

  /**
   * Component constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    // Throttle to give enough time for the lazy loading
    this.throttleDelay = 1000;
    // Milestones which have been tracked so far
    this.trackedMilestones = {
      [props.scrollKey]: [],
    };
    this.throttleHandleScroll = throttle(this.handleScroll, this.throttleDelay).bind(this);

    this.node = React.createRef();
  }

  /**
   * Adds the scroll listener.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.throttleHandleScroll);
  }

  /**
   * Removes the scroll listener.
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleHandleScroll);
  }

  /**
   * Tracks the scroll to determine which milestones have been reached by the user.
   * The tracked milestones are in this.props.milestones.
   */
  handleScroll() {
    const { milestones, onMilestone, scrollKey } = this.props;

    if (!isValidArray(this.trackedMilestones[scrollKey])) {
      this.trackedMilestones[scrollKey] = [];
    }

    // This component can not work with empty elements
    if (hasKey(this, 'node.current.firstChild.lastElementChild') && onMilestone) {
      const bodyBounds = this.node.current.getBoundingClientRect();
      const milestonesReached = [];

      milestones.forEach((milestone) => {
        if (
          !isInArray(milestone, this.trackedMilestones[scrollKey])
          && ScrollTracker.milestoneHasBeenReached(milestone, bodyBounds)
        ) {
          // Track the milestone
          this.trackedMilestones[scrollKey].push(milestone);
          milestonesReached.push(milestone);
        }
      });

      // Triggering milestones
      if (milestonesReached.length > 0) {
        onMilestone(milestonesReached, this.node.current);
      }

      // Remove listener if all milestones have been tracked
      if (this.trackedMilestones[scrollKey].length === milestones.length) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * Render empty div
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;
    return (
      <div
        ref={this.node}
      >
        {children}
      </div>
    );
  }
}

ScrollTracker.propTypes = {
  children: PropTypes.node.isRequired,
  onMilestone: PropTypes.func.isRequired,
  milestones: PropTypes.array,
  scrollKey: PropTypes.string,
};

/**
 * Default props
 */
ScrollTracker.defaultProps = {
  milestones: [25, 50, 75, 100],
  scrollKey: 'default',
};

export default ScrollTracker;
