import React from 'react';
import { shallow } from 'enzyme';

import RawHtmlLayout from '.';

/** @test {RawHtml} */
describe('RawHtml content type', () => {
  it('should render children html without additional markup', () => {
    const wrapper = shallow(
      <RawHtmlLayout>
        <div>raw</div>
      </RawHtmlLayout>,
    );
    expect(wrapper.html()).toBe('<div>raw</div>');
  });
});
