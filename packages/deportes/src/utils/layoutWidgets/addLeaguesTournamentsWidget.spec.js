import addLeaguesTournamentsWidget from './addLeaguesTournamentsWidget';

/**
 * Mock data for api
 * @type {Object}
 */
const data = {
  widgets: ['a', 'b'],
};

describe('addLeaguesTournamentsWidget', () => {
  it('should return widget if empty data', () => {
    expect(addLeaguesTournamentsWidget({}).length).toBe(4);
  });
  it('should concat widgtes', () => {
    expect(addLeaguesTournamentsWidget(data).length).toBe(6);
  });
});
