import React from 'react';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '../../../Button';

import SectionsButton from '.';

jest.mock('../../../Button', () => jest.fn());
jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

features.deportes.isTudn = jest.fn(() => false);

describe('SectionsButton', () => {
  let getBrandableSpy;
  let props;

  beforeEach(() => {
    getBrandableSpy = jest.spyOn(storeHelpers, 'getBrandable');

    props = {
      onClick: jest.fn(),
      label: 'label!',
      closeLabel: 'closeme',
      closeIcon: 'x',
      variant: 'light',
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders icon and label', () => {
    const wrapper = shallow(<SectionsButton {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toEqual('hamburger');
    expect(wrapper.find('.sectionsLabel')).toHaveLength(1);
  });
  it('renders icon and label with TUDN extra margin', () => {
    features.deportes.isTudn.mockReturnValueOnce(true);
    const wrapper = shallow(<SectionsButton isTudn {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toEqual('hamburger');
    expect(wrapper.find('.labelExtraMargin')).toHaveLength(1);
  });
  it('renders icon without label', () => {
    props.label = '';
    const wrapper = shallow(<SectionsButton {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Icon).prop('name')).toEqual('hamburger');
    expect(wrapper.find('.sectionsLabel')).toHaveLength(0);
  });
  it('uses correct label when its open', () => {
    const wrapper = shallow(<SectionsButton {...props} open />);
    expect(wrapper.find('.sectionsLabel').text()).toBe(props.closeLabel);
    expect(wrapper.find(Icon).prop('name')).toBe(props.closeIcon);
  });

  describe('Theme overrides', () => {
    it('renders with theme override for local markets', () => {
      getBrandableSpy.mockReturnValueOnce({
        type: 'tvStation',
      });
      const wrapper = shallow(<SectionsButton {...props} />);
      expect(wrapper.find(Button).props().className).toContain('dark');
    });
  });
});
