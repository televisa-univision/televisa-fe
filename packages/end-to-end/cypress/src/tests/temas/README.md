## E2E suite for Temas pages

A Temas page is a set of widgets powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Section.
- **Performance**: an event should be fired on page load containing performance data.

#### Ads
- **Top ad**: An ad should be placed bellow the widget lead.
- **Mid ad**: On mobile, there should be 2 mid ads. On Desktop there should be one.

#### User interface
- **Header**: It should render a Header with the Logo and navigation links.
- **Footer**: It should render a Footer with a set of links.
- **Hamburger menu**: It should render a hamburger menu in the Header.
- **Search form**: It should render a Search form in the Header.
- **Widgets**: It should render a set of Widgets.
