/**
 * @module PrendeTV External Embed Promo Card tests
 */
import React from 'react';
import { shallow } from 'enzyme';

import ExternalEmbed from '.';
import props from './__mocks__/externalEmbed.json';

/**
 * @test {PrendeTV ExternalEmbed}
 */
describe('PrendeTV External Embed Promo Card test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ExternalEmbed {...props} />);

    expect(wrapper).toHaveLength(1);
  });

  it('should render correctly when not full width', () => {
    props.externalContent.fullWidth = false;

    const wrapper = shallow(<ExternalEmbed {...props} />);

    expect(wrapper).toHaveLength(1);
  });
});
