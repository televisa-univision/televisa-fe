import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setCurrentLanguage from '@univision/fe-commons/dist/store/actions/page-actions';

import SoccerMatchLayout from '.';

const store = configureStore();

/**
 * @test {SoccerMatchLayout}
 */
describe('SoccerMatchLayout test', () => {
  it('should render correctly', async () => {
    const originalWindow = { ...global.window };
    const windowSpy = jest.spyOn(global, 'window', 'get');

    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      location: {
        ...originalWindow.location,
        href: '',
      },
    }));

    const wrapper = shallow(
      <Provider store={store}>
        <SoccerMatchLayout>
          <div className="contentType">
          content
          </div>
        </SoccerMatchLayout>
      </Provider>,
    );

    await act(async () => {
      store.dispatch(setCurrentLanguage('es'));
      await new Promise(resolve => setImmediate(resolve));
    });

    expect(wrapper.exists()).toBe(true);

    windowSpy.mockRestore();
  });
});
