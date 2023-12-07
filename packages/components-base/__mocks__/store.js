// Mock store is only for testing purposes and therefore only a devDependency
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middlewares = [promise, thunk];
const mockStore = configureMockStore(middlewares);

export default mockStore;
