## E2E suite for Leagues

A league is a set of feeds powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Ads
- **Main ad**: An ad should be placed between the main widget.

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a league page.
- **Performance**: an event should be fired on page load containing performance data.
- **ComsCore**: check if ComsCore is loaded in the page.
- **Nielsen**: check if Nielsen script is loaded in the page.

#### User interface
- **Header**: It should render an specific Header with navigation links based on leage coverage.
- **Widgets**: It should render the right widgets based on the league coverage.
- **Navigation**: It should hightlight the current section within the league
