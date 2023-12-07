## E2E suite for LiveBlog pages

A LiveBlog is a set of feeds powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Ads
- **Main ad**: An ad should be placed between the main widget.

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a LiveBlog.
- **Performance**: an event should be fired on page load containing performance data.
- **ComsCore**: check if ComsCore is loaded in the page.
- **Nielsen**: check if Nielsen script is loaded in the page.

#### User interface
- **Header**: It should render a Header with navigation links.
- **Hamburger menu**: It should render a hamburger menu in the Header.
- **Search form**: It should render a Search form in the Header.
- **LiveBlog**: It should render opening, feeds and pagination requests for the LiveBlog.
