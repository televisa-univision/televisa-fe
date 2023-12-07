import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Item from '.';

const props = {
  className: 'my-class',
  uid: '123',
  uri: '/url',
  image: {
    renditions: {
      original: {
        href: '/image',
      },
      '1x1-mobile': {
        href: '/image',
      },
    },
  },
  title: 'Main Title',
};

/** @test {Item} */
describe('Item Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Item {...props} />, div);
  });

  it('should return with theme', () => {
    const wrapper = shallow(<Item {...props} theme={{ primary: 'red' }} />);
    expect(wrapper.find('Item__PromoBorder').prop('style')).toHaveProperty('borderColor', 'red');
  });

  it('should return item for bigSize', () => {
    const wrapper = mount(<Item {...props} theme={{ primary: 'red' }} bigSize />);
    expect(wrapper.find('Item__Promo')).toHaveStyleRule('max-width', '130px');
  });

  it('should call onPressHandler when the button is clicked', () => {
    const onPressHandler = jest.fn();
    const wrapper = mount(<Item {...props} onPressHandler={onPressHandler} />);
    wrapper.find('Item__Promo').simulate('click');
    expect(onPressHandler).toHaveBeenCalled();
  });

  it('should use dark variant', () => {
    props.variant = 'dark';
    const wrapper = shallow(<Item {...props} theme={{ primary: 'red' }} />);
    expect(wrapper.find('Item__PromoTitle')).toHaveStyleRule('color', '#ffffff');
    expect(wrapper.find('Item__PromoImage')).toHaveStyleRule('border', '1px solid transparent');
    expect(wrapper.find('Item__PromoBorder').prop('style')).not.toHaveProperty('borderColor', 'red');
  });

  it('should return null if there is not image in the data', () => {
    props.image = null;
    const wrapper = shallow(<Item {...props} />);
    expect(wrapper.getElement()).toEqual(null);
  });
});
