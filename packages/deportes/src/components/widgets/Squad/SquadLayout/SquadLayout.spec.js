import React from 'react';
import { shallow } from 'enzyme';

import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import squad from '../../../../utils/mocks/squad.json';
import SquadLayout from '.';

let squadData;
let emptyProps;

describe('SquadLayout tests', () => {
  beforeEach(() => {
    squadData = squadExtractor(squad);
    emptyProps = {};
  });
  it('should renders as expected', () => {
    const wrapper = shallow(<SquadLayout data={squadData[0]} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should renders as expected with empty props', () => {
    const wrapper = shallow(<SquadLayout data={emptyProps} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should renders as expected without manager', () => {
    delete squadData[0].manager;
    const wrapper = shallow(<SquadLayout data={squadData[0]} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
});
