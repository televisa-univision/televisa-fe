import React from 'react';
import { shallow } from 'enzyme';
import MatchesFeatureConnector from './MatchesFeatureConnector';

describe('MatchesFeatureConnector', () => {
  it('should render without crashing', () => {
    const props = {
      settings: {
        displayType: {
          value: 'Full',
        },
      },
    };
    const wrapper = shallow(<MatchesFeatureConnector {...props} />);
    expect(wrapper.find('Connect(Matches)')).toHaveLength(1);
  });
  it('should render rebrand component', () => {
    const props = {
      settings: {
        displayType: {
          value: 'Live',
        },
      },
    };
    const wrapper = shallow(<MatchesFeatureConnector {...props} />);
    expect(wrapper.find('Connect(MatchesRebrand)')).toHaveLength(1);
  });
});
