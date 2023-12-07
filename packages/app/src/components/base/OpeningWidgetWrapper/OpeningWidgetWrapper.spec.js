import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import OpeningWidgetWrapper from '.';

jest.mock('@univision/fe-local/dist/components/connected/OpeningWeatherForecast');
jest.mock('@univision/fe-components-base/dist/components/Placeholder/OpeningWeatherForecast', () => 'placeholder-mock');

/**
 * @test {OpeningWidgetController}
 */
describe('OpeningWidgetController test', () => {
  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OpeningWidgetWrapper />, div);
  });
  it('should render OpeningWidgetController with loader', () => {
    const props = {
      tvStation: { uri: 'https://sls-dev.x.univision.com/local/miami-wltv' },
      uri: 'https://sls-dev.x.univision.com/local/miami-wltv/tiempo',
    };
    const wrapper = shallow(<OpeningWidgetWrapper {...props} />).dive();
    expect(wrapper.find('placeholder-mock')).toHaveLength(1);
  });
  it('should render OpeningWidgetController as expected', async () => {
    const props = {
      tvStation: { uri: 'https://sls-dev.x.univision.com/local/miami-wltv' },
      uri: 'https://sls-dev.x.univision.com/local/miami-wltv/tiempo',
    };
    const wrapper = mount(<OpeningWidgetWrapper {...props} />);
    await preloadAll();
    expect(wrapper.children()).toHaveLength(1);
  });

  it('should not render OpeningWidgetController if not local page', () => {
    const wrapper = mount(<OpeningWidgetWrapper />);
    expect(wrapper.children()).toHaveLength(0);
  });
});
