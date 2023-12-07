# SPA transition measures

This implementation allow to get custom performance informacion for the SPA transition
by Univision webapp based on SpeedCurve LUX and User timing.

## How to enable
The monitoring is off by default, to test it `locally` please update your `.env` file to add/update the
variable `SPA_MONITORING_ENABLED=true`. To enable it in another environment, please update the Helm values for
that environment to add/update the variable `SPA_MONITORING_ENABLED=true`.

## Description

The implementation uses `mutationObserver` to collect information about the changes over
the DOM and also uses a `performanceObserver` to get information for the resources
loaded in the page for each SPA transition, additionally creates a custom event that
handles the changes over the `window.history.pushState`. When this event is fired starts
the data collection through the observers and then uses a setTimeout that start the
store the measures in the SpeedCurve LUX custom Data and performance User Timing.

#References

- [SpeedCurve Real User Monitoring: LUX](https://speedcurve.com/features/lux/)
- [SpeedCurve LUX API](https://support.speedcurve.com/en/articles/867066-lux-api)
- [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)
- [MutationObserver](https://developer.mozilla.org/es/docs/Web/API/MutationObserver)
- [PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
- [Using the Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)
- [Assessing Loading Performance in Real Life with Navigation and Resource Timing](https://developers.google.com/web/fundamentals/performance/navigation-and-resource-timing/)
- [Measuring Real User Performance in the Browser](https://www.slideshare.net/nicjansma/measuring-real-user-performance-in-the-browser)
