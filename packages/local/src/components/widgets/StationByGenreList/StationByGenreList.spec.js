import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import { isSpa } from '@univision/fe-commons/dist/store/storeHelpers';
import mockPageApiData from './StationByGenreList.mock.json';
import StationByGenreList from './StationByGenreList';
import FilterList from './FilterList';
import FilterToggles from './FilterToggles';
import StationList from './StationList';
import { populateDefaultStationUrl } from '../../../utils/helpers';

let content = [];
let allowedGenresForFiltering = '';
let settings = {};
let props = {};

jest.mock('@univision/fe-components-base/dist/components/Picture', () => 'Picture');
jest.mock('../../connected/PlayStationButton/PlayStationButton', () => 'PlayStationButton');
jest.mock('../../../utils/helpers', () => ({
  populateDefaultStationUrl: jest.fn(),
  getRadioStationProps: jest.fn(),
  getRadioPlayerUrl: jest.fn(() => 'http://v6.player.abacast.net/123')
}));
jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  isSpa: jest.fn(() => true),
  isAmp: jest.fn(() => false),
  getTheme: jest.fn(),
}));
helpers.getKey = jest.fn();
helpers.hasKey = jest.fn(() => true);

beforeAll(() => {
  content = mockPageApiData.contents;
  allowedGenresForFiltering = mockPageApiData.settings.tags;
  /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
  settings = mockPageApiData.settings;
  props = { content, allowedGenresForFiltering, settings };
  isSpa.mockReturnValue(true);
});

/** @test {StationByGenreList} */
describe('StationByGenreList ', () => {
  it('should return empty filter lists array if data is not array', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<StationByGenreList content={{}} allowedGenresForFiltering={[]} />);
    expect(wrapper.state('filterLists').genres.length).toEqual(0);
  });

  it('should load data from bex with title', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    const bexContent = [{
      genres: [
        'Amor',
        'Contemporáneo',
      ],
      localMarket: {
        title: 'foo',
      },
    }];
    const wrapper = shallow(<StationByGenreList {...props} content={bexContent} />);
    expect(wrapper.state('filterLists').genres.length).toEqual(1);
  });

  it('should hide the filter list when it is open and clicked again', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ showFilters: true, activeKey: 'genres' });
    wrapper.instance().handleShowFilters('genres');

    expect(wrapper.state('showFilters')).toEqual(false);
  });

  it('should show all stations if "Todas las ciudades" is selected', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'cities' });
    wrapper.instance().handleSelectFilter('cities', 'Todas las ciudades');

    expect(wrapper.state('stationList').length).toEqual(mockPageApiData.contents.length);
  });

  it('should show all stations if "Todos los géneros" is selected', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'genres' });
    wrapper.instance().handleSelectFilter('genres', 'Todos los géneros');

    expect(wrapper.state('stationList').length).toEqual(mockPageApiData.contents.length);
  });

  it('should show all exclusive stations if "Exclusivas" is selected', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'genres' });
    wrapper.instance().handleSelectFilter('genres', 'Exclusivas');

    expect(wrapper.state('stationList').length).toEqual(
      mockPageApiData.contents.filter(d => d.radioStation.isExclusive).length
    );
  });

  it('should update the filtered stations when a filter is selected', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'cities' });
    wrapper.instance().handleSelectFilter('cities', 'Puerto Rico');

    expect(wrapper.state('stationList').length).toEqual(1);
  });

  it('should returns an empty list when the filter did not match with any station', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'cities' });
    wrapper.instance().handleSelectFilter('cities', 'Univision City');

    expect(wrapper.state('stationList').length).toEqual(0);
  });
  it('should render a Topic Bar', () => {
    const wrapper = shallow(<StationByGenreList {...props} />);
    expect(wrapper.find('TopicBar').length).toBe(1);
  });
  it('should load data from bex with title', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const bexContent = [{
      genres: [
        'Amor',
        'Contemporáneo',
      ],
      localMarket: {
        title: 'foo',
      },
    }];
    const wrapper = shallow(<StationByGenreList {...props} content={bexContent} />);
    expect(wrapper.state('filterLists').genres.length).toEqual(1);
  });
});

/** @test {FilterList} */
describe('FilterList ', () => {
  const filters = ['test'];
  helpers.getKey.mockReturnValue('es'); // used in localization
  populateDefaultStationUrl.mockReturnValue('es');

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <FilterList
        activeFilter="genres"
        filters={filters}
        selectedFilter="genres"
        onSelectFilter={jest.fn()}
      />,
      div
    );
  });

  it('should select "Todos los géneros" on click', () => {
    const wrapper = mount(<StationByGenreList {...props} />);
    wrapper.setState({ showFilters: true, activeKey: 'genres', activeFilters: [] });
    wrapper
      .find(FilterList)
      .find('button')
      .last()
      .simulate('click');
    expect(wrapper.state('selectedFilter').genres).toEqual('Todos los géneros');
  });

  it('should select the filter on click', () => {
    const wrapper = mount(<StationByGenreList {...props} />);
    wrapper.setState({
      showFilters: true,
      activeKey: 'genres',
      activeFilters: ['test'],
      selectedFilter: {
        genres: 'test',
        cities: 'Todos',
      },
    });
    wrapper
      .find(FilterList)
      .find('button')
      .first()
      .simulate('click');

    expect(wrapper.state('selectedFilter').genres).toEqual('test');
  });
});

