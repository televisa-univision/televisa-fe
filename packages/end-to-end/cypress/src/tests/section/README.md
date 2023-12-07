## E2E suite for regular Section pages

A regular Section is a set of widgets powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Section.
- **Scrolling**: a set of events should be fired while the user scrolls over a Section.
- **Performance**: an event should be fired on page load containing performance data.
- **Widgets interaction**: some widgets track the interaction of the user.

#### Ads
- **Top ad**: An ad should be placed bellow the widget lead.
- **Mid ad**: An advertisement should be inserted each 3 widgets.

#### User interface
- **Header**: It should render a Header with the Logo and navigation links.
- **Footer**: It should render a Footer with a set of links.
- **Hamburger menu**: It should render a hamburger menu in the Header.
- **Search form**: It should render a Search form in the Header.
- **Widgets**: It should render a set of Widgets.
