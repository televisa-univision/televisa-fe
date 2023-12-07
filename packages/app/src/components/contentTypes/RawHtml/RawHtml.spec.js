import React from 'react';
import { shallow } from 'enzyme';

import RawHtml from '.';

const pageData = {
  status: 'success',
  data: {
    type: 'rawhtml',
    uid: '0000015d-9a45-da90-ab5d-baedd8f40000',
    html: '<div class="test"></div>',
  },
  statusCode: null,
  headers: [],
  ttl: 300,
  feedGeneratedAt: '2020-07-12T23:16:19-04:00',
};

/** @test {RawHtml} */
describe('RawHtml content type', () => {
  it('should render raw html container', () => {
    const wrapper = shallow(<RawHtml pageData={pageData} />);
    expect(wrapper.find('RawHtmlContainer')).toHaveLength(1);
  });
});
