import React from 'react';
import { mount, shallow } from 'enzyme';
import teamsExtractor from '@univision/shared-components/dist/extractors/teamsExtractor';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import mockTeams from '../../../utils/mocks/teams.json';
import TeamsGrid from '.';

helpers.locationRedirect = jest.fn();

const defaultProps = {
  settings: {
    soccerCompetitionSeason: {
      seasonId: '2017',
      soccerCompetition: {
        id: '199',
        league: {
          activeSoccerCompetitionURL: 'https://www.univision.com/deportes/futbol/liga-mx-clausura',
        },
      },
    },
  },
  teams: {
    data: [],
    error: false,
  },
  getTeams: jest.fn(),
};
const mockEvent = {
  preventDefault: jest.fn(),
};

/**
 * Create a new TeamsGrid widget
 * @param {Object} props - additional props for creation
 * @param {function} createType - the creation type (mount/shallow)
 * @access private
 * @returns {JSX}
 */
const makeTeamsGrid = (props = {}, createType = shallow) => {
  const element = (
    <TeamsGrid
      {...Object.assign({}, defaultProps, props)}
    />
  );
  return createType(element);
};

describe('TeamsGrid widget tests', () => {
  beforeEach(() => {
    helpers.locationRedirect.mockClear();
    defaultProps.teams.data = teamsExtractor(mockTeams);
    defaultProps.getTeams.mockClear();
  });

  it('should be rendered', () => {
    const wrapper = makeTeamsGrid();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('StatWrapper')).toHaveLength(1);
  });

  it('should call getTeams action', () => {
    makeTeamsGrid();

    expect(defaultProps.getTeams).toHaveBeenCalledTimes(1);
  });

  it('should be render the error message when not have teams data', () => {
    const wrapper = makeTeamsGrid({ teams: null }, mount);

    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toBe('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should be render the fallback message when teams list is empty', () => {
    const wrapper = makeTeamsGrid({ teams: { data: [] } }, mount);

    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toBe('Información no disponible');
  });

  it('should be render the Full version', () => {
    const wrapper = makeTeamsGrid();
    expect(wrapper.find('TeamsGrid__TeamStyled')).toHaveLength(10);
  });

  it('should be render the Collapsed version', () => {
    const wrapper = makeTeamsGrid({
      settings: Object.assign({}, {
        displayType: {
          value: 'Collapsed',
        },
        styleType: 'bar',
      }, defaultProps.settings),
    });
    expect(wrapper.find('TeamsGrid__TeamStyled')).toHaveLength(6);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('should be render the Full version - Style BAR (version 2)', () => {
    const wrapper = makeTeamsGrid({
      settings: Object.assign({}, {
        styleType: 'bar',
      }, defaultProps.settings),
    });
    expect(wrapper.find('TeamsGrid__TeamStyled')).toHaveLength(10);
  });

  it('should call showAll handler on Collapsed version and redirect', () => {
    const showMoreHandlerSpy = jest.spyOn(TeamsGrid.prototype, 'showMoreHandler');
    const wrapper = makeTeamsGrid({
      settings: Object.assign({}, {
        displayType: {
          value: 'Collapsed',
        },
      }, defaultProps.settings),
    });

    expect(wrapper.instance().showAll).toBeFalsy();
    expect(wrapper.find('TeamsGrid__TeamStyled')).toHaveLength(6);
    expect(wrapper.find('Button')).toHaveLength(1);

    wrapper.find('Button').props().onPress(mockEvent);

    expect(showMoreHandlerSpy).toHaveBeenCalledTimes(1);
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/liga-mx-clausura')));

    showMoreHandlerSpy.mockRestore();
  });

  it('should call showAll handler on Collapsed version but not redirect if not have URL', () => {
    const showMoreHandlerSpy = jest.spyOn(TeamsGrid.prototype, 'showMoreHandler');
    const wrapper = makeTeamsGrid({
      settings: {
        displayType: {
          value: 'Collapsed',
        },
        soccerCompetitionSeason: {},
      },
    });

    wrapper.find('Button').props().onPress(mockEvent);

    expect(showMoreHandlerSpy).toHaveBeenCalledTimes(1);
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    showMoreHandlerSpy.mockRestore();
  });
});
