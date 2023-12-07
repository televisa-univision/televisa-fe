/**
 * @module PrendeTV Download Asset Promo Card specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import DownloadAsset from '.';
import props from './__mocks__/downloadAsset.json';

window.dataLayer = {
  push: jest.fn(),
};

/**
 * @test {PrendeTV DownloadAsset}
 */
describe('PrendeTV Download Asset Promo Card test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DownloadAsset {...props} />);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('DownloadAsset__Wrapper')).toHaveLength(1);
  });

  it('should track the click event on the asset download link', () => {
    const wrapper = mount(<DownloadAsset {...props} />);

    wrapper
      .find('DownloadAsset__Link')
      .first()
      .simulate('click');

    expect(window.dataLayer.push).toBeCalledWith({
      event: 'section_download_logotipo',
    });
  });
});
