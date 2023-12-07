import isValidNumber from '@univision/fe-utilities/helpers/common/isValidNumber';

import Store from '../../store/store';
import { configSelector, isWebPSupportedSelector } from '../../store/selectors/page-selectors';

export const resizeOptions = {
  shrinkLarger: 'Only Shrink Larger',
  enlargeSmaller: 'Only Enlarge Smaller',
  fillArea: 'Fill Area',
  ignoreRatio: 'Ignore Aspect Ratio',
  cropImage: 'Crop Image',
};

/**
 * Returns a DIMs rendition URL.
 * @param {Object} originalImage Original image
 * @param {Object} expectedImage Expected image
 * @returns {string}
 */
export default function getRenditionUrl(
  {
    href: originalHref,
    width: originalWidth,
    height: originalHeight,
    focusPoint: originalFocusPoint,
  } = {},
  {
    width: expectedWidth,
    height: expectedHeight,
    resizeOption,
    format,
  } = {},
) {
  if (!originalHref) return null;

  const config = configSelector(Store);
  const { proxy, syndicator } = config;
  const picturePath = syndicator?.picture;
  const isWebPSupported = isWebPSupportedSelector(Store);
  const webPFormat = isWebPSupported ? '&format=webp' : '';
  const formatParam = format ? `&format=${format}` : webPFormat;
  const focus = originalFocusPoint ? `&focus_point_x=${originalFocusPoint.x}&focus_point_y=${originalFocusPoint.y}` : '';
  const resizeParam = resizeOption ? `&resize_option=${encodeURIComponent(resizeOption)}` : '';
  const widthParam = isValidNumber(originalWidth) ? originalWidth : 0;
  const heightParam = isValidNumber(originalHeight) ? originalHeight : 0;
  const originalSize = `&width=${widthParam}&height=${heightParam}`;
  const params = `href=${encodeURIComponent(originalHref)}${originalSize}&ratio_width=${expectedWidth}&ratio_height=${expectedHeight}${resizeParam}${focus}${formatParam}`;

  const pictureUrl = `${proxy}${picturePath}?${params}`;

  return pictureUrl;
}
