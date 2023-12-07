## E2E suite for locales Section pages

A locales Section is a set of widgets powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Section.
- **Scrolling**: a set of events should be fired while the user scrolls over a Section.
- **Performance**: an event should be fired on page load containing performance data.
- **Widgets interaction**: some widgets track the interaction of the user.

#### Ads
- **Top ad**: An ad should be placed bellow the widget lead.
- **Mid ad**: Two advertisements should be inserted in designated slots.

#### User interface
- **Header**: It should render a Header with the Logo and navigation links.
- **Sticky Header**: It should render a Header with the Logo and navigation links.
- **Weather Information**: It should render the current weather conditions inside the header.
- **TV Local NOW**: It should render a link to TV Local NOW.
- **Hamburger menu**: It should render a hamburger menu in the Header.
- **Widgets**: It should render a set of Widgets.
