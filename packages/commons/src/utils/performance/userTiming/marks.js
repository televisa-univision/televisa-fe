/* Marks and measures time it takes between page
transitions, also represent the reference start time for
the custom additional metrics for Soft and hard Navigation.
Triggered before and after each page load */
export const PAGE_TRANSITION = 'transition';

/* Marks when HEAD stylesheets are done loading
and are therefore no longer blocking the DOM */
export const HEAD_STYLESHEETS_BLOCKING = 'stylesheets_blocking_head';

/* Marks when HEAD scripts are done loading
and are therefore no longer blocking the DOM */
export const HEAD_SCRIPTS_BLOCKING = 'scripts_blocking_head';

/* Mark the CMS request time */
export const REQUEST_CMS = 'request_cms';

/* Marks when an item has been rendered to the DOM */
export const ARTICLE_RENDERED = 'article_rendered';
export const HEADER_RENDERED = 'header_rendered';
export const SECTION_RENDERED = 'section_rendered';
export const WIDGETS_RENDERED = 'widgets_rendered';

/* Custom measures based on Mutation observer
 and performance resources timing */

/* Defines the measure time that content fetch request
 is complete when a SPA transition is performed. */
export const TIME_TO_FIRST_BYTE = 'time_to_first_byte';

/* Defines the measure time for all the DOM interactions
 generated between the SPA transitions (If all the DOM
 interactions are not finished when the control timer
 callback is fiired, defines the last DOM interaction
 registered by mutationObserver like the last interaction). */
export const DOM_CONTENT_LOADED = 'dom_content_Loaded';

/* Defines the measure time between the reference start time
 (SPA transition) and the time registered for the minimal amount
 of DOM elements registered by the MutationObserver callback */
export const READY_TO_PAINT = 'ready_to_paint';

/* Defines the measure time between the reference start time
 (SPA transition) and the next time registered by the
 `READY_TO_PAINT` time */
export const FIRST_PAINT = 'first_paint';

/* Defines the measure time between the reference start time
 (SPA transition) and the next time registered by the
 `FIRST_PAINT` time */
export const FIRST_CONTENTFUL_PAINT = 'first_contentful_paint';

/* Defines the measure time for the calculation making for the
 collected data in the MutationObserver, this calculation is based
 on Painty.js script `https://github.com/debug-tips/painty`
*/
export const FIRST_MEANINGFUL_PAINT = 'first_meaningful_paint';

/* Defines the measure time for all the resources (image, script,
 xhr, svg, etc) loaded in the page by a SPA transitions (If all the
 resources are not finished when the control timer callback is fiired,
 defines the last resource loaded registered by performanceObserver
 like the last interaction). */
export const VISUALLY_COMPLETE = 'visually_complete';
