import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Pagination, { PaginationButton } from '.';

/** @test {Pagination} */
describe('Pagination Spec', () => {
  const props = {
    activePageNumber: 1,
    totalPages: 5,
    onUpdate: jest.fn(),
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pagination {...props} />, div);
  });

  it('should render prev and newest buttons if activePageNumber > 1', () => {
    const wrapper = shallow(<Pagination {...props} activePageNumber={2} />);
    expect(wrapper.find(PaginationButton)).toHaveLength(4);
  });

  it('should not call onUpdate when activePageNumber > totalPages', () => {
    const wrapper = shallow(<Pagination {...props} activePageNumber={6} />);
    wrapper.find('.next').find(PaginationButton).simulate('click');
    expect(props.onUpdate).not.toHaveBeenCalled();
  });
});

/** @test {PaginationButton} */
describe('PaginationButton Spec', () => {
  const props = {
    updateNumber: 2,
    onUpdate: jest.fn(),
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaginationButton {...props}>next</PaginationButton>, div);
  });

  it('should call onUpdate when clicked', () => {
    const wrapper = shallow(<PaginationButton {...props}>next</PaginationButton>);
    wrapper.find('button').simulate('click');
    expect(props.onUpdate).toHaveBeenCalledWith(2);
  });

  it('should not call onUpdate', () => {
    delete props.onUpdate;
    const wrapper = shallow(<PaginationButton {...props}>next</PaginationButton>);
    wrapper.find('button').simulate('click');
    expect(wrapper.props().onUpdate).toBe(undefined);
  });
});
