/* eslint import/no-extraneous-dependencies: ["warn", {"peerDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
configure({ adapter: new Adapter() });

jest.mock('app/utils/logging/serverLogger.js');
