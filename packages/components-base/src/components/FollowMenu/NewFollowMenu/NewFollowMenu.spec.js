import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import NewFollowMenu from '.';
import Styles from './NewFollowMenu.styles';

describe('NewFollowMenu', () => {
  const networks = [{ name: 'instagram', url: 'followus.com' }];

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewFollowMenu networks={networks} />, div);
  });

  it('should default to empty array when no networks are passed', () => {
    const wrapper = shallow(<NewFollowMenu />);
    expect(wrapper.find(NewFollowMenu).length).toBe(0);
  });

  it('should not render anything when there are no social networks', () => {
    const wrapper = shallow(<NewFollowMenu networks={[]} />);
    expect(wrapper.find(NewFollowMenu).length).toBe(0);
  });

  it('should render the container with a isVertical prop set to true', () => {
    const wrapper = shallow(<NewFollowMenu isVertical networks={networks} />);
    expect(wrapper.find('NewFollowMenu__FollowUsContainer').props().children[0].props).toEqual(
      expect.objectContaining({
        isVertical: true,
      })
    );
  });

  it('should render the container with a isVertical prop set to false', () => {
    const wrapper = shallow(<NewFollowMenu isVertical={false} networks={networks} />);
    expect(wrapper.find('NewFollowMenu__FollowUsContainer').props().children[0].props).toEqual(
      expect.objectContaining({
        isVertical: false,
      })
    );
  });

  describe('styles', () => {
    it('should render the follow us container vertically', () => {
      const [direction, value] = Styles.followUsContainer({ isVertical: true });
      expect(direction).toBe('align-items:center;display:flex;flex-direction:');
      expect(value).toBe('column');
    });

    it('should render the follow us row container horizontally', () => {
      const [direction, value] = Styles.followUsContainer({ isVertical: false });
      expect(direction).toBe('align-items:center;display:flex;flex-direction:');
      expect(value).toBe('row');
    });

    it('should render the follow us label with bottom margin when on vertical mode', () => {
      const styles = Styles.followUsLabel({ isVertical: true });
      const [margin, value] = styles.slice(2, 4);
      expect(margin).toBe(';margin-bottom:');
      expect(value).toBe('16px');
    });

    it('should render the follow us label without bottom margin when on row mode', () => {
      const styles = Styles.followUsLabel({ isVertical: false });
      const [margin, value] = styles.slice(2, 4);
      expect(margin).toBe(';margin-bottom:');
      expect(value).toBe('0');
    });

    it('should render the networks container without bottom margin when on vertical mode', () => {
      const [margin, value] = Styles.networksContainer({ isVertical: true });
      expect(margin).toBe(
        'display:grid;grid-gap:24px;grid-template-columns:1fr 1fr 1fr;margin-left:'
      );
      expect(value).toBe('0');
    });

    it('should render the networks container with bottom margin when on row mode', () => {
      const [margin, value] = Styles.networksContainer({ isVertical: false });
      expect(margin).toBe(
        'display:grid;grid-gap:24px;grid-template-columns:1fr 1fr 1fr;margin-left:'
      );
      expect(value).toBe('24px');
    });
  });
});
