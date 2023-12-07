import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
import 'jest-styled-components';
import 'jest-next-dynamic';

fetchMock.enableMocks();
configure({ adapter: new Adapter() });
