## E2E suite for Search page

The Search page is a set of results launched by a user input that query the CMS data.
It also tracks a set of search events.

## Use cases
#### User interface
- **Search Layout**: It should perform a search on home page and go to search page.
- **Search Result**: It should check the search result.

#### Tracking
- **Page View**: a page view event should be fired when the user navigates a Search page.
- **Performance**: an event should be fired on page load containing performance data.
- **User interaction**: should track the interactions of the user with the Search page.
