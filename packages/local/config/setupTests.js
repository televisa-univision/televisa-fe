/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
import 'jest-styled-components';

fetchMock.enableMocks();
configure({ adapter: new Adapter() });
