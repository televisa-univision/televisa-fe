import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import radioPageMock from '../../../../__mocks__/uvnRadioPageData.json';
import SectionRadio from '.';

jest.mock('../../base/GlobalWidget');

/**
 * @test {SectionRadio}
 */
describe('SectionRadio test', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  const pageData = {
    data: {
      ...radioPageMock.data,
      widgets: [],
    },
    device: 'desktop',
    pageCategory: 'radio',
    theme: {
      primary: '#D41D31',
      secondary: '#E63E10',
    },
  };
  const pageDataEmpty = {
    data: {
      widgets: [],
    },
  };
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <SectionRadio pageData={pageDataEmpty} />,
      div,
    );
  });
  it('should call section component with station list wrapper', () => {
    const wrapper = shallow(<SectionRadio pageData={pageData} />);
    expect(wrapper.find('Section').props().pageData.data.widgets).toHaveLength(1);
    expect(wrapper.find('Section').props().pageData.data.widgets[0].type).toEqual('StationListWrapper');
  });
  it('should call section component with no widgets', () => {
    const wrapper = shallow(<SectionRadio pageData={pageDataEmpty} />);
    expect(wrapper.find('Section').props().pageData.data.widgets).toHaveLength(0);
  });
  it('should inject radio widgets only if they do not exist', () => {
    const pageDataWithRadioWidgets = {
      data: {
        widgets: [
          {
            type: widgetTypes.RADIO_STATION_LIST_WRAPPER,
          },
        ],
      },
    };
    const wrapper = shallow(<SectionRadio pageData={pageDataWithRadioWidgets} />);
    expect(wrapper.find('Section').props().pageData.data.widgets).toHaveLength(1);
  });
  it('should inject radio widgets if widget is array', () => {
    const pageDataWithRadioWidgets = {
      data: {},
    };
    const wrapper = shallow(<SectionRadio pageData={pageDataWithRadioWidgets} />);
    expect(wrapper.find('Section').props().pageData.data.widgets).not.toBeDefined();
  });

  it('should add top ad for section radio', () => {
    adHelper.getAd = jest.fn();
    const wrapper = shallow(<SectionRadio pageData={pageData} />);
    expect(wrapper.find('uvs-ad-full-width')).toBeDefined();
    expect(adHelper.getAd).toHaveBeenCalledWith('Top Ad', { isLazyLoaded: false });
  });
});
