import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import ErrorPage from './ErrorPage';

jest.mock('@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator', () => (
  jest.fn(() => null)
));

/** @test {ErrorPage} */
describe('ErrorPage Spec', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorPage />, div);
  });
  it('should render 404 widgets title if status 404', () => {
    Store.dispatch(setPageData({
      statusCode: 404,
    }));
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.find('.subTitle')).toHaveLength(2);
  });
  it('should fallback to error 500 titles if 200 is set', () => {
    Store.dispatch(setPageData({
      statusCode: 200,
    }));
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper.find('.title')).toHaveLength(1);
    expect(wrapper.find('.title').at(0).props().children).toEqual('Esta página no está disponible temporalmente.');
    expect(wrapper.find('.subTitle')).toHaveLength(2);
    expect(wrapper.find('.subTitle').at(0).props().children).toEqual('Lamentamos los inconvenientes, nuestro equipo está trabajando rápidamente para corregirla.');
    expect(wrapper.find('.subTitle').at(1).props().children).toEqual('Por favor intente nuevamente en algunos minutos.');
  });
});
