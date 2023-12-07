import React from 'react';
import { shallow } from 'enzyme';

import SingleWidgetLoader from '.';

const content = [{
  seasonId: 'test',
  soccerCompetition: { foo: 'bar' },
}];

const cardData = [{}, { foo: 'bar' }];

describe('SingleWidgetLoader', () => {
  it('should not crash when rendered', () => {
    const wrapper = shallow(<SingleWidgetLoader />);
    expect(wrapper.find('SingleWidget')).toHaveLength(1);
  });
  it('should render WorldCup widget when content is a soccer competition season', () => {
    const wrapper = shallow(<SingleWidgetLoader content={content} />);
    expect(wrapper.find('WorldCup')).toHaveLength(1);
  });
  it('should render SingleWidget when cardData is provided', () => {
    const wrapper = shallow(<SingleWidgetLoader content={content} cardData={cardData} />);
    expect(wrapper.find('SingleWidget')).toHaveLength(1);
  });
});
