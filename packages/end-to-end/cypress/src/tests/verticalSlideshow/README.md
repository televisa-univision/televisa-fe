## E2E suite for Vertical Slideshow

A Vertical Slideshow is a set of images powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a Section.
- **Slide Advance**: an event should be fired when the user scrolls between slides.
- **Performance**: an event should be fired on page load containing performance data.

#### Ads
- **Top ad**: An ad should be placed bellow the slideshow title.
- **Mid ad**: An advertisement should be inserted after each slide.

#### User interface
- **Images**: An image should be rendered per each slide.
- **Ads**: An ad should be rendered per each slide.
- **Slideshow Header**: A header containing the slideshow title should be rendered.


## E2E suite for Vertical Slideshow Stitching

Some sections (like all the vertical slideshows under `/noticias/politica`)
have stitching enabled. This means that the user can keep scrolling down
after having finished going through the first slideshow. They can keep
scrolling until they go through a total of 5 slideshows, including the first one.

## Use cases

#### Tracking
- **Page View**: an event of view_slideshow should be fired for each subsequent slideshow that comes after the first one as soon as the user scrolls into it. The event should fire with slideshow_depth (corresponding to the index of the slideshow, from 1 to 5).
- **Slide Advance**: a slide_advance event should be fired every time the user scrolls between slides. This should be fired even when the user is scrolling back up to a previous slide. The event should fire with slideshow_depth (corresponding to the index of the slideshow, from 1 to 5).

#### Ads
- **Top ad**: An ad should be placed bellow the slideshow title of the first slidehsow.
- **Mid ad**: An advertisement should be inserted after each slide.
- **Targeting**: Ads on each slideshow should be retrieved by using the targeting that belongs to that specific slideshow. Targeting changes for each slideshow.
