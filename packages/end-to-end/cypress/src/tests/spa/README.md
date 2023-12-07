## E2E suite for SPA sitee

Test suite to check the behavior and the loaded resources that
interacts in hard and soft nav for SPA site mode.

## Use cases
### Hard nav
#### Advertising
- **Main ad**: should have and load ad widget in the page

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a shoe page.
- **Performance**: an event should be fired on page load containing performance data.
- **ComsCore**: check if ComsCore is loaded in the page.
- **Nielsen**: check if Nielsen script is loaded in the page.

### Soft Nav
- **Page Transition**: navigation through the Global Nav.
- **Request**: check the request status for the CMS data.
- **Theme**: check the theme for CMS data.
- **Tracking**: check the tracking for each page transition.
- **Advertising**: check the advertising for each page transition.
- **Elements**: check for elements loaded for each page transition.
