# Rubicon Prebid + Amazon TAM, Parallel Integration for Display Ads
###### Technical Documentation

---

## Purpose
This document outlines the Rubicon Prebid and Amazon TAM parallel auctions integration. The goal is to replace Index Exchange with parallel auctions using Rubicon and Amazon.

Logic for Display Ads exists in various parts of the app; however, the vendors used and what ad sizes are sent out for header bidding (auction) are in a centralized place, 
located at `packages/commons/src/utils/ads/`. The main entry point for React components is `dfpManager.registerSlot()`. This function coordinates lazy-loading the 
3rd party scripts, setting up object properties required for Amazon and the app, sending biddable ads to the parallel auction (Amazon + Rubicon), and displaying the ad. 
Google Publisher Tag (GPT) code takes care of rendering the ad in each `<div>` ad slot. This document will specify how all this works.

## Stand-Alone Sample Parallel Integration App
https://github.com/univision/amazon-rubicon-parallel-integration

This sample app will provide the basic building blocks for understanding how Amazon and Rubicon Prebid work in conjunction with GPT. Taking time to walk through the code 
and experimenting with scenarios can help with understanding how it all works.

We’ve attempted to add clear comments to explain how header bidding and ad rendering works, but since the code has lots of separation, it is not always clear what 
is happening. This document as well as the sample app should provide some clarification. In fact, it was easier to create the sample app to understand how bidding and 
ads worked together before attempting to update the app. The app required some significant refactoring, so creating the sample app was the best way to understand how to 
make the changes.

## Definition of Terms

| Term           | Definition                                                                                                                                                                                                     |
|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GAM            | Google Ad Manager, the ad server that serves up display and video ads for our sites                                                                                                                            |
| GPT            | Google Publisher Tag. 1) 3rd party script loaded to render ads registered in Google Ad Manager. 2) The piece of code that contains the Google “ad slot” and is displayed on the page defined by the developer. |
| Amazon TAM     | An auction platform.                                                                                                                                                                                           |
| Rubicon Prebid | An auction platform. Their product is called Prebid.js or PBJS for short.                                                                                                                                      |
| Display Ad     | A static image ad displayed between or within content on the site. It is usually labeled with the word “ADVERTISEMENT” or “PUBLICIDAD”.                                                                        |
| Index Exchange | Closed-source bidding system                                                                                                                                                                                                            |

## Univision FE Display Ad Workflow
#### 1) Lazy-Load 3rd party scripts:

These scripts are loaded using a `Promise.all()`, so all scripts are available at the same time. The following are specific to Amazon + Rubicon requirements.

  - Google Publisher Tag (GPT) - `packages/commons/src/utils/ads/vendors/dfpLoader.js`
  - Amazon - `packages/commons/src/utils/ads/vendors/amzLoader.js`
  - Rubicon Prebid, hosted version - `packages/commons/src/utils/ads/vendors/rubiconLoader.js`

#### 2) Register window objects
    
##### Rubicon Prebid (PBJS)

```
window.pbjs = window.pbjs || {};
window.pbjs.que = window.pbjs.que || [];
```

##### GPT
```
window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];
```

##### Amazon
``` 
function(a9, a, p, s, t, A, g) {
 if (a[a9]) return;

 function q(c, r) { a[a9]._Q.push([c, r]) }
 a[a9] = {
   init: function() { q("i", arguments) },
   fetchBids: function() { q("f", arguments) },
   setDisplayBids: function() {},
   _Q: []
 };
 A = p.createElement(s);
 A.async = !0;
 A.src = t;
 g = p.getElementsByTagName(s)[0];
 g.parentNode.insertBefore(A, g);
}("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js");
```

#### 3) Initialize Global Settings

##### Amazon
```
window.apstag.init({
 pubID: '3087',
 adServer: 'googletag',
});
```

##### GPT
Reference: https://developers.google.com/doubleclick-gpt/reference  
Implementation: `packages/commons/src/utils/ads/dfpManager.js` → `gptInit()`

This function is added to the `window.googletag.cmd` array via `dfpManager.preFetchAds()`. All functions added to the  cmd array are asynchronously 
called once the GPT script is completely loaded.

