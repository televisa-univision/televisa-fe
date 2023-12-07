import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Button from '.';

let wrapper;

beforeAll(() => {
  wrapper = shallow(<Button className="blah-blah-blah" onClick={jest.fn()}>Hello There</Button>);
});

/** @test {Button} */
describe('Button', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = (
      <Button
        className="blah-blah-blah"
        onClick={jest.fn()}
      >
        Hello There
      </Button>
    );
    ReactDOM.render(button, div);
  });

  it('should render text', () => {
    expect(wrapper.text()).toBe('Hello There');
  });

  it('should render the className prop', () => {
    expect(wrapper.hasClass('blah-blah-blah')).toBeTruthy();
  });

  it('should invoke the onClick function prop', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.getElement().props.onClick).toHaveBeenCalled();
  });

  it('adds plain class', () => {
    expect(wrapper.find('.plain')).toHaveLength(0);
    wrapper.setProps({ plain: true });
    expect(wrapper.find('.plain')).toHaveLength(1);
  });
});
