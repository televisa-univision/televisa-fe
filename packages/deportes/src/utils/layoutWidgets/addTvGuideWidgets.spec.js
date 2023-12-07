import addTvGuideWidget from './addTvGuideWidget';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a', 'b'],
};

describe('addSoccerScriptWidget', () => {
  it('should return tv guid widget if empty data', () => {
    expect(addTvGuideWidget({}).length).toBe(1);
  });
  it('should concat widgtes', () => {
    expect(addTvGuideWidget(data).length).toBe(3);
  });
});
