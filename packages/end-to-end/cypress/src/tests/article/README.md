## E2E suite for Article (Enhancement, Infinity Scroll) pages

An article page is a set of articles powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

#### Ads
- **Main ad**: An ad should be placed between the main article.

## Use cases
#### Tracking
- **Page View**: A page view event should be fired when the user navigates to an article.
- **Scrolling**: A set of events should be fired while the user scrolls over an article.
- **Performance**: An event should be fired on page load containing performance data.
- **ComsCore**: Check if ComsCore is loaded in the page.
- **Nielsen**: Check if Nielsen script is loaded in the page.

#### User interface
- **Header**: It should render a header with navigation links.
- **Hamburger menu**: It should render a hamburger menu in the header.
- **Search form**: It should render a search form in the header.
- **Article**: It should render a set of article and check the infinity scroll.
