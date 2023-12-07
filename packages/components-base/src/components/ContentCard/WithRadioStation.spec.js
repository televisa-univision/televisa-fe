import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { shallow } from 'enzyme';
import WithRadioStation from './WithRadioStation';

/**
 * SimpleCmp for testing
 * @param {Object} props props
 * @returns {JSX} the view
 */
const SimpleCmp = ({
  type, uri, primaryTag, customIcon, radioStation,
}) => {
  if (type === 'radiostation') {
    return (
      <div>
        {uri && <a href={uri}>link</a>}
        {primaryTag && <span className="label">{primaryTag.name}</span>}
        {customIcon && <div className="icon">{customIcon}</div>}
        {radioStation
          && <img alt="test" src={radioStation.featuredStationsPromoImage.renditions.original} />
        }
      </div>
    );
  }
  return null;
};

SimpleCmp.propTypes = {
  primaryTag: PropTypes.object,
  customIcon: PropTypes.node,
  radioStation: PropTypes.object,
  type: PropTypes.string,
  uri: PropTypes.string.isRequired,
};

SimpleCmp.defaultProps = {
  primaryTag: null,
  customIcon: null,
  radioStation: null,
  type: null,
};

const customProps = {
  type: 'radiostation',
  primaryTag: {
    name: 'my Station',
  },
  customIcon: <div>test</div>,
  radioStation: {
    featuredStationsPromoImage: {
      renditions: {
        original: 'test.jpg',
      },
    },
  },
};

const DivRadioStation = WithRadioStation(SimpleCmp);

/** @test {WithradioStation} */
describe('WithradioStation ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DivRadioStation {...customProps} />, div);
  });
  it('should render null if not radiostation type', () => {
    const wrapper = shallow(<DivRadioStation {...customProps} type="Video" />);
    expect(wrapper.dive().getElement()).toEqual(null);
  });
  it('should not render label id not primary tag', () => {
    const newProps = Object.assign({}, customProps);
    delete newProps.primaryTag;
    const wrapper = shallow(<DivRadioStation {...newProps} />);
    expect(wrapper.dive().find('label').length).toBe(0);
  });
  it('should not render image id not eaturedStationsPromoImage', () => {
    const newProps = Object.assign({}, customProps);
    delete newProps.radioStation;
    const wrapper = shallow(<DivRadioStation {...newProps} />);
    expect(wrapper.dive().find('img').length).toBe(0);
  });
});
