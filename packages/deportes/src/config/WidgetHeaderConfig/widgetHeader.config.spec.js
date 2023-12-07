import standingsHeader from './widgetHeader.config';

/** @test {settings} */
describe('Standing Headers Config', () => {
  test('standingsHeader(type) the set', () => {
    const type = 'Torneo';
    expect(standingsHeader(type)).not.toBe(null);
  });
  test('standingsHeader(type) returns undefined if type not found', () => {
    const type = 'undefinedType';
    expect(standingsHeader(type)).toBe(null);
  });
});
