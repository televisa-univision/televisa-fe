## E2E suite for LiveBlog pages

A Horizontal Slideshow is an image gallery powered by the CMS, inserting advertisements based on a configurable logic.
It also fires a set of tracking events.

## Use cases
#### Ads
- **Mid ad**: An ad should be placed in the sidebar in desktop and below the gallery in mobile
- **Bot ad**: An ad should be placed below the gallery in desktop.
- **Int ad**: An ad should be placed after 3 images.
- **Ad Targeting**: All 3 types of ads should be fetched using the current slideshow's metadata

#### Tracking
- **Page View**: a page view event should be fired when the user navigates to a horizontal slideshow.
- **Advance**: an event should be fired when the user change slide.
- **Performance**: an event should be fired on page load containing performance data.
- **ComsCore**: check if ComsCore is loaded in the page.
- **Nielsen**: check if Nielsen script is loaded in the page.

#### User interface
- **Previous Arrow**: It should render a previous arrow in all the slides except the first one.
- **Next Arrow**: It should render a next arrow in all the slides.
- **Current slide**: It should render Information for the current slide
- **SlideShow Title**: It should render a title for the slideshow
- **SlideShow Description**: It should render a description for the slideshow
- **Autoplay Button**: It should render a button to enable/disable autoplay
- **Autoplay**: It should changes to a new slide if autoplay is active and 8 seconds have passed
- **Autoplay/pause**: It should disable autoplay if the user press the Pause/Play button or press an arrow
- **Stitching**: It should change the url for each slide
