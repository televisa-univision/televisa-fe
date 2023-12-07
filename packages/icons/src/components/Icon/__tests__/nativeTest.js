import React from 'react';
import renderer from 'react-test-renderer';

import Icon from '..';

const themes = {
  pink: {
    primary: '#B5008F',
    secondary: '#E41F7B',
  },
};

/**
 * Render component to JSON
 * @param {Object} Component - a react component
 * @returns {JSX}
 */
function render(Component) {
  const tree = renderer.create(Component);

  return tree.toJSON();
}

module.exports = () => {
  it('should render correctly icon', async() => {
    const tree = render(<Icon name="timer" />);

    expect(tree).toMatchSnapshot();
  });
  it('should render empty with non-existent icon', async() => {
    const tree = render(<Icon name="bad-non-existent-icon" />);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with string size', async() => {
    const tree = render(<Icon name="timer" size="large" />);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with custom size', async() => {
    const tree = render(<Icon name="yellowCard" size={12} />);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with custom size', async() => {
    const tree = render(<Icon name="playerSubstitution" size={12} />);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with array size', async() => {
    const tree = render(<Icon name="univision" size={[80, 19]} />);

    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with theme', async() => {
    const tree = render(<Icon name="notAvailable" theme={themes.pink} />);

    expect(tree).toMatchSnapshot();
  });
};
