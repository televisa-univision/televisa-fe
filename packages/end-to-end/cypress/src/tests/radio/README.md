## E2E suite for radio pages

A radio page is a set of widgets powered by the CMS and an API
(abacast) to contains the data related to the radio station.

For now we are unsing a queryString param `pipRadio=true` to enabled the radio PIP!

#### Ads
- **Main ad**: An ad should load in radio page.

## Use cases
#### Tracking
- **Page View**: A page view event should be fired when the user navigates to a widget.
- **Performance**: An event should be fired on page load containing performance data.
- **ComsCore**: Check if ComsCore is loaded in the page.
- **Nielsen**: Check if Nielsen script is loaded in the page.

#### Player
- **Radio Requests**: It should check if the request (abacast) is called when the page is loaded.
- **Player**: It should check all the behavior for the jwplayer on SPA radio pages.
- **Tracking**: `engagement` event is fired when the sticky radio player is showing on the page.
- **Full Page**: It check the full and stiky mode for the radio player.
- **Mute**: It check the mute and unmute behavior on radio player.
- **Play/Pause**: It check the pause and play behavior on the radio player.
- **Sticky**: It cheeck the behavior for open/close the radio player even on SPA transitions.
