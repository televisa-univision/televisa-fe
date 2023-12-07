## E2E suite for regular Video pages

A Video page is powered by the Video SDK to display a video player and a playlist.
It displays ads during the video and tracks the interactions of the user.

## Use cases
#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Section.
- **Ads**: an event should be fired by the SDK when an ad is displayed
- **Performance**: an event should be fired on page load containing performance data.
- **User interaction**: should track the interactions of the user with the video player.

#### Ads
- **Video**: A video could have multiple ads, each of them should be tracked.

#### User interface
- **Video Player**: It should render a video player powered by the SDK.
- **Video Playlist**: It should render a Playlist that allows the user to change the video.
- **Share**: It should render buttons to share the video in social networks.
- **Anchor**: It should anchor the video if the user scrolls on Mobile.
