import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Svg } from 'svgs';

import consoleLogger from '@univision/fe-utilities/utils/consola';

import IconWrapper from '..';

/**
 * Render component to JSON
 * @param {Object} Component - a react component
 * @returns {JSX}
 */
function render(Component) {
  const tree = renderer.create(Component);
  return tree.toJSON();
}

/**
 * Dumy SVG icon
 * @returns {JSX}
 */
function Icon() {
  return <Svg data-name="close" />;
}

/**
 * Dumy fallback SVG icon
 * @returns {JSX}
 */
function FallbackSvg() {
  return <Svg data-name="fallback" />;
}

// Mocks
consoleLogger.error = jest.fn();

module.exports = () => {
  it('should render correctly', async() => {
    const tree = render(
      <IconWrapper>
        <Icon />
      </IconWrapper>
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render fallback on error', async() => {
    const wrapper = shallow(
      <IconWrapper fallback={<FallbackSvg />}>
        <Icon />
      </IconWrapper>
    );

    const error = new Error('render error');
    wrapper.find(Icon).simulateError(error);

    expect(wrapper).toMatchSnapshot();
    expect(consoleLogger.error).toHaveBeenCalledWith(error, expect.objectContaining({
      componentStack: expect.any(String),
    }));
    expect(wrapper.state('hasError')).toBe(true);
  });

  it('should render without fallback on error', async() => {
    const wrapper = shallow(
      <IconWrapper>
        <Icon />
      </IconWrapper>
    );

    const error = new Error('render error');
    wrapper.find(Icon).simulateError(error);

    expect(wrapper).toMatchSnapshot();
    expect(consoleLogger.error).toHaveBeenCalledWith(error, expect.objectContaining({
      componentStack: expect.any(String),
    }));
    expect(wrapper.state('hasError')).toBe(true);
  });
};
