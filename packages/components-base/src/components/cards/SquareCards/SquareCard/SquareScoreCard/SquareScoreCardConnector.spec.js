import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import { DEPORTES_SCORE_CELLS } from '@univision/fe-commons/dist/constants/widgetTypes';
import mockData from './__mocks__/squareMatchCard.json';
import SquareScoreCardConnector from './SquareScoreCardConnector';

const store = configureStore();
const extraData = { ...mockData.cell };
const widgetContext = {
  id: 2,
  matchId: '919268',
};
const pageDataScoreCells = {
  data: {
    widgets: [
      {
        id: 1,
        type: DEPORTES_SCORE_CELLS,
        extraData: [
          {
            ...mockData.cell,
          },
        ],
        settings: {
          uid: 1,
        },
      },
      {
        id: 2,
        type: 'Other Widget',
        settings: {
          uid: 2,
        },
        contents: [
          {
            uid: 1,
            matchId: 964763,
            extraData,
          },
        ],
      },
    ],
  },
};

const pageDataNoScoreCells = {
  data: {
    widgets: [
      {
        id: 2,
        type: 'Other Widget',
        settings: {
          uid: 2,
        },
        contents: [
          {
            uid: 1,
            matchId: 964763,
            extraData,
          },
        ],
      },
    ],
  },
};
// Mocks
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(() => Promise.resolve(mockData.default)),
}));

/**
 * Create a new MatchCard connector widget
 * @param {Object} props - additional props for creation
 * @access private
 * @returns {JSX}
 */
const makeMatchCard = (props = {}) => {
  const element = (
    <Provider store={store}>
      <SquareScoreCardConnector
        {...Object.assign(
          {},
          {
            widgetContext,
          },
          props
        )}
      />
    </Provider>
  );
  return mount(element);
};

describe('SquareScoreCardConnector', () => {
  it('should render correctly with data from score cells', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    store.dispatch(setPageData(cloneDeep(pageDataScoreCells)));
    const wrapper = makeMatchCard({ ...mockData.default, size: 'medium' });
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard')).toHaveLength(1);
  });
  it('should render correctly with no data from score cells', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    store.dispatch(setPageData(cloneDeep(pageDataNoScoreCells)));
    const wrapper = makeMatchCard({ ...mockData.default, size: 'medium' });
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard')).toHaveLength(1);
  });
});
