import React from 'react';
import { shallow } from 'enzyme';
import LocalizationManager from '@univision/fe-utilities/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '../Button';
import Truncate from '.';

jest.mock('@univision/fe-utilities/localization/LocalizationManager');
jest.mock('../Button');
jest.mock('@univision/fe-icons/dist/components/Icon');

let props;

beforeAll(() => {
  LocalizationManager.mockImplementation(() => ({
    get: jest.fn(() => 'Leer más'),
  }));
  Button.mockImplementation(() => jest.fn());
  Icon.mockImplementation(() => jest.fn());

  document.createElement = jest.fn(element => ({
    tagName: element,
    innerHTML: '<p>This is a mock <strong>RICH TEXT</strong> description! <a href="#">Link</a></p>',
    innerText: 'this is a long string',
  }));
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  props = {
    text: 'this is a long string',
    trimLength: 5,
    device: 'mobile',
  };
});

const theme = {
  alphaGradient: 'linear-gradient(to top, rgba(58, 58, 58, 0.95) 0%, rgba(58, 58, 58, 0) 50%)',
  horizontalGradient: 'linear-gradient(to right, #3a3a3a 0%, #000000 100%)',
  primary: '#3a3a3a',
  secondary: '#000000',
  solidGradient: 'linear-gradient(to bottom, #3a3a3a 0%, #000000 100%)',
  variant: 'dark',
};

const html = '<p>This is a mock <strong>RICH TEXT</strong> description! <a href="#">Link</a></p>';

describe('Truncate tests', () => {
  it('should not trim null text', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const emptyTextProps = {
      trimLength: 5,
      device: 'mobile',
    };
    const wrapper = shallow(<Truncate {...emptyTextProps} />);
    expect(wrapper.find('span').html()).toContain('<span></span>');
  });

  it('should trim long text', () => {
    const wrapper = shallow(<Truncate {...props} />);
    expect(wrapper.find('span').html()).toContain('this ');
    wrapper.setState({ open: true });
    expect(wrapper.find('span').html()).toContain(props.text);
  });

  it('should toggles open state when clicking the button', () => {
    const wrapper = shallow(<Truncate {...props} />);
    wrapper.find(Button).simulate('click', { stopPropagation: () => undefined });
    expect(wrapper.state('open')).toBe(true);
    // Clear stop propagation call
    jest.clearAllTimers();
  });

  it('should toggle open state directly', () => {
    const wrapper = shallow(<Truncate {...props} />);

    const event = {
      stopPropagation: jest.fn(),
    };

    wrapper.instance().toggle(event);
    expect(wrapper.state('open')).toBe(true);
    // Clear stop propagation call
    jest.clearAllTimers();
  });

  it('should render button if trimLength is less than original string', () => {
    const wrapper = shallow(<Truncate {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    wrapper.setProps({ trimLength: 100 });
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('should render with theme', () => {
    const localProps = Object.assign({}, props, { theme });
    const wrapper = shallow(<Truncate {...localProps} />);
    const componentTheme = wrapper.instance().props.theme;

    expect(componentTheme.primary).toEqual(theme.primary);
    expect(componentTheme.variant).toEqual(theme.variant);
  });

  it('should render with rich text (html) when state is open', () => {
    const localProps = Object.assign({}, props, { html });
    const wrapper = shallow(<Truncate {...localProps} />);
    const wrappedHTML = `<div>${html}</div>`;

    wrapper.setState({ open: true });
    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('div').at(1).html()).toEqual(wrappedHTML);
  });

  it('should render with rich text (html) when device is DESKTOP', () => {
    const localProps = Object.assign({}, props, { device: 'desktop', html });
    const wrapper = shallow(<Truncate {...localProps} />);
    const wrappedHTML = `<div>${html}</div>`;

    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('div').at(1).html()).toEqual(wrappedHTML);
  });

  it('should hide the button if not expandable', () => {
    const wrapper = shallow(<Truncate {...props} />);
    wrapper.setProps({ expandable: false, ellipsis: false });
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('should call onStateChanged function', () => {
    const onStateChanged = jest.fn();
    const wrapper = shallow(<Truncate {...props} onStateChanged={onStateChanged} />);
    wrapper.find(Button).simulate('click', { stopPropagation: () => undefined });
    expect(onStateChanged.mock.calls.length).toBe(1);
  });

  it('should add ... when ellipsis is added and open is false', () => {
    const wrapper = shallow(<Truncate {...props} ellipsis />);
    expect(wrapper.find('p span').html()).toContain('…');
  });

  it('should remove the ... if open is true and ellipsis exists', () => {
    const wrapper = shallow(<Truncate {...props} ellipsis />);
    wrapper.setState({ open: true });
    expect(wrapper.find('p span').html()).not.toContain('…');
  });

  it('should render the read more button to the left by default', () => {
    const wrapper = shallow(<Truncate {...props} expandable />);
    const button = wrapper.find('.button');
    const buttonStyles = button.props().style;

    expect(buttonStyles.alignSelf).toBe('flex-start');
  });

  it('should be able to render read more button to the right', () => {
    const wrapper = shallow(<Truncate {...props} expandable expandPosition="right" />);
    const button = wrapper.find('.button');
    const buttonStyles = button.props().style;

    expect(buttonStyles.alignSelf).toBe('flex-end');
  });
});