An example of a stand-alone implementation is listed below:
```
// functions pushed into cmd array are called async after GPT script is loaded
window.googletag.cmd.push(function() {
 // Enables single request mode for fetching multiple ads at the same time
 window.googletag.pubads().enableSingleRequest();
 // Disables requests for ads on page load, but allows ads
 // to be requested with a googletag.pubads().refresh() call
 window.googletag.pubads().disableInitialLoad();
 // Enables all GPT services that have been defined for ad slots on the page
 window.googletag.enableServices();
});
```

##### Rubicon (hosted version)
No settings required for hosted version. These are managed by the Ad Ops team and Rubicon via external configuration. We just load the specific script for 
the target deployment environment. See `packages/commons/src/utils/ads/vendors/rubiconLoader.js`.

#### 4) Determine if an ad is biddable
Technically, all ad sizes can go through Rubicon, since it will recognize that custom sizes are not biddable and just call GPT to render the ad. 
However, it is unknown how this works with Amazon. It is safer to determine which sizes are custom and can’t be bid on. To make this determination, 
we set a biddable flag on each ad size in `packages/commons/src/utils/ads/adSettings.json`. Any 1x2, 1x3, etc., ad sizes are custom sizes that can’t be 
sent to auction because they are non-standard sizes. This includes skin ads. 

When this *biddable* flag is off, we just call the normal GPT scripts to render the ad in the defined ad slot. When the flag is on, we send the ad to the parallel auction. 
The callback responses for both auctions do not contain the ad content to be rendered. Instead, GPT knows the winning bid, so displaying the ad slot like normal 
will fetch the winning ad from GPT and render it in the ad slot. Therefore, in both scenarios, biddable ads and custom ads, are rendered the same way.

#### 5) Run Parallel Auctions
The coordination of parallel auctions takes place in `packages/commons/src/utils/ads/dfpManager.js`. All code references from this point forward are from this file.

If an ad is biddable, it is sent to the parallel auctions. There is a failsafe timeout, which will facilitate rendering an ad when one or more auctions don’t 
complete on time. The failsafe timeout will always fire when complete, so we check to make sure that the server request has already completed so we don’t send 
another request.

Ideally, both auctions will complete within the allotted time before we hit the failsafe. We need to keep track of each auction and flag it as completed. 
To do this, we create an object and set each auction source to false.

The following code is in the `preFetchAds()` function.

```
// flags to make sure amazon and rubicon auctions have both completed
// if not both finished, failsafe timeout will kick in anyway
// another flag to say the server request has been sent already so the failsafe doesn't call it again
const bidRequestStatus = {
 amazon: false,
 rubicon: false,
 serverRequestSent: false,
};
```

Next, we need a way of calling the ad server and rendering the ad after the parallel auctions are completed. In addition, we need to make sure that calling the 
server only happens once. To do this, we keep track of the state of the server request. This happens inside the callbacks of both auctions. The full code is listed later.

```
// for Amazon ...
bidRequestStatus.amazon = true;
if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
  bidRequestStatus.serverRequestSent = true;
  // call GPT to fetch the ad
}

// for Rubicon ...
bidRequestStatus.rubicon = true;
if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
  bidRequestStatus.serverRequestSent = true;
  // call GPT to fetch the ad
}
```

A failsafe timeout is required so that we can render an ad even if the auctions don’t complete on time. Stated previously, GPT knows the winning bid of all auctions. 
So, if only one auction completes, or no auction completes, firing the failsafe will make sure that ads can be rendered. This failsafe timeout always fires. 
We make sure the state variable is not set, allowing the server request to only go out once.

```
// failsafe timeout in case amazon and prebid don't finish
setTimeout(() => {
 if (!bidRequestStatus.serverRequestSent) {
   // call GPT to fetch the ad
 }
}, 2000);
```

Next, we run both auctions, and flag each `bidRequestStatus` when the auction callback is fired. In the callback, we check to see if both auctions have completed. 
If so, we make the ad server request. Code comments explain the implementation. We are using Rubicon hosted version, so the code is different from their examples.

