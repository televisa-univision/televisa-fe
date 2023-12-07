import React from 'react';
import { shallow } from 'enzyme';
import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import mockMatches from '../../../utils/mocks/matches.json';
import Microdata from '.';

const matchesData = matchesExtractor(cloneDeep(mockMatches));

describe('Microdata', () => {
  it('should render correctly in CSR', () => {
    const wrapper = shallow(<Microdata data={matchesData.events[0]} />);

    expect(wrapper.find('script')).toHaveLength(1);
  });

  it('should render correctly is SSR', () => {
    delete global.window;
    const wrapper = shallow(<Microdata data={matchesData.events[0]} />);

    expect(wrapper.find('script')).toHaveLength(1);
  });

  it('should not render in SSR if have empty data', () => {
    delete global.window;
    const emptyData = {};
    const wrapper = shallow(<Microdata data={emptyData} />);

    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should not render in SSR when have wrong data', () => {
    delete global.window;
    const wrongData = { url: global };
    const wrapper = shallow(<Microdata data={wrongData} />);

    expect(wrapper.find('script')).toHaveLength(0);
  });
});
