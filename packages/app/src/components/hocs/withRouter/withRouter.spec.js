import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import fetch from '@univision/fe-commons/dist/utils/fetch';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import mockData from '../../../../__mocks__/tudnPageData.json';
import { UvnPage } from '../../../pages/univision/index.page';
import withRouter from '.';

const initialProps = {
  query: {},
  store: configureStore(),
};

// Mocks
fetch.setResponse({ res: mockData });
jest.mock('next/router', () => ({
  beforePopState: (callback) => { callback(); },
}));
jest.mock('../../layout/UvnLayout', () => () => 'uvn');

/**
 * @test {withRouter}
 */
describe('withRouter test', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { pathname: '', search: '?_ga=2.31058359.906293860.1594136631-1247662742.1592410407' };
  });

  afterAll(() => {
    jest.restoreAllMocks();
    window.location = location;
  });

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('should render wrapped component with router', () => {
    const div = document.createElement('div');
    const PageWithRouter = withRouter(UvnPage);

    ReactDOM.render(
      <PageWithRouter
        store={initialProps.store}
      />,
      div,
    );
  });

  it('should return the expected initialProps', async () => {
    const PageWithRouter = withRouter(UvnPage);
    const props = await PageWithRouter.getInitialProps(initialProps);
    const wrapper = shallow(<PageWithRouter {...props} store={initialProps.store} />);

    expect(wrapper).toBeDefined();
  });

  it('should return the empty initialProps when not getInitialProps', async () => {
    const initialPropsStaticMethod = UvnPage.getInitialProps;
    delete UvnPage.getInitialProps;
    const PageWithRouter = withRouter(UvnPage);
    const props = await PageWithRouter.getInitialProps();
    const wrapper = shallow(<PageWithRouter {...props} store={initialProps.store} />);

    expect(wrapper).toBeDefined();
    expect(props).toMatchObject({});
    UvnPage.getInitialProps = initialPropsStaticMethod;
  });

  it('should set scrollTo on handleChange', async () => {
    window.scrollTo = jest.fn();
    const PageWithRouter = withRouter(UvnPage);
    Object.fromEntries = jest.fn();
    const props = await PageWithRouter.getInitialProps(initialProps);
    const wrapper = shallow(<PageWithRouter {...props} store={initialProps.store} />);
    await wrapper.instance().handleChange('www.tudn.com', 'PUSH');
    await wrapper.instance().handleChange('/shows', 'PUSH');

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should not call scrollTo on handleChange if historyAction is pop', async () => {
    window.scrollTo = jest.fn();
    const PageWithRouter = withRouter(UvnPage);
    Object.fromEntries = jest.fn();
    const props = await PageWithRouter.getInitialProps(initialProps);
    const wrapper = shallow(<PageWithRouter {...props} store={initialProps.store} />);
    await wrapper.instance().handleChange('/test', 'POP');
    await wrapper.instance().handleChange('/test', 'POP');

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
