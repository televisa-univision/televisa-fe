import getDaysDiff from '../getDaysDiff';

/**
 * @test {fromMilitaryTime}
 */
describe('getDaysDiff test', () => {
  it('should return correct number of days', () => {
    const initialDate = new Date('05/10/2022');
    const endDate = new Date('05/13/2022');
    expect(getDaysDiff(initialDate, endDate)).toBe(3);
  });
});
