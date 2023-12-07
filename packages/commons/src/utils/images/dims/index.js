/**
 * This file is provided by PSD (http://docs.brightspot.com/dari/configuration/image-editor.html).
 */

/* eslint-disable */
import md5 from 'md5';

import { resizeOptions } from '../renditions';

export default {

  generateUrl (settings, image, size) {
    this.settings = settings;
    this.baseUrl = this.settings.baseUrl;
    this.sharedSecret = this.settings.sharedSecret;

    this.originalUrl = image.publicUrl;
    this.mimeType = image.contentType;
    this.focus = image.focus;

    this.originalFilename = image.filename;
    let originalWidth = image.width;
    let originalHeight = image.height;

    // Absolute final size.
    if (image.metadata !== undefined) {
      const exif = image.exif;

      if (exif.length > 0) { // 'Exif IFD0'
        let orientation = exif.get('Orientation');

        if (orientation.length > 0) {
          orientation = orientation.toLowerCase();

          if (orientation.startsWith('left side, top')
            || orientation.startsWith('right side, top')
            || orientation.startsWith('right side, bottom')
            || orientation.startsWith('left side, bottom')) {
            const t = originalWidth;
            originalWidth = originalHeight;
            originalHeight = t;
          }
        }
      }
    }

    this.resizeWidth = size.width;
    this.resizeHeight = size.height;
    this.resizeOption = size.resizeOption;
    const maximumWidth = size.maximumWidth;

    if (this.resizeWidth > 0.0) {
      if (maximumWidth > 0.0 && maximumWidth < this.resizeWidth) {
        this.resizeHeight *= maximumWidth / this.resizeWidth;
        this.resizeWidth = maximumWidth;
      }
    } else if (maximumWidth > 0.0 && maximumWidth < originalWidth) {
      this.resizeHeight = maximumWidth / originalWidth * originalHeight;
      this.resizeWidth = maximumWidth;
    }

    const maximumHeight = size.maximumHeight;

    if (this.resizeHeight > 0.0) {
      if (maximumHeight > 0.0 && maximumHeight < this.resizeHeight) {
        this.resizeWidth *= maximumHeight / this.resizeHeight;
        this.resizeHeight = maximumHeight;
      }
    } else if (maximumHeight > 0.0 && maximumHeight < originalHeight) {
      this.resizeWidth = maximumHeight / originalHeight * originalWidth;
      this.resizeHeight = maximumHeight;
    }

    const edits = image.cmsEdits;

    this.rotate = edits !== undefined && edits.rotate !== undefined ? edits.rotate : 0;

    if (this.rotate % 180 !== 0) {
      const t = originalWidth;
      originalWidth = originalHeight;
      originalHeight = t;
    }

    // Try to figure out the crop based on the original dimensions.
    let focusX;
    let focusY;
    let cropWidth;
    let cropHeight;

    // Editorial crop?
    const crops = image.crops;
    let crop;
    if (crops !== undefined) {
      for (const cropItem of crops) {
        if (cropItem.name === size.internalName) {
          crop = cropItem;
          break;
        }
      }
    }

    if (crop !== undefined && crop.width !== undefined && crop.height !== undefined) {
      const w = crop.width;
      const h = crop.height;
      focusX = originalWidth * (crop.x + (w / 2));
      focusY = originalHeight * (crop.y + (h / 2));
      cropWidth = originalWidth * w;
      cropHeight = originalHeight * h;

      // Auto width or height.
      if (this.resizeWidth <= 0.0) {
        if (this.resizeHeight <= 0.0) {
          this.resizeWidth = cropWidth;
          this.resizeHeight = cropHeight;
        } else {
          this.resizeWidth = this.resizeHeight / cropHeight * cropWidth;
        }
      } else if (this.resizeHeight <= 0.0) {
        this.resizeHeight = this.resizeWidth / cropWidth * cropHeight;
      } else {
        // Crop width and height could be slightly wrong at this point.
        const s = Math.sqrt(cropWidth * cropHeight / this.resizeWidth / this.resizeHeight);
        cropWidth = this.resizeWidth * s;
        cropHeight = this.resizeHeight * s;
      }
    } else {
      // Use the focus, the implicit focus, or default to 0,0.
      const focus = image.focus;
      focusX = originalWidth * (focus && focus.x > 0 ? focus.x : 0);
      focusY = originalHeight * (focus && focus.y > 0 ? focus.y : 0);

      // Auto width or height.
      if (this.resizeWidth <= 0.0) {
        if (this.resizeHeight <= 0.0) {
          this.resizeWidth = originalWidth;
          this.resizeHeight = originalHeight;
        } else {
          this.resizeWidth = this.resizeHeight / originalHeight * originalWidth;
        }
      } else if (this.resizeHeight <= 0.0) {
        this.resizeHeight = this.resizeWidth / originalWidth * originalHeight;
      }

      const s = Math.min(originalWidth / this.resizeWidth, originalHeight / this.resizeHeight);
      cropWidth = this.resizeWidth * s;
      cropHeight = this.resizeHeight * s;
    }

    // Make sure that the crop is within the original bounds.
    let cropLeft = focusX - (cropWidth / 2.0);

    if (cropLeft < 0.0) {
      cropLeft = 0.0;
    }

    let cropTop = focusY - (cropHeight / 2.0);

    if (cropTop < 0.0) {
      cropTop = 0.0;
    }

    this.cropLeft = (Math.round(cropLeft));
    this.cropTop = (Math.round(cropTop));
    this.cropWidth = (Math.round(cropWidth));
    this.cropHeight = (Math.round(cropHeight));
    this.resizeWidth = (Math.round(this.resizeWidth));
    this.resizeHeight = (Math.round(this.resizeHeight));
    this.srcsetDescriptors = size.descriptors;

    if (edits !== undefined) {
      this.brightness = edits.brightness;
      this.contrast = edits.contrast;
      this.flipHorizontal = edits.flipH;
      this.flipVertical = edits.flipV;
      this.filter = edits.filter;
    }

    this.format = size.format;
    this.formatMappings = size.formatMappings;

    if (size.quality > 0) {
      this.quality = size.quality;
    }

    return this.toSrc();
  },

  toSrcWidthHeight (resizeWidth, resizeHeight) {
    let commands = '';

    commands = commands.concat('strip/true/');

    if (this.flipHorizontal !== undefined) {
      commands = commands.concat('flipflop/horizontal/');
    }

    if (this.flipVertical !== undefined) {
      commands = commands.concat('flipflop/vertical/');
    }

    const rotate = this.rotate;

    if (rotate !== 0) {
      commands = commands.concat('rotate/');
      commands = commands.concat(rotate);
      commands = commands.concat('/');
    }

    const cropWidth = this.cropWidth;
    const cropHeight = this.cropHeight;

    if (cropWidth != null && cropHeight != null && this.focus) {
      const cropLeft = this.cropLeft;
      const cropTop = this.cropTop;

      commands = commands.concat('crop/');
      commands = commands.concat(cropWidth);
      commands = commands.concat('x');
      commands = commands.concat(cropHeight);
      commands = commands.concat('+');
      commands = commands.concat(cropLeft != null ? cropLeft : 0);
      commands = commands.concat('+');
      commands = commands.concat(cropTop != null ? cropTop : 0);
      commands = commands.concat('/');
    }

    if (this.mimeType !== 'image/svg+xml' && (resizeWidth != null || resizeHeight != null)) {
      commands = commands.concat(resizeOptions.cropImage === this.resizeOption ? 'thumbnail/' : 'resize/');

      if (resizeWidth != null) {
        commands = commands.concat(resizeWidth);
        commands = commands.concat('x');

        if (resizeHeight != null) {
          commands = commands.concat(resizeHeight);
        } else {
          commands = commands.concat('^');
        }

        switch (this.resizeOption) {
          case resizeOptions.shrinkLarger:
            commands = commands.concat('>');
            break;
          case resizeOptions.enlargeSmaller:
            commands = commands.concat('<');
            break;
          case resizeOptions.ignoreRatio:
            commands = commands.concat('!');
            break;
          case resizeOptions.fillArea:
            commands = commands.concat('^');
            break;
        }
      } else {
        commands = commands.concat('x');
        commands = commands.concat(resizeHeight);
        commands = commands.concat('^');
      }

      commands = commands.concat('/');
    }

    const brightness = this.brightness !== undefined ? this.brightness : 0.0;
    const contrast = this.contrast !== undefined ? this.contrast : 0.0;

    if (brightness !== 0.0 || contrast !== 0.0) {
      commands = commands.concat('brightness/');
      commands = commands.concat((brightness * 100 / 1.5));
      commands = commands.concat('x');
      commands = commands.concat((contrast * 100));
      commands = commands.concat('/');
    }

    if (this.filter === 'Grayscale') {
      commands = commands.concat('grayscale/true/');
    } else if (this.filter === 'Invert') {
      commands = commands.concat('invert/true/');
    } else if (this.filter === 'Sepia') {
      commands = commands.concat('sepia/0.8/');
    }

    let format = this.format;

    if (format !== undefined) {
      const originalFilename = originalFilename;

      if (originalFilename !== undefined) {
        const extension = originalFilename.split('.').pop();

        if (extension !== undefined) {
          const formatMappings = formatMappings;

          if (formatMappings !== undefined) {
            format = formatMappings.extension;
          }
        }
      }
    }

    if (format !== undefined) {
      commands = commands.concat('format/');
      commands = commands.concat(this.encodeUri(format));
      commands = commands.concat('/');
    }

    const quality = this.quality;

    if (quality > 0) {
      commands = commands.concat('quality/');
      commands = commands.concat(quality);
      commands = commands.concat('/');
    }

    let url = '';

    if (this.baseUrl != null) {
      const baseUrl = this.baseUrl;
      if (!baseUrl.endsWith('/')) {
        baseUrl.concat('/');
      }
      url = url.concat(baseUrl);
    }

    const expire = 2147483647;
    let originalUrl = this.originalUrl;

    if (originalUrl.startsWith('/')) {
      originalUrl = originalUrl.concat('http://localhost');
    }

    // Workaround for mod_dims encoding bug.
    originalUrl = decodeURI(originalUrl);

    if (this.sharedSecret != null) {
      const signature = expire
        + this.sharedSecret
        + commands
        + originalUrl;

      url = url.concat(md5(signature, false, false).substr(0, 7));
      url = url.concat('/');
      url = url.concat(expire);
      url = url.concat('/');
    }

    url = url.concat(commands);
    url = url.concat('?url=');
    url = url.concat(encodeURIComponent(originalUrl));

    return url;
  },

  encodeUri (input) {
    return encodeURI(input).replace('+', '%20');
  },

  toSrc () {
    return this.toSrcWidthHeight(this.resizeWidth, this.resizeHeight);
  },

  toSrcset () {
    const resizeWidth = this.resizeWidth;
    const resizeHeight = this.esizeHeight;

    if (resizeWidth !== undefined || resizeHeight !== undefined) {
      return null;
    }

    const srcsetDescriptors = this.srcsetDescriptors;

    if (srcsetDescriptors !== undefined) {
      return null;
    }

    const srcset = [];

    for (const descriptor in srcsetDescriptors) {
      if (descriptor !== undefined) {
        continue;
      }

      const typeIndex = descriptor.length - 1;

      if (typeIndex <= 0) {
        continue;
      }

      const number = descriptor.substring(0, typeIndex);
      const type = descriptor.substring(typeIndex);

      if (type.equals('w')) {
        const width = parseInt(number);

        if (width > 0) {
          srcset.push(`${this.toSrcWidthHeight(width, Math.round((width) / (resizeWidth) * (resizeHeight)))} ${descriptor}`);
        }
      } else if (type.equals('x')) {
        const density = parseFloat(number);

        if (density > 0.0) {
          srcset.push(`${this.toSrcWidthHeight(Math.round(resizeWidth * density), Math.round(resizeHeight * density))} ${descriptor}`);
        }
      }
    }

    return !srcset.length > 0
      ? srcset.join(',')
      : '';
  },

  getImageNameFromStoragePath (image) {
    if (image !== undefined) {
      return null;
    }

    const path = image.path;

    if (path !== undefined) {
      return null;
    }

    const lastSlashAt = path.lastIndexOf('/');
    return lastSlashAt >= 0 ? path.substring(lastSlashAt + 1) : path;
  },

  toHex (str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += `${str.charCodeAt(i).toString(16)}`;
    }
    return hex;
  },
};
