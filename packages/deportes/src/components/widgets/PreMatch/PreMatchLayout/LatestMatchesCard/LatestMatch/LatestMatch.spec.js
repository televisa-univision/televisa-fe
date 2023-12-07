import React from 'react';
import { shallow } from 'enzyme';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';
import data from '../../../../../../utils/mocks/prematch.json';
import LatestMatch from '.';

let emptyProps;
let parsedData;
beforeEach(() => {
  emptyProps = {
    team: [],
  };
  parsedData = preMatchExtractor(data);
});

describe('LatestMatch tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<LatestMatch event={parsedData.previousEncounters[0]} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('should render empty div if team array is empty', () => {
    const wrapper = shallow(<LatestMatch event={emptyProps} />);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should render scoreCard with "medium" size', () => {
    global.window.innerWidth = 768;
    const wrapper = shallow(<LatestMatch event={parsedData.previousEncounters[0]} />);
    expect(wrapper.find('.medium').length).toBe(1);
  });
  it('should render scoreCard with "small" size', () => {
    global.window.innerWidth = 767;
    const wrapper = shallow(<LatestMatch event={parsedData.previousEncounters[0]} />);
    expect(wrapper.find('.small').length).toBe(1);
  });
});
