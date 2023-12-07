## E2E suite for 404 Error page

A 404 error page is a set of widgets powered by the CMS, It also fires a set of tracking events.

## Use cases
#### Tracking
- **Page View**: A page view event should be fired when the user load a 404 error page.
- **Performance**: An event should be fired on page load containing performance data.
- **ComsCore**: Check if ComsCore is loaded in the page.

#### User interface
- **Error Request**: It should check the widget request to the CMS.
- **Header**: It should render a header with navigation links.
- **Hamburger menu**: It should render a hamburger menu in the header.
- **Search form**: It should render a search form in the header.
- **Widget Lead**: It should render a widget lead.
- **Addional widgets**: It should render a set of additional widgets.