```
/** Run auctions: amazon + rubicon */
// fetch amazon bids async, assume amazon script is loaded
// pass 'ad' object in array, not the slot. Amazon uses specific
// properties for their auction - 'slotName', 'slotId', etc
// need to be array, even though we are only bidding on one ad at a time
window.apstag.fetchBids({
  slots: [ad],
  timeout: 1500,
}, () => {
  // in the callback function, see if both bids have completed
  bidRequestStatus.amazon = true;
  if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
    bidRequestStatus.serverRequestSent = true;
    this.processAd(ad, slot, true);
  }
});

// fetch rubicon bids async, assume rubicon script is loaded
window.pbjs.que.push(() => {
  // 'rp' is for rubicon hosted solution, and uses a different implementation
  window.pbjs.rp.requestBids({
    // in hosted PBJS, 'callback' is the correct function to use
    // do not use 'bidsBackHandler', which is for normal PBJS
    callback: () => {
      // in the callback function, see if both bids have completed
      bidRequestStatus.rubicon = true;
      if (bidRequestStatus.amazon && bidRequestStatus.rubicon) {
        bidRequestStatus.serverRequestSent = true;
        this.processAd(ad, slot, true);
      }
    },
    // for hosted solution, pass GPT slots to auction
    gptSlotObjects: [slot],
  });
});
```

In the auction code, you likely noticed that we are passing an array; for Amazon, an array of objects, for Rubicon, an array of GPT slots. This is because we can 
send multiple ads to one auction. But in our implementation, we want to send each ad to its own individual auction.

#### 6) Overview of Rendering an Ad
We use the GPT library to take care of defining ad slots and rendering ads. GPT settings are configured in `gptInit()`. First, we want to prevent auto-rendering of ads 
when we define an ad slot. This is because we want to send ads out for auction and render later. We are also lazy-loading ads, so we want to turn on the async 
rendering feature. See specific configuration settings in section 3 above or the `gptInit()` function.

#### 7) Defining an Ad Slot
We use GPT to define an ad slot based on `<div>` ID. This just registers the div as the ad slot, but does not perform rendering. To define a slot, 
call `window.googletag.defineSlot(<ad name>, <[sizes]>, <div’s id>).addService(window.googletag.pubads());`. See the `defineSlot()` function.

#### 8) Rendering the ad slot placeholder
Now that the ad slot is defined, we want to tell the HTML code to create a placeholder for the ad, called the ad slot. We do this by 
calling `window.googletag.display(slotId);`. We can either pass a `<div>` ID or the GPT ad slot object. Our code is passing the GPT ad slot object. 
See the `displayAds()` function.

#### 9) Rendering the actual ad
Since we are lazy-loading ad slots and waiting for auctions to finish, we have disabled ad rendering on page load. Therefore, we need to use GPT’s `refresh()` feature. 
This seems strange because it sounds like we are requesting a new ad, but we are not at this point. The `refresh()` function can refresh all ads or it can take an 
array of specific GPT ad slots to refresh. See the sample app to see how refreshing an ad works or see the `processAd()` function. The following is an example of 
rendering an ad in the `processAd()` function.

```
// pushes function into cmd array for async processing
window.googletag.cmd.push(() => {
 // turn on bidding for Amazon
 if (isAuction && typeof window.apstag !== 'undefined')) {
   window.apstag.setDisplayBids();
 }
 // 'refresh' renders the ad on the page in the <div> ad slot already defined
 // using GPT slot definition. it will render winning auction ad, or normal ad
 window.googletag.pubads().refresh([slot]);
});
```

#### 10) Wrap-up
As you can see, we use GPT to process all ad-related features. The auctions run independently and tell Google Ad Manager (GAM) who the winning bidder is. 
Rendering the ad via GPT will tell the ad server (GAM) to serve up the winning ad. We don’t have to worry about keeping track of this information in our code. 
Rubicon hosted version also keeps configuration out of the hands of developers, including auction timeouts, etc. This makes it easier for the Ad Ops team to change 
things up without a deployment lifecycle.

