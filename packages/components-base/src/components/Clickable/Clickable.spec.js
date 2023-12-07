import React from 'react';
import { shallow } from 'enzyme';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../Link';
import IconWrapper from '../IconWrapper';
import Button from '../Button';

import Clickable from '.';

jest.mock('../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    type: 'button',
    onClick: jest.fn(),
    theme: { primary: 'blue' },
    label: 'my button',
  };
});

describe('Clickable', () => {
  it('Renders a plain button', () => {
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.find(Button).prop('className')).toContain('plain');
  });

  it('should render the button label', () => {
    const wrapper = shallow(<Clickable {...props} label="Label for the button" />);
    expect(shallow(<div>{wrapper.instance().appendIcon()}</div>).text()).toBe('Label for the button');
  });

  it('Renders a plain link', () => {
    props.type = 'link';
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.find(Link).prop('className')).toContain('plain');
  });

  it('appends icon as child if defined', () => {
    props.icon = 'play';
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.find(Icon).prop('name')).toBe(props.icon);
  });

  it('flips children if reverse prop is true', () => {
    props.icon = 'play';
    props.reverse = true;
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.children().first().type()).toEqual(Icon);
  });

  it('should add round if round prop is true', () => {
    const wrapper = shallow(<Clickable round {...props} />);
    expect(wrapper.prop('className')).toContain('round');
  });

  it('adds a div container around icon if valign is defined', () => {
    props.icon = 'play';
    props.valign = 'top';
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.children().first().type()).toEqual('div');
  });

  it('doesnt add theme color to icon for primary appearance', () => {
    props.icon = 'play';
    props.appearance = 'primary';
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.find(Icon).prop('fill')).not.toBeDefined();

    props.theme = null;
    props.appearance = 'secondary';
    wrapper.setProps(props);
    expect(wrapper.find(Icon).prop('fill')).not.toBeDefined();
  });

  it('gets appropriate inline styles based on theme and appearance', () => {
    props.appearance = 'primary';
    const wrapper = shallow(<Clickable {...props} />);
    expect(wrapper.instance().getStyle()).toEqual({
      background: props.theme.primary,
      color: 'white',
    });

    props.appearance = 'secondary';
    wrapper.setProps(props);
    expect(wrapper.instance().getStyle()).toEqual({});

    props.appearance = 'plain';
    wrapper.setProps(props);
    expect(wrapper.instance().getStyle()).toEqual({
      color: props.theme.primary,
    });

    props.theme = null;
    wrapper.setProps(props);
    expect(wrapper.instance().getStyle()).toEqual({});
  });

  it('Renders a button with authentication', () => {
    const wrapper = shallow(<Clickable {...props} authRequired />);
    expect(wrapper.find(IconWrapper)).toHaveLength(1);
  });
});
