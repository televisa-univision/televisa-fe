import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import CalReply from '.';
import pageData from './mockData.json';

let props;
beforeEach(() => {
  props = {
    code: pageData.data.externalWidgets.calReply.code,
    href: pageData.data.externalWidgets.calReply.href
  };
});

/** @test {CalReply} */
describe('CalReply ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CalReply {...props} />, div);
  });

  it('should force mobile view', () => {
    const wrapper = mount(<CalReply {...props} forceMobileView />);

    expect(wrapper).toHaveStyleRule('margin-right', '80px');
  });

  it('should force mobile view', () => {
    const wrapper = mount(<CalReply {...props} forceMobileView hasBackgroundImage />);

    expect(wrapper).toHaveStyleRule('margin-right', '80px');
  });

  it('should have cal reply only', () => {
    const wrapper = mount(<CalReply {...props} hasCalReplyOnly />);

    wrapper.setState({ isOpen: true });

    expect(wrapper).toHaveStyleRule('margin-right', '0');
  });

  it('should track on Click event', () => {
    const dataLayer = gtmManager.getDataLayer();
    const wrapper = mount(<CalReply {...props} />);
    wrapper
      .find('a')
      .last()
      .simulate('click', 1);
    expect(dataLayer[dataLayer.length - 1].promo_name).toBe(
      `CalReply-${localization.get('notifyMe')}`
    );
  });

  it('should load the external script', () => {
    const loadExternalScript = spyOn(helpers, 'loadExternalScript');
    mount(<CalReply {...props} />);
    expect(loadExternalScript).toHaveBeenCalled();
  });

  it('should not render without calReply data', () => {
    const wrapper = mount(<CalReply />);
    expect(wrapper.find('.calreply')).toHaveLength(0);
  });
});
