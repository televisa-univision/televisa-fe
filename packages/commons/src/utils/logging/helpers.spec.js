import sectionData from './__mocks__/mockPageApiData.json';
import slideshowData from './__mocks__/mockSlideshowData.json';
import videoData from './__mocks__/mockVideoPageData.json';
import tagData from './__mocks__/mockTagPageData.json';
import articleData from './__mocks__/mockArticleData.json';
import fieldsByPageType from './fieldsByPageType.json';

import { getKey } from '../helpers';
import filterForLogs from './helpers';

const config = {
  section: {
    data: sectionData,
    excludedFields: ['sharing', 'updateDate', 'publishDate'],
    fields: fieldsByPageType.section,
  },
  slideshow: {
    data: slideshowData,
    excludedFields: ['nextSlideshow.mainImage', 'slides.0.image.renditions'],
    fields: fieldsByPageType.slideshow,
  },
  video: {
    data: videoData,
    excludedFields: ['seo', 'image.renditions', 'adSettings'],
    fields: fieldsByPageType.video,
  },
  article: {
    data: articleData,
    excludedFields: ['lead.image.renditions', 'relatedContent'],
    fields: fieldsByPageType.article.filter(e => e !== 'value'),
  },
  mystery: {
    data: tagData,
    excludedFields: ['updateDate', 'publishDate'],
    fields: ['type', 'uid', 'uri'],
  },
};

/** @test {helper} */
describe('logging helpers spec', () => {
  describe('filterForLogs', () => {
    it('should return a valid json object filtering out unwanted fields', () => {
      Object.keys(config).forEach((key) => {
        const filtered = filterForLogs(config[key].data);
        expect(filtered).toBeDefined();
        expect(filtered.data).toBeDefined();

        config[key].fields.forEach((field) => {
          expect(getKey(filtered.data, field, undefined)).toBeDefined();
        });

        config[key].excludedFields.forEach((field) => {
          expect(getKey(filtered.data, field, undefined)).toBeUndefined();
        });
      });
    });
  });
});
