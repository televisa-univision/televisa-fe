import * as utils from './helpers';

describe('articleBodyUtils', () => {
  it('should merge contigous raw htmls', () => {
    const chunks = [
      {
        objectData: {
          type: 'rawhtml',
          html: 'foo',
        },
      },
      {
        objectData: {
          type: 'rawhtml',
          html: 'bar',
        },
      },
      {
        objectData: {
          type: 'text',
        },
      },
    ];
    const mergedChunks = utils.mergeRawHtmls(chunks);
    expect(mergedChunks[0].skip).toBeTruthy();
    expect(mergedChunks[2].skip).toBeFalsy();
    expect(utils.mergeRawHtmls(null)).toEqual([]);
  });
});