/** @test {FilterToggles} */
describe('FilterToggles', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <FilterToggles
        activeKey="genres"
        selectedFilter={{
          genres: 'Todos',
          cities: 'Todos',
        }}
        onShowFilters={jest.fn()}
      />,
      div
    );
  });

  it('should toggle the genres filter list', () => {
    const wrapper = mount(<StationByGenreList {...props} />);
    wrapper.setState({ activeKey: 'cities' });
    wrapper
      .find(FilterToggles)
      .find('button')
      .first()
      .simulate('click');

    expect(wrapper.state('activeKey')).toEqual('genres');
  });

  it('should toggle the cities filter list', () => {
    const wrapper = mount(<StationByGenreList {...props} />);
    wrapper
      .find(FilterToggles)
      .find('button')
      .last()
      .simulate('click');

    expect(wrapper.state('activeKey')).toEqual('cities');
  });
});

/** @test {StationList} */
describe('StationList ', () => {
  it('should not render stories if there is no data', () => {
    const wrapper = shallow(<StationList device="mobile" />);
    expect(wrapper.find('.col-sm-12').length).toEqual(0);
  });

  it('should not render stories if data is not array', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<StationList stations="Hello world" device="mobile" />);
    expect(wrapper.find('.col-sm-12').length).toEqual(0);
  });

  it('should not render stories if data is not array', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<StationList stations={[{ test: 'test' }]} device="mobile" />);
    expect(wrapper.find('.col-sm-12').length).toEqual(0);
  });

  it('should not render stories if data in array has no ids', () => {
    const wrapper = shallow(<StationList stations={[{ test: 'test' }]} device="mobile" />);
    expect(wrapper.find('.col-sm-12').length).toEqual(0);
  });

  it('should pass image rendititions to Picture component', () => {
    helpers.hasKey.mockReturnValueOnce(true);
    const wrapper = shallow(
      <StationList
        stations={[
          {
            uid: 'test',
            title: 'test',
            abacast: {
              id: '1234',
            },
            radioStation: {
              logo: {
                renditions: {
                  test: 'test',
                },
              },
              abacast: {
                id: '1234',
              },
            },
            primaryTag: {
              name: 'test',
              link: 'test',
            },
          },
        ]}
        device="mobile"
      />
    );
    expect(wrapper.find('Picture').prop('image').renditions.test).toEqual('test');
  });

  it('should pass an alt tag to the Picture component', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    const wrapper = shallow(
      <StationList
        stations={[
          {
            uid: 'test',
            title: 'test',
            abacast: {
              id: '1234',
            },
            radioStation: {
              logo: {},
            },
            primaryTag: {
              name: 'test',
              link: 'test',
            },
          },
        ]}
        device="mobile"
      />
    );
    expect(wrapper.find('Picture').prop('alt')).toEqual('test');
  });

  it('handles missing station data gracefully', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<StationList stations="a string" device="mobile" />);
    expect(wrapper.find('.col-sm-12')).toHaveLength(0);
  });

  it('should not add Exclusive digital if false', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const wrapper = shallow(
      <StationList
        stations={[
          {
            uid: 'test',
            title: 'test',
            shortDescription: 'test',
            abacast: {
              id: '1234',
            },
            radioStation: {
              logo: {
                renditions: {
                  test: 'test',
                },
              },
              isExclusive: true,
            },
            primaryTag: {
              name: 'test',
              link: 'test',
            },
          },
        ]}
        device="mobile"
      />
    );
    expect(wrapper.find('h2').length).toBe(1);
  });

  it('should add Exclusive digital if true', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true);
    const wrapper = shallow(
      <StationList
        stations={[
          {
            uid: 'test',
            title: 'test',
            shortDescription: 'test',
            abacast: {
              id: '1234',
            },
            radioStation: {
              logo: {
                renditions: {
                  test: 'test',
                },
              },
              isExclusive: true,
              abacast: {
                id: '1234',
              },
            },
            primaryTag: {
              name: 'test',
              link: 'test',
            },
          },
        ]}
        device="mobile"
      />
    );
    expect(wrapper.find('h2.exclusive').length).toBe(1);
  });

  it('should not add Exclusive digital if true', () => {
    helpers.hasKey
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const wrapper = shallow(
      <StationList
        stations={[
          {
            uid: 'test',
            title: 'test',
            shortDescription: 'test',
            abacast: {
              id: '1234',
            },
            radioStation: {
              logo: {
                renditions: {
                  test: 'test',
                },
              },
              abacast: {
                id: '1234',
              },
            },
            primaryTag: {
              name: 'test',
              link: 'test',
            },
          },
        ]}
        device="mobile"
      />
    );
    expect(wrapper.find('h2.exclusive').length).toBe(0);
  });
});
