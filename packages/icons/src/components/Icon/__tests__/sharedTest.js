import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { getIconsWithType } from '../../../utils/helpers';
import Icon from '..';

const iconsList = getIconsWithType();
const iconsName = Object.keys(iconsList);

module.exports = () => {
  describe('test all available icons', () => {
    iconsName.forEach((iconName) => {
      it(`should render correctly the ${iconName} icon`, async() => {
        const wrapper = render(<Icon name={iconName} />);
        await waitFor(() => expect(wrapper.container.querySelector('svg').firstChild).not.toBeNull());
        expect(wrapper.container.firstChild).toMatchSnapshot();
      });
    });
  });
};
