import configureStore from './configureStore';

/**
 * @test {configureStore}
 */
describe('configureStore test', () => {
  it('should return store instance', () => {
    const store = configureStore();
    expect(store).toHaveProperty('getState', expect.any(Function));
  });

  it('should set initial state', () => {
    const initialState = {
      page: { data: { type: 'section' } },
    };
    const store = configureStore(initialState);
    expect(store.getState()).toEqual(expect.objectContaining(initialState));
  });
});
