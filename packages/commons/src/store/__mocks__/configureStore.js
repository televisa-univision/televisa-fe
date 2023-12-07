import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middlewares = [promise, thunk];
const configureStoreMock = configureMockStore(middlewares);

// To avoid a reducers error on testing
jest.mock('../store');

export default configureStoreMock;
