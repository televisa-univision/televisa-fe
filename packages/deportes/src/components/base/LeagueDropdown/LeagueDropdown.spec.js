import React from 'react';
import { shallow, mount } from 'enzyme';
import leagues from '../../../utils/mocks/leagues.json';
import LeagueDropdown from '.';

let props;
let emptyProps;
const event = {
  target: { value: '199' },
  preventDefault: jest.fn(),
  nativeEvent: {}
};
event.nativeEvent = event;

beforeEach(() => {
  props = {
    leagues,
    onChange: jest.fn()
  };
  emptyProps = {
    leagues: []
  };
});

describe('LeagueDropdown tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<LeagueDropdown {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.dropDownList').children()).toHaveLength(6);
    expect(wrapper.find('option')).toHaveLength(7);
  });
  it('should render empty if leagues array is empty', () => {
    const wrapper = shallow(<LeagueDropdown {...emptyProps} />);
    expect(wrapper.find('.container')).toHaveLength(0);
  });
  it('should render empty if have wrong leagues data', () => {
    const wrongLeagues = [
      {
        soccerCompetition: {
          id: '23',
          nameCompetition: 'Liga MX'
        }
      }
    ];
    const wrapper = shallow(<LeagueDropdown leagues={wrongLeagues} />);
    expect(wrapper.find('.container')).toHaveLength(0);
    expect(wrapper.find('.dropDownList')).toHaveLength(0);
    expect(wrapper.find('option')).toHaveLength(0);
  });
  it('calls toggleOpen when clicked', () => {
    const wrapper = shallow(<LeagueDropdown {...props} />);
    wrapper.instance().toggleOpen();
    expect(wrapper.state('open')).toEqual(true);
    wrapper.instance().toggleOpen();
    expect(wrapper.state('open')).toEqual(false);
  });
  it('calls onChange prop when from handleChange', () => {
    const wrapper = shallow(<LeagueDropdown {...props} />);
    const onChangeSpy = jest.spyOn(props, 'onChange');
    wrapper.instance().handleChange(event, leagues[0]);
    expect(wrapper.state('activeLeague')).toEqual(leagues[0]);
    expect(onChangeSpy).toHaveBeenCalledWith(event, leagues[0]);
  });
  it('calls toggleOpen when top button is clicked', () => {
    const toggleOpenSpy = jest.spyOn(LeagueDropdown.prototype, 'toggleOpen');
    const wrapper = shallow(<LeagueDropdown {...props} />);
    wrapper.find('.topButton').simulate('click');
    expect(toggleOpenSpy).toHaveBeenCalled();
  });
  it('calls handleChange when select option is clicked', () => {
    const wrapper = shallow(<LeagueDropdown currentLeague="5" {...props} />);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    expect(wrapper.find('select').props().value).toBe('5');
    expect(wrapper.find('option').at(0).props().value).toBe('199');
    wrapper.find('.key199').simulate('click', event);
    expect(wrapper.find('select').props().value).toBe('199');
    expect(handleChangeSpy).toHaveBeenCalledWith(event, leagues[0]);
  });
  it('handles onchange on native select and call onChange prop', () => {
    const wrapper = shallow(<LeagueDropdown {...props} />);
    const onChangeSpy = jest.spyOn(props, 'onChange');
    expect(wrapper.find('select').props().value).toBe('0');
    wrapper.find('select').simulate('change', event);
    expect(wrapper.find('select').props().value).toBe('199');
    expect(wrapper.state('activeLeague')).toHaveProperty('soccerCompetition.id', '199');
    expect(onChangeSpy).toHaveBeenCalledWith(event, leagues[0]);
  });
  it('call onChange prop on native select with default callback', () => {
    delete props.onChange;
    const wrapper = shallow(<LeagueDropdown {...props} />);
    wrapper.find('select').simulate('change', event);
    expect(wrapper.instance().props.onChange).toEqual(expect.any(Function));
    expect(wrapper.find('select').props().value).toBe('199');
  });
  it('update currentLeague prop and should update the state', () => {
    const wrapper = mount(<LeagueDropdown {...props} />);
    wrapper.setProps({ currentLeague: '199' });
    expect(wrapper.find('select').props().value).toBe('199');
  });
  it('should not update state when currentLeague is updated with the previous one', () => {
    const wrapper = mount(<LeagueDropdown {...props} />);
    wrapper.setProps({ currentLeague: '199' });
    expect(wrapper.find('select').props().value).toBe('199');
    wrapper.setProps({ currentLeague: '199' });
    wrapper.update();
    expect(wrapper.find('select').props().value).toBe('199');
  });
  it('should not update state when currentLeague with default name', () => {
    props.defaultLabel = '';
    const wrapper = mount(<LeagueDropdown {...props} />);
    wrapper.setProps({ currentLeague: '199' });
    expect(wrapper.find('select').props().value).toBe('199');
    wrapper.setProps({ currentLeague: '199' });
    wrapper.update();
    expect(wrapper.find('select').props().value).toBe('199');
  });
});
