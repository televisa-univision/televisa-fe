## E2E suite for Match Center

A Match Center is powered by the CMS to display matches information.
It displays ads during the video and tracks the interactions of the user.

## Use cases
#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Match.
- **Ads**: an event should be fired by the SDK when an ad is displayed
- **Performance**: an event should be fired on page load containing performance data.
- **User interaction**: should track the interactions of the user with Match Center.

#### Ads
- **Match Center**: A Match Center page could have multiple ads, each of them should be tracked.

#### User interface
- **Match Center Classic**: Match Center Classic should display its widgets
- **Match Center Core**: Match Center Core should display its widgets
- **Match Center Performance**: Match Center Performance should display its widgets
- **Match Center Special**: Match Center Special should display its widgets
