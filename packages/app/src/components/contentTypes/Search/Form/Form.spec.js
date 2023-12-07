import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import mockPageApiData from '../__mocks__/mockSearchPageApiData.json';

import Form from '.';
import mockApiData from '../__mocks__/data.json';

let props;

describe('Search Page Form', () => {
  beforeEach(() => {
    props = {
      page: mockPageApiData.data,
      placeholder: 'Buscar',
      resultSize: 10,
      results: mockApiData.data.results,
      loading: false,
      query: 'Noticias',
      onChangeFilterByType: jest.fn(),
      onChangeFilterByDate: jest.fn(),
      handleInputBlur: jest.fn(),
      handleSubmitForm: jest.fn(),
    };
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form {...props} />, div);
  });

  it('should render a form tag if the data is correct', () => {
    const wrapper = mount(<Form {...props} />);
    expect(wrapper.find('.form').length).toBe(1);
  });

  it('should return a empty array when optionsMapping is called without data', () => {
    const optionsMappingSpy = jest.spyOn(Form, 'optionsMapping');
    const wrapper = mount(<Form {...props} page={{}} />);
    const instance = wrapper.instance();
    expect(optionsMappingSpy).toHaveBeenCalled();
    expect(instance.filterTypeOptions).toHaveLength(1);
  });

  it('should set searchValue state as an empty string when query prop is null', () => {
    props.query = null;
    const wrapper = mount(<Form {...props} />);
    const instance = wrapper.instance();
    expect(instance.state.searchValue).toBe('');
  });

  it('should call handleInputBlur callback when handleInputBlur is called and data is valid', () => {
    const wrapper = mount(<Form {...props} />);
    const instance = wrapper.instance();
    const blurSpy = jest.spyOn(props, 'handleInputBlur');
    instance.setState({ searchValue: '' });
    instance.handleInputBlur({ target: { value: 'test' } });
    expect(blurSpy).toHaveBeenCalled();
  });

  it('should change the search value to the query if handleInputBlur is called without value', () => {
    const wrapper = mount(<Form {...props} />);
    const instance = wrapper.instance();
    instance.handleInputBlur({ target: { value: '' } });
    expect(instance.state.searchValue).toBe('Noticias');
  });

  it('should not call handleInputBlur callback or update value when there is not a valid function', () => {
    const blurSpy = jest.spyOn(props, 'handleInputBlur');
    props.handleInputBlur = null;
    const wrapper = mount(<Form {...props} />);
    const instance = wrapper.instance();
    instance.setState({ searchValue: 'Test' });
    instance.handleInputBlur({ target: { value: 'Something' } });
    expect(instance.state.searchValue).toBe('Test');
    expect(blurSpy).not.toHaveBeenCalled();
  });

  it('should change the searchValue state when handleChange is called', () => {
    const wrapper = mount(<Form {...props} />);
    const instance = wrapper.instance();
    const stateSpy = jest.spyOn(instance, 'setState');
    instance.handleChange({ target: { value: 'test' } });
    expect(stateSpy).toHaveBeenCalled();
    expect(instance.state.searchValue).toBe('test');
  });

  it('should change the searchValue if update with new query prop', () => {
    const wrapper = mount(<Form {...props} />);
    wrapper.setProps({ query: 'test' });
    wrapper.update();
    expect(wrapper.find('input').instance().value).toBe('test');
  });
});
