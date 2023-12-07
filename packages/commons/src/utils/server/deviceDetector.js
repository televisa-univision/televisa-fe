import UAParser from 'ua-parser-js';

import { isInArray } from '../helpers';
import * as devices from '../../constants/devices';

/**
 * Returns the current device based on the HTTP Request.
 * If there is a valid "X-UA-DEVICE", then try to get the current device type
 * using that header. Otherwise, parses the User Agent (using the "device" module)
 * to get the device type.
 * @param {Object} httpRequest HTTP Request
 * @returns {string}
 */
const getDeviceForRequest = (httpRequest) => {
  let deviceForRequest = null;
  if (httpRequest && httpRequest.headers) {
    const xUaDevice = httpRequest.headers['x-ua-device'];
    const userAgent = httpRequest.headers['user-agent'];
    const validDevices = [
      devices.MOBILE,
      devices.TABLET,
      devices.DESKTOP,
    ];

    if (userAgent === devices.UA_AMAZON_CLOUDFRONT) {
      const cloudFrontIsDesktopViewer = httpRequest.headers['cloudfront-is-desktop-viewer'];
      const cloudFrontIsMobileViewer = httpRequest.headers['cloudfront-is-mobile-viewer'];
      const cloudFrontIsTabletViewer = httpRequest.headers['cloudfront-is-tablet-viewer'];

      if (cloudFrontIsDesktopViewer === 'true') {
        deviceForRequest = devices.DESKTOP;
      } else if (cloudFrontIsMobileViewer === 'true') {
        deviceForRequest = devices.MOBILE;
      } else if (cloudFrontIsTabletViewer === 'true') {
        deviceForRequest = devices.TABLET;
      }
    }

    // Try to use the X_UA_DEVICE, if any
    if (xUaDevice && !deviceForRequest) {
      validDevices.some((deviceType) => {
        if (isInArray(xUaDevice, devices.X_UA_DEVICE[deviceType])) {
          deviceForRequest = deviceType;
          return true;
        }
        return false;
      });
    }

    // Fallback to the "device" module
    if (!deviceForRequest) {
      deviceForRequest = 'mobile';
      const parser = new UAParser(userAgent);
      const results = parser.getResult();
      const { type } = results.device;
      // Possible 'device.type':
      // console, mobile, tablet, smarttv, wearable, embedded
      if (isInArray(type, validDevices)) {
        deviceForRequest = type;
      } else {
        // since desktop is not is possible types
        deviceForRequest = devices.DESKTOP;
      }
    }
  }

  return deviceForRequest;
};

export default getDeviceForRequest;
