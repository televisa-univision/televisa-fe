import linearGradient from '../linearGradient';

/**
 * @test {linearGradient}
 */
describe('linearGradient test', () => {
  it('should return the expected css rule with start/end color', () => {
    expect(linearGradient({ end: '#000', start: '#000' }))
      .toBe('linear-gradient(229deg, #000 0%, #000 100%)');
  });

  it('should return the expected css rule with start/end color and direction', () => {
    expect(linearGradient({ direction: '180deg', end: '#fff', start: '#000' }))
      .toBe('linear-gradient(180deg, #000 0%, #fff 100%)');
  });
});
