import reactionsReducer, {
  initialState as registrationState,
  closeRegistration,
  openRegistration,
} from './registrationSlice';

// To avoid a reducers error on testing
jest.mock('../../reducers', () => jest.fn());

describe('registrationSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = registrationState;
  });
  it('should change to true with openRegistration and false whit closeRegistration', () => {
    let state = reactionsReducer(
      initialState,
      openRegistration()
    );
    expect(state.isRegistrationOpen).toBe(true);
    state = reactionsReducer(
      state,
      closeRegistration()
    );
    expect(state.isRegistrationOpen).toBe(false);
  });
  it('should not try to toggle sections-mobile-open on the body if document does not exist', () => {
    const documentMemo = global.document;
    delete global.document;

    let state = reactionsReducer(
      initialState,
      openRegistration()
    );
    expect(state.isRegistrationOpen).toBe(true);
    state = reactionsReducer(
      state,
      closeRegistration()
    );

    global.document = documentMemo;
  });
});
