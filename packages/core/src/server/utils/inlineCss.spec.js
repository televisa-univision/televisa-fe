import fs from 'fs';
import recursiveReadDir from 'recursive-readdir';
import logger from 'app/utils/logging/serverLogger';
import getCssAssetObject, * as inlineCss from './inlineCss';

jest.mock('recursive-readdir');
jest.mock('app/utils/logging/serverLogger');

describe('getChunkNameByPath', () => {
  it('Should return the valid chunkName from build css file', () => {
    const chunkName = inlineCss.getChunkNameByPath('./build/assets/section.abc123456789.css');
    expect(chunkName).toEqual('section');
  });

  it('Should return null from wrong css file', () => {
    const chunkName = inlineCss.getChunkNameByPath('');
    expect(chunkName).toBeNull();
  });
});

describe('getCssAssetObject', () => {
  beforeEach(() => {
    logger.info = jest.fn();
    jest.spyOn(fs, 'statSync').mockImplementation(() => ({ size: 123 }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should return the chunkName/cssFile pair when the css path list are valid', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, encode, cb) => {
      switch (path) {
        case './build/assets/section.acb976786786.css':
          return cb(null, 'p{margin:0}');
        case './build/assets/tag.acb976786786.css':
          return cb(null, 'p{padding:0;margin:0;}');
        default:
          return cb(null, '');
      }
    });
    recursiveReadDir.mockImplementation(() => ([
      './build/assets/section.acb976786786.css',
      './build/assets/tag.acb976786786.css',
      './build/assets/tag.acb976786786.js',
    ]));

    const result = await getCssAssetObject();
    expect(result).toHaveProperty('section_inlineCss', 'p{margin:0}');
    expect(result).toHaveProperty('tag_inlineCss', 'p{padding:0;margin:0;}');
  });

  it('Should throw and exception when the cssPath is invalid', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((path, encode, cb) => cb(new Error('fail')));
    recursiveReadDir.mockImplementation(() => ([
      './build/assets/section.acb976786786.css',
      './assets/tag.css',
    ]));

    try {
      await getCssAssetObject();
    } catch (e) {
      expect(e.message).toEqual('fail');
    }
  });
});
