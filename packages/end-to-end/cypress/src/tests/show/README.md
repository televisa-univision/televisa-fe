## E2E suite for show pages

A show page is a set of feeds powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Ads
- **Main ad**: An ad should be placed at the bottom of the main widget.

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a shoe page.
- **Performance**: an event should be fired on page load containing performance data.
- **ComsCore**: check if ComsCore is loaded in the page.
- **Nielsen**: check if Nielsen script is loaded in the page.

#### User interface
- **Show Layout**: It should validate the page loads with the main components.
- **Shows Tabs**: It should validate the tabs behavior.
