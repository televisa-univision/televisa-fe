## Navigation Header E2E

The navigation header is composed of 6 elements:

- Branded Header: the first navbar we see. It is what has the left-most hamburger menu button, the main univision logo link, and a right-most component that varies per page.
- Mega Menu: the component that appears when the hamburger menu button is clicked. It has an in-depth menu with a lot of links to navigate around specific parts of the app.
- Global Nav: the second navbar that we see. It has the main section links for the whole app.
- Exposed Nav: the third navbar we see in section pages. It has a title link, secondary links, and a specific background for that section.
- Short Title: the third navbar element that appears on content pages. It has a link to that content's main section, and a specific background.
- Breadcrumb: the fourth navbar element that appears on content pages. It has two Breadcrumb.

## Use cases

#### User interface

- **Home Page**: the Branded Header and the Global Nav should both be present on the page. The Exposed Nav, the Short Title, and the Breadcrumb should not be present on the page.
- **Section Page**: the Branded Header, the Global Nav, and the Exposed Nav should all be present on the page. The Short Title, and the Breadcrumb should not be present on the page.
- **Content Page**: the Branded Header, the Global Nav, the Short Title, and the Breadcrumb should all be present on the page. The Exposed Nav should not be present on the page.

#### Tracking

- **Global Nav**: each of the section links should fire the required tracking event when clicked.
- **Exposed Nav**: each of the secondary links should fire the required tracking event when clicked.
