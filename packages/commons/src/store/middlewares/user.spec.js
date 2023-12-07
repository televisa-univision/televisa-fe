import configureStore from 'redux-mock-store';
import { userNotFound } from './user';
import { cloneDeep } from '../../utils/helpers';
import userNotFoundError from './__mock__/userNotFoundError';
import { GRAPHQL_SERVICE_ERROR } from '../../constants/messages';

const mockStore = configureStore([userNotFound]);
const store = mockStore({});

const next = jest.fn(() => 'nextResult');
const error = new Error(JSON.stringify([{}, ...userNotFoundError]));
error.name = GRAPHQL_SERVICE_ERROR;

const restartAction = jest.fn(() => () => 'restartActionTest');

describe('userNotFound middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should invalid action works properly', () => {
    userNotFound(store)(next)(null);
    expect(next).toHaveBeenCalled();
    expect(restartAction).not.toHaveBeenCalled();
  });

  it('should call next action when error', () => {
    userNotFound(store)(next)({
      error: null,
    });
    expect(next).toHaveBeenCalled();
    expect(restartAction).not.toHaveBeenCalled();
  });

  it(`should call next action when error name is not ${GRAPHQL_SERVICE_ERROR}`, () => {
    userNotFound(store)(next)({
      meta: { arg: { restartAction } },
    });
    expect(next).toHaveBeenCalled();
    expect(restartAction).not.toHaveBeenCalled();
  });

  it('should invoke restartAction and call next action also', () => {
    const res = userNotFound(store)(next)({
      error,
      meta: { arg: { restartAction } },
    });
    expect(restartAction).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res).toEqual('nextResult');
  });

  it('should not invoke restartAction', () => {
    const errorsCopy = cloneDeep(userNotFoundError);
    errorsCopy[0].extensions.code = 'AnotherErrorCode';
    const invalidError = new Error(JSON.stringify(errorsCopy));
    invalidError.name = GRAPHQL_SERVICE_ERROR;
    userNotFound(store)(next)({
      error: invalidError,
      meta: { arg: { restartAction } },
    });
    expect(restartAction).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should not crash something is wrong with error format', () => {
    // Invalid json
    let invalidError = new Error('InvalidJson');
    invalidError.name = GRAPHQL_SERVICE_ERROR;
    userNotFound(store)(next)({
      error: invalidError,
      meta: { arg: { restartAction } },
    });

    expect(restartAction).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    restartAction.mockClear();

    // Invalid array
    invalidError = new Error(JSON.stringify({})); // not array
    invalidError.name = GRAPHQL_SERVICE_ERROR;
    userNotFound(store)(next)({
      error: invalidError,
      meta: { arg: { restartAction } },
    });
    expect(restartAction).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
