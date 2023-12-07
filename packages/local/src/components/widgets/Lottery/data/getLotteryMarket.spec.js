import getLotteryMarket from './getLotteryMarket';

describe('getLotteryMarket', () => {
  it('should return and empty object when the market doesn`t exist', () => {
    expect(getLotteryMarket('foo').region).toBeFalsy();
  });
  it('should return a valid market', () => {
    expect(getLotteryMarket('Atlanta').region).toEqual('GA');
    expect(getLotteryMarket('Austin').region).toEqual('TX');
    expect(getLotteryMarket('Chicago').region).toEqual('IL');
    expect(getLotteryMarket('Bakersfield').region).toEqual('CA');
    expect(getLotteryMarket('Miami').region).toEqual('FL');
    expect(getLotteryMarket('Tampa Bay').region).toEqual('FL');
    expect(getLotteryMarket('Orlando').region).toEqual('FL');
    expect(getLotteryMarket('Nueva York').region).toEqual('NY');
    expect(getLotteryMarket('Philadelphia').region).toEqual('PA');
    expect(getLotteryMarket('Phoenix').region).toEqual('AZ');
    expect(getLotteryMarket('Puerto Rico').region).toEqual('PR');
    expect(getLotteryMarket('Raleigh').region).toEqual('NC');
    expect(getLotteryMarket('Salt Lake City').region).toEqual('ID');
    expect(getLotteryMarket('Washington').region).toEqual('DC');
  });
});
